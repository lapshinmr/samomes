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
import type { RemineralExampleType } from '~/utils/types/types';

export const REMINERALS: RemineralExampleType[] = [
  {
    reagents: {
      'CaSO4(H2O)2': 1.88,
      'MgSO4(H2O)7': 1.28,
    },
    volume: 10,
    name: 'Kuban Aquariums Реминерализатор',
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=KQE7l637Rd8)',
  },
  {
    reagents: {
      'CaSO4(H2O)2': 1.253,
      'MgSO4(H2O)7': 0.844,
    },
    volume: 10,
    name: 'Samomes Gh+',
    description: 'Этот рецепт создан и проверен автором проекта Samomes',
  },
  {
    reagents: {
      CaCO3: 0.708,
      'MgSO4(H2O)7': 0.895,
    },
    volume: 10,
    name: 'Samomes Gh/Kh+',
    description: 'Этот рецепт создан и проверен автором проекта Samomes',
  },
  {
    reagents: {
      CaCO3: 0.357,
      'CaSO4(H2O)2': 0.641,
      'MgSO4(H2O)7': 0.84,
    },
    volume: 10,
    name: 'Samomes Gh/Kh-',
    description: 'Этот рецепт создан и проверен автором проекта Samomes',
  },
  {
    reagents: {
      'CaSO4(H2O)2': 5,
      'MgSO4(H2O)7': 7,
      CaCl2: 3,
      K2CO3: 0.5,
      NaHCO3: 1,
    },
    volume: 10,
    name: 'Реминерализатор от Романа Че',
    description: 'Рецепт Романа Че',
  },
  {
    reagents: {
      CaCO3: 0.714,
      'CaSO4(H2O)2': 0.395,
      'MgSO4(H2O)7': 1.196,
    },
    volume: 10,
    name: 'Samomes Gh8/Kh4',
    description: 'Этот рецепт создан специально для Сереги Ефремова ;)',
  },
];

REMINERALS.sort((a, b) => a.name.localeCompare(b.name));
