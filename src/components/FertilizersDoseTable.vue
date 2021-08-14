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
    <v-radio-group
      v-if="isFertilizationTypes"
      :value="fertilizationType"
      @change="$emit('change', $event)"
      row
      class="my-2"
      hide-details="auto"
    >
      <v-radio
        label="Каждый день"
        :value="0"
      />
      <v-radio
        label="В подменную воду"
        :value="1"
      />
      <v-radio
        label="Комбинированная подача"
        :value="2"
      />
    </v-radio-group>
    <v-text-field
      v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType) && isWaterChange"
      :value="waterChangeVolume"
      @input="$emit('water-change', +$event)"
      type="Number"
      label="Введите объем подмены"
      hint="Это нужно для подсчета дозы на подмену"
      class="mt-4"
    />
    <div class="d-flex mt-4">
      <div
        v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType) && isFertilizationTypes"
        class="text-subtitle-1 font-weight-medium w-50 pr-2"
        :class="{ 'w-100': fertilizationType === FERTILIZATION_IN_TAP_WATER}"
      >
        <template v-if="FERTILIZATION_IN_TAP_WATER === fertilizationType">
          Весь объем удобрений
        </template>
        <template v-else>
          Подмена
        </template>
        <v-divider />
      </div>
      <div
        v-if="[FERTILIZATION_EVERY_DAY, FERTILIZATION_MIX].includes(fertilizationType)"
        class="text-subtitle-1 w-50 font-weight-medium pr-2"
        :class="{ 'w-100': fertilizationType === FERTILIZATION_EVERY_DAY}"
      >
        <div class="d-flex justify-space-between align-center">
          <v-switch
            v-model="isTotal"
            :label="!isTotal ? 'Ежедневно' : 'Всего'"
            hide-details="auto"
            class="mt-0 mb-0 mb-sm-0"
          />
        </div>
        <v-divider />
      </div>
    </div>
    <div
      v-for="(recipe, index) in recipesSelected"
      :key="index"
      class="d-flex justify-space-between align-center"
    >
      <number-field
        v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType)"
        :value="recipe.amount"
        @input="inputRecipeAmount($event, index)"
        :precision-show="2"
        :precision-value="4"
        :label="recipe.name"
        :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл' : 'г'"
        hide-details="auto"
        class="pr-2"
        :class="{'w-50': fertilizationType === FERTILIZATION_MIX}"
      />
      <div
        v-if="[FERTILIZATION_EVERY_DAY, FERTILIZATION_MIX].includes(fertilizationType)"
        class="d-flex"
        :class="{
          'w-100': fertilizationType === FERTILIZATION_EVERY_DAY,
          'w-50': FERTILIZATION_MIX || isTotal
        }"
      >
        <number-field
          v-if="!isTotal"
          :value="recipe.amountDay"
          @input="inputRecipeAmountDay($event, index)"
          :precision-show="2"
          :precision-value="5"
          :label="recipe.name"
          :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл/день' : 'г/день'"
          hide-details="auto"
          class="pr-2"
        />
        <number-field
          v-if="isTotal"
          :value="amountDayTotal[index]"
          @input="inputRecipeAmountDayTotal($event, index)"
          :precision-show="2"
          :precision-value="4"
          :label="recipe.name"
          :suffix=" recipe.volume > 0 || isFertilizer(recipe) ? 'мл' : 'г'"
          hide-details="auto"
          class="pr-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isFertilizer } from '@/helpers/funcs';

export const FERTILIZATION_EVERY_DAY = 0;
export const FERTILIZATION_IN_TAP_WATER = 1;
export const FERTILIZATION_MIX = 2;

export default {
  name: 'FertilizersDoseTable',
  props: {
    fertilizationType: {
      type: Number,
      default: FERTILIZATION_EVERY_DAY,
    },
    recipesSelected: {
      type: Array,
      default: () => [],
    },
    days: {
      type: Number,
      default: 1,
    },
    waterChangeVolume: {
      type: Number,
      default: 0,
    },
    isFertilizationTypes: {
      type: Boolean,
      default: true,
    },
    isWaterChange: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_MIX,
      isTotal: false,
      amountDayTotal: [],
    };
  },
  watch: {
    isTotal(value) {
      if (value) {
        this.recipesSelected.forEach((recipe, index) => {
          if (recipe.amountDay) {
            this.amountDayTotal[index] = recipe.amountDay * this.days;
          }
        });
      }
    },
  },
  methods: {
    isFertilizer,
    inputRecipeAmount(value, index) {
      const recipe = this.recipesSelected[index];
      const amount = value !== '' ? +value : '';
      if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
        const amountDay = amount / this.days;
        this.$emit('input', index, {
          ...recipe,
          amount,
          amountDay,
        });
      } else if (this.fertilizationType === FERTILIZATION_MIX) {
        this.$emit('input', index, {
          ...recipe,
          amount,
        });
      }
    },
    inputRecipeAmountDay(value, index) {
      const recipe = this.recipesSelected[index];
      const amountDay = value !== '' ? +value : '';
      if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
        const amount = amountDay * this.days;
        this.$emit('input', index, {
          ...recipe,
          amount,
          amountDay,
        });
      } else if (this.fertilizationType === FERTILIZATION_MIX) {
        this.$emit('input', index, {
          ...recipe,
          amountDay,
        });
      }
    },
    inputRecipeAmountDayTotal(value, index) {
      const recipe = this.recipesSelected[index];
      const amountDayTotal = value !== '' ? +value : '';
      this.amountDayTotal[index] = amountDayTotal;
      const amountDay = amountDayTotal / this.days;
      if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
        const amount = amountDayTotal;
        this.$emit('input', index, {
          ...recipe,
          amount,
          amountDay,
        });
      } else if (this.fertilizationType === FERTILIZATION_MIX) {
        this.$emit('input', index, {
          ...recipe,
          amountDay,
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.w-50
  width: 50%
</style>
