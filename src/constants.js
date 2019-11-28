export const COMPONENTS = {
  'H': 1,
  'N': 14,
  'O': 16,
  'P': 31,
  'S': 32.1,
  'K': 39.1
}

export const FORMULAS = {
  'KNO3': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'NO3': {
        isNeeded: true,
        count: 1
      }
    },
    solubilityLimit: 242
  },
  'KH2PO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'PO4': {
        isNeeded: true,
        count: 1
      },
      'H2': {
        isNeeded: false,
        count: 1
      }
    },
    solubilityLimit: 226
  },
  'K2SO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 2
      },
      'SO4': {
        isNeeded: false,
        count: 1
      }
    },
    solubilityLimit: 111
  }
}
