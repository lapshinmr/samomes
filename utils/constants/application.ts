/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
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

export const ROUTES = {
  tanks: {
    key: 'tanks',
    path: '/tanks/',
    icon: 'game-icons:aquarium',
  },
  recipes: {
    key: 'recipes',
    path: '/recipes/',
    icon: 'game-icons:fizzing-flask',
  },
  fertilizers: {
    key: 'fertilizers',
    path: '/fertilizers/',
    icon: 'game-icons:liquid-soap',
  },
  reminerals: {
    key: 'reminerals',
    path: '/reminerals/',
    icon: 'game-icons:powder',
  },
  dosing: {
    key: 'dosing',
    path: '/dosing/',
    icon: 'game-icons:settings-knobs',
  },
  remineralization: {
    key: 'remineralization',
    path: '/remineralization/',
    icon: 'game-icons:full-metal-bucket-handle',
  },
  schedules: {
    key: 'schedules',
    path: '/schedules/',
    icon: 'game-icons:toggles',
  },
  dynamics: {
    key: 'dynamics',
    path: '/dynamics/',
    icon: 'game-icons:chart',
  },
  articles: {
    key: 'articles',
    path: '/articles/',
    icon: 'game-icons:bookmarklet',
  },
  settings: {
    key: 'settings',
    path: '/settings/',
    icon: 'game-icons:cog',
  },
  about: {
    key: 'about',
    path: '/about/',
    icon: 'mdi:info-outline',
  },
};

export const DRAG_OPTIONS = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
};
