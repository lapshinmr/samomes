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
        label="Показать повышение жесткости"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0"
      />
    </div>
    <v-table dense>
      <thead>
        <tr>
          <th class="pl-0 text-center">
            Элемент
          </th>
          <th
            v-if="isHardness"
            class="text-center"
          >
            dGh
          </th>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.EVERY_DAY">
            <th class="text-center">
              Общая доза, <span>мг/л</span>
            </th>
            <th class="text-center">
              В день, <span>мг/л</span>
            </th>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
            <th class="text-center">
              В подмене, <span>мг/л</span>
            </th>
            <th class="text-center">
              В аквариуме, <span>мг/л</span>
            </th>
            <th class="text-center">
              В день, <span>мг/л</span>
            </th>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.MIX">
            <th class="text-center">
              В подмене, <span>мг/л</span>
            </th>
            <th class="text-center">
              В день/неделю, <span>мг/л</span>
            </th>
            <th class="text-center">
              Общая доза, <span>мг/л</span>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[ion, value] in dosing.totalElementsSorted"
          :key="ion"
          class="caption regular-sm"
        >
          <td class="pl-0 text-center">
            {{ ion }}
          </td>
          <td
            v-if="isHardness"
            class="text-center"
          >
            <template v-if="ion in GH">
              <template
                v-if="[
                  FertilizersRegime.ONCE_A_WEEK,
                  FertilizersRegime.EVERY_DAY
                ].includes(dosingStore.fertilizersRegime)"
              >
                +{{ format(value.concentration / GH[ion]) }}
              </template>
              <template v-if="FertilizersRegime.MIX === dosingStore.fertilizersRegime">
                +{{ format(value.concentrationTotal / GH[ion]) }}
              </template>
            </template>
          </td>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.EVERY_DAY">
            <td class="text-center text-no-wrap">
              {{ format(value.concentration) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ format(value.concentrationDay) }}
            </td>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
            <td class="text-center text-no-wrap">
              {{ format(value.concentrationWaterChange) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ format(value.concentration) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ format(value.concentrationDay) }}
            </td>
          </template>
          <template v-if="dosingStore.fertilizersRegime === FertilizersRegime.MIX">
            <td class="text-center text-no-wrap">
              {{ format(value.concentrationWaterChange) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ format(value.concentrationDay) }} / {{ format(value.concentration) }}
            </td>
            <td class="text-center text-no-wrap">
              {{ format(value.concentrationTotal) }}
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
    <CommonTheElementsRatios :concentration="dosing.totalConcentration"/>
  </div>
</template>

<script lang="ts" setup>
const dosingStore = useDosingStore();

defineOptions({
  name: 'TheElementsTable',
});

defineProps<{
  dosing: Dosing;
}>();

const isHardness = computed({
  get() {
    return dosingStore.isHardness;
  },
  set(isHardness: boolean) {
    dosingStore.setHardness(isHardness);
  },
});
</script>

<style scoped>

</style>
