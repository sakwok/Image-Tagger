import axios from 'axios'
import { sleep } from './'

const RECONNECT_COUNT = 3

interface Handler {
    resolve?: Promise<any>
    reject?: Promise<any>
}

export interface RequestFace {
    url: string,
    params?: any
    method?: string
    withCredentials?: boolean
    headers?: object
    data?: any
    timeout?: number
    count?: number
    handler?: Handler
    lang?: string
    host?: boolean
}
export interface RequestParams extends Partial<RequestFace> {
    url: string,
}

const fetch = (request: RequestParams): Promise<any> => {
    const {
        url,
        params = {},
        method = 'GET',
        withCredentials = true,
        headers = {},
        data = {},
        lang,
        host,
        timeout = parseInt(`${process.env.REQUEST_TIMEOUT}`, 10),
        count = 0,
        handler = null,
    } = request
    let _resolve = null
    let _reject = null
    const options: RequestParams = {
        url,
        method,
        params,
        data,
        timeout,
        headers: {},
        withCredentials,
    }

    if (host) {
        if (url.indexOf('http') === -1) {
            options.timeout = 3000
            const _host = process.env.PORT !== '80' ? `127.0.0.1:${process.env.PORT}` : '127.0.0.1'
            options.url = `http://${_host}${url}`
        }
    }

    options.headers = {
        ...options.headers,
        ...headers,
    }

    if (method.toLocaleUpperCase() === 'GET') {
        options.params = {
            ...options.params,
            t: +new Date(),
        }
        if (host && lang) {
            options.params.lang = lang
        }
    }

    if (handler && handler.resolve && handler.reject) {
        _resolve = handler.resolve
        _reject = handler.reject
    }

    return new Promise((resolve, reject) => {
        if (_resolve === null) {
            _resolve = resolve
        }
        if (_reject === null) {
            _reject = reject
        }
        axios(options)
            .then(res => {
                if (res && res.data && res.data.code === -999) {
                    if (count < RECONNECT_COUNT && !host) {
                        return sleep(2).then(() => {
                            fetch({
                                ...request,
                                count: count + 1,
                                handler: {
                                    resolve: _resolve,
                                    reject: _reject,
                                },
                            })
                        })
                    }
                    return _reject(res.data)
                }
                _resolve(res.data)
            })
            .catch(err => {
                if (count < RECONNECT_COUNT && !host) {
                    return sleep(2).then(() => {
                        fetch({
                            ...request,
                            count: count + 1,
                            handler: {
                                resolve: _resolve,
                                reject: _reject,
                            },
                        })
                    })
                }
                return _reject(err)
            })
    })
}

export default fetch
