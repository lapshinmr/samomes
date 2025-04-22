<template>
  <v-container class="mb-12">
    <v-row>
      <LayoutPageTitle>
        Подбор дозировок
      </LayoutPageTitle>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="scheduleForm">
          <v-combobox
            v-model.number="dosingModel.tank.volume"
            :items="tanks"
            item-title="name"
            variant="underlined"
            label="Выберите аквариум или введите объем"
            persistent-hint
            hide-selected
            hint="Объем необходим для расчета дозировок"
            :rules="rulesTank"
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
                label="Выберите удобрения"
                item-title="fertilizer.name"
                persistent-hint
                multiple
                chips
                closable-chips
                hint="* здесь собраны все ваши рецепты и удобрения. Нажмите
                      «Фирменные» для просмотра полного списка."
                @update:model-value="onInputFertilizer"
              />
              <v-switch
                v-model="isDefaultFertilizers"
                color="primary"
                label="Фирменные"
                class="ml-md-4 flex-shrink-0"
              />
            </div>
          </v-expand-transition>
          <div v-if="isDoses">
            <div class="subtitle-1 text-sm-h6 my-4">
              Подбор дозировок
              <v-tooltip
                bottom
                max-width="400"
              >
                <template #activator="{ props }">
                  <v-icon v-bind="props">
                    mdi-help-circle-outline
                  </v-icon>
                </template>
                Подбирая объем выбранных рецептов, вы можете получить необходимую концентрацию элементов
                в аквариуме. Таким образом вы можете подобрать ориентировочное значение, которое "съедают"
                растения за заданный период времени.
              </v-tooltip>
            </div>
            <DosingTheFertilizerDosesTable />
          </div>
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
const { tanks } = useTanksStore();
const { recipeModels } = useRecipesStore();
const { fertilizerModels } = useFertilizersStore();
const { remineralModels } = useRemineralsStore();
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

const allFertilizers = computed(() => {
  const result = [...recipeModels, ...fertilizerModels, ...remineralModels];
  if (isDefaultFertilizers.value) {
    const recipesNames = recipeModels.map((item) => item.name);
    const fertilizersNames = fertilizerModels.map((item) => item.name);
    const remineralsNames = remineralModels.map((item) => item.name);
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

function onChooseTank(value: number | TankType) {
  if (typeof value === 'number') {
    dosingStore.setTank({
      name: value.toString(),
      volume: value,
    });
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
