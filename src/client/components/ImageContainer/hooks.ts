import { useEffect, useState } from 'react'

export const useInitCanvasBoundaries = (imageRef, currDataSet) => {
  const [imageBoundaries, setImageBoundaries] = useState({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })
  const [windowDimensions, setWindowDimensions] = useState({ height: window.innerHeight, width: window.innerWidth })
  const [displayCanvas, setDisplayCanvas] = useState(false)
  useEffect(
    () => {
      if (imageRef.current) {
        const imageWrapCoords = imageRef.current.getBoundingClientRect()
        const { top, bottom, left, right, width, height } = imageWrapCoords

        setImageBoundaries(
          { top, bottom, left, right, width, height }
        )
      }
    }
    , [windowDimensions, currDataSet, imageRef])

  useEffect(
    () => {
      const updateWindowDimensions = e => (setWindowDimensions({ height: e.target.innerHeight, width: e.target.innerWidth }))
      window.addEventListener('resize', updateWindowDimensions)
      return window.removeEventListener('resize', updateWindowDimensions)
    }
    , [])

  useEffect(
    () => {
      // if (!imageRef.current) setDisplayCanvas(false)
      console.log('called')
      console.log(imageBoundaries && imageBoundaries.height !== 0 && imageRef.current)
      if (imageBoundaries && imageBoundaries.height !== 0 && imageRef.current) {
        setDisplayCanvas(true)
      }
    }, [imageBoundaries, imageRef]
  )

  return {
    imageBoundaries,
    setImageBoundaries,
    displayCanvas
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

  const clearQs = () => {
    setRedoQ([])
    setUndoQ([])
  }

  return {
    startPosition, setStartPosition,
    tempPosition, setTempPosition,
    drawnRect, setDrawnRect: compileDrawnRect,
    undoQ,
    redoQ,
    setUndoQ: compileSetUndoQ,
    setRedoQ: compileSetRedoQ,
    clearQs
  }
}
