import * as Cookies from 'js-cookie'
export { default as fetch } from './fetch'

// tslint:disable-next-line:no-empty
export const noop = () => { }

export const setCookie = (key: string, value: any, attr: object = {}) => {
    Cookies.set(key, value, {
        ...attr,
        domain: `${process.env.COOKIE_DOMAIN}`,
    })
}

export const getCookie = (cookieName: string) => {
    return Cookies.get(cookieName)
}

export const sleep = (time: number = 1) => {
    return new Promise(reslove => {
        setTimeout(reslove, time * 1000)
    })
}

export const parseNum = (num: number) => {
    return `${num >= 10 ? num : '0' + num}`
}

export const getParam = (search: string) => {
    const _$u = search.slice(1)
    let $u = []
    const r = {}
    if (_$u) {
        $u = _$u.split('&')
    } else {
        return r
    }
    $u.forEach(el => {
        const $n = el.split('=')
        r[$n[0]] = $n[1]
    })
    return r
}

export const ERROR_IMG_SRC = 'https://resource.vpesports.com/resource/game/csgo/team/d8290397364eef4a75e13eb67eaf27af.svg'

export const setErrorImg = e => {
    if (e && e.target) {
        e.target.src = ERROR_IMG_SRC
    }
}

function isWeixin() {
    const _agent = navigator.userAgent.toLowerCase()
    return /micromessenger/gi.test(_agent)
}

function isQQ() {
    if (navigator.userAgent.indexOf('MQQBrowser') !== -1) {
        return true
    } else {
        return false
    }
}

function getBrowser() {
    const userAgent = navigator.userAgent
    const isAndr = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android
    const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios
    if (isWeixin()) {
        return 'weixin'
    } else if (isAndr || isiOS) {
        if (isQQ()) {
            return 'qq'
        }
        return 'mobile'
    } else {
        return 'pc'
    }
}

declare global {
    interface Window {
        gio: any
        YKU: any
    }
}

export const gioPageSet = () => {
    const VA_Lang_Name = getCookie(`${process.env.COOKIE_LANG_KEY}`) || 'zh_CN'
    const VA_Device_Name = 'web'
    const VA_Device_UUID = getCookie('device_uuid') || ''
    const VA_Browse_Name = getBrowser()
    if (window.gio) {
        window.gio('page.set', {
            VP_Lang_Name: VA_Lang_Name,
            VP_Device_Name: VA_Device_Name,
            VP_Device_UUID: VA_Device_UUID,
            VP_Browse_Name: VA_Browse_Name
        })
    }
}

export const addHashTag = (id: string | string[]) => {
    if (typeof id === 'string') {
        return `#${id}`
    } else {
        return id.map(player => `#${player}`).join(',')
    }
}

export const fileListToArray = fileList => {
    const files = []
    for (let i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i))
    }
    return files
}

export const calcStartPosition = (startPosition, tempPosition, imageBoundaries) => {
    let x = 0
    let y = 0
    let width = 0
    let height = 0
    if (tempPosition[0] < startPosition[0] && tempPosition[1] < startPosition[1]) {
        x = tempPosition[0] - imageBoundaries.left
        y = tempPosition[1] - imageBoundaries.top
        width = startPosition[0] - tempPosition[0]
        height = startPosition[1] - tempPosition[1]
    } else if (tempPosition[0] < startPosition[0]) {
        x = tempPosition[0] - imageBoundaries.left
        y = startPosition[1] - imageBoundaries.top
        width = startPosition[0] - tempPosition[0]
        height = tempPosition[1] - startPosition[1]
    } else if (tempPosition[1] < startPosition[1]) {
        x = startPosition[0] - imageBoundaries.left
        y = tempPosition[1] - imageBoundaries.top
        width = tempPosition[0] - startPosition[0]
        height = startPosition[1] - tempPosition[1]
    } else {
        x = startPosition[0] - imageBoundaries.left
        y = startPosition[1] - imageBoundaries.top
        width = tempPosition[0] - startPosition[0]
        height = tempPosition[1] - startPosition[1]
    }
    return {
        x,
        y,
        width,
        height
    }
}

export const createImgPath = (endpoint: string) => `https://vp-test.oss-cn-hangzhou.aliyuncs.com/${endpoint}`