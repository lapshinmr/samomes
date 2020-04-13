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

export const COMPONENTS = {
  'H': 1,
  'C': 12,
  'N': 14,
  'O': 16,
  'P': 31,
  'S': 32.1,
  'K': 39.1
}

export const FORMULAS = {
  'KNO3': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'N': {
        isNeeded: true,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 3
      }
    },
    solubilityLimit: 242,
    name: 'Калиевая селитра'
  },
  'KH2PO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'P': {
        isNeeded: true,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 4
      },
      'H': {
        isNeeded: false,
        count: 2
      }
    },
    solubilityLimit: 226,
    name: 'Монофосфат калия'
  },
  'K2SO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 2
      },
      'S': {
        isNeeded: false,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 4
      }
    },
    solubilityLimit: 111,
    name: 'Сернокислый калий'
  },
  'N2H4CO': {
    ions: {
      'N': {
        isNeeded: true,
        count: 2
      },
      'H': {
        isNeeded: false,
        count: 4
      },
      'C': {
        isNeeded: false,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 1
      }
    },
    solubilityLimit: 108,
    name: 'Карбамид (мочевина)'
  },
  'NH4NO3': {
    ions: {
      'N': {
        isNeeded: true,
        count: 2
      },
      'H': {
        isNeeded: false,
        count: 4
      },
      'O': {
        isNeeded: false,
        count: 3
      }
    },
    solubilityLimit: 190,
    name: 'Нитрат аммония'
  }
}

export const RECIPE_EXAMPLES = [
  {
    type: 'самомес',
    name: 'Нитрат Aqua Botanic 1',
    reagents: {
      KNO3: 82.88
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистая калиевая селитра. Рецепт взят с сайта aqua-botanic.ru.'
  },
  {
    type: 'самомес',
    name: 'Нитрат Aqua Botanic 2',
    reagents: {
      KNO3: 49.71,
      N2H4CO: 5.02,
      NH4NO3: 6.71
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Калиевая селитра, разбавленная мочевиной и натратом аммония. Рецепт взят с сайта aqua-botanic.ru.'
  },
  {
    type: 'самомес',
    name: 'Фосфат Aqua Botanic',
    reagents: {
      KH2PO4: 7.01
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистый монофосфат калия. Рецепт взят с сайта aqua-botanic.ru.'
  },
  {
    type: 'самомес',
    name: 'Калий Aqua Botanic',
    reagents: {
      K2SO4: 84.76
    },
    tankVolume: 100,
    fertilizerVolume: 1000,
    note: 'Чистый сульфат калия. Рецепт взят с сайта aqua-botanic.ru.'
  },
  {
    type: 'самомес',
    name: 'Prestige NPK самомес',
    reagents: {
      KNO3: 19.31,
      KH2PO4: 1.65
    },
    tankVolume: 100,
    fertilizerVolume: 250,
    note: 'Это аналог удобрения, который был получен на основе состава элементов, заявленных производителем.'
  },
  {
    type: 'самомес',
    name: 'Aquayer NPK самомес',
    reagents: {
      KNO3: 12.225,
      KH2PO4: 1.32,
      N2H4CO: 0.516,
      NH4NO3: 0.337
    },
    tankVolume: 100,
    fertilizerVolume: 250,
    note: 'Это аналог удобрения, который был получен на основе состава элементов, заявленных производителем. Соотношение мочевины к нитрату аммония взято с потолка.'
  },
  {
    type: 'самомес',
    name: 'Aquabalance NPK самомес',
    reagents: {
      KNO3: 8.174,
      KH2PO4: 1.61,
      N2H4CO: 2,
      NH4NO3: 1.6
    },
    tankVolume: 100,
    fertilizerVolume: 250,
    note: 'Это аналог удобрения, который был получен на основе состава элементов, заявленных производителем. Соотношение мочевины к нитрату аммония взято с потолка.'
  },
  {
    type: 'готовое',
    name: 'Prestige NPK',
    isPercent: false,
    elements: {
      N: 10.7,
      K: 32.0,
      P: 1.5
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquayer NPK',
    isPercent: false,
    elements: {
      N: 8.21,
      P: 1.20,
      K: 20.43
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquabalance NPK',
    isPercent: true,
    elements: {
      NO3: 4.65,
      PO4: 0.45,
      K: 1.45
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquabalance Micro (KH<4)',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.08,
      B: 0.008,
      Zn: 0.005,
      Cu: 0.01,
      Mo: 0.006
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
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
      Zn: 0.0185
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  }
]
