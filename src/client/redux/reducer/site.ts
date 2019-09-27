import * as types from '../types'

const initialState = {
  lang: process.env.DEFAULT_LANG,
  language: {},
  momentLocale: process.env.DEFAULT_LANG === 'zh_CN' ? 'zh-cn' : 'en'
} as SiteInitialState

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.SET_SITE_LANG: {
      return {
        ...state,
        lang: action.payload.data,
        momentLocale: action.payload.data === 'zh_CN' ? 'zh-cn' : 'en'
      }
    }
    case types.SET_SITE_LANGUAGE: {
      return {
        ...state,
        language: action.payload.data
      }
    }
    default: {
      return state
    }
  }
}
