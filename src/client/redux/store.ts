import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION__?: typeof compose
    }
}

export default (initialState = {}) => {
    const enhancers = [
        applyMiddleware(thunk),
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    ]

    const store = createStore(rootReducer, initialState, compose(...enhancers))

    return store
}
