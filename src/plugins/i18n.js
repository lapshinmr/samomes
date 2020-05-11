import VueI18n from 'vue-i18n'
import Vue from 'vue'
import { DEFAULT_LANGUAGE } from '@/constants'
import ru from '@/locales/ru.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  messages: { ru }
})
