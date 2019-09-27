export default () => {
    return async (ctx, next) => {
        ctx.set('Strict-Transport-Security', 'max-age=604800; includeSubDomains; preload;')
        ctx.set('Access-Control-Max-Age', '31536000')
        ctx.set('Access-Control-Allow-Origin', ctx.headers.origin || '')
        ctx.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Vpesports-Server-Version, Vp-Token, Vp-Signature, Accept-ApiKey, Accept-ApiSign, Accept-ApiTime'
        )
        ctx.set('Access-Control-Allow-Credentials', true)
        ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS')
        await next()
    }
}
