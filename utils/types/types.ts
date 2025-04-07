import {CARBONATES, ELEMENTS, OXIDE_TO_ELEMENT} from "~/utils/constants/elements";

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

export type FormulaType = {
  name: string;
  ions?: Record<string, number>;
  solubility?: number;
  cation?: object;
  anion?: object;
  H2O?: number;
  HCO3?: number;
  density?: number;
  isLiquid?: boolean;
};

export type CompoundType = {
  name: string;
  ions: Record<string, number>;
  isLiquid?: boolean;
}

export type RecipeExampleType = {
  name: string;
  description?: string;
  reagents: Record<string, number>;
  tankVolume?: number;
  volume?: number;
  waterVolume?: number;
}

export type RemineralExampleType = {
  name: string;
  description?: string;
  reagents: Record<string, number>;
  volume?: number;
  waterVolume?: number;
}

export enum ReagentTypeName {
  FORMULA = 'formula',
  COMPOUND = 'compound'
}

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
  totalConcentration?: Record<string, number>;
}

export type FertilizerType = {
  name: string;
  description?: string;
  ions: Record<IonType, number>;
  isPercent: boolean;
  updatedAt?: string;
  totalConcentration?: Record<string, number>;
}

export type RemineralType = {
  name: string;
  description: string;
  reagents: ReagentType[];
  volume: number;
  waterVolume?: number;
  doseVolume?: number;
  gh?: number;
  kh?: number;
}

export type PortionType<T extends RecipeType> = T & {
  amount: number;
}

export enum FertilizersRegime {
  EVERY_DAY,
  ONCE_A_WEEK,
  MIX
}

export type ElementType = keyof typeof ELEMENTS;

export type OxideType = keyof typeof OXIDE_TO_ELEMENT;

export type CarbonatesType = typeof CARBONATES[number];

export type IonType = ElementType | OxideType | CarbonatesType;

