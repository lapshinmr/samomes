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
    <v-table>
      <thead>
        <tr>
          <th class="pl-0 text-center">
            Реагент
          </th>
          <th
            v-for="([ion], index) in totalConcentrationSorted"
            :key="ion"
            class="text-center"
            :class="{'pr-0': index === ionsTotal - 1}"
          >
            <div style="white-space: nowrap;">
              {{ ion }}, {{ recipe.isLiquid ? 'г/л' : 'г/1г' }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ions, reagent) in recipe.concentration"
          :key="reagent"
        >
          <td class="pl-0 text-center">
            {{ reagent }}
          </td>
          <td
            v-for="([ion, value], index) in totalConcentrationSorted"
            :key="reagent + ion"
            class="text-center"
            :class="{'pr-0': index === ionsTotal - 1}"
          >
            <template v-if="ions[ion]">
              {{ format(ions[ion], 3) }}
              <template v-if="ions[ion] / value < 1">
                ({{ format(ions[ion] / value * 100, 1) }}%)
              </template>
            </template>
            <template v-else>
              —
            </template>
          </td>
        </tr>
        <tr class="font-weight-medium">
          <td class="pl-0 text-center">
            Сумма
          </td>
          <template
            v-for="([ion, value], index) in totalConcentrationSorted"
            :key="ion"
          >
            <td
              class="text-center"
              :class="{'pr-0': index === ionsTotal - 1}"
            >
              <template v-if="value">
                {{ format(value, 3) }}
              </template>
              <template v-else>
                —
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex justify-space-around mt-2 text-body-2">
      <div
        v-if="No3Po4Ratio"
        class="d-flex flex-column align-center"
      >
        <div class="font-weight-medium">
          NO<sub>3</sub> / PO<sub>4</sub>
        </div>
        <div>
          {{ format(No3Po4Ratio, 3) }}
        </div>
      </div>
      <div
        v-if="No3KRatio"
        class="d-flex flex-column align-center"
      >
        <div class="font-weight-medium">
          NO<sub>3</sub> / K
        </div>
        <div>
          {{ format(No3KRatio, 3) }}
        </div>
      </div>
      <div
        v-if="CaMgRatio"
        class="d-flex flex-column align-center"
      >
        <div class="font-weight-medium">
          Ca / Mg
        </div>
        <div>
          {{ format(CaMgRatio, 3) }}
        </div>
      </div>
      <div
        v-if="Po4BRatio"
        class="d-flex flex-column align-center"
      >
        <div class="font-weight-medium">
          PO<sub>4</sub> / B
        </div>
        <div>
          {{ format(Po4BRatio, 3) }}
        </div>
      </div>
      <div
        v-if="FeBRatio"
        class="d-flex flex-column align-center"
      >
        <div class="font-weight-medium">
          Fe / B
        </div>
        <div>
          {{ format(FeBRatio, 3) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO: check importing
import type Recipe from "~/utils/Recipe";

// TODO: refactor this component

defineOptions({
  name: 'TheElementsTable',
});

const props = defineProps<{
  recipe: Recipe;
}>();

const totalConcentrationSorted = computed(() => {
  const result = Object.entries(props.recipe.totalConcentration);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const countRatio = (concentration: Record<string, number>, el1: string, el2: string) => {
  const c1 = concentration[el1];
  const c2 = concentration[el2];
  if (c1 && c2) {
    return c1 / c2;
  }
  return null;
};

const ionsTotal = computed(() => {
  return Object.keys(props.recipe.totalConcentration).length;
});

const No3Po4Ratio = computed(() => {
  return countRatio(props.recipe.totalConcentration, 'NO3', 'PO4');
});

const No3KRatio = computed(() => {
  return countRatio(props.recipe.totalConcentration, 'NO3', 'K');
});

const CaMgRatio = computed(() => {
  return countRatio(props.recipe.totalConcentration, 'Ca', 'Mg');
});

const Po4BRatio = computed(() => {
  return countRatio(props.recipe.totalConcentration, 'PO4', 'B');
});
const FeBRatio = computed(() => {
  return countRatio(props.recipe.totalConcentration, 'Fe', 'B');
});

</script>

<style scoped>

</style>
