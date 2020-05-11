<template>
  <select
    class="LanguageSwitcher"
    name="language"
    @change="changeLanguage"
  >
    <option
      v-for="lang in supportedLanguages"
      :key="lang"
      :selected="isCurrentLanguage(lang)"
      :class="{ 'is-selected': isCurrentLanguage(lang) }"
      :value="lang"
    >
      {{lang}}
    </option>
  </select>
</template>
<script>
import { Trans } from '@/plugins/trans'
export default {
  computed: {
    currentLanguage () {
      return Trans.currentLanguage
    },
    supportedLanguages () {
      return Trans.supportedLanguages
    }
  },
  methods: {
    changeLanguage (e) {
      const lang = e.target.value
      const to = this.$router.resolve({ params: { lang } })
      return Trans.changeLanguage(lang).then(() => {
        this.$router.push(to.location)
      })
    },
    isCurrentLanguage (lang) {
      return lang === this.currentLanguage
    }
  }
}
</script>
