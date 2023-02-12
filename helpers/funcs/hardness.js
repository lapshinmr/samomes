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
