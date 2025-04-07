import Reagent from '~/utils/models/Reagent';

export default class Recipe implements RecipeType {
  public name: string;
  public description?: string;
  public reagents: Reagent[] = [];
  // TODO: check if I need null here
  public waterVolume?: number | null;
  public tankVolume?: number | null;

  // TODO: add shortcuts
  constructor(args: {
    name: string;
    description?: string;
    reagents: ReagentType[];
    waterVolume?: number | null;
    tankVolume?: number | null;
  }) {
    this.name = args.name;
    this.description = args.description;
    this.reagents = args.reagents.map((reagent) => new Reagent({ ...reagent })) || [];
    this.waterVolume = args.waterVolume;
    this.tankVolume = args.tankVolume;
  }

  get totalVolume(): number {
    return this.waterVolume;
  }

  get isLiquid(): boolean {
    return !!this.totalVolume;
  }

  get totalMass(): number {
    return this.reagents.reduce((sum, reagent) => sum + +reagent.amount, 0);
  }

  get concentration(): Record<string, Record<string, number>> {
    const result = {};
    if (this.reagents.length === 0) {
      return result;
    }
    this.reagents.forEach((reagent) => {
      result[reagent.key] = {};
      const { ions, HCO3 } = reagent;
      Object.entries(ions).forEach(([ion, value]) => {
        let units = 1;
        // TODO: check units conversion
        if (this.totalVolume) {
          units = 1 / (this.totalVolume / 1000); // solute
        } else {
          units = 1 / this.totalMass; // dry
        }
        if (ion === 'CO3' && HCO3) {
          units *= HCO3;
        }
        result[reagent.key][ion] = reagent.amount * value * units;
      });
    });
    return result;
  }

  get totalConcentration(): Record<string, number> {
    const result = {};
    Object.values(this.concentration).forEach((ions) => {
      Object.entries(ions).forEach(([ion, value]) => {
        if (!result[ion]) {
          result[ion] = 0;
        }
        result[ion] += value;
      });
    });
    return result;
  }

  updateReagentUnitConcs(reagent: ReagentType, skipIon: string = '') {
    Object.entries(reagent.ions).forEach(([ion, value]) => {
      if (skipIon === '' || skipIon !== ion) {
        reagent.unitConcs[ion] = +format(
          // TODO: split equation to separate functions
          (reagent.amount / this.waterVolume / this.tankVolume) * value * 1000,
          3,
        );
      }
    });
  }

  // TODO: add total volume and tank volume decorator?
  updateRecipeUnitConcs(skipIon: string = '') {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    this.reagents.forEach((reagent) => {
      this.updateReagentUnitConcs(reagent, skipIon);
    });
  }

  updateAmounts(value: number, reagent: ReagentType, ion: string) {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    reagent.unitConcs[ion] = value;
    reagent.amount = +format(
      // TODO: split equation to separate functions
      (reagent.unitConcs[ion] * this.tankVolume * this.waterVolume) / 1000 / reagent.ions[ion],
      3,
    );
    this.updateReagentUnitConcs(reagent, ion);
  }

  countRecipeIonUnitConcs() {
    const total: Record<string, number> = {};
    Object.values(this.reagents).forEach((reagent) => {
      Object.entries(reagent.unitConcs).forEach(([ion, value]) => {
        if (total[ion] === undefined) {
          total[ion] = 0;
        }
        total[ion] += value;
      });
    });
    return total;
  };

  get recipeIonUnitConcs() {
    return this.countRecipeIonUnitConcs();
  }

  get recipeIonUnitConcsSorted () {
    const result = Object.entries(this.recipeIonUnitConcs);
    result.sort((a, b) => b[1] - a[1]);
    return result;
  };

  get totalRecipeUnitConcs() {
    return Object.values(this.recipeIonUnitConcs).reduce((sum, value) => sum + value, 0);
  };

  toJson(): RecipeType {
    return {
      name: this.name,
      description: this.description,
      waterVolume: this.waterVolume,
      tankVolume: this.tankVolume,
      reagents: this.reagents.map((reagent) => ({
        ...reagent.toJson(),
      })),
    };
  }
}
