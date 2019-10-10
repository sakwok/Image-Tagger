import { createSelector } from 'reselect'
import { currSetIdSelector } from '../images/index'

export const listSelector = state => state.list

export const currListSelector = createSelector(
  [currSetIdSelector, listSelector],
  (setId, list) => {
    if (!list[setId]) return []
    return list[setId]
  }
)
