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
  <v-container class="mb-12">
    <v-row>
      <PageTitle>
        {{ t('dosing.title') }}
        <template #button>
          <v-btn
            color="primary"
            @click="onReset"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </template>
      </PageTitle>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <div class="text-body-2 text-grey-darken-1 mb-8">
          {{ t('dosing.doses.description') }}
        </div>
        <client-only>
          <v-form ref="scheduleForm">
            <v-combobox
              v-model.number="dosingModel.tank"
              :items="tanks"
              item-title="name"
              variant="underlined"
              :label="t('dosing.tankInputLabel')"
              :hint="t('dosing.tankInputHint')"
              persistent-hint
              hide-selected
              :rules="rulesTank"
              class="mb-4"
              :disabled="isScheduleEdit"
              @update:model-value="onChooseTank"
            />
            <v-expand-transition>
              <div
                v-if="dosingModel.tank?.volume"
                class="d-flex flex-column flex-md-row align-sm-center"
              >
                <Combobox
                  :model-value="dosingStore.doseModels"
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
            </v-expand-transition>
            <TheFertilizerDosesTable
              v-if="dosingModel.isDoses"
              class="mb-4"
            />
            <v-expand-transition>
              <div v-if="dosingModel.isDoses">
                <TheDosingElementsTable
                  is-helpful-info
                  is-switchers
                  :dosing="dosingModel"
                >
                  <v-btn
                    color="success"
                    class="mb-3 mb-sm-0"
                    @click="isDynamicsPopup = true;"
                  >
                    Параметры в аквариуме
                  </v-btn>
                </TheDosingElementsTable>
              </div>
            </v-expand-transition>
            <template v-if="dosingModel.isDoses">
              <DividerWithNote
                v-model="isSchedule"
                button
                class="my-10"
              >
                Составить расписание
              </DividerWithNote>
              <v-expand-transition>
                <TheScheduleDoseTable
                  v-if="isSchedule"
                  :dosing="dosingModel"
                  class="mt-10"
                />
              </v-expand-transition>
            </template>
            <TheDynamicsPopup
              v-model="isDynamicsPopup"
              :dosing="dosingModel"
            />
          </v-form>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { t } = useI18n();

const route = useRoute();
const tanksStore = useTanksStore();
const { fertilizerRecipes } = useRecipesStore();
const { fertilizers } = useFertilizersStore();
const { remineralRecipes } = useRemineralsStore();
const dosingStore = useDosingStore();
const snackbarStore = useSnackbarStore();

const isDynamicsPopup = ref<boolean>(false);
const isSchedule = ref<boolean>(false);

const tanks = tanksStore.tankModels.map((item) => item.toJson());

const dosingModel = computed(() => {
  return new Dosing(
    dosingStore.doseModels,
    dosingStore.fertilizersRegime,
    dosingStore.daysTotal,
    dosingStore.tank,
  );
});

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
      daysTotal: dosingStore.daysTotal,
    })),
    ...fertilizers.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizer,
      daysTotal: dosingStore.daysTotal,
    })),
    ...remineralRecipes.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.remineralRecipe,
      daysTotal: dosingStore.daysTotal,
    })),
    ...defaultFertilizersFiltered.map((item) => new Dose({
      fertilizer: item,
      fertilizerType: DoseFertilizerType.fertilizer,
      daysTotal: dosingStore.daysTotal,
    })),
  ];
});

const isScheduleEdit = computed(() => {
  return !isNaN(+route.query.schedule);
});

onMounted(() => {
  if (route.query.schedule) {
    isSchedule.value = true;
  }
});

function onChooseTank(value: number | string | TankType) {
  if (typeof value === 'number') {
    dosingStore.setTank({
      name: value.toString(),
      volume: value,
    });
    return;
  } else if (typeof value === 'string' || value === null) {
    return;
  }
  dosingStore.setTank({
    name: value.name,
    volume: value.volumeTotal,
    waterChangeVolume: value.waterChangeVolume,
  });
}

function onInputFertilizer(value: InstanceType<typeof Dose>[]) {
  if (value.length > dosingStore.doseModels.length) {
    const lastReagent = [...value].pop();
    // Skip if search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
  }
  dosingStore.setDoses(value.map((dose) => dose.toJson()));
}

function onReset() {
  dosingStore.resetDosing();
}

const isDefaultFertilizers = computed({
  get() {
    return dosingStore.isDefaultFertilizers;
  },
  set(value) {
    dosingStore.setDefaultFertilizers(value);
    snackbarStore.show(
      value
        ? 'Фирменные удобрения добавлены в список'
        : 'Фирменные удобрения удалены из списка',
    );
  },
});

const rulesTank = [
  (v) => !!v || 'Выберите аквариум',
];

defineOptions({
  name: 'DosingPage',
});

useSeoMeta({
  title: t('meta.dosing.title'),
  description: t('meta.dosing.description'),
  keywords: t('meta.dosing.keywords'),
});
</script>

<style scoped lang="sass">

</style>
