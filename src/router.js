import Vue from 'vue'
import Router from 'vue-router'
import Calculator from './components/Calculator.vue'
import Tanks from './views/Tanks.vue'

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
    }
  ]
})
