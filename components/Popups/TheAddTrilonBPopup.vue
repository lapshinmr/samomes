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
            <template v-if="![TrilonB, EDTA, 'H2O'].includes(reagent.key)">
              <NumberField
                :model-value="reagent.amount"
                :label="reagent.text"
                :suffix="reagent.isLiquid ? t('units.ml') : t('units.g')"
                hide-details="auto"
                class="mb-2 mb-sm-4"
                readonly
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
            label="Количество Трилона Б (EDTA-Na2)"
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
  const chelatorMass = new MolecularFormula(TrilonB).mass;
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

defineOptions({
  name: 'TheAddTrilonBPopup',
});
</script>

<style scoped lang="sass">

</style>
