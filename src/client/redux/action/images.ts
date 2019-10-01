import * as types from '../types/index'
import { getApiData } from './apiCalls'

export const getImages = getApiData({
  url: '/api/v1/label/images',
  baseReducer: 'images',
  type: types.GET_LABEL_IMAGES,
})
