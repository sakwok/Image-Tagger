import * as types from '../types'
import produce from 'immer'

export default produce((draft, action) => {
  const { payload, id } = action
  switch (action.type) {
    case (types.GET_LABEL_LIST): {
      draft[id] = payload
      return
    }
    default: {
      return
    }
  }
}, {})
