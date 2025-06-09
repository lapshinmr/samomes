/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
 */

import { getElementToOxideRatio, getOxideToElementRatio } from '~/utils/funcs';

// TODO: try this and delete
// function Logger(target, ctx) {
//   console.log('Logger', target, ctx);
// }
//
// @Logger
export default class Fertilizer {
  name: string;
  description?: string;
  ions: IonsType;
  isPercent: boolean;
  updatedAt?: string;
  isLiquid = true;
  hardness?: {
    gh: number;
    kh: number;
    amount: number;
    volume: number;
  };

  constructor(args: FertilizerType) {
    this.name = args.name;
    this.description = args.description;
    this.ions = args.ions;
    this.isLiquid = args.isLiquid;
    this.isPercent = args.isPercent;
    this.updatedAt = args.updatedAt;
    this.hardness = { ...args.hardness };
  }

  get concentration(): IonsType {
    const result = {};
    Object.entries(this.ions).forEach(([el, value]) => {
      if (!value) {
        return;
      }
      if (this.isLiquid && this.isPercent) {
        value *= 10;
      } else if (!this.isLiquid && this.isPercent) {
        value /= 100;
      }
      if (el === 'N') {
        result['NO3'] = value * getElementToOxideRatio(el);
      } else if (el === 'P') {
        result['PO4'] = value * getElementToOxideRatio(el);
      } else if (el === 'S') {
        result['SO4'] = value * getElementToOxideRatio(el);
      } else if (el === 'MgO') {
        result['Mg'] = value * getOxideToElementRatio(el);
      } else if (el === 'CaO') {
        result['Ca'] = value * getOxideToElementRatio(el);
      } else if (el === 'P2O5') {
        result['PO4'] = value * getOxideToElementRatio(el) * getElementToOxideRatio('P');
      } else if (el === 'K2O') {
        result['K'] = value * getOxideToElementRatio(el);
      } else {
        result[el] = value;
      }
    });
    return result;
  }

  toJson(): FertilizerType {
    return {
      name: this.name,
      description: this.description,
      ions: this.ions,
      isPercent: this.isPercent,
      isLiquid: this.isLiquid,
      updatedAt: this.updatedAt,
      hardness: this.hardness,
    };
  }
}
