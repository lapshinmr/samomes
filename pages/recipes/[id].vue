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
        <v-form ref="recipeForm">
          <v-row>
            <v-col
              cols="12"
              class="pt-0 mt-8"
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-combobox
                    v-model="chosenFormulas"
                    :items="formulas"
                    item-title="text"
                    :search-input.sync="searchReagent"
                    multiple
                    clearable
                    label="Формула"
                    hint="Вы можете выбрать несколько реагентов"
                    persistent-hint
                    hide-details="auto"
                    :rules="rulesReagent"
                    @blur="searchReagent = ''"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-combobox
                    v-model="recipeExampleChosen"
                    :items="recipesExamples"
                    label="Рецепт"
                    hint="или выбрать один из рецептов"
                    persistent-hint
                    hide-details="auto"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-combobox
                    v-model="compounds"
                    :items="compoundsList"
                    item-title="text"
                    :search-input.sync="searchCompound"
                    clearable
                    multiple
                    label="Готовая смесь"
                    hint="Вы можете выбрать несколько смесей"
                    persistent-hint
                    hide-details="auto"
                    :rules="rulesReagent"
                    @blur="searchCompound = ''"
                  />
                </v-col>
                <v-col
                  v-if="isReagents"
                  cols="12"
                  class="pt-0"
                >
                  <div
                    class="mt-3"
                  >
                    <template
                      v-for="reagent in chosenFormulas"
                      :key="reagent.value"
                    >
                      <div
                        class="d-flex justify-space-between caption"
                      >
                        <div>{{ reagent.text }}</div>
                        <div>{{ showComponents(countPercent(reagent.key)) }}</div>
                      </div>
                    </template>
                    <template
                      v-for="compound in compounds"
                      :key="compound.name"
                    >
                      <div
                        class="d-flex justify-space-between caption"
                      >
                        <div>{{ compound.name }}</div>
                        <div>{{ showComponents(compound.ions) }}</div>
                      </div>
                    </template>
                  </div>
                  <div class="mt-3">
                    <small>
                      *Так как аквариумисту удобнее работать с нитратом (NO3), а не с азотом (N), далее
                      азот в любой форме будет приведен к нитрату.
                    </small>
                  </div>
                </v-col>
                <v-expand-transition>
                  <v-col
                    v-if="isReagents"
                    cols="12"
                  >
                    <BaseNumberField
                      v-model.number="waterVolume"
                      label="Введите объем воды"
                      suffix="мл"
                      hint="Выбирайте объем, который вы сможете использовать в течении 2-3x месяцев.
                              Обычно это 250-300 мл."
                      hide-details="auto"
                      @input="inputVolume"
                    />
                  </v-col>
                </v-expand-transition>
                <v-expand-transition>
                  <v-col
                    v-if="isReagents && (waterVolume || !isWater)"
                    cols="12"
                  >
                    <v-row>
                      <v-col
                        v-if="isWater"
                        cols="12"
                      >
                        <BaseDividerWithNote>
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
                      </v-col>
                      <v-col
                        v-for="reagent in chosenFormulas"
                        :key="reagent.key"
                        cols="12"
                        class="py-0"
                      >
                        <BaseNumberField
                          :key="reagent.key"
                          :model-value="reagentsAmount[reagent.key]"
                          :label="reagent.text"
                          :precision-show="3"
                          :suffix="reagent.density ? 'мл' : 'г'"
                          hide-details="auto"
                          :rules="[required, positive]"
                          :error="isWater && (reagentsAmount[reagent.key] / waterVolume) * 1000
                            > FORMULAS[reagent.key].solubilityLimit"
                          :error-messages="
                            isWater && (reagentsAmount[reagent.key] / waterVolume) * 1000
                              > FORMULAS[reagent.key].solubilityLimit
                              ? `Достигнута максимальная растворимость -
                                        ${FORMULAS[reagent.key].solubilityLimit} г/л при 20°С!`
                              : ''
                          "
                          @input="inputMass($event, reagent.key)"
                        />
                      </v-col>
                      <v-col
                        v-for="compound in compounds"
                        :key="compound.key"
                        cols="12"
                        class="py-0"
                      >
                        <BaseNumberField
                          :key="compound.key"
                          :model-value="reagentsAmount[compound.key]"
                          :precision-show="3"
                          :label="compound.text"
                          :suffix="compound.isLiquid ? 'мл' : 'г'"
                          hide-details="auto"
                          :rules="[
                            rulesMass.isExist(),
                          ]"
                          @input="inputMass($event, compound.key)"
                        />
                      </v-col>
                      <v-expand-transition>
                        <v-col
                          v-if="isWater"
                          cols="12"
                          class="pt-0"
                        >
                          <RecipesTheElementsTable
                            :total-ion-concentration="totalIonConcentration"
                            :fertilizer-mass="reagentsAmount"
                            :concentration="concentration"
                          />
                        </v-col>
                      </v-expand-transition>
                      <v-expand-transition>
                        <v-col
                          v-if="!isWater"
                          cols="12"
                          class="pt-0"
                        >
                          <RecipesTheElementsDryTable
                            :total-ion-concentration="totalIonConcentration"
                            :fertilizer-mass="reagentsAmount"
                            :total-fertilizer-mass="totalFertilizerMass"
                          />
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
                            :return-object="false"
                          />
                        </v-col>
                      </v-expand-transition>
                      <v-col
                        v-if="tankVolume && isWater"
                        cols="12"
                        class="pb-0"
                      >
                        <v-row>
                          <template
                            v-for="reagent in chosenFormulas"
                            :key="reagent.key"
                          >
                            <v-col
                              cols="12"
                              class="py-0"
                            >
                              <v-row class="mb-3">
                                <template v-for="(data, ion) in FORMULAS[reagent.key].ions">
                                  <v-col
                                    v-if="data.isNeeded"
                                    :key="reagent.key + ion"
                                    class="py-0"
                                  >
                                    <BaseNumberField
                                      :value="solute[reagent.key][ion]"
                                      :precision-show="3"
                                      :precision-value="5"
                                      :label="convertIonName(ion) + ', мг/л'"
                                      :hint="'из ' + reagent.key"
                                      persistent-hint
                                      @input="inputIonDose($event, reagent.key, ion)"
                                    />
                                  </v-col>
                                </template>
                              </v-row>
                            </v-col>
                          </template>
                          <template
                            v-for="compound in compounds"
                            :key="compound.key"
                          >
                            <v-col
                              cols="12"
                              class="py-0"
                            >
                              <v-row class="mb-3">
                                <template
                                  v-for="ion in Object.keys(compound.ions)"
                                  :key="compound.key + ion"
                                >
                                  <v-col class="py-0">
                                    <BaseNumberField
                                      :value="solute[compound.key][ion]"
                                      :precision-show="3"
                                      :precision-value="5"
                                      :label="convertIonName(ion) + ', мг/л'"
                                      :hint="'из ' + compound.key"
                                      persistent-hint
                                      @input="inputIonDose($event, compound.key, ion)"
                                    />
                                  </v-col>
                                </template>
                              </v-row>
                            </v-col>
                          </template>
                          <v-col
                            v-if="isReagents"
                            cols="12"
                            class="d-flex justify-space-between pb-0"
                          >
                            <div>
                              Общая доза, мг/л
                            </div>
                            <div class="d-flex flex-column">
                              <div
                                v-for="[ion, value] in ionTotalDoseSorted"
                                class="d-flex justify-space-between"
                                :key="ion"
                              >
                                <div>{{ convertIonName(ion) }}:</div>
                                <div class="ml-3">
                                  {{ formatPrecision(value, 3) }}
                                  <template v-if="countTotalDose(solute)">
                                    ({{ formatPrecision(value / countTotalDose(solute) * 100, 2) }}%)
                                  </template>
                                </div>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-expand-transition>
                <v-expand-transition>
                  <v-col
                    v-if="isReagents && (waterVolume || !isWater)"
                    cols="12"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="name"
                          label="Название рецепта"
                          hide-details="auto"
                          hint="* название рецепта должно быть уникальным"
                          :rules="rulesName"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="note"
                          label="Примечание"
                          hide-details="auto"
                          auto-grow
                          rows="1"
                          hint="Вы можете добавить дополнительные сведения к рецепту"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        class="d-flex"
                      >
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
                      </v-col>
                    </v-row>
                  </v-col>
                </v-expand-transition>
              </v-row>
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
import {
  countTotalIonConcentration,
  countPercent,
  countTotalIonDose,
  countTotalDose,
  convertIonName,
  convertIonRatio,
  prepareFormulas,
} from '~/utils/funcs';
import { required, positive } from '~/utils/validation';
// import type { FormulaType } from "~/utils/types/types";

