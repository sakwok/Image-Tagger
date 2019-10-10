import React from 'react'
import classnames from 'classnames'

import { useUploadImageLabels } from './hooks'

import './style'

interface SubmitCoordinatesProps {
  drawnRect: DrawnRect[]
  imageBoundaries: ImageBoundaries
  currSetIdSet: number
  imageName: string
}

export const SubmitCoordinates: React.FC<SubmitCoordinatesProps> = ({ drawnRect, imageBoundaries, imageName, currSetIdSet }) => {
  const uploadImageLabels = useUploadImageLabels({
    data: drawnRect.map(({ x, y, width, height, label: name }) => ({ xmin: Math.round(x), ymin: Math.round(y), xmax: Math.round(x + width), ymax: Math.round(y + height), name })),
    image_name: imageName,
    type: currSetIdSet,
    image_height: Math.round(imageBoundaries.height),
    image_width: Math.round(imageBoundaries.width)
  })
  return (
    <div className={classnames("submit-button", !drawnRect.length && 'submit-disabled')} onClick={uploadImageLabels}>
      Submit Image Coordinates
    </div>
  )
}
