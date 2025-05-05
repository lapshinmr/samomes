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
    const reagents = ref<Record<string, OwnReagentType>>({});

    const isReagents = computed(() => {
      return Object.entries(reagents.value).length > 0;
    });

    const addReagent = (reagent: OwnReagentType) => {
      reagents.value[reagent.key] = reagent;
    };

    const removeReagent = (reagentKey: string) => {
      reagents.value = Object.fromEntries(
        Object.entries(reagents.value).filter(([key]) => key !== reagentKey),
      );
    };

    const editReagent = (reagent: OwnReagentType) => {
      reagents.value[reagent.key] = reagent;
    };

    function resetReagents() {
      reagents.value = {};
    }

    return {
      reagents,
      isReagents,
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
