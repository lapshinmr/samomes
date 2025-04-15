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

import type { RemineralType } from '~/utils/types/types';
import Reagent from '~/utils/models/Reagent';
import { GH, KH_RATIO } from '~/utils/constants/hardness';
import { countRatio } from '~/utils/funcs';

// TODO: add base or abstract class here and in the Recipe class
export default class Remineral {
  public name: string;
  public description: string;
  public reagents: Reagent[] = [];
  public volume: number;
  public waterVolume?: number;
  // TODO: come up with the better name
  public doseVolume?: number;

  constructor(args: RemineralType) {
    this.name = args.name;
    this.description = args.description;
    this.reagents = args.reagents.map((reagent) => new Reagent({ ...reagent })) || [];
    this.volume = args.volume;
    this.doseVolume = args.doseVolume;
    this.waterVolume = args.waterVolume;
  }

  get totalVolume(): number {
    return this.waterVolume;
  }

  get isLiquid(): boolean {
    return !!this.totalVolume;
  }

  get isDry(): boolean {
    return !this.totalVolume;
  }

  get totalMass(): number {
    return this.reagents.reduce((sum, reagent) => sum + +reagent.amount, 0);
  }

  // TODO: check the difference between recipe and remineral concentration
  // TODO: add description
  get concentrationPerReagent(): Record<string, Partial<Record<IonType, number>>> {
    const result = {};
    if (this.reagents.length === 0) {
      return result;
    }
    this.reagents.forEach((reagent) => {
      result[reagent.key] = {};
      const { ions, HCO3 } = reagent;
      Object.entries(ions).forEach(([ion, value]) => {
        let units = 1;
        // if (this.isLiquid) {
        //   units = 1 / (this.totalVolume / 1000);
        // } else {
        units = 1 / reagent.amount;
        // }
        if (ion === 'CO3' && HCO3) {
          result[reagent.key]['HCO3'] = reagent.amount * value * units * HCO3;
        }
        result[reagent.key][ion] = reagent.amount * value * units;
      });
    });
    return result;
  }

  get concentration(): Partial<Record<IonType, number>> {
    const result = {};
    this.reagents.forEach((reagent) => {
      Object.entries(this.concentrationPerReagent[reagent.key]).forEach(([ion, value]) => {
        if (!result[ion]) {
          result[ion] = 0;
        }
        // if (this.isDry) {
        value = value * reagent.amount / this.totalMass;
        // }
        result[ion] += value;
      });
    });
    return result;
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
    const G_TO_MG = 1000;
    gh *= G_TO_MG;
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

  countReagentAmountByGh(reagent: Reagent, gh: number): number {
    let result = 0;
    if ('Ca' in reagent.ions) {
      result = gh * GH.Ca * this.volume / new MolecularFormula(reagent.key).fraction['Ca'] / 1000;
    } else if ('Mg' in reagent.ions) {
      result = gh * GH.Mg * this.volume / new MolecularFormula(reagent.key).fraction['Mg'] / 1000;
    }
    return result;
  }

  countReagentAmountByKh(reagent: Reagent, kh: number): number {
    let result = 0;
    if ('CO3' in reagent.ions) {
      const amountCO3 = kh * this.volume * new MolecularFormula('CO3').mass / (KH_RATIO * reagent.HCO3);
      result = amountCO3 / reagent.ions['CO3'] / 1000;
    }
    return result;
  }

  get ghPerReagent() {
    const result: Record<string, number> = {};
    this.reagents.forEach((reagent) => {
      result[reagent.key] = this.countGh(this.concentrationPerReagent[reagent.key], reagent.amount, this.volume);
    });
    return result;
  }

  get khPerReagent() {
    const result: Record<string, number> = {};
    this.reagents.forEach((reagent) => {
      result[reagent.key] = this.countKh(this.concentrationPerReagent[reagent.key], reagent.amount, this.volume);
    });
    return result;
  }

  get gh(): number {
    // TODO: Count by ghPerReagent?
    return this.countGh(this.concentration, this.totalMass, this.volume);
  }

  get kh(): number {
    return this.countKh(this.concentration, this.totalMass, this.volume);
  }

  get caMgRatio(): number {
    return countRatio(this.concentration, 'Ca', 'Mg');
  }

  get totalElements() {
    const result: Partial<Record<IonType, number>> = {};
    Object.entries(this.concentration).forEach(([ion, value]) => {
      result[ion] = value * this.totalMass / this.volume * 1000; // 1000 - from g/l to mg/l;
    });
    return result;
  };

  get tds(): number {
    return Object.entries(this.concentration)
      .filter(([ion]) => ion !== 'HCO3')
      .reduce((a, [,c]) => a + c * this.totalMass / this.volume * 1000, 0);
  }

  get cations() {
    const result: Partial<Record<IonType, [number, number]>> = {};
    Object.entries(this.concentration).forEach(([ion, value]) => {
      if (CATIONS.includes(ion)) {
        result[ion] = [value, value * this.totalMass / this.volume * 1000]; // 1000 - from g/l to mg/l;
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
        result[ion] = [value, value * this.totalMass / this.volume * 1000]; // 1000 - from g/l to mg/l;
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

  updateReagentAmountsByGhAndCaMgRatio(gh: number, caMgRatio: number) {
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
    const amountMg = gh * this.volume / (caMgRatio / GH.Ca + 1 / GH.Mg);
    const amountCa = amountMg * caMgRatio;
    const ghCa = (this.concentration.Ca * this.totalMass) / (GH.Ca * this.volume) * 1000;
    const ghMg = (this.concentration.Mg * this.totalMass) / (GH.Mg * this.volume) * 1000;
    const ghPerReagent = { ...this.ghPerReagent };
    this.reagents.forEach((reagent) => {
      let ratio = 1;
      if ('Ca' in reagent.ions) {
        ratio = ghPerReagent[reagent.key] / ghCa;
        this.setReagentAmount(
          reagent.key,
          amountCa * ratio / (new MolecularFormula(reagent.key).fraction['Ca'] * 1000),
        );
      }
      if ('Mg' in reagent.ions) {
        ratio = ghPerReagent[reagent.key] / ghMg;
        this.setReagentAmount(
          reagent.key,
          amountMg * ratio / (new MolecularFormula(reagent.key).fraction['Mg'] * 1000),
        );
      }
    });
  }

  updateReagentAmountsByKhAndCaMgRatio(kh: number) {
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
      volume: this.volume,
      doseVolume: this.doseVolume,
      reagents: this.reagents.map((reagent) => ({
        ...reagent.toJson(),
      })),
    };
  }
}
