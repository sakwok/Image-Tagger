import React, { Fragment, useRef, } from 'react'
import ReactTooltip from 'react-tooltip'
import classnames from 'classnames'

import { useCanvasDrawHandlers, useDisplayUnlabeled } from './hooks'
import Icon from '@/components/Atoms/Icon'
import { RectInfoTip } from './RectInfoTip/index'
import { calcStartPosition } from '@/utils/index'

import { SubmitCoordinates } from './SubmitCoordinates/index'

import './style'

interface MainCanvasProps {
  imageBoundaries: ImageBoundaries
  canvasItems: CanvasItems
  imageSrc: string
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ imageBoundaries, canvasItems, imageSrc }) => {
  const canvasRef = useRef(null)
  const { drawnRect, setDrawnRect, startPosition, tempPosition, setRedoQ, setUndoQ, redoQ, undoQ } = canvasItems
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

  const defaultWidth = 200

  const magnRatio = topLeft => {
    let ratio = 5
    const biggest = Math.max(topLeft.width * ratio, topLeft.height * ratio)

    if (biggest > defaultWidth) {
      ratio = defaultWidth / biggest * ratio
    }
    return ratio
  }
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
          height: `${defaultWidth}px`,
          width: `${defaultWidth}px`,
          overflow: 'hidden',
          textAlign: 'left'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            backgroundImage: (!!drawnRect[drawnRect.length - 1]) || (topLeft.x && topLeft.y) ? `url(${imageSrc})` : 'url()',
            backgroundRepeat: 'no-repeat',
            width: topLeft.width * ratio,
            height: topLeft.height * ratio,
            backgroundSize: `${imageBoundaries.width * ratio}px ${imageBoundaries.height * ratio}px `,
            backgroundPosition: `left ${-(topLeft.x * ratio)}px top ${-(topLeft.y * ratio)}px`,
            zIndex: 5,
          }}
        />
      </span>
      <div
        className="side-bar-wrap"
        style={{
          position: "absolute",
          top: 210,
          left: imageBoundaries.left + imageBoundaries.width + 10,
          // height: `${defaultWidth}px`,
          width: `${defaultWidth}px`,
          overflow: 'hidden',
          textAlign: 'left'
        }}
      >
        <div className="undo-tool-wrap">
          <div className={classnames("undo-button undo-tool", undoQ.length === 0 && 'tool-disabled')} onClick={setUndoQ}>
            UNDO
          </div>
          <div className={classnames("redo-button undo-tool", redoQ.length === 0 && 'tool-disabled')} onClick={setRedoQ}>
            REDO
          </div>
        </div>
        <SubmitCoordinates drawnRect={drawnRect} imageBoundaries={imageBoundaries} />
      </div>
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
