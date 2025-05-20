export class Remineralization {
  doses: InstanceType<typeof Dose>[];
  tank: TankType;

  constructor(
    doses: InstanceType<typeof Dose>[],
    tank: TankType,
  ) {
    this.doses = doses;
    this.tank = tank;
  }

  get isDoses(): boolean {
    return this.doses.length > 0;
  }

  get fertilizersHardness() {
    const result = {
      gh: 0,
      kh: 0,
    };
    this.doses.forEach((dose) => {
      let gh;
      let kh;
      if ('hardness' in dose.fertilizer && (dose.fertilizer.hardness?.gh || dose.fertilizer.hardness?.kh)) {
        // Unit hardness: hardness * volume / amount
        const hardness = dose.fertilizer.hardness;
        gh = hardness.gh * dose.amount * hardness.volume / (hardness.amount * this.tank.waterChangeVolume);
        kh = hardness.kh * dose.amount * hardness.volume / (hardness.amount * this.tank.waterChangeVolume);
      } else {
        gh = RemineralRecipe.countGh(dose.fertilizer.concentration, dose.amount, this.tank.waterChangeVolume) ?? 0;
        kh = RemineralRecipe.countKh(dose.fertilizer.concentration, dose.amount, this.tank.waterChangeVolume) ?? 0;
        if ((dose.fertilizer.isLiquid)) {
          gh /= MG_IN_G;
          kh /= MG_IN_G;
        }
      }
      result.gh += gh;
      result.kh += kh;
    });
    return result;
  };

  countWaterChangeGh(ghWaterChange: number, osmosisChangePercent: number) {
    const ghFromChangeWater = (ghWaterChange * (1 - osmosisChangePercent / 100));
    return ghFromChangeWater + this.fertilizersHardness.gh;
  }

  countTotalGh(ghInit: number, ghWaterChange: number, osmosisChangePercent: number) {
    const percentageFactor = 100;
    const osmosisPart = ghWaterChange * (1 - osmosisChangePercent / percentageFactor);
    const ghFromTapWater = osmosisPart * this.tank.waterChangePercent / percentageFactor;
    const ghLeft = ghInit * (1 - this.tank.waterChangePercent / percentageFactor);
    const ghRem = this.fertilizersHardness.gh * this.tank.waterChangePercent / percentageFactor;
    return ghLeft + ghFromTapWater + ghRem;
  }

  countWaterChangeKh(khWaterChange: number, osmosisChangePercent: number) {
    const khFromChangeWater = (khWaterChange * (1 - osmosisChangePercent / 100));
    return khFromChangeWater + this.fertilizersHardness.kh;
  }

  countTotalKh(khInit: number, khWaterChange: number, osmosisChangePercent: number) {
    const percentageFactor = 100;
    const osmosisPart = khWaterChange * (1 - osmosisChangePercent / percentageFactor);
    const khFromChangeWater = osmosisPart * this.tank.waterChangePercent / percentageFactor;
    const khLeft = khInit * (1 - this.tank.waterChangePercent / percentageFactor);
    const khRem = this.fertilizersHardness.kh * this.tank.waterChangePercent / percentageFactor;
    return khLeft + khFromChangeWater + khRem;
  }
}
