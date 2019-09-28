import { combineReducers } from 'redux'
import site from './site'
import loading from './loading'
import completed from './completed'
import uploadedImages from './uploadedImages'

export default combineReducers({
    site,
    loading,
    completed,
    uploadedImages
})
