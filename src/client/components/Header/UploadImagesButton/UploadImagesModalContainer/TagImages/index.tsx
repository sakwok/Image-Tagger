import React from 'react'

import './style'

interface TagImagesProps {
  fileList: any[]
  handleInputChange: any
  imageIds: number
}

const setOptions = new Array(4).fill(1)

export const TagImages: React.FC<TagImagesProps> = ({ fileList, handleInputChange, imageIds }) => {

  return (
    <div className="tag-images-wrap">
      <div className="tag-images-div">
        <div className="tag-images-text">Tag Image Data Set</div>
        <select onChange={handleInputChange} value={imageIds}>
          {setOptions.map((_val, index) => (
            <option value={index + 1} >{index + 1}</option>
          ))}
        </select>
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
