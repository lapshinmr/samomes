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
    <div class="d-flex flex-col flex-md-row mt-1">
      <v-switch
        v-model="isConcentrationPercent"
        label="Показать соотношение"
        hide-details="auto"
        class="mr-4"
      />
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="pl-0 text-center">
            Реагент
          </th>
          <th
            v-for="([ion], index) in totalIonConcentrationSorted"
            :key="ion"
            class="text-center"
            :class="{'pr-0': index === totalIonConcentrationSorted.length - 1}"
          >
            <div style="white-space: nowrap;">
              <template v-if="ion !== convertIonName(ion)">
                {{ convertIonName(ion) }}, г/л
              </template>
              <template v-else>
                {{ ion }}, г/л
              </template>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="reagent in Object.keys(concentration)"
          :key="reagent"
        >
          <td class="pl-0 text-center">
            {{ reagent }}
          </td>
          <td
            v-for="([ion, value], index) in totalIonConcentrationSorted"
            :key="reagent + ion"
            class="text-center"
            :class="{'pr-0': index === Object.keys(concentration).length - 1}"
          >
            <template v-if="Object.keys(concentration[reagent]).includes(ion)">
              <template v-if="ion !== convertIonName(ion)">
                {{ formatPrecision(convertIonRatio(ion) * concentration[reagent][ion], 3) }}
              </template>
              <template v-else>
                {{ formatPrecision(concentration[reagent][ion], 3) }}
              </template>
              <template v-if="value && isConcentrationPercent">
                ({{ formatPrecision(concentration[reagent][ion] / value * 100, 1) }}%)
              </template>
            </template>
            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="font-weight-bold">
          <td class="pl-0 text-center">
            Сумма
          </td>
          <template v-for="([ion, value], index) in totalIonConcentrationSorted">
            <td
              v-if="ion !== convertIonName(ion)"
              :key="`${ion}${index}converted`"
              class="text-center"
              :class="{'pr-0': index === totalIonConcentrationSorted.length - 1}"
            >
              {{ formatPrecision(convertIonRatio(ion) * value, 3) }}
            </td>
            <td
              v-else
              :key="`${ion}${index}unconverted`"
              class="text-center"
              :class="{'pr-0': index === totalIonConcentration.length - 1}"
            >
              {{ formatPrecision(value, 3) }}
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex mt-2">
      <v-text-field
        :value="No3Po4Ratio"
        label="No3 / Po4"
        hide-details="auto"
        readonly
        outlined
      />
      <v-text-field
        :value="No3KRatio"
        label="No3 / K"
        hide-details="auto"
        readonly
        outlined
        class="ml-2"
      />
      <v-text-field
        :value="CaMgRatio"
        label="Ca / Mg"
        hide-details="auto"
        readonly
        outlined
        class="ml-2"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  convertIonName,
  convertIonRatio,
  countRatio,
} from '~/utils/funcs';

const props = defineProps({
  totalIonConcentration: {
    type: Object,
    default: () => ({}),
  },
  fertilizerMass: {
    type: Object,
    default: () => ({}),
  },
  concentration: {
    type: Object,
    default: () => ({}),
  },
});

// TODO: turn this on automatically if element present more than once
const isConcentrationPercent = ref(false);

const totalIonConcentrationSorted = computed(() => {
  const result = Object.entries(props.totalIonConcentration);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const No3Po4Ratio = computed(() => {
  return countRatio(props.totalIonConcentration, 'N', 'P');
});

const No3KRatio = computed(() => {
  return countRatio(props.totalIonConcentration, 'N', 'K');
});

const CaMgRatio = computed(() => {
  return countRatio(props.totalIonConcentration, 'Ca', 'Mg');
});

</script>

<style scoped>

</style>
