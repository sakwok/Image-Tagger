import fetch, { RequestFace } from '@/utils/fetch'
import { batch } from 'react-redux'
import { isEmpty } from 'lodash'

export const reduxSet = (type, payload, stateCategory?, id?, idCategory?) => ({
  type,
  payload,
  stateCategory,
  id,
  idCategory
})

interface ReduxFetchParams extends RequestFace {
  baseReducer: string
  id?: number | string
  host?: boolean
  params?: any
  data?: any
  type: string
  url: string
  stateCategory?: string
  shapeData?: any
  idCategory?: string
  additionalData?: boolean
  limit?: number
  offset?: number
}

export const reduxFetch = (reduxFetchParams: ReduxFetchParams) => dispatch => {
  const { type, id, stateCategory, idCategory, shapeData = reduxSet, limit, offset } = reduxFetchParams
  dispatch({ type: `${type}_${id}_REQUEST` })
  return fetch({
    ...reduxFetchParams,
  }).then((res: any) => {
    if (res) {
      const responseData = res.data
      if (limit && offset) {
        responseData.limit = limit
        responseData.offset = offset
      }
      batch(() => {
        dispatch({ type: id ? `${type}_${id}_LOADED` : `${type}_LOADED` })
        dispatch({ type: id ? `${type}_${id}_SUCCESS` : `${type}_SUCCESS` })
        dispatch(shapeData(type, responseData, stateCategory, id, idCategory))
      })
      return res
    }
    batch(() => {
      dispatch({ type: id ? `${type}_${id}_LOADED` : `${type}_LOADED` })
      dispatch({ type: id ? `${type}_${id}_SUCCESS` : `${type}_FAILURE` })
    })
  }).catch(e => {
    console.log(e)
    batch(() => {
      dispatch({ type: id ? `${type}_${id}_LOADED` : `${type}_LOADED` })
      dispatch({ type: id ? `${type}_${id}_SUCCESS` : `${type}_FAILURE` })
    })
  })
}

export const createCrDataEndpoint = (endpoint: string) => `/api/data/v1/cr/${endpoint}`
export const createCrEtlEndpoint = (endpoint: string) => `/api/etl/v1/cr/${endpoint}`

export const getApiData = (reduxFetchParams: ReduxFetchParams) => (host = false, id = '', params = {}, data = {}, willDispatch = true, limit = 0, offset = 0) => (dispatch, getState) => {
  const { baseReducer = '', stateCategory = '', idCategory = '', additionalData = false } = reduxFetchParams
  const { [baseReducer]: desiredField } = getState().apiCalls
  let compiledParams = params
  if (id) {
    if (desiredField && desiredField[id] && desiredField[id][idCategory]) {
      if ((limit && offset) || additionalData) {
        const { limit: stateLimit = 0, offset: stateOffset = 0 } = desiredField[id][idCategory]
        compiledParams = {
          ...compiledParams,
          limit: stateLimit + limit,
          offset: stateOffset + offset
        }
      } else {
        return Promise.resolve()
      }
    }
  } else if (stateCategory) {
    if (desiredField && !isEmpty(desiredField[stateCategory])) {
      if ((limit && offset) || additionalData) {
        const { limit: stateLimit = 0, offset: stateOffset = 0 } = desiredField[stateCategory]
        compiledParams = {
          ...compiledParams,
          limit: stateLimit + limit,
          offset: stateOffset + offset
        }
      } else {
        return Promise.resolve()
      }
    }
  } else {
    if (!additionalData && !isEmpty(desiredField)) {
      if ((limit && offset) || additionalData) {
        const { limit: stateLimit = 0, offset: stateOffset = 0 } = desiredField
        compiledParams = {
          ...compiledParams,
          limit: stateLimit + limit,
          offset: stateOffset + offset
        }
      } else {
        return Promise.resolve()
      }
    }
  }

  const compiledReduxFetchParams = {
    ...reduxFetchParams,
    id,
    host,
    params: compiledParams,
    data,
  }

  if (willDispatch) {
    return dispatch(reduxFetch(compiledReduxFetchParams))
  }
  return fetch(compiledReduxFetchParams)
}
