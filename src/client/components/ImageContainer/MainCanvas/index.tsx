import React, { Fragment, useRef, } from 'react'
import classnames from 'classnames'

import { useCanvasDrawHandlers, useToolTip } from './hooks'
import Icon from '@/components/Atoms/Icon'
import { RectInfoTip } from './RectInfoTip/index'
import { calcStartPosition } from '@/utils/index'
import { createImgPath } from '@/utils/index'

import { SubmitCoordinates } from './SubmitCoordinates/index'

import './style'

interface MainCanvasProps {
  imageBoundaries: ImageBoundaries
  canvasItems: CanvasItems
  currPic: any
  currSetIdSet: number
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ imageBoundaries, canvasItems, currPic, currSetIdSet }) => {
  const canvasRef = useRef(null)
  const { drawnRect, setDrawnRect, startPosition, tempPosition, setRedoQ, setUndoQ, redoQ, undoQ, clearQs } = canvasItems
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

  const { hideTip, setSingleTip } = useToolTip(drawnRect, iconRefs)

  return (
    <Fragment>
      <canvas
        ref={canvasRef}
        className="main-canvas"
        style={{ top: 0, left: imageBoundaries.left }}
        height={imageBoundaries.height}
        width={imageBoundaries.width}
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
            backgroundImage: (!!drawnRect[drawnRect.length - 1]) || (topLeft.x && topLeft.y) ? `url(${createImgPath(currPic.image_path)})` : 'url()',
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
        <SubmitCoordinates clearQs={clearQs} drawnRect={drawnRect} imageBoundaries={imageBoundaries} currSetIdSet={currSetIdSet} imageName={currPic.image_name} setDrawnRect={setDrawnRect} />
      </div>
      {
        drawnRect.map(({ x, y, label, width, height }, index) => {
          const tipId = `rect-pt-${index}`
          const icons = (
            <Fragment key={`pt-${index}`}>
              <Icon
                ref={setRef}
                type="plus-circle"
                className="rect-pt"
                style={{ top: y - 16, left: imageBoundaries.left + x - 8, fontSize: '16px', height: '16px' }}
                dataTip={true}
                dataFor={tipId}
                dataEvent='click focus'
                onClick={setSingleTip(tipId, false)}
              />
              <div className={classnames('react-tip', hideTip[tipId] && 'hidden-tip')}
                id={tipId}
                style={{
                  position: "absolute",
                  top: y - 170,
                  left: imageBoundaries.left + x - 90,
                }}
              >
                <RectInfoTip x={x} y={y} label={label} width={width} height={height} drawnRect={drawnRect} setDrawnRect={setDrawnRect} index={index} hideToolTip={setSingleTip(tipId, true)} />
              </div>
            </Fragment>)
          return icons
        })
      }
    </Fragment>
  )
}
