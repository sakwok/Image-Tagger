import React from 'react'

import './style'

interface TagImagesProps {
  fileList: any[]
  handleInputChange: any
}

export const TagImages: React.FC<TagImagesProps> = ({ fileList, handleInputChange }) => {

  return (
    <div className="tag-images-wrap">
      <div className="tag-images-div">
        <div className="tag-images-text">Tag Image Data Set</div>
        <input className="image-id-input" type="number" name={`imageType`} onChange={handleInputChange} />
      </div>
      <ul className="tag-images-list">
        {fileList.map(({ image_name }, index) => (
          <li key={`fl-tag-${index}`} className="file-tag-wrap">
            <div className="image-id-name" >{image_name}</div>
          </li>
        ))}
      </ul>
    </div>

  )
}
