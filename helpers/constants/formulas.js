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

export default {
  KNO3: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 3,
      },
    },
    solubilityLimit: 242,
    name: 'Калия нитрат',
  },
  NaNO3: {
    ions: {
      Na: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 3,
      },
    },
    solubilityLimit: 916,
    name: 'Натрия нитрат',
  },
  KH2PO4: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      P: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 2,
      },
    },
    solubilityLimit: 226,
    name: 'Калия монофосфат',
  },
  K2HPO4: {
    ions: {
      K: {
        isNeeded: true,
        count: 2,
      },
      P: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 1,
      },
    },
    solubilityLimit: 159.8,
    name: 'Калия гидроортофосфат',
  },
  K4P2O7: {
    ions: {
      K: {
        isNeeded: true,
        count: 4,
      },
      P: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 7,
      },
    },
    solubilityLimit: 1870,
    name: 'Калия пирофосфат',
  },
  'K4P2O7(H20)3': {
    ions: {
      K: {
        isNeeded: true,
        count: 4,
      },
      P: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 6,
      },
    },
    solubilityLimit: 1870,
    name: 'Калия пирофосфат 3-водный',
  },
  'K3PO4(H20)7': {
    ions: {
      K: {
        isNeeded: true,
        count: 3,
      },
      P: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 11,
      },
      H: {
        isNeeded: false,
        count: 14,
      },
    },
    name: 'Калий фосфорнокислый 3-замещенный 7-водный',
  },
  K2SO4: {
    ions: {
      K: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    cation: {
      K: 2,
    },
    anion: {
      SO4: 1,
    },
    solubilityLimit: 111,
    name: 'Калия сульфат',
  },
  Na2SO4: {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    solubilityLimit: 192,
    name: 'Натрия сульфат',
  },
  'Na2SO4(H2O)10': {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 14,
      },
      H: {
        isNeeded: false,
        count: 20,
      },
    },
    solubilityLimit: 195,
    name: 'Натрия сульфат 10-водный',
  },
  KOH: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 1,
      },
    },
    solubilityLimit: 1210,
    name: 'Калия гидроксид',
  },
  'Ca(OH)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 2,
      },
    },
    solubilityLimit: 1.66,
    name: 'Кальция гидроксид',
  },
  '(NH2)2CO': {
    ions: {
      N: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 4,
      },
      C: {
        isNeeded: false,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 1,
      },
    },
    solubilityLimit: 108,
    name: 'Карбамид (мочевина)',
  },
  NH4NO3: {
    ions: {
      N: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 4,
      },
      O: {
        isNeeded: false,
        count: 3,
      },
    },
    solubilityLimit: 190,
    name: 'Нитрат аммония',
  },
  MgSO4: {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    cation: {
      Mg: 1,
    },
    anion: {
      SO4: 1,
    },
    solubilityLimit: 351,
    name: 'Магния сульфат',
  },
  'MgSO4(H2O)7': {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 14,
      },
      O: {
        isNeeded: false,
        count: 11,
      },
    },
    cation: {
      Mg: 1,
    },
    anion: {
      SO4: 1,
    },
    water: {
      H2O: 7,
    },
    solubilityLimit: 1130,
    name: 'Магния сульфат 7-водный (магнезия)',
  },
  'MgCl2(H2O)6': {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 12,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    cation: {
      Mg: 1,
    },
    anion: {
      Cl: 2,
    },
    water: {
      H2O: 6,
    },
    solubilityLimit: 546,
    name: 'Магния Хлорид 6-водный',
  },
  'Mg(NO3)2(H2O)6': {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 12,
      },
      O: {
        isNeeded: false,
        count: 12,
      },
    },
    name: 'Магния нитрат 6-водный',
  },
  'Ca(NO3)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    solubilityLimit: 2710,
    name: 'Кальция нитрат',
  },
  'Ca(NO3)2(H2O)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 4,
      },
      O: {
        isNeeded: false,
        count: 8,
      },
    },
    name: 'Кальция нитрат 2-водный',
  },
  'Ca(NO3)2(H2O)4': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
    },
    name: 'Кальция нитрат 4-водный',
  },
  // KH
  CaCO3: {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
    },
    cation: {
      Ca: 1,
    },
    anion: {
      CO3: 1,
    },
    HCO3: 2,
    solubilityLimit: 0.014,
    name: 'Кальция карбонат',
  },
  MgCO3: {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
    },
    cation: {
      Mg: 1,
    },
    anion: {
      CO3: 1,
    },
    HCO3: 2,
    solubilityLimit: 0.012,
    name: 'Магния карбонат',
  },
  K2CO3: {
    ions: {
      K: {
        isNeeded: true,
        count: 2,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
    },
    cation: {
      K: 2,
    },
    anion: {
      CO3: 1,
    },
    HCO3: 2,
    solubilityLimit: 1105,
    name: 'Калия карбонат',
  },
  Na2CO3: {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
    },
    cation: {
      Na: 2,
    },
    anion: {
      CO3: 1,
    },
    HCO3: 2,
    solubilityLimit: 218,
    name: 'Натрия карбонат (бельевая сода)',
  },
  'Na2CO3(H2O)': {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 1,
      },
    },
    cation: {
      Na: 2,
    },
    anion: {
      CO3: 1,
    },
    water: {
      H2O: 1,
    },
    HCO3: 2,
    solubilityLimit: 218,
    name: 'Натрия карбонат 1-водный (стиральная сода)',
  },
  'Na2CO3(H2O)7': {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 14,
      },
      O: {
        isNeeded: false,
        count: 7,
      },
    },
    cation: {
      Na: 2,
    },
    anion: {
      CO3: 1,
    },
    water: {
      H2O: 7,
    },
    HCO3: 2,
    solubilityLimit: 218,
    name: 'Натрия карбонат 7-водный (стиральная сода)',
  },
  'Na2CO3(H2O)10': {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 20,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
    },
    cation: {
      Na: 2,
    },
    anion: {
      CO3: 1,
    },
    water: {
      H2O: 10,
    },
    HCO3: 2,
    solubilityLimit: 218,
    name: 'Натрия карбонат 10-водный (стиральная сода)',
  },
  KHCO3: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 1,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
    },
    cation: {
      K: 1,
    },
    anion: {
      HCO3: 1,
    },
    HCO3: 1,
    solubilityLimit: 333,
    name: 'Калия гидрокарбонат',
  },
  NaHCO3: {
    ions: {
      Na: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 1,
      },
      CO3: {
        isNeeded: true,
        count: 1,
      },
    },
    cation: {
      Na: 1,
    },
    anion: {
      HCO3: 1,
    },
    HCO3: 1,
    solubilityLimit: 95.9,
    name: 'Натрия гидрокарбонат (пищевая сода)',
  },
  // GH
  'CaSO4(H2O)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 4,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    cation: {
      Ca: 1,
    },
    anion: {
      SO4: 1,
    },
    H2O: 2,
    solubilityLimit: 2.036,
    name: 'Кальция сульфат 2-водный (гипс)',
  },
  CaCl2: {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: true,
        count: 2,
      },
    },
    cation: {
      Ca: 1,
    },
    anion: {
      Cl: 2,
    },
    solubilityLimit: 745,
    name: 'Кальция хлорид',
  },
  'CaCl2(H20)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 4,
      },
      O: {
        isNeeded: false,
        count: 2,
      },
    },
    cation: {
      Ca: 1,
    },
    anion: {
      Cl: 2,
    },
    H2O: 2,
    solubilityLimit: 745,
    name: 'Кальция хлорид 2-водный',
  },
  'CaCl2(H20)6': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: true,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 12,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    cation: {
      Ca: 1,
    },
    anion: {
      Cl: 2,
    },
    H2O: 6,
    solubilityLimit: 745,
    name: 'Кальция хлорид 6-водный',
  },
  C12H22CaO14: {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 22,
      },
      O: {
        isNeeded: false,
        count: 14,
      },
    },
    solubilityLimit: 100, // TODO: fill
    name: 'Кальция глюконат',
  },
  C6H6O7Mg: {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 6,
      },
      H: {
        isNeeded: false,
        count: 6,
      },
      O: {
        isNeeded: false,
        count: 7,
      },
    },
    solubilityLimit: 1000, // TODO: fill
    name: 'Магния цитрат',
  },
  H3BO3: {
    ions: {
      H: {
        isNeeded: false,
        count: 3,
      },
      B: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 3,
      },
    },
    solubilityLimit: 47.2,
    name: 'Борная кислота',
  },
  H2SO4: {
    ions: {
      H: {
        isNeeded: false,
        count: 2,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    density: 1.8356,
    name: 'Серная кислота',
  },
  KI: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      I: {
        isNeeded: false,
        count: 1,
      },
    },
    solubilityLimit: 144.5,
    name: 'Калия йодид',
  },
  KCl: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 339.7,
    name: 'Калия хлорид',
  },
  'CuSO4(H2O)5': {
    ions: {
      Cu: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 10,
      },
      O: {
        isNeeded: false,
        count: 9,
      },
    },
    solubilityLimit: 356,
    name: 'Меди сульфат 5-водный (медный купорос)',
  },
  'ZnSO4(H2O)7': {
    ions: {
      Zn: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 14,
      },
      O: {
        isNeeded: false,
        count: 11,
      },
    },
    solubilityLimit: 540,
    name: 'Цинка сульфат 7-водный (цинковый купорос)',
  },
  '(NH4)2MoO4': {
    ions: {
      Mo: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    solubilityLimit: 400,
    name: 'Молибдат аммония',
  },
  '(NH4)6Mo7O24(H2O)4': {
    ions: {
      Mo: {
        isNeeded: true,
        count: 7,
      },
      N: {
        isNeeded: false,
        count: 6,
      },
      H: {
        isNeeded: false,
        count: 32,
      },
      O: {
        isNeeded: false,
        count: 28,
      },
    },
    solubilityLimit: 280,
    name: 'Парамолибдат аммония 4-водный',
  },
  'MnSO4(H2O)5': {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 10,
      },
      O: {
        isNeeded: false,
        count: 9,
      },
    },
    solubilityLimit: 600,
    name: 'Марганца сульфат 5-водный',
  },
  MnSO4H2O: {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      H: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 5,
      },
    },
    solubilityLimit: 762,
    name: 'Марганца сульфат 1-водный',
  },
  'Fe2(SO4)3(H2O)9': {
    ions: {
      Fe: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: true,
        count: 3,
      },
      H: {
        isNeeded: false,
        count: 18,
      },
      O: {
        isNeeded: false,
        count: 21,
      },
    },
    solubilityLimit: 263,
    name: 'Железа сульфат 9-водный',
  },
  'FeSO4(H2O)7': {
    ions: {
      Fe: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: true,
        count: 3,
      },
      H: {
        isNeeded: false,
        count: 18,
      },
      O: {
        isNeeded: false,
        count: 21,
      },
    },
    solubilityLimit: 263,
    name: 'Железный купорос 7-водный',
  },
  C12H22FeO14: {
    ions: {
      Fe: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 22,
      },
      O: {
        isNeeded: false,
        count: 14,
      },
    },
    name: 'Железа глюконат',
  },
  'C12H22FeO14(H2O)': {
    ions: {
      Fe: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 24,
      },
      O: {
        isNeeded: false,
        count: 15,
      },
    },
    name: 'Железа глюконат 1-водный',
  },
  'C12H22FeO14(H2O)2': {
    ions: {
      Fe: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 26,
      },
      O: {
        isNeeded: false,
        count: 16,
      },
    },
    name: 'Железа глюконат 2-водный',
  },
  C4H8FeN2O4: {
    ions: {
      C: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      Fe: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    name: 'Железа глицинат',
  },
  'C4H8FeN2O4(H2O)': {
    ions: {
      C: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 10,
      },
      Fe: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 5,
      },
    },
    name: 'Железа глицинат 1-водный',
  },
  'C4H8FeN2O4(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 12,
      },
      Fe: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    name: 'Железа глицинат 2-водный',
  },
  // Mn
  C12H22MnO14: {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 22,
      },
      O: {
        isNeeded: false,
        count: 14,
      },
    },
    name: 'Марганца глюконат',
  },
  'C12H22MnO14(H2O)': {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 24,
      },
      O: {
        isNeeded: false,
        count: 15,
      },
    },
    name: 'Марганца глюконат 1-водный',
  },
  'C12H22MnO14(H2O)2': {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 12,
      },
      H: {
        isNeeded: false,
        count: 26,
      },
      O: {
        isNeeded: false,
        count: 16,
      },
    },
    name: 'Марганца глюконат 2-водный',
  },
  C4H8MnN2O4: {
    ions: {
      C: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      Mn: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    name: 'Марганца глицинат',
  },
  'C4H8MnN2O4(H2O)': {
    ions: {
      C: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 10,
      },
      Mn: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 5,
      },
    },
    name: 'Марганца глицинат 1-водный',
  },
  'C4H8MnN2O4(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 12,
      },
      Mn: {
        isNeeded: true,
        count: 1,
      },
      N: {
        isNeeded: false,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    name: 'Марганца глицинат 2-водный',
  },
  // EDTA
  'C10H14N2Na2O8(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 18,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
    },
    solubilityLimit: 100,
    name: 'Трилон Б (хелатор EDTA-Na2)',
  },
  'C10H12N2Na2O8Ca(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 16,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      Ca: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 700,
    name: 'ЭДТА Кальций 10% 2-водный',
  },
  'C10H12N2Na2O8Mg(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 16,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      Mg: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 800,
    name: 'ЭДТА Магний 6% 2-водный',
  },
  'C10H12N2Na2O8Mn(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 16,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      Mn: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 700,
    name: 'ЭДТА Марганец 13% 2-водный',
  },
  'C10H12N2Na2O8Zn(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 16,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      Zn: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 900,
    name: 'ЭДТА Цинк 15% 2-водный',
  },
  'C10H12N2Na2O8Cu(H2O)2': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 16,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      Cu: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 900,
    name: 'ЭДТА Медь 15% 2-водный',
  },
  'C10H12N2NaO8Fe(H20)3': {
    ions: {
      C: {
        isNeeded: false,
        count: 10,
      },
      H: {
        isNeeded: false,
        count: 18,
      },
      N: {
        isNeeded: true,
        count: 2,
      },
      Na: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 11,
      },
      Fe: {
        isNeeded: true,
        count: 1,
      },
    },
    solubilityLimit: 250,
    name: 'Железо ЭДТА 13% 3-водный',
  },
  // DTPA
  C14H18N3O10Na2Fe: {
    ions: {
      Fe: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 14,
      },
      H: {
        isNeeded: false,
        count: 18,
      },
      N: {
        isNeeded: false,
        count: 3,
      },
      O: {
        isNeeded: false,
        count: 10,
      },
      Na: {
        isNeeded: true,
        count: 2,
      },
    },
    solubilityLimit: 110,
    name: 'Железа DTPA 11%',
  },
  C6H7KO2: {
    ions: {
      K: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 6,
      },
      H: {
        isNeeded: false,
        count: 7,
      },
      O: {
        isNeeded: false,
        count: 2,
      },
    },
    name: 'Сорбат калия (консервант E202)',
  },
  C6H8O7: {
    ions: {
      C: {
        isNeeded: true,
        count: 6,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      O: {
        isNeeded: false,
        count: 7,
      },
    },
    solubilityLimit: 1330,
    name: 'Лимонная кислота',
  },
  C5H8O2: {
    ions: {
      C: {
        isNeeded: true,
        count: 5,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      O: {
        isNeeded: false,
        count: 2,
      },
    },
    density: 1.1,
    name: 'Глутаровый альдегид',
  },
  C6H8O6: {
    ions: {
      C: {
        isNeeded: true,
        count: 6,
      },
      H: {
        isNeeded: false,
        count: 8,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
    },
    name: 'Аскорбиновая кислота',
  },
  C63H88CoN14O14P: {
    ions: {
      C: {
        isNeeded: true,
        count: 63,
      },
      H: {
        isNeeded: false,
        count: 88,
      },
      O: {
        isNeeded: false,
        count: 14,
      },
      N: {
        isNeeded: true,
        count: 14,
      },
      P: {
        isNeeded: true,
        count: 1,
      },
      Co: {
        isNeeded: true,
        count: 1,
      },
    },
    name: 'Цианокобаламин B12',
  },
  C4H6O4: {
    ions: {
      C: {
        isNeeded: true,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 6,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    name: 'Янтарная кислота',
  },
  'Na2MoO4(H2O)2': {
    ions: {
      Na: {
        isNeeded: true,
        count: 2,
      },
      Mo: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 6,
      },
      H: {
        isNeeded: false,
        count: 4,
      },
    },
    name: 'Натрий молибденовокислый 2-водный',
  },
  'NiSO4(H2O)7': {
    ions: {
      Ni: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 11,
      },
      H: {
        isNeeded: false,
        count: 14,
      },
    },
    name: 'Никель сернокислый (II) 7-водный',
  },
  'CoSO4(H2O)7': {
    ions: {
      Co: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 11,
      },
      H: {
        isNeeded: false,
        count: 14,
      },
    },
    name: 'Кобальт сернокислый (II) 7-водный',
  },
  'Ca(CH3COO)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 4,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 6,
      },
    },
    cation: {
      Ca: 1,
    },
    anion: {
      CH3COO: 2,
    },
    solubilityLimit: 400,
    name: 'Кальция ацетат',
  },
  'Mg(CH3COO)2': {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: false,
        count: 4,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 6,
      },
    },
    cation: {
      Mg: 1,
    },
    anion: {
      CH3COO: 2,
    },
    solubilityLimit: 656,
    name: 'Магния ацетат',
  },
  'CO(NH2)2H3PO4': {
    ions: {
      N: {
        isNeeded: true,
        count: 2,
      },
      C: {
        isNeeded: false,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 5,
      },
      H: {
        isNeeded: false,
        count: 7,
      },
      P: {
        isNeeded: true,
        count: 1,
      },
    },
    name: 'Фосфат мочевины',
  },
  C4H7NO4: {
    ions: {
      C: {
        isNeeded: true,
        count: 4,
      },
      H: {
        isNeeded: false,
        count: 7,
      },
      N: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    solubilityLimit: 4.5,
    name: 'L-Аспарагиновая кислота',
  },
  C5H9NO4: {
    ions: {
      C: {
        isNeeded: true,
        count: 5,
      },
      H: {
        isNeeded: false,
        count: 9,
      },
      N: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    solubilityLimit: 7.5,
    name: 'L-Глутаминовая кислота',
  },
  SrCl2: {
    ions: {
      Sr: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: true,
        count: 2,
      },
    },
    name: 'Стронция хлорид',
  },
};
