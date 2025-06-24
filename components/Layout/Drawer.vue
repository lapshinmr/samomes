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
  <v-navigation-drawer v-model="isDrawer">
    <div class="d-flex flex-column justify-between fill-height">
      <v-list class="pt-0">
        <v-list-item
          v-for="route in appRoutes"
          :key="route.icon"
          :to="route.path"
        >
          <template #prepend>
            <Icon
              :name="route.icon"
              size="24"
              class="mr-2 mr-sm-4 text-grey-darken-1"
            />
          </template>
          <v-list-item-title>
            {{ t(`routes.${route.key}`) }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="isPWAInstallButton"
          @click="onInstall"
        >
          <template #prepend>
            <Icon
              name="mdi-download"
              size="24"
              class="mr-2 mr-sm-4 text-grey-darken-1"
            />
          </template>
          <v-list-item-title>
            {{ t('routes.install') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-around mt-auto pa-4">
        <a href="https://vk.com/samomes" target="_blank">
          <Icon
            name="mdi:vk-circle"
            size="36"
            class="text-grey-darken-1"
          />
        </a>
        <a href="https://t.me/samomes_calculator" target="_blank">
          <Icon
            name="mdi:telegram"
            size="36"
            class="text-grey-darken-1"
          />
        </a>
        <a href="https://github.com/lapshinmr/samomes" target="_blank">
          <Icon
            name="mdi:github"
            size="36"
            class="text-grey-darken-1"
          />
        </a>
      </div>
    </div>
    <ThePWAPopup
      v-model="isPWAPopup"
      :platform="platform"
      :browser="browser"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>

const { t } = useI18n();
const { appRoutes } = useAppRoutes();
const { $pwa } = useNuxtApp();
const drawerStore = useDrawerStore();

const isPWAInstallButton = ref(true);
const isPWAPopup = ref(false);
const deferredPrompt = ref(null);
const platform = ref('unknown');
const browser = ref('unknown');

const isDrawer = computed({
  get: () => drawerStore.isOpen,
  set: (value) => drawerStore.set(value),
});

function getPlatform() {
  // @ts-expect-error window.opera
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // @ts-expect-error window.MSStream
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  // @ts-expect-error window.MSStream
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent) && !window.MSStream) {
    return 'macos';
  }
  return 'unknown';
}

function isChrome() {
  // @ts-expect-error window.chrome
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav?.vendor;
  // @ts-expect-error window.opr
  const isOpera = typeof window.opr !== 'undefined';
  const isIEedge = winNav.userAgent.indexOf('Edg') > -1;
  const isGoogleChrome =
    // @ts-expect-error winNave.userAgentData
    typeof winNav?.userAgentData !== 'undefined'
      // @ts-expect-error winNave.userAgentData
      ? winNav.userAgentData.brands.some(
        (item) => item.brand === 'Google Chrome',
      )
      : vendorName === 'Google Inc.';

  return (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false &&
    isGoogleChrome
  );
}

async function onInstall() {
  if ($pwa.showInstallPrompt) {
    $pwa.install();
  } else {
    isPWAPopup.value = true;
  }
}

onMounted(() => {
  platform.value = getPlatform();
  browser.value = isChrome() ? 'chrome' : 'unknown';
  // This event is required to hide PWA install button in the PWA right after app is installed
  window.addEventListener('appinstalled', () => {
    isPWAInstallButton.value = false;
    deferredPrompt.value = null;
  });
  const isPWA =
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-expect-error window.navigator.standalone
    window.navigator.standalone === true;
  if (isPWA) {
    isPWAInstallButton.value = false;
  }
});
</script>

<style scoped></style>
