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
      v-if="isRecipe"
      class="mb-2"
    >
      Рецепт
    </div>
    <div
      v-if="recipe.volume"
      class="d-flex justify-space-between body-2"
    >
      <span class="">
        Объем удобрения
      </span>
      <span>
        {{ recipe.volume }} мл
      </span>
    </div>
    <template v-for="reagent in recipe.reagents">
      <div
        v-if="recipe.mass[reagent]"
        class="d-flex justify-space-between body-2"
        :key="reagent"
      >
        <span>
          {{ FORMULAS[reagent].name }}
        </span>
        <span>
          {{ formatPrecision(recipe.mass[reagent], 2) }} г
        </span>
      </div>
    </template>
    <template v-for="compound in recipe.compounds">
      <div
        v-if="recipe.mass[compound]"
        class="d-flex justify-space-between body-2"
        :key="compound"
      >
        <span>
          {{ COMPOUNDS[compound].name }}
        </span>
        <span>
          {{ formatPrecision(recipe.mass[compound], 2) }} г
        </span>
      </div>
    </template>
    <v-divider
      v-if="isRecipe"
      class="my-3"
    />
    <div
      v-if="isConcentration(recipe.concentration)"
      class="d-flex justify-space-between"
    >
      <div class="">
        Концентрация
      </div>
      <div class="d-flex body-2">
        <div>
          <div
            v-for="[ion] in concentrations"
            class="mr-3"
            :key="ion + 'name'"
          >
            {{ convertIonName(ion) }}
          </div>
        </div>
        <div>
          <div
            v-for="[ion, value] in concentrations"
            :key="ion + 'unit'"
            class="text-right"
          >
            {{ formatPrecision(convertIonRatio(ion) * value * (!recipe.volume && isRecipe ? 1000 : 1), 3) }}
            {{ !recipe.volume && isRecipe ? 'мг/г' : 'г/л' }}
          </div>
        </div>
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

<script setup>
import FORMULAS from '~/helpers/constants/formulas';
import COMPOUNDS from '~/helpers/constants/compounds';
import {
  convertIonName,
  convertIonRatio,
  countTotalIonConcentration,
  isConcentration,
} from '~/helpers/funcs/funcs';

const props = defineProps({
  recipe: {
    type: Object,
    default: () => ({}),
  },
});

const concentrations = computed(() => {
  const result = Object.entries(countTotalIonConcentration(props.recipe.concentration));
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const isRecipe = computed(() => {
  return props.recipe.reagents && props.recipe.reagents.length > 0;
});

function formatPrecision(value, precision = 2) {
  if (value === undefined || value === null) return '';

  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(num)) return '';

  // Format with the specified precision
  const formatted = num.toFixed(precision);

  // Remove trailing zeros
  return formatted.replace(/\.?0+$/, '');
}
</script>

<style scoped>

</style>