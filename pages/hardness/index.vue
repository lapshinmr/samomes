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
  <v-container class="mb-10">
    <v-row>
      <page-title>
        {{ t('hardness.title') }}
        <template #button>
          <v-btn
            color="primary"
            @click="onReset"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </template>
      </page-title>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <client-only>
          <v-combobox
            v-model.number="hardnessStore.tank"
            :items="tanks"
            item-title="name"
            variant="underlined"
            :label="t('hardness.tankInputLabel')"
            :hint="t('hardness.tankInputHint')"
            persistent-hint
            hide-selected
            :rules="[required]"
            class="mb-4"
            @update:model-value="onChooseTank"
          />
          <v-expand-transition>
            <div v-if="hardnessStore.tank?.volume">
              <div class="mt-2 mt-sm-6">
                {{ t('hardness.waterChangeType') }}
              </div>
              <div class="d-flex flex-column flex-md-row">
                <v-radio-group
                  v-model="remineralizationType"
                  class="my-2 ml-n2"
                  color="primary"
                  hide-details="auto"
                  :inline="smAndUp"
                >
                  <v-radio
                    :label="t('hardness.osmosisAndRem')"
                    :value="RemineralizationTypes.REM"
                  />
                  <v-radio
                    :label="t('hardness.osmosisAndTap')"
                    :value="RemineralizationTypes.TAP"
                    class="mt-1 mt-sm-0"
                  />
                  <v-radio
                    :label="t('hardness.otherType')"
                    :value="RemineralizationTypes.MIX"
                    class="mt-1 mt-sm-0"
                  />
                </v-radio-group>
                <v-checkbox
                  v-model="isTests"
                  color="primary"
                  :label="t('hardness.isTests')"
                />
              </div>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <div v-if="hardnessStore.tank?.volume && remineralizationType !== null">
              <div class="text-subtitle-1">
                {{ t('hardness.chooseVolumeHint') }}
              </div>
              <div class="d-flex flex-column flex-sm-row align-sm-center">
                <NumberField
                  :model-value="hardnessStore.tank.waterChangeVolume"
                  :label="t('hardness.volumeInputLabel')"
                  :hint="t('hardness.volumeInputHint')"
                  persistent-hint
                  :suffix="t('units.l')"
                  class="pt-0 mt-0"
                  append-icon="mdi-arrow-up-bold-circle-outline"
                  @update:model-value="onInputWaterChangeVolume"
                  @click:append="onInputWaterChangeVolume(hardnessStore.tank.volume)"
                />
                <NumberField
                  :model-value="hardnessStore.tank.waterChangePercent"
                  :label="t('hardness.changeInputLabel')"
                  :hint="t('hardness.changeInputHint')"
                  persistent-hint
                  suffix="%"
                  class="pt-0 mt-0 ml-sm-3"
                  append-icon="mdi-arrow-up-bold-circle-outline"
                  @update:model-value="onInputWaterChangePercent"
                  @click:append="onInputWaterChangePercent(100)"
                />
                <NumberField
                  v-if="[RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)"
                  :model-value="hardnessStore.osmosisChangePercent"
                  :label="t('hardness.osmosisPercentLabel')"
                  :hint="t('hardness.osmosisPercentHint', {
                    osmosisChangeVolume: toFixed(hardnessStore.osmosisChangeVolume, 1),
                    tapChangeVolume: toFixed(hardnessStore.tapChangeVolume, 1),
                  })"
                  persistent-hint
                  class="mt-0 pt-0 ml-sm-3"
                  single-line
                  suffix="%"
                  append-icon="mdi-arrow-up-bold-circle-outline"
                  @update:model-value="inputOsmosisChange"
                  @click:append="inputOsmosisChange(100)"
                />
              </div>
              <v-expand-transition>
                <div
                  v-if="isTests
                    || [RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)"
                >
                  <div class="text-headline mt-8">
                    {{ t('hardness.initHardness') }}
                  </div>
                  <div class="d-flex">
                    <NumberField
                      v-if="[RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)"
                      v-model="ghWaterChange"
                      :label="t('hardness.tapWaterGh')"
                      suffix="Gh"
                      hide-details="auto"
                    />
                    <NumberField
                      v-if="isTests"
                      v-model="ghInit"
                      :label="t('hardness.tankWaterGh')"
                      suffix="Gh"
                      hide-details="auto"
                      :class="{
                        'ml-3': [RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)
                      }"
                    />
                  </div>
                  <div class="d-flex">
                    <NumberField
                      v-if="[RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)"
                      v-model="khWaterChange"
                      :label="t('hardness.tapWaterKh')"
                      suffix="Kh"
                      hide-details="auto"
                    />
                    <NumberField
                      v-if="isTests"
                      v-model="khInit"
                      :label="t('hardness.tankWaterKh')"
                      suffix="Kh"
                      hide-details="auto"
                      :class="{
                        'ml-3': [RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)
                      }"
                    />
                  </div>
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <div
              v-if="
                hardnessStore.tank?.volume
                  && [RemineralizationTypes.REM, RemineralizationTypes.MIX].includes(remineralizationType)
              "
              class="mt-8"
            >
              <div class="d-flex flex-column flex-sm-row align-md-center mb-8">
                <Combobox
                  :model-value="hardnessStore.doseModels"
                  :items="allFertilizers"
                  variant="underlined"
                  :label="t('dosing.fertilizersInputLabel')"
                  :hint="t('dosing.fertilizersInputHint')"
                  item-title="fertilizer.name"
                  persistent-hint
                  multiple
                  chips
                  closable-chips
                  class="mb-4"
                  @update:model-value="onInputFertilizer"
                />
                <v-switch
                  v-model="isDefaultFertilizers"
                  color="primary"
                  :label="t('dosing.switch')"
                  class="ml-md-4 flex-shrink-0"
                />
              </div>
            </div>
          </v-expand-transition>
          <div
            v-for="(dose, index) in hardnessStore.doseModels"
            :key="`dose_${index}`"
          >
            <NumberField
              :model-value="dose.amount"
              :label="dose.fertilizer.name"
              :suffix="dose.fertilizer.isLiquid ? t('units.ml') : t('units.g')"
              hide-details="auto"
              class="mb-2"
              @update:model-value="hardnessStore.updateAmountDay($event, index)"
            />
          </div>
          <v-expand-transition>
            <div
              v-if="hardnessStore.tank?.volume && remineralizationType !== null"
              class="mt-8"
            >
              <div class="text-subtitle-1 mb-2">
                {{ t('hardness.resultHardness') }}
              </div>
              <div>
                <div class="d-flex">
                  <v-text-field
                    :model-value="format(hardnessModel.countWaterChangeGh(
                      ghWaterChange, hardnessStore.osmosisChangePercent))"
                    :label="t('hardness.result.changeWaterGh')"
                    suffix="Gh"
                    hide-details="auto"
                    readonly
                    variant="outlined"
                    persistent-hint
                    class="mb-3"
                    :rules="[rulesCalculation]"
                  />
                  <v-text-field
                    v-if="isTests"
                    :model-value="format(hardnessModel.countTotalGh(
                      ghInit, ghWaterChange, hardnessStore.osmosisChangePercent))"
                    :label="t('hardness.result.tankWaterGh')"
                    suffix="Gh"
                    hide-details="auto"
                    readonly
                    variant="outlined"
                    persistent-hint
                    class="mb-3 ml-3"
                    :rules="[rulesCalculation]"
                  />
                </div>
                <div class="d-flex">
                  <v-text-field
                    :model-value="format(hardnessModel.countWaterChangeKh(
                      khWaterChange, hardnessStore.osmosisChangePercent))"
                    :label="t('hardness.result.changeWaterKh')"
                    suffix="Kh"
                    hide-details="auto"
                    readonly
                    variant="outlined"
                    persistent-hint
                    :rules="[rulesCalculation]"
                  />
                  <v-text-field
                    v-if="isTests"
                    :model-value="format(hardnessModel.countTotalKh(
                      khInit, khWaterChange, hardnessStore.osmosisChangePercent))"
                    :label="t('hardness.result.tankWaterKh')"
                    suffix="Kh"
                    hide-details="auto"
                    readonly
                    variant="outlined"
                    persistent-hint
                    class="ml-3"
                    :rules="[rulesCalculation]"
                  />
                </div>
              </div>
            </div>
          </v-expand-transition>
        </client-only>
      </v-col>
      <Guide>
        {{ t('hardness.hints.p1') }}
      </Guide>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { RemineralizationTypes } from '~/utils/types/types';

