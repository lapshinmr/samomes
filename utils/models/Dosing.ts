export class Dosing {
  public portions: InstanceType<typeof Dose>[];
  public fertilizersRegime: FertilizersRegime;
  public daysTotal: number;
  public tank: {
    name: string,
    volume: number,
    waterChangeVolume: number,
  };

  constructor(
    portions: InstanceType<typeof Dose>[],
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

  get totalElements(): Partial<Record<IonType, Record<string, number>>> {
    const result = {};
    this.portions.forEach((portion) => {
      typedEntries(portion.fertilizer.concentration).forEach(([ion, value]) => {
        if (!(ion in result)) {
          result[ion] = {
            concentration: 0,
            concentrationDay: 0,
            concentrationWaterChange: 0,
            concentrationTotal: 0,
          };
        }
        const concentration = portion.amount * value / this.tank.volume;
        const concentrationDay = portion.amountDay * value / this.tank.volume;
        const concentrationWaterChange = this.tank.waterChangeVolume
          ? (portion.amountWaterChange * value) / this.tank.waterChangeVolume : 0;
        let concentrationTotal = concentration;
        if (this.fertilizersRegime === FertilizersRegime.MIX) {
          concentrationTotal =
            concentrationWaterChange * this.tank.waterChangeVolume / this.tank.volume + concentration;
        }
        // TODO: check if it is necessary
        // if ((!portion.fertilizer.isLiquid)) {
        //   concentration *= 1000;
        //   concentrationDay *= 1000;
        //   concentrationWaterChange *= 1000;
        //   concentrationTotal *= 1000;
        // }
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
