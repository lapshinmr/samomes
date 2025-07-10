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
    key: 'kubanAquariumsGh',
    reagents: [
      {
        key: 'CaSO4(H2O)2',
        amount: 1.88,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 1.28,
      },
    ],
    changeVolume: 10,
    name: 'Kuban Aquariums Реминерализатор',
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=KQE7l637Rd8)',
  },
  {
    key: 'samomesGh',
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
    key: 'samomesGhKh',
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
    key: 'samomesGhLowKh',
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
    key: 'romanChe',
    reagents: [
      {
        key: 'CaSO4(H2O)2',
        amount: 0.634,
      },
      {
        key: 'MgSO4(H2O)7',
        amount: 0.887,
      },
      {
        key: 'CaCl2',
        amount: 0.38,
      },
      {
        key: 'K2CO3',
        amount: 0.0558,
      },
      {
        key: 'NaHCO3',
        amount: 0.112,
      },
    ],
    changeVolume: 10,
    name: 'Реминерализатор от Романа Че',
    description: 'Рецепт Романа Че',
  },
  {
    key: 'samomesGh8Kh4',
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

export const REMINERAL_RECIPE_NAMES_EN: {
  key: string;
  name: string;
  description: string;
}[] = [
  {
    key: 'kubanAquariumsGh',
    name: 'Kuban Aquariums Remineralizer',
    description: 'Recipe taken from Kuban Aquariums YouTube channel (https://www.youtube.com/watch?v=KQE7l637Rd8)',
  },
  {
    key: 'samomesGh',
    name: 'Samomes Gh+',
    description: 'This recipe was created and tested by the Samomes project author',
  },
  {
    key: 'samomesGhKh',
    name: 'Samomes Gh/Kh+',
    description: 'This recipe was created and tested by the Samomes project author',
  },
  {
    key: 'samomesGhLowKh',
    name: 'Samomes Gh/Kh-',
    description: 'This recipe was created and tested by the Samomes project author',
  },
  {
    key: 'romanChe',
    name: 'Roman Che Remineralizer',
    description: 'Recipe by Roman Che',
  },
  {
    key: 'samomesGh8Kh4',
    name: 'Samomes Gh8/Kh4',
    description: 'This recipe was created specifically for Serega Efremov ;)',
  },
];
