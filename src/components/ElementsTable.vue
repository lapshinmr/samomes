<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

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
      v-if="isSwitchers"
      class="d-flex align-center mt-2 mb-2"
    >
      <v-switch
        v-model="isHardness"
        label="dGh"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0"
      />
<!--      <v-switch-->
<!--        v-model="isWithoutConversion"-->
<!--        label="N & P"-->
<!--        hide-details="auto"-->
<!--        class="mt-0 mb-2 mb-sm-0 ml-4"-->
<!--      />-->
    </div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="pl-0 text-center">
              Элемент
            </th>
            <th
              v-if="isHardness"
              class="text-center"
            >
              dGh
            </th>
            <template v-if="fertilizationType === FERTILIZATION_EVERY_DAY">
              <th class="text-center">
                Общая доза, <span>мг/л</span>
              </th>
              <th class="text-center">
                В день
              </th>
            </template>
            <template v-if="fertilizationType === FERTILIZATION_IN_TAP_WATER">
              <th class="text-center">
                В подмене, <span>мг/л</span>
              </th>
              <th class="text-center">
                В аквариуме, <span>мг/л</span>
              </th>
              <th class="text-center">
                В день, <span>мг/л</span>
              </th>
            </template>
            <template v-if="fertilizationType === FERTILIZATION_MIX">
              <th class="text-center">
                В подмене/аквариуме, <span>мг/л</span>
              </th>
              <th class="text-center">
                В день/неделю
              </th>
              <th class="text-center">
                Общая доза, <span>мг/л</span>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="[name, value] in totalElementsSorted"
            :key="name"
            :class="{
              'caption': $vuetify.breakpoint['xs'],
              'regular': $vuetify.breakpoint['smAndUp']
            }"
          >
            <template v-if="value.amount !== undefined">
              <td class="pl-0 text-center">
                {{ name }}
                <template v-if="convertIonName(name) !== name && isWithoutConversion">
                  / {{ convertIonName(name) }}
                </template>
              </td>
              <td
                v-if="isHardness"
                class="text-center"
              >
                <template v-if="name in HARDNESS">
                  <template v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_EVERY_DAY].includes(fertilizationType)">
                    +{{ (value.amount / HARDNESS[name]).toFixed(2) }}
                  </template>
                  <template v-if="FERTILIZATION_MIX === fertilizationType">
                    +{{ (value.total / HARDNESS[name]).toFixed(2) }}
                  </template>
                </template>
              </td>
              <template v-if="fertilizationType === FERTILIZATION_EVERY_DAY">
                <td class="text-center text-no-wrap">
                  {{ value.amount.toFixed(3) }}
                </td>
                <td class="text-center text-no-wrap">
                  {{ value.amountDay.toFixed(3) }}
                </td>
              </template>
              <template v-if="fertilizationType === FERTILIZATION_IN_TAP_WATER">
                <td class="text-center text-no-wrap">
                  {{ (value.waterChange ? value.waterChange : 0).toFixed(3) }}
                </td>
                <td class="text-center text-no-wrap">
                  {{ value.amount.toFixed(3) }}
                </td>
                <td class="text-center text-no-wrap">
                  {{ value.amountDay.toFixed(3) }}
                </td>
              </template>
              <template v-if="fertilizationType === FERTILIZATION_MIX">
                <td class="text-center text-no-wrap">
                  {{ (value.waterChange ? value.waterChange : 0).toFixed(3) }} /
                  {{ value.amount.toFixed(3) }}
                </td>
                <td class="text-center text-no-wrap">
                  {{ value.amountDay.toFixed(3) }} / {{ (value.amountDay * daysTotal).toFixed(3) }}
                </td>
                <td class="text-center text-no-wrap">
                  {{ value.total.toFixed(3) }}
