<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
    <div
      v-for="(mass, reagent) in recipe.mass"
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
    <div
      v-if="isLiquid"
      class="d-flex justify-space-between body-2"
    >
      <span>
        Вода
      </span>
      <span>
        {{ recipe.substanceVolume }} мл
      </span>
    </div>
    <v-divider class="my-3" />
    <div class="d-flex flex-column flex-md-row justify-md-space-between">
      <div class="mb-3 mr-md-3">
        Расшифровка
      </div>
      <div
        v-if="isLiquid"
        class="body-2"
      >
        <span class="font-weight-bold">{{ recipe.doseVolume }}</span>
        мл повышают в <span class="font-weight-bold">{{ recipe.volume }}</span> л
        Gh на {{ recipe.gh.toFixed(1) }}
        <template v-if="!!recipe.kh">
          и Kh на {{ recipe.kh.toFixed(1) }}
        </template>
      </div>
      <div
        v-else
        class="body-2"
      >
        <span class="font-weight-bold">{{ countTotalReagentsMass(recipe.mass).toFixed(2) }}</span>
        г повышают в <span class="font-weight-bold">{{ recipe.volume }}</span> л
        Gh на {{ recipe.gh.toFixed(1) }}
        <template v-if="!!recipe.kh">
          и Kh на {{ recipe.kh.toFixed(1) }}
        </template>
      </div>
    </div>
    <v-divider
      v-if="recipe.note"
      class="my-3"
    />
    <div
      v-if="recipe.note"
      class="d-flex flex-column flex-md-row justify-md-space-between"
    >
      <div class="mb-3 mr-md-3">
        Примечание
      </div>
      <div
        class="text-md-right body-2"
        style="word-break: break-word; white-space: pre-wrap;"
      >{{ recipe.note }}</div>
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
  computed: {
    isLiquid() {
      return !!this.recipe.substanceVolume;
    },
  },
  methods: {
    countTotalReagentsMass,
  },
};
</script>

<style scoped>

</style>
