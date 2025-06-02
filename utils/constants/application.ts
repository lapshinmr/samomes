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
    icon: 'game-icons:aquarium',
  },
  recipes: {
    key: 'recipes',
    icon: 'game-icons:fizzing-flask',
  },
  fertilizers: {
    key: 'fertilizers',
    icon: 'game-icons:liquid-soap',
  },
  reminerals: {
    key: 'reminerals',
    icon: 'game-icons:powder',
  },
  dosing: {
    key: 'dosing',
    icon: 'game-icons:settings-knobs',
  },
  schedules: {
    key: 'schedules',
    icon: 'game-icons:toggles',
  },
  remineralization: {
    key: 'remineralization',
    icon: 'game-icons:full-metal-bucket-handle',
  },
  articles: {
    key: 'articles',
    icon: 'game-icons:bookmarklet',
  },
  settings: {
    key: 'settings',
    icon: 'game-icons:cog',
  },
  about: {
    key: 'about',
    icon: 'mdi:info-outline',
  },
} satisfies {
  [prop: string]: {
    key: string;
    icon: string;
  }
};

export type RouteType = keyof typeof ROUTES;

export const DRAG_OPTIONS = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
};
