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
