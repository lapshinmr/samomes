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

export const RECIPE_EXAMPLES = [
  {
    type: 'самомес',
    name: 'Prestige NPK самомес',
    reagents: {
      KNO3: 19.31,
      KH2PO4: 1.65
    },
    note: 'Это аналог удобрения, который был получен на основе состава элементов, заявленных производителем.'
  },
  {
    type: 'самомес',
    name: 'Aquayer NPK самомес',
    reagents: {
      KNO3: 12.225,
      KH2PO4: 1.32,
      N2H4CO: 0.516,
      NH4NO3: 0.337
    },
    note: 'Это аналог удобрения, который был получен на основе состава элементов, заявленных производителем.'
  },
  {
    type: 'самомес',
    name: 'Aquabalance NPK самомес',
    reagents: {
      KNO3: 8.174,
      KH2PO4: 1.61,
      N2H4CO: 2,
      NH4NO3: 1.6
    },
    note: 'Это аналог удобрения, который был получен на основе состава элементов, заявленных производителем.'
  },
  {
    type: 'готовое',
    name: 'Prestige NPK',
    isPercent: false,
    elements: {
      N: 10.7,
      K: 32.0,
      P: 1.5
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquayer NPK',
    isPercent: false,
    elements: {
      N: 8.21,
      P: 1.20,
      K: 20.43
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  },
  {
    type: 'готовое',
    name: 'Aquabalance NPK',
    isPercent: true,
    elements: {
      NO3: 4.65,
      PO4: 0.45,
      K: 1.45
    },
    note: 'Это заводское удобрение. Все данные взяты с этикетки.'
  }
]
