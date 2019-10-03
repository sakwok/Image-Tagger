import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

export const useInitCanvasBoundaries = imageRef => {
  const [imageBoundaries, setImageBoundaries] = useState({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })
  const [windowDimensions, setWindowDimensions] = useState({ height: window.innerHeight, width: window.innerWidth })

  useEffect(
    () => {
      const imageWrapCoords = imageRef.current.getBoundingClientRect()
      const { top, bottom, left, right, width, height } = imageWrapCoords
      setImageBoundaries({ top, bottom, left, right, width, height })
    }
    , [windowDimensions])

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

  return {
    startPosition, setStartPosition,
    tempPosition, setTempPosition,
    drawnRect, setDrawnRect
  }
}
