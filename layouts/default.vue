<!--
  Samomes

  Copyright (C) 2022 Mikhail Lapshin

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
    <drawer v-model="drawer" />

    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>
        <div class="d-flex align-content-center text-uppercase">
          <span>{{ breadcrumbs[$router.currentRoute.name] }}</span>
        </div>
      </v-toolbar-title>
      <v-spacer />
      <div class="d-flex justify-end">
<!--        <LanguageSwitcher />-->
      </div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-main>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
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
import { ROUTES } from '~/constants/application';
import Drawer from '~/components/Layout/Drawer.vue';
// import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default {
  name: 'App',
  components: {
    Drawer,
    // LanguageSwitcher,
  },
  data() {
    return {};
  },
  // created() {
  //   this.initLang();
  // },
  mounted() {
    this.recipes.forEach((recipe, index) => {
      if (recipe.type === 'Готовое') {
        this.FERTILIZER_ADD(recipe);
        this.RECIPE_REMOVE(index);
      }
    });
    if (typeof this.guideIsClosed === 'boolean') {
      this.GUIDE_RESET();
    }
    if (!this.$router.currentRoute.query.share) {
      const path = localStorage.getItem('path');
      if (path) {
        localStorage.removeItem('path');
        this.$router.push(path);
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
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.DRAWER_SET(value);
      },
    },
    breadcrumbs() {
      const result = {};
      ROUTES.forEach((item) => {
        result[item.path] = this.$t(`routes.${item.path}`);
      });
      return result;
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
    // initLang() {
    //   if (process.client) {
    //     let lang = document.window.navigator.userLanguage || document.window.navigator.language;
    //     lang = lang === 'ru-RU' ? 'ru' : 'en';
    //     this.langSet(this.lang || lang);
    //   }
    // },
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
