import * as types from '../types/index'
import { getApiData } from './apiCalls'

export const postUploadImages = getApiData({
  url: '/api/v1/label/upload/images',
  baseReducer: '',
  type: types.POST_UPLOAD_IMAGES,
  shapeData: () => { },
  method: 'POST'
})

export const postUploadLabels = getApiData({
  url: '/api/v1/label/upload/labels',
  baseReducer: '',
  type: types.POST_UPLOAD_IMAGES,
  shapeData: () => { },
  method: 'POST'
})
