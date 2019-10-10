import React from 'react'

import './style'

interface TagImagesProps {
  fileList: any[]
  handleInputChange: any
}

export const TagImages: React.FC<TagImagesProps> = ({ fileList, handleInputChange }) => {

  return (
    <ul className="tag-images-wrap">
      {fileList.map(({ image_name }, index) => (
        <li key={`fl-tag-${index}`} className="file-tag-wrap">
          <div className="image-id-name" >{image_name}</div>
        </li>
      ))}
      <input className="image-id-input" type="number" name={`imageType`} onChange={handleInputChange} />
    </ul>
  )
}
