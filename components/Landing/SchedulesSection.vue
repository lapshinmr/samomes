<template>
  <v-col
    id="schedules-section"
    cols="12"
    class="section"
  >
    <div class="d-flex flex-column flex-md-row">
      <div class="ml-md-auto align-self-center w-md-40">
        <nuxt-link :to="appRoutes.schedules.path">
          <h2 class="text-h4 text-md-h2 mb-4 mb-md-10 text-primary text-center text-md-left">
            {{ t(`routes.${appRoutes.schedules.key}`) }}
          </h2>
        </nuxt-link>
        <div class="d-none d-md-block">
          <h3 class="text-h6 mb-md-10 text-md-left font-weight-regular">
            {{ t('landing.schedulesSection.subtitle') }}
          </h3>
          <v-btn
            color="primary"
            class="mb-md-0"
            :to="appRoutes.schedules.path"
          >
            {{ t('buttons.go') }}
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-center w-md-50">
        <div class="mx-8 mx-md-0">
          <PhoneVideoMockup class="mx-auto mx-md-0">
            <video
              autoplay
              loop
              muted
              playsinline
              width="100%"
              height="auto"
            >
              <source src="/video/schedule-optimized.mp4" type="video/mp4">
              Ваш браузер не поддерживает видео.
            </video>
          </PhoneVideoMockup>
          <div class="d-flex align-center flex-column d-md-none">
            <h3 class="text-h6 my-4 text-center font-weight-regular">
              {{ t('landing.schedulesSection.subtitle') }}
            </h3>
            <v-btn
              color="primary"
              class="mb-10"
              :to="appRoutes.schedules.path"
            >
              {{ t('buttons.go') }}
            </v-btn>
          </div>
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
