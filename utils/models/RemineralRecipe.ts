/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { MG_IN_G, ML_IN_L } from '~/utils/constants/units';
import { typedEntries, typedValues } from '~/utils/utils';

export default class RemineralRecipe extends Recipe {
  public changeVolume: number;
  public doseVolume?: number;
  static GH = {
    Mg: 4.346,
    Ca: 7.144,
  };
  static KH_RATIO = 2.804; // 1 °dH = 0.357 mmol/l HCO₃⁻

  constructor(args: RemineralRecipeType) {
    super(args);
    this.changeVolume = args.changeVolume;
    this.doseVolume = args.doseVolume;
  }

  // We count remineralizator is liquid only if we use water reagent
  override get isLiquid() {
    return !!this.waterVolume;
  }

  override get isDry() {
    return !this.isLiquid;
  }

  static countRatio = (concentration: Record<string, number>, el1: string, el2: string) => {
    const c1 = concentration[el1];
    const c2 = concentration[el2];
    if (c1 && c2) {
      return c1 / c2;
    }
    return null;
  };

  static countCaGh(concentrationCa: number, amount: number, volume: number) {
    /**
     * If concentration is in percent, then the amount is mass in g and volume in L.
     * If concentration is in g/l, then the amount is volume in L.
     */
    return concentrationCa * amount * MG_IN_G / (RemineralRecipe.GH.Ca * volume);
  }

  static countMgGh(concentrationMg: number, amount: number, volume: number) {
    /**
     * If concentration is in percent, then the amount is mass in g and volume in L.
     * If concentration is in g/l, then the amount is volume in L.
     */
    return concentrationMg * amount * MG_IN_G / (RemineralRecipe.GH.Mg * volume);
  }

  static countGh(
    concentration: IonsType,
    amount: number = 1,
    volume: number = 1,
  ) {
    /**
     * Calculates the General Hardness (GH) of water based on the concentration of calcium (Ca)
     * and magnesium (Mg) ions, the amount of substance, and the volume.
     *
     * @param {IonsType} concentration - An object containing the concentrations
     * of ions (e.g., Ca, Mg) in the substance. Concentration can be in percent or in g/l. If g/l then volume and amount
     * should be equal to 1
     * @param {number} [amount=1] - The amount of the substance being measured. Unit is grams for solids
     * and milliliters for liquids.
     * @param {number} [volume=1] - The volume of the solution in liters.
     * @return {number|null} The calculated GH value, or null if GH cannot be computed.
     */
    let gh = null;
    if ('Ca' in concentration) {
      gh = (gh ?? 0) + RemineralRecipe.countCaGh(concentration.Ca, amount, volume);
    }
    if ('Mg' in concentration) {
      gh = (gh ?? 0) + RemineralRecipe.countMgGh(concentration.Mg, amount, volume);
    }
    return gh;
  }

  countKh(
    concentration: Partial<Record<IonType, number>>,
    amount: number,
    volume: number,
  ) {
    let kh = null;
    if ('HCO3' in concentration) {
      // concentration.HCO3 is equal to concentration.CO3 multiplied to HCO3 number in the formula with CO2 injection
      const nHCO3 = concentration.HCO3 * amount / new MolecularFormula('CO3').mass;
      kh = nHCO3 * MG_IN_G * RemineralRecipe.KH_RATIO / volume;
    }
    return kh;
  }

  countReagentAmountByGh(reagent: InstanceType<typeof Reagent>, gh: number): number {
    let result = 0;
    if ('Ca' in reagent.ions) {
      result = gh * RemineralRecipe.GH.Ca * this.changeVolume / (reagent.ions['Ca'] * MG_IN_G);
    } else if ('Mg' in reagent.ions) {
      result = gh * RemineralRecipe.GH.Mg * this.changeVolume / (reagent.ions['Mg'] * MG_IN_G);
    }
    if (this.isLiquid) {
      result *= this.totalVolume / this.doseVolume;
    }
    return result;
  }

  countReagentAmountByKh(reagent: InstanceType<typeof Reagent>, kh: number): number {
    let result = 0;
    if ('CO3' in reagent.ions) {
      const amountCO3 = kh * this.changeVolume * new MolecularFormula('CO3').mass
        / (RemineralRecipe.KH_RATIO * reagent.HCO3);
      result = amountCO3 / (reagent.ions['CO3'] * MG_IN_G);
    }
    if (this.isLiquid) {
      result *= this.totalVolume / this.doseVolume;
    }
    return result;
  }

