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

export const FERTILIZERS: FertilizerType[] = [
  {
    name: 'APT 3 / Complete',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-18',
  },
  // Prestige
  {
    name: 'Prestige FitoMin Macro',
    isLiquid: true,
    isPercent: false,
    ions: {
      N: 10.7,
      K: 32.0,
      P: 1.5,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Prestige FitoMin Калий',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 50,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Prestige FitoMin Micro',
    isLiquid: true,
    isPercent: true,
    ions: {
      K: 1.2,
      Fe: 0.15,
      Mg: 0.08,
      B: 0.006,
      Mn: 0.05,
      Mo: 0.003,
      Zn: 0.002,
      Cu: 0.002,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Prestige FitoMin Железо',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 6,
      Mn: 1.1,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-04',
  },
  // Aquabalance
  {
    name: 'Aquabalance полный комплекс Total',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Ферро Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 0.7,
      Mn: 0.1,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Калий Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      K: 5,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Нитро Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 4.65,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Фосфо Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      PO4: 0.45,
      K: 0.095,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Макро Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 4.65,
      PO4: 0.45,
      K: 1.45,
      Ca: 0.14,
      Mg: 0.17,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Микро Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 0.2,
      Mn: 0.05,
      Zn: 0.01,
      B: 0.009,
      Cu: 0.003,
      Mo: 0.003,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Микро Баланс + K',
    isLiquid: true,
    isPercent: true,
    ions: {
      K: 3,
      Fe: 0.2,
      Mn: 0.05,
      Zn: 0.01,
      B: 0.009,
      Cu: 0.003,
      Mo: 0.003,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Тотал-Мох',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 5,
      PO4: 0.5,
      Fe: 0.05,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки. Содержит макроэлементы: '
      + 'азот, фосфор, калий, кальций, магний, а так же микроэле- менты: железо, марганец,'
      + 'бор в том числе в органической форме.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Micro (KH<4)',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 0.2,
      Mn: 0.08,
      B: 0.008,
      Zn: 0.005,
      Cu: 0.01,
      Mo: 0.006,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Micro (KH>4)',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 0.32,
      Mn: 0.08,
      B: 0.009,
      Zn: 0.008,
      Cu: 0.008,
      Mo: 0.003,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Макро корректор P+K',
    isLiquid: true,
    isPercent: true,
    ions: {
      PO4: 0.9,
      K2O: 0.4,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Макро корректор N+K',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 10,
      K: 1.76,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Aquabalance Premium Макро комплекс NPK',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 9.6,
      PO4: 0.9,
      K: 2,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Premium Fe+Mn',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 1.0,
      Mn: 0.2,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance Колор Баланс',
    isLiquid: true,
    isPercent: true,
    ions: {
      Mg: 3,
      Fe: 0.1,
      Mn: 0.05,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquabalance GH-бустер',
    isLiquid: false,
    isPercent: true,
    ions: {
      Ca: 17.2,
      Mg: 4.3,
    },
    hardness: {
      gh: 3.5,
      kh: 0,
      amount: 14,
      volume: 100,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Aquabalance Aqua-бустер',
    isPercent: true,
    isLiquid: false,
    ions: {
      Ca: 15,
      Mg: 4.3,
    },
    hardness: {
      gh: 4.5,
      kh: 2.25,
      amount: 7,
      volume: 50,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Aquabalance Gh-кальций',
    isLiquid: true,
    isPercent: false,
    ions: {
      Ca: 75,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Aquabalance Gh-магний',
    isLiquid: true,
    isPercent: false,
    ions: {
      Mg: 75,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  // Aquayer
  {
    name: 'Aquayer Макро+',
    isLiquid: true,
    isPercent: false,
    ions: {
      N: 8.21,
      P: 1.20,
      K: 20.43,
    },
    description: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Микро+',
    isLiquid: true,
    isPercent: false,
    ions: {
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
    description: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Железо+',
    isLiquid: true,
    isPercent: false,
    ions: {
      Fe: 7.00,
      Mg: 1.3,
    },
    description: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Калий+',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 50,
    },
    description: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Смарт Макро (Нитрат)',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 72,
      K: 45.3,
    },
    description: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Смарт Макро (Фосфат)',
    isLiquid: true,
    isPercent: false,
    ions: {
      PO4: 7.2,
      K: 3,
    },
    description: 'Это фирменное удобрение. Данные взяты на сайте производителя https://aquayer.com',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquayer Remineral GH/KH+',
    isLiquid: false,
    isPercent: true,
    ions: {
      Ca: 17.7,
      Mg: 5.5,
    },
    hardness: {
      gh: 3,
      kh: 2,
      amount: 4,
      volume: 50,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  // Aquaerus
  {
    name: 'Aquaerus Макро',
    isLiquid: true,
    isPercent: false,
    ions: {
      N: 9.428,
      P: 1.394,
      K: 23.354,
    },
    description: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Aquaerus Микро',
    isLiquid: true,
    isPercent: false,
    ions: {
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
    description: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Aquaerus Железо',
    isLiquid: true,
    isPercent: false,
    ions: {
      Fe: 7.00,
      Mg: 1.3,
    },
    description: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquaerus Калий',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 50,
    },
    description: 'Это фирменное удобрение. Данные взяты c этикетки.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquaerus Нитрат+',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 72,
      K: 45.3,
    },
    description: 'Это фирменное удобрение. ВНИМАНИЕ! Производитель не указал содержание калия в этом удобрении. '
      + 'Но в оригинальном удобрении калий присутствует. Также пользователи указывают на повышение калия в аквариуме.'
      + 'Поэтому безопаснее для аквариума будет учитывать калий как в удобрении Aquayer.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Aquaerus Фосфат+',
    isLiquid: true,
    isPercent: false,
    ions: {
      PO4: 7.2,
      K: 3,
    },
    description: 'Это фирменное удобрение. ВНИМАНИЕ! Производитель не указал содержание калия в этом удобрении. '
      + 'Но в оригинальном удобрении калий присутствует. Также пользователи указывают на повышение калия в аквариуме.'
      + 'Поэтому безопаснее для аквариума будет учитывать калий как в удобрении Aquayer.',
    updatedAt: '2025-03-03',
  },
  {
    name: 'Seachem Nitrogen',
    isLiquid: true,
    isPercent: true,
    ions: {
      N: 1.5,
      K2O: 2,
    },
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Phosphorus',
    isLiquid: true,
    isPercent: true,
    ions: {
      P2O5: 0.3,
      K2O: 0.2,
    },
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Potassium',
    isLiquid: true,
    isPercent: true,
    ions: {
      K2O: 5,
    },
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish Advance',
    isLiquid: true,
    isPercent: true,
    ions: {
      P2O5: 0.04,
      K2O: 0.45,
      Ca: 0.04,
      Mg: 0.04,
    },
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish Trace',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Flourish Iron',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 1,
    },
    description: 'Это фирменное удобрение. Данные взяты с сайта https://seachem.com/planted.php',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Seachem Equilibrium',
    isPercent: true,
    isLiquid: false,
    ions: {
      K2O: 23,
      Ca: 8.06,
      Mg: 2.41,
      Fe: 0.11,
      Mn: 0.06,
    },
    hardness: {
      gh: 3,
      kh: 0,
      amount: 16,
      volume: 80,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  // Tropica
  {
    name: 'Tropica Premium Nutrition',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Данные взяты с сайта '
      + 'https://tropica.com/en/plant-care/liquid-fertilisers/premium-nutrition/',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Tropica Specialised Nutrition',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Данные взяты с сайта '
      + 'https://tropica.com/en/plant-care/liquid-fertilisers/specialised-nutrition/',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Dennerle Plant Care Pro',
    isLiquid: true,
    isPercent: true,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plant Care NPK',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 50,
      PO4: 4,
      K: 25,
      Mg: 5,
      Na: 4.4,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plant Care N',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 100,
      Na: 23,
      K: 20,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plant Care P',
    isLiquid: true,
    isPercent: false,
    ions: {
      PO4: 12.5,
      K: 5,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Plan Care K',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 50,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-05-02',
  },
  {
    name: 'Dennerle Elixir Basic',
    isLiquid: true,
    isPercent: true,
    ions: {
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
      Ni: 0.00004,
      V: 0.0001,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://dennerle.com/en/collections/plantcare',
    updatedAt: '2025-02-24',
  },
  {
    name: 'Dennerle NPK Booster',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 50,
      PO4: 2,
      K: 10,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2021-08-14',
  },
  {
    name: 'Dennerle Scaper’s Green',
    isLiquid: true,
    isPercent: true,
    ions: {
      K: 1.08,
      B: 0.0006,
      Co: 0.001,
      Cu: 0.002,
      Fe: 0.133,
      Mn: 0.052,
      Mo: 0.003,
      Zn: 0.003,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2021-08-14',
  },
  {
    name: 'Dennerle Osmose ReMineral+',
    isLiquid: false,
    isPercent: true,
    ions: {
      // Ca: 45.5,
      // Mg: 9.5,
    },
    hardness: {
      gh: 2,
      kh: 1.3,
      amount: 10,
      volume: 100,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Аквапозитив Азот+',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 6,
      K: 2.2,
      Ca: 0.3,
      Mg: 0.1,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Фосфор+',
    isLiquid: true,
    isPercent: true,
    ions: {
      PO4: 0.5,
      K: 0.5,
      Mg: 0.1,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Макро+',
    isLiquid: true,
    isPercent: true,
    ions: {
      NO3: 6,
      K: 2.3,
      PO4: 0.5,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Микро+',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 0.13,
      Mn: 0.042,
      B: 0.01,
      Co: 0.0005,
      Cu: 0.0025,
      Mo: 0.0015,
      Zn: 0.007,
      Ni: 0.0002,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Железо+',
    isLiquid: true,
    isPercent: true,
    ions: {
      Fe: 0.2,
      Mn: 0.04,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Азот+ (порошок)',
    isLiquid: false,
    isPercent: true,
    ions: {
      NO3: 6,
      K: 2,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Фосфор+ (порошок)',
    isLiquid: false,
    isPercent: true,
    ions: {
      PO4: 0.5,
      K: 0.5,
      Mg: 0.1,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Калий+ (порошок)',
    isLiquid: false,
    isPercent: true,
    ions: {
      K: 5,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив Магний (порошок)',
    isLiquid: false,
    isPercent: true,
    ions: {
      Mg: 0.3,
    },
    description: 'Это фирменное удобрение. Данные взяты https://vk.com/akvapozitiv',
    updatedAt: '2025-03-04',
  },
  {
    name: 'Аквапозитив GH+',
    isLiquid: false,
    isPercent: true,
    ions: {
      Ca: 14,
      Mg: 3.5,
    },
    hardness: {
      gh: 6,
      kh: 0,
      amount: 2,
      volume: 10,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'Аквапозитив GH/KH+',
    isLiquid: false,
    isPercent: true,
    ions: {
      Ca: 13.8,
      Mg: 3.4,
    },
    hardness: {
      gh: 8,
      kh: 3,
      amount: 3,
      volume: 10,
    },
    description: 'Это заводское удобрение. Все данные взяты с этикетки.',
  },
  {
    name: 'WaterSci Micro XL для осмоса',
    isLiquid: true,
    isPercent: false,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Micro 1/2 Fe XL для осмоса',
    isLiquid: true,
    isPercent: false,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci 1/2 Fe gluconate XL для осмоса',
    isLiquid: true,
    isPercent: false,
    ions: {
      Fe: 1.00,
      Mn: 0.26,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci NK XL для любой воды',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 90.77,
      N: 22.93,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci PK XL для любой воды',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 90.77,
      P: 2.82,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci K XL для любой воды',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 90.77,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Micro 3 in 1 L для водопроводной воды',
    isLiquid: true,
    isPercent: false,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Mаcro NPK L для водопроводной воды',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 90.77,
      N: 10.71,
      P: 1.41,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
    updatedAt: '2025-02-24',
  },
  {
    name: 'WaterSci Remineral Gh+',
    isLiquid: true,
    isPercent: false,
    ions: {
      Ca: 27.54,
      Mg: 6.48,
    },
    hardness: {
      gh: 8,
      kh: 0,
      amount: 1,
      volume: 1,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
  },
  {
    name: 'WaterSci Remineral Kh+',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 7.65,
      Na: 26.23,
      SO4: 9.4,
      CO3: 68.4,
    },
    hardness: {
      gh: 0,
      kh: 4,
      amount: 1,
      volume: 1,
    },
    description: 'Это фирменное удобрение. Все данные взяты из официальных источников:\n'
      + 'https://watersci.ru\n'
      + 'https://vk.com/watersci',
  },
  {
    name: 'Easy Life: Nitro',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 100,
      K: 65,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: Fosfo',
    isLiquid: true,
    isPercent: false,
    ions: {
      PO4: 10,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: Potassium',
    isLiquid: true,
    isPercent: false,
    ions: {
      K: 40,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: ProFito',
    isLiquid: true,
    isPercent: false,
    ions: {
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
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: GreenScape',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 100,
      PO4: 10,
      K: 65,
      Fe: 2,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: RedScape',
    isLiquid: true,
    isPercent: false,
    ions: {
      NO3: 20,
      PO4: 10,
      K: 16.5,
      Fe: 2,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  {
    name: 'Easy Life: Ferro',
    isLiquid: true,
    isPercent: false,
    ions: {
      Fe: 10,
    },
    description: 'Это фирменное удобрение. Все данные взяты с этикетки.',
    updatedAt: '2025-02-21',
  },
  // Tetra
  {
    name: 'Tetra PlantaMin',
    isLiquid: true,
    isPercent: true,
    ions: {
      K2O: 1,
      Fe: 0.2,
      B: 0.005,
      Mn: 0.01,
      Zn: 0.002,
      S: 0.5,
      Na: 0.95,
    },
    description: 'Это фирменное удобрение. Данные взяты с сайта магазина https://www.aquasabi.com/Tetra-PlantaMin',
    updatedAt: '2025-03-04',
  },
];

export const FERTILIZERS_SORTED = FERTILIZERS
  .sort((a, b) => a.name.localeCompare(b.name));

export default FERTILIZERS;
