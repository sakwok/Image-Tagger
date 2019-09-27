/**
 * 语言包工具
 *
 * @class I18nModule
 */
class I18nModule {

  private locales: object = {}

  /**
   * 导入当前语种语言包
   *
   * @memberof I18nModule
   */
  public init = (locales: object): void => {
    this.locales = locales || {}
  }

  /**
   * 加载语言包
   *
   * @memberof I18nModule
   */
  public load = (key: string, data: object): void => {
    this.locales[key] = data
  }

  /**
   * 获取对应翻译文案
   * @param  {string} key    获取翻译的key
   * @param  {string} module 语言包模块名
   * @param  {object} data   参数
   * @return {string}        翻译文案
   */
  public getText = (
    key: string,
    module?: string,
    data?: object
  ): string => {
    module = module || 'common'
    let langText = this.locales[module] && this.locales[module][key] || ''
    if (typeof this.locales[module] === 'undefined') {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`%c ${module}语言包不存在，请检查`, 'font-size:40px;color:#ff0000;')
      }
    }

    if (data && langText) {
      for (const x in data) {
        if (data.hasOwnProperty(x)) {
          const reg = new RegExp('{{' + x + '}}', 'igm')
          langText = langText.replace(reg, data[x])
        }
      }
      return langText
    }
    if (langText === '') {
      langText = key
      if (process.env.NODE_ENV === 'development') {
        console.warn(`%c ${module}语言包下不存在${key}，请检查`, 'font-size:40px;color:#ff0000;')
      }
    }
    return langText
  }
}

const i18n = new I18nModule()

export default i18n
