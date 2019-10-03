import React, { Fragment, useRef, } from 'react'
import { useCanvasDrawHandlers } from './hooks'
import { Icon } from 'antd'

import './style'

interface MainCanvasProps {
  imageBoundaries: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
  }
  canvasItems: CanvasItems
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ imageBoundaries, canvasItems }) => {

  const canvasRef = useRef(null)
  const { drawnRect } = canvasItems

  const { draggingHandler, dragEndHandler, dragStartHandler } = useCanvasDrawHandlers({ ...canvasItems, imageBoundaries, canvasRef })
  console.log(drawnRect)
  return (
    <Fragment>
      <canvas
        ref={canvasRef}
        className="main-canvas"
        style={{ top: 0, left: imageBoundaries.left }}
        width={imageBoundaries.width}
        height={imageBoundaries.height}
        onMouseDown={dragStartHandler}
        onMouseUp={dragEndHandler}
        onMouseMove={draggingHandler}
      >
        Browser does not support canvas
    </canvas>
      {
        drawnRect.map(({ x, y, }, index) => (
          <Icon type="plus-circle" key={`pt-${index}`} className="rect-pt" style={{ top: y - 8, left: imageBoundaries.left + x - 8, }} />
        ))
      }
    </Fragment>
  )
}
