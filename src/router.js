/**
 * Samomes
 *
 * Copyright (C) 2020 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
