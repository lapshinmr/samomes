<template>
  <v-container class="mb-12">
    <v-row>
      <LayoutPageTitle>
        {{ t('dosing.title') }}
      </LayoutPageTitle>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <div class="text-body-2 text-grey-darken-1 mb-4">
          {{ t('dosing.doses.description') }}
        </div>
        <v-form ref="scheduleForm">
          <v-combobox
            :model-value="dosingModel.tank"
            :items="tanks"
            item-title="name"
            variant="underlined"
            :label="t('dosing.tankInputLabel')"
            :hint="t('dosing.tankInputHint')"
            persistent-hint
            hide-selected
            :rules="rulesTank"
            class="mb-4"
            @update:model-value="onChooseTank"
          />
          <v-expand-transition>
            <div
              v-if="dosingModel.tank.volume"
              class="d-flex flex-column flex-md-row align-md-center"
            >
              <v-combobox
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
          <DosingTheFertilizerDosesTable v-if="isDoses" />
          <v-expand-transition>
            <DosingTheElementsTable
              v-if="isDoses"
              is-helpful-info
              is-switchers
              :dosing="dosingModel"
            />
          </v-expand-transition>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { t } = useI18n();

const { tanks } = useTanksStore();
const { fertilizerRecipeModels } = useRecipesStore();
const { fertilizerModels } = useFertilizersStore();
const { remineralRecipeModels } = useRemineralsStore();
const dosingStore = useDosingStore();
const snackbarStore = useSnackbarStore();

const dosingModel = computed(() => {
  return new Dosing(
    dosingStore.doseModels,
    dosingStore.fertilizersRegime,
    dosingStore.daysTotal,
    dosingStore.tank,
  );
});

const isDoses = computed(() => dosingModel.value.doses.length > 0);

// TODO: refactor this
const allFertilizers = computed(() => {
  const result = [...fertilizerRecipeModels, ...fertilizerModels, ...remineralRecipeModels];
  if (isDefaultFertilizers.value) {
    const recipesNames = fertilizerRecipeModels.map((item) => item.name);
    const fertilizersNames = fertilizerModels.map((item) => item.name);
    const remineralsNames = remineralRecipeModels.map((item) => item.name);
    const defaultFertilizersFiltered = FERTILIZERS_SORTED.filter(
      (item) => ![...recipesNames, ...fertilizersNames, ...remineralsNames].includes(item.name),
    ).map((item) => new Fertilizer(item));
    result.push(...defaultFertilizersFiltered);
  }
  return result.map((item) => {
    let fertilizerType: 'fertilizerRecipe' | 'fertilizer' | 'remineralRecipe';
    if (item instanceof FertilizerRecipe) {
      fertilizerType = 'fertilizerRecipe';
    }
    if (item instanceof Fertilizer) {
      fertilizerType = 'fertilizer';
    }
    if (item instanceof RemineralRecipe) {
      fertilizerType = 'remineralRecipe';
    }
    return new Dose({
      fertilizer: item,
      fertilizerType,
      daysTotal: dosingStore.daysTotal,
    });
  });
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
    volume: value.volume,
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
  dosingStore.setDoses(value);
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
</script>

<style scoped lang="sass">

</style>
