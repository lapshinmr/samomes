import Vue from 'vue'
import Router from 'vue-router'
import Tanks from './views/Tanks.vue'
import Recipes from './views/Recipes.vue'
import Schedules from './views/Schedules.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Tanks,
      alias: ['/tanks'],
      name: 'Аквариумы'
    },
    {
      path: '/recipes',
      component: Recipes,
      name: 'Рецепты'
    },
    {
      path: '/schedules',
      component: Schedules,
      name: 'Расписание'
    },
    {
      path: '/about',
      component: About,
      name: 'О проекте'
    }
  ]
})
