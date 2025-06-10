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
import RemineralRecipe from '~/utils/models/RemineralRecipe';
import type { RemineralRecipeType } from '~/utils/types/types';

export const useRemineralsStore = defineStore(
  'reminerals',
  () => {
    const remineralRecipes = ref<RemineralRecipeType[]>([]);

    const remineralRecipeModels = computed(
      () => remineralRecipes.value.map((remineral) => new RemineralRecipe(remineral)),
    );

    const isReminerals = computed(() => {
      return remineralRecipes.value.length > 0;
    });

    const addRemineral = (remineral: RemineralRecipeType) => {
      remineralRecipes.value.push(remineral);
    };

    const removeRemineral = (index: number) => {
      remineralRecipes.value.splice(index, 1);
    };

    const editRemineral = ({ index, remineral }: { index: number; remineral: RemineralRecipeType }) => {
      remineralRecipes.value[index] = remineral;
    };

    const moveReminerals = (payload: RemineralRecipeType[]) => {
      remineralRecipes.value = payload;
    };

    function resetReminerals() {
      remineralRecipes.value = [];
    }

    return {
      remineralRecipes,
      remineralRecipeModels,
      isReminerals,
      addRemineral,
      removeRemineral,
      editRemineral,
      moveReminerals,
      resetReminerals,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRemineralsStore, import.meta.hot));
}
