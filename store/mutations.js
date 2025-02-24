/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
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

import Vue from 'vue';

export default {
  DRAWER_SET(state, payload) {
    state.drawer = payload;
  },
  GUIDE_CLOSE(state, dst) {
    state.guideIsClosed[dst] = true;
  },
  GUIDE_RESET(state) {
    state.guideIsClosed = {
      tanks: false,
      recipes: false,
      fertilizers: false,
      schedules: false,
    };
  },
  LANG_SET(state, payload) {
    state.lang = payload;
  },
  TANK_ADD(state, payload) {
    state.tanks.push(payload);
  },
  TANK_REMOVE(state, payload) {
    state.tanks.splice(payload, 1);
  },
  TANK_EDIT(state, payload) {
    Vue.set(state.tanks, payload.index, payload.tank);
  },
  TANK_MOVE(state, payload) {
    state.tanks = payload;
  },
  TANKS_SET(state, payload) {
    state.tanks = payload;
  },
  TANKS_REMOVE(state) {
    state.tanks = [];
  },
  RECIPE_ADD(state, payload) {
    state.recipes.push(payload);
  },
  RECIPE_REMOVE(state, payload) {
    state.recipes.splice(payload, 1);
  },
  RECIPE_EDIT(state, payload) {
    Vue.set(state.recipes, payload.index, payload.recipe);
  },
  RECIPE_MOVE(state, payload) {
    state.recipes = payload;
  },
  RECIPES_SET(state, payload) {
    state.recipes = payload;
  },
  RECIPES_REMOVE(state) {
    state.recipes = [];
  },
  FERTILIZER_ADD(state, payload) {
    state.fertilizers.push(payload);
  },
  FERTILIZER_REMOVE(state, payload) {
    state.fertilizers.splice(payload, 1);
  },
  FERTILIZER_EDIT(state, payload) {
    Vue.set(state.fertilizers, payload.index, payload.fertilizer);
  },
  FERTILIZER_MOVE(state, payload) {
    state.fertilizers = payload;
  },
  FERTILIZERS_SET(state, payload) {
    state.fertilizers = payload;
  },
  FERTILIZERS_REMOVE(state) {
    state.fertilizers = [];
  },
  REMINERAL_ADD(state, payload) {
    state.reminerals.push(payload);
  },
  REMINERAL_REMOVE(state, payload) {
    state.reminerals.splice(payload, 1);
  },
  REMINERAL_EDIT(state, payload) {
    Vue.set(state.reminerals, payload.index, payload.recipe);
  },
  REMINERAL_MOVE(state, payload) {
    state.reminerals = payload;
  },
  REMINERALS_SET(state, payload) {
    state.reminerals = payload;
  },
  REMINERALS_REMOVE(state) {
    state.reminerals = [];
  },
  SCHEDULE_SET_DEFAULT_FERTILIZERS(state, payload) {
    state.isDefaultFertilizers = payload;
  },
  SCHEDULE_ADD(state, payload) {
    state.schedules.push(payload);
  },
  SCHEDULE_EDIT(state, payload) {
    Vue.set(state.schedules, payload.index, payload.schedule);
  },
  SCHEDULE_REMOVE(state, payload) {
    state.schedules.splice(payload, 1);
  },
  SCHEDULE_COMPLETE(state, payload) {
    const schedule = state.schedules[payload.scheduleIndex];
    const status = schedule.completed[payload.recipeName][payload.dayIndex];
    schedule.completed[payload.recipeName][payload.dayIndex] = (status + 1) % 3;
    Vue.set(state.schedules, payload.scheduleIndex, schedule);
  },
  SCHEDULE_COMPLETE_WATER_CHANGE(state, payload) {
    const schedule = state.schedules[payload.scheduleIndex];
    const status = schedule.completedWaterChange[payload.recipeName];
    schedule.completedWaterChange[payload.recipeName] = (status + 1) % 2;
    Vue.set(state.schedules, payload.scheduleIndex, schedule);
  },
  SCHEDULES_SET(state, payload) {
    state.schedules = payload;
  },
  SCHEDULES_REMOVE(state) {
    state.schedules = [];
  },
  SNACKBAR_SHOW(state, payload) {
    state.snackbarMessage = payload;
    state.isSnackbar = true;
  },
  SNACKBAR_HIDE(state) {
    state.snackbarMessage = '';
    state.isSnackbar = false;
  },
};
