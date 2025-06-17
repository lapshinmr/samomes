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

export default class FertilizerRecipe extends Recipe {
  tankVolume?: number;

  constructor(args: FertilizerRecipeType) {
    super(args);
    this.tankVolume = args.tankVolume;
  }

  countReagentUnitConcsByAmount(
    reagent: InstanceType<typeof Reagent>,
    skipIon: string = '',
  ): Partial<Record<IonType, number>>{
    const result = {};
    typedEntries(reagent.ions).forEach(([ion, value]) => {
      const density = reagent.density ?? 1;
      if (skipIon === '' || skipIon !== ion) {
        result[ion] = format(
          // TODO: split equation to separate functions
          (reagent.amount / this.totalVolume / this.tankVolume) * value * 1000 * density,
        );
      }
    });
    return result;
  }

  // TODO: add total volume and tank volume decorator?
  countRecipeUnitConcsByAmounts(skipIon: string = ''): Partial<Record<ReagentKeyType, Record<IonType, number>>> {
    const result = {};
    if (!this.totalVolume || !this.tankVolume) {
      return result;
    }
    this.reagents.forEach((reagent) => {
      result[reagent.key] = this.countReagentUnitConcsByAmount(reagent, skipIon);
    });
    return result;
  }

  countReagentAmountByUnitConc(value: number, reagent: InstanceType<typeof Reagent>, ion: string): number {
    if (!this.totalVolume || !this.tankVolume) {
      return;
    }
    const density = reagent.density ?? 1;
    // TODO: split equation to separate functions
    return (value * this.tankVolume * this.totalVolume) / 1000 / reagent.ions[ion] / density;
  }

  countRecipeIonUnitConcs(
    recipeUnitConcs: Partial<Record<ReagentKeyType, Record<IonType, number>>>,
  ): Partial<Record<IonType, number>> {
    const total = {};
    typedValues(recipeUnitConcs).forEach((unitConcs) => {
      typedEntries(unitConcs).forEach(([ion, value]) => {
        if (total[ion] === undefined) {
          total[ion] = 0;
        }
        total[ion] += value;
      });
    });
    return total;
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
