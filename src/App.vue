<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Fertilizer</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
        <!--<Calculator />-->
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
    drawer: null,
    links: [
      { path: '/tanks', icon: 'mdi-fishbowl-outline', text: 'Аквариумы' },
      { path: '/recipes', icon: 'mdi-clipboard-multiple-outline', text: 'Удобрения' },
      { path: '/schedule', icon: 'mdi-calendar-blank-multiple', text: 'Расписания' }
    ]
  })
}
</script>

<style lang="sass">
</style>
