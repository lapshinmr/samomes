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
            {{ t('common.element') }}
          </th>
          <th
            v-for="([ion], index) in concentrationSorted"
            :key="ion"
            class="text-center"
            :class="{'pr-0': index === ionsTotal - 1}"
          >
            <div style="white-space: nowrap;">
              {{ ion }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="font-weight-medium">
          <td class="pl-0 text-center">
            {{ t('reminerals.page.concentration') }}, {{ remineral.isLiquid ? t('units.g/l') : t('units.g/1g') }}
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
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineOptions({
  name: 'TheSoluteElementsTable',
});

const props = defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
}>();

const concentrationSorted = computed(() => {
  return sortObject(props.remineral.concentrationWithoutHCO3);
});

const ionsTotal = computed(() => {
  return Object.keys(props.remineral.concentrationWithoutHCO3).length;
});
</script>

<style scoped>

</style>
