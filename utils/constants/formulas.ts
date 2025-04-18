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
export const FORMULAS = {
  KNO3: {
    solubility: 242,
    name: 'Калия нитрат',
  },
  NaNO3: {
    solubility: 916,
    name: 'Натрия нитрат',
  },
  KH2PO4: {
    solubility: 226,
    name: 'Калия монофосфат',
  },
  K2HPO4: {
    solubility: 159.8,
    name: 'Калия гидроортофосфат',
  },
  K4P2O7: {
    solubility: 1870,
    name: 'Калия пирофосфат',
  },
  'K4P2O7(H20)3': {
    solubility: 1870,
    name: 'Калия пирофосфат 3-водный',
  },
  'K3PO4(H20)7': {
    name: 'Калий фосфорнокислый 3-замещенный 7-водный',
  },
  K2SO4: {
    cation: { key: 'K', number: 2 },
    anion: { key: 'SO4', number: 1 },
    solubility: 111,
    name: 'Калия сульфат',
  },
  KOH: {
    solubility: 1210,
    name: 'Калия гидроксид',
  },
  'Ca(OH)2': {
    solubility: 1.66,
    name: 'Кальция гидроксид',
  },
  '(NH2)2CO': {
    solubility: 108,
    name: 'Карбамид (мочевина)',
  },
  NH4NO3: {
    solubility: 190,
    name: 'Нитрат аммония',
  },
  MgSO4: {
    cation: { key: 'Mg', number: 1 },
    anion: { key: 'SO4', number: 1 },
    solubility: 351,
    name: 'Магния сульфат',
  },
  'MgSO4(H2O)7': {
    cation: { key: 'Mg', number: 1 },
    anion: { key: 'SO4', number: 1 },
    solubility: 1130,
    name: 'Магния сульфат 7-водный (магнезия)',
  },
  'MgCl2(H2O)6': {
    cation: { key: 'Mg', number: 1 },
    anion: { key: 'Cl', number: 2 },
    solubility: 546,
    name: 'Магния Хлорид 6-водный',
  },
  'Mg(NO3)2(H2O)6': {
    name: 'Магния нитрат 6-водный',
  },
  'Ca(NO3)2': {
    solubility: 2710,
    name: 'Кальция нитрат',
  },
  'Ca(NO3)2(H2O)2': {
    name: 'Кальция нитрат 2-водный',
  },
  'Ca(NO3)2(H2O)4': {
    name: 'Кальция нитрат 4-водный',
  },
  // KH
  CaCO3: {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 0.014,
    name: 'Кальция карбонат',
  },
  MgCO3: {
    cation: { key: 'Mg', number: 1 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 0.012,
    name: 'Магния карбонат',
  },
  K2CO3: {
    cation: { key: 'K', number: 2 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 1105,
    name: 'Калия карбонат',
  },
  Na2CO3: {
    cation: { key: 'Na', number: 2 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 218,
    name: 'Натрия карбонат (бельевая сода)',
  },
  'Na2CO3(H2O)': {
    cation: { key: 'Na', number: 2 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 218,
    name: 'Натрия карбонат 1-водный (стиральная сода)',
  },
  'Na2CO3(H2O)7': {
    cation: { key: 'Na', number: 2 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 218,
    name: 'Натрия карбонат 7-водный (стиральная сода)',
  },
  'Na2CO3(H2O)10': {
    cation: { key: 'Na', number: 2 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 2,
    solubility: 218,
    name: 'Натрия карбонат 10-водный (стиральная сода)',
  },
  KHCO3: {
    cation: { key: 'K', number: 1 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 1,
    solubility: 333,
    name: 'Калия гидрокарбонат',
  },
  NaHCO3: {
    cation: { key: 'Na', number: 1 },
    anion: { key: 'CO3', number: 1 },
    HCO3: 1,
    solubility: 95.9,
    name: 'Натрия гидрокарбонат (пищевая сода)',
  },
  // GH
  'CaSO4(H2O)2': {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'SO4', number: 1 },
    solubility: 2.036,
    name: 'Кальция сульфат 2-водный (гипс)',
  },
  CaCl2: {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'Cl', number: 2 },
    solubility: 745,
    name: 'Кальция хлорид',
  },
  'CaCl2(H20)2': {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'Cl', number: 2 },
    solubility: 745,
    name: 'Кальция хлорид 2-водный',
  },
  'CaCl2(H20)6': {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'Cl', number: 2 },
    solubility: 745,
    name: 'Кальция хлорид 6-водный',
  },
  'Ca(C6H11O7)2': {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'C6H11O7', number: 2 },
    solubility: 100, // TODO: fill
    name: 'Кальция глюконат',
  },
  C6H6O7Mg: {
    solubility: 1000, // TODO: fill
    name: 'Магния цитрат',
  },
  H3BO3: {
    solubility: 47.2,
    name: 'Борная кислота',
  },
  H2SO4: {
    density: 1.8356,
    name: 'Серная кислота',
  },
  KI: {
    solubility: 144.5,
    name: 'Калия йодид',
  },
  KCl: {
    solubility: 339.7,
    name: 'Калия хлорид',
  },
  'CuSO4(H2O)5': {
    solubility: 356,
    name: 'Меди сульфат 5-водный (медный купорос)',
  },
  'ZnSO4(H2O)7': {
    solubility: 540,
    name: 'Цинка сульфат 7-водный (цинковый купорос)',
  },
  '(NH4)2MoO4': {
    solubility: 400,
    name: 'Молибдат аммония',
  },
  '(NH4)6Mo7O24(H2O)4': {
    solubility: 280,
    name: 'Парамолибдат аммония 4-водный',
  },
  'MnSO4(H2O)5': {
    solubility: 600,
    name: 'Марганца сульфат 5-водный',
  },
  MnSO4H2O: {
    solubility: 762,
    name: 'Марганца сульфат 1-водный',
  },
  'Fe2(SO4)3(H2O)9': {
    solubility: 263,
    name: 'Железа сульфат 9-водный',
  },
  'FeSO4(H2O)7': {
    solubility: 263,
    name: 'Железный купорос 7-водный',
  },
  C12H22FeO14: {
    name: 'Железа глюконат',
  },
  'C12H22FeO14(H2O)': {
    name: 'Железа глюконат 1-водный',
  },
  'C12H22FeO14(H2O)2': {
    name: 'Железа глюконат 2-водный',
  },
  C4H8FeN2O4: {
    name: 'Железа глицинат',
  },
  'C4H8FeN2O4(H2O)': {
    name: 'Железа глицинат 1-водный',
  },
  'C4H8FeN2O4(H2O)2': {
    name: 'Железа глицинат 2-водный',
  },
  // Mn
  C12H22MnO14: {
    name: 'Марганца глюконат',
  },
  'C12H22MnO14(H2O)': {
    name: 'Марганца глюконат 1-водный',
  },
  'C12H22MnO14(H2O)2': {
    name: 'Марганца глюконат 2-водный',
  },
  C4H8MnN2O4: {
    name: 'Марганца глицинат',
  },
  'C4H8MnN2O4(H2O)': {
    name: 'Марганца глицинат 1-водный',
  },
  'C4H8MnN2O4(H2O)2': {
    name: 'Марганца глицинат 2-водный',
  },
  // EDTA
  'C10H14N2Na2O8': {
    solubility: 100,
    name: 'Хелатор EDTA-Na2',
  },
  'C10H14N2Na2O8(H2O)2': {
    solubility: 100,
    name: 'Трилон Б (хелатор EDTA-Na2)',
  },
  'C10H12N2Na2O8Ca(H2O)2': {
    solubility: 700,
    name: 'ЭДТА Кальций 10% 2-водный',
  },
  'C10H12N2Na2O8Mg(H2O)2': {
    solubility: 800,
    name: 'ЭДТА Магний 6% 2-водный',
  },
  'C10H12N2Na2O8Mn(H2O)2': {
    solubility: 700,
    name: 'ЭДТА Марганец 13% 2-водный',
  },
  'C10H12N2Na2O8Zn(H2O)2': {
    solubility: 900,
    name: 'ЭДТА Цинк 15% 2-водный',
  },
  'C10H12N2Na2O8Cu(H2O)2': {
    solubility: 900,
    name: 'ЭДТА Медь 15% 2-водный',
  },
  'C10H12N2NaO8Fe(H20)3': {
    solubility: 250,
    name: 'Железо ЭДТА 13% 3-водный',
  },
  // DTPA
  C14H18N3O10Na2Fe: {
    solubility: 110,
    name: 'Железа DTPA 11%',
  },
  C6H7KO2: {
    name: 'Сорбат калия (консервант E202)',
  },
  C6H8O7: {
    solubility: 1330,
    name: 'Лимонная кислота',
  },
  C5H8O2: {
    density: 1.1,
    name: 'Глутаровый альдегид',
  },
  C6H8O6: {
    name: 'Аскорбиновая кислота',
  },
  C63H88CoN14O14P: {
    name: 'Цианокобаламин B12',
  },
  C4H6O4: {
    name: 'Янтарная кислота',
  },
  'Na2MoO4(H2O)2': {
    name: 'Натрий молибденовокислый 2-водный',
  },
  'NiSO4(H2O)7': {
    name: 'Никель сернокислый (II) 7-водный',
  },
  'CoSO4(H2O)7': {
    name: 'Кобальт сернокислый (II) 7-водный',
  },
  'Ca(CH3COO)2': {
    cation: { key: 'Ca', number: 1 },
    anion: { key: 'CH3COO', number: 2 },
    solubility: 400,
    name: 'Кальция ацетат',
  },
  'Mg(CH3COO)2': {
    cation: { key: 'Mg', number: 1 },
    anion: { key: 'CH3COO', number: 2 },
    solubility: 656,
    name: 'Магния ацетат',
  },
  'CO(NH2)2H3PO4': {
    name: 'Фосфат мочевины',
  },
  C4H7NO4: {
    solubility: 4.5,
    name: 'L-Аспарагиновая кислота',
  },
  C5H9NO4: {
    solubility: 7.5,
    name: 'L-Глутаминовая кислота',
  },
  SrCl2: {
    name: 'Стронция хлорид',
  },
} satisfies Record<string, FormulaObjectType>;
