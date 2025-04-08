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

import MolecularFormula from '~/utils/models/MolecularFormula';

// TODO: move to MolecularFormula class?
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

export const countRatio = (concentration: Record<string, number>, el1: string, el2: string) => {
  const c1 = concentration[el1];
  const c2 = concentration[el2];
  if (c1 && c2) {
    return c1 / c2;
  }
  return null;
};

export const sortArrayByObjectField = (array: Record<string, string>[], fieldName: string) => {
  const result = [...array];
  result.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
  return result;
};
