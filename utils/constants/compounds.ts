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

export const COMPOUNDS = {
  Biolan: {
    ions: {
      N: 0.13,
      P: 0.013,
      K: 0.125,
      Fe: 0.0017,
      Mg: 0.018,
      B: 0.0001,
      Zn: 0.0004,
      Cu: 0.0004,
      Mo: 0.0001,
    },
    name: 'Biolan Удобрение для орхидей RAIN MIX',
  },
  PlantexCSM: {
    ions: {
      Fe: 0.07,
      Mn: 0.02,
      Mg: 0.015,
      Zn: 0.004,
      Cu: 0.001,
      Mo: 0.0006,
    },
    name: 'Plantex® C.S.M.',
  },
  PlantexCMM: {
    ions: {
      Fe: 0.07,
      Mn: 0.02,
      B: 0.013,
      Zn: 0.004,
      Cu: 0.001,
      Mo: 0.0006,
    },
    name: 'Plantex® C.M.M.',
  },
  AgroMicsT: {
    ions: {
      Fe: 0.07,
      Mn: 0.033,
      B: 0.0065,
      Zn: 0.006,
      Cu: 0.0027,
      Mo: 0.002,
    },
    name: 'АгроМикс T',
  },
  'Fe-EDTA13': {
    ions: {
      Fe: 0.13,
    },
    name: 'ЭДТА Железо 13%',
  },
  'Fe-EDDGA6': {
    ions: {
      Fe: 0.06,
    },
    name: 'ЭДДГА Железо 6%',
  },
  'Fe-DTPA11': {
    ions: {
      Fe: 0.11,
    },
    name: 'ДТПА Железо 11%',
  },
  'Mn-EDTA13': {
    ions: {
      Mn: 0.13,
    },
    name: 'ЭДТА Марганец 13%',
  },
  'Ca-EDTA10': {
    ions: {
      Ca: 0.10,
    },
    name: 'ЭДТА Кальций 10%',
  },
  'Mg-EDTA6': {
    ions: {
      Mg: 0.06,
    },
    name: 'ЭДТА Магний 6%',
  },
  'Co-EDTA13': {
    ions: {
      Co: 0.13,
    },
    name: 'ЭДТА Кобальт 13%',
  },
  'Zn-EDTA15': {
    ions: {
      Zn: 0.15,
    },
    name: 'ЭДТА Цинк 15%',
  },
  'Cu-EDTA15': {
    ions: {
      Cu: 0.15,
    },
    name: 'ЭДТА Медь 15%',
  },
  'B12-liquid': {
    ions: {},
    isLiquid: true,
    name: 'Цианокобаламин B12 (жидкий)',
  },
  'B12-solid': {
    ions: {},
    name: 'Цианокобаламин B12 (порошок)',
  },
  Ferovit: {
    ions: {
      Fe: 0.075,
      N: 0.04,
    },
    isLiquid: true,
    name: 'Феровит',
  },
  Citovit: {
    ions: {
      N: 0.03,
      P: 0.005,
      K: 0.025,
      Mg: 0.01,
      S: 0.04,
      Fe: 0.035,
      Mn: 0.03,
      B: 0.008,
      Zn: 0.006,
      Cu: 0.006,
      Mo: 0.004,
      Co: 0.002,
    },
    isLiquid: true,
    name: 'Цитовит',
  },
  AquaMicsCT: {
    ions: {
      Fe: 0.0384,
      Mn: 0.0257,
      Zn: 0.0053,
      Ca: 0.0257,
      B: 0.0052,
      Mo: 0.0013,
      Cu: 0.0053,
    },
    isLiquid: false,
    name: 'Аквамикс СТ (порошок)',
  },
  AquaMics: {
    ions: {
      Fe: 0.0058,
      Mn: 0.0039,
      Zn: 0.0008,
      Ca: 0.0039,
      B: 0.00079,
      Mo: 0.00019,
      Cu: 0.0008,
    },
    isLiquid: true,
    name: 'Аквамикс (раствор)',
  },
  AquarinUniversal: {
    ions: {
      N: 0.18,
      P: 0.0786,
      K: 0.1494,
      S: 0.015,
      Fe: 0.00054,
      Mn: 0.00042,
      Mg: 0.012064,
      B: 0.0002,
      Zn: 0.00014,
      Cu: 0.0001,
      Mo: 0.00004,
    },
    name: 'Акварин "Универсальный"',
  },
  CaGluconate: {
    ions: {
      Ca: 0.0089,
      C6H11O7: 0.0866,
    },
    isLiquid: true,
    name: 'Кальция глюконат 10% в ампулах (Фармак)',
  },
  BrexilFe: {
    ions: {
      Fe: 0.1,
    },
    name: 'Brexil Fe 10%',
  },
  BrexilMn: {
    ions: {
      Mn: 0.1,
    },
    name: 'Brexil Mn 10%',
  },
  BrexilMg: {
    ions: {
      MgO: 0.08,
    },
    name: 'Brexil MgO 8% (Valagro)',
  },
  BrexilCombi: {
    ions: {
      Fe: 0.068,
      Mn: 0.026,
      B: 0.009,
      Zn: 0.011,
      Cu: 0.003,
      Mo: 0.002,
    },
    name: 'Brexil Combi',
  },
} satisfies Record<string, CompoundObjectType>;
