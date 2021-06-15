<template>
  <div>
    <div
      v-if="recipe.type === 'Самомес'"
      class="mb-2"
    >
      Рецепт
    </div>
    <div
      v-if="recipe.volume"
      class="d-flex justify-space-between body-2"
    >
      <span class="">
        Объем удобрения
      </span>
      <span>
        {{ recipe.volume }} мл
      </span>
    </div>
    <template v-for="reagent in recipe.reagents">
      <div
        v-if="recipe.mass[reagent]"
        class="d-flex justify-space-between body-2"
        :key="reagent"
      >
        <span>
          {{ FORMULAS[reagent].name }}
        </span>
        <span>
          {{ recipe.mass[reagent].toFixed(2) }} г
        </span>
      </div>
    </template>
    <v-divider
      v-if="recipe.type === 'Самомес'"
      class="my-3"
    />
    <div
      v-if="isConcentration(recipe.concentration)"
      class="d-flex justify-space-between"
    >
      <div class="">
        Концентрация
      </div>
      <div class="d-flex body-2">
        <div>
          <div
            v-for="ion in countTotalIonConcentration(recipe.concentration)"
            class="mr-3"
            :key="ion + 'name'"
          >
            {{ convertIonName(ion) }}
          </div>
        </div>
        <div>
          <div
            v-for="(value, ion) in countTotalIonConcentration(recipe.concentration)"
            :key="ion + 'unit'"
            class="text-right"
          >
            {{ (convertIonRatio(ion) * value * (recipe.volume || recipe.type === 'Готовое' ? 1 : 1000)).toFixed(2) }}
            {{ recipe.volume || recipe.type === 'Готовое' ? 'г/л' : 'мг/г' }}
          </div>
        </div>
      </div>
    </div>
    <v-divider
      v-if="recipe.note"
      class="my-3"
    />
    <div
      v-if="recipe.note"
      class="d-flex justify-space-between"
    >
      <div class="mr-3">
        Примечание
      </div>
      <div class="text-right body-2">
        {{ recipe.note }}
      </div>
    </div>
  </div>
</template>

<script>
import { FORMULAS } from '@/constants.js';
import { convertIonName, convertIonRatio, countTotalIonConcentration } from '@/funcs.js';

export default {
  name: 'Recipe',
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      FORMULAS,
    };
  },
  methods: {
    convertIonName,
    convertIonRatio,
  },
};
</script>

<style scoped>

</style>
