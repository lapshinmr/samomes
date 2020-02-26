import Vue from 'vue'
import Router from 'vue-router'
import Calculator from './components/Calculator.vue'
import Tanks from './views/Tanks.vue'
import Recipes from './views/Recipes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calculator',
      component: Calculator
    },
    {
      path: '/tanks',
      name: 'tanks',
      component: Tanks
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    }
  ]
})
