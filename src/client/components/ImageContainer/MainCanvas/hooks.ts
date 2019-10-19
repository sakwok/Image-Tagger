import { useEffect, useState } from 'react'
// import ReactTooltip from 'react-tooltip'

import { calcStartPosition } from '@/utils/index'

export const useCanvasDrawHandlers = (
  { startPosition,
    setStartPosition,
    tempPosition,
    setTempPosition,
    drawnRect,
    setDrawnRect,
    imageBoundaries,
    canvasRef }
) => {

  const [isDrawing, setIsDrawing] = useState(false)

  const dragStartHandler = e => {
    setTempPosition([e.clientX, e.clientY])
    setStartPosition([e.clientX, e.clientY])
    setIsDrawing(true)
  }

  const escDragging = e => {
    if (e.keyCode === 27 && isDrawing) {
      setStartPosition([0, 0])
      setIsDrawing(false)
      setTempPosition([0, 0])
    }
  }

  const draggingHandler = e => {
    if (startPosition[0] === 0 && startPosition[1] === 0) return
    setTempPosition([e.clientX, e.clientY])
  }
  const dragEndHandler = e => {
    if (startPosition[0] === 0 && startPosition[1] === 0 && tempPosition[0] === 0 && tempPosition[1] === 0) return
    const label = ''
    const { x, y, width, height, } = calcStartPosition(startPosition, [e.clientX, e.clientY], imageBoundaries)
    setDrawnRect([...drawnRect, {
      x, y, width, height, label
    }])
    setIsDrawing(false)
    setStartPosition([0, 0])
    setTempPosition([0, 0])

  }

  useEffect(() => {
    const canvasCtx = canvasRef.current.getContext('2d')
    canvasCtx.strokeStyle = 'red'
    canvasCtx.clearRect(0, 0, imageBoundaries.width, imageBoundaries.height)
    if (!(startPosition[0] === 0 && startPosition[1] === 0)) {
      canvasCtx.strokeRect(startPosition[0] - imageBoundaries.left, startPosition[1] - imageBoundaries.top, tempPosition[0] - startPosition[0], tempPosition[1] - startPosition[1])
    }
    drawnRect.forEach(({ x, y, width, height }) => {
      canvasCtx.strokeRect(x, y, width, height)
    })
  }, [tempPosition, drawnRect])

  return {
    dragStartHandler,
    draggingHandler,
    dragEndHandler,
    escDragging
  }

}

export const useToolTip = (drawnRect, iconRefs, ) => {
  const [hideTip, setDisplayTip] = useState({})

  const setSingleTip = (tipId, status) => () => {
    console.log('c;ick')
    setDisplayTip({
      ...hideTip,
      [tipId]: status
    })
  }

  useEffect(() => {
    iconRefs.forEach((_, index) => {
      // if (!drawnRect[index].label) {
      setSingleTip(`rect-pt-${index}`, false)
      // }
    })
    setSingleTip(`rect-pt-${iconRefs.length - 1}`, true)
    // ReactTooltip.show(iconRefs[iconRefs.length - 1])
  }, [drawnRect, hideTip])

  return {
    hideTip,
    setSingleTip
  }
}
