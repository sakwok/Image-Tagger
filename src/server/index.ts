const { resolve, join } = require('path')
const resolveApp = relativePath => resolve(process.cwd(), relativePath)
const { config: dotConfig } = require('dotenv')
const NODE_ENV = process.env.NODE_ENV || 'development'
dotConfig({ path: resolveApp('env/common.env') })
dotConfig({ path: resolveApp(`env/${NODE_ENV}.env`) })
const logger = require('./utils/logger').default
const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const next = require('next')
const compress = require('koa-compress')
const convert = require('koa-convert')
const staticCache = require('koa-static-cache')
const port = parseInt(process.env.PORT, 10)
const dev = NODE_ENV !== 'production'
const app = next({
    dev
})
const pageRouters = require('./routers').default
const routers = require('./routers/routers').default
const handler = pageRouters.getRequestHandler(app)
const apiMiddleware = require('./middleware/apiMiddleware').default
const setCookieMiddleware = require('./middleware/setCookieMiddleware')

export default app.prepare()
    .then(() => {
        const server = new Koa()
        server.use(koaBody({ multipart: true, jsonLimit: '50mb', formLimit: '500kb', textLimit: '500kb' }))
        // server.use(bodyParser({ formLimit: '500kb', jsonLimit: '50mb', textLimit: '50mb' }))
        server.use(setCookieMiddleware())
        server.use(
            compress({
                filter(content_type) {
                    return /text|javascript|json/i.test(content_type)
                },
                threshold: 2048,
                flush: require('zlib').Z_SYNC_FLUSH,
            })
        )
        server.use(
            convert(
                staticCache(join(process.cwd(), 'static'), {
                    maxAge: 365 * 24 * 60 * 60,
                })
            )
        )
        server.use(routers.routes()).use(routers.allowedMethods())
        server.use(apiMiddleware(logger))
        server.use(ctx => {
            ctx.respond = false
            ctx.res.statusCode = 200
            handler(ctx.req, ctx.res)
        })
        server.listen(port, () => {
            logger.info(`> Server ready on http://localhost:${port}`)
        })

        server.on('error', (err, ctx) => {
            logger.error('koa error:', err.stack)
            ctx.status = 500
            ctx.body = 'server error'
        })
    })

process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

process.on('uncaughtException', err => {
    logger.error('uncaughtException', err.stack)
})

process.on('exit', () => {
    logger.info('node process exit')
})
