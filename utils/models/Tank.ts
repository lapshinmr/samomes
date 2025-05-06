import type { TankType } from '~/utils/types/types';

export default class Tank {
  public name: string;
  public volume?: number;
  public waterChangePercent?: number;
  public waterChangeVolume?: number;
  public filterVolume?: number;

  constructor(args: {
    name: string;
    volume?: number;
    waterChangePercent?: number;
    waterChangeVolume?: number;
    filterVolume?: number;
  }) {
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
