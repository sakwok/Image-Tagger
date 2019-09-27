export const createGuide = (t = +new Date()) => {
    const _stringRule = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return _stringRule.replace(/[xy]/g, e => {
        let r: number = 0
        let n: number = 0
        return (
            (r = (t + 16 * Math.random()) % 16 | 0),
            (t = Math.floor(t / 16)),
            (n = 'x' === e ? r : (3 & r) | 8),
            n.toString(16)
        )
    })
}

export const getIp = (ctx): string => {
    return typeof ctx.header['x-forwarded-for'] !== 'undefined' &&
        ctx.header['x-forwarded-for'].length > 0
        ? ctx.header['x-forwarded-for'].split(',')[0].replace(' ', '')
        : typeof ctx.header['x-real-ip'] !== 'undefined'
            ? ctx.header['x-real-ip']
            : ctx.ip
}

export const LangEnums = `${process.env.LANG_LIST || ''}`.split(',')
