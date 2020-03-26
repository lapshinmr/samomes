import Vue from 'vue'
import Router from 'vue-router'
import Tanks from './views/Tanks.vue'
import Recipes from './views/Recipes.vue'
import Schedules from './views/Schedules.vue'
import About from './views/About.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Tanks,
      alias: ['/tanks'],
      name: 'tanks'
    },
    {
      path: '/recipes',
      component: Recipes,
      name: 'recipes'
    },
    {
      path: '/schedules',
      component: Schedules,
      name: 'schedules'
    },
    {
      path: '/about',
      component: About,
      name: 'about'
    },
    {
      path: '/settings',
      component: Settings,
      name: 'settings'
    }
  ]
})
