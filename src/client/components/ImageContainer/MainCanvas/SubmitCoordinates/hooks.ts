import { useDispatch } from 'react-redux'
import { postUploadLabels } from '@/redux/action/upload'

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

export const useUploadImageLabels = (imageLabelInfo: ImageLabelInfo) => {
  const dispatch = useDispatch()
  const uploadImageLabels = () => {
    dispatch(postUploadLabels(false, '', {}, imageLabelInfo))
  }
  return uploadImageLabels
}
