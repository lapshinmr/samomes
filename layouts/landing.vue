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
  <v-app class="bg-transparent">
    <v-app-bar
      :color="scrolled ? 'primary' : 'transparent'"
      :elevation="scrolled ? 4 : 0"
      height="48"
      class="v-app-bar-transition"
    >
      <v-app-bar-title class="text-body-1">
        <div class="d-flex">
          <a
            class="d-flex align-center text-white"
            href="/"
          >
            <v-img
              src="/images/npk-120x120.png"
              height="24"
              width="24"
              alt="Main logotype NPK"
            />
            <span class="text-uppercase ml-1">
              {{ t('home') }}
            </span>
          </a>
        </div>
      </v-app-bar-title>

      <!--      <LanguageSwitcher />-->

      <v-btn
        v-if="smAndUp"
        color="white"
        :to="appRoutes.dosing.path"
      >
        <Icon
          name="mdi-view-dashboard"
          size="24"
          class="mr-2"
        /> {{ t('dashboard') }}
      </v-btn>
      <v-btn
        v-else
        color="white"
        icon="mdi-view-dashboard"
        @click="onDashboardClick"
      />
    </v-app-bar>

    <v-main class="pt-0">
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
const { appRoutes } = useAppRoutes();
const router = useRouter();

const { t } = useI18n();
const { smAndUp } = useDisplay();

const tanksStore = useTanksStore();
const recipesStore = useRecipesStore();
const fertilizersStore = useFertilizersStore();
const remineralsStore = useRemineralsStore();
const schedulesStore = useSchedulesStore();
const snackbarStore = useSnackbarStore();
const { copyOldData } = useCopyOldData();

const isSnackbar = computed({
  get: () => snackbarStore.isVisible,
  set: () => snackbarStore.hide(),
});

// TODO: move to composable
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
});

function onDashboardClick () {
  if (schedulesStore.isSchedules) {
    return router.push(appRoutes.value.schedules.path);
  } else {
    return router.push(appRoutes.value.dosing.path);
  }
}

// Navbar scroll behaviour
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > window.innerHeight;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="sass">
a
  text-decoration: none

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

.v-app-bar-transition
  transition: all 0.3s
</style>
