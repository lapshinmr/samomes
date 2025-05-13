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
    <div class="d-flex align-center mt-2 mb-2">
      <v-switch
        v-model="isHardness"
        color="primary"
        :label="t('dosing.elementsTable.showGh')"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0"
      />
    </div>
    <v-table density="compact">
      <thead>
        <tr>
          <th class="pl-0 text-center">
            {{ t('dosing.elementsTable.element') }}
          </th>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.EVERY_DAY">
            <th class="text-center">
              {{ t('dosing.elementsTable.everyDayDose') }} <span>{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.totalDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
            <th class="text-center">
              {{ t('dosing.elementsTable.inWaterChangeDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.everyDayDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.totalDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.MIX">
            <th class="text-center">
              {{ t('dosing.elementsTable.inWaterChangeDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.inDayWeekDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
            <th class="text-center">
              {{ t('dosing.elementsTable.totalDose') }}, <span>{{ t('units.mg/l') }}</span>
            </th>
          </template>
          <th
            v-if="isHardness"
            class="text-center"
          >
            dGh
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
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentrationDay)) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentration)) }}
            </td>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentrationWaterChange)) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentrationDay)) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentration)) }}
            </td>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.MIX">
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentrationWaterChange)) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentrationDay)) }} / {{ smallNumber(format(value.concentration)) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ smallNumber(format(value.concentrationTotal)) }}
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
    <CommonTheElementsRatios
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
</script>

<style scoped>

</style>
