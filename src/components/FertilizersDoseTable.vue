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
      :value="fertilizationType"
      @change="$emit('change', $event)"
      row
      class="my-2"
      hide-details="auto"
    >
      <v-radio
        label="В подменную воду"
        :value="0"
      />
      <v-radio
        label="Каждый день"
        :value="1"
      />
      <v-radio
        label="Комбинированная подача"
        :value="2"
      />
    </v-radio-group>
    <v-text-field
      v-if="FERTILIZATION_MIX === fertilizationType"
      :value="waterChange"
      @input="$emit('water-change', +$event)"
      type="Number"
      label="Введите объем подмены"
      hint="Это нужно для подсчета дозы на подмену"
      class="mt-4"
    />
    <div class="d-flex mt-4">
      <div
        v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType)"
        class="text-subtitle-1 font-weight-medium w-50 pr-2"
      >
        <template v-if="FERTILIZATION_IN_TAP_WATER === fertilizationType">
          Весь объем удобрений
        </template>
        <template v-else>
          Доза после подмены
        </template>
        <v-divider />
      </div>
      <div
        v-if="[FERTILIZATION_EVERY_DAY, FERTILIZATION_MIX].includes(fertilizationType)"
        class="text-subtitle-1 w-50 font-weight-medium pr-2"
      >
        Ежедневная доза
        <v-divider />
      </div>
    </div>
    <div
      v-for="(recipe, index) in recipesSelected"
      :key="index"
      class="d-flex justify-space-between align-center"
    >
      <base-text-field
        v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(fertilizationType)"
        :value="recipe.amount"
        @input="inputRecipeAmount($event, index)"
        type="number"
        :label="recipe.name"
        :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл' : 'г'"
        hide-details="auto"
        class="w-50 pr-2"
      />
      <base-text-field
        v-if="[FERTILIZATION_EVERY_DAY, FERTILIZATION_MIX].includes(fertilizationType)"
        :value="recipe.amountDay"
        @input="inputRecipeAmountDay($event, index)"
        type="number"
        :label="recipe.name"
        :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл/день' : 'г/день'"
        hide-details="auto"
        class="w-50 pr-2"
      />
    </div>
  </div>
</template>

<script>
import { isFertilizer } from '@/helpers/funcs';

export const FERTILIZATION_IN_TAP_WATER = 0;
export const FERTILIZATION_EVERY_DAY = 1;
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
    waterChange: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_MIX,
    };
  },
  methods: {
    isFertilizer,
    inputRecipeAmount(value, index) {
      const recipe = this.recipesSelected[index];
      const amount = parseFloat(value);
      const amountDay = amount / this.days;
      if (this.fertilizationType === this.FERTILIZATION_IN_TAP_WATER) {
        this.$emit('input', index, {
          ...recipe,
          amount,
          amountDay,
        });
      } else if (this.fertilizationType === this.FERTILIZATION_MIX) {
        this.$emit('input', index, {
          ...recipe,
          amount,
        });
      }
    },
    inputRecipeAmountDay(value, index) {
      const recipe = this.recipesSelected[index];
      const amountDay = parseFloat(value);
      const amount = amountDay * this.days;
      if (this.fertilizationType === this.FERTILIZATION_EVERY_DAY) {
        this.$emit('input', index, {
          ...recipe,
          amount,
          amountDay,
        });
      } else if (this.fertilizationType === this.FERTILIZATION_MIX) {
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
