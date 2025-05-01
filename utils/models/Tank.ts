import type { TankType } from '~/utils/types/types';

export default class Tank {
  public name: string;
  public volume?: number;
  public length?: number;
  public width?: number;
  public height?: number;
  public glassThickness?: number;
  public waterChangePercent?: number;
  public waterChangeVolume?: number;
  public filterVolume?: number;

  constructor(args: {
    name: string;
    volume?: number;
    length?: number;
    width?: number;
    height?: number;
    glassThickness?: number;
    waterChangePercent?: number;
    waterChangeVolume?: number;
    filterVolume?: number;
  }) {
    this.name = args.name;
    this.volume = args.volume;
    this.length = args.length;
    this.width = args.width;
    this.height = args.height;
    this.glassThickness = args.glassThickness;
    this.waterChangePercent = args.waterChangePercent;
    this.waterChangeVolume = args.waterChangeVolume;
    this.filterVolume = args.filterVolume;
  }

  get volumeSize(): number {
    let volume = 0;
    if (this.length && this.height && this.width) {
      const glassThicknessCm = this.glassThickness / 10;
      const cleanLength = this.length - 2 * glassThicknessCm;
      const cleanWidth = this.width - 2 * glassThicknessCm;
      volume = cleanLength * cleanWidth * this.height / 1000;
    }
    return volume;
  }

  get volumeTotal(): number {
    let volume = this.volume ?? 0;
    if (this.volumeSize) {
      volume = this.volumeSize;
    }
    if (this.filterVolume) {
      volume += this.filterVolume;
    }
    return volume;
  }

  toJson(): TankType {
    return {
      name: this.name,
      volume: this.volume,
      volumeTotal: this.volumeTotal,
      length: this.length,
      width: this.width,
      height: this.height,
      glassThickness: this.glassThickness,
      waterChangePercent: this.waterChangePercent,
      waterChangeVolume: this.waterChangeVolume,
      filterVolume: this.filterVolume,
    };
  }
};
