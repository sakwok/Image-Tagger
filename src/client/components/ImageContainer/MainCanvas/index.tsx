import React, { useRef, } from 'react'
import { useCanvasDrawHandlers } from './hooks'

import './style'

interface MainCanvasProps {
  imageBoundaries: any
  canvasItems: CanvasItems
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ imageBoundaries, canvasItems }) => {

  const canvasRef = useRef(null)

  const { draggingHandler, dragEndHandler, dragStartHandler } = useCanvasDrawHandlers({ ...canvasItems, imageBoundaries, canvasRef })

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
