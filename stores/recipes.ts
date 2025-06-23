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

export const useRecipesStore = defineStore(
  'recipes',
  () => {
    const fertilizerRecipes = ref<FertilizerRecipeType[]>([]);
    const isUpdated = ref<boolean>(false);

    const fertilizerRecipeModels = computed(
      () => fertilizerRecipes.value.map((recipe) => new FertilizerRecipe(recipe)),
    );

    const isFertilizerRecipes = computed(() => {
      return fertilizerRecipes.value.length > 0;
    });

    // TODO: transform to functions
    const addRecipe = (recipe: FertilizerRecipeType) => {
      fertilizerRecipes.value.push(recipe);
    };

    const removeRecipe = (index: number) => {
      fertilizerRecipes.value.splice(index, 1);
    };

    // TODO: change arguments
    const editRecipe = ({ index, recipe }: { index: number; recipe: FertilizerRecipeType }) => {
      fertilizerRecipes.value[index] = recipe;
    };

    const moveRecipes = (payload: FertilizerRecipeType[]) => {
      fertilizerRecipes.value = payload;
    };

    function resetRecipes() {
      fertilizerRecipes.value = [];
    }

    function setUpdated(payload: boolean) {
      isUpdated.value = payload;
    }


    return {
      fertilizerRecipes,
      fertilizerRecipeModels,
      isFertilizerRecipes,
      isUpdated,
      addRecipe,
      removeRecipe,
      editRecipe,
      moveRecipes,
      resetRecipes,
      setUpdated,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecipesStore, import.meta.hot));
}
