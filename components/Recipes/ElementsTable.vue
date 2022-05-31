<!--
  Samomes

  Copyright (C) 2022 Mikhail Lapshin

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
      class="d-flex mt-1"
      :class="{
        'flex-column': $vuetify.breakpoint['xs'],
        'flex-row': $vuetify.breakpoint['smAndUp']
      }"
    >
      <v-switch
        v-model="isConcentrationPercent"
        label="Показать соотношение"
        hide-details="auto"
        class="mr-4"
      />
      <v-switch
        v-model="isConvertion"
        label="Показать N и P"
        hide-details="auto"
        class="mr-4"
      />
    </div>
    <v-simple-table>
      <template #default>
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
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ ion }} /
                </template>
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
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ concentration[reagent][ion].toFixed(3) }} /
                </template>
                <template v-if="ion !== convertIonName(ion)">
                  {{ (convertIonRatio(ion) * concentration[reagent][ion]).toFixed(3) }}
                </template>
                <template v-else>
                  {{ concentration[reagent][ion].toFixed(3) }}
                </template>
                <template v-if="value && isConcentrationPercent">
                  ({{ (concentration[reagent][ion] / value * 100).toFixed(1) }}%)
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
            <template
              v-for="([ion, value], index) in totalIonConcentrationSorted"
            >
              <td
                v-if="ion !== convertIonName(ion)"
                :key="ion"
                class="text-center"
                :class="{'pr-0': index === totalIonConcentrationSorted.length - 1}"
              >
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ value.toFixed(3) }} /
                </template>
                {{ (convertIonRatio(ion) * value).toFixed(3) }}
              </td>
              <td
                v-else
                class="text-center"
                :class="{'pr-0': index === totalIonConcentration.length - 1}"
                :key="ion"
              >
                {{ value.toFixed(3) }}
              </td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { convertIonName, convertIonRatio, countPercent } from '~/helpers/funcs';

export default {
  name: 'ElementsTable',
  props: {
    totalIonConcentration: {
      type: Object,
      default: () => {},
    },
    fertilizerMass: {
      type: Object,
      default: () => {},
    },
    concentration: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isConcentrationPercent: false,
      isConvertion: false,
    };
  },
  computed: {
    totalIonConcentrationSorted() {
      const result = Object.entries(this.totalIonConcentration);
      result.sort((a, b) => b[1] - a[1]);
      return result;
    },
  },
  methods: {
    convertIonRatio,
    convertIonName,
    countPercent,
  },
};
</script>

<style scoped>

</style>
