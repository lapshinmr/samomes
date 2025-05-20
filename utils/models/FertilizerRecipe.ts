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
  tankVolume?: number;

  constructor(args: FertilizerRecipeType) {
    super(args);
    this.tankVolume = args.tankVolume;
  }

  updateReagentUnitConcsByAmount(reagent: InstanceType<typeof Reagent>, skipIon: string = ''): void {
    typedEntries(reagent.ions).forEach(([ion, value]) => {
      const density = reagent.density ?? 1;
      if (skipIon === '' || skipIon !== ion) {
        reagent.unitConcs[ion] = format(
          // TODO: split equation to separate functions
          (reagent.amount / this.totalVolume / this.tankVolume) * value * 1000 * density,
        );
      }
    });
  }

  // TODO: add total volume and tank volume decorator?
  updateRecipeUnitConcsByAmounts(skipIon: string = ''): void {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    this.reagents.forEach((reagent) => {
      this.updateReagentUnitConcsByAmount(reagent, skipIon);
    });
  }

  updateReagentAmountsByUnitConcs(value: number, reagent: InstanceType<typeof Reagent>, ion: string): void {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    const density = reagent.density ?? 1;
    reagent.unitConcs[ion] = value;
    // TODO: split equation to separate functions
    const newReagentAmount = (reagent.unitConcs[ion] * this.tankVolume * this.totalVolume)
      / 1000 / reagent.ions[ion] / density;
    // correct water volume
    if (reagent.isLiquid) {
      this.correctWaterVolumeByReagentAmount(format(newReagentAmount), reagent.amount);
    }
    this.setReagentAmount(format(newReagentAmount), reagent.key);
    this.updateReagentUnitConcsByAmount(reagent, ion);
  }

  countRecipeIonUnitConcs(): Partial<Record<IonType, number>> {
    const total = {};
    this.reagents.forEach((reagent) => {
      typedEntries(reagent.unitConcs).forEach(([ion, value]) => {
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
    const result = typedEntries(this.recipeIonUnitConcs);
    result.sort((a, b) => b[1] - a[1]);
    return result;
  };

  get totalRecipeUnitConcs() {
    return typedValues(this.recipeIonUnitConcs).reduce((sum, value) => sum + value, 0);
  };

  toJson(): FertilizerRecipeType {
    return {
      name: this.name,
      description: this.description,
      tankVolume: this.tankVolume,
      reagents: this.reagents.map((reagent) => ({
        ...reagent.toJson(),
      })),
    };
  }
}
