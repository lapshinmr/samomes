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

import { GH, KH, KH_RATIO } from '~/helpers/constants/hardness';

export const isHardness = (totalIonConcentration) => {
  let result = false;
  Object.keys(totalIonConcentration).forEach((ion) => {
    if ([...Object.keys(GH), ...Object.keys(KH)].includes(ion)) {
      result = true;
    }
  });
  return result;
};

export const countGh = (concentration, mass, volume) => {
  let gh = 0;
  if ('Ca' in concentration) {
    gh += (concentration.Ca * mass) / (GH.Ca * volume);
  }
  if ('Mg' in concentration) {
    gh += (concentration.Mg * mass) / (GH.Mg * volume);
  }
  gh *= 1000;
  return gh;
};

export const countKh = (concentration, mass, volume) => {
  let kh = 0;
  if ('CO3' in concentration) {
    kh += (concentration.CO3 / (volume * KH.HCO3)) * (KH.HCO3 / KH.CO3) * KH_RATIO * mass;
    kh *= 1000;
  }
  return kh;
};
