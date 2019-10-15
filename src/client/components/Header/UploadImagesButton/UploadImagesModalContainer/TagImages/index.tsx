import React from 'react'
import { useSelector } from 'react-redux'

import './style'

interface TagImagesProps {
  fileList: any[]
  handleInputChange: any
  imageIds: number
}

// const setOptions = new Array(4).fill(1)

export const TagImages: React.FC<TagImagesProps> = ({ fileList, handleInputChange, imageIds }) => {

  const setOptions = useSelector((state: any) => state.list.listTypes)

  return (
    <div className="tag-images-wrap">
      <div className="tag-images-div">
        <div className="tag-images-text">Tag Image Data Set</div>
        <select onChange={handleInputChange} value={imageIds}>
          {setOptions.map((val, index) => (
            <option key={`opt-${index}`} value={val.type} >{val.name}</option>
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
