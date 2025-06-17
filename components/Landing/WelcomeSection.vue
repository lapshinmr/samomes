<template>
  <v-col
    cols="12"
    class="section"
  >
    <h2 class="text-h4 text-sm-h2 mb-8 mb-sm-16 text-center">
      {{ t('landing.welcomeSection.title') }}
    </h2>
    <div class="d-flex flex-column align-center text-h6 font-weight-regular text-center">
      <p class="w-sm-33 mb-8">
        {{ t('landing.welcomeSection.line1') }}
      </p>
      <p class="mb-8">
        {{ t('landing.welcomeSection.line2') }}
      </p>
    </div>
  </v-col>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { appRoutes } = useAppRoutes();
</script>

<style scoped lang="sass">

</style>
