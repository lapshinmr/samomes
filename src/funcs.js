import { COMPONENTS } from './constants.js'

export const countTotalConcentration = (concentration) => {
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

export const countTotalDose = (solute) => {
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
