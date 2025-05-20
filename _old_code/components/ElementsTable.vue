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
      v-if="isSwitchers"
      class="d-flex align-center mt-2 mb-2"
    >
      <v-switch
        v-model="isHardness"
        label="Показать повышение жесткости"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0"
      />
    </div>
    <v-simple-table dense>
      <template #default>
        <thead>
          <tr>
            <th class="pl-0 text-center">
              Элемент
            </th>
            <th
              v-if="isHardness"
              class="text-center"
            >
              Gh
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
              </td>
              <td
                v-if="isHardness"
                class="text-center"
              >
                <template v-if="name in GH">
                  <template v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_EVERY_DAY].includes(fertilizationType)">
                    +{{ (value.amount / GH[name]).toFixed(2) }}
                  </template>
                  <template v-if="FERTILIZATION_MIX === fertilizationType">
                    +{{ (value.total / GH[name]).toFixed(2) }}
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
                </td>
              </template>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row
      v-if="isHelpful && isHelpfulInfo"
      class="mt-4 body-2"
    >
      <v-col
        v-if="totalElements.P && totalElements.P.total > 0 && totalElements.N && totalElements.N.total > 0"
        cols="3"
        sm="3"
        class="text-center"
      >
        NO<sub>3</sub> / PO<sub>4</sub>
        <br>
        {{ (
          totalElements.N.total * convertIonRatio('N') / (totalElements.P.total * convertIonRatio('P'))
        ).toFixed(2) }}
      </v-col>
      <v-col
        v-if="totalElements.P && totalElements.P.total > 0 && totalElements.Fe && totalElements.Fe.total > 0"
        cols="3"
        sm="3"
        class="text-center"
      >
        PO<sub>4</sub> / Fe
        <br>
        {{ (totalElements.P.total * convertIonRatio('P') / totalElements.Fe.total).toFixed(2) }}
      </v-col>
      <v-col
        v-if="totalElements.P && totalElements.P.total > 0 && totalElements.B && totalElements.B.total > 0"
        cols="3"
        sm="3"
        class="text-center"
      >
        P / B
        <br>
        {{ (totalElements.P.total / totalElements.B.total).toFixed(2) }}
      </v-col>
      <v-col
        v-if="totalElements.Fe && totalElements.Fe.total > 0 && totalElements.B && totalElements.B.total > 0"
        cols="3"
        sm="3"
        class="text-center"
      >
        Fe / B
        <br>
        {{ (totalElements.Fe.total / totalElements.B.total).toFixed(2) }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  convertIonName, convertIonRatio, isFertilizer, isRecipe,
} from '~/helpers/funcs/funcs';
import { GH } from '~/helpers/constants/hardness';
import {
  FERTILIZATION_IN_TAP_WATER,
  FERTILIZATION_EVERY_DAY,
  FERTILIZATION_MIX,
} from '@/components/FertilizersDoseTable.vue';
import ELEMENTS from '~/helpers/constants/elements';

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
      ELEMENTS,
    };
  },
  computed: {
    isHardness: {
      get() {
        return this.$store.state.schedule.isHardness;
      },
      set(value) {
        this.$store.commit('SCHEDULE_SET_IS_HARDNESS', value);
      },
    },
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
    CN() {
      return (
        ((
          ((ELEMENTS.C + ELEMENTS.O * 2) * 106) / (ELEMENTS.P + ELEMENTS.O * 4)
        ) / (
          ((ELEMENTS.N + ELEMENTS.O * 3) * 16) / (ELEMENTS.P + ELEMENTS.O * 4)
        )) * this.totalElements.N.total * convertIonRatio('N')
      );
    },
    CP() {
      return (
        ((
          (ELEMENTS.C + ELEMENTS.O * 2) * 106
        ) / (
          ELEMENTS.P + ELEMENTS.O * 4
        )) * this.totalElements.P.total * convertIonRatio('P')
      );
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
