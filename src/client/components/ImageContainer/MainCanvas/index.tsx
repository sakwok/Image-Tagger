import React, { Fragment, useRef, } from 'react'
import ReactTooltip from 'react-tooltip'

import { useCanvasDrawHandlers, useDisplayUnlabeled } from './hooks'
import Icon from '@/components/Atoms/Icon'
import { RectInfoTip } from './RectInfoTip/index'
import { calcStartPosition } from '@/utils/index'

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
  imageSrc: string
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ imageBoundaries, canvasItems, imageSrc }) => {

  const canvasRef = useRef(null)
  const { drawnRect, setDrawnRect, startPosition, tempPosition } = canvasItems
  // const validStartPosition = startPosition[0] || startPosition[1]
  const { draggingHandler, dragEndHandler, dragStartHandler, escDragging } = useCanvasDrawHandlers({ ...canvasItems, imageBoundaries, canvasRef })

  const topLeft = calcStartPosition(startPosition, tempPosition, imageBoundaries)

  if (startPosition[0] === 0 && startPosition[1] === 0) {
    const lastDrawnRect = drawnRect[drawnRect.length - 1]
    if (lastDrawnRect) {
      topLeft.x = lastDrawnRect.x
      topLeft.y = lastDrawnRect.y
      topLeft.height = lastDrawnRect.height
      topLeft.width = lastDrawnRect.width
    }
  }

  const iconRefs = []

  const setRef = ref => {
    iconRefs.push(ref)
  }

  const hideToolTip = index => () => {
    ReactTooltip.hide(iconRefs[index])
  }

  useDisplayUnlabeled(drawnRect, iconRefs)

  const magnRatio = topLeft => {
    let ratio = 5
    const biggest = Math.max(topLeft.width * ratio, topLeft.height * ratio)

    if (biggest > 200) {
      ratio = 200 / biggest * ratio
    }
    return ratio
  }
  console.log(drawnRect)
  const ratio = magnRatio(topLeft)
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
        onKeyDown={escDragging}
        tabIndex={0}
      >
        Browser does not support canvas
      </canvas>
      <span
        className="magn-region"
        style={{
          position: "absolute",
          top: 0,
          left: imageBoundaries.left + imageBoundaries.width + 10,
          display: 'inline-block',
          height: '200px',
          width: '200px',
          overflow: 'hidden',
          textAlign: 'left'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            backgroundImage: `url(${imageSrc})`,
            backgroundRepeat: 'no-repeat',
            width: topLeft.width * ratio,
            height: topLeft.height * ratio,
            backgroundSize: `${imageBoundaries.width * ratio}px ${imageBoundaries.height * ratio}px `,
            backgroundPosition: `left ${-(topLeft.x * ratio)}px top ${-(topLeft.y * ratio)}px`,
            zIndex: 5,
          }}
        />
      </span>
      <span
        className="magn-region"
        style={{
          position: "absolute",
          top: 210,
          left: imageBoundaries.left + imageBoundaries.width + 10,
          display: 'inline-block',
          // height: '200px',
          // width: '200px',
          overflow: 'hidden',
          textAlign: 'left'
        }}
      >

      </span>
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
