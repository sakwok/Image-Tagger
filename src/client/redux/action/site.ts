import i18n from '@/utils/i18n'
import { setCookie } from '@/utils'
import * as types from '../types'
// import { changeLocaleAsync } from './appActions'

export const setLang = (data: string) => ({
  type: types.SET_SITE_LANG,
  payload: {
    data
  }
})

export const setSiteLang = (lang: string) => async (dispatch, getState) => {
  const site = getState().site
  i18n.init(site.language[lang])
  setCookie(process.env.COOKIE_LANG_KEY, lang, {
    expires: new Date(2147483647000)
  })
  // dispatch(changeLocaleAsync(lang))
  return dispatch(setLang(lang))
}

export const setLanguage = (data: object) => ({
  type: types.SET_SITE_LANGUAGE,
  payload: {
    data
  }
})
