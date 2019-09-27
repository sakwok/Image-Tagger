import { LangEnums } from '../utils/index'
module.exports = () => {
    return async (ctx, next) => {
        const langKey = `${process.env.COOKIE_LANG_KEY}`
        let lang = ctx.request.query.lang
        if (!LangEnums.includes(lang)) {
            lang = ctx.cookies.get(langKey)
        }
        if (!LangEnums.includes(lang)) {
            lang = process.env.DEFAULT_LANG
        }
        ctx.cookies.set(langKey, lang, {
            httpOnly: false,
            domain: process.env.COOKIE_DOMAIN,
            expires: new Date(2147483647000),
        })
        ctx.request.lang = lang
        await next()
    }
}
