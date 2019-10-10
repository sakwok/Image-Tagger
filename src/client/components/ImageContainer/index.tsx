import React, { useRef, } from 'react'
import { useInitCanvasBoundaries, useCanvasItems } from './hooks'

import { MainCanvas } from './MainCanvas/index'

import { createImgPath } from '@/utils/index'

import './style'

interface ImageContainerProps {
  currDataSet: any[]
  currSetIdSet: number
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ currDataSet, currSetIdSet }) => {

  const imageRef = useRef(null)
  const { imageBoundaries } = useInitCanvasBoundaries(imageRef, currDataSet)
  const canvasItems: CanvasItems = useCanvasItems()
  return (
    <div className="image-container-wrap">
      {currDataSet.length ?
        <div className="image-wrap">
          <img className="main-image" ref={imageRef} src={createImgPath(currDataSet[0].image_path)} />
          <MainCanvas imageBoundaries={imageBoundaries} canvasItems={canvasItems} currPic={currDataSet[0]} currSetIdSet={currSetIdSet} />
        </div>
        : <div className="no-images">No images in this set</div>
      }

    </div>
  )
}

export default ImageContainer
