import * as types from '../types/index'
import { getApiData } from './apiCalls'
import fetch from '@/utils/fetch'
import { removeCompletedImage } from '@/redux/action/images'

export const postUploadImages = ({ data, type }) => dispatch => {
  const proms = data.map(pic => {
    return (
      fetch({
        method: 'POST',
        url: '/api/v1/label/upload/images',
        data: {
          data: [pic],
          type
        }
      })
    )
  })

  Promise.all(proms)
    .then(values => {
      console.log(values)
      dispatch({ type: `${types.POST_UPLOAD_IMAGES}_SUCCESS` })
    })
    .catch(e => console.log(e))
}

// getApiData({
//
//   baseReducer: '',
//   type: types.POST_UPLOAD_IMAGES,
//   shapeData: undefined,
//   method: 'POST'
// })

export const postUploadLabels = getApiData({
  url: '/api/v1/label/upload/labels',
  baseReducer: '',
  type: types.POST_UPLOAD_LABELS,
  shapeData: removeCompletedImage,
  method: 'POST',
})
