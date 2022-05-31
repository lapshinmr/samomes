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
import { ROUTES } from '~/constants/application';

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
