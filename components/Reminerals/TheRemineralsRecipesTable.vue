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
            {{ t('common.total') }}
          </th>
        </template>
        <template v-else>
          <th class="text-left">
            {{ t('reminerals.page.remineralVolume') }}, {{ t('units.ml') }}
          </th>
        </template>
        <th class="text-left">
          Gh/Kh
        </th>
        <th class="text-left">
          {{ t('common.volume') }}
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
            {{ format(countReagentsMassByGh(item.gh, item.volume)[reagentName]) }} {{ t('units.g') }}
          </td>
          <td>
            {{ format(countReagentsMassByGh(item.gh, item.volume).total) }} {{ t('units.g') }}
          </td>
        </template>
        <template v-else>
          <td>
            {{ format(countVolume(item.gh, item.volume)) }} {{ t('units.ml') }}
          </td>
        </template>
        <td>{{ format(item.gh) }} / {{ format(countKhByGh(item.gh)) }}</td>
        <td>{{ item.volume }} {{ t('units.l') }}</td>
      </tr>
      <tr>
        <template v-if="remineral.isDry">
          <td
            v-for="reagentName in reagentsNames"
            :key="reagentName"
          >
            {{ format(countReagentsMassByGh(customGh, customVolume)[reagentName]) }} {{ t('units.g') }}
          </td>
          <td>
            {{ format(countReagentsMassByGh(customGh, customVolume).total) }} {{ t('units.g') }}
          </td>
        </template>
        <template v-else>
          <td>
            {{ format(countVolume(customGh, customVolume)) }} {{ t('units.ml') }}
          </td>
        </template>
        <td>
          <div class="d-flex align-center mt-n4">
            <div style="width: 40px;">
              <NumberField
                v-model.number="customGh"
                placeholder="Gh"
                class="mt-0 pt-0"
                hide-details="auto"
                @update:model-value="onInputCustomGh"
              />
            </div>
            <div class="mx-2 align-self-end text-h5 font-weight-light">
              /
            </div>
            <div style="width: 40px;">
              <NumberField
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
            class="d-flex align-center mt-n4"
            style="width: 60px"
          >
            <NumberField
              v-model.number="customVolume"
              :suffix="t('units.l')"
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
const { t } = useI18n();

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
