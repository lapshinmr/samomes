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
      class="my-2 ml-n3"
      hide-details="auto"
      :inline="$vuetify.display.smAndUp"
    >
      <v-radio
        :label="t('dosing.dosesTable.regime1')"
        :value="0"
      />
      <v-radio
        :label="t('dosing.dosesTable.regime2')"
        :value="1"
        class="mt-1 mt-sm-0"
      />
      <v-radio
        :label="t('dosing.dosesTable.regime3')"
        :value="2"
        class="mt-1 mt-sm-0"
      />
    </v-radio-group>
    <template v-if="fertilizersRegime === FertilizersRegime.EVERY_DAY">
      <div class="d-flex">
        <v-select
          v-model="isTotalMode"
          :items="mode"
          item-title="text"
          item-value="value"
          variant="underlined"
          class="w-60 pr-2"
          hide-details="auto"
        />
        <NumberField
          v-model="daysTotal"
          hide-details="auto"
          class="w-40"
          :label="t('dosing.dosesTable.daysTotal')"
          :rules="[positive]"
        />
      </div>
      <div
        v-for="(dose, index) in dosingStore.doseModels"
        :key="index"
        class="d-flex justify-space-between align-center"
      >
        <div class="d-flex w-100">
          <NumberField
            v-if="isTotalMode"
            :model-value="format(dose.amount)"
            :label="dose.fertilizer.name"
            :suffix="dose.fertilizer.isLiquid ? t('units.ml') : t('units.g')"
            hide-details="auto"
            @update:model-value="dosingStore.updateAmount($event, index)"
          />
          <NumberField
            v-else
            :model-value="format(dose.amountDay)"
            :label="dose.fertilizer.name"
            :suffix="dose.fertilizer.isLiquid ? t('units.ml/d') : t('units.g/d')"
            hide-details="auto"
            @update:model-value="dosingStore.updateAmountDay($event, index)"
          />
        </div>
      </div>
    </template>
    <template v-else-if="fertilizersRegime === FertilizersRegime.ONCE_A_WEEK">
      <div class="d-flex align-start">
        <NumberField
          v-model="waterChangeVolume"
          :label="t('dosing.dosesTable.waterChange')"
          :hint="t('dosing.dosesTable.waterChangeHint')"
          persistent-hint
          class="pr-2 w-60"
          validate-on="eager"
          :rules="[required, positive]"
        />
        <NumberField
          v-model="daysTotal"
          hide-details="auto"
          class="w-40"
          :label="t('dosing.dosesTable.daysTotal')"
          :rules="[positive]"
        />
      </div>
      <div class="d-flex mt-4">
        <div class="text-subtitle-1 font-weight-medium w-100 pr-2">
          <span style="position: relative; top: 3px;">
            {{ t('dosing.dosesTable.doseTotal') }}
          </span>
          <v-divider class="mt-1" />
        </div>
      </div>
      <div
        v-for="(dose, index) in dosingStore.doseModels"
        :key="index"
        class="d-flex justify-space-between align-center"
      >
        <NumberField
          :model-value="format(dose.amount)"
          :label="dose.fertilizer.name"
          :suffix="dose.fertilizer.isLiquid ? t('units.ml') : t('units.g')"
          hide-details="auto"
          class="pr-2"
          :disabled="!waterChangeVolume"
          @update:model-value="dosingStore.updateAmount($event, index)"
        />
      </div>
    </template>
    <template v-else-if="fertilizersRegime === FertilizersRegime.MIX">
      <div class="d-flex align-start">
        <NumberField
          v-model="waterChangeVolume"
          :label="t('dosing.dosesTable.waterChange')"
          :hint="t('dosing.dosesTable.waterChangeHint')"
          persistent-hint
          class="pr-2 w-60"
          validate-on="eager"
          :rules="[required, positive]"
        />
        <NumberField
          v-model="daysTotal"
          hide-details="auto"
          :label="t('dosing.dosesTable.daysTotal')"
          class="w-40"
          :rules="[positive]"
        />
      </div>
      <div class="d-flex">
        <div class="font-weight-medium align-self-end w-60 pr-2">
          <span style="position: relative; top: 3px;">
            {{ t('dosing.dosesTable.waterChangeTitle') }}
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
        v-for="(dose, index) in dosingStore.doseModels"
        :key="index"
        class="d-flex justify-space-between align-center"
      >
        <NumberField
          :model-value="format(dose.amountWaterChange)"
          :label="dose.fertilizer.name"
          :suffix="dose.fertilizer.isLiquid ? t('units.ml') : t('units.g')"
          hide-details="auto"
          class="pr-2 w-60"
          :disabled="!waterChangeVolume"
          @update:model-value="dosingStore.updateAmountWaterChange($event, index)"
        />
        <div class="d-flex w-40">
          <NumberField
            v-if="isTotalMode"
            :model-value="format(dose.amount)"
            :suffix="dose.fertilizer.isLiquid ? t('units.ml') : t('units.g')"
            hide-details="auto"
            @update:model-value="dosingStore.updateAmount($event, index)"
          />
          <NumberField
            v-else
            :model-value="format(dose.amountDay)"
            :suffix="dose.fertilizer.isLiquid ? t('units.ml/d') : t('units.g/d')"
            hide-details="auto"
            @update:model-value="dosingStore.updateAmountDay($event, index)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { FertilizersRegime } from '~/utils/types/types';

const { t } = useI18n();
const { required, positive } = useValidation();

const mode = [
  { text: t('dosing.dosesTable.everyDay'), value: false },
  { text: t('dosing.dosesTable.total'), value: true },
];

const dosingStore = useDosingStore();

const isTotalMode = computed({
  get() { return dosingStore.isTotalMode; },
  set(value) { dosingStore.setTotalMode(value); },
});

const daysTotal = computed({
  get() { return dosingStore.daysTotal; },
  set(value) { dosingStore.setDaysTotal(value); },
});

const fertilizersRegime = computed({
  get() { return dosingStore.fertilizersRegime; },
  set(value) { dosingStore.setFertilizersRegime(value); },
});

const waterChangeVolume = computed({
  get() { return dosingStore.tank.waterChangeVolume; },
  set(value) { dosingStore.setWaterChangeVolume(value); },
});

defineOptions({
  name: 'TheFertilizersDosesTable',
});
</script>

<style lang="sass" scoped>
.w-60
  width: 60%
.w-50
  width: 50%
.w-40
  width: 40%
</style>
