import { useDispatch, useSelector } from 'react-redux'
import { postUploadLabels } from '@/redux/action/upload'
import { getImages } from '@/redux/action/images'

interface ImageLabelInfo {
  data: Array<{
    name: string,
    xmin: number,
    ymin: number,
    xmax: number,
    ymax: number
  }>
  image_name: string
  type: number
  image_width: number
  image_height: number
}

export const useUploadImageLabels = (imageLabelInfo: ImageLabelInfo, setDrawnRect, clearQs) => {
  const dispatch = useDispatch()
  const setId = useSelector((state: any) => state.images.currentSet)
  const uploadImageLabels = async () => {
    await Promise.all([dispatch(postUploadLabels(false, '', {}, imageLabelInfo))])
    await Promise.all([dispatch(getImages(setId))])
    setDrawnRect([])
    clearQs()
  }
  return uploadImageLabels
}
