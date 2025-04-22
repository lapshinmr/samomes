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
      <LayoutBackButton :path="ROUTES.recipes.path">
        <v-btn
          v-if="!isCreate && !isShare"
          color="primary"
          class="ml-auto"
          size="small"
          @click="onCopyRecipe"
        >
          Скопировать
        </v-btn>
      </LayoutBackButton>
      <LayoutPageTitle>
        <template v-if="isCreate && !isCopy">
          Новый рецепт
        </template>
        <template v-else-if="isCopy">
          <div class="text-h6 text-sm-h5">
            Это копия рецепта {{ recipeModel.name }}
          </div>
          <div class="text-subtitle-1">
            Внесите изменения и не забудьте сохранить
          </div>
        </template>
        <template v-else-if="isShare">
          <p class="text-h6 text-md-h5">
            С вами поделились рецептом!
          </p>
          <p class="text-subtitle-1">
            Проверьте его, дайте название и не забудьте сохранить.
          </p>
        </template>
        <template v-else>
          {{ recipeModel.name }}
        </template>
      </LayoutPageTitle>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form
          ref="recipeForm"
          class="mt-8"
        >
          <v-combobox
            :model-value="reagentsChosen"
            :items="reagents"
            item-title="text"
            variant="underlined"
            multiple
            label="Реагенты"
            hint="Вы можете выбрать несколько реагентов"
            persistent-hint
            chips
            closable-chips
            hide-details="auto"
            :rules="[required]"
            @update:model-value="onInputReagent"
          />
          <v-combobox
            v-model="recipeExampleChosen"
            :items="RECIPES"
            item-title="name"
            variant="underlined"
            label="Рецепты"
            hint="или выбрать один из рецептов"
            persistent-hint
            hide-details="auto"
            @update:model-value="onInputRecipeExample"
          />
          <div v-if="isReagents">
            <BaseDividerWithNote
              v-model="isReagentsInfo"
              button
            >
              Реагенты
            </BaseDividerWithNote>
            <v-expand-transition>
              <div
                v-if="isReagentsInfo"
                class="mt-3"
              >
                <template
                  v-for="reagent in reagentsChosen"
                  :key="reagent.key"
                >
                  <div class="d-flex justify-space-between caption text-body-2">
                    <div>{{ reagent.text }}</div>
                    <div>{{ reagent.percent }}</div>
                  </div>
                </template>
                <div class="mt-2 mt-sm-4 text-body-2 text-grey-darken-1">
                  В аквариумистике концентрации азота и фосфора измеряются в форме нитратов (NO₃⁻) и фосфатов
                  (PO₄³⁻), так как это основные соединения этих элементов, встречающиеся в аквариумах.
                </div>
              </div>
            </v-expand-transition>
          </div>
          <v-expand-transition>
            <div v-if="isReagents">
              <BaseNumberField
                v-model="recipeModel.waterVolume"
                label="Объем воды"
                suffix="мл"
                hint="Вы можете пропустить это поле, если хотите использовать сухую смесь"
                persistent-hint
                class="mb-2 mb-sm-4"
                @update:model-value="onInputWaterVolume"
              />
              <BaseNumberField
                v-for="reagent in reagentsChosen"
                :key="reagent.key"
                v-model="reagent.amount"
                :label="reagent.text"
                :suffix="reagent.isLiquid ? 'мл' : 'г'"
                hide-details="auto"
                class="mb-2 mb-sm-4"
                :rules="[required, positive]"
                :error="checkSolubilityError(reagent)"
                :error-messages="getSolubilityErrorMessage(reagent)"
                @update:model-value="onInputReagentAmount"
              />
            </div>
          </v-expand-transition>
          <div v-if="isLiquid">
            <BaseDividerWithNote
              v-model="isUnitConc"
              button
            >
              Рассчитать массы через удельный прирост концентрации
              <v-tooltip
                location="bottom"
                max-width="400"
              >
                <template #activator="{ props }">
                  <v-icon v-bind="props">
                    mdi-help-circle-outline
                  </v-icon>
                </template>
                Удельный прирост концентрации - это величина, на которую повысится концентрация элемента
                в аквариуме при внесении 1 мл удобрения.
                Например, вы хотите сделать макроудобрение с нитратом.
                И для удобства введения его в аквариум вы бы хотели, чтобы
                при каждом вводимом 1 мл удобрения концентрация нитрата повышалась на 0.5 мг/л / мл.
                0.5 мг/л / мл - это удельный прирост концентрации.
              </v-tooltip>
            </BaseDividerWithNote>
          </div>
          <v-expand-transition>
            <div v-if="isUnitConc && isLiquid">
              <v-combobox
                v-model.number="recipeModel.tankVolume"
                :items="tanks"
                item-title="name"
                variant="underlined"
                label="Выберите аквариум или введите объем"
                persistent-hint
                hide-selected
                suffix="л"
                class="mb-2 mb-sm-4"
                @update:model-value="onTankVolumeInput"
              />
              <v-expand-transition>
                <div v-if="recipeModel.tankVolume">
                  <v-row
                    v-for="reagent in reagentsChosen"
                    :key="reagent.key"
                    class="mb-3"
                  >
                    <v-col
                      cols="12"
                      class="font-weight-medium pb-1"
                    >
                      {{ reagent.text }}
                    </v-col>
                    <template
                      v-for="(_, ion) in reagent.ions"
                      :key="reagent.key + ion"
                    >
                      <v-col class="py-0">
                        <BaseNumberField
                          v-model.number="reagent.unitConcs[ion]"
                          :label="ion"
                          suffix="мг/л / мл"
                          hide-details="auto"
                          @update:model-value="inputIonUnitConc($event, reagent, ion)"
                        />
                      </v-col>
                    </template>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="font-weight-medium">
                        Удельный прирост концентрации, мг/л / мл
                      </div>
                      <div class="d-flex">
                        <div
                          v-for="[ion, value] in recipeModel.recipeIonUnitConcsSorted"
                          :key="ion"
                          class="d-flex justify-space-between mr-3"
                        >
                          <div>{{ ion }}:</div>
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
          <div v-if="isReagents">
            <RecipesTheElementsTable :recipe="recipeModel" />
            <v-text-field
              v-model="recipeModel.name"
              variant="underlined"
              label="Название рецепта"
              hide-details="auto"
              hint="* название рецепта должно быть уникальным"
              class="mb-2 mb-sm-4"
              :rules="[required, isNameExist]"
            />
            <v-textarea
              v-model="recipeModel.description"
              variant="underlined"
              label="Описание"
              hide-details="auto"
              auto-grow
              rows="1"
              hint="Вы можете добавить дополнительные сведения к рецепту"
            />
            <div class="d-flex mt-2 mt-sm-4">
              <v-btn
                v-if="!isCreate && !isShare"
                color="error"
                @click="onRemoveRecipe"
              >
                Удалить
              </v-btn>
              <v-btn
                class="ml-auto"
                @click="$router.push('/recipes/')"
              >
                Отмена
              </v-btn>
              <v-btn
                color="primary"
                class="ml-2"
                v-on="isCreate || isShare ? { click: onAddRecipe } : { click: onEditRecipe }"
              >
                Сохранить
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { required, positive } from '~/utils/validation';
import type { FertilizerRecipeExampleType } from '~/utils/types/types';

