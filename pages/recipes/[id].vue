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
      <BackButton :path="appRoutes.recipes.path">
        <v-btn
          v-if="!isCreate && !isShare"
          color="primary"
          class="ml-auto"
          size="small"
          @click="onCopyRecipe"
        >
          {{ t('buttons.copy')}}
        </v-btn>
      </BackButton>
      <PageTitle>
        <template v-if="isCreate && !isCopy">
          {{ t('recipes.page.titleNew') }}
        </template>
        <template v-else-if="isCopy">
          <div class="text-h6 text-sm-h5">
            {{ t('recipes.page.titleCopy') }} {{ recipeModel.name }}
          </div>
          <div class="text-subtitle-1">
            {{ t('recipes.page.subtitleCopy') }}
          </div>
        </template>
        <template v-else-if="isShare">
          <p class="text-h6 text-sm-h5">
            {{ t('recipes.page.titleShare') }}
          </p>
          <p class="text-subtitle-1">
            {{ t('recipes.page.subtitleShare') }}
          </p>
        </template>
        <template v-else>
          {{ recipeModel.name }}
        </template>
      </PageTitle>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <v-form ref="recipeFormRef">
          <div class="text-body-2 text-grey-darken-1 mb-2">
            {{ recipeModel.isWater ? t('recipes.page.reagentsHintWater') : t('recipes.page.reagentsHint') }}
          </div>
          <Combobox
            :model-value="recipeModel.reagents"
            :items="reagents"
            item-title="text"
            variant="underlined"
            multiple
            :label="t('common.reagents')"
            :hint="t('common.comboboxTypingHint')"
            persistent-hint
            chips
            closable-chips
            hide-details="auto"
            class="mb-2"
            @update:model-value="onInputReagent"
          />
          <div
            class="d-flex justify-end text-blue cursor-pointer"
            @click="isAddReagentPopup = true;"
          >
            {{ t('recipes.page.noReagent') }}
          </div>
          <Combobox
            v-model="recipeExampleChosen"
            :items="FERTILIZER_RECIPES"
            item-title="name"
            variant="underlined"
            :label="t('common.recipes')"
            :hint="t('recipes.page.recipesHint')"
            persistent-hint
            hide-selected
            hide-details="auto"
            @update:model-value="onInputRecipeExample"
          />
          <div v-if="recipeModel.isReagents">
            <DividerWithNote
              v-model="isReagentsInfo"
              button
              class="mt-10 mb-4"
            >
              {{ t('common.reagents') }}
            </DividerWithNote>
            <v-expand-transition>
              <div
                v-if="isReagentsInfo"
                class="text-grey-darken-1 mt-6 mb-4"
              >
                <div
                  v-for="reagent in recipeModel.reagents"
                  :key="reagent.key"
                  class="d-flex flex-column flex-sm-row justify-space-between
                    align-sm-center text-body-1 mb-2 mb-sm-0 text-body-2"
                >
                  <div>{{ reagent.text }}</div>
                  <div>{{ reagent.percent }}</div>
                </div>
                <div class="mt-2 mt-sm-4 text-body-2">
                  {{ t('recipes.page.reagentsDescription') }}
                </div>
              </div>
            </v-expand-transition>
          </div>
          <v-expand-transition>
            <div v-if="recipeModel.isReagents">
              <div
                v-for="reagent in recipeModel.reagents"
                :key="reagent.key"
                class="d-flex align-center mb-2"
              >
                <NumberField
                  :model-value="reagent.amount"
                  :label="reagent.text"
                  :suffix="reagent.isLiquid ? t('units.ml') : t('units.g')"
                  hide-details="auto"
                  :rules="[required, positive]"
                  :error="checkSolubilityError(reagent)"
                  :error-messages="getSolubilityErrorMessage(reagent)"
                  @update:model-value="onInputReagentAmount($event, reagent)"
                >
                  <template
                    v-if="reagent.key === TrilonB"
                    #append
                  >
                    <v-btn
                      color="primary"
                      size="small"
                      @click="isAddTrilonBPopup = true;"
                    >
                      {{ t('buttons.calculate') }}
                    </v-btn>
                  </template>
                  <template
                    v-else-if="reagent.key === EDTA"
                    #append
                  >
                    <v-btn
                      color="primary"
                      size="small"
                      @click="isAddEDTAPopup = true;"
                    >
                      {{ t('buttons.calculate') }}
                    </v-btn>
                  </template>
                </NumberField>
                <div
                  v-if="reagent.isLiquid && reagent.key !== H2O && reagent.type !== ReagentTypeName.COMPOUND"
                  style="width: 100px;"
                >
                  <NumberField
                    :model-value="reagent.dilution"
                    :label="t('recipes.page.dilution')"
                    suffix="%"
                    class="ml-2"
                    hide-details="auto"
                    @update:model-value="onInputReagentDilution($event, reagent)"
                  />
                </div>
              </div>
              <div
                v-if="recipeModel.isLiquid"
                class="d-flex justify-end mt-4"
              >
                <v-btn
                  color="primary"
                  size="small"
                  @click="isUnitConcPopup = true;"
                >
                  {{ t('recipes.page.calculateReagentMass') }}
                </v-btn>
              </div>
              <v-expand-transition>
                <div
                  v-if="recipeModel.isSeveralLiquidReagents"
                  class="mt-8"
                >
                  <NumberField
                    :model-value="recipeModel.totalVolume"
                    :label="t('recipes.page.totalVolume')"
                    :suffix="t('units.ml')"
                    variant="outlined"
                    :hint="recipeModel.isSeveralLiquidReagents ? t('recipes.page.totalVolumeHint') : ''"
                    persistent-hint="auto"
                    class="mt-4"
                    @update:model-value="onInputTotalVolume"
                  />
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>
          <div v-if="recipeModel.isNotOnlyWaterReagent">
            <DividerWithNote class="mt-10 mb-4">
              {{ t('recipes.page.fertilizerConc') }}
            </DividerWithNote>
            <TheRecipeElementsTable
              :recipe="recipeModel"
              class="mb-10"
            />
            <v-text-field
              v-model="recipeModel.name"
              variant="underlined"
              :label="t('recipes.page.name')"
              :hint="t('recipes.page.nameHint')"
              hide-details="auto"
              class="mb-2 mb-sm-4"
              :rules="[required, isNameExist]"
            />
            <v-textarea
              v-model="recipeModel.description"
              variant="underlined"
              :label="t('recipes.page.description')"
              hide-details="auto"
              auto-grow
              rows="1"
              :hint="t('recipes.page.descriptionHint')"
            />
            <div class="d-flex mt-10">
              <v-btn
                v-if="!isCreate && !isShare"
                color="error"
                @click="onRemoveRecipe"
              >
                {{ t('buttons.remove') }}
              </v-btn>
              <v-btn
                class="ml-auto"
                @click="$router.push(appRoutes.recipes.path)"
              >
                {{ t('buttons.cancel') }}
              </v-btn>
              <v-btn
                color="primary"
                class="ml-2"
                v-on="isCreate || isShare ? { click: onAddRecipe } : { click: onEditRecipe }"
              >
                {{ t('buttons.save') }}
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>

    <TheAddReagentPopup
      v-model="isAddReagentPopup"
    />

    <TheAddTrilonBPopup
      v-model="isAddTrilonBPopup"
      :recipe="recipeModel"
      @save="onSetTrilonBAmount"
    />

    <TheAddEDTAPopup
      v-model="isAddEDTAPopup"
      :recipe="recipeModel"
      @save="onSetEDTAAmount"
    />

    <TheUnitConcPopup
      v-model="isUnitConcPopup"
      :recipe="recipeModel"
      @save="onSetRecipeReagentAmounts"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import type { FertilizerRecipeExampleType } from '~/utils/types/types';

