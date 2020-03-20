<template>
  <v-app>
    <v-navigation-drawer app right v-model="drawer">
      <v-list>
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
          <span>Aqualizer</span>
          <v-icon class="mx-2">mdi-chevron-right</v-icon>
          <span>{{ this.$router.currentRoute.name }}</span>
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

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: false,
    links: [
      { path: '/tanks', icon: 'mdi-fishbowl-outline', text: 'Аквариумы' },
      { path: '/recipes', icon: 'mdi-test-tube', text: 'Рецепты' },
      { path: '/schedules', icon: 'mdi-calendar-blank-multiple', text: 'Расписание' },
      { path: '/about', icon: 'mdi-information-outline', text: 'О проекте' }
    ]
  }),
  mounted () {
    let path = localStorage.getItem('path')
    console.log(path)
    if (path) {
      localStorage.removeItem('path')
      this.$router.push(path)
    }
  }
}
</script>

<style lang="sass">
  .v-toolbar__title
    font-size: 1rem!important
  a.v-list-item
    text-decoration: none
</style>
