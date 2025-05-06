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
  <v-app>
    <client-only>
      <LayoutDrawer v-model="isDrawer" />
    </client-only>

    <v-app-bar
      color="primary"
      dark
      dense
    >
      <v-app-bar-title>
        <div class="d-flex align-content-center text-uppercase">
          <a
            class="d-flex text-white"
            href="/"
          >
            <v-img
              src="/images/npk-120x120.png"
              height="28"
              width="28"
              alt="Main logotype NPK"
            />
            <span class="ml-1">
              {{ t('home') }}
            </span>
          </a>
        </div>
      </v-app-bar-title>
      <LayoutLanguageSwitcher />
      <v-app-bar-nav-icon @click="drawerStore.toggle" />
    </v-app-bar>

    <v-main>
      <slot />
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
import { useRouter, useRoute } from 'vue-router';

const { t } = useI18n();

const drawerStore = useDrawerStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();
const route = useRoute();

const isDrawer = computed({
  get: () => drawerStore.isOpen,
  set: (value) => drawerStore.set(value),
});

const isSnackbar = computed({
  get: () => snackbarStore.isVisible,
  set: () => snackbarStore.hide(),
});

// Lifecycle hooks
onMounted(async () => {
  // Handle page refresh with dynamic routes
  const redirectPath = localStorage.getItem('404_redirect_path');
  if (redirectPath) {
    localStorage.removeItem('404_redirect_path');
    await router.replace(redirectPath);
  }

  const path = localStorage.getItem('path');
  if (path && !route.query.share) {
    localStorage.removeItem('path');
    await router.push(path);
  }
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

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s

</style>
