import Vue from 'vue'
import Router from 'vue-router'
import Tanks from './views/Tanks.vue'
import Recipes from './views/Recipes.vue'
import Schedules from './views/Schedules.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Tanks,
      alias: ['/tanks']
    },
    {
      path: '/recipes',
      component: Recipes
    },
    {
      path: '/schedules',
      component: Schedules
    }
  ]
})
