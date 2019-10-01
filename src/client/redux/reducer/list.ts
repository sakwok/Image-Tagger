import * as types from '../types'
import produce from 'immer'

export default produce((_draft, action) => {
  const { payload, } = action
  switch (action.type) {
    case (types.GET_LABEL_LIST): {
      _draft = payload
      return
    }
    default: {
      return
    }
  }
}, {})
