import React, { useState } from 'react'

import { UploadImagesModalContainer } from './UploadImagesModalContainer'

import './style'

interface UploadImagesButtonProps {

}

export const UploadImagesButton: React.FC<UploadImagesButtonProps> = ({ }) => {
  const [displayModal, setDisplayModal] = useState(false)

  const openModal = () => {
    setDisplayModal(true)
  }

  const closeModal = () => {
    setDisplayModal(false)
  }

  return (
    <div className="upload-images-button-wrap">
      <div className="upload-img">
        <span className="upload-text" onClick={openModal} >Upload Images</span>
      </div>
      <UploadImagesModalContainer displayModal={displayModal} closeModal={closeModal} />
    </div>
  )
}