const router = useRouter();
const route = useRoute();
const snackbarStore = useSnackbarStore();
const recipesStore = useRecipesStore();
const tanksStore = useTanksStore();

const { getReagents } = useReagents();

// MODEL
const recipeForm = ref(null);
const reagentsChosen = ref<InstanceType<typeof Reagent>[]>([]);
const recipeExampleChosen = ref(null);

const INITIAL_REAGENT_AMOUNT = 0;
const reagents = getReagents(INITIAL_REAGENT_AMOUNT);

const recipeModel = reactive(new FertilizerRecipe(
  {
    name: '',
    description: '',
    waterVolume: null,
    tankVolume: null,
    reagents: [],
  },
));

const isReagents = computed(() => reagentsChosen.value.length > 0);
const isLiquid = computed(() => recipeModel.waterVolume !== null && recipeModel.waterVolume > 0);

function fillForm(recipe: FertilizerRecipeType | FertilizerRecipeExampleType) {
  recipeModel.name = recipe.name;
  recipeModel.description = recipe.description;
  recipeModel.waterVolume = recipe.waterVolume;
  recipeModel.tankVolume = recipe.tankVolume;
}

watch(reagentsChosen, () => {
  // Set recipe default name by first reagent name
  if (!recipeModel.name && reagentsChosen.value.length === 1) {
    const reagent = reagentsChosen.value[0];
    recipeModel.name = reagent.text;
  }
});

