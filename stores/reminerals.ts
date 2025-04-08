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
import Remineral from '~/utils/models/Remineral';
import type { RemineralType } from '~/utils/types/types';

export const useRemineralsStore = defineStore(
  'reminerals',
  () => {
    const reminerals = ref<RemineralType[]>([]);

    // TODO: rename to remineralModels
    const remineralInstances = computed(
      () => reminerals.value.map((remineral) => new Remineral(remineral)),
    );

    const addRemineral = (remineral: RemineralType) => {
      reminerals.value.push(remineral);
    };

    const removeRemineral = (index: number) => {
      reminerals.value.splice(index, 1);
    };

    const editRemineral = ({ index, remineral }: { index: number; remineral: RemineralType }) => {
      reminerals.value[index] = remineral;
    };

    const moveReminerals = (payload: RemineralType[]) => {
      reminerals.value = payload;
    };

    return {
      reminerals,
      remineralInstances,
      addRemineral,
      removeRemineral,
      editRemineral,
      moveReminerals,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRemineralsStore, import.meta.hot));
}
