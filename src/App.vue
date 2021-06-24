<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

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
    <v-navigation-drawer
      app
      right
      v-model="drawer"
    >
      <v-list class="pt-0">
        <v-list-item
          v-if="$vuetify.breakpoint['xs']"
          @click.stop="drawer = false"
        >
          <v-list-item-action />
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-end">
              <v-icon>mdi-close</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in links"
          :to="{ name: item.name }"
          :key="item.icon"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`routes.${item.name}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://vk.com/samomes">
          <v-list-item-action>
            <v-icon>fab fa-vk</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Вконтакте</v-list-item-title>
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
      </v-list>
    </v-navigation-drawer>

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
        <LanguageSwitcher />
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
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default {
  name: 'App',
  components: {
    LanguageSwitcher,
  },
  data: () => ({
    links: [
      { name: 'tanks', icon: 'mdi-fishbowl-outline' },
      { name: 'recipes', icon: 'mdi-clipboard-text-multiple-outline' },
      { name: 'fertilizers', icon: 'mdi-flask' },
      { name: 'schedules', icon: 'mdi-calendar-blank-multiple' },
      { name: 'remineralization', icon: 'fas fa-cubes' },
      { name: 'dynamics', icon: 'far fa-chart-bar' },
      { name: 'settings', icon: 'fas fa-cog' },
      { name: 'about', icon: 'mdi-information-outline' },
    ],
  }),
  created() {
    this.initLang();
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
      this.links.forEach((item) => {
        result[item.name] = this.$t(`routes.${item.name}`);
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
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.DRAWER_SET(value);
      },
    },
  },
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
    initLang() {
      let lang = window.navigator.userLanguage || window.navigator.language;
      lang = lang === 'ru-RU' ? 'ru' : 'en';
      this.langSet(this.lang || lang);
    },
  },
};
</script>

<style lang="sass">
.v-toolbar__title
  font-size: 1rem!important
a
  text-decoration: none

.drawer
  right: calc(16px + 256px)!important
  transition: all 0.2s

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
