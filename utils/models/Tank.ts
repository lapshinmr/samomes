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
  public soilVolume?: number;

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
    soilVolume?: number;
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
    this.soilVolume = args.soilVolume;
  }

  countVolume(): number {
    let volume = 0;
    if (this.length && this.height && this.width) {
      const glassThicknessCm = this.glassThickness / 10;
      const cleanLength = this.length - 2 * glassThicknessCm;
      const cleanWidth = this.width - 2 * glassThicknessCm;
      volume += cleanLength * cleanWidth * this.height / 1000;
    }
    if (this.soilVolume) {
      volume += this.soilVolume;
    }
    if (this.filterVolume) {
      volume += this.filterVolume;
    }
    return +format(volume, 3);
  }

  toJson(): TankType {
    return {
      name: this.name,
      volume: this.volume,
      length: this.length,
      width: this.width,
      height: this.height,
      glassThickness: this.glassThickness,
      waterChangePercent: this.waterChangePercent,
      waterChangeVolume: this.waterChangeVolume,
      filterVolume: this.filterVolume,
      soilVolume: this.soilVolume,
    };
  }
};
