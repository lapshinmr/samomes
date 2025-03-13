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
  <v-navigation-drawer
    app
    right
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list class="pt-0">
      <v-list-item
        v-if="$vuetify.breakpoint['xs']"
        @click.stop="$emit('input', false)"
      >
        <v-list-item-action />
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-end">
            <v-icon>mdi-close</v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="route in ROUTES"
        :key="route.icon"
        :to="`/${route.path}/`"
      >
        <v-list-item-action>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(`routes.${route.path}`) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        href="https://vk.com/samomes"
        @click="closeDrawer"
      >
        <v-list-item-action>
          <v-icon>fab fa-vk</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Вконтакте
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        href="https://github.com/lapshinmr/samomes"
        @click="closeDrawer"
      >
        <v-list-item-action>
          <v-icon>fab fa-github</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="isPWAInstallButton"
        @click="install"
      >
        <v-list-item-action>
          <v-icon>mdi mdi-download</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Установить</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <PWAPopup
      v-model="isPWAPopup"
      :platform="platform"
      :browser="browser"
    />
  </v-navigation-drawer>
</template>

<script>
import { ROUTES } from '~/helpers/constants/application';
import PWAPopup from '~/components/Popups/PWAPopup.vue';

export default {
  name: 'Drawer',
  components: {
    PWAPopup,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ROUTES,
      isPWAInstallButton: true,
      isPWAPopup: false,
      deferredPrompt: null,
      platform: 'unknown',
      browser: 'unknown',
    };
  },
  mounted() {
    this.platform = this.getPlatform();
    this.browser = this.isChrome() ? 'chrome' : 'unknown';
    // By default, we hide PWA install button on chrome because it can be already installed
    if (this.platform === 'macos' && this.isChrome()) {
      this.isPWAInstallButton = false;
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      this.deferredPrompt = e;
      this.isPWAInstallButton = true;
    });
    // This event is required to hide PWA install button in the PWA right after app is installed
    window.addEventListener('appinstalled', () => {
      this.isPWAInstallButton = false;
      this.deferredPrompt = null;
    });
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isPWA) {
      this.isPWAInstallButton = false;
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('input', false);
    },
    getPlatform() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
      } if (/android/i.test(userAgent)) {
        return 'android';
      } if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent) && !window.MSStream) {
        return 'macos';
      }
      return 'unknown';
    },
    isChrome() {
      const isChromium = window.chrome;
      const winNav = window.navigator;
      const vendorName = winNav?.vendor;
      const isOpera = typeof window.opr !== 'undefined';
      const isIEedge = winNav.userAgent.indexOf('Edg') > -1;
      const isGoogleChrome = (typeof winNav?.userAgentData !== 'undefined')
        ? winNav.userAgentData.brands.some((item) => item.brand === 'Google Chrome')
        : vendorName === 'Google Inc.';

      return isChromium !== null
        && typeof isChromium !== 'undefined'
        && vendorName === 'Google Inc.'
        && isOpera === false
        && isIEedge === false
        && isGoogleChrome;
    },
    async install() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
      } else {
        this.isPWAPopup = true;
      }
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
