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
    <v-radio-group
      v-if="isFertilizationTypes"
      :value="fertilizationType"
      @change="$emit('change', $event)"
      class="my-2"
      hide-details="auto"
      :column="$vuetify.breakpoint.name === 'xs'"
      :row="$vuetify.breakpoint.name !== 'xs'"
    >
      <v-radio
        label="Каждый день"
        :value="0"
      />
      <v-radio
        label="В подменную воду"
        :value="1"
        class="mt-1 mt-sm-0"
      />
      <v-radio
        label="Комбинированная подача"
        :value="2"
        class="mt-1 mt-sm-0"
      />
    </v-radio-group>
    <number-field
      v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType) && isWaterChange"
      :value="waterChangeVolume"
      @input="$emit('water-change', +$event)"
      label="Введите объем подмены"
      hint="Это нужно для подсчета дозы на подмену"
      class="mt-4"
    />
    <div class="d-flex mt-4">
      <div
        v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType) && isFertilizationTypes"
        class="text-subtitle-1 font-weight-medium w-60 pr-2"
        :class="{ 'w-100': fertilizationType === FERTILIZATION_IN_TAP_WATER }"
      >
        <span style="position: relative; top: 3px;">
          <template v-if="FERTILIZATION_IN_TAP_WATER === fertilizationType">
            Весь объем удобрений
          </template>
          <template v-else>
            Подмена
          </template>
        </span>
        <v-divider class="mt-1" />
      </div>
      <div
        v-if="[FERTILIZATION_EVERY_DAY, FERTILIZATION_MIX].includes(fertilizationType)"
        class="text-subtitle-1 w-40 font-weight-medium"
        :class="{ 'w-100': fertilizationType === FERTILIZATION_EVERY_DAY}"
      >
        <v-select
          v-model="isTotal"
          :items="mode"
          item-text="text"
          item-value="value"
          hide-details="auto"
          class="mt-0 pt-0"
        />
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
        :class="{'w-60': fertilizationType === FERTILIZATION_MIX}"
      />
      <div
        v-if="[FERTILIZATION_EVERY_DAY, FERTILIZATION_MIX].includes(fertilizationType)"
        class="d-flex"
        :class="{
          'w-100': fertilizationType === FERTILIZATION_EVERY_DAY,
          'w-40': FERTILIZATION_MIX || isTotal
        }"
      >
        <number-field
          v-if="!isTotal"
          :value="recipe.amountDay"
          @input="inputRecipeAmountDay($event, index)"
          :precision-show="2"
          :precision-value="4"
          :label="FERTILIZATION_EVERY_DAY === fertilizationType ? recipe.name : ''"
          :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл/день' : 'г/день'"
          hide-details="auto"
        />
        <number-field
          v-if="isTotal"
          :value="amountDayTotal[index]"
          @input="inputRecipeAmountDayTotal($event, index)"
          :precision-show="2"
          :precision-value="4"
          :label="FERTILIZATION_EVERY_DAY === fertilizationType ? recipe.name : ''"
          :suffix=" recipe.volume > 0 || isFertilizer(recipe) ? 'мл' : 'г'"
          hide-details="auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isFertilizer } from '~/helpers/funcs/funcs';

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
      mode: [
        { text: 'Ежедневно', value: false },
        { text: 'Всего', value: true },
      ],
      amountDayTotal: [],
    };
  },
  computed: {
    isTotal: {
      get() {
        return this.$store.state.schedule.isTotalMode;
      },
      set(value) {
        this.$store.commit('SCHEDULE_SET_TOTAL_MODE', value);
      },
    },
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
.w-60
  width: 60%
.w-50
  width: 50%
.w-40
  width: 40%
</style>
