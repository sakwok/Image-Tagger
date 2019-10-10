import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

export const useInitCanvasBoundaries = (imageRef, currDataSet) => {
  const [imageBoundaries, setImageBoundaries] = useState({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })
  const [windowDimensions, setWindowDimensions] = useState({ height: window.innerHeight, width: window.innerWidth })

  useEffect(
    () => {
      if (imageRef.current) {
        const imageWrapCoords = imageRef.current.getBoundingClientRect()
        const { top, bottom, left, right, width, height } = imageWrapCoords
        setImageBoundaries({ top, bottom, left, right, width, height })
      }
    }
    , [windowDimensions, currDataSet])

  useEffect(
    () => {
      const updateWindowDimensions = e => (setWindowDimensions({ height: e.target.innerHeight, width: e.target.innerWidth }))
      window.addEventListener('resize', debounce(updateWindowDimensions, 500))
      return window.removeEventListener('resize', updateWindowDimensions)
    }
    , [])

  return {
    imageBoundaries,
    setImageBoundaries
  }
}

export const useCanvasItems = () => {
  const [startPosition, setStartPosition] = useState([0, 0])
  const [tempPosition, setTempPosition] = useState([0, 0])
  const [drawnRect, setDrawnRect] = useState([])
  const [undoQ, setUndoQ] = useState([])
  const [redoQ, setRedoQ] = useState([])

  const compileDrawnRect = params => {
    const copyUndoQ = [...undoQ]
    copyUndoQ.push(drawnRect)
    setUndoQ(copyUndoQ)
    setRedoQ([])
    setDrawnRect(params)
  }

  const compileSetUndoQ = () => {
    if (undoQ.length === 0) return
    const copyUndoQ = [...undoQ]
    const undoObject = copyUndoQ.pop()
    setUndoQ(copyUndoQ)
    const copyRedoQ = [...redoQ]
    copyRedoQ.push(drawnRect)
    setRedoQ(copyRedoQ)
    setDrawnRect(undoObject)
  }

  const compileSetRedoQ = () => {
    if (redoQ.length === 0) return
    const copyRedoQ = [...redoQ]
    const redoObject = copyRedoQ.pop()
    setRedoQ(copyRedoQ)
    const copyUndoQ = [...undoQ]
    copyUndoQ.push(drawnRect)
    setUndoQ(copyUndoQ)
    setDrawnRect(redoObject)
  }

  return {
    startPosition, setStartPosition,
    tempPosition, setTempPosition,
    drawnRect, setDrawnRect: compileDrawnRect,
    undoQ,
    redoQ,
    setUndoQ: compileSetUndoQ,
    setRedoQ: compileSetRedoQ,
  }
}
