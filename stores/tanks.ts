/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
 */

import { acceptHMRUpdate, defineStore } from 'pinia';

export const useTanksStore = defineStore(
  'tanks',
  () => {
    const tanks = ref<TankType[]>([]);

    const tankModels = computed(() => {
      return tanks.value.map((tank) => new Tank(tank));
    });

    const isTanks = computed(() => {
      return tanks.value.length > 0;
    });

    function addTank(payload: TankType) {
      tanks.value.push(payload);
    }

    function removeTank(index: number) {
      tanks.value.splice(index, 1);
    }

    function editTank(payload: { tank: TankType; index: number }) {
      tanks.value[payload.index] = payload.tank;
    }

    function moveTanks(payload: TankType[]) {
      tanks.value = payload;
    }

    function resetTanks() {
      tanks.value = [];
    }

    return {
      tanks,
      tankModels,
      isTanks,
      addTank,
      removeTank,
      editTank,
      moveTanks,
      resetTanks,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTanksStore, import.meta.hot));
}
