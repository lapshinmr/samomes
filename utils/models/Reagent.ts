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

import MolecularFormula from '~/utils/models/MolecularFormula';
import { getElementToIonRatio, getElementToOxideRatio, getOxideToElementRatio } from '~/utils/funcs';

export default class Reagent {
  public readonly key: ReagentKeyType;
  public readonly name: string;
  public readonly type: ReagentTypeName;
  public readonly isLiquid?: boolean;
  public readonly HCO3: number;
  public readonly density?: number;
  public amount: number;
  public unitConcs?: Partial<Record<IonType, number>>;
  public solubility?: number;
  // TODO: add property decorator to set limits [1, 100]
  public dilution?: number;
  private _ions?: Partial<Record<IonType, number>>;

  constructor(args: ReagentType) {
    this.key = args.key;
    this.name = args.name;
    this.amount = args.amount;
    this.type = args.type;
    this.unitConcs = args.unitConcs ?? {};
    this.solubility = args.solubility;
    this.isLiquid = args.isLiquid ?? false;
    this.density = args.density;
    if (this.density) {
      this.isLiquid = true;
    }
    if (this.isLiquid) {
      this.dilution = args.dilution || 100;
    }
    this.HCO3 = args.HCO3;
    this.ions = args.ions;

    this.initDoses();
  }

  get isFormula() {
    return this.type === 'formula';
  }

  get isCompound() {
    return this.type === 'compound';
  }

  // TODO: refactor this place
  get ions(): IonsType {
    let result: IonsType;
    if (this.isCompound) {
      // result = { ...this._ions };
      const ions = {};
      typedEntries(this._ions).forEach(([el, value]) => {
        if (!value) {
          return;
        }
        if (el === 'N') {
          ions['NO3'] = value * getElementToOxideRatio(el);
        } else if (el === 'P') {
          ions['PO4'] = value * getElementToOxideRatio(el);
        } else if (el === 'S') {
          ions['SO4'] = value * getElementToOxideRatio(el);
        } else if (el === 'MgO') {
          ions['Mg'] = value * getOxideToElementRatio(el);
        } else if (el === 'CaO') {
          ions['Ca'] = value * getOxideToElementRatio(el);
        } else if (el === 'P2O5') {
          ions['PO4'] = value * getOxideToElementRatio(el) * getElementToOxideRatio('P');
        } else if (el === 'K2O') {
          ions['K'] = value * getOxideToElementRatio(el);
        } else {
          ions[el] = value;
        }
      });
      result = ions;
    } else {
      // TODO: refactoring & check if value is from formula type
      const ions = new MolecularFormula(this.key).fraction;
      if (ions['N']) {
        ions['NO3'] = ions['N'] * getElementToOxideRatio('N');
      }
      if (ions['P']) {
        ions['PO4'] = ions['P'] * getElementToOxideRatio('P');
      }
      if (ions['S']) {
        ions['SO4'] = ions['S'] * getElementToOxideRatio('S');
      }
      if (ions['C'] && FORMULAS[this.key]?.HCO3) {
        ions['CO3'] = ions['C'] * getElementToOxideRatio('C');
      }
      if (ions['C'] && FORMULAS[this.key]?.anion?.key === 'C6H11O7' ) {
        ions['C6H11O7'] = ions['C'] * getElementToIonRatio('C12', 'C12H22O14');
      }
      result = ions;
    }
    delete result['C'];
    delete result['N'];
    delete result['P'];
    delete result['S'];
    // TODO: save H & O as H2O
    delete result['H'];
    delete result['O'];

    if (this.dilution < 100) {
      typedEntries(result).forEach(([ion, value]) => {
        result[ion] = value * this.dilution / 100;
      });
    }
    return result;
  }

  set ions(value: Record<string, number>) {
    this._ions = value;
  }

  get ionsTotal(): number {
    return Object.keys(this.ions).length;
  }

  get text() {
    return this.isFormula ? `${this.name} - ${this.key}` : this.name;
  }

  get percent() {
    const output = [];
    Object.entries(this.ions).forEach(([ion, value]) => {
      output.push(`${ion}: ${format(value * 100)}%`);
    });
    return output.join(' ');
  }

  initDoses() {
    Object.keys(this.ions).forEach((ion) => {
      this.unitConcs[ion] = 0;
    });
  }

  toJson(): ReagentType {
    return {
      key: this.key,
      name: this.name,
      amount: this.amount,
      unitConcs: this.unitConcs,
      solubility: this.solubility,
      dilution: this.dilution,
      isLiquid: this.isLiquid,
      type: this.type,
      HCO3: this.HCO3,
      ions: this.ions,
    };
  }
}
