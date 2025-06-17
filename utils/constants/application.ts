/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
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
  hardness: {
    key: 'hardness',
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