  get ghPerReagent(): Partial<Record<FormulaKeyType, number>> {
    const result = {};
    let dosePercent = 1;
    let amount: number;
    if (this.isLiquid) {
      amount = this.totalVolume / ML_IN_L;
      // total mass is dissolved in the whole water volume, and we need to take into account that gh depends on
      // dose volume for the liquid remineralizator
      dosePercent = this.doseVolume / this.totalVolume;
    } else {
      amount = this.totalMass;
    }
    this.reagents.forEach((reagent) => {
      const gh = RemineralRecipe.countGh(
        this.concentrationPerReagent[reagent.key],
        amount,
        this.changeVolume,
      );
      result[reagent.key] = gh !== null ? gh * dosePercent : null;
    });
    return result;
  }

  get khPerReagent(): Partial<Record<FormulaKeyType, number>> {
    const result = {};
    let dosePercent = 1;
    let amount: number;
    if (this.isLiquid) {
      amount = this.totalVolume / ML_IN_L;
      // total mass is dissolved in the whole water volume, and we need to take into account that gh depends on
      // dose volume for the liquid remineralizator
      dosePercent = this.doseVolume / this.totalVolume;
    } else {
      amount = this.totalMass;
    }
    this.reagents.forEach((reagent) => {
      const kh = this.countKh(
        this.concentrationPerReagent[reagent.key],
        amount,
        this.changeVolume,
      );
      result[reagent.key] = kh !== null ? kh * dosePercent : null;
    });
    return result;
  }

  get gh(): number {
    let result = null;
    Object.values(this.ghPerReagent).forEach((value) => {
      if (value !== null) {
        result += value;
      }
    });
    return result;
  }

  get kh(): number {
    let result = null;
    Object.values(this.khPerReagent).forEach((value) => {
      if (value !== null) {
        result += value;
      }
    });
    return result;
  }

  get caMgRatio(): number {
    return RemineralRecipe.countRatio(this.concentration, 'Ca', 'Mg');
  }

  get concentrationWithoutHCO3(): Partial<Record<IonType, number>> {
    return Object.fromEntries(
      Object.entries(this.concentration).filter(([ion, ]) => ion !== HCO3));
  };

  get concentrationInChangeWater(): Partial<Record<IonType, number>> {
    const result = {};
    Object.entries(this.concentrationWithoutHCO3).forEach(([ion, value]) => {
      if (this.isDry) {
        result[ion] = value * this.totalMass * ML_IN_L / this.changeVolume;
      } else {
        result[ion] = value * this.doseVolume / this.changeVolume;
      }
    });
    return result;
  };

  get tds(): number {
    let result = 0;
    typedEntries(this.concentration).forEach(([ion, value]) => {
      if (ion !== 'HCO3') {
        if (this.isDry) {
          result += value * this.totalMass * MG_IN_G / this.changeVolume;
        } else {
          result += value * this.doseVolume / this.changeVolume;
        }
      }
    });
    return result;
  }

  get cations(): Partial<Record<IonType, [number, number]>> {
    const result = {};
    typedEntries(this.concentration).forEach(([ion, value]) => {
      if (CATIONS.includes(ion as CationType)) {
        if (this.isDry) {
          result[ion] = [value, value * this.totalMass * MG_IN_G / this.changeVolume];
        } else {
          result[ion] = [value, value * this.doseVolume / this.changeVolume];
        }
      }
    });
    const totalValue: number = typedValues(result).reduce((acc, value) => acc + value[0], 0);
    Object.keys(result).forEach((ion) => {
      result[ion][0] /= totalValue;
    });
    return result;
  }

  get anions(): Partial<Record<IonType, [number, number]>> {
    const result = {};
    typedEntries(this.concentration).forEach(([ion, value]) => {
      if (ANIONS.includes(ion as AnionType)) {
        if (this.isDry) {
          result[ion] = [value, value * this.totalMass * MG_IN_G / this.changeVolume];
        } else {
          result[ion] = [value, value * this.doseVolume / this.changeVolume];
        }
      }
    });
    const totalValue: number = typedValues(result).reduce((acc, value) => acc + value[0], 0);
    Object.keys(result).forEach((ion) => {
      result[ion][0] /= totalValue;
    });
    return result;
  }

  splitGhToCaMgAmounts(gh: number, caMgRatio: number) {
    /**
     ghCa = (concentration.Ca * amount) / (GH.Ca * volume)
     ghMg = (concentration.Mg * amount) / (GH.Mg * volume)
     concentration.Ca = concentration.Mg * caMgRatio

     Then
     gh = (concentration.Ca * amount) / (GH.Ca * volume) + (concentration.Mg * amount) / (GH.Mg * volume)
     gh = (concentration.Mg * caMgRatio * amount) / (GH.Ca * volume) + (concentration.Mg * amount) / (GH.Mg * volume)
     concentration.Mg = amountMg / amount

     Then
     gh = (amountMg * caMgRatio) / (GH.Ca * volume) + (amountMg * amount) / (GH.Mg * volume)
     gh = (amountMg / volume) * (caMgRatio / GH.Ca + 1/ GH.Mg)

     Result
     amountMg = gh * volume / (caMgRatio / GH.Ca + 1 / GH.Mg)
     **/
    const amountMg = gh * this.changeVolume / (caMgRatio / RemineralRecipe.GH.Ca + 1 / RemineralRecipe.GH.Mg);
    const amountCa = amountMg * caMgRatio;
    return [amountCa, amountMg];
  }

