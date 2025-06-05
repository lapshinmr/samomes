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
  <v-container class="mb-10">
    <v-row>
      <page-title>
        Водоподготовка
      </page-title>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <client-only>
          <v-combobox
            v-model.number="remineralizationStore.tank"
            :items="tanks"
            item-title="name"
            variant="underlined"
            label="Объем аквариума"
            hint="Выберите аквариум или введите объем"
            persistent-hint
            hide-selected
            :rules="[required]"
            class="mb-4"
            @update:model-value="onChooseTank"
          />
          <v-expand-transition>
            <div v-if="remineralizationStore.tank?.volume">
              <div class="mt-2 mt-sm-6">
                Выберите тип подмены
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
                    label="Осмос + реминерализатор"
                    :value="RemineralizationTypes.REM"
                  />
                  <v-radio
                    label="Осмос + водопровод"
                    :value="RemineralizationTypes.TAP"
                    class="mt-1 mt-sm-0"
                  />
                  <v-radio
                    label="Другое"
                    :value="RemineralizationTypes.MIX"
                    class="mt-1 mt-sm-0"
                  />
                </v-radio-group>
                <v-checkbox
                  v-model="isTests"
                  color="primary"
                  label="Тестирую воду"
                />
              </div>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <div v-if="remineralizationStore.tank?.volume && remineralizationType !== null">
              <div class="text-subtitle-1">
                Подмена
              </div>
              <div class="d-flex flex-column flex-sm-row align-sm-center">
                <NumberField
                  :model-value="remineralizationStore.tank.waterChangeVolume"
                  label="Объем"
                  hint="Введите объем подмены"
                  persistent-hint
                  suffix="л"
                  class="pt-0 mt-0"
                  append-icon="mdi-arrow-up-bold-circle-outline"
                  @update:model-value="onInputWaterChangeVolume"
                  @click:append="onInputWaterChangeVolume(remineralizationStore.tank.volume)"
                />
                <NumberField
                  :model-value="remineralizationStore.tank.waterChangePercent"
                  label="Процент"
                  hint="или процент подмены от общего объема"
                  persistent-hint
                  suffix="%"
                  class="pt-0 mt-0 ml-sm-3"
                  append-icon="mdi-arrow-up-bold-circle-outline"
                  @update:model-value="onInputWaterChangePercent"
                  @click:append="onInputWaterChangePercent(100)"
                />
                <NumberField
                  v-if="[RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)"
                  :model-value="remineralizationStore.osmosisChangePercent"
                  label="Процент"
                  :hint="`
                    Осмос: ${remineralizationStore.osmosisChangeVolume.toFixed(1)} л.
                    Водопровод: ${(remineralizationStore.tank.waterChangeVolume - remineralizationStore.osmosisChangeVolume).toFixed(1)} л.
                  `"
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
                    Исходная жесткость
                  </div>
                  <div class="d-flex">
                    <NumberField
                      v-if="[RemineralizationTypes.TAP, RemineralizationTypes.MIX].includes(remineralizationType)"
                      v-model="ghWaterChange"
                      label="Gh водопровода"
                      suffix="Gh"
                      hide-details="auto"
                    />
                    <NumberField
                      v-if="isTests"
                      v-model="ghInit"
                      label="Gh в аквариуме"
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
                      label="Kh водопровода"
                      suffix="Kh"
                      hide-details="auto"
                    />
                    <NumberField
                      v-if="isTests"
                      v-model="khInit"
                      label="Kh в аквариуме"
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
                remineralizationStore.tank?.volume
                  && [RemineralizationTypes.REM, RemineralizationTypes.MIX].includes(remineralizationType)
              "
              class="mt-8"
            >
              <div class="d-flex flex-column flex-sm-row align-md-center mb-8">
                <v-combobox
                  :model-value="remineralizationStore.doseModels"
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
            v-for="(dose, index) in remineralizationStore.doseModels"
            :key="`dose_${index}`"
          >
            <NumberField
              :model-value="dose.amount"
              :label="dose.fertilizer.name"
              :suffix="dose.fertilizer.isLiquid ? t('units.ml') : t('units.g')"
              hide-details="auto"
              class="mb-2"
              @update:model-value="remineralizationStore.updateAmountDay($event, index)"
            />
          </div>
          <v-expand-transition>
            <div
              v-if="remineralizationStore.tank?.volume && remineralizationType !== null"
              class="mt-8"
            >
              <div class="text-subtitle-1 mb-2">
                Подготовленная жесткость
              </div>
              <div>
                <div class="d-flex">
                  <v-text-field
                    :model-value="format(remineralizationModel.countWaterChangeGh(
                      ghWaterChange, remineralizationStore.osmosisChangePercent))"
                    label="Gh в подмене"
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
                    :model-value="format(remineralizationModel.countTotalGh(
                      ghInit, ghWaterChange, remineralizationStore.osmosisChangePercent))"
                    label="Gh в аквариуме"
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
                    :model-value="format(remineralizationModel.countWaterChangeKh(
                      khWaterChange, remineralizationStore.osmosisChangePercent))"
                    label="Kh в подмене"
                    suffix="Kh"
                    hide-details="auto"
                    readonly
                    variant="outlined"
                    persistent-hint
                    :rules="[rulesCalculation]"
                  />
                  <v-text-field
                    v-if="isTests"
                    :model-value="format(remineralizationModel.countTotalKh(
                      khInit, khWaterChange, remineralizationStore.osmosisChangePercent))"
                    label="Kh в аквариуме"
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
        На этой странице можно рассчитать Gh/Kh в аквариуме в зависимости от исходной воды, разбавления осмосом,
        реминерализатора и дозировок удобрений.
      </Guide>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { RemineralizationTypes } from '~/utils/types/types';

const { t } = useI18n();

const { required } = useValidation();
const { smAndUp } = useDisplay();
const remineralizationStore = useRemineralizationStore();
const tanksStore = useTanksStore();
const { fertilizerRecipes } = useRecipesStore();
const { fertilizers } = useFertilizersStore();
const { remineralRecipes } = useRemineralsStore();
const snackbarStore = useSnackbarStore();

const tanks = tanksStore.tankModels.map((item) => item.toJson());

const ghInit = ref(0);
const khInit = ref(0);
const ghWaterChange = ref(0);
const khWaterChange = ref(0);

const rulesCalculation = (v) => (!Number.isNaN(+v) && +v !== Infinity) || 'Проверьте вводимые параметры';

const remineralizationModel = computed(() => {
  return new Remineralization(
    remineralizationStore.doseModels,
    remineralizationStore.tank,
  );
});

const isDefaultFertilizers = computed({
  get() {
    return remineralizationStore.isDefaultFertilizers;
  },
  set(value) {
    remineralizationStore.setDefaultFertilizers(value);
    snackbarStore.show(
      value
        ? 'Фирменные удобрения добавлены в список'
        : 'Фирменные удобрения удалены из списка',
    );
  },
});

// TODO: move to composables
const allFertilizers = computed(() => {
  let defaultFertilizersFiltered = [];
  if (isDefaultFertilizers.value) {
    const recipesNames = fertilizerRecipes.map((item) => item.name);
    const fertilizersNames = fertilizers.map((item) => item.name);
    const remineralsNames = remineralRecipes.map((item) => item.name);
    defaultFertilizersFiltered = FERTILIZERS_SORTED.filter(
      (item) => ![...recipesNames, ...fertilizersNames, ...remineralsNames].includes(item.name),
    );
  }
  return [
    ...fertilizerRecipes.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizerRecipe,
      daysTotal: 1,
    })),
    ...fertilizers.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizer,
      daysTotal: 1,
    })),
    ...remineralRecipes.map((item) => new Dose({
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
    return remineralizationStore.remineralizationType;
  },
  set(value) {
    remineralizationStore.setRemineralizationType(value);
    remineralizationStore.setDoses([]);
    ghInit.value = 0;
    khInit.value = 0;
    ghWaterChange.value = 0;
    khWaterChange.value = 0;
  },
});

const isTests = computed({
  get() {
    return remineralizationStore.isTests;
  },
  set(value) {
    remineralizationStore.setIsTests(value);
  },
});

// TODO: move to composables
function onChooseTank(value: number | string | TankType) {
  if (typeof value === 'number') {
    remineralizationStore.setTank({
      name: value.toString(),
      volume: value,
    });
    return;
  } else if (typeof value === 'string' || value === null) {
    return;
  }
  remineralizationStore.setTank({
    name: value.name,
    volume: value.volumeTotal,
    waterChangeVolume: value.waterChangeVolume || 0,
  });
}

function onInputFertilizer(value: InstanceType<typeof Dose>[]) {
  if (value.length > remineralizationStore.doseModels.length) {
    const lastReagent = [...value].pop();
    // Skip if search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
  }
  remineralizationStore.setDoses(value);
}

function onInputWaterChangePercent(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    remineralizationStore.setWaterChangePercent(value);
    remineralizationStore.setWaterChangeVolume(format(remineralizationStore.tank.volume * value / 100, 3));
  }
}

function onInputWaterChangeVolume(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= remineralizationStore.tank.volume) {
    remineralizationStore.setWaterChangeVolume(value);
    remineralizationStore.setWaterChangePercent(format(value / remineralizationStore.tank.volume * 100, 3));
  }
}

function inputOsmosisChange(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    remineralizationStore.setOsmosisChangePercent(+value);
  }
}

defineOptions({
  name: 'Remineralization',
});

definePageMeta({
  title: 'Водоподготовка в аквариуме',
  meta: [
    {
      name: 'description',
      content: 'Данный калькулятор позволяет подготовить подменную воду с нужными параметрами жесткости '
        + 'воды и легко рассчитать итоговую жесткость в аквариуме.',
    },
    {
      name: 'keywords',
      content: 'подмена, жесткость воды, gh, kh',
    },
  ],
});
</script>

<style lang="sass">
</style>
