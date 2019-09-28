import * as types from '../types/index'

export const setUploadedImages = (uploadedImages: any[]) => ({
  type: types.SET_UPLOADED_IMAGES,
  payload: { uploadedImages }
})