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
