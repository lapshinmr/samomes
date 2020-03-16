export const COMPONENTS = {
  'H': 1,
  'C': 12,
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
      'N': {
        isNeeded: true,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 3
      }
    },
    solubilityLimit: 242,
    name: 'Калиевая селитра'
  },
  'KH2PO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'P': {
        isNeeded: true,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 4
      },
      'H': {
        isNeeded: false,
        count: 2
      }
    },
    solubilityLimit: 226,
    name: 'Монофосфат калия'
  },
  'K2SO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 2
      },
      'S': {
        isNeeded: false,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 4
      }
    },
    solubilityLimit: 111,
    name: 'Сернокислый калий'
  },
  'N2H4CO': {
    ions: {
      'N': {
        isNeeded: true,
        count: 2
      },
      'H': {
        isNeeded: false,
        count: 4
      },
      'C': {
        isNeeded: false,
        count: 1
      },
      'O': {
        isNeeded: false,
        count: 1
      }
    },
    solubilityLimit: 108,
    name: 'Карбамид (мочевина)'
  },
  'NH4NO3': {
    ions: {
      'N': {
        isNeeded: true,
        count: 2
      },
      'H': {
        isNeeded: false,
        count: 4
      },
      'O': {
        isNeeded: false,
        count: 3
      }
    },
    solubilityLimit: 190,
    name: 'Нитрат аммония'
  }
}
