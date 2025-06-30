<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License. To view a copy of this license, visit
  http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
  Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

  You are free to:
  - Share — copy and redistribute the material in any medium or format
  - Adapt — remix, transform, and build upon the material

  Under the following terms:
  - Attribution — You must give appropriate credit
  - NonCommercial — You may not use the material for commercial purposes
  - ShareAlike — If you remix, transform, or build upon the material,
    you must distribute your contributions under the same license as the original

  No warranties are given. The license may not give you all of the permissions
  necessary for your intended use.
-->

<template>
  <v-app>
    <client-only>
      <v-app-bar
        color="primary"
        dark
        dense
        height="48"
      >
        <v-app-bar-nav-icon
          class="d-none d-sm-inline-block"
          @click="drawerStore.toggle"
        />

        <v-app-bar-title class="text-body-1" style="line-height: 1.5;">
          <div class="d-flex align-content-center text-uppercase">
            <a
              class="d-flex text-white"
              href="/"
            >
              <NuxtImg
                src="/images/npk-120x120.png"
                height="24"
                width="24"
                alt="Main logotype NPK"
              />
              <span class="ml-1">
                {{ t('home') }}
              </span>
            </a>
          </div>
        </v-app-bar-title>

        <!--        <LanguageSwitcher />-->

        <v-app-bar-nav-icon
          class="d-inline-block d-sm-none"
          @click="drawerStore.toggle"
        />

      </v-app-bar>

      <Drawer />

    </client-only>

    <v-main>
      <NuxtPwaManifest />
      <NuxtPage />
      <v-snackbar
        v-model="isSnackbar"
        :color="snackbarStore.color"
        :timeout="snackbarStore.timeout"
        location="top"
      >
        <div>
          {{ snackbarStore.message }}
        </div>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { appRoutes } = useAppRoutes();

const tanksStore = useTanksStore();
const recipesStore = useRecipesStore();
const fertilizersStore = useFertilizersStore();
const remineralsStore = useRemineralsStore();
const schedulesStore = useSchedulesStore();
const drawerStore = useDrawerStore();
const snackbarStore = useSnackbarStore();
const { copyOldData } = useCopyOldData();
const router = useRouter();
// const route = useRoute();

const isSnackbar = computed({
  get: () => snackbarStore.isVisible,
  set: () => snackbarStore.hide(),
});

onBeforeMount(() => {

  if (import.meta.client) {
    // TODO: remove this code after sometime
    copyOldData();

    if (
      schedulesStore.isSchedules
      && !sessionStorage.getItem('hasVisited')
    ) {
      sessionStorage.setItem('hasVisited', 'true');
      return router.push(appRoutes.value.schedules.path);
    } else if (
      (
        tanksStore.isTanks
        || recipesStore.isFertilizerRecipes
        || fertilizersStore.isFertilizers
        || remineralsStore.isReminerals
      ) && !sessionStorage.getItem('hasVisited')
    ) {
      sessionStorage.setItem('hasVisited', 'true');
      return router.push(appRoutes.value.dosing.path);
    }
  }
});

// Lifecycle hooks
onMounted(async () => {
  // TODO: investigate it
  // Handle page refresh with dynamic routes
  // const redirectPath = localStorage.getItem('404_redirect_path');
  // if (redirectPath) {
  //   localStorage.removeItem('404_redirect_path');
  //   await router.replace(redirectPath);
  //   return;
  // }

  // const path = localStorage.getItem('path');
  // if (path && !route.query.share) {
  //   localStorage.removeItem('path');
  //   await router.push(path);
  //   return;
  // }

  // Update localstorage data
});
</script>

<style lang="sass">
.v-toolbar__title
  font-size: 1rem !important

a
  text-decoration: none

.no-break
  word-break: normal

.v-stepper__step__step
  .v-icon
    font-size: 1rem !important

.w-100
  width: 100% !important

.page-enter-active, .page-leave-active
  transition: all 0.3s

.page-enter-from, .page-leave-to
  opacity: 0

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s

</style>
