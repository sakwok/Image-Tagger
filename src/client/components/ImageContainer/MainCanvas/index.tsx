import React, { useRef, useEffect, useState } from 'react'

import './style'

interface MainCanvasProps {
  imageBoundaries: any
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ imageBoundaries }) => {

  const canvasRef = useRef(null)
  const [startPosition, setStartPosition] = useState([0, 0])
  const [tempPosition, setTempPosition] = useState([0, 0])
  const [drawnRect, setDrawnRect] = useState([])


  const dragStartHandler = (e) => {
    setStartPosition([e.clientX, e.clientY])
  }
  const draggingHandler = (e) => {
    if (startPosition[0] === 0 && startPosition[1] === 0) return
    setTempPosition([e.clientX, e.clientY])
  }
  const dragEndHandler = (e) => {
    let x = 0
    let y = 0
    let width = 0
    let height = 0
    if (e.clientX < startPosition[0] && e.clientY < startPosition[1]) {
      x = e.clientX - imageBoundaries.left
      y = e.clientY - imageBoundaries.top
      width = startPosition[0] - e.clientX
      height = startPosition[1] - e.clientY
    } else if (e.clientX < startPosition[0]) {
      x = e.clientX - imageBoundaries.left
      y = startPosition[1] - imageBoundaries.top
      width = startPosition[0] - e.clientX
      height = e.clientY - startPosition[1]
    } else if (e.clientY < startPosition[1]) {
      x = startPosition[0] - imageBoundaries.left
      y = e.clientY - imageBoundaries.top
      width = e.clientX - startPosition[0]
      height = startPosition[1] - e.clientY
    } else {
      x = startPosition[0] - imageBoundaries.left
      y = startPosition[1] - imageBoundaries.top
      width = e.clientX - startPosition[0]
      height = e.clientY - startPosition[1]
    }
    setDrawnRect([...drawnRect, {
      x, y, width, height
    }])
    setStartPosition([0, 0])
  }

  useEffect(() => {
    const canvasCtx = canvasRef.current.getContext('2d')
    canvasCtx.strokeStyle = 'red'
    // console.log(startPosition[0] - imageBoundaries.left, startPosition[1] - imageBoundaries.top)
    canvasCtx.clearRect(0, 0, imageBoundaries.width, imageBoundaries.height)
    canvasCtx.strokeRect(startPosition[0] - imageBoundaries.left, startPosition[1] - imageBoundaries.top, tempPosition[0] - startPosition[0], tempPosition[1] - startPosition[1])
    drawnRect.forEach(({ x, y, width, height }) => {
      canvasCtx.strokeRect(x, y, width, height)
    })
  }, [tempPosition])

  return (
    <canvas
      ref={canvasRef}
      className="main-canvas"
      style={{ top: 0, left: imageBoundaries.left - 10 }}
      width={imageBoundaries.width}
      height={imageBoundaries.height}
      onMouseDown={dragStartHandler}
      onMouseUp={dragEndHandler}
      onMouseMove={draggingHandler}
    >
      Browser does not support canvas
    </canvas>
  )
}