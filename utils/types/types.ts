import type { CARBONATES, ELEMENTS, OXIDE_TO_ELEMENT } from '~/utils/constants/elements';

export type ElementType = keyof typeof ELEMENTS;

export type OxideType = keyof typeof OXIDE_TO_ELEMENT;

export type CarbonatesType = typeof CARBONATES[number];

export type CationType = typeof CATIONS[number]

export type AnionType = typeof ANIONS[number]

export type IonType = ElementType | OxideType | CarbonatesType;

export type TankType = {
  name: string;
  volume: number;
  length?: number;
  width?: number;
  height?: number;
  glassThickness?: number;
  waterChangePercent?: number;
  waterChangeVolume?: number;
  filterVolume?: number;
  soilVolume?: number;
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
  ions: Record<string, number>;
  isLiquid?: boolean;
}

export type ReagentKeyType = FormulaKeyType | CompoundKeyType;

// TODO: update eslint to fix this issue
export enum ReagentTypeName { FORMULA = 'formula', COMPOUND = 'compound' }

export type ReagentType = {
  key: string;
  name: string;
  type: ReagentTypeName;
  amount: number;
  unitConcs?: Record<string, number>;
  ions?: Record<string, number>;
  solubility?: number;
  isLiquid?: boolean;
  HCO3: number;
}

export type RecipeType = {
  name: string;
  description?: string;
  reagents: ReagentType[];
  waterVolume?: number;
  tankVolume?: number;
  totalVolume?: number;
  isLiquid?: boolean;
  totalMass?: number;
  concentration?: Record<string, Record<string, number>>;
}

export type RecipeExampleType = {
  name: string;
  description?: string;
  reagents: { key: ReagentKeyType, amount: number }[];
  tankVolume?: number;
  volume?: number;
  waterVolume?: number;
}

export type FertilizerType = {
  name: string;
  description?: string;
  ions: Partial<Record<IonType, number>>;
  isPercent: boolean;
  updatedAt?: string;
}

export type RemineralType = {
  name: string;
  description?: string;
  reagents: ReagentType[];
  changeVolume: number;
  waterVolume?: number;
  doseVolume?: number;
}

export type RemineralExampleType = {
  name: string;
  description?: string;
  reagents: { key: ReagentKeyType, amount: number }[]
  changeVolume: number;
  waterVolume?: number;
  doseVolume?: number;
}

export type DoseType<T extends RecipeType | FertilizerType | RemineralType> = T & {
  amount: number;
}

export enum FertilizersRegime { EVERY_DAY, ONCE_A_WEEK, MIX }

