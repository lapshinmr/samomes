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
    <div class="d-flex flex-column flex-md-row justify-space-between align-md-center mt-2 mb-2">
      <v-switch
        v-model="isHardness"
        color="primary"
        :label="t('dosing.elementsTable.showGh')"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0"
      />
      <slot />
    </div>
    <v-table density="compact">
      <thead>
        <tr>
          <th class="pl-0 text-center">
            {{ t('dosing.elementsTable.element') }}
          </th>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.EVERY_DAY">
            <th class="text-center">
              {{ t('dosing.elementsTable.everyDayDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.totalDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
            <th class="text-center">
              {{ t('dosing.elementsTable.inWaterChangeDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.totalDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.MIX">
            <th class="text-center">
              {{ t('dosing.elementsTable.inWaterChangeDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.inDayWeekDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.totalDose') }}, <span class="text-no-wrap">{{ t('units.mg/l') }}</span>
            </th>
          </template>
          <th
            v-if="isHardness"
            class="text-center"
          >
            Gh
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[ion, value] in dosing.concentrationSorted"
          :key="ion"
          class="caption regular-sm"
        >
          <td class="pl-0 text-center">
            {{ ion }}
          </td>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.EVERY_DAY">
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentrationDay),
              }"
            >
              {{ format(value.concentrationDay) }}
            </td>
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentration),
              }"
            >
              {{ format(value.concentration) }}
            </td>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentrationWaterChange),
              }"
            >
              {{ format(value.concentrationWaterChange) }}
            </td>
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentrationTotal),
              }"
            >
              {{ format(value.concentrationTotal) }}
            </td>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.MIX">
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentrationWaterChange),
              }"
            >
              {{ format(value.concentrationWaterChange) }}
            </td>
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentrationDay),
              }"
            >
              {{ format(value.concentrationDay) }} / {{ format(value.concentration) }}
            </td>
            <td
              class="text-center text-no-wrap"
              :class="{
                'text-caption': isSmallNumber(value.concentrationTotal),
              }"
            >
              {{ format(value.concentrationTotal) }}
            </td>
          </template>
          <td
            v-if="isHardness"
            class="text-center"
          >
            <template v-if="ion in RemineralRecipe.GH">
              <template
                v-if="[
                  FertilizersRegime.ONCE_A_WEEK,
                  FertilizersRegime.EVERY_DAY
                ].includes(dosingStore.fertilizersRegime)"
              >
                +{{ format(value.concentration / RemineralRecipe.GH[ion]) }}
              </template>
              <template v-if="FertilizersRegime.MIX === dosingStore.fertilizersRegime">
                +{{ format(value.concentrationTotal / RemineralRecipe.GH[ion]) }}
              </template>
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
    <TheElementsRatios
      :concentration="dosing.concentrationTotal"
      :is-gh="isHardness"
      class="mt-8"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const dosingStore = useDosingStore();

defineOptions({
  name: 'TheElementsTable',
});

defineProps<{
  dosing: InstanceType<typeof Dosing>;
}>();

const isHardness = computed({
  get() {
    return dosingStore.isHardness;
  },
  set(isHardness: boolean) {
    dosingStore.setHardness(isHardness);
  },
});

function smallNumber(value: number) {
  if (value < 0.001 && value !== 0) {
    return t('dosing.smallValue');
  }
  return value;
}

function isSmallNumber(value: number) {
  return value < 0.01;
}
</script>

<style scoped>

</style>
