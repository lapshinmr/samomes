
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
  reagents: Record<string, number>;
  tankVolume?: number;
  volume?: number;
  waterVolume?: number;
  description?: string;
}

export type ReagentType = {
  key: string;
  name: string;
  amount: number;
  doses?: Record<string, number>;
  ions?: Record<string, number> | object;
  solubility?: number;
  isLiquid?: boolean;
  isFormula: boolean;
  isCompound: boolean;
  HCO3: number;
}

export type RecipeType = {
  name: string;
  description?: string;
  reagents: ReagentType[];
  waterVolume?: number;
  tankVolume?: number;
}
