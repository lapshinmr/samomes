<template>
  <v-col
    id="schedules-section"
    cols="12"
    class="section"
  >
    <div class="d-flex flex-column flex-sm-row">
      <div class="ml-sm-auto align-self-center w-sm-40">
        <nuxt-link :to="appRoutes.schedules.path">
          <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
            {{ t(`routes.${appRoutes.schedules.key}`) }}
          </h2>
        </nuxt-link>
        <div class="d-none d-sm-block">
          <h3 class="text-h6 mb-sm-10 text-sm-left font-weight-regular">
            {{ t('landing.schedulesSection.subtitle') }}
          </h3>
          <v-btn
            color="primary"
            class="mb-sm-0"
            :to="appRoutes.schedules.path"
          >
            {{ t('buttons.go') }}
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-center w-sm-50">
        <div class="w-sm-50 mx-8 mx-sm-0">
          <PhoneVideoMockup>
            <video
              autoplay
              loop
              muted
              playsinline
              width="100%"
              height="auto"
            >
              <source src="/images/landing/schedule-optimized.mp4" type="video/mp4">
              Ваш браузер не поддерживает видео.
            </video>
          </PhoneVideoMockup>
          <div class="d-flex align-center flex-column d-sm-none">
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
