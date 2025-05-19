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
import type { RemineralizationTypes } from '~/utils/types/types';

export const useRemineralizationStore = defineStore(
  'remineralization',
  () => {
    const tank = ref<TankType>();
    const remineralizationType = ref();
    const isTests = ref<boolean>(false);
    const osmosisChangePercent = ref();
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
