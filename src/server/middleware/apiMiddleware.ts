import fetch from '../utils/fetch'
import { getIp } from '../utils'

interface Options {
    url: string
    method: string
    params: any
    data: any
    ip: string
}

export default logger => {
    return async (ctx, next) => {
        if (ctx.request.method === 'OPTIONS') {
            ctx.status = 204
            await next()
        }
        if (ctx.req.url.indexOf(`/api`) === 0) {
            const apiStart = new Date().getTime()

            const ip: string = getIp(ctx)
            let _url = ctx.req.url
            _url = _url.split('?')[0]

            const options: Options = {
                url: _url,
                method: ctx.method,
                data: ctx.request.body,
                params: ctx.request.query,
                ip
            }

            let result
            try {
                result = await fetch(options)
                const apiEnd = new Date().getTime()
                // 接口返回慢
                if (apiEnd - apiStart >= 1000) {
                    logger.warn('API Request Time > 1s', apiEnd - apiStart, ctx.req.url)
                }
                ctx.body = result
            } catch (e) {
                logger.error('apiMiddleware:', e)
                ctx.status = 500
                result = {
                    code: 500,
                    message: 'System error.',
                    success: false,
                }
                ctx.body = result
            }
        } else {
            await next()
        }
    }
}
