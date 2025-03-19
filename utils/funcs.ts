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

import ELEMENTS from '~/utils/constants/elements';
import FORMULAS from '~/utils/constants/formulas';
import MolecularFormula from '~/utils/molecular-formula';
import type {FormulaType} from "~/utils/types/types";

export const countTotalIonConcentration = (
  concentration: Record<string, Record<string, number>>
): Record<string, number> => {
  const total: Record<string, number> = {};
  Object.values(concentration).forEach((item) => {
    Object.entries(item).forEach(([ion, value]) => {
      if (total[ion] === undefined) {
        total[ion] = 0;
      }
      total[ion] += value;
    });
  });
  return total;
};

export const countMassTotal = (reagent: string): number => {
  let massTotal = 0.0;
  const { ions } = FORMULAS[reagent];
  Object.entries(ions).forEach(([ion, value]) => {
    massTotal += ELEMENTS[ion] * value.count;
  });
  return massTotal;
};

export const countPercent = (reagent: string): Record<string, number> => {
  const massTotal = countMassTotal(reagent);
  const result: Record<string, number> = {};
  const { ions } = FORMULAS[reagent];
  Object.entries(ions).forEach(([ion, value]: [string, { count: number, isNeeded?: boolean }]) => {
    if (value.isNeeded) {
      result[ion] = (ELEMENTS[ion] * value.count) / massTotal;
    }
  });
  return result;
};

export const isConcentration = (concentration: Record<string, Record<string, number>>) => {
  let result = false;
  Object.values(concentration).forEach((item) => {
    Object.keys(item).forEach((ion) => {
      if (item[ion]) {
        result = true;
      }
    });
  });
  return result;
};

export const countTotalIonDose = (solute: Record<string, Record<string, number>>) => {
  const total: Record<string, number> = {};
  Object.values(solute).forEach((value) => {
    Object.keys(value).forEach((ion) => {
      if (total[ion] === undefined) {
        total[ion] = 0;
      }
      total[ion] += value[ion];
    });
  });
  return total;
};

export const countTotalDose = (solute: Record<string, Record<string, number>>) => {
  let total = 0;
  const totalIonSolute = countTotalIonDose(solute);
  Object.keys(totalIonSolute).forEach((ion) => {
    total += totalIonSolute[ion];
  });
  return total;
};

export const countMass = (ion: string) => {
  let mass = 0;
  let lastElement: string;
  [...ion].forEach((el) => {
    mass += +el ? ELEMENTS[lastElement] * (parseInt(el, 10) - 1) : ELEMENTS[el];
    lastElement = el;
  });
  return mass;
};

// TODO: refactor OPPOSITE constants
export const OPPOSITE: Record<string, string> = {
  N: 'NO3',
  NO3: 'N',
  P: 'PO4',
  PO4: 'P',
  S: 'SO4',
  SO4: 'S',
};

export const OXIDE_TO_ELEMENT: Record<string, string> = {
  NO3: 'N',
  PO4: 'P',
  P2O5: 'P2',
  SO4: 'S',
  K2O: 'K2',
  MgO: 'Mg',
  CaO: 'Ca',
};

export const ELEMENT_TO_OXIDE: Record<string, string> = {
  N: 'NO3',
  P: 'PO4',
  S: 'SO4',
  K: 'K2O',
  Mg: 'MgO',
  Ca: 'CaO',
};

export const convertIonName = (ion: string) => OPPOSITE[ion] || ion;

export const convertIonRatio = (ion: string) => (
  convertIonName(ion) !== ion ? countMass(convertIonName(ion)) / countMass(ion) : 1
);

export const getOxideToElementRatio = (oxide: string) => {
  const oxideMass = new MolecularFormula(oxide).mass;
  const elementMass = new MolecularFormula(OXIDE_TO_ELEMENT[oxide]).mass;
  return elementMass / oxideMass;
};

// export const isRecipe = (recipe: Recipe) => recipe.reagents && recipe.reagents.length > 0;

// export const isFertilizer = (recipe: Recipe) => recipe.elements && Object.keys(recipe.elements).length > 0;

export const prepareFormulas = (filter: string[] = []) => {
  const result: ({ key: string; text: string } & FormulaType)[] = [];
  Object.entries(FORMULAS).forEach(([formula, data]) => {
    let found = false;
    if (filter.length !== 0) {
      filter.forEach((element) => {
        if (formula.includes(element)) {
          found = true;
        }
      });
    } else {
      found = true;
    }
    if (found) {
      // @ts-expect-error typescript error
      result.push({
        key: formula,
        text: `${data.name} - ${formula}`,
        ...data,
      });
    }
  });
  result.sort((a, b) => a.text.localeCompare(b.text));
  return result;
};

// export const sortArrayByObjectField = (array, fieldName) => {
//   // const recipeExamples = [];
//   // array.forEach((item) => {
//   //   recipeExamples.push(item[fieldName]);
//   // });
//   array.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
//   return array;
// };

export const countRatio = (concentration: Record<string, number>, el1: string, el2: string) => {
  const c1 = concentration[el1];
  const c2 = concentration[el2];
  if (c1 && c2) {
    return ((c1 * convertIonRatio(el1)) / (c2 * convertIonRatio(el2))).toFixed(2);
  }
  return '—';
};
