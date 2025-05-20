export class Dosing {
  doses: InstanceType<typeof Dose>[];
  fertilizersRegime: FertilizersRegime;
  daysTotal: number;
  tank: TankType;

  constructor(
    doses: InstanceType<typeof Dose>[],
    fertilizersRegime: FertilizersRegime,
    daysTotal: number,
    tank: TankType,
  ) {
    this.doses = doses;
    this.fertilizersRegime = fertilizersRegime;
    this.daysTotal = daysTotal;
    this.tank = tank;
  }

  get isDoses(): boolean {
    return this.doses.length > 0;
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
        if (this.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK) {
          concentrationWaterChange = concentration * this.tank.volume / this.tank.waterChangeVolume;
        }
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
    const result = [];
    Object.entries(this.concentration).forEach(([ion, value]) => {
      result.push([
        ion,
        { ...value },
      ]);
    });
    result.sort((a, b) => b[1].concentrationTotal - a[1].concentrationTotal);
    return result;
  };

  get concentrationTotal(): Record<string, number> {
    return Object.fromEntries(
      Object.entries(this.concentration).map(([ion, value]) => [ion, value.concentrationTotal]),
    );
  }
}
