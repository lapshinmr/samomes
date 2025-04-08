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

export const ELEMENTS = {
  H: 1.00794,
  B: 10.811,
  C: 12.0107,
  N: 14.0067,
  O: 15.9994,
  Na: 22.98976928,
  Mg: 24.30505,
  Si: 28.0855,
  P: 30.97376,
  S: 32.06479,
  Cl: 35.45294,
  K: 39.0983,
  Ca: 40.07802,
  V: 50.94147,
  Mn: 54.93804,
  Fe: 55.84514,
  Co: 58.93319,
  Ni: 58.69335,
  Cu: 63.54604,
  Zn: 65.37778,
  Rb: 85.46766,
  Sr: 87.61664,
  Mo: 95.95979,
  I: 126.90447,
} as const;

export const CARBONATES = ['CO3', 'HCO3'] as const;

export const OXIDE_TO_ELEMENT = {
  NO3: 'N',
  PO4: 'P',
  P2O5: 'P2',
  SO4: 'S',
  K2O: 'K2',
  MgO: 'Mg',
  CaO: 'Ca',
} as const;

export const ELEMENT_TO_OXIDE = {
  N: 'NO3',
  P: 'PO4',
  S: 'SO4',
  K: 'K2O',
  Mg: 'MgO',
  Ca: 'CaO',
  C: 'CO3',
} as const;

export const ELEMENTS_IGNORED_IN_REAGENT_CONCENTRATION_CALCULATION = [
  // TODO: complete or remove
];

// TODO: Add kations and anions here or in the formulas

export const ALL_IONS = [...Object.keys(ELEMENTS), ...Object.keys(OXIDE_TO_ELEMENT)];

export const CATIONS = [
  'Ca',
  'Mg',
  'K',
  'Na',
];

export const ANIONS = [
  'Cl',
  'SO4',
  'CO3',
];
