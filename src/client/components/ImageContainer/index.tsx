import React, { useRef, useState, useEffect } from 'react'
import { debounce } from 'lodash'

import { MainCanvas } from './MainCanvas/index'

import './style'

interface ImageContainerProps {

}

export const ImageContainer: React.FC<ImageContainerProps> = ({ }) => {

  const imageRef = useRef(null)
  const [imageBoundaries, setImageBoundaries] = useState({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })
  const [windowDimensions, setWindowDimensions] = useState({ height: window.innerHeight, width: window.innerWidth })

  useEffect(
    () => {
      const imageWrapCoords = imageRef.current.getBoundingClientRect()
      const { top, bottom, left, right, width, height } = imageWrapCoords
      setImageBoundaries({ top, bottom, left, right, width, height })
    }
    , [windowDimensions])

  useEffect(
    () => {
      const updateWindowDimensions = e => (setWindowDimensions({ height: e.target.innerHeight, width: e.target.innerWidth }))
      window.addEventListener('resize', debounce(updateWindowDimensions, 500))
      return window.removeEventListener('resize', updateWindowDimensions)
    }
    , [])

  console.log(imageBoundaries)
  return (
    <div className="image-container-wrap">
      <div className="image-wrap">
        <img className="main-image" ref={imageRef} src={'https://i.gyazo.com/e4aa09bb094a984fb526c7ad808dc6cf.png'} />
        <MainCanvas imageBoundaries={imageBoundaries} />
      </div>
    </div>
  )
}

export default ImageContainer
