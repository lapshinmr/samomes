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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>Fertilizer</v-toolbar-title>
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
      { path: '/recipes', icon: 'mdi-clipboard-multiple-outline', text: 'Удобрения' },
      { path: '/schedules', icon: 'mdi-calendar-blank-multiple', text: 'Расписания' }
    ]
  })
}
</script>

<style lang="sass">
</style>
