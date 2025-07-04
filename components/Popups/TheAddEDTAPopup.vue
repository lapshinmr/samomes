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
        {{ t('recipes.page.edtaPopup.title') }}
      </v-card-title>
      <v-card-text>
        <v-form ref="chelatorFormRef">
          <div class="mb-4">
            {{ t('recipes.page.edtaPopup.hint') }}
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
            {{ t('recipes.page.edtaPopup.chelatorIncrease') }}
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
              :label="t('recipes.page.edtaPopup.anotherValue')"
              suffix="%"
              hide-details="auto"
            />
          </div>
          <NumberField
            :model-value="chelatorAmount"
            :label="t('recipes.page.edtaPopup.edtaAmount')"
            :suffix="t('units.g')"
            variant="outlined"
            hide-details="auto"
            class="mt-10"
            readonly
          />
          <div class="mt-4 mb-6">
            {{ t('recipes.page.edtaPopup.alkaliHint') }}
          </div>
          <div class="d-flex align-center">
            <v-select
              v-model="alkaliChosen"
              :items="alkaliList"
              :label="t('recipes.page.edtaPopup.alkaliSelect')"
              hide-selected
              hide-details="auto"
              variant="outlined"
              class="w-50"
            />
            <v-radio-group
              v-model="alkaliN"
              inline
              color="primary"
              class="ml-2"
              hide-details="auto"
            >
              <v-radio
                label="1"
                :value="1"
              />
              <v-radio
                label="2"
                :value="2"
              />
              <template v-if="alkaliChosen !== 'K2CO3'">
                <v-radio
                  label="3"
                  :value="3"
                />
                <v-radio
                  label="4"
                  :value="4"
                />
              </template>
            </v-radio-group>
          </div>
          <NumberField
            :model-value="alkaliAmount"
            :label="t('recipes.page.edtaPopup.alkaliAmount')"
            :suffix="t('units.g')"
            variant="outlined"
            hide-details="auto"
            class="mt-10"
            readonly
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          variant="text"
          @click="model = false"
        >
          {{ t('buttons.cancel') }}
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="onAddChelator"
        >
          {{ t('buttons.save') }}
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

const emit = defineEmits<{
  (e: 'save', chelatorAmount: number, alkaliAmount: number, alkaliChosen: string): void
}>();

const { required, positive } = useValidation();
const { t } = useI18n();
const snackbarStore = useSnackbarStore();

const chelatorFormRef = ref();
const chelatorAmount = ref<number>(0);
const chelatorAmountIncrease = ref<number>();

const alkaliN = ref<number>(4);
const alkaliChosen = ref<string>('KOH');
const alkaliAmount = ref<number>(0);

const alkaliList = ['NaOH', 'KOH', 'K2CO3'];

const reagentsChosen = ref([]);

watch([reagentsChosen, chelatorAmountIncrease, alkaliN, alkaliChosen], () => {
  let result = 0;
  const EDTAMass = new MolecularFormula(EDTA).mass;
  reagentsChosen.value.forEach((reagentKey) => {
    const reagentFound = props.recipe.reagents.find((reagent) => reagent.key === reagentKey);
    if (reagentFound) {
      result += reagentFound.amount * EDTAMass / new MolecularFormula(reagentKey).mass;
    }
    if (reagentFound?.key === 'Fe2(SO4)3(H2O)9') {
      result *= 2;
    }
  });
  if (chelatorAmountIncrease.value) {
    result *= (100 + chelatorAmountIncrease.value) / 100;
  }
  chelatorAmount.value = format(result);
  const nEDTA = result / EDTAMass;
  alkaliAmount.value = format(nEDTA * new MolecularFormula(alkaliChosen.value).mass * alkaliN.value);
});

watch(alkaliChosen, (value) => {
  if ( ['NaOH', 'KOH'].includes(value)) {
    alkaliN.value = 4;
  } else if (value === 'K2CO3') {
    alkaliN.value = 2;
  }

});

async function onAddChelator() {
  const { valid } = await chelatorFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  emit('save', chelatorAmount.value, alkaliAmount.value, alkaliChosen.value);
  model.value = false;
}

defineOptions({
  name: 'TheAddEDTAPopup',
});
</script>

<style scoped lang="sass">

</style>
