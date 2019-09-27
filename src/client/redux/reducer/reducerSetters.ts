export const simpleLoad = payload => ({
  ...payload
})

export const setNonIdLoad = (state, stateCategory, payload) => ({
  ...state,
  [stateCategory]: payload
})

export const setIdLoad = (draft, payload, id, idCategory) => {
  const multipleIds = id.split(',')
  // if (multipleIds.length > 1) {
  multipleIds.forEach((player, index) => {
    if (!draft[player]) draft[player] = {}
    const playerState = draft[player]
    if (playerState[idCategory]) {
      playerState[idCategory].push(payload[index])
    } else {
      playerState[idCategory] = payload[index]
    }
  })
  // } else {
  //   if (draft[id] && draft[id][idCategory]) {
  //     draft[id][idCategory].push(payload)
  //   } else {
  //     if (!draft[id]) {
  //       draft[id] = {}
  //     }
  //     draft[id][idCategory] = payload
  //   }
  // }
}

// export const setIdLoad = (state, payload, id, idCategory) => {
//   if (!state[id]) {
//     return ({
//       ...state,
//       [id]: {
//         [idCategory]: payload
//       }
//     })
//   }
//   if (!state[id][idCategory]) {
//     return ({
//       ...state,
//       [id]: {
//         ...state[id],
//         [idCategory]: payload
//       }
//     })
//   }
//   return ({
//     ...state,
//     [id]: {
//       ...state[id],
//       [idCategory]: [
//         ...state[id][idCategory],
//         ...payload
//       ]
//     }
//   })
// }

export const categoryIdLoad = (state, payload, stateCategory, id, idCategory, ) => {
  if (!state[stateCategory][id]) {
    return ({
      ...state,
      [stateCategory]: {
        ...state[stateCategory],
        [id]: {
          [idCategory]: payload
        }
      }
    })
  }
  if (!state[stateCategory][id][idCategory]) {
    return ({
      ...state,
      [stateCategory]: {
        ...state[stateCategory],
        [id]: {
          ...state[stateCategory][id],
          [idCategory]: payload
        }
      }
    })
  }
  return ({
    ...state,
    [stateCategory]: {
      ...state[stateCategory],
      [id]: {
        ...state[stateCategory][id],
        [idCategory]: [
          ...state[stateCategory][id][idCategory],
          ...payload
        ]
      }
    }
  })
}
