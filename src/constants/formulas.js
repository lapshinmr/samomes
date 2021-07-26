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
    name: 'Калия пирофосфат кристалогидрат',
  },
  K2SO4: {
    ions: {
      K: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: false,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    solubilityLimit: 111,
    name: 'Калия сульфат',
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
        isNeeded: false,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 4,
      },
    },
    solubilityLimit: 351,
    name: 'Магния Сульфат',
  },
  'MgSO4(H2O)7': {
    ions: {
      Mg: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: false,
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
    solubilityLimit: 1130,
    name: 'Магния Сульфат (магнезия)',
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
    name: 'Магния Нитрат 6-водный',
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
    name: 'Кальция Нитрат 2-водный',
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
    name: 'Кальция Нитрат 4-водный',
  },
  CaCO3: {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      C: {
        isNeeded: true,
        count: 1,
      },
      O: {
        isNeeded: false,
        count: 3,
      },
    },
    name: 'Кальция Карбонат',
  },
  'CaSO4(H2O)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: false,
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
    solubilityLimit: 2.036,
    name: 'Кальция Сульфат (гипс)',
  },
  CaCl2: {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: false,
        count: 2,
      },
    },
    solubilityLimit: 745,
    name: 'Кальция Хлорид',
  },
  'CaCl2(H20)2': {
    ions: {
      Ca: {
        isNeeded: true,
        count: 1,
      },
      Cl: {
        isNeeded: false,
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
    solubilityLimit: 745,
    name: 'Кальция Хлорид 2-водный',
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
    name: 'Йодид Калия',
  },
  'CuSO4(H2O)5': {
    ions: {
      Cu: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: false,
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
    name: 'Меди Сульфат (Медный Купорос)',
  },
  'ZnSO4(H2O)7': {
    ions: {
      Zn: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: false,
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
    name: 'Цинка Сульфат (Цинковый Купорос)',
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
    name: 'Молибдат Аммония',
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
    name: 'Парамолибдат Аммония Тетрагидрат',
  },
  'MnSO4(H2O)5': {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: false,
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
    name: 'Марганца Сульфат Кристаллогидрат',
  },
  MnSO4H2O: {
    ions: {
      Mn: {
        isNeeded: true,
        count: 1,
      },
      S: {
        isNeeded: false,
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
    name: 'Марганца Сульфат Моногидрат',
  },
  'Fe2(SO4)3(H2O)9': {
    ions: {
      Fe: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: false,
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
    name: 'Железа Сульфат',
  },
  'FeSO4(H2O)7': {
    ions: {
      Fe: {
        isNeeded: true,
        count: 2,
      },
      S: {
        isNeeded: false,
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
    name: 'Железный купорос',
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
    solubilityLimit: 100,
    name: 'Железа Глюконат',
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
    solubilityLimit: 100,
    name: 'Железа Глюконат Гидрат',
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
    solubilityLimit: 100,
    name: 'Железа Глюконат Дигидрат',
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
    name: 'ЭДТА Кальций 10%',
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
    name: 'ЭДТА Магний 6%',
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
    name: 'ЭДТА Марганец 13%',
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
    name: 'ЭДТА Цинк 15%',
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
    name: 'ЭДТА Медь 15%',
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
    name: 'Железо ЭДТА 13%',
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
    name: 'Глутаровый альдегид',
  },
};
