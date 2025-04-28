export class Dosing {
  public doses: InstanceType<typeof Dose>[];
  public fertilizersRegime: FertilizersRegime;
  public daysTotal: number;
  public tank: Partial<TankType> = {};

  constructor(
    doses: InstanceType<typeof Dose>[],
    fertilizersRegime: FertilizersRegime,
    daysTotal: number,
    tank: Partial<TankType> = {},
  ) {
    this.doses = doses;
    this.fertilizersRegime = fertilizersRegime;
    this.daysTotal = daysTotal;
    this.tank = tank;
  }

  get concentration(): Partial<Record<IonType, Record<string, number>>> {
    const result = {};
    this.doses.forEach((dose) => {
      typedEntries(dose.fertilizer.concentration).forEach(([ion, value]) => {
        if (!(ion in result)) {
          result[ion] = {
            concentration: 0,
            concentrationDay: 0,
            concentrationWaterChange: 0,
            concentrationTotal: 0,
          };
        }
        let concentration = dose.amount * value / this.tank.volume;
        let concentrationDay = dose.amountDay * value / this.tank.volume;
        let concentrationWaterChange = this.tank.waterChangeVolume
          ? (dose.amountWaterChange * value) / this.tank.waterChangeVolume
          : 0;
        let concentrationTotal = concentration;
        if (this.fertilizersRegime === FertilizersRegime.MIX) {
          concentrationTotal =
            concentrationWaterChange * this.tank.waterChangeVolume / this.tank.volume + concentration;
        }
        if ((!dose.fertilizer.isLiquid)) {
          concentration *= MG_IN_G;
          concentrationDay *= MG_IN_G;
          concentrationWaterChange *= MG_IN_G;
          concentrationTotal *= MG_IN_G;
        }
        result[ion].concentration += concentration;
        result[ion].concentrationDay += concentrationDay;
        result[ion].concentrationTotal += concentrationTotal;
        result[ion].concentrationWaterChange += concentrationWaterChange;
      });
    });
    return result;
  };

  get concentrationSorted(): [string, Record<string, number>][] {
    const sortableResult = [];
    Object.entries(this.concentration).forEach(([ion, value]) => {
      sortableResult.push([
        ion,
        { ...value },
      ]);
    });
    sortableResult.sort((a, b) => b[1].concentrationTotal - a[1].concentrationTotal);
    return sortableResult;
  };

  get concentrationTotal(): Record<string, number> {
    const result = {};
    Object.entries(this.concentration).forEach(([ion, value]) => {
      result[ion] = value.concentrationTotal;
    });
    return result;
  }
}
