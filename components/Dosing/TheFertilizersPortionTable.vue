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
    <v-radio-group
      v-model="fertilizersRegime"
      color="primary"
      class="my-2"
      hide-details="auto"
      :inline="$vuetify.display.smAndUp"
    >
      <v-radio
        label="Каждый день"
        :value="0"
      />
      <v-radio
        label="В подменную воду"
        :value="1"
        class="mt-1 mt-sm-0"
      />
      <v-radio
        label="Комбинированная подача"
        :value="2"
        class="mt-1 mt-sm-0"
      />
    </v-radio-group>
    <template v-if="fertilizersRegime === FertilizersRegime.EVERY_DAY">
      <div class="text-subtitle-1 w-40 font-weight-medium w-100">
        <v-select
          v-model="isTotalMode"
          :items="mode"
          item-title="text"
          item-value="value"
          variant="underlined"
          class="mt-0 pt-0"
          hide-details="auto"
        />
      </div>
      <div
        v-for="(portion, index) in portions"
        :key="index"
        class="d-flex justify-space-between align-center"
      >
        <div class="d-flex w-100">
          <BaseNumberField
            v-if="isTotalMode"
            v-model="portion.amount"
            :label="portion.fertilizer.name"
            :suffix="portion.fertilizer.volume > 0 ? 'мл' : 'г'"
            hide-details="auto"
          />
          <BaseNumberField
            v-else
            v-model="portion.amountDay"
            :label="portion.fertilizer.name"
            :suffix="portion.fertilizer.volume > 0 ? 'мл/день' : 'г/день'"
            hide-details="auto"
          />
        </div>
      </div>
    </template>
    <template v-else-if="fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
      <BaseNumberField
        v-model="waterChangeVolume"
        label="Введите объем подмены"
        hint="Это нужно для подсчета дозы на подмену"
        class="mt-4"
      />
      <div class="d-flex mt-4">
        <div class="text-subtitle-1 font-weight-medium w-100 pr-2">
          <span style="position: relative; top: 3px;">
            Весь объем удобрений
          </span>
          <v-divider class="mt-1" />
        </div>
      </div>
      <div
        v-for="(portion, index) in portions"
        :key="index"
        class="d-flex justify-space-between align-center"
      >
        <BaseNumberField
          v-model="portion.amount"
          :label="portion.fertilizer.name"
          :suffix="portion.fertilizer.volume > 0 ? 'мл' : 'г'"
          hide-details="auto"
          class="pr-2"
        />
      </div>
    </template>
    <template v-else-if="fertilizersRegime === FertilizersRegime.MIX">
      <BaseNumberField
        v-model="waterChangeVolume"
        label="Введите объем подмены"
        hint="Это нужно для подсчета дозы на подмену"
        class="mt-4"
      />
      <div class="d-flex mt-4">
        <div class="font-weight-medium align-self-end w-60 pr-2">
          <span style="position: relative; top: 3px;">
            Подмена
          </span>
          <v-divider class="mt-1" />
        </div>
        <div class="w-40 font-weight-medium">
          <v-select
            v-model="isTotalMode"
            :items="mode"
            item-title="text"
            item-value="value"
            variant="underlined"
            hide-details="auto"
          />
        </div>
      </div>
      <div
        v-for="(portion, index) in portions"
        :key="index"
        class="d-flex justify-space-between align-center"
      >
        <BaseNumberField
          v-model="portion.amountWaterChange"
          :label="portion.fertilizer.name"
          :suffix="portion.fertilizer.volume > 0 ? 'мл' : 'г'"
          hide-details="auto"
          class="pr-2 w-60"
        />
        <div class="d-flex w-40">
          <BaseNumberField
            v-if="isTotalMode"
            v-model="portion.amount"
            :suffix="portion.fertilizer.volume > 0 ? 'мл' : 'г'"
            hide-details="auto"
          />
          <BaseNumberField
            v-else
            v-model="portion.amountDay"
            :suffix="portion.fertilizer.volume > 0 ? 'мл/день' : 'г/день'"
            hide-details="auto"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { FertilizersRegime } from '~/utils/types/types';

defineOptions({
  name: 'FertilizersPortionTable',
});

const portions = defineModel<Portion<Recipe>[]>('portions');
const waterChangeVolume = defineModel<number>('waterChangeVolume');

const dosingStore = useDosingStore();

const isTotalMode = computed({
  get() {
    return dosingStore.isTotalMode;
  },
  set(value) {
    dosingStore.setTotalMode(value);
  },
});

const fertilizersRegime = computed({
  get() {
    return dosingStore.fertilizersRegime;
  },
  set(value) {
    dosingStore.setFertilizersRegime(value);
  },
});

const mode = [
  { text: 'Ежедневно', value: false },
  { text: 'Всего', value: true },
];
</script>

<style lang="sass" scoped>
.w-60
  width: 60%
.w-50
  width: 50%
.w-40
  width: 40%
</style>