  updateReagentAmountsByGh(
    gh: number,
    reagentsLocked: Partial<Record<FormulaKeyType, boolean>> = {},
  ) {
    const ghPerReagent = { ...this.ghPerReagent };
    let ghLocked = 0;
    this.reagents.filter((reagent) => reagentsLocked[reagent.key]).forEach((reagent) => {
      ghLocked += ghPerReagent[reagent.key];
    });

    const ghPrev = this.gh;

    this.reagents.filter((reagent) => !reagentsLocked[reagent.key]).forEach((reagent) => {
      if (reagent.key !== H2O) {
        const ratio = (gh - ghLocked) / (ghPrev - ghLocked);
        const newReagentAmount = reagent.amount * ratio;
        if (reagent.isLiquid && this.isLiquid) {
          this.correctWaterVolumeByReagentAmount(newReagentAmount, reagent.amount);
        }
        this.setReagentAmount(
          newReagentAmount,
          reagent.key,
        );
      }
    });
  }

  updateReagentAmountsByGhAndCaMgRatio(
    gh: number,
    caMgRatio: number,
  ) {
    let [amountCaNew, amountMgNew] = this.splitGhToCaMgAmounts(gh, caMgRatio);
    if (this.isLiquid) {
      amountCaNew *= this.totalVolume / this.doseVolume;
      amountMgNew *= this.totalVolume / this.doseVolume;
    }
    // Previous ghCa and ghMg level
    let ghCa: number;
    let ghMg: number;
    if (this.isDry) {
      ghCa = RemineralRecipe.countCaGh(this.concentration.Ca, this.totalMass, this.changeVolume);
      ghMg = RemineralRecipe.countMgGh(this.concentration.Mg, this.totalMass, this.changeVolume);
    } else {
      ghCa = RemineralRecipe.countCaGh(this.concentration.Ca, this.doseVolume / ML_IN_L, this.changeVolume);
      ghMg = RemineralRecipe.countMgGh(this.concentration.Mg, this.doseVolume / ML_IN_L, this.changeVolume);
    }
    const ghPerReagent = { ...this.ghPerReagent };

    this.reagents.forEach((reagent) => {
      let ratio = 1;
      if ('Ca' in reagent.ions) {
        ratio = ghPerReagent[reagent.key] / ghCa; // this is part of gh for the reagent
        this.setReagentAmount(
          amountCaNew * ratio / (new MolecularFormula(reagent.key).fraction['Ca'] * 1000),
          reagent.key,
        );
      }
      if ('Mg' in reagent.ions) {
        ratio = ghPerReagent[reagent.key] / ghMg;
        this.setReagentAmount(
          amountMgNew * ratio / (new MolecularFormula(reagent.key).fraction['Mg'] * 1000),
          reagent.key,
        );
      }
    });
  }

  updateReagentAmountsByKh(kh: number) {
    const khInit = this.kh;
    let caRatio = 1;
    let mgRatio = 1;
    this.reagents.forEach((reagent) => {
      let ratio = 1;
      if ('CO3' in reagent.ions) {
        ratio = kh / khInit;
        this.setReagentAmount( reagent.amount * ratio, reagent.key);
        if ('Ca' in reagent.ions) {
          mgRatio *= ratio;
        }
        if ('Mg' in reagent.ions) {
          caRatio *= ratio;
        }
      }
    });
    this.reagents.forEach((reagent) => {
      if (!('CO3' in reagent.ions)) {
        if ('Ca' in reagent.ions) {
          this.setReagentAmount( reagent.amount * caRatio, reagent.key);
        }
      }
      if (!('CO3' in reagent.ions)) {
        if ('Mg' in reagent.ions) {
          this.setReagentAmount( reagent.amount * mgRatio, reagent.key);
        }
      }
    });
  }

  toJson(): RemineralRecipeType {
    return {
      name: this.name,
      description: this.description,
      totalVolume: this.totalVolume,
      changeVolume: this.changeVolume,
      doseVolume: this.doseVolume,
      reagents: this.reagents.map((reagent) => ({
        ...reagent.toJson(),
      })),
    };
  }
}
