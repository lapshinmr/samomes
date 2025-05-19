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
