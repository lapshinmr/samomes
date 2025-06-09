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

export const ALL_IONS = [...Object.keys(ELEMENTS), ...Object.keys(OXIDE_TO_ELEMENT)];

export const CATIONS = [
  'Ca',
  'Mg',
  'K',
  'Na',
] as const;

export const ANIONS = [
  'Cl',
  'SO4',
  'CO3',
  'CH3COO',
  'C6H11O7',
] as const;
