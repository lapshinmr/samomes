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

export const countMassTotal = (reagent: string): number => {
  let massTotal = 0.0;
  const { ions } = FORMULAS[reagent];
  Object.entries(ions).forEach(([ion, value]) => {
    massTotal += ELEMENTS[ion] * value.count;
  });
  return massTotal;
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

export const getOxideToElementRatio = (oxide: string): number => {
  const oxideMass = new MolecularFormula(oxide).mass;
  const elementMass = new MolecularFormula(OXIDE_TO_ELEMENT[oxide]).mass;
  return elementMass / oxideMass;
};

export const getElementToOxideRatio = (element: string): number => {
  const elementMass = new MolecularFormula(element).mass;
  const oxideMass = new MolecularFormula(ELEMENT_TO_OXIDE[element]).mass;
  return oxideMass / elementMass ;
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

