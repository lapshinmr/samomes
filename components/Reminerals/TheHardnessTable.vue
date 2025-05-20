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
    <div
      v-if="remineral.isDry"
      class="d-flex mb-4"
    >
      <div class="mx-2 align-self-end mb-1">
        <span class="font-weight-medium">{{ format(remineral.totalMass) }} {{ t('units.g') }}</span>
        {{ t('reminerals.page.explanation.dry') }}
      </div>
      <div style="width: 60px;">
        <NumberField
          v-model="changeVolume"
          :suffix="t('units.l')"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
    </div>
    <div
      v-else
      class="d-flex mb-4"
    >
      <div style="width: 80px;">
        <NumberField
          v-model="doseVolume"
          :suffix="t('units.ml')"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
      <div class="mx-3 align-self-end mb-1">
        {{ t('reminerals.page.explanation.liquid') }}
      </div>
      <div style="width: 60px;">
        <NumberField
          v-model="changeVolume"
          :suffix="t('units.l')"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
    </div>
    <div class="d-flex">
      <NumberField
        v-model="gh"
        label="Gh"
        suffix="Gh"
        variant="outlined"
        hide-details="auto"
        persistent-hint
        class="mb-2"
        :disabled="gh === null"
      />
      <NumberField
        v-model="kh"
        label="Kh"
        suffix="Kh"
        variant="outlined"
        hide-details="auto"
        persistent-hint
        class="mb-2 ml-2"
        :disabled="kh === null || khDisabled"
      />
      <NumberField
        v-model="caMgRatio"
        label="Ca / Mg"
        variant="outlined"
        hide-details="auto"
        persistent-hint
        class="mb-2 ml-2"
        :disabled="caMgRatio === null || caMgRatioDisabled"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const changeVolume = defineModel<number>('changeVolume');
const doseVolume = defineModel<number>('doseVolume');
const gh = defineModel<number>('gh');
const kh = defineModel<number>('kh');
const caMgRatio = defineModel<number>('caMgRatio');

withDefaults(defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
  khDisabled?: boolean;
  caMgRatioDisabled?: boolean;
}>(), {
  khDisabled: false,
  caMgRatioDisabled: false,
});
</script>
