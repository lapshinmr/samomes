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

export default [
  {
    type: 'самомес',
    name: 'Нитрат Aqua Botanic 1',
    reagents: {
      KNO3: 82.88,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистая калиевая селитра. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    type: 'самомес',
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
    type: 'самомес',
    name: 'Фосфат Aqua Botanic',
    reagents: {
      KH2PO4: 7.01,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистый монофосфат калия. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    type: 'самомес',
    name: 'Калий Aqua Botanic',
    reagents: {
      K2SO4: 84.76,
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистый сульфат калия. Рецепт взят с сайта aqua-botanic.ru.',
  },
  {
    type: 'самомес',
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
    type: 'самомес',
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
    type: 'самомес',
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
  {
    type: 'готовое',
    name: 'Prestige NPK',
    isPercent: false,
    elements: {
      N: 10.7,
      K: 32.0,
      P: 1.5,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquabalance NPK',
    isPercent: true,
    elements: {
      NO3: 4.65,
      PO4: 0.45,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquabalance Нитрат',
    isPercent: true,
    elements: {
      NO3: 4.65,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquabalance Фосфат',
    isPercent: true,
    elements: {
      PO4: 0.45,
      K: 0.095,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquabalance Micro',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.05,
      Zn: 0.01,
      B: 0.009,
      Cu: 0.003,
      Mo: 0.003,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquabalance Micro Premium (KH<4)',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.08,
      B: 0.008,
      Zn: 0.005,
      Cu: 0.01,
      Mo: 0.006,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquabalance Ферро Баланс',
    isPercent: true,
    elements: {
      Fe: 0.7,
      Mn: 0.1,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Prestige Micro',
    isPercent: false,
    elements: {
      K: 12,
      Fe: 1.5,
      Mg: 0.8,
      Mn: 0.5,
      B: 0.06,
      Mo: 0.036,
      Zn: 0.0185,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquayer Macro+',
    isPercent: false,
    elements: {
      N: 8.21,
      P: 1.20,
      K: 20.43,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquayer Micro+',
    isPercent: false,
    elements: {
      K: 6.930,
      Fe: 1.2,
      Mg: 0.8,
      Mn: 0.4,
      B: 0.072,
      Mo: 0.03,
      Cu: 0.045,
      Zn: 0.015,
      Co: 0.007,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquayer Железо+',
    isPercent: false,
    elements: {
      Fe: 7.00,
      Mg: 1.3,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquayer Калий+',
    isPercent: false,
    elements: {
      K: 50,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquayer Smart Macro (Нитрат)',
    isPercent: false,
    elements: {
      NO3: 72,
      K: 45.3,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aquayer Smart Macro (Фосфат)',
    isPercent: false,
    elements: {
      PO4: 7.2,
      K: 3,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Aqua Botanic Micro',
    isPercent: false,
    elements: {
      K: 4,
      Fe: 2.67,
      Mg: 1.1,
      Mn: 0.3,
      Zn: 0.17,
      B: 0.1,
      Cu: 0.05,
      Mo: 0.02,
      Co: 0.01204,
    },
    note: 'Рецепт взят с сайта aqua-botanic.ru',
  },
  {
    type: 'готовое',
    name: 'Seachem Nitrogen',
    isPercent: true,
    elements: {
      N: 1.5,
      K: 2,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Seachem Phosphorus',
    isPercent: true,
    elements: {
      PO4: 0.45,
      K: 0.2,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Seachem Potassium',
    isPercent: true,
    elements: {
      K: 5,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Seachem Flourish',
    isPercent: true,
    elements: {
      N: 0.07,
      PO4: 0.01,
      K: 0.37,
      Ca: 0.14,
      Mg: 0.11,
      S: 0.2773,
      B: 0.009,
      Cl: 1.15,
      Co: 0.0004,
      Cu: 0.0001,
      Fe: 0.32,
      Mn: 0.0118,
      Mo: 0.0009,
      Na: 0.13,
      Zn: 0.0007,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Seachem Fe',
    isPercent: true,
    elements: {
      Fe: 1,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Seachem Equilibrium',
    isPercent: true,
    elements: {
      K: 19.5,
      Ca: 8.06,
      Mg: 2.41,
      Fe: 0.11,
      Mn: 0.06,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Аквапозитив Азот+',
    isPercent: true,
    elements: {
      NO3: 6,
      K: 2.2,
      Ca: 0.3,
      Mg: 0.1,
    },
  },
  {
    type: 'готовое',
    name: 'Аквапозитив Фосфор+',
    isPercent: true,
    elements: {
      PO4: 0.5,
      K: 0.5,
      Mg: 0.1,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Аквапозитив Калий+',
    isPercent: true,
    elements: {
      K: 5,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Аквапозитив Микро+',
    isPercent: true,
    elements: {
      Fe: 0.13,
      Mn: 0.042,
      B: 0.01,
      Co: 0.0005,
      Cu: 0.0025,
      Mo: 0.0015,
      Zn: 0.007,
      Ni: 0.0002,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    type: 'готовое',
    name: 'Аквапозитив Железо+',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.04,
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
];
