import { createSelector } from 'reselect'

export const imagesSelector = (state: any) => state.images
export const currSetIdSelector = (state: any) => state.images.currentSet

export const currDataSetSelector = createSelector(
  [currSetIdSelector, imagesSelector],
  (setId, images) => {
    if (!images[setId]) return []
    return images[setId]
  }
)
