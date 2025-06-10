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

    const isFertilizers = computed(() => {
      return fertilizers.value.length > 0;
    });

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
      isFertilizers,
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
