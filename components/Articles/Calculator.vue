<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="10"
        offset-md="1"
      >
        <NumberField
          v-model="recipeModel.tankVolume"
          :label="t('articles.common.tankVolume')"
          :suffix="t('units.l')"
          variant="outlined"
          @update:model-value="onInputTankVolume"
        />
        <NumberField
          v-model="reagentH2O.amount"
          :label="t('articles.common.fertilizerVolume')"
          :suffix="t('units.ml')"
          variant="outlined"
          @update:model-value="onInputWaterVolume"
        />
        <v-radio-group
          v-model="toggleDose"
          inline
          color="primary"
          class="mt-0"
        >
          <v-radio
            v-for="dose in doseExamples"
            :key="dose"
            :label="`${dose} ${dose !== OTHER_DOSE ? t('units.mg/l') : ''}`"
            :value="dose"
          />
        </v-radio-group>
        <NumberField
          :model-value="unitConcs[ion]"
          :label="t('articles.common.unitConc')"
          :suffix="t('units.mg/l')"
          variant="outlined"
          :disabled="typeof toggleDose === 'number'"
          @update:model-value="onInputUnitConc"
        />
        <NumberField
          v-model="reagent.amount"
          :label="t('articles.common.reagentMass', { reagentName })"
          :suffix="t('units.g')"
          variant="outlined"
          :error="checkSolubilityError(reagent, recipeModel.totalVolume)"
          :error-messages="getSolubilityErrorMessage(reagent, recipeModel.totalVolume)"
          @update:model-value="onInputReagentAmount"
        />
      </v-col>
    </v-row>

    <v-alert
      type="success"
      class="mt-4 mb-10"
    >
      <template #prepend>
        <Icon
          name="mdi-receipt-text"
          size="24"
        />
      </template>
      {{ t('articles.common.recipe') }}:
      <br><br>
      {{ reagent.amount ? format(reagent.amount) : '-' }} {{ t('units.g') }}
      {{ reagentName }} {{ t('articles.common.dissolve') }} {{ t('articles.common.in') }}
      {{ reagentH2O.amount }} {{ t('units.ml') }} {{ t('articles.common.ofWater') }}.
      <br><br>
      1 {{ t('units.ml') }} {{ t('articles.common.fertilizerIncrease') }} {{ ion }} {{ t('articles.common.on') }}
      {{ unitConcs[ion] ? format(unitConcs[ion], 2) : '-' }} {{ t('units.mg/l') }}
      <template v-if="ionSecondary">
        {{ t('articles.common.and') }} {{ ionSecondary }} {{ t('articles.common.on') }}
        {{ unitConcs['K'] ? format(unitConcs['K'], 2) : '-' }} {{ t('units.mg/l') }}
      </template>
      {{ t('articles.common.inTheTank') }} {{ recipeModel.tankVolume }} {{ t('units.l') }}
    </v-alert>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  reagentName: string;
  ion: string;
  ionSecondary?: string;
  doseInit: number;
  doseExamples: number[];
  volume: number;
}>();

const { t } = useI18n();
const { getReagents } = useReagents();
const { checkSolubilityError, getSolubilityErrorMessage } = useSolubilityValidation();
const INITIAL_REAGENT_AMOUNT = 0;
const reagents = getReagents(INITIAL_REAGENT_AMOUNT);

const OTHER_DOSE = t('articles.common.another');
const doseExamples: (number | string)[] = [...props.doseExamples, OTHER_DOSE];
const toggleDose = ref<number>(props.doseInit);
const unitConcs = ref<Partial<Record<IonType, number>>>({});

const recipeModel = reactive(new FertilizerRecipe(
  {
    name: '',
    description: '',
    tankVolume: 100,
    reagents: [
      reagents.find((reagent) => reagent.key === H2O),
      reagents.find((reagent) => reagent.key === props.reagentName),
    ],
  },
));

const reagentH2O = recipeModel.reagents[0];
const reagent = recipeModel.reagents[1];
reagentH2O.amount = props.volume;


watch(() => reagent.amount, () => {
  unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagent);
});

watch(toggleDose, (value) => {
  if (typeof toggleDose.value === 'string') {
    return;
  }
  reagent.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagent, props.ion));
}, { immediate: true });

function onInputTankVolume() {
  reagent.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value[props.ion], reagent, props.ion));
}

function onInputWaterVolume() {
  reagent.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value[props.ion], reagent, props.ion));
}

function onInputReagentAmount(value: number) {
  reagent.amount = value;
}

function onInputUnitConc(value: number) {
  reagent.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagent, props.ion));
}
</script>

<style scoped lang="sass">

</style>
