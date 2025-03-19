import type Reagent from "~/utils/Reagent";
import type { Compound } from "~/utils/types/types";

export default class Recipe {
  public name: string;
  public description?: string;
  public reagents?: Reagent[];
  public compounds?: Compound[];
  public waterVolume?: number | null;
  public tankVolume?: number | null;

  constructor(args: {
    name: string;
    description?: string;
    reagents?: Reagent[];
    compounds?: Compound[];
    waterVolume?: number | null;
    tankVolume?: number | null;
  }) {
    this.name = args.name;
    this.description = args.description;
    this.reagents = args.reagents;
    this.compounds = args.compounds;
    this.waterVolume = args.waterVolume;
    this.tankVolume = args.tankVolume;
  }

}
