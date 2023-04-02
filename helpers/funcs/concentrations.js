import FORMULAS from '~/helpers/constants/formulas';
import ELEMENTS from '~/helpers/constants/elements';

export const countMolarMass = (reagentName) => {
  let molarMass = 0;
  const { ions } = FORMULAS[reagentName];
  Object.entries(ions).forEach(([ion, value]) => {
    molarMass += ELEMENTS[ion] * value.count;
  });
  return molarMass;
};

export const countIonPercent = (reagentName) => {
  const molarMass = countMolarMass(reagentName);
  const result = {};
  const { ions } = FORMULAS[reagentName];
  Object.entries(ions).forEach(([ion, value]) => {
    if (value.isNeeded) {
      result[ion] = (ELEMENTS[ion] * value.count) / molarMass;
    }
  });
  return result;
};

export const countTotalReagentsMass = (reagentsMassObject) => {
  if (Object.values(reagentsMassObject).length === 0) {
    return 0;
  }
  return Object.values(reagentsMassObject).reduce((sum, value) => sum + +value);
};

export const countDryIonConcentrationPerReagent = (reagentsMassObject) => {
  const result = {};
  const totalReagentsMass = countTotalReagentsMass(reagentsMassObject);
  if (Object.keys(reagentsMassObject).length === 0 || !totalReagentsMass) {
    return result;
  }
  Object.entries(reagentsMassObject).forEach(([reagentName, mass]) => {
    result[reagentName] = {};
    const { ions, HCO3 } = FORMULAS[reagentName];
    Object.entries(ions).forEach(([ion, data]) => {
      if (data.isNeeded) {
        let factor = 1 / totalReagentsMass;
        if (ion === 'CO3' && HCO3) {
          factor *= HCO3;
        }
        result[reagentName][ion] = mass * countIonPercent(reagentName)[ion] * factor;
      }
    });
  });
  return result;
};

export const countDryIonConcentrationPerIon = (reagentsMassObject) => {
  const result = {};
  const totalReagentsMass = countTotalReagentsMass(reagentsMassObject);
  if (Object.keys(reagentsMassObject).length === 0 || !totalReagentsMass) {
    return result;
  }
  Object.entries(reagentsMassObject).forEach(([reagentName, mass]) => {
    const { ions, HCO3 } = FORMULAS[reagentName];
    Object.entries(ions).forEach(([ion, data]) => {
      if (data.isNeeded) {
        if (result[ion] === undefined) {
          result[ion] = 0;
        }
        let factor = 1 / totalReagentsMass;
        if (ion === 'CO3' && HCO3) {
          factor *= HCO3;
        }
        result[ion] += mass * countIonPercent(reagentName)[ion] * factor;
      }
    });
  });
  return result;
};

export class Substance {
  setReagentsMassObject(value) {
    this.reagentsMassObject = value;
  }

  setVolume(value) {
    this.volume = value;
  }

  get totalReagentsMass() {
    if (Object.values(this.reagentsMassObject).length === 0) {
      return 0;
    }
    return Object.values(this.reagentsMassObject).reduce((sum, value) => sum + +value);
  }

  get concentrationPerIon() {
    const result = {};
    if (Object.keys(this.reagentsMassObject).length === 0 || !this.totalReagentsMass) {
      return result;
    }
    Object.entries(this.reagentsMassObject).forEach(([reagentName, mass]) => {
      const { ions, HCO3 } = FORMULAS[reagentName];
      Object.entries(ions).forEach(([ion, data]) => {
        if (data.isNeeded) {
          if (result[ion] === undefined) {
            result[ion] = 0;
          }
          let factor = 1 / this.totalReagentsMass;
          if (ion === 'CO3' && HCO3) {
            factor *= HCO3;
          }
          result[ion] += mass * countIonPercent(reagentName)[ion] * factor;
        }
      });
    });
    return result;
  }
}
