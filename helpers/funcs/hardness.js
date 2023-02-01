import { GH, KH, KH_RATIO } from '~/helpers/constants/hardness';

export const countKh = (mass, volume) => (mass / (volume * KH.HCO3)) * (KH.HCO3 / KH.CO3) * KH_RATIO;

export const isHardness = (totalIonConcentration) => {
  let result = false;
  Object.keys(totalIonConcentration).forEach((ion) => {
    if ([...Object.keys(GH), ...Object.keys(KH)].includes(ion)) {
      result = true;
    }
  });
  return result;
};
