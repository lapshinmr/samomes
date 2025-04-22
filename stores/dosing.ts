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
    const tank = ref<TankType>();
    const doses = ref<DoseType[]>([]);

    const doseModels = computed(() => {
      return doses.value.map((dose) => {
        let fertilizer: InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>;
        if (dose.fertilizerType === 'fertilizerRecipe') {
          fertilizer = new FertilizerRecipe(dose.fertilizer as FertilizerRecipeType);
        }
        if (dose.fertilizerType === 'fertilizer') {
          fertilizer = new Fertilizer(dose.fertilizer as FertilizerType);
        }
        if (dose.fertilizerType === 'remineralRecipe') {
          fertilizer = new RemineralRecipe(dose.fertilizer as RemineralRecipeType);
        }
        return new Dose({
          fertilizer: fertilizer,
          fertilizerType: 'fertilizerRecipe',
          daysTotal: daysTotal.value,
          amountDay: dose.amountDay,
          amountWaterChange: dose.amountWaterChange,
        });
      });
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

    function setDoses(payload: InstanceType<typeof Dose>[]) {
      doses.value = payload.map((dose) => dose.toJson());
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
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDosingStore, import.meta.hot));
}
