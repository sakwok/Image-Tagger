const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const humps = require('humps')
const webpack = require('webpack')
const { name } = require('./package')
const { resolve } = path
const { config: dotConfig } = require('dotenv')
const DotenvWebpack = require('dotenv-webpack')
const NODE_ENV = process.env.NODE_ENV || 'development'
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')

dotConfig({
  path: path.join(__dirname, 'env', 'common.env'),
})

dotConfig({
  path: path.join(__dirname, 'env', `${NODE_ENV}.env`),
})

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  // tslint:disable-next-line:no-empty
  require.extensions['.css'] = file => { }
  // tslint:disable-next-line:no-empty
  require.extensions['.less'] = file => { }
}

module.exports = withPlugins([withTypescript, [withLess, {
  lessLoaderOptions: {
    javascriptEnabled: true
  }
}], withCss], {
  useFileSystemPublicRoutes: false,
  assetPrefix: process.env.PUBLIC_PATH,
  webpack: (config, { isServer }) => {
    config.output.publicPath = process.env.PUBLIC_PATH
    const originalEntry = config.entry
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': resolve('src'),
      '@': resolve('src/client')
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
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en/),
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
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        tsconfig: './tsconfig.json',
      }))

      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  }
})
