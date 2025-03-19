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

import { defineStore } from 'pinia';
import { useSnackbarStore } from './snackbar';

export const useRecipesStore = defineStore('recipes', {
  persist: true,
  state: () => ({
    recipes: [],
    fertilizers: [],
  }),

  actions: {
    addRecipe(recipe) {
      this.recipes.push(recipe);
    },

    removeRecipe(index) {
      this.recipes.splice(index, 1);
    },

    editRecipe({ index, recipe }) {
      this.recipes[index] = recipe;
    },

    moveRecipes(recipes) {
      this.recipes = recipes;
    },

    showSnackbar(message) {
      const snackbarStore = useSnackbarStore();
      snackbarStore.show(message);
    }
  },
});
