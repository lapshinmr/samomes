/**
 * Samomes
 *
 * Copyright (C) 2021 Mikhail Lapshin
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

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function load(view) {
  return () => import(`@/views/${view}.vue`);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: load('home'),
      name: 'home',
    },
    {
      path: '/tanks',
      component: load('tanks'),
      name: 'tanks',
    },
    {
      path: '/tanks/:id',
      component: load('tank'),
      name: 'tank',
    },
    {
      path: '/recipes',
      component: load('recipes'),
      name: 'recipes',
    },
    {
      path: '/recipes/:id',
      component: load('recipe'),
      name: 'recipe',
    },
    {
      path: '/fertilizers',
      component: load('fertilizers'),
      name: 'fertilizers',
    },
    {
      path: '/fertilizers/:id',
      component: load('fertilizer'),
      name: 'fertilizer',
    },
    {
      path: '/schedules',
      component: load('schedules'),
      name: 'schedules',
    },
    {
      path: '/schedules/:id',
      component: load('schedule'),
      name: 'schedule',
    },
    {
      path: '/remineralization',
      component: load('remineralization'),
      name: 'remineralization',
    },
    {
      path: '/dynamics',
      component: load('dynamics'),
      name: 'dynamics',
    },
    {
      path: '/about',
      component: load('about'),
      name: 'about',
    },
    {
      path: '/settings',
      component: load('settings'),
      name: 'settings',
    },
  ],
});
