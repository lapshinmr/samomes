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
            Это копия рецепта {{ name }}
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
          {{ name }}
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
          <v-row>
            <v-col
              cols="12"
              sm="12"
            >
              <v-combobox
                v-model="reagentsChosen"
                :items="reagents"
                item-title="text"
                variant="underlined"
                multiple
                clearable
                label="Реагенты"
                hint="Вы можете выбрать несколько реагентов"
                persistent-hint
                hide-details="auto"
                :rules="[required]"
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
            </v-col>
            <v-col
              v-if="isReagents"
              cols="12"
              class="pb-0"
            >
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
                    <div class="d-flex justify-space-between caption">
                      <div>{{ reagent.text }}</div>
                      <div>{{ reagent.percent }}</div>
                    </div>
                  </template>
                  <div class="mt-2 mt-sm-4 text-body-2 text-grey-darken-1">
                    Азот и фосфор пересчитаны в нитрат (NO<sub>3</sub>) и фосфат (PO<sub>4</sub>),
                    потому что так принято в аквариумистике.
                  </div>
                </div>
              </v-expand-transition>
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="isReagents"
                cols="12"
              >
                <BaseNumberField
                  v-model="waterVolume"
                  label="Объем воды"
                  suffix="мл"
                  hint="Вы можете пропустить это поле, если хотите использовать сухую смесь"
                  persistent-hint
                  class="mb-2 mb-sm-4"
                  @update:model-value="inputVolume"
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
                  @update:model-value="inputAmount"
                />
              </v-col>
            </v-expand-transition>
            <v-col
              v-if="isLiquid"
              cols="12"
            >
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
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="isUnitConc && isLiquid"
                cols="12"
              >
                <v-combobox
                  v-model.number="tankVolume"
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
                  <div v-if="tankVolume">
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
                            v-for="[ion, value] in recipeObject.recipeIonUnitConcsSorted"
                            :key="ion"
                            class="d-flex justify-space-between"
                          >
                            <div>{{ ion }}:</div>
                            <div class="ml-3">
                              {{ format(value, 3) }}
                              ({{ format(value / recipeObject.totalRecipeUnitConcs * 100, 3) }}%)
                            </div>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
              </v-col>
            </v-expand-transition>
            <v-col
              v-if="isReagents"
              cols="12"
            >
              <RecipesTheElementsTable :recipe="recipeObject" />
            </v-col>
            <v-col
              v-if="isReagents"
              cols="12"
            >
              <v-text-field
                v-model="name"
                variant="underlined"
                label="Название рецепта"
                hide-details="auto"
                hint="* название рецепта должно быть уникальным"
                class="mb-2 mb-sm-4"
                :rules="[required, isNameExist]"
              />
              <v-textarea
                v-model="description"
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
                  v-if="!isCreate && !isShare"
                  color="primary"
                  class="ml-2"
                  @click="onEditRecipe"
                >
                  Сохранить
                </v-btn>
                <v-btn
                  v-if="isCreate || isShare"
                  color="primary"
                  class="ml-2"
                  @click="onAddRecipe"
                >
                  Сохранить
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// TODO: check columns in layout
import { useRouter, useRoute } from 'vue-router';
import { required, positive } from '~/utils/validation';
import type { RecipeExampleType } from '~/utils/types/types';

const router = useRouter();
const route = useRoute();
const snackbarStore = useSnackbarStore();
const recipesStore = useRecipesStore();
const tanksStore = useTanksStore();

// RECIPE FORM MANIPULATION
const recipeForm = ref(null);
const reagentsChosen = ref<Reagent[]>([]);
const recipeExampleChosen = ref(null);
const waterVolume = ref<number | null>(null);
const tankVolume = ref<number | null>(null);
const name = ref<string>('');
const description = ref<string>('');

const reagents = [
  ...Object.entries({ ...FORMULAS, ...COMPOUNDS }).map(([key, data]) => new Reagent({
    key,
    ...data,
    amount: 0,
    type: key in FORMULAS ? ReagentTypeName.FORMULA : ReagentTypeName.COMPOUND,
  })),
];

const isReagents = computed(() => reagentsChosen.value.length > 0);
const isLiquid = computed(() => waterVolume.value !== null && waterVolume.value > 0);

const recipeObject = computed(() => {
  return new Recipe(
    {
      name: name.value,
      description: description.value,
      waterVolume: waterVolume.value,
      tankVolume: tankVolume.value,
      reagents: reagentsChosen.value,
    },
  );
});

