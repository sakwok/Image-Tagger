import React from 'react'
import { Modal } from 'antd'
import './style'

import { TagImages } from './TagImages/index'
import { UploadImages } from './UploadImages/index'
import { useUploadImages } from './hooks'

interface UploadImagesModalContainerProps {
  displayModal: boolean
  closeModal: any
}

export const UploadImagesModalContainer: React.FC<UploadImagesModalContainerProps> = ({ displayModal, closeModal }) => {

  const { onModalComplete,
    resetModal,
    inputUploadRef,
    addFiles,
    fileList,
    dropActive,
    onFileDragLeave,
    onFileDragOver,
    onFileDrop,
    openFileExplorer,
    removeAllFiles,
    removeFile,
    isNextStep,
    handleInputChange,
  } = useUploadImages(closeModal)

  return (
    <Modal
      title="Upload Images"
      visible={displayModal}
      onOk={onModalComplete}
      okText={isNextStep ? "Complete" : 'Next'}
      cancelText={isNextStep ? 'Back' : 'Cancel'}
      onCancel={resetModal}
    >
      {
        !isNextStep ?
          <UploadImages {...{
            inputUploadRef,
            addFiles,
            fileList,
            dropActive,
            onFileDragLeave,
            onFileDragOver,
            onFileDrop,
            openFileExplorer,
            removeAllFiles,
            removeFile
          }} /> :
          <TagImages fileList={fileList} handleInputChange={handleInputChange} />
      }
    </Modal >

  )
}
