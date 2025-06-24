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
        {{ t('recipes.page.unitConcPopup.title') }}
      </v-card-title>
      <v-card-text>
        <div class="text-grey-darken-1 mb-4">
          {{ t('recipes.page.unitConcPopup.hint') }}
          <v-tooltip
            location="bottom"
            max-width="400"
            open-on-click
            open-on-hover
          >
            <template #activator="{ props }">
              <Icon
                name="mdi-help-circle-outline"
                size="18"
                v-bind="props"
              />
            </template>
            {{ t('recipes.page.unitConcDescription') }}
          </v-tooltip>
        </div>
        <v-combobox
          v-model.number="tankChosen"
          :items="tanks"
          item-title="name"
          variant="underlined"
          :label="t('recipes.page.tankInputLabel')"
          persistent-hint
          hide-selected
          :suffix="t('units.l')"
          @update:model-value="onTankInput"
        />
        <v-expand-transition>
          <div v-if="recipe.tankVolume">
            <v-row
              v-for="reagent in reagents"
              :key="reagent.key"
              class="mb-3"
            >
              <v-col
                cols="12"
                class="font-weight-regular pb-1"
              >
                {{ reagent.text }}
              </v-col>
              <template
                v-for="(_, ion) in reagent.ions"
                :key="reagent.key + ion"
              >
                <v-col
                  :cols="reagent.ionsTotal >= 2 ? '6' : ''"
                  :sm="reagent.ionsTotal > 3 ? '4' : ''"
                  class="py-0"
                >
                  <NumberField
                    v-model.number="recipeUnitConcs[reagent.key][ion]"
                    :label="ion"
                    :suffix="t('units.mg/l / ml')"
                    hide-details="auto"
                    @update:model-value="inputIonUnitConc($event, reagent, ion)"
                  />
                </v-col>
              </template>
            </v-row>
            <v-row v-if="isReagents">
              <v-col cols="12">
                <div class="font-weight-medium mb-2">
                  {{ t('common.total') }}, {{ t('units.mg/l / ml') }}:
                </div>
                <div class="d-flex flex-wrap">
                  <div
                    v-for="[ion, value] in recipeIonUnitConcsSorted"
                    :key="ion"
                    class="d-flex justify-space-between mr-2"
                  >
                    <div class="font-weight-medium mr-1">{{ ion }}:</div>
                    <div>
                      {{ format(value) }} ({{ format(value / totalRecipeUnitConcs * 100) }}%)
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          variant="text"
          @click="model = false"
        >
          {{ t('buttons.close') }}
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="onSave"
        >
          {{ t('buttons.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const { t } = useI18n();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();

const model = defineModel<boolean>();

const props = defineProps<{
  recipe: InstanceType<typeof FertilizerRecipe>
}>();

const emit = defineEmits<{
  (e: 'save', recipeReagentAmounts: Partial<Record<ReagentKeyType, number>>): void
}>();

const REAGENTS_SKIP_LIST = [H2O, EDTA, TrilonB];

const recipeUnitConcs = ref<Partial<Record<ReagentKeyType, Record<IonType, number>>>>({});
const recipeReagentAmounts = ref<Partial<Record<ReagentKeyType, number>>>({});
const tankChosen = ref<TankType>();

const tanks = tanksStore.tankModels.map((item) => item.toJson());
const reagents = computed(() => {
  return props.recipe.reagents.filter((item) => !REAGENTS_SKIP_LIST.includes(item.key));
});
const isReagents = computed(() => {
  return reagents.value.length > 0;
});

watch(model, (value) => {
  if (value) {
    if (props.recipe.tankVolume) {
      tankChosen.value = {
        name: props.recipe.tankVolume.toString(),
        volume: props.recipe.tankVolume,
      };
    }
  }
});

watch(tankChosen, () => {
  recipeUnitConcs.value = props.recipe.countRecipeUnitConcsByAmounts();
});

const recipeIonUnitConcs = computed(() => props.recipe.countRecipeIonUnitConcs(recipeUnitConcs.value));

const recipeIonUnitConcsSorted = computed(() => {
  const result = typedEntries(recipeIonUnitConcs.value);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const totalRecipeUnitConcs = computed(() => {
  return typedValues(recipeIonUnitConcs.value).reduce((sum, value) => sum + value, 0);
});

function onTankInput(value: number | TankType) {
  if (typeof value === 'number') {
    tankChosen.value = {
      name: value.toString(),
      volume: value,
    };
    props.recipe.tankVolume = +value;
  } else {
    tankChosen.value = value;
    props.recipe.tankVolume = value.volumeTotal;
  }
  props.recipe.countRecipeUnitConcsByAmounts();
}

// TODO: move to the FertilizerRecipe ??
function inputIonUnitConc(value: number, reagent: InstanceType<typeof Reagent>, curIon: string) {
  const reagentAmount = props.recipe.countReagentAmountByUnitConc(value, reagent, curIon);
  recipeReagentAmounts.value[reagent.key] = reagentAmount;
  typedEntries(reagent.ions).forEach(([ion, value]) => {
    const density = reagent.density ?? 1;
    if (curIon === '' || curIon !== ion) {
      recipeUnitConcs.value[reagent.key][ion] = format(
        // TODO: split equation to separate functions
        (reagentAmount / props.recipe.totalVolume / tankChosen.value.volume) * value * 1000 * density,
      );
    }
  });
}

async function onSave() {
  emit('save', recipeReagentAmounts.value);
  model.value = false;
  snackbarStore.show('Новые значения масс реагентов сохранены')
}

defineOptions({
  name: 'TheUnitConcPopup',
});
</script>

<style scoped lang="sass">

</style>
