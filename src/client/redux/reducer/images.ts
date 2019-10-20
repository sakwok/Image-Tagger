import * as types from '../types'
import produce from 'immer'

export default produce((draft, action) => {
  const { payload, id, } = action
  switch (action.type) {
    case (types.GET_LABEL_IMAGES): {
      draft[id] = payload
      return
    }
    case (types.SET_CURRENT_DATA_SET): {
      draft.currentSet = payload.setId
      return
    }
    case (types.REMOVE_COMPLETED_IMAGE): {
      draft[draft.currentSet].splice(0, 1)
      return
    }
    case (types.SET_IMAGE_RATIO): {
      draft.imageRatio = payload.imageRatio
      return
    }
  }
}, { currentSet: 0 })
