import type { DoseFertilizerType } from '~/utils/types/types';

export class Dose {
  public fertilizer: InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>;
  public fertilizerType: DoseFertilizerType;
  public daysTotal: number;
  public amountDay?: number;
  public amountWaterChange?: number;

  constructor(args: {
    fertilizer: InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>;
    fertilizerType: DoseFertilizerType;
    daysTotal: number;
    amountDay?: number;
    amountWaterChange?: number;
  }) {
    this.fertilizer = args.fertilizer;
    this.fertilizerType = args.fertilizerType;
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
