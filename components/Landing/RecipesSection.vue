<template>
  <v-col
    id="recipes-section"
    cols="12"
    class="section"
  >
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-sm-40 ml-sm-auto align-self-center">
        <nuxt-link :to="appRoutes.recipes.path">
          <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
            {{ t(`routes.${appRoutes.recipes.key}`) }}
          </h2>
        </nuxt-link>
        <h3 class="text-h6 mb-10 mb-sm-10 text-center text-sm-left font-weight-regular">
          {{ t('landing.fertilizersSection.subtitle') }}
        </h3>
        <v-btn
          color="primary"
          class="mb-10 mb-sm-0"
          :to="appRoutes.recipes.path"
        >
          {{ t('buttons.go') }}
        </v-btn>
      </div>
      <div class="d-flex justify-center w-sm-50">
        <div class="video-wrapper w-sm-50 elevation-4">
          <v-lazy>
            <video
              class="background-video"
              autoplay
              loop
              muted
              playsinline
              webkit-playsinline
              width="100%"
              height="auto"
            >
              <source src="/images/landing/schedule-optimized.mp4" type="video/mp4">
              Ваш браузер не поддерживает видео.
            </video>
          </v-lazy>
        </div>
      </div>
    </div>
  </v-col>
</template>

<script setup lang="ts">

const { t } = useI18n();
const { appRoutes } = useAppRoutes();
</script>

<style scoped lang="sass">

</style>
