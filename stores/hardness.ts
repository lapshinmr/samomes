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
import type { RemineralizationTypes } from '~/utils/types/types';

export const useHardnessStore = defineStore(
  'hardness',
  () => {
    const tank = ref<TankType>();
    const remineralizationType = ref(null);
    const isTests = ref<boolean>(false);
    const osmosisChangePercent = ref(100);
    const isDefaultFertilizers = ref<boolean>(false);
    const doses = ref<DoseType[]>([]);

    const doseModels = computed(() => {
      return doses.value.map((dose) => new Dose({
        fertilizer: dose.fertilizer,
        fertilizerType: dose.fertilizerType,
        daysTotal: 1,
        amountDay: dose.amountDay,
        amountWaterChange: dose.amountWaterChange,
      }));
    });

    const osmosisChangeVolume = computed(() => {
      const decimalToPercent = 100;
      return tank.value.volume
        * (tank.value.waterChangePercent / decimalToPercent)
        * (osmosisChangePercent.value / decimalToPercent);
    });

    function setTank(payload: TankType) {
      tank.value = payload;
    }

    function setRemineralizationType(payload: RemineralizationTypes) {
      remineralizationType.value = payload;
    }

    function setIsTests(payload: boolean) {
      isTests.value = payload;
    }

    function setWaterChangeVolume(payload: number) {
      tank.value.waterChangeVolume = payload;
    }

    function setWaterChangePercent(payload: number) {
      tank.value.waterChangePercent = payload;
    }

    function setOsmosisChangePercent(payload: number) {
      osmosisChangePercent.value = payload;
    }

    function setDefaultFertilizers(value: boolean) {
      isDefaultFertilizers.value = value;
    }

    function setDoses(payload: InstanceType<typeof Dose>[]) {
      doses.value = payload.map((dose) => dose.toJson());
    }

    function updateAmountDay(value: number, index: number) {
      doses.value[index].amountDay = value;
    }

    return {
      tank,
      remineralizationType,
      isTests,
      osmosisChangePercent,
      osmosisChangeVolume,
      isDefaultFertilizers,
      doses,
      doseModels,
      setTank,
      setRemineralizationType,
      setIsTests,
      setWaterChangeVolume,
      setWaterChangePercent,
      setOsmosisChangePercent,
      setDefaultFertilizers,
      setDoses,
      updateAmountDay,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDosingStore, import.meta.hot));
}
