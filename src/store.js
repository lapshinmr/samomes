/**
 * Samomes
 *
 * Copyright (C) 2020 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Vue from 'vue'
import Vuex from 'vuex'
import { DEFAULT_LANGUAGE } from '@/constants'
import { loadLanguageAsync } from '@/plugins/i18n'

Vue.use(Vuex)

const loadState = function () {
  let stateData = JSON.parse(localStorage.getItem('udata'))
  let defaultData = {
    lang: DEFAULT_LANGUAGE,
    tanks: [],
    recipes: [],
    schedules: [],
    progress: {}
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
    ...loadState(),
    drawer: false,
    isSnackbar: false,
    snackbarMessage: ''
  },
  getters: {
    DRAWER (state) {
      return false
    }
  },
  mutations: {
    DRAWER_SET (state, payload) {
      state.drawer = payload
    },
    LANG_SET (state, payload) {
      state.lang = payload
    },
    TANK_ADD (state, payload) {
      state.tanks.push(payload)
    },
    TANK_REMOVE (state, payload) {
      state.tanks.splice(payload, 1)
    },
    TANK_EDIT (state, payload) {
      Vue.set(state.tanks, payload.index, payload.tank)
    },
    TANKS_REMOVE (state, payload) {
      state.tanks = []
    },
    RECIPE_ADD (state, payload) {
      state.recipes.push(payload)
    },
    RECIPE_REMOVE (state, payload) {
      state.recipes.splice(payload, 1)
    },
    RECIPE_EDIT (state, payload) {
      Vue.set(state.recipes, payload.index, payload.recipe)
    },
    RECIPES_REMOVE (state, payload) {
      state.recipes = []
    },
    SCHEDULE_ADD (state, payload) {
      state.schedules.push(payload)
    },
    SCHEDULE_REMOVE (state, payload) {
      state.schedules.splice(payload, 1)
    },
    SCHEDULE_COMPLETE (state, payload) {
      let schedule = state.schedules[payload.indexSchedule]
      let status = schedule.completed[payload.recipeName][payload.indexDay]
      schedule.completed[payload.recipeName][payload.indexDay] = (status + 1) % 3
      Vue.set(state.schedules, payload.indexSchedule, schedule)
    },
    SCHEDULES_REMOVE (state, payload) {
      state.schedules = []
      state.progress = {}
    },
    PROGRESS_EDIT (state, payload) {
      state.progress[payload.tankName] = payload.value
    },
    PROGRESS_REMOVE (state, payload) {
      delete state.progress[payload]
    },
    SNACKBAR_SHOW (state, payload) {
      state.snackbarMessage = payload
      state.isSnackbar = true
    },
    SNACKBAR_HIDE (state) {
      state.snackbarMessage = ''
      state.isSnackbar = false
    }
  },
  actions: {
    langSet ({ commit }, payload) {
      loadLanguageAsync(payload).then(() => {
        commit('LANG_SET', payload)
      })
    }
  }
})