const { t } = useI18n();
const { appRoutes } = useAppRoutes();
const { required, positive } = useValidation();
const router = useRouter();
const route = useRoute();
const snackbarStore = useSnackbarStore();
const reagentsStore = useReagentsStore();
const recipesStore = useRecipesStore();

const { getReagents } = useReagents();
const INITIAL_REAGENT_AMOUNT = 0;
let reagents = getReagents(INITIAL_REAGENT_AMOUNT);

// MODEL
const recipeFormRef = ref(null);
const recipeExampleChosen = ref<FertilizerRecipeExampleType>(null);
const recipeModel = reactive(new FertilizerRecipe(
  {
    name: '',
    description: '',
    tankVolume: null,
    reagents: [],
  },
));

watch(() => recipeModel.reagents, () => {
  // Set recipe default name by first reagent name
  if (!recipeModel.name && recipeModel.reagents.length > 1) {
    const reagent = recipeModel.reagents[1];
    recipeModel.name = reagent.text;
  }
});

watch(() => reagentsStore.reagents, () => {
  reagents = getReagents(INITIAL_REAGENT_AMOUNT);
}, { deep: true });

function onInputReagent(value: InstanceType<typeof Reagent>[]) {
  if (value.length > recipeModel.reagents.length) {
    const lastReagent = [...value].pop();
    // Skip if the search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
  }
  recipeModel.reagents = value;
}

function fillModel(recipe: FertilizerRecipeType | FertilizerRecipeExampleType) {
  recipeModel.name = recipe.name;
  recipeModel.description = recipe.description;
  recipeModel.tankVolume = recipe.tankVolume;
}

const onInputRecipeExample = (recipe: FertilizerRecipeExampleType) => {
  if (typeof recipe === 'string' || recipe === null) {
    return;
  }
  recipeExampleChosen.value = recipe;
  recipeModel.reagents = [];
  recipe.reagents.forEach(({ key, amount }) => {
    const reagentFound = reagents.find((reagent) => reagent.key === key);
    if (reagentFound) {
      reagentFound.amount = amount;
      recipeModel.reagents.push(reagentFound);
    }
  });
  fillModel(recipe);
};

