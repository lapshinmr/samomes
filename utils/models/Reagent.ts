import MolecularFormula from '~/utils/models/MolecularFormula';
import { getElementToOxideRatio } from '~/utils/funcs';

export default class Reagent {
  public key: string;
  public name: string;
  public amount: number;
  public type: ReagentTypeName;
  // TODO: add more specific keys for ions
  public unitConcs?: Record<string, number>;
  public solubility?: number;
  public isLiquid?: boolean;
  public HCO3: number;
  private _ions?: Record<string, number>;

  constructor(args: {
    key: string;
    name: string;
    amount: number;
    type: ReagentTypeName;
    unitConcs?: Record<string, number>;
    ions?: Record<string, number>;
    solubility?: number;
    isLiquid?: boolean;
    HCO3?: number;
  }) {
    // TODO: check default values
    this.key = args.key;
    this.name = args.name;
    this.amount = args.amount;
    this.type = args.type;
    this.unitConcs = args.unitConcs || {};
    this.solubility = args.solubility;
    this.isLiquid = args.isLiquid ?? false;
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

  get ions(): Record<string, number> {
    if (this.isCompound) {
      return this._ions;
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
      if (ions['C'] && FORMULAS[this.key].HCO3) {
        ions['CO3'] = ions['C'] * getElementToOxideRatio('C');
      }
      delete ions['C'];
      delete ions['O'];
      delete ions['N'];
      delete ions['P'];
      delete ions['H'];
      delete ions['S'];

      return ions;
    }
  }

  set ions(value: Record<string, number>) {
    this._ions = value;
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
      isLiquid: this.isLiquid,
      type: this.type,
      HCO3: this.HCO3,
      ions: this.ions,
    };
  }
}