const { t, locale } = useI18n();

const { required } = useValidation();
const { smAndUp } = useDisplay();
const hardnessStore = useHardnessStore();
const tanksStore = useTanksStore();
const fertilizerRecipesStore = useRecipesStore();
const fertilizersStore = useFertilizersStore();
const remineralRecipesStore = useRemineralsStore();
const snackbarStore = useSnackbarStore();

const tanks = tanksStore.tankModels.map((item) => item.toJson());

const ghInit = ref(0);
const khInit = ref(0);
const ghWaterChange = ref(0);
const khWaterChange = ref(0);

const rulesCalculation = (v) => (!Number.isNaN(+v) && +v !== Infinity) || 'Проверьте вводимые параметры';

const hardnessModel = computed(() => {
  return new Hardness(
    hardnessStore.doseModels,
    hardnessStore.tank,
  );
});

const isDefaultFertilizers = computed({
  get() {
    return hardnessStore.isDefaultFertilizers;
  },
  set(value) {
    hardnessStore.setDefaultFertilizers(value);
    snackbarStore.show(
      value
        ? 'Фирменные удобрения добавлены в список'
        : 'Фирменные удобрения удалены из списка',
    );
  },
});

// TODO: refactor this and similar places
const fertilizers = [...FERTILIZERS];
if (locale.value === 'en') {
  FERTILIZER_NAMES_EN.forEach((item) => {
    const fertilizer = fertilizers.find((fertilizer) => item.key === fertilizer.key);
    if (fertilizer) {
      fertilizer.name = item.name;
      fertilizer.description = item.description;
    }
  });
}

