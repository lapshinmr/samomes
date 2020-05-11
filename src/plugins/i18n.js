import VueI18n from 'vue-i18n'
import Vue from 'vue'
import { DEFAULT_LANGUAGE } from '@/constants'
import messages from '@/locales/ru'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  messages
})

const loadedLanguages = ['ru']

function setI18nLanguage (lang) {
  i18n.locale = lang
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  return import(`@/locales/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default[lang])
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}
