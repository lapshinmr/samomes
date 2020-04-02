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
        <v-list-item href="https://github.com/lapshinmr/udo">
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
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
  },
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
  computed: {
    breadcrumbs () {
      let result = {}
      for (let item of this.links) {
        result[item.path] = item.text
      }
      return result
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
      'DRAWER_SET'
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

.w-100
  width: 100%!important

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s
</style>
