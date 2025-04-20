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
import type { IonType } from '~/utils/types/types';

export default class Fertilizer {
  public name: string;
  public description?: string;
  public ions: Partial<Record<IonType, number>>;
  public isPercent: boolean;
  public updatedAt?: string;

  constructor(args: {
    name: string;
    description?: string;
    ions: Partial<Record<IonType, number>>;
    isPercent: boolean;
    updatedAt?: string;
  }) {
    this.name = args.name;
    this.description = args.description;
    this.ions = args.ions;
    this.isPercent = args.isPercent;
    this.updatedAt = args.updatedAt;
  }

  get concentration(): Partial<Record<IonType, number>> {
    const result = {};
    Object.entries(this.ions).forEach(([el, value]) => {
      if (!value) {
        return;
      }
      if (this.isPercent) {
        value *= 10;
      }
      if (el === 'N') {
        result['NO3'] = format(value * getElementToOxideRatio(el));
      } else if (el === 'P') {
        result['PO4'] = format(value * getElementToOxideRatio(el));
      } else if (el === 'S') {
        result['SO4'] = format(value * getElementToOxideRatio(el));
      } else if (el === 'Mg') {
        result['Mg'] = format(value * getOxideToElementRatio(el));
      } else if (el === 'Ca') {
        result['Ca'] = format(value * getOxideToElementRatio(el));
      } else if (el === 'P2O5') {
        result['PO4'] = format(value * getOxideToElementRatio(el) * getElementToOxideRatio('P'));
      } else if (el === 'K2O') {
        result['K'] = format(value * getOxideToElementRatio(el));
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
      updatedAt: this.updatedAt,
    };
  }
}
