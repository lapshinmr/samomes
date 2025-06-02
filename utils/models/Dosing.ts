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

  get waterChangeDecimal() {
    return this.tank.waterChangeVolume / this.tank.volume;
  }

  get waterChangePercent() {
    return this.tank.waterChangeVolume / this.tank.volume * 100;
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
          concentrationWaterChange = concentration * this.waterChangeDecimal;
        }
        if (this.fertilizersRegime === FertilizersRegime.MIX) {
          concentrationTotal = concentrationWaterChange * this.waterChangeDecimal + concentration;
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

  get ionList() {
    return typedKeys(this.concentration);
  }

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

  countIonDynamic(
    ion: IonType,
    ionInit: number = 0,
    ionWaterConcentration: number = 0,
    ionConsumption: number = 0,
  ): number[] | null {
    const result = [];
    let sum = ionInit;
    if (!(ion in this.concentration)) {
      return;
    }
    typedKeys([...Array(this.daysTotal * 15)]).forEach((day) => {
      if (+day > 0 && +day % this.daysTotal === 0) {
        sum = sum * (1 - this.waterChangeDecimal) + ionWaterConcentration * this.waterChangeDecimal;
      }
      if (this.fertilizersRegime === FertilizersRegime.EVERY_DAY) {
        sum += this.concentration[ion].concentrationDay;
      } else if (this.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK) {
        if (+day % this.daysTotal === 0) {
          sum += this.concentration[ion].concentrationWaterChange;
        }
      } else if (this.fertilizersRegime === FertilizersRegime.MIX) {
        if (+day % this.daysTotal === 0) {
          sum += this.concentration[ion].concentrationWaterChange * this.waterChangeDecimal;
        }
        sum += this.concentration[ion].concentrationDay;
      }
      sum -= ionConsumption;
      if (sum < 0) {
        sum = 0;
      }
      result.push(sum);
    });
    return result;
  }

  countBalancedIons(): Partial<Record<IonType, [number, number]>> {
    const result = {};
    const dstIons: IonType[] = ['NO3', 'PO4', 'K', 'Ca', 'Mg', 'Na', 'SO4', 'Cl'];
    dstIons.forEach((ion) => {
      const data = this.countIonDynamic(ion);
      if (data) {
        const lastPeriod = data.slice(-1 * this.daysTotal);
        result[ion] = [lastPeriod[0], lastPeriod[this.daysTotal - 1]];
      }
    });
    return result;
  }
  
  toJson(): DosingType {
    return {
      doses: this.doses.map((dose) => dose.toJson()),
      daysTotal: this.daysTotal,
      tank: { ...this.tank },
      fertilizersRegime: this.fertilizersRegime,
    };
  }
}
