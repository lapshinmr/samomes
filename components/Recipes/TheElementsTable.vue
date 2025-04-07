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
    <CommonTheElementsRatios :concentration="recipe.totalConcentration" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'TheElementsTable',
});

const props = defineProps<{
  recipe: Recipe;
}>();

const totalConcentrationSorted = computed(() => {
  const result: [string, number][] = Object.entries(props.recipe.totalConcentration);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const ionsTotal = computed(() => {
  return Object.keys(props.recipe.totalConcentration).length;
});
</script>

<style scoped>

</style>
