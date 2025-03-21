
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
