import { loadLanguageAsync } from '@/plugins/i18n';

export default {
  langSet({ commit }, payload) {
    loadLanguageAsync(payload).then(() => {
      commit('LANG_SET', payload);
    });
  },
};
