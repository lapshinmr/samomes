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

import ELEMENTS from '@/constants/elements';
import FORMULAS from '@/constants/formulas';

export const countTotalIonConcentration = (concentration) => {
  const total = {};
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

export const countMassTotal = (reagent) => {
  let massTotal = 0.0;
  const { ions } = FORMULAS[reagent];
  Object.entries(ions).forEach(([ion, value]) => {
    massTotal += ELEMENTS[ion] * value.count;
  });
  return massTotal;
};

export const countPercent = (reagent) => {
  const massTotal = countMassTotal(reagent);
  const result = {};
  const { ions } = FORMULAS[reagent];
  Object.entries(ions).forEach(([ion, value]) => {
    if (value.isNeeded) {
      result[ion] = (ELEMENTS[ion] * value.count) / massTotal;
    }
  });
  return result;
};

export const isConcentration = (concentration) => {
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

export const countTotalIonDose = (solute) => {
  const total = {};
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

export const countTotalDose = (solute) => {
  let total = 0;
  const totalIonSolute = countTotalIonDose(solute);
  Object.keys(totalIonSolute).forEach((ion) => {
    total += totalIonSolute[ion];
  });
  return total;
};

export const countMass = (ion) => {
  let mass = 0;
  let lastElement;
  [...ion].forEach((el) => {
    mass += +el ? ELEMENTS[lastElement] * (parseInt(el, 10) - 1) : ELEMENTS[el];
    lastElement = el;
  });
  return mass;
};

export const OPPOSITE = {
  N: 'NO3',
  NO3: 'N',
  P: 'PO4',
  PO4: 'P',
};

export const convertIonName = (ion) => OPPOSITE[ion] || ion;

export const convertIonRatio = (ion) => (
  convertIonName(ion) !== ion ? countMass(convertIonName(ion)) / countMass(ion) : 1
);

export const isRecipe = (recipe) => recipe.reagents && recipe.reagents.length > 0;
export const isFertilizer = (recipe) => recipe.elements && Object.keys(recipe.elements).length > 0;
