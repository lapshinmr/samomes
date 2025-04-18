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
  <v-table>
    <thead>
      <tr>
        <template v-if="remineral.isDry">
          <th
            v-for="reagentName in reagentsNames"
            :key="reagentName"
            class="text-left"
          >
            {{ reagentName }}
          </th>
          <th>
            Сумма
          </th>
        </template>
        <template v-else>
          <th class="text-left">
            Объем реминерализатора, мл
          </th>
        </template>
        <th class="text-left">
          Gh/Kh
        </th>
        <th class="text-left">
          Объем
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in HARDNESS_VOLUMES"
        :key="index"
      >
        <template v-if="remineral.isDry">
          <td
            v-for="reagentName in reagentsNames"
            :key="reagentName"
          >
            {{ format(countReagentsMassByGh(item.gh, item.volume)[reagentName]) }} г
          </td>
          <td>
            {{ format(countReagentsMassByGh(item.gh, item.volume).total) }} г
          </td>
        </template>
        <template v-else>
          <td>
            {{ format(countVolume(item.gh, item.volume)) }} мл
          </td>
        </template>
        <td>{{ format(item.gh) }} / {{ format(countKhByGh(item.gh)) }}</td>
        <td>{{ item.volume }} л</td>
      </tr>
      <tr>
        <template v-if="remineral.isDry">
          <td
            v-for="reagentName in reagentsNames"
            :key="reagentName"
          >
            {{ format(countReagentsMassByGh(customGh, customVolume)[reagentName]) }} г
          </td>
          <td>
            {{ format(countReagentsMassByGh(customGh, customVolume).total) }} г
          </td>
        </template>
        <template v-else>
          <td>
            {{ format(countVolume(customGh, customVolume)) }} мл
          </td>
        </template>
        <td>
          <div class="d-flex align-center">
            <div style="width: 40px;">
              <BaseNumberField
                v-model.number="customGh"
                placeholder="Gh"
                class="mt-0 pt-0"
                hide-details="auto"
                @update:model-value="onInputCustomGh"
              />
            </div>
            <div class="mx-2">
              /
            </div>
            <div style="width: 40px;">
              <BaseNumberField
                v-model.number="customKh"
                placeholder="Kh"
                :disabled="customKh === 0"
                class="mt-0 pt-0"
                hide-details="auto"
                @update:model-value="onInputCustomKh"
              />
            </div>
          </div>
        </td>
        <td>
          <div
            class="d-flex align-center"
            style="width: 60px"
          >
            <BaseNumberField
              v-model.number="customVolume"
              suffix="л"
              class="mt-0 pt-0"
              hide-details="auto"
              @update:model-value="onInputCustomVolume"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'TheRemineralsRecipesTable',
});

const props = defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
  reagents: InstanceType<typeof Reagent>[];
}>();

const HARDNESS_VOLUMES = [
  { gh: 1, volume: 10 },
  { gh: 6, volume: 10 },
  { gh: 8, volume: 10 },
];

const customGh = ref(null);
const customKh = ref(null);
const customVolume = ref(props.remineral.changeVolume);

const reagentsNames = computed(() => {
  return props.reagents.map((reagent) => reagent.key);
});

function countReagentsMassByGh(dstGh: number, dstVolume: number) {
  const factorGh = props.remineral.gh / dstGh;
  const factorVolume = props.remineral.changeVolume / dstVolume;
  const factor = factorGh * factorVolume;
  const reagentsChanged = { total: 0 };
  props.reagents.forEach((reagent) => {
    reagentsChanged[reagent.key] = reagent.amount / factor;
    reagentsChanged.total += reagent.amount / factor;
  });
  return reagentsChanged;
}

function countVolume(dstGh: number, volume: number) {
  console.log(props.remineral.doseVolume, volume, props.remineral.changeVolume, dstGh, props.remineral.gh);
  return props.remineral.doseVolume * (volume / props.remineral.changeVolume) * (dstGh / props.remineral.gh);
}

function countKhByGh(gh: number): number {
  return (props.remineral.kh / props.remineral.gh) * gh;
}

function countGhByKh(kh: number): number {
  return (props.remineral.gh / props.remineral.kh) * kh;
}

function onInputCustomGh(value: number) {
  customKh.value = countKhByGh(value);
}

function onInputCustomKh(value: number) {
  customGh.value = countGhByKh(value);
}

function onInputCustomVolume(value: number) {
  customVolume.value = value;
}
</script>