function onInputReagent(value: InstanceType<typeof Reagent>[]) {
  if (value.length > reagentsChosen.value.length) {
    const lastReagent = [...value].pop();
    // Skip if search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
  }
  reagentsChosen.value = value;
  recipeModel.reagents = [...reagentsChosen.value].map((reagent) => new Reagent(reagent));
}

const onInputRecipeExample = (recipe: FertilizerRecipeExampleType) => {
  reagentsChosen.value = [];
  recipe.reagents.forEach(({ key, amount }) => {
    const reagentFound = reagents.find((reagent) => reagent.key === key);
    if (reagentFound) {
      reagentFound.amount = amount;
      reagentsChosen.value.push(reagentFound);
      recipeModel.reagents.push(reagentFound);
    }
  });
  fillForm(recipe);
};

function onInputReagentAmount() {
  recipeModel.updateRecipeUnitConcs();
}

function onInputWaterVolume() {
  recipeModel.updateRecipeUnitConcs();
}

const onTankVolumeInput = (value: number | TankType) => {
  if (typeof value === 'number') {
    recipeModel.tankVolume = +value;
    return;
  }
  recipeModel.tankVolume = value.volume;
  if (recipeModel.waterVolume) {
    recipeModel.updateRecipeUnitConcs();
  }
};

// TODO: fix bug with changing unit conc of other reagents
function inputIonUnitConc(value: number, reagent: ReagentType, ion: string) {
  recipeModel.updateAmounts(value, reagent, ion);
}

// PAGE MANIPULATION
const { checkName } = useNameExist();

const isReagentsInfo = ref<boolean>(false);
const isUnitConc = ref<boolean>(false);

const tanks = tanksStore.tanks;
const recipes = recipesStore.fertilizerRecipeModels;

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.query.share !== undefined);
const recipeIndex = computed(() => +route.params.id);

// Validation
const isExist = computed(() => {
  return checkName(recipeModel.name) && !isEdit.value;
});

const isNameExist = () => !isExist.value || 'Рецепт или удобрение с таким названием уже существует';

const checkSolubilityError = (reagent: ReagentType) => {
  return isLiquid.value && (reagent.amount / recipeModel.waterVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return isLiquid.value && (reagent.amount / recipeModel.waterVolume) * 1000 > reagent.solubility
    ? `Достигнута максимальная растворимость - ${reagent.solubility} г/л при 25°С!`
    : '';
};

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
    await router.push('/recipes/');
    return;
  }

  const recipeReagents = {};
  recipe.reagents.forEach((reagent: ReagentType) => {
    recipeReagents[reagent.key] = reagent;
  });
  reagents.forEach((reagent: InstanceType<typeof Reagent>) => {
    if (reagent.key in recipeReagents) {
      reagent.amount = recipeReagents[reagent.key].amount;
      reagentsChosen.value.push(reagent);
      recipeModel.reagents.push(reagent);
    }
  });
  fillForm(recipe);
});

async function onAddRecipe () {
  const { valid } = await recipeForm.value.validate();
  if (valid) {
    recipesStore.addRecipe({ ...recipeModel.toJson() });
    snackbarStore.show('Рецепт добавлен');
    await router.push('/recipes/');
  }
}

async function onEditRecipe() {
  const { valid } = await recipeForm.value.validate();
  if (valid) {
    recipesStore.editRecipe({
      index: recipeIndex.value,
      recipe: recipeModel.toJson(),
    });

    snackbarStore.show('Рецепт изменен');
    await router.push('/recipes/');
  }
}

async function onRemoveRecipe() {
  recipesStore.removeRecipe(recipeIndex.value);
  snackbarStore.show('Рецепт удален');
  await router.push('/recipes/');
}

async function onCopyRecipe() {
  snackbarStore.show('Рецепт скопирован');
  await router.push(`/recipes/create/?copy=${recipeIndex.value}`);
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