definePageMeta({
  title: 'Редактирование рецепта',
});

const router = useRouter();
const route = useRoute();
const recipesStore = useRecipesStore();
const tanksStore = useTanksStore();

const recipeForm = ref(null);
const isShared = ref<boolean>(false);
const chosenFormulas = ref([]);
const compounds = ref([]);
const searchReagent = ref<string>('');
const searchCompound = ref<string>('');
const recipeExampleChosen = ref(null);
const waterVolume = ref<number | null>(null);
const tankVolume = ref<number | null>(null);
const reagentsAmount = ref<Record<string, number>>({});
const solute = ref({});
const name = ref<string>('');
const note = ref<string>('');


const isWater = computed(() => {
  return waterVolume.value !== null && waterVolume.value > 0;
});

const reagents = computed(() => {
  return chosenFormulas.value.map((item) => ({
    ...item,
    amount: reagentsAmount[item.key] || 0,
  }))
});

const recipeObject = computed(() => {
  return new Recipe(
    {
      name,
      note,
      waterVolume,
      tankVolume,
      reagents: reagents.value,
      compounds,
    }
  );
})

const rulesReagent = [
  () => (chosenFormulas.value.length > 0 || compounds.value.length > 0) || 'Выберите реагент',
];

const rulesMass = {
  isExist() {
    return (v) => !!v || 'Введите массу';
  },
};

