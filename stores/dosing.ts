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

export const useDosingStore = defineStore(
  'dosing',
  () => {
    const isDefaultFertilizers = ref<boolean>(false);
    const isTotalMode = ref<boolean>(false);
    const isHardness = ref<boolean>(false);
    const fertilizersRegime = ref<FertilizersRegime>(FertilizersRegime.EVERY_DAY);
    const daysTotal = ref<number>(7);
    const tank = ref<TankType>();
    const doses = ref<DoseType[]>([]);

    const doseModels = computed(() => {
      return doses.value.map((dose) => new Dose({
        fertilizer: dose.fertilizer,
        fertilizerType: dose.fertilizerType,
        daysTotal: daysTotal.value,
        amountDay: dose.amountDay,
        amountWaterChange: dose.amountWaterChange,
      }));
    });

    function setTank(payload: TankType) {
      tank.value = payload;
    }

    function setWaterChangeVolume(payload: number) {
      tank.value.waterChangeVolume = payload;
    }

    function setDefaultFertilizers(value: boolean) {
      isDefaultFertilizers.value = value;
    }

    function setTotalMode(value: boolean) {
      isTotalMode.value = value;
    }

    function setDaysTotal(value: number) {
      daysTotal.value = value;
      doses.value.forEach((dose) => dose.daysTotal = value);
    }

    function setHardness(value: boolean) {
      isHardness.value = value;
    }

    function setFertilizersRegime(value: FertilizersRegime) {
      fertilizersRegime.value = value;
    }

    function setDoses(value: DoseType[]) {
      doses.value = value;
    }

    function updateAmountDay(value: number, index: number) {
      doses.value[index].amountDay = value;
    }

    function updateAmount(value: number, index: number) {
      doses.value[index].amountDay = value / daysTotal.value;
    }

    function updateAmountWaterChange(value: number, index: number) {
      doses.value[index].amountWaterChange = value;
    }

    function resetDosing() {
      fertilizersRegime.value = FertilizersRegime.EVERY_DAY;
      daysTotal.value = 7;
      tank.value = null;
      doses.value = [];
    }

    return {
      tank,
      isDefaultFertilizers,
      isTotalMode,
      isHardness,
      fertilizersRegime,
      daysTotal,
      doses,
      doseModels,
      setTank,
      setWaterChangeVolume,
      setDefaultFertilizers,
      setTotalMode,
      setDaysTotal,
      setHardness,
      setFertilizersRegime,
      setDoses,
      updateAmount,
      updateAmountDay,
      updateAmountWaterChange,
      resetDosing,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDosingStore, import.meta.hot));
}
