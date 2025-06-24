<template>
  <v-col
    cols="12"
    class="main-section position-relative"
    style="height: 100vh;"
  >
    <div class="gradient-overlay" />

    <div class="main-section__content d-flex flex-column">
      <h1 class="main-section__title">
        {{ t('landing.mainSection.title') }}
      </h1>
      <h2 class="main-section__subtitle">
        {{ t('landing.mainSection.subtitle') }}
      </h2>
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

  .gradient-overlay
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 40%
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 25%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.5) 75%,
      rgba(0, 0, 0, 0.6) 100%
    )
    @media (max-width: $xs)
      height: 45%

  .main-section__content
    position: absolute
    bottom: 100px
    left: 100px
    width: 60%
    text-align: left
    @media (max-width: $xs)
      left: 24px
      bottom: 80px
      width: 90%
      text-align: center
    .main-section__title
      letter-spacing: -0.0083333333em !important
      font-family: "Roboto", sans-serif !important
      font-weight: 300
      margin-bottom: 8px
      font-size: 48px
      line-height: 3.75rem
      margin-bottom: 32px
      @media (max-width: $xs)
        font-size: 36px
        line-height: 2.5rem
        margin-bottom: 24px
    .main-section__subtitle
      font-size: 20px
      font-weight: 400
      @media (max-width: $xs)
        font-size: 1.2rem !important
</style>
