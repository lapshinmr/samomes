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

import { acceptHMRUpdate, defineStore } from 'pinia';

export const useDosingStore = defineStore(
  'dosing',
  () => {
    // const tanks = ref([]);
    const isDefaultFertilizers = ref<boolean>(false);
    const isTotalMode = ref<boolean>(false);
    const isHardness = ref<boolean>(false);
    const fertilizersRegime = ref<FertilizersRegime>(FertilizersRegime.EVERY_DAY);
    const daysTotal = ref<number>(7);

    // function addTank(payload: TankType) {
    //   tanks.value.push(payload);
    // }
    //
    // function removeTank(index: number) {
    //   tanks.value.splice(index, 1);
    // }
    //
    // function editTank(payload: { tank: TankType; index: number }) {
    //   tanks.value[payload.index] = payload.tank;
    // }
    //
    // function moveTanks(payload: TankType[]) {
    //   tanks.value = payload;
    // }

    function setDefaultFertilizers(value: boolean) {
      isDefaultFertilizers.value = value;
    }

    function setTotalMode(value: boolean) {
      isTotalMode.value = value;
    }

    function setHardness(value: boolean) {
      isHardness.value = value;
    }

    function setFertilizersRegime(value: FertilizersRegime) {
      fertilizersRegime.value = value;
    }

    return {
      isDefaultFertilizers,
      isTotalMode,
      isHardness,
      fertilizersRegime,
      daysTotal,
      setDefaultFertilizers,
      setTotalMode,
      setHardness,
      setFertilizersRegime,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDosingStore, import.meta.hot));
}
