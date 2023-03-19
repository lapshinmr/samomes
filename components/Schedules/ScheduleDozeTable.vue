<!--
  Samomes

  Copyright (C) 2023 Mikhail Lapshin

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
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-center pl-0">
            Дни
          </th>
          <th
            class="text-center"
            v-for="recipeName in headers"
            :key="recipeName"
          >
            {{ recipeName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType)">
          <td class="pl-0 text-center">
            Подмена
          </td>
          <td
            v-for="(quota, recipeName, idx) in waterChangeQuotas"
            class="text-center"
            :class="{'pr-0': idx === Object.keys(waterChangeQuotas).length - 1}"
            :key="`water_change_${recipeName}`"
          >
            <template v-if="quota">
              {{ quota.toFixed(2) }}
            </template>
            <template v-else>
              -
            </template>
          </td>
        </tr>
        <template v-if="Object.keys(daysQuotas).length > 0">
          <tr
            v-for="(day, index) in daysTotal"
            :key="day"
          >
            <td class="pl-0 text-center">
              <span style="text-transform: capitalize;">{{ datesColumn[index].weekday }}</span>,
              <span class="text-secondary">{{ datesColumn[index].date }}</span>
            </td>
            <td
              v-for="(quotas, recipeName, idx) in daysQuotas"
              :key="recipeName + day"
              class="text-center"
              :class="{
                'pr-0': idx === Object.keys(daysQuotas).length - 1
              }"
            >
              <span v-if="quotas[index] === null"> - </span>
              <v-checkbox
                v-if="quotas[index] !== null"
                :input-value="value[recipeName][index]"
                @change="onChange($event, recipeName, index)"
                :true-value="true"
                :false-value="false"
                color="primary"
                dense
                hide-details="auto"
                class="mt-0"
                style="display: inline-block;"
              >
                <template #label>
                  <span class="mt-0">
                    {{ quotas[index].toFixed(2) }}
                  </span>
                </template>
              </v-checkbox>
            </td>
          </tr>
        </template>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {
  FERTILIZATION_IN_TAP_WATER,
  FERTILIZATION_EVERY_DAY,
  FERTILIZATION_MIX,
} from '@/components/FertilizersDoseTable.vue';

export default {
  name: 'ScheduleDoseTable',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    fertilizationType: {
      type: Number,
      default: FERTILIZATION_EVERY_DAY,
    },
    daysTotal: {
      type: Number,
      default: 1,
    },
    datesColumn: {
      type: Array,
      default: () => [],
    },
    recipesSelected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_MIX,
    };
  },
  computed: {
    waterChangeQuotas() {
      const quotas = {};
      this.recipesSelected.forEach((recipe) => {
        quotas[recipe.name] = recipe.amount;
      });
      return quotas;
    },
    daysQuotas() {
      const quotas = {};
      if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
        return {};
      }
      this.recipesSelected.forEach((recipe) => {
        const result = [];
        const selectedList = this.value[recipe.name];
        const excludedTotal = selectedList.filter((x) => !x).length;
        const daysLeft = this.daysTotal - excludedTotal;
        const amount = recipe.amountDay * this.daysTotal;
        let currentDay = amount / (this.daysTotal - excludedTotal);
        console.log(selectedList, excludedTotal, daysLeft, amount, currentDay);
        Object.keys([...Array(this.daysTotal)]).forEach((index) => {
          if (!amount) {
            result.push(null);
          } else {
            if (!selectedList[index]) {
              currentDay = 0;
            } else {
              currentDay = amount / daysLeft;
            }
            result.push(currentDay);
          }
        });
        quotas[recipe.name] = result;
      });
      return quotas;
    },
    headers() {
      if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
        return Object.keys(this.waterChangeQuotas);
      }
      return Object.keys(this.daysQuotas);
    },
  },
  methods: {
    onChange(value, recipeName, index) {
      console.log(value, recipeName, index);
      const selected = { ...this.value };
      selected[recipeName][index] = value;
      console.log(selected);
      this.$emit('input', selected);
    },
  },
};
</script>

<style scoped>

</style>
