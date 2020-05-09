<!--
  Samomes

  Copyright (C) 2020 Mikhail Lapshin

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
    <v-navigation-drawer app right v-model="drawer">
      <v-list class="pt-0">
        <v-list-item v-if="$vuetify.breakpoint['xs']" @click.stop="drawer = false">
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-end">
              <v-icon>mdi-close</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in links" :to="item.path" :key="item.icon" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
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

    <v-app-bar app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>
        <div class="d-flex align-content-center text-uppercase">
          <span>{{ breadcrumbs[this.$router.currentRoute.path] }}</span>
        </div>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <v-container v-if="!tanks.length || !recipes.length || !schedules.length">
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-card>
              <v-card-title>
                Начните с этого:
              </v-card-title>
              <v-card-text>
                <div class="d-flex flex-column flex-sm-row pa-3 pa-sm-5 align-sm-center">
                  <router-link
                    :to="links[0].path"
                    class="d-flex align-center mx-2 mb-2 mb-sm-0"
                    :class="{'primary--text': tanks.length > 0}"
                  >
                    <v-icon v-if="tanks.length > 0" class="primary--text">fas fa-check-circle</v-icon>
                    <v-icon v-else>far fa-circle</v-icon>
                    <span class="ml-2">Добавить аквариум</span>
                  </router-link>
                  <v-divider class="d-none d-sm-block"></v-divider>
                  <router-link
                    :to="links[1].path"
                    class="d-flex align-center mx-2 mb-2 mb-sm-0"
                    :class="{'primary--text': recipes.length > 0}"
                  >
                    <v-icon v-if="recipes.length > 0" class="primary--text">fas fa-check-circle</v-icon>
                    <v-icon v-else>far fa-circle</v-icon>
                    <span class="ml-2">Создать рецепт</span>
                  </router-link>
                  <v-divider class="d-none d-sm-block"></v-divider>
                  <router-link
                    :to="links[2].path"
                    class="d-flex align-center mx-2"
                    :class="{'primary--text': schedules.length > 0}"
                  >
                    <v-icon v-if="schedules.length > 0" class="primary--text">fas fa-check-circle</v-icon>
                    <v-icon v-else>far fa-circle</v-icon>
                    <span class="ml-2">Составить расписание</span>
                  </router-link>
                </div>
                <div>
                  <router-link :to="links[4].path">Где я оказался?</router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <v-snackbar v-model="isSnackbar">
        <div>
            {{ snackbarMessage }}
        </div>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    links: [
      { path: '/', icon: 'mdi-fishbowl-outline', text: 'Аквариумы' },
      { path: '/recipes', icon: 'mdi-test-tube', text: 'Рецепты' },
      { path: '/schedules', icon: 'mdi-calendar-blank-multiple', text: 'Расписание' },
      { path: '/settings', icon: 'fas fa-cog', text: 'Настройки' },
      { path: '/about', icon: 'mdi-information-outline', text: 'О проекте' }
    ]
  }),
  created () {
    this.drawer = !this.$vuetify.breakpoint['xs']
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'schedules', 'isSnackbar', 'snackbarMessage'
    ]),
    breadcrumbs () {
      let result = {}
      for (let item of this.links) {
        result[item.path] = item.text
      }
      return result
    },
    isSnackbar: {
      get () {
        return this.$store.state.isSnackbar
      },
      set (value) {
        this.SNACKBAR_HIDE()
      }
    }
  },
  watch: {
    drawer () {
      this.DRAWER_SET(this.drawer)
    }
  },
  mounted () {
    if (!this.$router.currentRoute.query.share) {
      let path = localStorage.getItem('path')
      if (path) {
        localStorage.removeItem('path')
        this.$router.push(path)
      }
    }
  },
  methods: {
    ...mapMutations([
      'DRAWER_SET', 'SNACKBAR_HIDE'
    ])
  }
}
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
