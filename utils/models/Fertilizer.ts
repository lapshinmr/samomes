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

import { getOxideToElementRatio } from '~/utils/funcs';
import type { FertilizerType } from '~/utils/types/types';

export default class Fertilizer {
  public name: string;
  public note: string;
  public elements: Record<string, number | null>;
  public isPercent: boolean;
  public updatedAt?: string;

  constructor(args: FertilizerType) {
    this.name = args.name || 'Удобрение';
    this.note = args.note || '';
    this.elements = args.elements || {};
    this.isPercent = args.isPercent || false;
    this.updatedAt = args.updatedAt;
  }

  get concentration(): Record<string, Record<string, number>> {
    const result: Record<string, Record<string, number>> = {};
    result[this.name] = {};
    
    Object.entries(this.elements).forEach(([el, value]) => {
      if (value === null) return;
      
      const convertRatio = this.isPercent ? 10 : 1;
      
      if (['NO3', 'PO4', 'MgO', 'CaO'].includes(el)) {
        result[this.name][el.replace('O3', '').replace('O4', '').replace('O', '')] = 
          getOxideToElementRatio(el) * value * convertRatio;
      } else if (el === 'P2O5') {
        result[this.name].P = getOxideToElementRatio(el) * value * convertRatio;
      } else if (el === 'K2O') {
        result[this.name].K = getOxideToElementRatio(el) * value * convertRatio;
      } else {
        result[this.name][el] = value * convertRatio;
      }
    });
    
    return result;
  }

  toJson(): FertilizerType {
    return {
      name: this.name,
      note: this.note,
      elements: { ...this.elements },
      isPercent: this.isPercent,
      updatedAt: this.updatedAt,
      concentration: this.concentration,
    };
  }
}