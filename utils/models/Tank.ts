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

import type { TankType } from '~/utils/types/types';

export default class Tank {
  name: string;
  volume?: number;
  waterChangePercent?: number;
  waterChangeVolume?: number;
  filterVolume?: number;

  constructor(args: TankType) {
    this.name = args.name;
    this.volume = args.volume;
    this.waterChangePercent = args.waterChangePercent;
    this.waterChangeVolume = args.waterChangeVolume;
    this.filterVolume = args.filterVolume;
  }

  get volumeTotal(): number {
    let volume = this.volume ?? 0;
    if (this.filterVolume) {
      volume += this.filterVolume;
    }
    return volume;
  }

  static getVolumeSize(
    length: number,
    width: number,
    height: number,
    glassThickness: number,
  ): number {
    let volume = 0;
    if (length && height && width) {
      let glassThicknessCm = 0;
      if (glassThickness) {
        glassThicknessCm = glassThickness / 10;
      }
      const cleanLength = length - 2 * glassThicknessCm;
      const cleanWidth = width - 2 * glassThicknessCm;
      volume = cleanLength * cleanWidth * height / 1000;
    }
    return volume;
  }

  toJson(): TankType {
    return {
      name: this.name,
      volume: this.volume,
      volumeTotal: this.volumeTotal,
      waterChangePercent: this.waterChangePercent,
      waterChangeVolume: this.waterChangeVolume,
      filterVolume: this.filterVolume,
    };
  }
};
