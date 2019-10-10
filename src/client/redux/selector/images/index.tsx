export const currSetIdSelector = (state: any) => state.images.currentSet

// const currDataSetSelector = apiSelector => createSelector(
//   [currDataSetSelector, currentPlayerSelector],
//   (player, currPlayer) => {
//     if (!player || !player[currPlayer]) return null
//     return player[currPlayer][apiSelector]
//   }
// )