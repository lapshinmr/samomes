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
        :to="`/${route.path}`"
        :key="route.icon"
        exact-path
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
      <v-list-item href="https://vk.com/samomes">
        <v-list-item-action>
          <v-icon>fab fa-vk</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Вконтакте
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="https://github.com/lapshinmr/samomes">
        <v-list-item-action>
          <v-icon>fab fa-github</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="deferredPrompt"
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
  </v-navigation-drawer>
</template>

<script>
import { ROUTES } from '~/helpers/constants/application';

export default {
  name: 'Drawer',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ROUTES,
      deferredPrompt: null,
    };
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
      });
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('appinstalled', () => {
        this.deferredPrompt = null;
      });
    }
  },
  methods: {
    async install() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
      }
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
