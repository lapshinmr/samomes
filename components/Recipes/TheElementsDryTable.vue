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
    <div class="d-flex flex-column flex-sm-column mt-2 mb-2">
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
            v-for="(ion, index) in Object.keys(totalIonConcentration)"
            :key="ion"
            class="text-center"
            :class="{'pr-0': index === totalIonConcentration.length - 1}"
          >
            <template v-if="ion !== convertIonName(ion)">
              {{ convertIonName(ion) }}, г
            </template>
            <template v-else>
              {{ ion }}, г
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(mass, reagent) in fertilizerMass"
          :key="reagent"
        >
          <td class="pl-0 text-center">
            {{ reagent }}
          </td>
          <td
            v-for="(value, ion, index) in totalIonConcentration"
            :key="reagent + ion"
            class="text-center"
            :class="{'pr-0': index === totalIonConcentration.length - 1}"
          >
            <template v-if="Object.keys(countPercent(reagent)).includes(ion)">
              <template v-if="ion !== convertIonName(ion)">
                {{ formatPrecision(convertIonRatio(ion) * mass * countPercent(reagent)[ion], 3) }}
              </template>
              <template v-else>
                {{ formatPrecision(mass * countPercent(reagent)[ion], 3) }}
              </template>
              <template v-if="value && isConcentrationPercent">
                ({{ formatPrecision(mass * countPercent(reagent)[ion] / (value * totalFertilizerMass) * 100, 1) }}%)
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
          <template v-for="(value, ion, index) in totalIonConcentration">
            <td
              v-if="ion !== convertIonName(ion)"
              :key="`${ion}converted`"
              class="text-center"
              :class="{'pr-0': index === totalIonConcentration.length - 1}"
            >
              {{ formatPrecision(convertIonRatio(ion) * value * totalFertilizerMass, 3) }}
            </td>
            <td
              v-else
              :key="`${ion}unconverted`"
              class="text-center"
              :class="{'pr-0': index === totalIonConcentration.length - 1}"
            >
              {{ formatPrecision(value * totalFertilizerMass, 3) }}
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
    <div>
      <span
        v-for="(value, ion) in totalIonConcentration"
        :key="ion"
        class="mr-2"
      >
        {{ convertIonName(ion) }}
        ({{ value
          ? formatPrecision(convertIonRatio(ion) * value / totalUsefulConcentration * 100, 3)
          : '???' }} %)
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { convertIonName, convertIonRatio, countPercent } from '~/utils/funcs';

const props = defineProps({
  totalIonConcentration: {
    type: Object,
    default: () => ({}),
  },
  fertilizerMass: {
    type: Object,
    default: () => ({}),
  },
  totalFertilizerMass: {
    type: Number,
    default: 0,
  },
});

const isConcentrationPercent = ref(false);

const totalIonConcentrationSorted = computed(() => {
  const result = Object.entries(props.totalIonConcentration);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const totalUsefulConcentration = computed(() => {
  let sum = 0;
  totalIonConcentrationSorted.value.forEach(([ion, value]) => {
    sum += convertIonRatio(ion) * value;
  });
  return sum;
});
</script>

<style scoped>

</style>
