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
import FertilizerRecipe from '~/utils/models/FertilizerRecipe';
import type { FertilizerRecipeType } from '~/utils/types/types';

export const useRecipesStore = defineStore(
  'recipes',
  () => {
    const fertilizerRecipes = ref<FertilizerRecipeType[]>([]);

    const fertilizerRecipeModels = computed(
      () => fertilizerRecipes.value.map((recipe) => new FertilizerRecipe(recipe)),
    );

    const addRecipe = (recipe: FertilizerRecipeType) => {
      fertilizerRecipes.value.push(recipe);
    };

    const removeRecipe = (index: number) => {
      fertilizerRecipes.value.splice(index, 1);
    };

    const editRecipe = ({ index, recipe }: { index: number; recipe: FertilizerRecipeType }) => {
      fertilizerRecipes.value[index] = recipe;
    };

    const moveRecipes = (payload: FertilizerRecipeType[]) => {
      fertilizerRecipes.value = payload;
    };

    return {
      fertilizerRecipes,
      fertilizerRecipeModels,
      addRecipe,
      removeRecipe,
      editRecipe,
      moveRecipes,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecipesStore, import.meta.hot));
}
