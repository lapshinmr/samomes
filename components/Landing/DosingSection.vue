<template>
  <v-col
    id="dosing-section"
    cols="12"
    class="section"
  >
    <div class="d-flex flex-column flex-md-row">
      <div class="order-1 order-md-0 d-flex justify-center w-md-50 mb-4 mb-md-0">
        <div class="mx-8 mx-md-0">
          <PhoneVideoMockup class="mx-auto mx-md-0">
            <video
              autoplay
              loop
              muted
              playsinline
              width="100%"
              height="100%"
            >
              <source src="/video/dosing-optimized.mp4" type="video/mp4">
              {{ t('landing.videoError') }}
            </video>
          </PhoneVideoMockup>
          <div class="d-flex align-center flex-column d-md-none">
            <h3 class="text-h6 my-4 text-center font-weight-regular">
              {{ t('landing.dosingSection.subtitle') }}
            </h3>
            <v-btn
              color="primary"
              class="mb-10"
              :to="appRoutes.dosing.path"
            >
              {{ t('buttons.go') }}
            </v-btn>
          </div>
        </div>
      </div>
      <div class="order-0 order-md-1 w-md-40 align-self-center">
        <nuxt-link :to="appRoutes.dosing.path">
          <h2 class="text-h4 text-md-h2 mb-4 mb-md-10 text-primary text-center text-md-left">
            {{ t(`routes.${appRoutes.dosing.key}`) }}
          </h2>
        </nuxt-link>
        <div class="d-none d-md-block">
          <h3 class="text-h6 mb-md-10 text-md-left font-weight-regular">
            {{ t('landing.dosingSection.subtitle') }}
          </h3>
          <v-btn
            color="primary"
            class="mb-md-0"
            :to="appRoutes.dosing.path"
          >
            {{ t('buttons.go') }}
          </v-btn>
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
