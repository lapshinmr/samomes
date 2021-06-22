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

import BaseTextField from '@/components/BaseTextField.vue';

export default {
  name: 'FertilizersDoseTable',
  components: {
    BaseTextField,
  },
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
