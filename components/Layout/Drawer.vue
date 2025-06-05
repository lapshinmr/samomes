<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <v-navigation-drawer v-model="model" location="right">
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
            Установить
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-around mt-auto pa-4 text-grey-darken-1">
        <a href="https://vk.com/samomes" target="_blank">
          <Icon
            name="mdi:vk-circle"
            size="36"
          />
        </a>
        <a href="https://t.me/samomes_calculator" target="_blank">
          <Icon
            name="mdi:telegram"
            size="36"
          />
        </a>
        <a href="https://github.com/lapshinmr/samomes" target="_blank">
          <Icon
            name="mdi:github"
            size="36"
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

const model = defineModel<boolean>();

const isPWAInstallButton = ref(true);
const isPWAPopup = ref(false);
const deferredPrompt = ref(null);
const platform = ref('unknown');
const browser = ref('unknown');

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
