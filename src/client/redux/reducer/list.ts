import * as types from '../types'
import produce from 'immer'

export default produce((draft, action) => {
  const { payload, id } = action
  switch (action.type) {
    case (types.GET_LABEL_LIST): {
      draft[id] = payload
      return
    }
    case (types.GET_ALL_LIST_TYPES): {
      draft.listTypes = payload
      return
    }
    default: {
      return
    }
  }
}, {})