// const rulesVolume = {
//   isExist() {
//     return (v) => !!v || 'Введите объем удобрения';
//   },
// };

const rulesName = [
  (v) => !!v || 'Введите название',
  () => !isExist.value || 'Рецепт или удобрение с таким названием уже существует',
];

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
    recipe = JSON.parse(JSON.stringify({ ...recipes.value[recipeIndex] }));
  } else if (!isCreate.value) {
    recipe = JSON.parse(JSON.stringify({ ...recipes.value[recipeIndex.value] }));
  }

  if (Object.keys(recipe).length === 0) {
    await router.push('/recipes/');
  }

  const reagentsArray = [];
  const compoundsArray = [];

  formulas.value.forEach((formula) => {
    if (recipe.reagents && recipe.reagents.includes(formula.key)) {
      reagentsArray.push(formula);
    }
  });

  compoundsList.value.forEach((compound) => {
    if (recipe.compounds && recipe.compounds.includes(compound.key)) {
      compoundsArray.push(compound);
    }
  });

  delete recipe.reagents;
  delete recipe.compounds;

  // Assign values to refs
  waterVolume.value = recipe.volume;
  tankVolume.value = recipe.tankVolume;
  reagentsAmount.value = recipe.mass || {};
  name.value = recipe.name || '';
  note.value = recipe.note || null;

  chosenFormulas.value = reagentsArray;
  compounds.value = compoundsArray;
});

const isCreate = computed(() => route.params.id === 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.params.id === 'share');
const recipeIndex = computed(() => route.params.id);

const tanks = computed(() => tanksStore.tanks);
const recipes = computed(() => recipesStore.recipes);
const fertilizers = computed(() => recipesStore.fertilizers || []);

const formulas = computed(() => {
  return prepareFormulas();
});

const compoundsList = computed(() => {
  const result = [];
  Object.entries(COMPOUNDS).forEach(([name, data]) => {
    result.push({
      key: name,
      text: data.name,
      ...data,
    });
  });
  result.sort((a, b) => a.text.localeCompare(b.name));
  return result;
});

const recipesExamples = computed(() => {
  const recipeExamples = [];
  RECIPES.forEach((item) => {
    recipeExamples.push(item.name);
  });
  recipeExamples.sort((a, b) => a.localeCompare(b));
  return recipeExamples;
});

const isReagents = computed(() => {
  return chosenFormulas.value.length > 0 || compounds.value.length > 0;
});

const totalFertilizerMass = computed(() => {
  return Object.values(reagentsAmount.value).reduce((sum, value) => sum + +value, 0);
});

