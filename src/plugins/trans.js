import { SUPPORTED_LANGUAGES } from '@/constants'
import { i18n } from '@/plugins/i18n'

const Trans = {
  get defaultLanguage () {
    return 'ru'
  },
  get supportedLanguages () {
    return SUPPORTED_LANGUAGES
  },
  get currentLanguage () {
    return i18n.locale
  },
  set currentLanguage (lang) {
    i18n.locale = lang
  },
  loadLanguageFile (lang) {
    return import(`@/locales/${lang}.json`)
  },
  changeLanguage (lang) {
    if (!Trans.isLangSupported(lang)) return Promise.reject(new Error('Language not supported'))
    if (i18n.locale === lang) return Promise.resolve(lang)
    return Trans.loadLanguageFile(lang).then(msgs => {
      i18n.setLocaleMessage(lang, msgs.default || msgs)
      Trans.currentLanguage = lang
      return lang
    })
  },
  isLangSupported (lang) {
    return SUPPORTED_LANGUAGES.includes(lang)
  },
  routeMiddleware (to, _, next) {
    const lang = to.params.lang
    if (!Trans.isLangSupported(lang)) return next(Trans.defaultLanguage)
    return Trans.changeLanguage(lang).then(() => next())
  },
  i18nRoute (to) {
    return {
      ...to,
      params: { lang: this.currentLanguage, ...to.params }
    }
  }
}

export { Trans }
