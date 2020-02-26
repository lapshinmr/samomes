import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const loadState = function () {
  let stateData = JSON.parse(localStorage.getItem('udata'))
  let defaultData = {
    tanks: [],
    recipes: []
  }
  if (!stateData) {
    localStorage.setItem('udata', JSON.stringify(defaultData))
    stateData = Object.assign({}, defaultData)
  } else {
    let found = false
    for (let key in defaultData) {
      if (!(key in stateData)) {
        found = true
        stateData[key] = defaultData[key]
      }
      if (found) {
        localStorage.setItem('udata', JSON.stringify(stateData))
      }
    }
  }
  return stateData
}

const updateLocalStorage = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('udata', JSON.stringify(state))
  })
}

export default new Vuex.Store({
  plugins: [updateLocalStorage],
  state: {
    ...loadState()
  },
  getters: {
    DUMMY (state) {
      return false
    }
  },
  mutations: {
    TANK_ADD (state, payload) {
      state.tanks.push(payload)
    },
    TANK_REMOVE (state, payload) {
      state.tanks.splice(payload, 1)
    },
    TANK_EDIT (state, payload) {
      Vue.set(state.tanks, payload.index, payload.tank)
    },
    RECIPE_ADD (state, payload) {
      state.recipes.push(payload)
    },
    RECIPE_REMOVE (state, payload) {
      state.recipes.splice(payload, 1)
    }
  },
  actions: {
  }
})
