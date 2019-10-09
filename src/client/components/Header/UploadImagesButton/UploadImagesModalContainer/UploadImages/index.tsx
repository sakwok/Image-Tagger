import React from 'react'
import classnames from 'classnames'
import { Icon } from 'antd'

import './style'

interface UploadImagesProps {
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
}

export const UploadImages: React.FC<UploadImagesProps> = ({
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
}) => {

  return (
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
            <div className="clear-all" onClick={removeAllFiles} >Clear All</div>
          </div>
        }
        {fileList.map(({ image_name }, index) =>
          <li key={`file-${index}`}>
            <div className="file-name">- {image_name}</div>
            <Icon type="close" style={{ cursor: 'pointer' }} key={index} onClick={removeFile(index)} />
          </li>
        )}
      </div>
    </div>
  )
}
