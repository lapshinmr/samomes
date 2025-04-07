import type Recipe from '~/utils/models/Recipe';

export class Dosing {
  public portions: Portion<Recipe>[];
  public fertilizersRegime: FertilizersRegime;
  public daysTotal: number;
  public tank: {
    name: string,
    volume: number,
    waterChangeVolume: number,
  };

  constructor(
    portions: Portion<Recipe>[],
    fertilizersRegime: FertilizersRegime,
    daysTotal: number,
    tank: {
      name: string,
      volume: number,
      waterChangeVolume: number,
    },
  ) {
    this.portions = portions;
    this.fertilizersRegime = fertilizersRegime;
    this.daysTotal = daysTotal;
    this.tank = tank;
  }

  get totalElements(): Record<string, Record<string, number>> {
    const result = {};
    this.portions.forEach((portion) => {
      Object.entries(portion.fertilizer.totalConcentration).forEach(([ion, value]) => {
        if (!(ion in result)) {
          result[ion] = {
            concentration: 0,
            concentrationDay: 0,
            concentrationWaterChange: 0,
            concentrationTotal: 0,
          };
        }
        let concentration = portion.amount * value / this.tank.volume;
        let concentrationDay = portion.amountDay * value / this.tank.volume;
        let concentrationWaterChange = this.tank.waterChangeVolume
          ? (portion.amountWaterChange * value) / this.tank.waterChangeVolume : 0;
        let concentrationTotal = concentration;
        if (this.fertilizersRegime === FertilizersRegime.MIX) {
          concentrationTotal =
            concentrationWaterChange * this.tank.waterChangeVolume / this.tank.volume + concentration;
        }
        // TODO: check if it is necessary
        if ((!portion.fertilizer.totalVolume)) {
          concentration *= 1000;
          concentrationDay *= 1000;
          concentrationWaterChange *= 1000;
          concentrationTotal *= 1000;
        }
        result[ion].concentration += concentration;
        result[ion].concentrationDay += concentrationDay;
        result[ion].concentrationTotal += concentrationTotal;
        result[ion].concentrationWaterChange += concentrationWaterChange;
      });
    });
    return result;
  };

  get totalElementsSorted(): [string, Record<string, number>][] {
    const sortableResult = [];
    Object.entries(this.totalElements).forEach(([ion, value]) => {
      sortableResult.push([
        ion,
        { ...value },
      ]);
    });
    sortableResult.sort((a, b) => b[1].concentration - a[1].concentration);
    return sortableResult;
  };

  get totalConcentration(): Record<string, number> {
    const result = {};
    Object.entries(this.totalElements).forEach(([ion, value]) => {
      result[ion] = value.concentrationTotal;
    });
    return result;
  }
}