const concentration = computed(() => {
  const result = {};
  if (isReagents.value && Object.keys(reagentsAmount.value).length > 0) {
    chosenFormulas.value.forEach((reagent) => {
      result[reagent.key] = {};
      const { ions, HCO3 } = reagent;
      Object.entries(ions).forEach(([ion, data]) => {
        if (data.isNeeded) {
          let factor = 1;
          if (waterVolume.value) {
            factor = 1 / (waterVolume.value / 1000);
          } else if (!waterVolume.value) {
            factor = 1 / totalFertilizerMass.value;
          }
          if (ion === 'CO3' && HCO3) {
            factor *= HCO3;
          }
          result[reagent.key][ion] = reagentsAmount.value[reagent.key] * countPercent(reagent.key)[ion] * factor;
        }
      });
    });
    compounds.value.forEach((compound) => {
      result[compound.key] = {};
      const { ions } = compound;
      Object.entries(ions).forEach(([ion, value]) => {
        let factor = 1;
        if (waterVolume.value) {
          factor = 1 / (waterVolume.value / 1000);
        } else if (!waterVolume.value) {
          factor = 1 / totalFertilizerMass.value;
        }
        result[compound.key][ion] = reagentsAmount.value[compound.key] * value * factor;
      });
    });
  }
  return result;
});

const totalIonConcentration = computed(() => {
  return countTotalIonConcentration(concentration.value);
});

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

