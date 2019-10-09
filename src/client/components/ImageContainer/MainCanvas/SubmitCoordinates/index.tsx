import React from 'react'

import { useUploadImageLabels } from './hooks'

import './style'

interface SubmitCoordinatesProps {
  drawnRect: DrawnRect[]
  imageBoundaries: ImageBoundaries
}

export const SubmitCoordinates: React.FC<SubmitCoordinatesProps> = ({ drawnRect, imageBoundaries }) => {
  const uploadImageLabels = useUploadImageLabels({
    data: drawnRect.map(({ x, y, width, height, label: name }) => ({ xmin: x, ymin: y, xmax: x + width, ymax: y + height, name })),
    image_name: 'test',
    type: 0,
    image_height: imageBoundaries.height,
    image_width: imageBoundaries.width
  })
  return (
    <div className="submit-button" onClick={uploadImageLabels}>
      Submit Image Coordinates
    </div>
  )
}