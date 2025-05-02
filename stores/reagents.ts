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

export const useReagentsStore = defineStore(
  'reagents',
  () => {
    // TODO: переделать структуру на такую же как у всех формул и составов
    const reagents = ref<OwnReagentType[]>([]);

    const addReagent = (reagent: OwnReagentType) => {
      reagents.value.push(reagent);
    };

    const removeReagent = (index: number) => {
      reagents.value.splice(index, 1);
    };

    const editReagent = ({ index, reagent }: {
      index: number;
      reagent: OwnReagentType;
    }) => {
      reagents.value[index] = reagent;
    };

    function resetReagents() {
      reagents.value = [];
    }

    return {
      reagents,
      addReagent,
      removeReagent,
      editReagent,
      resetReagents,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecipesStore, import.meta.hot));
}
