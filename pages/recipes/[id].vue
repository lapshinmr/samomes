<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

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
          <p class="text-h6 text-md-h5">
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
        md="8"
        offset-md="2"
      >
        <v-form ref="recipeFormRef">
          <v-combobox
            :model-value="recipeModel.reagents"
            :items="reagents"
            item-title="text"
            variant="underlined"
            multiple
            :label="t('common.reagents')"
            :hint="recipeModel.isWater ? t('recipes.page.reagentsHintWater') : t('recipes.page.reagentsHint')"
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
            Нет нужного реагента?
          </div>
          <v-combobox
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
                      @click="isAddChelatorPopup = true;"
                    >
                      Рассчитать
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
          <div v-if="recipeModel.isLiquid">
            <DividerWithNote
              v-model="isUnitConc"
              button
              class="mt-10 mb-4"
            >
              <div class="d-inline-flex align-center">
                <span>
                  {{ t('recipes.page.unitConcTitle') }}
                </span>
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
                      class="ml-1"
                      v-bind="props"
                    />
                  </template>
                  {{ t('recipes.page.unitConcDescription') }}
                </v-tooltip>
              </div>
            </DividerWithNote>
          </div>
          <v-expand-transition>
            <div v-if="isUnitConc && recipeModel.isLiquid">
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
                <div v-if="recipeModel.tankVolume">
                  <v-row
                    v-for="reagent in recipeModel.reagents.filter((item) => item.key !== H2O)"
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
                          v-model.number="reagent.unitConcs[ion]"
                          :label="ion"
                          :suffix="t('units.mg/l / ml')"
                          hide-details="auto"
                          @update:model-value="inputIonUnitConc($event, reagent, ion)"
                        />
                      </v-col>
                    </template>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="font-weight-medium mb-2">
                        {{ t('common.total') }}, {{ t('units.mg/l / ml') }}:
                      </div>
                      <div class="d-flex flex-wrap">
                        <div
                          v-for="[ion, value] in recipeModel.recipeIonUnitConcsSorted"
                          :key="ion"
                          class="d-flex justify-space-between mr-2"
                        >
                          <div class="font-weight-medium mr-1">{{ ion }}:</div>
                          <div class="ml-2">
                            {{ format(value) }}
                            ({{ format(value / recipeModel.totalRecipeUnitConcs * 100) }}%)
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>
          <div v-if="recipeModel.isReagents">
            <DividerWithNote class="mt-10 mb-4">
              Концентрация элементов
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

    <TheAddChelatorPopup
      v-model="isAddChelatorPopup"
      :recipe="recipeModel"
      @save="onSetChelatorAmount"
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
const tanksStore = useTanksStore();

const { getReagents } = useReagents();
const INITIAL_REAGENT_AMOUNT = 0;
let reagents = getReagents(INITIAL_REAGENT_AMOUNT);

const tankChosen = ref<TankType>();

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
  if (recipe.tankVolume) {
    tankChosen.value = {
      name: recipe.tankVolume.toString(),
      volume: recipe.tankVolume,
    };
  }
  recipeModel.updateRecipeUnitConcsByAmounts();
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
  recipeModel.updateRecipeUnitConcsByAmounts();
}

function onInputReagentDilution(value: number, reagent: InstanceType<typeof Reagent>) {
  reagent.dilution = value;
  recipeModel.updateRecipeUnitConcsByAmounts();
}

function onInputTotalVolume(value: number) {
  const waterVolume = value - (recipeModel.totalVolume - recipeModel.waterVolume);
  recipeModel.setReagentAmount(waterVolume, 'H2O');
}

function onTankInput(value: number | TankType) {
  if (typeof value === 'number') {
    tankChosen.value = {
      name: value.toString(),
      volume: value,
    };
    recipeModel.tankVolume = +value;
  } else {
    tankChosen.value = value;
    recipeModel.tankVolume = value.volumeTotal;
  }
  recipeModel.updateRecipeUnitConcsByAmounts();
}

function inputIonUnitConc(value: number, reagent: InstanceType<typeof Reagent>, ion: string) {
  recipeModel.updateReagentAmountsByUnitConcs(value, reagent, ion);
}

// PAGE MANIPULATION
const { checkName } = useNameExist();

const isReagentsInfo = ref<boolean>(false);
const isUnitConc = ref<boolean>(false);

const tanks = tanksStore.tankModels.map((item) => item.toJson());
const recipes = recipesStore.fertilizerRecipeModels;

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.query.share !== undefined);
const recipeIndex = computed(() => +route.params.id);

const isAddReagentPopup = ref(false);
const isAddChelatorPopup = ref(false);

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

async function onSetChelatorAmount(value: number) {
  recipeModel.setReagentAmount(value, 'C10H14N2Na2O8(H2O)2');
}

definePageMeta({
  title: 'Редактирование рецепта',
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
