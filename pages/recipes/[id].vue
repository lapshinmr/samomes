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
        cols="12"
        sm="8"
        offset-sm="2"
        class="d-flex"
      >
        <v-btn
          color="primary"
          class="mr-0"
          square
          to="/recipes/"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          v-if="!isCreate && !isShare"
          color="primary"
          class="ml-auto"
          @click="copyRecipe"
        >
          Скопировать
        </v-btn>
      </v-col>
      <BasePageTitle>
        <template v-if="isCreate && !isCopy">
          Новый рецепт
        </template>
        <template v-else-if="isCopy">
          <div class="text-h5 text-md-h4">
            Это копия рецепта {{ name }}
          </div>
          <div class="subtitle-1 font-weight-regular">
            Внесите изменения и не забудьте сохранить
          </div>
        </template>
        <template v-else-if="isShare">
          <p class="text-h5 text-md-h4">
            С вами поделились рецептом!
          </p>
          <p class="subtitle-1 font-weight-regular">
            Проверьте его, дайте название и не забудьте сохранить.
          </p>
        </template>
        <template v-else>
          {{ name }}
        </template>
      </BasePageTitle>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form
          class="mt-8"
          ref="recipeForm"
        >
          <v-row>
            <v-col
              cols="12"
              sm="12"
            >
              <v-combobox
                v-model="chosenReagents"
                :items="reagents"
                item-title="text"
                multiple
                clearable
                label="Формула"
                hint="Вы можете выбрать несколько реагентов"
                persistent-hint
                hide-details="auto"
                class="mb-2 mb-sm-4"
                :rules="rulesReagent"
              />
              <v-combobox
                v-model="recipeExampleChosen"
                :items="RECIPES"
                item-title="name"
                label="Рецепт"
                hint="или выбрать один из рецептов"
                persistent-hint
                hide-details="auto"
                @update:model-value="onInputRecipeExample"
              />
            </v-col>
            <v-col
              v-if="isReagents"
              cols="12"
              class="pt-0"
            >
              <BaseDividerWithNote class="mb-2 mb-sm-4">
                <v-btn
                  center
                  variant="text"
                  @click="isReagentsInfo = !isReagentsInfo"
                >
                  Подробнее о реагентах
                  <v-icon>{{ isReagentsInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </BaseDividerWithNote>
              <v-expand-transition>
                <div
                  v-if="isReagentsInfo"
                  class="mt-3"
                >
                  <template
                    v-for="reagent in chosenReagents"
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
                  label="Введите объем воды"
                  suffix="мл"
                  hint="Выбирайте объем, который вы сможете использовать в течении 2-3x месяцев. Обычно это 250-300 мл."
                  hide-details="auto"
                  class="mb-2 mb-sm-4"
                  @update:model-value="inputVolume"
                />
                <BaseDividerWithNote class="mb-2 mb-sm-4">
                  Введите массу реагента
                  <v-tooltip
                    location="bottom"
                    max-width="400"
                  >
                    <template #activator="{ props }">
                      <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                    </template>
                    Введите массу реагента и калькулятор автоматически рассчитает
                    дозы элементов, которые показаны ниже.
                  </v-tooltip>
                </BaseDividerWithNote>
                <BaseNumberField
                  v-model="reagent.amount"
                  v-for="reagent in chosenReagents"
                  :key="reagent.key"
                  :label="reagent.text"
                  :suffix="reagent.isLiquid ? 'мл' : 'г'"
                  hide-details="auto"
                  class="mb-2 mb-sm-4"
                  :rules="[required, positive]"
                  :error="checkSolubilityError(reagent)"
                  :error-messages="getSolubilityErrorMessage(reagent)"
                  @update:model-value="inputAmount"
                />
                <RecipesTheElementsTable :recipe="recipeObject" />
              </v-col>
            </v-expand-transition>
              <v-col
                v-if="isWater"
                cols="12"
              >
                <BaseDividerWithNote>
                  Или введите дозу элемента
                  <v-tooltip
                    location="bottom"
                    max-width="400"
                  >
                    <template #activator="{ props }">
                      <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                    </template>
                    Калькулятор автоматически рассчитает
                    необходимую массу реагента.
                    Доза - это количество элемента, на которую повысится концентрация
                    элемента в заданном объеме аквариума при внесении 1 мл удобрения.
                    Например, вы хотите сделать макро удобрение с нитратом.
                    И для удобства введения его в аквариум вы бы хотели, чтобы
                    на каждый вводимый 1 мл удобрения, нитрат повышался на 0.5 мг/л.
                    0.5 - это доза.
                  </v-tooltip>
                </BaseDividerWithNote>
              </v-col>
              <v-expand-transition>
                <v-col
                  v-if="isReagents && isWater"
                  cols="12"
                >
                  <v-combobox
                    v-model.number="tankVolume"
                    :items="tanks"
                    type="number"
                    item-text="name"
                    item-value="volume"
                    label="Объем аквариума"
                    persistent-hint
                    hide-selected
                    hint="Выберите аквариум или введите объем"
                    suffix="л"
                    class="mb-2 mb-sm-4"
                    :return-object="false"
                  />
                  <v-expand-transition>
                    <div v-if="tankVolume">
                      <v-row
                        v-for="reagent in chosenReagents"
                        :key="reagent.key"
                        class="mb-3"
                      >
                        <v-col
                          cols="12"
                          class="font-weight-medium"
                        >
                          {{ reagent.text }}
                        </v-col>
                        <template
                          v-for="(_, ion) in reagent.ions"
                          :key="reagent.key + ion"
                        >
                          <v-col class="py-0">
                            <BaseNumberField
                              v-model.number="reagent.doses[ion]"
                              :label="ion"
                              suffix="мг/л"
                              persistent-hint
                              @update:model-value="inputIonDose($event, reagent, ion)"
                            />
                          </v-col>
                        </template>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          class="d-flex justify-space-between pb-0"
                        >
                          <div>
                            Общая доза, мг/л
                          </div>
                          <div class="d-flex flex-column">
                            <div
                              v-for="[ion, value] in recipeObject.recipeIonDosesSorted"
                              class="d-flex justify-space-between"
                              :key="ion"
                            >
                              <div>{{ ion }}:</div>
                              <div class="ml-3">
                                {{ format(value, 3) }}
                                ({{ format(value / recipeObject.totalRecipeDose * 100, 3) }}%)
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
              <v-text-field
                v-model="name"
                label="Название рецепта"
                hide-details="auto"
                hint="* название рецепта должно быть уникальным"
                class="mb-2 mb-sm-4"
                :rules="rulesName"
              />
              <v-textarea
                v-model="description"
                label="Примечание"
                hide-details="auto"
                auto-grow
                rows="1"
                hint="Вы можете добавить дополнительные сведения к рецепту"
              />
              <div class="d-flex mt-2 mt-sm-4">
                <v-btn
                  v-if="!isCreate && !isShared"
                  color="error"
                  @click="removeRecipe"
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
                  v-if="!isCreate && !isShared"
                  color="primary"
                  @click="editRecipe"
                  class="ml-2"
                >
                  Сохранить
                </v-btn>
                <v-btn
                  v-if="isCreate || isShared"
                  color="primary"
                  class="ml-2"
                  @click="addRecipe"
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
import { useRouter, useRoute } from 'vue-router';
import { useRecipesStore } from '~/stores/recipes';
import { useTanksStore } from '~/stores/tanks';
import FORMULAS from '~/utils/constants/formulas';
import COMPOUNDS from '~/utils/constants/compounds';
import RECIPES from '~/utils/constants/recipes';
import { required, positive } from '~/utils/validation';
import Reagent from "~/utils/Reagent";
import type { RecipeExampleType } from "~/utils/types/types";

const router = useRouter();
const route = useRoute();
const recipesStore = useRecipesStore();
const tanksStore = useTanksStore();

// RECIPE DATA MANIPULATION
const recipeForm = ref(null);
const chosenReagents = ref<Reagent[]>([]);
const recipeExampleChosen = ref(null);
const waterVolume = ref<number | null>(null);
const tankVolume = ref<number | null>(null);
const name = ref<string>('');
const description = ref<string>('');

const rulesReagent = [
  () => chosenReagents.value.length > 0 || 'Выберите реагент',
];

const rulesName = [
  (v) => !!v || 'Введите название',
  () => !isExist.value || 'Рецепт или удобрение с таким названием уже существует',
];

// TODO: refactor this place
const reagents = computed(() => {
  return [
    ...Object.entries(FORMULAS).map(([key, data]) => new Reagent({
      key,
      amount: 0,
      ...data,
      isFormula: true,
    })),
    ...Object.entries(COMPOUNDS).map(([key, data]) => new Reagent({
      key,
      amount: 0,
      ...data,
      isCompound: true,
    }))
  ];
});

const isReagents = computed(() => chosenReagents.value.length > 0);
const isWater = computed(() => waterVolume.value !== null && waterVolume.value > 0);

const recipeObject = computed(() => {
  return new Recipe(
    {
      name: name.value,
      description: description.value,
      waterVolume: waterVolume.value,
      tankVolume: tankVolume.value,
      reagents: chosenReagents.value
    }
  );
})

const checkSolubilityError = (reagent: Reagent) => {
  return isWater.value && (reagent.amount / waterVolume.value) * 1000 > reagent.solubility;
}

const getSolubilityErrorMessage = (reagent: Reagent) => {
  return isWater.value && (reagent.amount / waterVolume.value) * 1000 > reagent.solubility
    ? `Достигнута максимальная растворимость - ${reagent.solubility} г/л при 20°С!`
    : ''
}

watch(chosenReagents, () => {
  // Set default name
  if (!name.value && chosenReagents.value.length === 1) {
    const reagent = chosenReagents.value[0];
    name.value = reagent.text;
  }
});

const onInputRecipeExample = (recipe: RecipeExampleType) => {
  chosenReagents.value = [];
  reagents.value.forEach((reagent) => {
    if (recipe.reagents && reagent.key in recipe.reagents) {
      reagent.amount = recipe.reagents[reagent.key];
      chosenReagents.value.push(reagent);
    }
  });

  name.value = recipe.name;
  description.value = recipe.description;
  waterVolume.value = recipe.volume || recipe.waterVolume;
  tankVolume.value = recipe.tankVolume;
};

watch(tankVolume, () => {
  if (waterVolume.value) {
    recipeObject.value.updateRecipeDoses();
  }
});

function inputAmount() {
  recipeObject.value.updateRecipeDoses();
}

function inputVolume() {
  recipeObject.value.updateRecipeDoses();
}

function inputIonDose(value: number, reagent: Reagent, ion: string) {
  recipeObject.value.updateAmounts(value, reagent, ion);
}


// PAGE MANIPULATION
const isShared = ref<boolean>(false);
const isReagentsInfo = ref<boolean>(false);

const isCreate = computed(() => route.params.id === 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.params.id === 'share');
const recipeIndex = computed(() => route.params.id);

const tanks = computed(() => tanksStore.tanks);
const recipes = computed(() => recipesStore.recipes);
// TODO: check []
const fertilizers = computed(() => recipesStore.fertilizers || []);

const isEdit = computed(() => {
  const recipesNames = recipes.value.map((item) => item.name);
  const index = recipesNames.indexOf(name.value);
  return index === +recipeIndex.value;
});

const isExist = computed(() => {
  const recipesNames = recipes.value.map((item) => item.name);
  const fertilizersNames = fertilizers.value.map((item) => item.name);
  const recipeFound = recipesNames.find((item) => item === name.value);
  const fertilizerFound = fertilizersNames.find((item) => item === name.value);
  const isExist = recipeFound || fertilizerFound;
  return isExist && !isEdit.value;
});

onMounted(async () => {
  if (isCreate.value && !isCopy.value) {
    return;
  }

  let recipe;
  const { share } = route.query;

  if (share) {
    isShared.value = true;
    [recipe] = JSON.parse(decodeURIComponent(share));
  } else if (isCopy.value) {
    const recipeIndex = route.query.copy;
    recipe = JSON.parse(JSON.stringify({ ...recipes.value[+recipeIndex] }));
  } else if (!isCreate.value) {
    recipe = JSON.parse(JSON.stringify({ ...recipes.value[+recipeIndex] }));
  }

  if (Object.keys(recipe).length === 0) {
    await router.push('/recipes/');
  }

  const reagentsArray = [];
  const compoundsArray = [];

  reagents.value.forEach((reagent) => {
    if (recipe.reagents && recipe.reagents.includes(reagent.key)) {
      reagentsArray.push(formula);
    }
  });

  delete recipe.reagents;

  // Assign values to refs
  waterVolume.value = recipe.volume;
  tankVolume.value = recipe.tankVolume;
  reagentsAmount.value = recipe.mass || {};
  name.value = recipe.name || '';
  description.value = recipe.note || null;

  chosenFormulas.value = reagentsArray;
  chosenCompounds.value = compoundsArray;
});


function addRecipe() {
  if (recipeForm.value.validate()) {
    console.log(recipeObject.value.toJson());
    recipesStore.addRecipe({ ...recipeObject.value.toJson() });

    recipesStore.showSnackbar('Рецепт добавлен');
    router.push('/recipes/');
  }
}

function editRecipe() {
  if (recipeForm.value.validate()) {
    recipesStore.editRecipe({
      index: recipeIndex.value,
      recipe: recipeObject.value.toJson(),
    });

    recipesStore.showSnackbar('Рецепт изменен');
    router.push('/recipes/');
  }
}

async function copyRecipe() {
  recipesStore.showSnackbar('Рецепт скопирован');
  await router.push(`/recipes/create/?copy=${recipeIndex.value}`);
}

function removeRecipe() {
  recipesStore.removeRecipe(recipeIndex.value);
  recipesStore.showSnackbar('Рецепт удален');
  router.push('/recipes/');
}

definePageMeta({
  title: 'Редактирование рецепта',
});
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
