<!--
  Samomes

  Copyright (C) 2023 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div>
    <div class="d-flex justify-space-between body-2">
      <div>
        Параметры
      </div>
      <div>
        <span class="">
          <span>Gg</span>
          <span>{{ recipe.gh.toFixed(1) }}</span>
        </span>
        <span class="ml-2">
          <span>Kh</span>
          <span>{{ recipe.kh.toFixed(1) }}</span>
        </span>
      </div>
    </div>
    <v-divider class="my-3" />
    <div
      v-for="(mass, reagent) in recipe.reagentsMassObject"
      :key="reagent"
      class="d-flex justify-space-between body-2"
    >
      <span>
        {{ FORMULAS[reagent].name }}
      </span>
      <span>
        {{ mass | precision(2) }} г
      </span>
    </div>
    <div class="d-flex justify-end body-2 mt-1">
      <span class="font-weight-bold">
        {{ countTotalReagentsMass(recipe.reagentsMassObject).toFixed(2) }} г
      </span>
    </div>
    <v-divider class="my-3" />
    <div class="d-flex justify-space-between body-2">
      <span>Объем</span>
      <span>{{ recipe.volume }} л</span>
    </div>
    <v-divider
      v-if="recipe.note"
      class="my-3"
    />
    <div
      v-if="recipe.note"
      class="d-flex justify-space-between"
    >
      <div class="mr-3">
        Примечание
      </div>
      <div class="text-right body-2">
        {{ recipe.note }}
      </div>
    </div>
  </div>
</template>

<script>
import FORMULAS from '~/helpers/constants/formulas';
import COMPOUNDS from '~/helpers/constants/compounds';

import { countTotalReagentsMass } from '~/helpers/funcs/concentrations';

export default {
  name: 'RemineralRecipe',
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      FORMULAS,
      COMPOUNDS,
    };
  },
  methods: {
    countTotalReagentsMass,
  },
};
</script>

<style scoped>

</style>
