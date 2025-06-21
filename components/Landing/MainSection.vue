<template>
  <v-col
    cols="12"
    class="main-section position-relative"
    style="height: 100vh;"
  >
    <div class="main-section__content d-flex flex-column">
      <h1 class="main-section__title">
        {{ t('landing.title' )}}
      </h1>
      <h3 class="main-section__subtitle">
        {{ t('landing.subtitle' )}}
      </h3>
    </div>
    <ScrollIndicator />
  </v-col>
</template>

<script setup lang="ts">
const { t } = useI18n();

defineOptions({
  name: 'MainSection',
});
</script>

<style scoped lang="sass">
@import 'assets/variables.sass'

.main-section
  color: white
  text-shadow: 1px 1px 1px black
  @media (max-width: $xs)
    flex-direction: column
  .main-section__content
    position: absolute
    bottom: 100px
    left: 100px
    width: 60%
    @media (max-width: $xs)
      left: 24px
      bottom: 100px
      width: 90%
    .main-section__title
      letter-spacing: -0.0083333333em !important
      font-family: "Roboto", sans-serif !important
      font-weight: 300
      margin-bottom: 8px
      font-size: 7rem !important
      line-height: 3.75rem
      @media (max-width: $xs)
        font-size: 3.5rem !important
        line-height: 2.5rem
    .main-section__subtitle
      padding-left: 2rem
      font-size: 1.5rem !important
      font-weight: 400
      @media (max-width: $xs)
        font-size: 1.2rem !important
        padding-left: 1rem
</style>
