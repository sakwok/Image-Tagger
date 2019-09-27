const axios = require('axios')
const logger = require('./logger').default
const { createGuide } = require('./')

interface Error {
    code: number
    message: string
    query: any
    success: boolean
    responseError?: any
}

interface Options {
    url: string
    method: string
    params: any
    data: any
    headers: object
    timeout: number
    request_time?: string
}

const fetch = ({
    url,
    params = {},
    method = 'GET',
    data = {},
    ip = '127.0.0.1',
}) => {
    const _guide = createGuide()
    let _url = url
    const dataApi = '/api/data'
    const etlApi = '/api/etl'
    if (_url.indexOf(dataApi) === 0) {
        _url = `${process.env.CR_DATA_API_HOST}${url.slice(dataApi.length)}`
    } else if (_url.indexOf(etlApi) === 0) {
        _url = `${process.env.CR_ETL_API_HOST}${url.slice(etlApi.length)}`
    } else if (_url.indexOf(`/api`) === 0) {
        _url = `${process.env.API_HOST}${url.slice(4)}`
    }
    const options: Options = {
        url: _url,
        method,
        params,
        data: method === 'GET' ? null : data,
        headers: {
            'X-Client-Ip': ip,
        },
        timeout: parseInt(process.env.REQUEST_TIMEOUT, 10)
    }

    const time = Date.now()
    return axios(options)
        .then(res => {
            if (res.status === 204) {
                return {
                    code: 204,
                    success: true,
                }
            }
            options.request_time = `${(Date.now() - time) / 1000}s`
            logger.info(`request url-----${_guide}-----`, options)
            // logger.info(`response data ------${_guide}-----`, res.data)
            return res.data
        })
        .catch(err => {
            options.request_time = `${(Date.now() - time) / 1000}s`
            logger.info(`request url-----${_guide}-----`, options)
            logger.error(`response error-----${_guide}-----`, err)
            const query = {
                data: options.data,
                params: options.params,
            }

            const error: Error = {
                code: -999,
                message: 'System Error.',
                query,
                success: false,
            }

            if (err.response && err.response.data) {
                error.responseError = err.response.data
            }

            return error
        })
}

export default fetch
