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
import type { RemineralRecipeExampleType } from '~/utils/types/types';

// TODO: change reagents structure to [{ key: string, amount: number }]?
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
    volume: 10,
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
    volume: 10,
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
    volume: 10,
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
    volume: 10,
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
    volume: 10,
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
    volume: 10,
    name: 'Samomes Gh8/Kh4',
    description: 'Этот рецепт создан специально для Сереги Ефремова ;)',
  },
];

REMINERAL_RECIPES.sort((a, b) => a.name.localeCompare(b.name));
