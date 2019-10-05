import React, { Fragment, useRef, } from 'react'
import ReactTooltip from 'react-tooltip'

import { useCanvasDrawHandlers, useDisplayUnlabeled } from './hooks'
import Icon from '@/components/Atoms/Icon'
import { RectInfoTip } from './RectInfoTip/index'

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
  const { drawnRect, setDrawnRect } = canvasItems

  const { draggingHandler, dragEndHandler, dragStartHandler } = useCanvasDrawHandlers({ ...canvasItems, imageBoundaries, canvasRef })

  const iconRefs = []

  const setRef = ref => {
    iconRefs.push(ref)
  }

  const hideToolTip = index => () => {
    ReactTooltip.hide(iconRefs[index])
  }

  useDisplayUnlabeled(drawnRect, iconRefs)

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
        drawnRect.map(({ x, y, label, width, height }, index) => {
          const icons = (
            <Fragment key={`pt-${index}`}>
              <Icon
                ref={setRef}
                type="plus-circle"
                className="rect-pt"
                style={{ top: y - 16, left: imageBoundaries.left + x - 8, fontSize: '16px', height: '16px' }}
                dataTip={true}
                dataFor={`rect-pt-${index}`}
                dataEvent='click focus'
              />
              <ReactTooltip id={`rect-pt-${index}`} clickable >
                <RectInfoTip x={x} y={y} label={label} width={width} height={height} drawnRect={drawnRect} setDrawnRect={setDrawnRect} index={index} hideToolTip={hideToolTip} />
              </ReactTooltip>
            </Fragment>)
          return icons
        })
      }
    </Fragment>
  )
}
