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

export const getElementToIonRatio = (element: string, ion: string): number => {
  const elementMass = new MolecularFormula(element).mass;
  const ionMass = new MolecularFormula(ion).mass;
  return ionMass / elementMass ;
};

export const sortArrayByObjectField = (array: Record<string, string>[], fieldName: string) => {
  const result = [...array];
  result.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
  return result;
};

export const sortObject = (object: Record<string, number>) => {
  const result: [string, number][] = typedEntries(object);
  result.sort((a, b) => b[1] - a[1]);
  return result;
};
