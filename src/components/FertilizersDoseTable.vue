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
      v-for="(recipe, index) in recipesSelected"
      :key="index"
      class="d-flex justify-space-between align-center"
    >
      <base-text-field
        :value="recipe.amount"
        @input="inputRecipeAmount($event, index)"
        :label="recipe.name"
        hint="Введите весь объем"
        :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл' : 'г'"
        persistent-hint
        class="mr-3"
        :readonly="isOverview"
      />
      <base-text-field
        :value="recipe.amountDay"
        @input="inputRecipeAmountDay($event, index)"
        type="number"
        hint="или объем в день"
        :suffix="recipe.volume > 0 || isFertilizer(recipe) ? 'мл/день' : 'г/день'"
        persistent-hint
        :readonly="isOverview"
      />
    </div>
  </div>
</template>

<script>
import { isFertilizer } from '@/helpers/funcs';

export default {
  name: 'FertilizersDoseTable',
  props: {
    recipesSelected: {
      type: Array,
      default: () => [],
    },
    isOverview: {
      type: Boolean,
      default: false,
    },
    days: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      focusedKey: null,
    };
  },
  methods: {
    isFertilizer,
    inputRecipeAmount(value, index) {
      const recipe = this.recipesSelected[index];
      const amount = parseFloat(value);
      const amountDay = amount / this.days;
      this.$emit('input', index, {
        ...recipe,
        amount,
        amountDay,
      });
    },
    inputRecipeAmountDay(value, index) {
      const recipe = this.recipesSelected[index];
      const amountDay = parseFloat(value);
      const amount = amountDay * this.days;
      this.$emit('input', index, {
        ...recipe,
        amount,
        amountDay,
      });
    },
  },
};
</script>

<style scoped>

</style>
