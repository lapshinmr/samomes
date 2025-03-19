import MolecularFormula from "~/utils/molecular-formula";

export default class Reagent {
  public key: string;
  public description: string;
  public solubility?: number;
  public amount: number;
  public liquid?: boolean;
	constructor(args: {
    key: string;
    description: string;
    amount: number;
    solubility?: number;
    liquid?: boolean;
  }) {
		this.description = args.description;
    this.key = args.key;
    this.solubility = args.solubility;
    this.amount = args.amount;
    this.liquid = args.liquid;
	}

  get ions() {
    return new MolecularFormula(this.key).composition;
  }

  get mass() {
    return new MolecularFormula(this.key).mass;
  }
}
