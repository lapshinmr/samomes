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

import type { RemineralRecipeExampleType } from '~/utils/types/types';

export const REMINERAL_RECIPES: RemineralRecipeExampleType[] = [
  {
    reagents: [
      {
        key: 'CaSO4(H2O)2',
        amount: 1.28,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 1.88,
      },
    ],
    changeVolume: 10,
    name: 'Kuban Aquariums Реминерализатор',
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=KQE7l637Rd8)',
  },
  {
    reagents: [
      {
        key: 'CaSO4(H2O)2',
        amount: 1.253,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 0.844,
      },
    ],
    changeVolume: 10,
    name: 'Samomes Gh+',
    description: 'Этот рецепт создан и проверен автором проекта Samomes',
  },
  {
    reagents: [
      {
        key: 'CaCO3',
        amount: 0.708,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 0.895,
      },
    ],
    changeVolume: 10,
    name: 'Samomes Gh/Kh+',
    description: 'Этот рецепт создан и проверен автором проекта Samomes',
  },
  {
    reagents: [
      {
        key: 'CaCO3',
        amount: 0.357,
      },
      {
        key: 'CaSO4(H2O)2',
        amount: 0.641,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 0.84,
      },
    ],
    changeVolume: 10,
    name: 'Samomes Gh/Kh-',
    description: 'Этот рецепт создан и проверен автором проекта Samomes',
  },
  {
    reagents: [
      {
        key: 'CaSO4(H2O)2',
        amount: 5,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 7,
      },
      {
        key: 'CaCl2',
        amount: 3,
      },
      {
        key: 'K2CO3',
        amount: 0.5,
      },
      {
        key: 'NaHCO3',
        amount: 1,
      },
    ],
    changeVolume: 10,
    name: 'Реминерализатор от Романа Че',
    description: 'Рецепт Романа Че',
  },
  {
    reagents: [
      {
        key: 'CaCO3',
        amount: 0.714,
      },
      {
        key: 'CaSO4(H2O)2',
        amount: 0.395,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 1.196,
      },
    ],
    changeVolume: 10,
    name: 'Samomes Gh8/Kh4',
    description: 'Этот рецепт создан специально для Сереги Ефремова ;)',
  },
];

REMINERAL_RECIPES.sort((a, b) => a.name.localeCompare(b.name));
