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
  <v-app id="inspire">
    <drawer v-model="isDrawer" />

    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>
        <div class="d-flex align-content-center text-uppercase">
          <a class="white--text" href="/">Самомес</a>
        </div>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click="isDrawer = !isDrawer" />
    </v-app-bar>

    <v-main>
      <transition
        name="fade"
        mode="out-in"
      >
        <nuxt />
      </transition>
      <v-snackbar v-model="isSnackbar">
        <div>
          {{ snackbarMessage }}
        </div>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { ROUTES } from '~/helpers/constants/application';
import Drawer from '~/components/Layout/Drawer.vue';

export default {
  name: 'App',
  components: {
    Drawer,
  },
  data() {
    return {
    };
  },
  async mounted() {
    // Handle page refresh with dynamic routes
    const redirectPath = localStorage.getItem('404_redirect_path');
    if (redirectPath) {
      localStorage.removeItem('404_redirect_path');
      await this.$router.replace(redirectPath);
    }
    if (typeof this.guideIsClosed === 'boolean') {
      this.GUIDE_RESET();
    }
    if (!this.$router.currentRoute.query.share) {
      const path = localStorage.getItem('path');
      if (path) {
        localStorage.removeItem('path');
        await this.$router.push(path);
      }
    }
  },
  computed: {
    ...mapState([
      'isSnackbar',
      'snackbarMessage',
      'lang',
      'recipes',
      'guideIsClosed',
    ]),
    breadcrumbs() {
      const result = {};
      ROUTES.forEach((item) => {
        result[item.path] = this.$t(`routes.${item.path}`);
      });
      return result;
    },
    isDrawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.DRAWER_SET(value);
      },
    },
    isSnackbar: {
      get() {
        return this.$store.state.isSnackbar;
      },
      set() {
        this.SNACKBAR_HIDE();
      },
    },
  },
  methods: {
    ...mapMutations([
      'DRAWER_SET',
      'SNACKBAR_HIDE',
      'FERTILIZER_ADD',
      'RECIPE_REMOVE',
      'GUIDE_RESET',
    ]),
    ...mapActions([
      'langSet',
    ]),
  },
};
</script>

<style lang="sass">
.v-toolbar__title
  font-size: 1rem!important
a
  text-decoration: none

.no-break
  word-break: normal

.v-stepper__step__step .v-icon
  font-size: 1rem!important

.w-100
  width: 100%!important

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s
</style>