const ionTotalDoseSorted = computed(() => {
  const result = Object.entries(countTotalIonDose(solute.value));
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

watch(chosenFormulas, (newValue, oldValue) => {
  if (newValue.length < oldValue.length) {
    const reagentsToRemove = oldValue.filter((item) => !newValue.includes(item));
    reagentsToRemove.forEach((item) => {
      delete reagentsAmount.value[item.key];
    });
  }

  if (!name.value && chosenFormulas.value.length === 1) {
    const reagent = chosenFormulas.value[0];
    name.value = reagent.key;
  }

  const soluteObj = {};
  chosenFormulas.value.forEach((reagent) => {
    const { ions } = reagent;
    soluteObj[reagent.key] = {};
    Object.entries(ions).forEach(([ion, data]) => {
      if (data.isNeeded) {
        soluteObj[reagent.key][ion] = 0;
      }
    });
  });

  solute.value = { ...soluteObj };
  const massObj = { ...reagentsAmount.value };

  chosenFormulas.value.forEach((reagent) => {
    if (!(reagent.key in massObj)) {
      massObj[reagent.key] = 0;
    }
  });

  reagentsAmount.value = { ...massObj };

  if (waterVolume.value) {
    countDose();
  }
}, { deep: true });

watch(compounds, (newValue, oldValue) => {
  if (newValue.length < oldValue.length) {
    const compoundsToRemove = oldValue.filter((item) => !newValue.includes(item));
    compoundsToRemove.forEach((item) => {
      delete reagentsAmount.value[item.key];
    });
  }

  if (!name.value && compounds.value.length === 1) {
    name.value = compounds.value[0].key;
  }

  const soluteObj = {};
  compounds.value.forEach((compound) => {
    const { ions } = compound;
    soluteObj[compound.key] = {};
    Object.keys(ions).forEach((ion) => {
      soluteObj[compound.key][ion] = 0;
    });
  });

  solute.value = { ...soluteObj };
  const massObj = { ...reagentsAmount.value };

  compounds.value.forEach((compound) => {
    if (!(compound.key in massObj)) {
      massObj[compound.key] = 0;
    }
  });

  reagentsAmount.value = { ...massObj };

  if (waterVolume.value) {
    countDose();
  }
}, { deep: true });

watch(recipeExampleChosen, () => {
  const recipe = RECIPES.find((item) => item.name === recipeExampleChosen.value);
  reagentsAmount.value = {};

  if (recipe) {
    const reagentsArray = [];
    formulas.value.forEach((formula) => {
      if (recipe.reagents && formula.key in recipe.reagents) {
        reagentsArray.push(formula);
      }
    });

    const compoundsArray = [];
    compoundsList.value.forEach((compound) => {
      if (recipe.compounds && compound.key in recipe.compounds) {
        compoundsArray.push(compound);
      }
    });

    chosenFormulas.value = reagentsArray;
    compounds.value = compoundsArray;
    name.value = recipe.name;
    note.value = recipe.note;
    waterVolume.value = recipe.volume || recipe.waterVolume;
    tankVolume.value = recipe.tankVolume;

    if (recipe.reagents) {
      Object.entries(recipe.reagents).forEach(([reagent, massValue]) => {
        reagentsAmount.value[reagent] = massValue;
      });
    }

    if (recipe.compounds) {
      Object.entries(recipe.compounds).forEach(([compound, massValue]) => {
        reagentsAmount.value[compound] = massValue;
      });
    }
  }
});

watch(tankVolume, () => {
  if (waterVolume.value) {
    countDose();
  }
});

function countDose() {
  chosenFormulas.value.forEach((reagent) => {
    const { ions } = reagent;
    const result = {};
    Object.entries(ions).forEach(([ion, data]) => {
      if (data.isNeeded) {
        result[ion] = (
          (reagentsAmount.value[reagent.key] / waterVolume.value / tankVolume.value)
          * (countPercent(reagent.key)[ion] * convertIonRatio(ion) * 1000)
        );
        solute.value[reagent.key] = result;
      }
    });
  });

  compounds.value.forEach((compound) => {
    const { ions } = compound;
    const result = {};
    Object.entries(ions).forEach(([ion, value]) => {
      result[ion] = (
        (reagentsAmount.value[compound.key] / waterVolume.value / tankVolume.value) * (value * convertIonRatio(ion) * 1000)
      );
      solute.value[compound.key] = result;
    });
  });
}

function showComponents(ions) {
  const output = [];
  Object.entries(ions).forEach(([ion, value]) => {
    output.push(`${ion}: ${(value * 100).toFixed(2)}%`);
  });
  return output.join(' ');
}

function inputMass(value, key) {
  const massValue = +value;
  reagentsAmount.value[key] = massValue || '';
  if (tankVolume.value && +massValue) {
    countDose();
  }
}

function inputVolume(value) {
  waterVolume.value = +value;
  if (tankVolume.value && +value) {
    countDose();
  }
}

function isFormula(name) {
  return name in FORMULAS;
}

function inputIonDose(value, key, curIon) {
  const soluteObj = {};
  const ratio = {};

  Object.keys(solute.value[key]).forEach((ion) => {
    ratio[ion] = convertIonRatio(ion);
  });

  Object.keys(solute.value[key]).forEach((ion) => {
    let ionDose = parseFloat(value);
    if (ion !== curIon) {
      if (ratio[curIon] > 1) {
        ionDose /= ratio[curIon];
      } else {
        ionDose *= ratio[ion];
      }
      if (isFormula(key)) {
        ionDose *= (countPercent(key)[ion] / countPercent(key)[curIon]);
      } else {
        ionDose *= (COMPOUNDS[key].ions[ion] / COMPOUNDS[key].ions[curIon]);
      }
    }
    soluteObj[ion] = +ionDose || 0;
    solute.value[key] = soluteObj;
  });

  const fertilizerMass = { ...reagentsAmount.value };
  let massValue = 0;

  if (!solute.value[key][curIon]) {
    massValue = 0;
  } else if (isFormula(key)) {
    massValue = (solute.value[key][curIon] * tankVolume.value * waterVolume.value)
      / 1000 / countPercent(key)[curIon] / convertIonRatio(curIon);
  } else {
    massValue = (solute.value[key][curIon] * tankVolume.value * waterVolume.value)
      / 1000 / COMPOUNDS[key].ions[curIon] / convertIonRatio(curIon);
  }

  fertilizerMass[key] = massValue;
  reagentsAmount.value = { ...fertilizerMass };
}

function addRecipe() {
  if (recipeForm.value.validate()) {
    recipesStore.addRecipe({
      name: name.value,
      note: note.value,
      volume: waterVolume.value,
      tankVolume: tankVolume.value,
      reagents: [...chosenFormulas.value.map((reagent) => reagent.key)],
      compounds: [...compounds.value.map((compound) => compound.key)],
      mass: { ...reagentsAmount.value },
      concentration: { ...concentration.value },
    });

    recipesStore.showSnackbar('Рецепт добавлен');
    router.push('/recipes/');
  }
}

function editRecipe() {
  if (recipeForm.value.validate()) {
    recipesStore.editRecipe({
      index: recipeIndex.value,
      recipe: {
        name: name.value,
        note: note.value,
        volume: waterVolume.value,
        tankVolume: tankVolume.value,
        reagents: [...chosenFormulas.value.map((reagent) => reagent.key)],
        compounds: [...compounds.value.map((compound) => compound.key)],
        mass: { ...reagentsAmount.value },
        concentration: { ...concentration.value },
      },
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

function formatPrecision(value, precision = 2) {
  if (value === undefined || value === null) return '';

  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(num)) return '';

  // Format with the specified precision
  const formatted = num.toFixed(precision);

  // Remove trailing zeros
  return formatted.replace(/\.?0+$/, '');
}
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
