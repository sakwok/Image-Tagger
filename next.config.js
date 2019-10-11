const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const humps = require('humps')
const webpack = require('webpack')
const { name , version } = require('./package')
const { resolve } = path
const { config: dotConfig } = require('dotenv')
const DotenvWebpack = require('dotenv-webpack')
const NODE_ENV = process.env.NODE_ENV || 'development'
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')

dotConfig({
  path: path.join(__dirname, 'env', 'common.env')
})

dotConfig({
  path: path.join(__dirname, 'env', `${NODE_ENV}.env`)
})

let PUBLIC_PATH = process.env.PUBLIC_PATH
if (PUBLIC_PATH.indexOf('http') > -1) {
  PUBLIC_PATH = `${PUBLIC_PATH}/${version}`
}

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  // tslint:disable-next-line:no-empty
  require.extensions['.css'] = (file) => { }
  // tslint:disable-next-line:no-empty
  require.extensions['.less'] = (file) => { }
}

module.exports = withPlugins(
  [
    withTypescript,
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        }
      }
    ],
    withCss
  ],
  {
    useFileSystemPublicRoutes: false,
    assetPrefix: PUBLIC_PATH,
    webpack: (config, { isServer }) => {
      config.output.publicPath = PUBLIC_PATH
      const originalEntry = config.entry
      config.resolve.alias = {
        ...config.resolve.alias,
        '~': resolve('src'),
        '@': resolve('src/client'),
        static: resolve('static/')
      }
      config.output.jsonpFunction = `__${humps.pascalize(name)}WebpackJsonp__`
      config.resolve.extensions.push('.less')
      config.entry = async () => {
        const entries = await originalEntry()
        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./src/client/lib/polyfills.ts')
        ) {
          entries['main.js'].unshift('./src/client/lib/polyfills.ts')
        }
        return entries
      }
      config.plugins = config.plugins || []
      config.plugins = [
        ...config.plugins,
        new DotenvWebpack({
          path: path.join(__dirname, 'env', 'common.env'),
          systemvars: true
        }),
        new DotenvWebpack({
          path: path.join(__dirname, 'env', `${NODE_ENV}.env`),
          systemvars: true
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en/)
      ]
      config.module.rules = config.module.rules || []
      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.(txt|jpg|png|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: '',
                outputPath: 'static',
                publicPath: '/_next/static',
                name: 'assets/[name].[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  resolve(process.cwd(), 'src/client/less/_mixin.less'),
                  resolve(process.cwd(), 'src/client/less/_color.less')
                ]
              }
            }
          ]
        }
      ]
      if (isServer) {
        config.plugins.push(new ForkTsCheckerWebpackPlugin())
      }
      return config
    }
  }
)
