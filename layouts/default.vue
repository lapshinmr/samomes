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
          <a
            class="d-flex white--text"
            href="/"
          >
            <v-img
              :src="require('@/assets/images/npk-120x120.png')"
              max-height="24"
              max-width="24"
              alt="Main logotype NPK"
            />
            <span class="ml-1">
              Самомес
            </span>
          </a>
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
      <v-snackbar
        v-model="isSnackbarSurvey"
        timeout="-1"
      >
        <div class="d-flex">
          <div>
            <p>
              Добрый день, уважаемые аквариумисты!
            </p>
            <p>
              Мы активно работаем над развитием проекта Самомес и нуждаемся
              в вашем мнении для создания действительно полезного инструмента. Пожалуйста, уделите 10-15 минут
              на заполнение анкеты — ваш опыт и обратная связь помогут нам сделать приложение гораздо
              удобнее для ежедневных аквариумных задач.
              Участники исследования получат ранний доступ к новой версии сайта с обновленным функционалом.
              Каждый ответ важен для улучшения функциональности
              проекта! Анкета находится
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdJlrrrSV3-3nhZiDwYtaHagd90AiYlpjBionV19XPPuI6wDQ/formResponse"
                target="_blank"
              >ЗДЕСЬ</a>.
            </p>
            <p>
              Вы можете закрыть это сообщение и заполнить анкету позже. Ссылка на анкету находится в меню справа.
            </p>
            <p>
              Спасибо за помощь!
            </p>
          </div>
          <div>
            <v-btn
              color="pink"
              icon
              @click="isSnackbarSurvey = false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Drawer from '~/components/Layout/Drawer.vue';

export default {
  name: 'App',
  components: {
    Drawer,
  },
  async mounted() {
    // Handle page refresh with dynamic routes
    const redirectPath = localStorage.getItem('404_redirect_path');
    if (redirectPath) {
      localStorage.removeItem('404_redirect_path');
      await this.$router.replace(redirectPath);
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
    ]),
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
    isSnackbarSurvey: {
      get() {
        return this.$store.state.isSnackbarSurvey;
      },
      set() {
        this.SNACKBAR_SURVEY_HIDE();
      },
    },
  },
  methods: {
    ...mapMutations([
      'DRAWER_SET',
      'SNACKBAR_HIDE',
      'SNACKBAR_SURVEY_HIDE',
      'FERTILIZER_ADD',
      'RECIPE_REMOVE',
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
