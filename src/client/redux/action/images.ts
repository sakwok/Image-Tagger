import * as types from '../types/index'
import { reduxSet } from './apiCalls'
import fetch from '@/utils/fetch'

export const getImages = type => dispatch => {
  return fetch({
    url: '/api/v1/label/images',
    params: {
      type,
      limit: 1,
      offset: 1,
    }
  }).then(result => {
    return dispatch(reduxSet(types.GET_LABEL_IMAGES, result.data, '', type, ''))
  })
}

// export const getImages = getApiData({
//   url: '/api/v1/label/images',
//   baseReducer: 'images',
//   type: types.GET_LABEL_IMAGES,
//   limit: 1,
//   offset: 1
// })

export const setCurrentDataSet = (setId: number) => ({
  type: types.SET_CURRENT_DATA_SET,
  payload: {
    setId
  }
})

export const removeCompletedImage = () => ({
  type: types.REMOVE_COMPLETED_IMAGE,
})

export const setImageRatio = imageRatio => ({
  type: types.SET_IMAGE_RATIO,
  payload: {
    imageRatio
  }
})
