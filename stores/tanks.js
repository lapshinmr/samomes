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

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTanksStore = defineStore('tanks', () => {
  const tanks = ref([]);
  
  function addTank(tank) {
    tanks.value.push(tank);
  }
  
  function removeTank(index) {
    tanks.value.splice(index, 1);
  }
  
  function editTank(payload) {
    tanks.value[payload.index] = payload.tank;
  }
  
  function moveTanks(newTanks) {
    tanks.value = newTanks;
  }
  
  function setTanks(newTanks) {
    tanks.value = newTanks;
  }
  
  function removeTanks() {
    tanks.value = [];
  }
  
  return {
    tanks,
    addTank,
    removeTank,
    editTank,
    moveTanks,
    setTanks,
    removeTanks
  };
});