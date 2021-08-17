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
        v-if="tank.length && tank.width"
        v-model="isSpecificArea"
        label="dm/dS"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0 ml-3"
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
            <th
              v-if="isSpecificArea && tank.length && tank.width"
              class="text-center"
            >
              dm/dS, мг/дм2
            </th>
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
                  {{ (value.waterChangeVolume ? value.waterChangeVolume : 0).toFixed(3) }}
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
                  {{ (value.waterChangeVolume ? value.waterChangeVolume : 0).toFixed(3) }} /
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
              <td
                v-if="isSpecificArea && tank.length && tank.width"
                class="text-center"
              >
                {{ (
                  value.total * tank.volume / Math.round(
                    (tank.length - (2 * tank.glassThickness) / 10)
                      * (tank.width - (2 * tank.glassThickness) / 10)
                      * 100,
                  ) * 100 * 100
                ).toFixed(3)
                }}
              </td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row
      v-if="isHelpful && isHelpfulInfo"
      class="mt-4"
    >
      <v-col
        cols="6"
        sm="3"
        v-if="totalElements.P && totalElements.P.total > 0 && totalElements.N && totalElements.N.total > 0"
      >
        NO3 / PO4 =
        {{ (
          totalElements.N.total * convertIonRatio('N') / (totalElements.P.total * convertIonRatio('P'))
        ).toFixed(2) }}
        <!--        (N / P = {{ (totalElements.N.total / totalElements.P.total).toFixed(2) }})-->
      </v-col>
      <v-col
        cols="6"
        sm="3"
        v-if="totalElements.P && totalElements.P.total > 0 && totalElements.Fe && totalElements.Fe.total > 0"
      >
        PO4 / Fe = {{ (totalElements.P.total * convertIonRatio('P') / totalElements.Fe.total).toFixed(2) }}
      </v-col>
      <v-col
        cols="6"
        sm="3"
        v-if="totalElements.P && totalElements.P.total > 0 && totalElements.B && totalElements.B.total > 0"
      >
        P / B = {{ (totalElements.P.total / totalElements.B.total).toFixed(2) }}
      </v-col>
      <v-col
        cols="6"
        sm="3"
        v-if="totalElements.Fe && totalElements.Fe.total > 0 && totalElements.B && totalElements.B.total > 0"
      >
        Fe / B = {{ (totalElements.Fe.total / totalElements.B.total).toFixed(2) }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
 convertIonName, convertIonRatio, isFertilizer, isRecipe,
} from '@/helpers/funcs';
import { GH } from '@/constants/hardness';
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
    waterChangeVolume: {
      type: Number,
      default: 0,
    },
    tank: {
      type: Object,
      default: null,
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
      GH,
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_MIX,
      isWithoutConversion: false,
      isSpecificArea: false,
    };
  },
  computed: {
    isHelpful() {
      if (
        this.totalElements.P
        && this.totalElements.P.total > 0
        && this.totalElements.N
        && this.totalElements.N.total > 0
      ) {
        return true;
      }
      if (
        this.totalElements.P
        && this.totalElements.P.total > 0
        && this.totalElements.B
        && this.totalElements.B.total > 0
      ) {
        return true;
      }
      if (
        this.totalElements.Fe
        && this.totalElements.Fe.total > 0
        && this.totalElements.B
        && this.totalElements.B.total > 0
      ) {
        return true;
      }
      return false;
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
                waterChangeVolume: 0,
                total: 0,
              };
            }
            if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
              let amount = (recipe.amount * value[ion]) / this.volume;
              let amountDay = amount / this.daysTotal;
              let total = amount;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                amount *= 1000;
                amountDay *= 1000;
                total *= 1000;
              }
              result[ion].amount += amount;
              result[ion].amountDay += amountDay;
              result[ion].total += total;
            } else if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
              let amount = (recipe.amount * value[ion]) / this.volume;
              let amountDay = amount / this.daysTotal;
              let total = amount;
              let waterChangeVolume = this.waterChangeVolume
                ? (recipe.amount * value[ion]) / this.waterChangeVolume
                : 0;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                amount *= 1000;
                amountDay *= 1000;
                waterChangeVolume *= 1000;
                total *= 1000;
              }
              result[ion].amount += amount;
              result[ion].total += total;
              result[ion].amountDay += amountDay;
              result[ion].waterChangeVolume += waterChangeVolume;
            } else if (this.fertilizationType === FERTILIZATION_MIX) {
              let amount = (recipe.amount * value[ion]) / this.volume;
              let waterChangeVolume = this.waterChangeVolume
                ? (recipe.amount * value[ion]) / this.waterChangeVolume
                : 0;
              let amountDay = (recipe.amountDay * value[ion]) / this.volume;
              let total = amount + amountDay * this.daysTotal;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                amount *= 1000;
                waterChangeVolume *= 1000;
                amountDay *= 1000;
                total *= 1000;
              }
              result[ion].amount += amount;
              result[ion].waterChangeVolume += waterChangeVolume;
              result[ion].amountDay += amountDay;
              result[ion].total += total;
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
            waterChangeVolume: this.convertIonRatio(ion) * this.totalElements[ion].waterChangeVolume,
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
