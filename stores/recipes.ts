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
import Recipe from '~/utils/models/Recipe';
import type { RecipeType } from '~/utils/types/types';

export const useRecipesStore = defineStore(
  'recipes',
  () => {
    const recipes = ref([]);

    const recipeInstances = computed(
      () => recipes.value.map((recipe) => new Recipe(recipe)),
    );

    // console.log(recipes.value);

    const addRecipe = (recipe: RecipeType) => {
      recipes.value.push(recipe);
    };

    const removeRecipe = (index: number) => {
      recipes.value.splice(index, 1);
    };

    const editRecipe = ({ index, recipe }: { index: number; recipe: RecipeType }) => {
      recipes.value[index] = recipe;
    };

    const moveRecipes = (payload: Recipe[]) => {
      recipes.value = payload;
    };

    return {
      recipes,
      recipeInstances,
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
