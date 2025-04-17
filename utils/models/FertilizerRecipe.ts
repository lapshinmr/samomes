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

export default class FertilizerRecipe extends Recipe {
  public tankVolume?: number;

  // TODO: add shortcuts
  constructor(args: {
    name: string;
    description?: string;
    reagents: InstanceType<typeof Reagent>[];
    waterVolume?: number;
    tankVolume?: number | null;
  }) {
    super(args);
    this.tankVolume = args.tankVolume;
  }

  // TODO: it's not clear method name
  updateReagentUnitConcs(reagent: ReagentType, skipIon: string = '') {
    Object.entries(reagent.ions).forEach(([ion, value]) => {
      if (skipIon === '' || skipIon !== ion) {
        reagent.unitConcs[ion] = format(
          // TODO: split equation to separate functions
          (reagent.amount / this.waterVolume / this.tankVolume) * value * 1000,
        );
      }
    });
  }

  // TODO: it's not clear method name
  // TODO: add total volume and tank volume decorator?
  updateRecipeUnitConcs(skipIon: string = '') {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    this.reagents.forEach((reagent) => {
      this.updateReagentUnitConcs(reagent, skipIon);
    });
  }

  // TODO: it's not clear method name
  updateAmounts(value: number, reagent: ReagentType, ion: string) {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    reagent.unitConcs[ion] = value;
    reagent.amount = format(
      // TODO: split equation to separate functions
      (reagent.unitConcs[ion] * this.tankVolume * this.waterVolume) / 1000 / reagent.ions[ion],
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
