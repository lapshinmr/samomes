import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const loadState = function () {
  let stateData = JSON.parse(localStorage.getItem('udata'))
  let defaultData = {
    tanks: []
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
    CUR_TIME_FORMATTED (state) {
      return false
    }
  },
  mutations: {
    ADD_TANK (state, payload) {
      state.tanks.push(payload)
    },
    REMOVE_TANK (state, payload) {
      state.tanks.splice(payload, 1)
    }
  },
  actions: {
  }
})
