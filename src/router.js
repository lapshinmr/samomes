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
import { Trans } from '@/plugins/trans'

Vue.use(Router)

function load (view) {
  return () => import(`@/views/${view}.vue`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:lang',
      beforeEnter: Trans.routeMiddleware,
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'tanks',
          component: load('Tanks'),
          alias: [''],
          name: 'tanks'
        },
        {
          path: 'recipes',
          component: load('Recipes'),
          name: 'recipes'
        },
        {
          path: 'schedules',
          component: load('Schedules'),
          name: 'schedules'
        },
        {
          path: 'about',
          component: load('About'),
          name: 'about'
        },
        {
          path: 'settings',
          component: load('Settings'),
          name: 'settings'
        }
      ]
    },
    {
      // Redirect user to default lang version.
      path: '*',
      redirect (_) {
        return Trans.defaultLanguage
      }
    }
  ]
})
