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

import type { CARBONATES, ELEMENTS, OXIDE_TO_ELEMENT } from '~/utils/constants/elements';

export type ElementType = keyof typeof ELEMENTS;

export type OxideType = keyof typeof OXIDE_TO_ELEMENT;

export type CarbonatesType = typeof CARBONATES[number];

export type CationType = typeof CATIONS[number]

export type AnionType = typeof ANIONS[number]

export type IonType = ElementType | OxideType | CarbonatesType | AnionType;
export type IonsType = Partial<Record<IonType, number>>;

export type TankType = {
  name: string;
  volume: number;
  waterChangePercent?: number;
  waterChangeVolume?: number;
  filterVolume?: number;
  volumeTotal?: number;
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
  key?: ReagentKeyType;
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

export type RecipeType = {
  name: string;
  description?: string;
  reagents: ReagentType[];
  totalVolume?: number;
}

export type FertilizerRecipeType = RecipeType & {
  tankVolume?: number;
  totalMass?: number;
}

export type FertilizerRecipeExampleType = {
  key?: string;
  name: string;
  description?: string;
  reagents: { key: ReagentKeyType, amount: number }[];
  tankVolume?: number;
}

export type FertilizerType = {
  key?: string;
  name: string;
  description?: string;
  ions: Partial<Record<IonType, number>>;
  isLiquid: boolean;
  isPercent: boolean;
  updatedAt?: string;
  hardness?: {
    gh: number;
    kh: number;
    amount: number;
    volume: number;
  };
}

export type RemineralRecipeType = RecipeType & {
  changeVolume: number;
  doseVolume?: number;
}

export type RemineralRecipeExampleType = {
  key?: string;
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
  amountDay?: number;
  amountWaterChange?: number;
}

export enum FertilizersRegime { EVERY_DAY, ONCE_A_WEEK, MIX }

export enum RemineralizationTypes {
  REM,
  TAP,
  MIX,
}

export type DosingType = {
  doses: DoseType[];
  daysTotal: number;
  tank: TankType;
  fertilizersRegime: FertilizersRegime;
}

// TODO: move to enum file; rename
export enum AmountStatus {
  ACTIVE,
  COMPLETED,
  // SKIPPED,
}

export type DayType = {
  date: string;
  fertilizers: Record<string, {
    amount: number | undefined;
    status: AmountStatus;
    selected?: boolean;
  }>;
}

export type ScheduleType = {
  dosing: DosingType;
  startDate: string;
  waterChangeDay: DayType;
  days: DayType[];
}

