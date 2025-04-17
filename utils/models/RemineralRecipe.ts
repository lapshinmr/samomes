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

import { GH, KH_RATIO } from '~/utils/constants/hardness';
import { MG_IN_G } from '~/utils/constants/units';
import { countRatio } from '~/utils/funcs';
import { typedEntries } from '~/utils/utils';

export default class RemineralRecipe extends Recipe {
  public changeVolume: number;
  public doseVolume?: number;

  constructor(args: {
    name: string;
    description: string;
    reagents: InstanceType<typeof Reagent>[];
    waterVolume?: number;
    changeVolume: number;
    doseVolume?: number;
  }) {
    super(args);
    this.changeVolume = args.changeVolume;
    this.doseVolume = args.doseVolume;
  }

  // TODO: return null if reagent doesn't have Ca or Mg
  countGh(
    concentration: Partial<Record<IonType, number>>,
    amount: number,
    volume: number,
  ) {
    let gh = null;
    if ('Ca' in concentration) {
      gh = (gh ?? 0) + (concentration.Ca * amount) / (GH.Ca * volume);
    }
    if ('Mg' in concentration) {
      gh = (gh ?? 0) + (concentration.Mg * amount) / (GH.Mg * volume);
    }
    if (gh === null) {
      return gh;
    }
    gh *= MG_IN_G;
    if (this.isLiquid) {
      gh *= (this.doseVolume / this.waterVolume);
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
      // TODO: add formula description
      kh = (concentration.HCO3 / (volume * new MolecularFormula('CO3').mass)) * KH_RATIO * amount;
      kh *= 1000;
    }
    if (kh === null) {
      return kh;
    }
    if (this.isLiquid) {
      kh *= (this.doseVolume / this.waterVolume);
    }
    return kh;
  }

  countReagentAmountByGh(reagent: InstanceType<typeof Reagent>, gh: number): number {
    let result = 0;
    if ('Ca' in reagent.ions) {
      result = gh * GH.Ca * this.changeVolume / new MolecularFormula(reagent.key).fraction['Ca'] / 1000;
    } else if ('Mg' in reagent.ions) {
      result = gh * GH.Mg * this.changeVolume / new MolecularFormula(reagent.key).fraction['Mg'] / 1000;
    }
    return result;
  }

  countReagentAmountByKh(reagent: InstanceType<typeof Reagent>, kh: number): number {
    let result = 0;
    if ('CO3' in reagent.ions) {
      const amountCO3 = kh * this.changeVolume * new MolecularFormula('CO3').mass / (KH_RATIO * reagent.HCO3);
      result = amountCO3 / reagent.ions['CO3'] / 1000;
    }
    return result;
  }

  get ghPerReagent(): Partial<Record<FormulaKeyType, number>> {
    const result = {};
    this.reagents.forEach((reagent) => {
      result[reagent.key] = this.countGh(this.concentrationPerReagent[reagent.key], reagent.amount, this.changeVolume);
    });
    return result;
  }

  get khPerReagent(): Partial<Record<FormulaKeyType, number>> {
    const result = {};
    this.reagents.forEach((reagent) => {
      result[reagent.key] = this.countKh(this.concentrationPerReagent[reagent.key], reagent.amount, this.changeVolume);
    });
    return result;
  }

  get gh(): number {
    return Object.values(this.ghPerReagent).reduce((acc, value) => acc + value, 0);
  }

  get kh(): number {
    return Object.values(this.khPerReagent).reduce((acc, value) => acc + value, 0);
  }

  get caMgRatio(): number {
    return countRatio(this.concentration, 'Ca', 'Mg');
  }

  get totalElements() {
    const result: Partial<Record<IonType, number>> = {};
    Object.entries(this.concentration).forEach(([ion, value]) => {
      result[ion] = value * this.totalMass / this.changeVolume * 1000; // 1000 - from g/l to mg/l;
    });
    return result;
  };

  get tds(): number {
    return Object.entries(this.concentration)
      .filter(([ion]) => ion !== 'HCO3')
      .reduce((a, [,c]) => a + c * this.totalMass / this.changeVolume * 1000, 0);
  }

  get cations() {
    const result: Partial<Record<IonType, [number, number]>> = {};
    typedEntries(this.concentration).forEach(([ion, value]) => {
      if (CATIONS.includes(ion)) {
        result[ion] = [value, value * this.totalMass / this.changeVolume * MG_IN_G]; // 1000 - from g/l to mg/l;
      }
    });
    const totalValue: number = Object.values(result).reduce((acc, value) => acc + value[0], 0);
    Object.keys(result).forEach((ion) => {
      result[ion][0] /= totalValue;
    });
    return result;
  }

  get anions() {
    const result: Partial<Record<IonType, [number, number]>> = {};
    Object.entries(this.concentration).forEach(([ion, value]) => {
      if (ANIONS.includes(ion)) {
        result[ion] = [value, value * this.totalMass / this.changeVolume * 1000]; // 1000 - from g/l to mg/l;
      }
    });
    const totalValue: number = Object.values(result).reduce((acc, value) => acc + value[0], 0);
    Object.keys(result).forEach((ion) => {
      result[ion][0] /= totalValue;
    });
    return result;
  }

  setReagentAmount(reagentKey: string, value: number) {
    const reagent = this.reagents.find((item) => item.key === reagentKey);
    reagent.amount = value;
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
    const amountMg = gh * this.changeVolume / (caMgRatio / GH.Ca + 1 / GH.Mg);
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
      const ratio = (gh - ghLocked) / (ghPrev - ghLocked);
      this.setReagentAmount(
        reagent.key,
        reagent.amount * ratio,
      );
    });
  }

  updateReagentAmountsByGhAndCaMgRatio(
    gh: number,
    caMgRatio: number,
  ) {
    const [amountCaNew, amountMgNew] = this.splitGhToCaMgAmounts(gh, caMgRatio);
    // Previous ghCa and ghMg level
    const ghCa = (this.concentration.Ca * this.totalMass) / (GH.Ca * this.changeVolume) * 1000;
    const ghMg = (this.concentration.Mg * this.totalMass) / (GH.Mg * this.changeVolume) * 1000;
    const ghPerReagent = { ...this.ghPerReagent };

    this.reagents.forEach((reagent) => {
      let ratio = 1;
      if ('Ca' in reagent.ions) {
        ratio = ghPerReagent[reagent.key] / ghCa; // this is part of gh for the reagent
        this.setReagentAmount(
          reagent.key,
          amountCaNew * ratio / (new MolecularFormula(reagent.key).fraction['Ca'] * 1000),
        );
      }
      if ('Mg' in reagent.ions) {
        ratio = ghPerReagent[reagent.key] / ghMg;
        this.setReagentAmount(
          reagent.key,
          amountMgNew * ratio / (new MolecularFormula(reagent.key).fraction['Mg'] * 1000),
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
        this.setReagentAmount(reagent.key, reagent.amount * ratio);
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
          this.setReagentAmount(reagent.key, reagent.amount * caRatio);
        }
      }
      if (!('CO3' in reagent.ions)) {
        if ('Mg' in reagent.ions) {
          this.setReagentAmount(reagent.key, reagent.amount * mgRatio);
        }
      }
    });
  }

  toJson(): RemineralType {
    return {
      name: this.name,
      description: this.description,
      waterVolume: this.waterVolume,
      changeVolume: this.changeVolume,
      doseVolume: this.doseVolume,
      reagents: this.reagents.map((reagent) => ({
        ...reagent.toJson(),
      })),
    };
  }
}
