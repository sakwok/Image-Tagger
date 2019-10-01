import * as types from '../types'
import produce from 'immer'

export default produce((draft, action) => {
  const { payload, } = action
  switch (action.type) {
    case (types.GET_LABEL_LIST): {
      draft = payload
      return
    }
    default: {
      draft
      return
    }
  }
}, {})
