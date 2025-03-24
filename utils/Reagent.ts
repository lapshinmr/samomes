import MolecularFormula from '~/utils/MolecularFormula';
import { getElementToOxideRatio } from '~/utils/funcs';

export default class Reagent {
  public key: string;
  public name: string;
  public amount: number;
  public doses?: Record<string, number>;
  public solubility?: number;
  public isLiquid?: boolean;
  public isFormula: boolean;
  public isCompound: boolean;
  public HCO3: number;
  public _ions?: Record<string, number> | object;

  constructor(args: {
    key: string;
    name: string;
    amount: number;
    doses?: Record<string, number>;
    ions?: Record<string, number>;
    solubility?: number;
    isLiquid?: boolean;
    isFormula?: boolean;
    isCompound?: boolean;
    HCO3?: number;
  }) {
    this.name = args.name;
    this.key = args.key;
    this.amount = args.amount;
    this.doses = args.doses || {};
    this.solubility = args.solubility;
    this.isLiquid = args.isLiquid || false;
    this.isFormula = args.isFormula || false;
    this.isCompound = args.isCompound || false;
    this.HCO3 = args.HCO3;
    this.ions = args.ions;
  }

  get ions(): Record<number, string> | object {
    return this._ions;
  }

  set ions(value) {
    // TODO: refactoring
    if (value) {
      this._ions = value;
    } else {
      this._ions = new MolecularFormula(this.key).fraction;
    }
    if (this._ions['N']) {
      this._ions['NO3'] = this._ions['N'] * getElementToOxideRatio('N');
    }
    if (this._ions['P']) {
      this._ions['PO4'] = this._ions['P'] * getElementToOxideRatio('P');
    }
    if (this._ions['S']) {
      this._ions['SO4'] = this._ions['S'] * getElementToOxideRatio('S');
    }
    delete this._ions['C'];
    delete this._ions['O'];
    delete this._ions['N'];
    delete this._ions['P'];
    delete this._ions['H'];
    delete this._ions['S'];

    Object.keys(this._ions).forEach((ion) => {
      this.doses[ion] = 0;
    });
  }

  get text() {
    return this.isFormula ? `${this.name} - ${this.key}` : this.name;
  }

  get percent() {
    const output = [];
    Object.entries(this.ions).forEach(([ion, value]) => {
      output.push(`${ion}: ${(value * 100).toFixed(2)}%`);
    });
    return output.join(' ');
  }

  toJson(): ReagentType {
    return {
      key: this.key,
      name: this.name,
      amount: this.amount,
      doses: this.doses,
      solubility: this.solubility,
      isLiquid: this.isLiquid,
      isFormula: this.isFormula,
      isCompound: this.isCompound,
      HCO3: this.HCO3,
      ions: this.ions,
    };
  }
}
