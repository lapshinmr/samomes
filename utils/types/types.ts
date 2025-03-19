export type Compound = {
	name: string,
  ions: object,
}

export type FormulaType = {
  [key: string]: {
    ions: {
      [element: string]: {
        isNeeded?: boolean;
        count: number;
      }
    };
    name: string;
    solubilityLimit?: number;
    cation?: object;
    anion?: object;
    H2O?: number;
    HCO3?: number;
    density?: number;
  }
};

