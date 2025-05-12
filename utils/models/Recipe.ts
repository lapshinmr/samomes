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

import { typedEntries } from '~/utils/utils';
import { ML_IN_L } from '~/utils/constants/units';

export default class Recipe {
  public name: string;
  public description?: string;
  public reagents: InstanceType<typeof Reagent>[] = [];

  constructor(args: {
    name: string;
    description?: string;
    reagents: ReagentType[];
  }) {
    this.name = args.name;
    this.description = args.description;
    this.reagents = args.reagents.map((reagent) => new Reagent({ ...reagent })) || [];
  }

  get totalVolume(): number {
    return this.reagents.reduce((acc, reagent) => acc + (reagent.isLiquid ? reagent.amount : 0), 0);
  }

  get waterVolume(): number {
    return this.reagents.find((reagent) => reagent.key === 'H2O')?.amount ?? 0;
  }

  get isWater(): boolean {
    return this.waterVolume > 0;
  }

  get isReagents(): boolean {
    return this.reagents.length > 0;
  }

  get isLiquid(): boolean {
    return !!this.totalVolume;
  }

  get isSeveralLiquidReagents(): boolean {
    return this.waterVolume !== this.totalVolume;
  }

  get isDry(): boolean {
    return !this.totalVolume;
  }

  get totalMass(): number {
    return this.reagents.reduce((sum, reagent) => {
      let amount = reagent.amount;
      if (reagent.isLiquid) {
        amount = reagent.amount * (reagent.density ?? 1);
      }
      return sum + amount;
    }, 0);
  }

  // TODO: add description
  get concentrationPerReagent(): Partial<Record<FormulaKeyType, Record<IonType, number>>> {
    /*
      Concentration can be in g/l and g/1g units
     */
    const result = {};
    if (this.reagents.length === 0) {
      return result;
    }
    this.reagents.forEach((reagent) => {
      result[reagent.key] = {};
      const { ions, HCO3 } = reagent;
      const density = reagent.density ?? 1;
      Object.entries(ions).forEach(([ion, value]) => {
        let units: number;
        if (this.isLiquid) {
          units = 1 / (this.totalVolume / ML_IN_L); // solute
        } else {
          units = 1 / this.totalMass; // dry
        }
        if (ion === 'CO3' && HCO3) {
          result[reagent.key]['HCO3'] = reagent.amount * value * units * HCO3 * density;
        }
        result[reagent.key][ion] = reagent.amount * value * units * density;
      });
    });
    return result;
  }

  get concentration(): Partial<Record<IonType, number>> {
    const result = {};
    this.reagents.forEach((reagent) => {
      typedEntries(this.concentrationPerReagent[reagent.key]).forEach(([ion, value]) => {
        if (!result[ion]) {
          result[ion] = 0;
        }
        result[ion] += value;
      });
    });
    return result;
  }

  setReagentAmount(value: number, reagentKey: ReagentKeyType) {
    const reagent = this.reagents.find((item) => item.key === reagentKey);
    reagent.amount = value;
  }

  correctWaterVolumeByReagentAmount(newReagentAmount: number, oldReagentAmount: number) {
    const newWaterVolume = this.waterVolume + oldReagentAmount - newReagentAmount;
    this.setReagentAmount(newWaterVolume, 'H2O');
  }
}
