import { combineReducers } from 'redux'
import site from './site'
import loading from './loading'
import completed from './completed'
import uploadedImages from './uploadedImages'
import images from './images'
import list from './list'

export default combineReducers({
    site,
    loading,
    completed,
    uploadedImages,
    images,
    list,
})
