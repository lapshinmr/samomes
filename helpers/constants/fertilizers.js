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

export const FERTILIZERS = [
  {
    name: 'APT 3 / Complete',
    isPercent: true,
    elements: {
      N: 0.7,
      P2O5: 0.9,
      K2O: 7,
      Fe: 0.09,
      Mn: 0.015,
      MgO: 1.6,
      Cu: 0.0004,
      B: 0.015,
      Zn: 0.007,
      Mo: 0.000001,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-18',
  },
  // Prestige
  {
    name: 'Prestige FitoMin Macro',
    isPercent: false,
    elements: {
      N: 10.7,
      K: 32.0,
      P: 1.5,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Prestige FitoMin Калий',
    isPercent: false,
    elements: {
      K: 50,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Prestige FitoMin Micro',
    isPercent: true,
    elements: {
      K: 1.2,
      Fe: 0.15,
      Mg: 0.08,
      B: 0.006,
      Mn: 0.05,
      Mo: 0.003,
      Zn: 0.002,
      Cu: 0.002,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Prestige FitoMin Железо',
    isPercent: true,
    elements: {
      Fe: 6,
      Mn: 1.1,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  // Aquabalance
  {
    name: 'Aquabalance полный комплекс Total',
    isPercent: true,
    elements: {
      NO3: 4.65,
      PO4: 0.45,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
      Fe: 0.07,
      Mn: 0.015,
      B: 0.008,
      Zn: 0.006,
      Cu: 0.0015,
      Mo: 0.002,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Ферро Баланс',
    isPercent: true,
    elements: {
      Fe: 0.7,
      Mn: 0.1,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Калий Баланс',
    isPercent: true,
    elements: {
      K: 5,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Нитро Баланс',
    isPercent: true,
    elements: {
      NO3: 4.65,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Фосфо Баланс',
    isPercent: true,
    elements: {
      PO4: 0.45,
      K: 0.095,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Макро Баланс',
    isPercent: true,
    elements: {
      NO3: 4.65,
      PO4: 0.45,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Микро Баланс',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.05,
      Zn: 0.01,
      B: 0.009,
      Cu: 0.003,
      Mo: 0.003,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Микро Баланс + K',
    isPercent: true,
    elements: {
      K: 3,
      Fe: 0.2,
      Mn: 0.05,
      Zn: 0.01,
      B: 0.009,
      Cu: 0.003,
      Mo: 0.003,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Тотал-Мох',
    isPercent: true,
    elements: {
      NO3: 5,
      PO4: 0.5,
      Fe: 0.05,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки. Содержит макроэлементы: '
      + 'азот, фосфор, калий, кальций, магний, а так же микроэле- менты: железо, марганец,'
      + 'бор в том числе в органической форме.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Micro (KH<4)',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.08,
      B: 0.008,
      Zn: 0.005,
      Cu: 0.01,
      Mo: 0.006,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Micro (KH>4)',
    isPercent: true,
    elements: {
      Fe: 0.32,
      Mn: 0.08,
      B: 0.009,
      Zn: 0.008,
      Cu: 0.008,
      Mo: 0.003,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Макро корректор P+K',
    isPercent: true,
    elements: {
      PO4: 0.9,
      K2O: 0.4,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Макро корректор N+K',
    isPercent: true,
    elements: {
      NO3: 10,
      K: 1.76,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Aquabalance Premium Макро комплекс NPK',
    isPercent: true,
    elements: {
      NO3: 9.6,
      PO4: 0.9,
      K: 2,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Fe+Mn',
    isPercent: true,
    elements: {
      Fe: 1.0,
      Mn: 0.2,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Колор Баланс',
    isPercent: true,
    elements: {
      Mg: 3,
      Fe: 0.1,
      Mn: 0.05,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  // Aquayer
  {
    name: 'Aquayer Макро+',
    isPercent: false,
    elements: {
      N: 8.21,
      P: 1.20,
      K: 20.43,
    },
    note: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Микро+',
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
    note: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Железо+',
    isPercent: false,
    elements: {
      Fe: 7.00,
      Mg: 1.3,
    },
    note: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Калий+',
    isPercent: false,
    elements: {
      K: 50,
    },
    note: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Смарт Макро (Нитрат)',
    isPercent: false,
    elements: {
      NO3: 72,
      K: 45.3,
    },
    note: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Смарт Макро (Фосфат)',
    isPercent: false,
    elements: {
      PO4: 7.2,
      K: 3,
    },
    note: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  // Aquaerus
  {
    name: 'Aquaerus Макро',
    isPercent: false,
    elements: {
      N: 9.428,
      P: 1.394,
      K: 23.354,
    },
    note: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Aquaerus Микро',
    isPercent: false,
    elements: {
      K: 7.920,
      Fe: 1.372,
      Mg: 0.915,
      Mn: 0.457,
      B: 0.082,
      Cu: 0.052,
      Mo: 0.035,
      Zn: 0.017,
      Co: 0.008,
    },
    note: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Aquaerus Железо',
    isPercent: false,
    elements: {
      Fe: 7.00,
      Mg: 1.3,
    },
    note: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquaerus Калий',
    isPercent: false,
    elements: {
      K: 50,
    },
    note: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquaerus Нитрат+',
    isPercent: false,
    elements: {
      NO3: 72,
      K: 45.3,
    },
    note: 'Это фирменное удобрение. ВНИМАНИЕ! Производитель не указал содержание калия в этом удобрении. '
      + 'Но в оригинальном удобрении калий присутствует. Также пользователи указывают на повышение калия в аквариуме.'
      + 'Поэтому безопаснее для аквариума будет учитывать калий как в удобрении Aquayer.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquaerus Фосфат+',
    isPercent: false,
    elements: {
      PO4: 7.2,
      K: 3,
    },
    note: 'Это фирменное удобрение. ВНИМАНИЕ! Производитель не указал содержание калия в этом удобрении. '
      + 'Но в оригинальном удобрении калий присутствует. Также пользователи указывают на повышение калия в аквариуме.'
      + 'Поэтому безопаснее для аквариума будет учитывать калий как в удобрении Aquayer.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Seachem Nitrogen',
    isPercent: true,
    elements: {
      N: 1.5,
      K2O: 2,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Phosphorus',
    isPercent: true,
    elements: {
      P2O5: 0.3,
      K2O: 0.2,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Potassium',
    isPercent: true,
    elements: {
      K2O: 5,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish',
    isPercent: true,
    elements: {
      N: 0.07,
      P2O5: 0.01,
      K2O: 0.37,
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
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish Advance',
    isPercent: true,
    elements: {
      P2O5: 0.04,
      K2O: 0.45,
      Ca: 0.04,
      Mg: 0.04,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish Trace',
    isPercent: true,
    elements: {
      B: 0.0028,
      Co: 0.00003,
      Cu: 0.0032,
      Mn: 0.0085,
      Mo: 0.0003,
      Zn: 0.0169,
      Rb: 0.000008,
      Ni: 0.000003,
      V: 0.000002,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish Iron',
    isPercent: true,
    elements: {
      Fe: 1,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  // Tropica
  {
    name: 'Tropica Premium Nutrition',
    isPercent: true,
    elements: {
      K: 0.8,
      Mg: 0.4,
      S: 0.9,
      B: 0.004,
      Cu: 0.006,
      Fe: 0.07,
      Mn: 0.04,
      Mo: 0.002,
      Zn: 0.002,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта '
      + 'https://tropica.com/en/plant-care/liquid-fertilisers/premium-nutrition/',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Tropica Specialised Nutrition',
    isPercent: true,
    elements: {
      N: 1.3,
      P: 0.1,
      K: 1,
      Mg: 0.4,
      S: 0.9,
      B: 0.004,
      Cu: 0.006,
      Fe: 0.07,
      Mn: 0.04,
      Mo: 0.002,
      Zn: 0.002,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта '
      + 'https://tropica.com/en/plant-care/liquid-fertilisers/specialised-nutrition/',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Dennerle Plant Care Pro',
    isPercent: true,
    elements: {
      K2O: 2.8,
      S: 1,
      MgO: 0.78,
      Fe: 0.14,
      Mn: 0.047,
      Na: 0.008,
      B: 0.0075,
      Zn: 0.0056,
      Co: 0.0005,
      Cu: 0.0019,
      Mo: 0.0019,
      Ni: 0.0001,
      V: 0.00004,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plant Care NPK',
    isPercent: false,
    elements: {
      NO3: 50,
      PO4: 4,
      K: 25,
      Mg: 5,
      Na: 4.4,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plant Care N',
    isPercent: false,
    elements: {
      NO3: 100,
      Na: 23,
      K: 20,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plant Care P ',
    isPercent: false,
    elements: {
      PO4: 12.5,
      K: 5,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plan Care K',
    isPercent: false,
    elements: {
      K: 50,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Elixir Basic',
    isPercent: true,
    elements: {
      N: 0.02,
      K2O: 0.11,
      Mg: 0.02,
      S: 0.14,
      B: 0.0018,
      Cu: 0.0005,
      Co: 0.0001,
      Fe: 0.025,
      Mn: 0.01,
      Mo: 0.001,
      Zn: 0.0005,
      Al: 0.0001,
      Li: 0.0003,
      Ni: 0.00004,
      V: 0.0001,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-02-24',
  },
  {
    name: 'Dennerle NPK Booster',
    isPercent: false,
    elements: {
      NO3: 50,
      PO4: 2,
      K: 10,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2021-08-14',
  },
  {
    name: 'Dennerle Scaper’s Green',
    isPercent: true,
    elements: {
      K: 1.08,
      B: 0.0006,
      Co: 0.001,
      Cu: 0.002,
      Fe: 0.133,
      Mn: 0.052,
      Mo: 0.003,
      Zn: 0.003,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2021-08-14',
  },
  {
    name: 'Аквапозитив Азот+',
    isPercent: true,
    elements: {
      NO3: 6,
      K: 2.2,
      Ca: 0.3,
      Mg: 0.1,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Фосфор+',
    isPercent: true,
    elements: {
      PO4: 0.5,
      K: 0.5,
      Mg: 0.1,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Макро+',
    isPercent: true,
    elements: {
      NO3: 6,
      K: 2.3,
      PO4: 0.5,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
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
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Железо+',
    isPercent: true,
    elements: {
      Fe: 0.2,
      Mn: 0.04,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Азот+ (порошок)',
    isPercent: true,
    elements: {
      NO3: 6,
      K: 2,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Фосфор+ (порошок)',
    isPercent: true,
    elements: {
      PO4: 0.5,
      K: 0.5,
      Mg: 0.1,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Калий+ (порошок)',
    isPercent: true,
    elements: {
      K: 5,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Магний (порошок)',
    isPercent: true,
    elements: {
      Mg: 0.3,
    },
    note: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'WaterSci Micro XL для осмоса',
    isPercent: false,
    elements: {
      K: 10.48,
      S: 6.56,
      Mg: 5.5,
      Fe: 2.00,
      Mn: 0.52,
      Na: 0.37,
      B: 0.09,
      Zn: 0.05,
      Mo: 0.04,
      Co: 0.01,
      Cu: 0.03,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Micro 1/2 Fe XL для осмоса',
    isPercent: false,
    elements: {
      K: 10.48,
      S: 6.56,
      Mg: 5.5,
      Fe: 1.00,
      Mn: 0.26,
      Na: 0.37,
      B: 0.09,
      Zn: 0.05,
      Mo: 0.04,
      Co: 0.01,
      Cu: 0.03,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci 1/2 Fe gluconate XL для осмоса',
    isPercent: false,
    elements: {
      Fe: 1.00,
      Mn: 0.26,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci NK XL для любой воды',
    isPercent: false,
    elements: {
      K: 90.77,
      N: 22.93,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci PK XL для любой воды',
    isPercent: false,
    elements: {
      K: 90.77,
      P: 2.82,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci K XL для любой воды',
    isPercent: false,
    elements: {
      K: 90.77,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Micro 3 in 1 L для водопроводной воды',
    isPercent: false,
    elements: {
      K: 3.41,
      S: 2.13,
      Mg: 1.79,
      Fe: 0.65,
      Mn: 0.17,
      Na: 0.12,
      B: 0.02,
      Zn: 0.02,
      Mo: 0.01,
      Co: 0.01,
      Cu: 0.01,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Mаcro NPK L для водопроводной воды',
    isPercent: false,
    elements: {
      K: 90.77,
      N: 10.71,
      P: 1.41,
    },
    note: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'Easy Life: Nitro',
    isPercent: false,
    elements: {
      NO3: 100,
      K: 65,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: Fosfo',
    isPercent: false,
    elements: {
      PO4: 10,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: Potassium ',
    isPercent: false,
    elements: {
      K: 40,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: ProFito',
    isPercent: false,
    elements: {
      K: 4.80,
      Fe: 2.40,
      Mg: 0.90,
      Mn: 0.40,
      B: 0.08,
      Mo: 0.02,
      Zn: 0.02,
      Co: 0.01,
      Ni: 0.01,
      Cu: 0,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: GreenScape',
    isPercent: false,
    elements: {
      NO3: 100,
      PO4: 10,
      K: 65,
      Fe: 2,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: RedScape',
    isPercent: false,
    elements: {
      NO3: 20,
      PO4: 10,
      K: 16.5,
      Fe: 2,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: Ferro',
    isPercent: false,
    elements: {
      Fe: 10,
    },
    note: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  // Tetra
  {
    name: 'Tetra PlantaMin',
    isPercent: true,
    elements: {
      K2O: 1,
      Fe: 0.2,
      B: 0.005,
      Mn: 0.01,
      Zn: 0.002,
      S: 0.5,
      Na: 0.95,
    },
    note: 'Это фирменное удобрение. Данные взяты с сайта магазина https://www.aquasabi.com/Tetra-PlantaMin',
    updatedAt: '2025-03-04',
  },
  // Aqua Botanic
  {
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
    note: 'Рецепт взят с сайта aqua-botanic.ru'
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
];

export const FERTILIZERS_SORTED = FERTILIZERS
  .sort((a, b) => a.name.localeCompare(b.name));

export default FERTILIZERS;
