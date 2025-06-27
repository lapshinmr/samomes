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
    <v-table>
      <thead>
        <tr>
          <th class="pl-0 text-center">
            {{ t('common.reagent') }}
          </th>
          <th
            v-for="([ion], index) in concentrationSorted"
            :key="ion"
            class="text-center"
            :class="{'pr-0': index === ionsTotal - 1}"
          >
            <div style="white-space: nowrap;">
              {{ ion }}, {{ recipe.isLiquid ? t('units.g/l') : t('units.g/1g') }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ions, reagent) in concentrationPerReagentWithoutWater"
          :key="reagent"
        >
          <td class="pl-0 text-center">
            {{ reagent }}
          </td>
          <td
            v-for="([ion, value], index) in concentrationSorted"
            :key="reagent + ion"
            class="text-center"
            :class="{'pr-0': index === ionsTotal - 1}"
          >
            <template v-if="ions[ion]">
              {{ format(ions[ion]) }}
              <template v-if="ions[ion] / value < 1">
                ({{ format(ions[ion] / value * 100, 1) }}%)
              </template>
            </template>
            <template v-else>
              —
            </template>
          </td>
        </tr>
        <tr class="font-weight-medium">
          <td class="pl-0 text-center">
            {{ t('common.total') }}
          </td>
          <template
            v-for="([ion, value], index) in concentrationSorted"
            :key="ion"
          >
            <td
              class="text-center"
              :class="{'pr-0': index === ionsTotal - 1}"
            >
              <template v-if="value">
                {{ format(value, 3) }}
              </template>
              <template v-else>
                —
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
    <TheElementsRatios
      :concentration="recipe.concentration"
      class="mt-8"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineOptions({
  name: 'TheElementsTable',
});

const props = defineProps<{
  recipe: InstanceType<typeof FertilizerRecipe>;
}>();

const concentrationPerReagentWithoutWater = computed(() => {
  const result = { ...props.recipe.concentrationPerReagent };
  delete result[H2O];
  return result;
});

const concentrationSorted = computed(() => {
  return sortObject(props.recipe.concentration);
});

const ionsTotal = computed(() => {
  return Object.keys(props.recipe.concentration).length;
});
</script>

<style scoped>

</style>
