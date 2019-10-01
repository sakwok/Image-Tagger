import * as types from '../types/index'
import { getApiData } from './apiCalls'

export const getList = getApiData({
  url: '/api/v1/label/list',
  baseReducer: 'list',
  type: types.GET_LABEL_LIST,
})
