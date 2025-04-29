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
import RemineralRecipe from '~/utils/models/RemineralRecipe';
import type { RemineralRecipeType } from '~/utils/types/types';

export const useRemineralsStore = defineStore(
  'reminerals',
  () => {
    const remineralRecipes = ref<RemineralRecipeType[]>([]);

    const remineralRecipeModels = computed(
      () => remineralRecipes.value.map((remineral) => new RemineralRecipe(remineral)),
    );

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
