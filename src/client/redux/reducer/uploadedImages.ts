import * as types from '../types'
import produce from 'immer'

export default produce((draft, action) => {
  const { payload, type } = action
  if (type === types.SET_UPLOADED_IMAGES) {
    draft.push(payload.uploadedImages)
    return
  }
}, [])