const checkSolubilityError = (reagent: ReagentType) => {
  return isLiquid.value && (reagent.amount / waterVolume.value) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return isLiquid.value && (reagent.amount / waterVolume.value) * 1000 > reagent.solubility
    ? `Достигнута максимальная растворимость - ${reagent.solubility} г/л при 20°С!`
    : '';
};

watch(reagentsChosen, () => {
  // Set recipe default name by first reagent name
  if (!name.value && reagentsChosen.value.length === 1) {
    const reagent = reagentsChosen.value[0];
    name.value = reagent.text;
  }
});

const onInputRecipeExample = (recipe: RecipeExampleType) => {
  reagentsChosen.value = [];
  reagents.forEach((reagent) => {
    if (recipe.reagents && reagent.key in recipe.reagents) {
      reagent.amount = recipe.reagents[reagent.key];
      reagentsChosen.value.push(reagent);
    }
  });

  name.value = recipe.name;
  description.value = recipe.description;
  // TODO: remove one of two
  waterVolume.value = recipe.volume || recipe.waterVolume;
  tankVolume.value = recipe.tankVolume;
};

watch(tankVolume, () => {
  if (waterVolume.value) {
    recipeObject.value.updateRecipeUnitConcs();
  }
});

function inputAmount() {
  recipeObject.value.updateRecipeUnitConcs();
}

function inputVolume() {
  recipeObject.value.updateRecipeUnitConcs();
}

const onTankVolumeInput = (value: number | TankType) => {
  if (typeof value === 'number') {
    tankVolume.value = +value;
    return;
  }
  tankVolume.value = value.volume;
};

// TODO: fix bug with changing unit conc of other reagents
function inputIonUnitConc(value: number, reagent: ReagentType, ion: string) {
  recipeObject.value.updateAmounts(value, reagent, ion);
}

// PAGE MANIPULATION
const isReagentsInfo = ref<boolean>(false);
const isUnitConc = ref<boolean>(false);

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.query.share !== undefined);
const recipeIndex = computed(() => +route.params.id);

// TODO: investigate if I need computed here
const tanks = computed(() => tanksStore.tanks);
const recipes = computed(() => recipesStore.recipeModels);
// TODO: check []
const fertilizers = computed(() => recipesStore.fertilizers || []);

const isExist = computed(() => {
  const recipesNames = recipes.value.map((item) => item.name);
  const fertilizersNames = fertilizers.value.map((item) => item.name);
  const recipeFound = recipesNames.find((item) => item === name.value);
  const fertilizerFound = fertilizersNames.find((item) => item === name.value);
  const isExist = recipeFound || fertilizerFound;
  return isExist && !isEdit.value;
});

const isNameExist = () => !isExist.value || 'Рецепт или удобрение с таким названием уже существует';

onMounted(async () => {
  if (isCreate.value && !isCopy.value) {
    return;
  }

  let recipe: RecipeType;
  if (isShare.value) {
    [recipe] = JSON.parse(decodeURIComponent(route.query.share as string));
  } else if (isCopy.value) {
    const recipeIndex = route.query.copy as string;
    recipe = JSON.parse(JSON.stringify({ ...recipes.value[recipeIndex] }));
  } else if (!isCreate.value) {
    recipe = JSON.parse(JSON.stringify({ ...recipes.value[recipeIndex.value] }));
  }

  console.log(recipe);

  if (Object.keys(recipe).length === 0) {
    await router.push('/recipes/');
    return;
  }

  const recipeReagents = {};
  recipe.reagents.forEach((reagent: ReagentType) => {
    recipeReagents[reagent.key] = reagent;
  });
  reagents.forEach((reagent: ReagentType) => {
    if (reagent.key in recipeReagents) {
      reagent.amount = recipeReagents[reagent.key].amount;
      reagentsChosen.value.push(reagent);
    }
  });
});

async function onAddRecipe () {
  const { valid } = await recipeForm.value.validate();
  if (valid) {
    recipesStore.addRecipe({ ...recipeObject.value.toJson() });
    snackbarStore.show('Рецепт добавлен');
    await router.push('/recipes/');
  }
};

async function onEditRecipe() {
  const { valid } = await recipeForm.value.validate();
  if (valid) {
    recipesStore.editRecipe({
      index: recipeIndex.value,
      recipe: recipeObject.value.toJson(),
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
