import { COMPONENTS } from './constants.js'

export const countTotalIonConcentration = (concentration) => {
  let total = {}
  for (let reagent in concentration) {
    for (let ion in concentration[reagent]) {
      if (total[ion] === undefined) {
        total[ion] = 0
      }
      total[ion] += concentration[reagent][ion]
    }
  }
  return total
}

export const countTotalConcentration = (concentration) => {
  let total = 0
  let totalIonConcentration = countTotalIonConcentration(concentration)
  for (let ion in totalIonConcentration) {
    total += convertIonRatio(ion) * totalIonConcentration[ion]
  }
  return total
}

export const isConcentration = (concentration) => {
  let result = false
  for (let reagent in concentration) {
    for (let ion in concentration[reagent]) {
      if (concentration[reagent][ion]) {
        result = true
      }
    }
  }
  return result
}

export const countTotalIonDose = (solute) => {
  let total = {}
  for (let reagent in solute) {
    for (let ion in solute[reagent]) {
      if (total[ion] === undefined) {
        total[ion] = 0
      }
      total[ion] += solute[reagent][ion]
    }
  }
  return total
}

export const countTotalDose = (solute) => {
  let total = 0
  let totalIonSolute = countTotalIonDose(solute)
  for (let ion in totalIonSolute) {
    total += totalIonSolute[ion]
  }
  return total
}

export const countMass = (reagent) => {
  let mass = 0
  let lastElement
  for (let el of reagent) {
    mass += !isNaN(el)
      ? COMPONENTS[lastElement] * (parseInt(el) - 1)
      : COMPONENTS[el]
    lastElement = el
  }
  return mass
}

export const convertIonName = (ion) => {
  let ions = {
    'N': 'NO3',
    'NO3': 'N',
    'P': 'PO4',
    'PO4': 'P'
  }
  return ion in ions ? ions[ion] : ion
}

export const convertIonRatio = (ion) => {
  return countMass(convertIonName(ion)) / countMass(ion)
}
