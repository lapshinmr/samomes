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

export default [
  {
    name: 'Нитрат Aqua Botanic 1',
    reagents: {
      KNO3: 82.88,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистая калиевая селитра. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    name: 'Нитрат Aqua Botanic 2',
    reagents: {
      KNO3: 49.71,
      '(NH2)2CO': 5.02,
      NH4NO3: 6.71,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Калиевая селитра, разбавленная мочевиной и натратом аммония. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    name: 'Фосфат Aqua Botanic',
    reagents: {
      KH2PO4: 7.01,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистый монофосфат калия. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    name: 'Калий Aqua Botanic',
    reagents: {
      K2SO4: 84.76,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистый сульфат калия. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    name: 'NPK Amania.org 1:15',
    reagents: {
      KNO3: 106.45,
      KH2PO4: 5.77,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Макро в соотношении 1 к 15. Рецепт взят с сайта amania.org',
  },
  {
    name: 'NPK Amania.org 1:15 + амидный азот',
    reagents: {
      KNO3: 53.6,
      '(NH2)2CO': 16,
      KH2PO4: 5.77,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: (
      'Макро в соотношении 1 к 15. Калиевая селитра в соотношении 50 на 50 с мочевиной.'
      + ' Рецепт взят с сайта amania.org'
    ),
  },
  {
    name: 'Удо Ермолаева. МИКРО',
    reagents: {
      K2SO4: 7.45,
      'MgSO4(H2O)7': 16.4,
      'Fe2(SO4)3(H2O)9': 1.45,
      'CuSO4(H2O)5': 0.1,
      'ZnSO4(H2O)7': 0.04,
      H3BO3: 0.1,
      '(NH4)2MoO4': 0.04,
      'MnSO4(H2O)5': 0.73,
      'C10H14N2Na2O8(H2O)2': 2.5,
    },
    tankVolume: 100,
    fertilizerVolume: 500,
    note: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
];
