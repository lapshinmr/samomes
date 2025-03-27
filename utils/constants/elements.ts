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

export const OXIDE_TO_ELEMENT = {
  NO3: 'N',
  PO4: 'P',
  MgO: 'Mg',
  CaO: 'Ca',
  P2O5: 'P',
  K2O: 'K',
  SO4: 'S',
};

export const ELEMENT_TO_OXIDE = {
  N: 'NO3',
  P: 'PO4',
  Mg: 'MgO',
  Ca: 'CaO',
  S: 'SO4',
};

export const OPPOSITE = {
  N: 'NO3',
  NO3: 'N',
  P: 'PO4',
  PO4: 'P',
  S: 'SO4',
  SO4: 'S',
};/**
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

export const ELEMENTS: {
  [key: string]: number;
} = {
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
  // TODO: move it to another constant
  CO3: 60.01001,
  HCO3: 61.01812,
};
