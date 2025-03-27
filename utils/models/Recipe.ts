import type Reagent from '~/utils/classes/Reagent';

export default class Recipe {
  public name: string;
  public description?: string;
  public reagents?: Reagent[];
  public waterVolume?: number | null;
  public tankVolume?: number | null;

  constructor(args: {
    name: string;
    description?: string;
    reagents?: Reagent[];
    waterVolume?: number | null;
    tankVolume?: number | null;
  }) {
    this.name = args.name;
    this.description = args.description;
    this.reagents = args.reagents;
    this.waterVolume = args.waterVolume;
    this.tankVolume = args.tankVolume;
  }

  get totalVolume() {
    return this.waterVolume;
  }

  get isLiquid() {
    return !!this.totalVolume;
  }

  get totalMass() {
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

  get totalConcentration() {
    const result = {};
    Object.keys(this.concentration).forEach((key) => {
      Object.keys(this.concentration[key]).forEach((ionKey) => {
        if (!result[ionKey]) {
          result[ionKey] = 0;
        }
        result[ionKey] += this.concentration[key][ionKey];
      });
    });
    return result;
  }

  updateReagentDoses(reagent: Reagent, skipIon: string = '') {
    Object.entries(reagent.ions).forEach(([ion, value]) => {
      if (skipIon === '' || skipIon !== ion) {
        reagent.doses[ion] = +format(
          // TODO: split equation to separate functions
          (reagent.amount / this.waterVolume / this.tankVolume) * value * 1000,
          3,
        );
      }
    });
  }

  // TODO: add total volume and tank volume decorator?
  updateRecipeDoses(skipIon: string = '') {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    this.reagents.forEach((reagent) => {
      this.updateReagentDoses(reagent, skipIon);
    });
  }

  updateAmounts(value: number, reagent: Reagent, ion: string) {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    reagent.doses[ion] = value;
    reagent.amount = +format(
      // TODO: split equation to separate functions
      (reagent.doses[ion] * this.tankVolume * this.waterVolume) / 1000 / reagent.ions[ion],
      3,
    );
    this.updateReagentDoses(reagent, ion);
  }

  countRecipeIonDoses() {
    const total: Record<string, number> = {};
    Object.values(this.reagents).forEach((reagent) => {
      Object.entries(reagent.doses).forEach(([ion, value]) => {
        if (total[ion] === undefined) {
          total[ion] = 0;
        }
        total[ion] += value;
      });
    });
    return total;
  };

  get recipeIonDoses() {
    return this.countRecipeIonDoses();
  }

  get recipeIonDosesSorted () {
    const result = Object.entries(this.recipeIonDoses);
    result.sort((a, b) => b[1] - a[1]);
    return result;
  };

  get totalRecipeDose() {
    return Object.values(this.recipeIonDoses).reduce((sum, value) => sum + value, 0);
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
