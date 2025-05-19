<template>
  <v-container class="mb-12">
    <v-row>
      <v-col
        sm="8"
        offset-sm="2"
        align="end"
      >
        <v-btn
          href="https://t.me/samomes_calculator_chat"
          target="_blank"
          color="warning"
          size="small"
        >
          Сообщить о проблеме
        </v-btn>
      </v-col>
      <PageTitle>
        {{ t('dosing.title') }}
        <v-btn
          color="primary"
          @click="onReset"
        >
          {{ t('buttons.reset') }}
        </v-btn>
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
              @update:model-value="onChooseTank"
            />
            <v-expand-transition>
              <div
                v-if="dosingModel.tank?.volume"
                class="d-flex flex-column flex-md-row align-sm-center"
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
            <TheFertilizerDosesTable v-if="dosingModel.isDoses" />
            <v-expand-transition>
              <TheDosingElementsTable
                v-if="dosingModel.isDoses"
                is-helpful-info
                is-switchers
                :dosing="dosingModel"
              />
            </v-expand-transition>
            <v-alert
              v-if="dosingModel.isDoses"
              class="my-10"
              type="info"
              color="green-lighten-1"
              icon="mdi-help-circle"
            >
              <p class="mb-2">
                Оцените, пожалуйста, изменения на странице подбора дозировок, заполнив анкету
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf9gC2eSNPXKOmSQXtqTWksVvUHZN7QPKIzizHy_QKyquAdUg/viewform?usp=header"
                  target="_blank"
                  class="text-underlined"
                >
                  здесь
                </a> (количество заполнений анкеты не ограничено).
              </p>
              <p>
                Если при использовании сайта у вас возникли трудности или непонятные моменты, обязательно
                сообщите нам через
                <a
                  href="https://t.me/samomes_calculator"
                  target="_blank"
                >
                  телеграм-канал
                </a>
                или личные сообщения в телеграм автору проекта (@lapshinmr).
                Мы постараемся сделать сервис доступнее и удобнее.
              </p>
            </v-alert>
          </v-form>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { t } = useI18n();

const tanksStore = useTanksStore();
const { fertilizerRecipes } = useRecipesStore();
const { fertilizers } = useFertilizersStore();
const { remineralRecipes } = useRemineralsStore();
const dosingStore = useDosingStore();
const snackbarStore = useSnackbarStore();

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
  dosingStore.setDoses(value);
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
</script>

<style scoped lang="sass">

</style>
