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

import type { DoseFertilizerType } from '~/utils/types/types';

export class Dose {
  // TODO: why fertilizer has any type?
  readonly fertilizer: InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>;
  readonly fertilizerType: DoseFertilizerType;
  daysTotal: number;
  amountDay?: number;
  amountWaterChange?: number;

  constructor(args: DoseType) {
    this.fertilizerType = args.fertilizerType;
    if (args.fertilizerType === 'fertilizerRecipe') {
      this.fertilizer = new FertilizerRecipe(args.fertilizer as FertilizerRecipeType);
    }
    if (args.fertilizerType === 'fertilizer') {
      this.fertilizer = new Fertilizer(args.fertilizer as FertilizerType);
    }
    if (args.fertilizerType === 'remineralRecipe') {
      this.fertilizer = new RemineralRecipe(args.fertilizer as RemineralRecipeType);
    }
    this.daysTotal = args.daysTotal;
    this.amountDay = args.amountDay ?? 0;
    this.amountWaterChange = args.amountWaterChange ?? 0;
  }

  get amount() {
    return this.amountDay * this.daysTotal;
  }

  set amount(value) {
    this.amountDay = value / this.daysTotal;
  }

  toJson() {
    return {
      fertilizer: this.fertilizer.toJson(),
      fertilizerType: this.fertilizerType,
      daysTotal: this.daysTotal,
      amount: this.amount,
      amountDay: this.amountDay,
      amountWaterChange: this.amountWaterChange,
    };
  }
}
