import React, { useRef, } from 'react'
import { useInitCanvasBoundaries, useCanvasItems } from './hooks'

import { MainCanvas } from './MainCanvas/index'

import './style'

interface ImageContainerProps {

}

export const ImageContainer: React.FC<ImageContainerProps> = ({ }) => {

  const imageRef = useRef(null)
  const { imageBoundaries } = useInitCanvasBoundaries(imageRef)
  const canvasItems: CanvasItems = useCanvasItems()
  return (
    <div className="image-container-wrap">
      <div className="image-wrap">
        <img className="main-image" ref={imageRef} src={'https://i.gyazo.com/e4aa09bb094a984fb526c7ad808dc6cf.png'} />
        <MainCanvas imageBoundaries={imageBoundaries} canvasItems={canvasItems} />
      </div>
    </div>
  )
}

export default ImageContainer
