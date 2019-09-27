import { combineReducers } from 'redux'
import site from './site'
import loading from './loading'
import completed from './completed'

export default combineReducers({
    site,
    loading,
    completed
})
