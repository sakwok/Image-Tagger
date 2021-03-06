import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { fileListToArray } from '@/utils/index'
import { setUploadedImages } from '@/redux/action/uploadedImages'
import { postUploadImages } from '@/redux/action/upload'

export const useUploadImages = closeModal => {
  const [fileList, setFileList] = useState([])
  const dispatch = useDispatch()
  const [dropActive, setDropActive] = useState(false)
  const [isNextStep, setIsNextStep] = useState(false)
  const [imageIds, setImageIds] = useState(1)

  const inputUploadRef = useRef(null)

  const addFiles = async e => {
    const formFiles = e.target.files
    let filesArray = fileListToArray(formFiles)
    const allByteArrays = []
    for (const file of filesArray) {
      const fileByteArray = await getFileByteArray(file)
      allByteArrays.push(fileByteArray)
    }

    filesArray = filesArray.map(({ name: image_name }, index) => ({
      image_name,
      content: allByteArrays[index],
      type: 0
    }))

    setFileList([...fileList, ...filesArray])
  }

  const getFileByteArray = async (imgFile: File) => {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.onload = (event: any) => {
        const arrayBuffer: any = event.target.result
        resolve(Array.prototype.slice.call(new Uint8Array(arrayBuffer)))
      }
      reader.readAsArrayBuffer(imgFile)
    })
  }

  const removeFile = index => () => {
    const cleanFileList = [...fileList]
    cleanFileList.splice(index, 1)
    setFileList(cleanFileList)
    inputUploadRef.current.value = ''
  }

  const removeAllFiles = () => {
    setFileList([])
    inputUploadRef.current.value = ''
  }

  const openFileExplorer = () => {
    inputUploadRef.current.click()
  }

  const onFileDrop = async e => {
    e.preventDefault()
    let filesArray = fileListToArray(e.dataTransfer.files)
    const allByteArrays = []
    for (const file of filesArray) {
      const fileByteArray = await getFileByteArray(file)
      allByteArrays.push(fileByteArray)
    }

    filesArray = filesArray.map(({ name: image_name }, index) => ({
      image_name,
      content: allByteArrays[index],
      type: 0
    }))
    setFileList([...fileList, ...filesArray])
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

  const resetModal = (e?) => {
    if (!isNextStep || !e || e.target.type !== 'button') {
      setIsNextStep(false)
      setFileList([])
      closeModal()
      if (inputUploadRef.current) {
        inputUploadRef.current.value = ''
      }
    }

    setIsNextStep(false)
  }

  const onModalComplete = () => {
    if (isNextStep) {
      if (!imageIds) {
        return
      }

      const taggedFiles = fileList.map(file => (
        {
          ...file,
          type: imageIds
        }
      ))

      if (fileList.length > 0) {
        dispatch(setUploadedImages(taggedFiles))
        const data = { data: taggedFiles, type: imageIds }
        dispatch(postUploadImages(data))
      }
      resetModal()
    } else {
      if (fileList.length > 0) {
        setIsNextStep(true)
      }
    }
  }

  const handleInputChange = e => {
    setImageIds(Number(e.target.value))
  }

  return {
    dropActive,
    addFiles,
    removeFile,
    removeAllFiles,
    openFileExplorer,
    onFileDrop,
    onFileDragOver,
    onFileDragLeave,
    resetModal,
    onModalComplete,
    inputUploadRef,
    fileList,
    isNextStep,
    setIsNextStep,
    imageIds,
    handleInputChange,
  }
}
