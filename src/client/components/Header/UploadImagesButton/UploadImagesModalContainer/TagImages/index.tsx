import React from 'react'

import './style'

interface TagImagesProps {
  fileList: any[]
  handleInputChange: any
  invalidImageIds: boolean
}

export const TagImages: React.FC<TagImagesProps> = ({ fileList, handleInputChange, invalidImageIds }) => {

  return (
    <ul className="tag-images-wrap">
      {fileList.map(({ image_name }, index) => (
        <li key={`fl-tag-${index}`} className="file-tag-wrap">
          <div className="image-id-name" >{image_name}</div>
          <input className="image-id-input" type="number" name={`imageId${index}`} onChange={handleInputChange} />
        </li>
      ))}
      {invalidImageIds &&
        <li className="err-label-img-id" >Please Label All Image IDs</li>
      }
    </ul>
  )
}
