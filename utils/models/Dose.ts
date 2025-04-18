export class Dose<T extends InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>> {
  public fertilizer: T;
  public amountWaterChange: number;
  public daysTotal: number;
  public _amount: number;
  public _amountDay: number;
  constructor(
    fertilizer: T,
    daysTotal: number,
    amount: number = 0,
    amountDay: number = 0,
    amountWaterChange: number = 0,
  ) {
    this.fertilizer = fertilizer;
    this.daysTotal = daysTotal;
    this.amount = amount;
    this.amountDay = amountDay;
    this.amountWaterChange = amountWaterChange;
  }

  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount = value;
    this._amountDay = +format(value / this.daysTotal, 3);
  }

  get amountDay() {
    return this._amountDay;
  }

  set amountDay(value) {
    this._amountDay = value;
    this._amount = +format(this.daysTotal * value, 3);
  }
}
