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

import type { CARBONATES, ELEMENTS, OXIDE_TO_ELEMENT } from '~/utils/constants/elements';

export type ElementType = keyof typeof ELEMENTS;

export type OxideType = keyof typeof OXIDE_TO_ELEMENT;

export type CarbonatesType = typeof CARBONATES[number];

export type CationType = typeof CATIONS[number]

export type AnionType = typeof ANIONS[number]

export type IonType = ElementType | OxideType | CarbonatesType | AnionType;

export type TankType = {
  name: string;
  volume: number;
  volumeTotal?: number;
  waterChangePercent?: number;
  waterChangeVolume?: number;
  filterVolume?: number;
};

export type FormulaKeyType = keyof typeof FORMULAS;
export type FormulaObjectType = {
  name: string;
  solubility?: number;
  cation?: { key: CationType, number: number };
  anion?: { key: AnionType, number: number };
  HCO3?: number;
  density?: number;
};

export type CompoundKeyType = keyof typeof COMPOUNDS;
export type CompoundObjectType = {
  name: string;
  ions: Partial<Record<IonType, number>>;
  isLiquid?: boolean;
}

export type ReagentKeyType = FormulaKeyType | CompoundKeyType;
export type OwnReagentType = { type: ReagentTypeName } & { key: string } & (FormulaObjectType | CompoundObjectType);

export enum ReagentTypeName { FORMULA = 'formula', COMPOUND = 'compound' }

export type ReagentType = {
  key: ReagentKeyType;
  name: string;
  type: ReagentTypeName;
  amount: number;
  unitConcs?: Partial<Record<IonType, number>>;
  ions?: Partial<Record<IonType, number>>;
  solubility?: number;
  isLiquid?: boolean;
  HCO3?: number;
  density?: number;
  dilution?: number;
}

export type FertilizerRecipeType = {
  name: string;
  description?: string;
  reagents: ReagentType[];
  tankVolume?: number;
  totalVolume?: number;
  isLiquid?: boolean;
  totalMass?: number;
}

export type FertilizerRecipeExampleType = {
  name: string;
  description?: string;
  reagents: { key: ReagentKeyType, amount: number }[];
  tankVolume?: number;
}

export type FertilizerType = {
  name: string;
  description?: string;
  ions: Partial<Record<IonType, number>>;
  isPercent: boolean;
  updatedAt?: string;
  isLiquid: boolean;
}

export type RemineralRecipeType = {
  name: string;
  description?: string;
  reagents: ReagentType[];
  changeVolume: number;
  totalVolume?: number;
  doseVolume?: number;
  isLiquid?: boolean;
}

export type RemineralRecipeExampleType = {
  name: string;
  description?: string;
  reagents: { key: ReagentKeyType, amount: number }[]
  changeVolume: number;
  totalVolume?: number;
  doseVolume?: number;
}

export enum DoseFertilizerType {
  fertilizerRecipe = 'fertilizerRecipe',
  fertilizer = 'fertilizer',
  remineralRecipe = 'remineralRecipe',
}

export type DoseType = {
  fertilizer: FertilizerRecipeType | FertilizerType | RemineralRecipeType;
  fertilizerType: DoseFertilizerType;
  daysTotal: number;
  amount: number;
  amountDay: number;
  amountWaterChange: number;
}

export enum FertilizersRegime { EVERY_DAY, ONCE_A_WEEK, MIX }

