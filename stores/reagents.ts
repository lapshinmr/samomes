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

export const useReagentsStore = defineStore(
  'reagents',
  () => {
    const reagents = ref<Record<string, OwnReagentType>>({});

    const isReagents = computed(() => {
      return Object.entries(reagents.value).length > 0;
    });

    const reagentsTotal = computed(() => {
      return Object.entries(reagents.value).length;
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
      reagentsTotal,
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
