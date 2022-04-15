/**
 * Samomes
 *
 * Copyright (C) 2022 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import VueI18n from 'vue-i18n';
import Vue from 'vue';
import { DEFAULT_LANGUAGE } from '@/constants/lang';
import messages from '@/locales/ru';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  messages,
});

const loadedLanguages = ['ru'];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  return import(`@/locales/${lang}.js`).then(
    (res) => {
      i18n.setLocaleMessage(lang, res.default[lang]);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    },
  );
}
