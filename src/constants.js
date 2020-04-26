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
  'H': 1.00811,
  'B': 10.821,
  'C': 12.0116,
  'N': 14.00728,
  'O': 15.99977,
  'P': 30.973762,
  'S': 32.076,
  'K': 39.0983,
  'Ca': 40.078,
  'Mg': 24.307
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
    mass: 101.10489,
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
    mass: 136.0874,
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
    mass: 174.27168,
    solubilityLimit: 111,
    name: 'Сернокислый калий'
  },
  '(NH2)2CO': {
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
    mass: 60.05837,
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
    mass: 80.04631,
    solubilityLimit: 190,
    name: 'Нитрат аммония'
  },
  'MgSO4(H2O)7': {
    ions: {
      'Mg': {
        isNeeded: true,
        count: 1
      },
      'S': {
        isNeeded: false,
        count: 1
      },
      'H': {
        isNeeded: false,
        count: 14
      },
      'O': {
        isNeeded: false,
        count: 11
      }
    },
    mass: 246.49401,
    solubilityLimit: 355,
    name: 'Магния Сульфат (магнезия)'
  },
  'H3BO3': {
    ions: {
      'H': {
        isNeeded: false,
        count: 3
      },
      'B': {
        isNeeded: true,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 3
      }
    },
    mass: 61.83,
    solubilityLimit: 47.2,
    name: 'Борная кислота'
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
      '(NH2)2CO': 5.02,
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
      '(NH2)2CO': 0.516,
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
      '(NH2)2CO': 2,
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
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquabalance Нитрат',
    isPercent: true,
    elements: {
      NO3: 4.65,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquabalance Фосфат',
    isPercent: true,
    elements: {
      PO4: 0.45,
      K: 0.095
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
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
      Mo: 0.003
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
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
      Co: 0.007
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
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
      Co: 0.01204
    },
    note: 'Рецепт взят с сайта aqua-botanic.ru'
  }
]
