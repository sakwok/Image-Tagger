import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'

import { useUploadImageLabels } from './hooks'

import './style'

interface SubmitCoordinatesProps {
  drawnRect: DrawnRect[]
  imageBoundaries: ImageBoundaries
  currSetIdSet: number
  imageName: string
  setDrawnRect: any
  clearQs: any
}

export const SubmitCoordinates: React.FC<SubmitCoordinatesProps> = ({ drawnRect, imageBoundaries, imageName, currSetIdSet, setDrawnRect, clearQs }) => {
  const imageRatio = useSelector((state: any) => state.images.imageRatio)
  const uploadImageLabels = useUploadImageLabels({
    data: drawnRect.map(({ x, y, width, height, label: name }) => {
      return { xmin: Math.round(x / imageRatio), ymin: Math.round(y / imageRatio), xmax: Math.round((x + width) / imageRatio), ymax: Math.round((y + height) / imageRatio), name }
    }),
    image_name: imageName,
    type: currSetIdSet,
    image_height: Math.round(imageBoundaries.height),
    image_width: Math.round(imageBoundaries.width),
  }, setDrawnRect, clearQs)
  return (
    <div className={classnames("submit-button", !drawnRect.length && 'submit-disabled')} onClick={uploadImageLabels}>
      Submit Image Coordinates
    </div>
  )
}