function onInputReagentAmount(value: number, reagent: InstanceType<typeof Reagent>) {
  reagent.amount = value;
  recipeModel.setReagentAmount(value, reagent.key);
}

function onInputReagentDilution(value: number, reagent: InstanceType<typeof Reagent>) {
  reagent.dilution = value;
}

function onInputTotalVolume(value: number) {
  const waterVolume = value - (recipeModel.totalVolume - recipeModel.waterVolume);
  recipeModel.setReagentAmount(waterVolume, 'H2O');
}

// PAGE MANIPULATION
const { checkName } = useNameExist();

const isReagentsInfo = ref<boolean>(false);

const recipes = recipesStore.fertilizerRecipeModels;

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.query.share !== undefined);
const recipeIndex = computed(() => +route.params.id);

const isAddReagentPopup = ref(false);
const isAddTrilonBPopup = ref(false);
const isAddEDTAPopup = ref(false);
const isUnitConcPopup = ref(false);

// Validation
const isExist = computed(() => {
  return checkName(recipeModel.name) && !isEdit.value;
});

const isNameExist = () => !isExist.value || t('recipes.page.nameExists');

const checkSolubilityError = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility
    ? `${t('validation.solubilityLimit')} - ${reagent.solubility} ${t('units.g/l')} ${t('common.for')} 25°С!`
    : '';
};

if (isCreate.value) {
  const reagentH2O = reagents.find((reagent) => reagent.key === H2O);
  reagentH2O.amount = 500;
  recipeModel.reagents.push(reagentH2O);
}

onMounted(async () => {
  if (isCreate.value && !isCopy.value) {
    return;
  }

  let recipe: FertilizerRecipeType;
  if (isShare.value) {
    [recipe] = JSON.parse(decodeURIComponent(route.query.share as string));
  } else if (isCopy.value) {
    const index = route.query.copy as string;
    recipe = JSON.parse(JSON.stringify({ ...recipes[+index] }));
  } else if (!isCreate.value) {
    recipe = JSON.parse(JSON.stringify({ ...recipes[recipeIndex.value] }));
  }

  if (Object.keys(recipe).length === 0) {
    await router.push(appRoutes.value.recipes.path);
    return;
  }

  const recipeReagents = {};
  recipe.reagents.forEach((reagent: ReagentType) => {
    recipeReagents[reagent.key] = reagent;
  });
  reagents.forEach((reagent: InstanceType<typeof Reagent>) => {
    if (reagent.key in recipeReagents) {
      reagent.amount = recipeReagents[reagent.key].amount;
      reagent.dilution = recipeReagents[reagent.key].dilution;
      recipeModel.reagents.push(reagent);
    }
  });
  fillModel(recipe);
});

async function onAddRecipe () {
  const { valid } = await recipeFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  recipesStore.addRecipe({ ...recipeModel.toJson() });
  snackbarStore.show(t('recipes.page.message.recipeAdded'));
  await router.push(appRoutes.value.recipes.path);
}

async function onEditRecipe() {
  const { valid } = await recipeFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  recipesStore.editRecipe({
    index: recipeIndex.value,
    recipe: recipeModel.toJson(),
  });
  snackbarStore.show(t('recipes.page.message.recipeEdited'));
  await router.push(appRoutes.value.recipes.path);
}

async function onRemoveRecipe() {
  recipesStore.removeRecipe(recipeIndex.value);
  snackbarStore.show(t('recipes.page.message.recipeRemoved'));
  await router.push(appRoutes.value.recipes.path);
}

async function onCopyRecipe() {
  snackbarStore.show(t('recipes.page.message.recipeCopied'));
  await router.push(`${appRoutes.value.recipes.path}create/?copy=${recipeIndex.value}`);
}

function onSetTrilonBAmount(value: number) {
  recipeModel.setReagentAmount(value, TrilonB);
}

function onSetEDTAAmount(EDTAAmount: number, alkaliAmount: number, alkaliName: string) {
  recipeModel.setReagentAmount(EDTAAmount, EDTA);
  let alkaliReagent = recipeModel.reagents.find((reagent) => reagent.key === alkaliName);
  if (!alkaliReagent) {
    alkaliReagent = reagents.find((reagent) => reagent.key === alkaliName);
    alkaliReagent.amount = alkaliAmount;
    recipeModel.reagents.push(alkaliReagent);
  } else {
    alkaliReagent.amount = alkaliAmount;
  }
}

function onSetRecipeReagentAmounts(recipeReagentAmounts: Partial<Record<ReagentKeyType, number>>) {
  typedEntries(recipeReagentAmounts).forEach(([reagentKey, value]) => {
    const reagent = recipeModel.reagents.find((reagent) => reagent.key === reagentKey);
    if (reagent.isLiquid) {
      recipeModel.correctWaterVolumeByReagentAmount(format(value), reagent.amount);
    }
    recipeModel.setReagentAmount(format(value), reagentKey);
  });
}

useSeoMeta({
  title: t('meta.recipe.title'),
});
</script>

<style lang="sass" scoped>
// TODO: investigate this
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