<!--                  <template v-if="convertIonName(name) !== name && isWithoutConversion">-->
<!--                    / {{ (value.total * convertIonRatio(name)).toFixed(3) }}-->
<!--                  </template>-->
                </td>
              </template>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div
      v-if="isHelpful && isHelpfulInfo"
      class="d-flex flex-column flex-sm-row justify-space-between caption mt-2"
    >
      <div
        v-if="totalElements['P'] > 0 && totalElements['N'] > 0"
        class="mr-2"
      >
        NO3 / PO4 =
        {{ (
          totalElements['N'] * convertIonRatio('N') / (totalElements['P'] * convertIonRatio('P'))
        ).toFixed(2) }}
        (N / P = {{ (totalElements['N'] / totalElements['P']).toFixed(2) }})
      </div>
      <div
        v-if="totalElements['P'] > 0 && totalElements['B'] > 0"
        class="mr-2"
      >
        P / B = {{ (totalElements['P'] / totalElements['B']).toFixed(2) }}
      </div>
      <div
        v-if="totalElements['Fe'] > 0 && totalElements['B'] > 0"
        class="mr-2"
      >
        Fe / B = {{ (totalElements['Fe'] / totalElements['B']).toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
import {
 convertIonName, convertIonRatio, isFertilizer, isRecipe,
} from '@/helpers/funcs';
import HARDNESS from '@/constants/hardness';
import {
  FERTILIZATION_IN_TAP_WATER,
  FERTILIZATION_EVERY_DAY,
  FERTILIZATION_MIX,
} from '@/components/FertilizersDoseTable.vue';

export default {
  name: 'ElementsTable',
  props: {
    fertilizationType: {
      type: Number,
      default: FERTILIZATION_EVERY_DAY,
    },
    recipesSelected: {
      type: Array,
      default: () => [],
    },
    daysTotal: {
      type: Number,
      default: 1,
    },
    volume: {
      type: Number,
      default: null,
    },
    waterChange: {
      type: Number,
      default: 0,
    },
    isHelpfulInfo: {
      type: Boolean,
      default: false,
    },
    isSwitchers: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      HARDNESS,
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_MIX,
      isWithoutConversion: false,
      isHardness: false,
    };
  },
  computed: {
    isHelpful() {
      return (
        (this.totalElements.P > 0 && this.totalElements.N > 0)
        || (this.totalElements.P > 0 && this.totalElements.B > 0)
        || (this.totalElements.Fe > 0 && this.totalElements.B > 0)
      );
    },
    totalElements() {
      const result = {};
      this.recipesSelected.forEach((recipe) => {
        Object.values(recipe.concentration).forEach((value) => {
          Object.keys(value).forEach((ion) => {
            if (!(ion in result)) {
              result[ion] = {
                amount: 0,
                amountDay: 0,
                waterChange: 0,
                total: 0,
              };
            }
            if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
              const amount = (recipe.amount * value[ion]) / this.volume;
              result[ion].amount += amount;
              result[ion].amountDay += amount / this.daysTotal;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion].amount *= 1000;
                result[ion].amountDay *= 1000;
              }
            } else if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
              const amount = (recipe.amount * value[ion]) / this.volume;
              const waterChange = this.waterChange ? (recipe.amount * value[ion]) / this.waterChange : 0;
              result[ion].amount += amount;
              result[ion].amountDay += amount / this.daysTotal;
              result[ion].waterChange += waterChange;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion].amount *= 1000;
                result[ion].amountDay *= 1000;
                result[ion].waterChange *= 1000;
              }
            } else if (this.fertilizationType === FERTILIZATION_MIX) {
              const amount = (recipe.amount * value[ion]) / this.volume;
              const waterChange = this.waterChange ? (recipe.amount * value[ion]) / this.waterChange : 0;
              const amountDay = (recipe.amountDay * value[ion]) / this.volume;
              const total = amount + amountDay * this.daysTotal;
              result[ion].amount += amount;
              result[ion].waterChange += waterChange;
              result[ion].amountDay += amountDay;
              result[ion].total += total;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion].amount *= 1000;
                result[ion].waterChange *= 1000;
                result[ion].amountDay *= 1000;
                result[ion].total *= 1000;
              }
            }
          });
        });
      });
      return result;
    },
    totalElementsSorted() {
      const sortableResult = [];
      Object.keys(this.totalElements).forEach((ion) => {
        sortableResult.push([
          this.convertIonName(ion),
          {
            amount: this.convertIonRatio(ion) * this.totalElements[ion].amount,
            amountDay: this.convertIonRatio(ion) * this.totalElements[ion].amountDay,
            waterChange: this.convertIonRatio(ion) * this.totalElements[ion].waterChange,
            total: this.convertIonRatio(ion) * this.totalElements[ion].total,
          },
        ]);
      });
      sortableResult.sort((a, b) => b[1].amount - a[1].amount);
      return sortableResult;
    },
  },
  methods: {
    convertIonName,
    convertIonRatio,
    isFertilizer,
    isRecipe,
  },
};
</script>

<style scoped>

</style>
