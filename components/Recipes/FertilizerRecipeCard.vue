<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License. To view a copy of this license, visit
  http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
  Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

  You are free to:
  - Share — copy and redistribute the material in any medium or format
  - Adapt — remix, transform, and build upon the material

  Under the following terms:
  - Attribution — You must give appropriate credit
  - NonCommercial — You may not use the material for commercial purposes
  - ShareAlike — If you remix, transform, or build upon the material,
    you must distribute your contributions under the same license as the original

  No warranties are given. The license may not give you all of the permissions
  necessary for your intended use.
-->

<template>
  <div>
    <div class="mb-2">{{ t('recipes.card.recipe') }}</div>
    <template v-for="reagent in recipe.reagents" :key="reagent.key">
      <div class="d-flex justify-space-between text-body-2">
        <span>
          {{ reagent.name }} {{ reagent.dilution < 100 ? `${reagent.dilution}%` : '' }}
        </span>
        <span class="flex-shrink-0 ml-1">
          {{ format(reagent.amount) }} {{ reagent.isLiquid ? t('units.ml') : t('units.g') }}
        </span>
      </div>
    </template>
    <v-divider class="my-3" />
    <div class="d-flex justify-space-between">
      <div class="mb-2 mb-sm-4">{{ t('recipes.card.composition') }}</div>
      <div class="d-flex text-body-2">
        <div>
          <table>
            <tr
              v-for="[ion, value] in sortObject(recipe.concentration)"
              :key="ion + 'name'"
            >
              <td>{{ ion }}</td>
              <td class="d-flex justify-end ml-2">
                <span>{{ format(value) }}</span>
                <span class="ml-1">{{ recipe.isLiquid ? t('units.g/l') : t('units.g/1g') }}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <template v-if="recipe.description">
      <v-divider class="my-3" />
      <div>
        <div class="mb-3 mr-md-3">{{ t('recipes.card.description') }}</div>
        <div
          class="text-body-2"
          style="word-break: break-word; white-space: pre-wrap"
        >
          {{ recipe.description }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineOptions({
  name: 'FertilizerRecipeCard',
});

defineProps<{
  recipe: InstanceType<typeof FertilizerRecipe>;
}>();
</script>

<style scoped></style>
