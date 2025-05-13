<template>
  <v-dialog
    v-model="model"
    width="500"
  >
    <v-card>
      <v-card-title>
        Трилон Б (EDTA-Na2)
      </v-card-title>
      <v-card-text>
        <v-form ref="chelatorFormRef">
          <div class="mb-4">
            Выберите реагенты, которые хотите хелатировать:
          </div>
          <div
            v-for="reagent in recipe.reagents"
            :key="reagent.key"
            class="d-flex align-center"
          >
            <template v-if="!['C10H14N2Na2O8(H2O)2', 'H2O'].includes(reagent.key)">
              <NumberField
                :model-value="reagent.amount"
                :label="reagent.text"
                :suffix="reagent.isLiquid ? t('units.ml') : t('units.g')"
                hide-details="auto"
                class="mb-2 mb-sm-4"
                readonly
                :rules="[required, positive]"
              />
              <v-checkbox
                v-model="reagentsChosen"
                :value="reagent.key"
                class="ml-2"
              />
            </template>
          </div>
          <div class="mt-4">
            Увеличить количество хелатора на:
          </div>
          <div class="d-flex align-center">
            <v-radio-group
              v-model="chelatorAmountIncrease"
              inline
              color="primary"
              class="mt-3 ml-n2"
              hide-details="auto"
            >
              <v-radio
                label="5%"
                :value="5"
              />
              <v-radio
                label="10%"
                :value="10"
              />
              <v-radio
                label="15%"
                :value="15"
              />
            </v-radio-group>
            <NumberField
              v-model="chelatorAmountIncrease"
              label="Другое значение"
              suffix="%"
              hide-details="auto"
            />
          </div>
          <NumberField
            v-model="chelatorAmount"
            label="Расчетное количество Трилона Б (EDTA-Na2)"
            :suffix="t('units.g')"
            variant="outlined"
            hide-details="auto"
            class="mt-10"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          variant="text"
          @click="model = false"
        >
          Закрыть
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="onAddChelator"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const props = defineProps<{
  recipe: InstanceType<typeof FertilizerRecipe>
}>();

const emit = defineEmits(['save']);

const { required, positive } = useValidation();
const { t } = useI18n();
const snackbarStore = useSnackbarStore();

const chelatorFormRef = ref();
const chelatorAmount = ref<number>(0);
const chelatorAmountIncrease = ref<number>();

const reagentsChosen = ref([]);

watch([reagentsChosen, chelatorAmountIncrease], () => {
  let result = 0;
  const chelatorMass = new MolecularFormula('C10H14N2Na2O8(H2O)2').mass;
  reagentsChosen.value.forEach((reagentKey) => {
    const reagentFound = props.recipe.reagents.find((reagent) => reagent.key === reagentKey);
    if (reagentFound) {
      result += reagentFound.amount * chelatorMass / new MolecularFormula(reagentKey).mass;
    }
    if (reagentFound?.key === 'Fe2(SO4)3(H2O)9') {
      result *= 2;
    }
  });
  if (chelatorAmountIncrease.value) {
    result *= (100 + chelatorAmountIncrease.value) / 100;
  }
  chelatorAmount.value = format(result);
});

async function onAddChelator() {
  const { valid } = await chelatorFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  emit('save', chelatorAmount.value);
  model.value = false;
}
</script>

<style scoped lang="sass">

</style>