const fertilizersSorted = fertilizers.sort((a, b) => a.name.localeCompare(b.name));

// TODO: move to composables
const allFertilizers = computed(() => {
  let defaultFertilizersFiltered = [];
  if (isDefaultFertilizers.value) {
    const recipesNames = fertilizerRecipesStore.fertilizerRecipes.map((item) => item.name);
    const fertilizersNames = fertilizersStore.fertilizers.map((item) => item.name);
    const remineralsNames = remineralRecipesStore.remineralRecipes.map((item) => item.name);
    defaultFertilizersFiltered = fertilizersSorted.filter(
      (item) => ![...recipesNames, ...fertilizersNames, ...remineralsNames].includes(item.name),
    );
  }
  return [
    ...fertilizerRecipesStore.fertilizerRecipes.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizerRecipe,
      daysTotal: 1,
    })),
    ...fertilizersStore.fertilizers.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizer,
      daysTotal: 1,
    })),
    ...remineralRecipesStore.remineralRecipes.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.remineralRecipe,
      daysTotal: 1,
    })),
    ...defaultFertilizersFiltered.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizer,
      daysTotal: 1,
    })),
  ];
});

const remineralizationType = computed({
  get() {
    return hardnessStore.remineralizationType;
  },
  set(value) {
    hardnessStore.setRemineralizationType(value);
    hardnessStore.setDoses([]);
    ghInit.value = 0;
    khInit.value = 0;
    ghWaterChange.value = 0;
    khWaterChange.value = 0;
  },
});

const isTests = computed({
  get() {
    return hardnessStore.isTests;
  },
  set(value) {
    hardnessStore.setIsTests(value);
  },
});

// TODO: move to composables
function onChooseTank(value: number | string | TankType) {
  if (typeof value === 'number') {
    hardnessStore.setTank({
      name: value.toString(),
      volume: value,
    });
    return;
  } else if (typeof value === 'string' || value === null) {
    return;
  }
  hardnessStore.setTank({
    name: value.name,
    volume: value.volumeTotal,
    waterChangeVolume: value.waterChangeVolume || 0,
    waterChangePercent: value.waterChangePercent || 0,
  });
}

function onInputFertilizer(value: InstanceType<typeof Dose>[]) {
  if (value.length > hardnessStore.doseModels.length) {
    const lastReagent = [...value].pop();
    // Skip if search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
  }
  hardnessStore.setDoses(value);
}

function onInputWaterChangePercent(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    hardnessStore.setWaterChangePercent(value);
    hardnessStore.setWaterChangeVolume(format(hardnessStore.tank.volume * value / 100, 3));
  }
}

function onInputWaterChangeVolume(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= hardnessStore.tank.volume) {
    hardnessStore.setWaterChangeVolume(value);
    hardnessStore.setWaterChangePercent(format(value / hardnessStore.tank.volume * 100, 3));
  }
}

function inputOsmosisChange(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    hardnessStore.setOsmosisChangePercent(+value);
  }
}

function onReset() {
  hardnessStore.reset();
}

defineOptions({
  name: 'HardnessPage',
});

useSeoMeta({
  title: t('meta.hardness.title'),
  description: t('meta.hardness.description'),
  keywords: t('meta.hardness.keywords'),
});
</script>

<style lang="sass">
</style>
