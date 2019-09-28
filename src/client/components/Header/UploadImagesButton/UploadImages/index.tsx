import React, { useState, useRef } from 'react'
import classnames from 'classnames'
import { Icon, Modal } from 'antd'
import './style'

import { useDispatch } from 'react-redux'
import { setUploadedImages } from '@/redux/action/uploadedImages'
import { fileListToArray } from '@/utils/index'

interface UploadImagesProps {
  displayModal: boolean
  closeModal: any
}

export const UploadImages: React.FC<UploadImagesProps> = ({ displayModal, closeModal }) => {

  const [fileList, setFileList] = useState([])
  const dispatch = useDispatch()
  const [dropActive, setDropActive] = useState(false)

  const inputUploadRef = useRef(null)

  const addFiles = e => {
    const formFiles = e.target.files
    const files = fileListToArray(formFiles)
    setFileList([...fileList, ...files])
  }

  const removeFile = index => () => {
    const cleanFileList = [...fileList]
    cleanFileList.splice(index, 1)
    setFileList(cleanFileList)
  }

  const openFileExplorer = () => {
    inputUploadRef.current.click()
  }

  const onFileDrop = e => {
    e.preventDefault()
    const dropFileList = fileListToArray(e.dataTransfer.files)
    setFileList([...fileList, ...dropFileList])
    setDropActive(false)
  }

  const onFileDragOver = e => {
    e.preventDefault()
    setDropActive(true)
  }

  const onFileDragLeave = e => {
    e.preventDefault()
    setDropActive(false)
  }

  const onModalComplete = () => {
    const imageUrls = fileList.map(file => window.URL.createObjectURL(file))
    closeModal()
    if (fileList.length > 0) {
      dispatch(setUploadedImages(imageUrls))
    }
  }

  return (
    <Modal
      title="Upload Images"
      visible={displayModal}
      onOk={onModalComplete}
      okText="Complete"
      onCancel={closeModal}
    >
      <div className="upload-images-wrap">
        <input
          id="file-input"
          type="file"
          multiple
          accept=".png,.jpeg,.jpg"
          ref={inputUploadRef}
          onChange={addFiles}
        />
        <div
          className={classnames("upload-drag-drop", dropActive && 'drop-active')}
          onDragOver={onFileDragOver}
          onDragLeave={onFileDragLeave}
          onDrop={onFileDrop}
        >
          <Icon type="cloud-upload" />
          &nbsp;
          Drag Images Here
        </div>
        <div className="upload-label-wrap">
          <span className="upload-label">
            <Icon type="file-image" />
            &nbsp;
        <span className="choose-photos" onClick={openFileExplorer} >Choose Images with Explorer</span>
          </span>
        </div>
        <div className="file-list">
          {
            fileList.length > 0 &&
            <div className="file-list-header">
              <div>Files Uploaded:</div>
              <div className="clear-all" onClick={() => setFileList([])} >Clear All</div>
            </div>
          }
          {fileList.map(({ name }, index) =>
            <li key={`file-${index}`}>
              <div className="file-name">- {name}</div>
              <Icon type="close" style={{ cursor: 'pointer' }} key={index} onClick={removeFile(index)} />
            </li>
          )}
        </div>
      </div>
    </Modal >

  )
}
