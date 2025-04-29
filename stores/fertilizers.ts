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

import { defineStore, acceptHMRUpdate } from 'pinia';
import Fertilizer from '~/utils/models/Fertilizer';
import type { FertilizerType } from '~/utils/types/types';

export const useFertilizersStore = defineStore(
  'fertilizers',
  () => {
    const fertilizers = ref<FertilizerType[]>([]);

    const fertilizerModels = computed(
      () => fertilizers.value.map((fertilizer) => new Fertilizer(fertilizer)),
    );

    const addFertilizer = (fertilizer: FertilizerType) => {
      fertilizers.value.push(fertilizer);
    };

    const removeFertilizer = (index: number) => {
      fertilizers.value.splice(index, 1);
    };

    const editFertilizer = ({ index, fertilizer }: { index: number; fertilizer: FertilizerType }) => {
      fertilizers.value[index] = fertilizer;
    };

    const moveFertilizers = (payload: FertilizerType[]) => {
      fertilizers.value = payload;
    };

    function resetFertilizers() {
      fertilizers.value = [];
    }

    return {
      fertilizers,
      fertilizerModels,
      addFertilizer,
      removeFertilizer,
      editFertilizer,
      moveFertilizers,
      resetFertilizers,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFertilizersStore, import.meta.hot));
}
