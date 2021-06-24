<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

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
      <page-title>
        Рецепты
      </page-title>
      <guide>
        На этой странице можно добавить рецепты самодельных удобрений.
        <br>
        <br>
        Можно составить свой рецепт, а так же можно воспользоваться готовыми рецептами других аквариумистов.
        <br>
        <br>
        Рецепты - это ваши собственные удобрения, которые можно использовать при составлении
        <router-link to="/schedules">
          расписания
        </router-link>
        внесения удобрений.
      </guide>
      <v-col
        v-if="recipes.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного рецепта
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-expansion-panels
          multiple
        >
          <draggable
            v-model="recipes"
            v-bind="dragOptions"
            @start="drag=true"
            @end="drag=false"
            handle=".handle"
            style="width: 100%;"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <v-expansion-panel
                v-for="(recipe, index) in recipes"
                :key="recipe.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div
                    class="d-flex justify-space-between align-center"
                    style="width: 100%;"
                  >
                    <span
                      class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
                      :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                    >
                      <span style="line-height: 1.25rem;">
                        {{ recipe.name }}
                      </span>
                    </span>
                    <span class="mr-3">
                      <v-tooltip
                        bottom
                        max-width="400"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon
                            class="handle ml-2"
                            v-on="on"
                          >mdi mdi-drag</v-icon>
                        </template>
                        {{ $t('recipes.panels.header.pull') }}
                      </v-tooltip>
                    </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Recipe :recipe="recipe" />
                  <div class="d-flex justify-end mt-4">
                    <v-btn
                      text
                      @click="openShareDialog(index)"
                    >
                      Поделиться
                    </v-btn>
                    <v-btn
                      text
                      @click="openEditRecipe(index)"
                      class="mr-n4"
                    >
                      Открыть
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </draggable>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title v-if="!isEditing">
            {{ $t('recipes.dialog.recipeEdit') }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            {{ $t('recipes.dialog.recipeEdit') }}
          </v-toolbar-title>
          <v-btn
            icon
            dark
            @click="dialog = false"
            class="ml-auto"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="8"
                offset-md="2"
              >
                <v-form ref="recipeForm">
                  <v-row>
                    <shared v-if="isShared" />
                    <v-col
                      cols="12"
                      class="pt-0 mt-8"
                    >
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-select
                            :items="reagents"
                            item-text="text"
                            item-value="value"
                            v-model="reagentsSelected"
                            multiple
                            label="Реагент"
                            hint="Вы можете выбрать несколько реагентов"
                            persistent-hint
                            hide-details="auto"
                            :rules="rulesReagent"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-select
                            :items="recipesExamples"
                            v-model="recipeExampleChosen"
                            label="Рецепт"
                            hint="или выбрать один из рецептов"
                            persistent-hint
                            hide-details="auto"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          class="pt-0"
                        >
                          <div
                            v-if="reagentsSelected.length > 0"
                            class="mt-3"
                          >
                            <template v-for="(reagent, index) in reagents">
                              <div
                                v-if="reagentsSelected.includes(reagent.value)"
                                class="d-flex justify-space-between caption"
                                :key="reagent.value"
                              >
                                <div>{{ reagents[index].name }}</div>
                                <div>{{ showComponents(countPercent(reagent.value)) }}</div>
                              </div>
                            </template>
                          </div>
                          <div
                            v-if="reagentsSelected.length > 0"
                            class="mt-3"
                          >
                            <small>
                              *Так как аквариумисту удобнее работать с нитратом (NO3), а не с азотом (N), далее
                              азот будет приведен к нитрату.
                            </small>
                          </div>
                        </v-col>
                        <v-expand-transition>
                          <v-col
                            v-if="reagentsSelected.length > 0"
                            cols="12"
                          >
                            <v-radio-group
                              :value="isWater"
                              @change="setIsWater"
                              row
                              hide-details="auto"
                            >
                              <v-radio
                                label="Водный раствор"
                                :value="true"
                              />
                              <v-radio
                                label="Безводная смесь"
                                :value="false"
                              />
                            </v-radio-group>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col
                            v-if="reagentsSelected.length > 0 && isWater"
                            cols="12"
                          >
                            <v-text-field
                              :value="fertilizerVolume"
                              @input="inputVolume"
                              type="number"
                              label="Введите объем удобрения"
                              suffix="мл"
                              hint="Выбирайте объем, который вы сможете использовать в течении 2-3x месяцев.
                              Обычно это 250-300 мл."
                              hide-details="auto"
                              :rules="[isWater ? rulesVolume.isExist() : true]"
                            />
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col
                            v-if="reagentsSelected.length > 0 && (fertilizerVolume || !isWater)"
                            cols="12"
                          >
                            <v-row>
                              <v-col
                                v-if="isWater"
                                cols="12"
                              >
                                <div class="d-flex align-center">
                                  <v-divider />
                                  <span class="mx-3">
                                    Введите массу реагента
                                    <v-tooltip
                                      bottom
                                      max-width="400"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                      </template>
                                      Введите массу реагента и калькулятор автоматически рассчитает
                                      дозы элементов, которые показаны ниже.
                                    </v-tooltip>
                                  </span>
                                  <v-divider />
                                </div>
                              </v-col>
                              <v-col
                                v-for="reagent in reagentsSelected"
                                cols="12"
                                :key="reagent"
                                class="py-0"
                              >
                                <v-text-field
                                  :value="fertilizerMass[reagent]"
                                  @input="inputMass($event, reagent)"
                                  type="number"
                                  :label="reagent"
                                  suffix="г"
                                  :hint="isWater ? fertilizerMassHint(reagent) : ''"
                                  hide-details="auto"
                                  :key="reagent"
                                  :rules="[
                                    rulesMass.isExist(),
                                    // isWater ? rulesMass.solubility(reagent, fertilizerVolume, FORMULAS) : true
                                  ]"
                                  :error="(fertilizerMass[reagent] / fertilizerVolume) * 1000
                                    > FORMULAS[reagent].solubilityLimit"
                                  :error-messages="
                                    (fertilizerMass[reagent] / fertilizerVolume) * 1000
                                      > FORMULAS[reagent].solubilityLimit
                                      ? `Достигнута максимальная растворимость -
                                      ${FORMULAS[reagent].solubilityLimit} г/л при 20°С!`
                                      : ''
                                  "
                                />
                              </v-col>
                              <v-col
                                v-if="isWater"
                                cols="12"
                                class="mt-2 pb-0"
                              >
                                <v-btn
                                  center
                                  text
                                  @click="isShowConcentration = !isShowConcentration"
                                  class="px-0"
                                >
                                  Показать концентрации
                                  <v-icon>{{ isShowConcentration ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                              </v-col>
                              <v-expand-transition>
                                <v-col
                                  cols="12"
                                  v-if="isShowConcentration && isWater"
                                  class="pt-0"
                                >
                                  <elements-table
                                    :total-ion-concentration="totalIonConcentration"
                                    :fertilizer-mass="fertilizerMass"
                                    :concentration="concentration"
                                  />
                                </v-col>
                              </v-expand-transition>
                              <v-expand-transition>
                                <v-col
                                  cols="12"
                                  v-if="!isWater"
                                  class="pt-0"
                                >
                                  <elements-dry-table
                                    :total-ion-concentration="totalIonConcentration"
                                    :fertilizer-mass="fertilizerMass"
                                    :total-fertilizer-mass="totalFertilizerMass"
                                  />
                                </v-col>
                              </v-expand-transition>
                              <v-col
                                v-if="isWater"
                                cols="12"
                              >
                                <div class="d-flex align-center">
                                  <v-divider />
                                  <span class="mx-3">
                                    Или введите дозу элемента
                                    <v-tooltip
                                      bottom
                                      max-width="400"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
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
                                  </span>
                                  <v-divider />
                                </div>
                              </v-col>
                              <v-expand-transition>
                                <v-col
                                  v-if="reagentsSelected.length > 0 && isWater"
                                  cols="12"
                                >
                                  <v-combobox
                                    :items="tanks"
                                    v-model.number="tankVolume"
                                    type="Number"
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
                                  <template v-for="reagent in reagentsSelected">
                                    <v-col
                                      cols="12"
                                      :key="reagent"
                                      class="py-0"
                                    >
                                      <v-row class="mb-3">
                                        <template v-for="(data, ion) in FORMULAS[reagent].ions">
                                          <v-col
                                            v-if="data.isNeeded"
                                            :key="reagent + ion"
                                            class="py-0"
                                          >
                                            <v-text-field
                                              :value="solute[reagent][ion]"
                                              @input="inputIonDose($event, reagent, ion)"
                                              type="number"
                                              :label="convertIonName(ion) + ', мг/л'"
                                              :hint="'из ' + reagent"
                                              persistent-hint
                                            />
                                          </v-col>
                                        </template>
                                      </v-row>
                                    </v-col>
                                  </template>
                                  <v-col
                                    v-if="reagentsSelected.length > 1"
                                    cols="12"
                                    class="d-flex justify-space-between pb-0"
                                  >
                                    <div>
                                      Общая доза, мг/л
                                    </div>
                                    <div class="d-flex flex-column">
                                      <div
                                        v-for="(value, name) in countTotalIonDose(solute)"
                                        class="d-flex justify-space-between"
                                        :key="name"
                                      >
                                        <div>{{ convertIonName(name) }}:</div>
                                        <div class="ml-3">
                                          {{ value.toFixed(5) }}
                                          <template v-if="countTotalDose(solute)">
                                            ({{ (value / countTotalDose(solute) * 100).toFixed(2) }}%)
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
                            v-if="reagentsSelected.length > 0 && (fertilizerVolume || !isWater)"
                            cols="12"
                          >
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="recipeName"
                                  label="Имя рецепта"
                                  hide-details="auto"
                                  hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                                  :rules="rulesName"
                                />
                              </v-col>
                              <v-col cols="12">
                                <v-textarea
                                  v-model="recipeNote"
                                  label="Примечание"
                                  hide-details="auto"
                                  auto-grow
                                  rows="1"
                                  hint="Вы можете добавить дополнительные сведения к рецепту"
                                />
                              </v-col>
                              <v-col
                                class="text-right"
                                cols="12"
                              >
                                <v-btn
                                  v-if="isEditing"
                                  @click="removeRecipe"
                                >
                                  Удалить
                                </v-btn>
                                <v-btn
                                  v-if="isEditing"
                                  color="primary"
                                  @click="editRecipe"
                                  class="ml-2"
                                >
                                  Сохранить
                                </v-btn>
                                <v-btn
                                  v-if="!isEditing"
                                  color="primary"
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
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogShare"
      width="500"
    >
      <v-card>
        <v-card-title>
          Поделиться ссылкой
        </v-card-title>
        <v-card-text v-if="this.curRecipeIndex !== null">
          <v-text-field
            :value="encodedUrl"
            label="Ваша ссылка для отправки"
            hint="Скопируйте ссылку"
            id="encodedUrl"
          >
            <template v-slot:append>
              <v-tooltip
                bottom
                max-width="400"
              >
                <template v-slot:activator="{ on }">
                  <a @click="copyUrl()">
                    <v-icon v-on="on">fas fa-clipboard</v-icon>
                  </a>
                </template>
                Скопировать
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialogShare = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <add-button :action="openAddRecipe">
      {{ $t('recipes.addButton') }}
    </add-button>
  </v-container>
</template>

<script>
import Vue from 'vue';
import FORMULAS from '@/constants/formulas';
import RECIPES from '@/constants/recipes';
import {
  countTotalIonConcentration,
  countPercent,
  isConcentration,
  countTotalIonDose,
  countTotalDose,
  convertIonName,
  convertIonRatio,
  OPPOSITE,
} from '@/helpers/funcs';
import { mapState, mapMutations } from 'vuex';
import draggable from 'vuedraggable';
import Recipe from '@/components/recipes/Recipe.vue';
import ElementsTable from '@/components/recipes/ElementsTable.vue';
import ElementsDryTable from '@/components/recipes/ElementsDryTable.vue';
import Shared from '@/components/Shared.vue';

export default {
  name: 'Recipes',
  components: {
    ElementsTable,
    ElementsDryTable,
    draggable,
    Recipe,
    Shared,
  },
  data() {
    return {
      FORMULAS,
      RECIPES,
      OPPOSITE,
      drag: false,
      reagentsSelected: [],
      recipeExampleChosen: null,
      fertilizerVolume: null,
      tankVolume: null,
      fertilizerMass: {},
      solute: {},
      recipeName: '',
      recipeNote: null,
      isShared: false,
      isWater: true,
      isShowConcentration: false,
      curRecipeIndex: null,
      dialog: this.$route.params.open,
      dialogShare: false,
      timeout: 2000,
      rulesReagent: [
        (v) => v.length > 0 || 'Выберите реагент',
      ],
      rulesMass: {
        solubility(reagent, volume, formulas) {
          return (v) => (
            (v / volume) * 1000 < formulas[reagent].solubilityLimit
            || `Достигнута максимальная растворимость - ${formulas[reagent].solubilityLimit} г/л при 20°С!`
          );
        },
        isExist() {
          return (v) => !!v || 'Введите массу';
        },
      },
      rulesVolume: {
        isExist() {
          return (v) => !!v || 'Введите объем удобрения';
        },
      },
      rulesName: [
        (v) => !!v || 'Введите название',
        () => (!this.isExist || this.isSame) || 'Рецепт с таким названием уже существует',
      ],
    };
  },
  mounted() {
    const { share } = this.$router.currentRoute.query;
    if (share) {
      this.setComponent(JSON.parse(decodeURIComponent(share))[0]);
      this.isShared = true;
    }
    if (!this.recipeName) {
      this.recipeName = this.fertilizerType;
    }
  },
  computed: {
    ...mapState([
      'tanks',
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    recipes: {
      get() {
        return this.$store.state.recipes;
      },
      set(value) {
        this.RECIPE_MOVE(value);
      },
    },
    reagents() {
      const result = [];
      Object.entries(this.FORMULAS).forEach(([formula, data]) => {
        result.push({
          text: `${data.name} - ${formula}`,
          name: `${data.name}`,
          value: formula,
        });
      });
      result.sort((a, b) => a.text.localeCompare(b.text));
      return result;
    },
    recipesExamples() {
      const recipeExamples = [];
      this.RECIPES.forEach((item) => {
        recipeExamples.push(item.name);
      });
      recipeExamples.sort((a, b) => a.localeCompare(b));
      return recipeExamples;
    },
    totalFertilizerMass() {
      return Object.values(this.fertilizerMass).reduce((sum, value) => sum + value);
    },
    concentration() {
      const result = {};
      if (this.reagentsSelected.length > 0 && Object.keys(this.fertilizerMass).length > 0) {
        this.reagentsSelected.forEach((reagent) => {
          result[reagent] = {};
          const { ions } = FORMULAS[reagent];
          Object.entries(ions).forEach(([ion, data]) => {
            if (data.isNeeded) {
              let factor = 1;
              if (this.fertilizerVolume) {
                factor = 1 / (this.fertilizerVolume / 1000);
              } else if (!this.fertilizerVolume) {
                factor = 1 / this.totalFertilizerMass;
              }
              result[reagent][ion] = this.fertilizerMass[reagent] * this.countPercent(reagent)[ion] * factor;
            }
          });
        });
      }
      return result;
    },
    totalIonConcentration() {
      return this.countTotalIonConcentration(this.concentration);
    },
    isExist() {
      const names = this.recipes.map((item) => item.name);
      return names.findIndex((item) => item === this.recipeName) !== -1;
    },
    isSame() {
      const names = this.recipes.map((item) => item.name);
      return names.findIndex((item) => item === this.recipeName) === this.curRecipeIndex;
    },
    isEditing() {
      return this.curRecipeIndex !== null;
    },
    encodedUrl() {
      let jsonString = JSON.stringify([this.recipes[this.curRecipeIndex]]);
      jsonString = jsonString.replace(/%/g, '%25');
      const encoded = encodeURIComponent(jsonString);
      return `${window.location.origin + window.location.pathname}?share=${encoded}`;
    },
  },
  watch: {
    reagentsSelected() {
      if (!this.recipeName && this.reagentsSelected.length === 1) {
        const reagent = this.reagentsSelected[0];
        this.recipeName = this.FORMULAS[reagent].name;
      }
      const solute = {};
      this.reagentsSelected.forEach((reagent) => {
        const { ions } = this.FORMULAS[reagent];
        solute[reagent] = {};
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            solute[reagent][ion] = 0;
          }
        });
      });
      this.solute = { ...solute };
      const fertilizerMass = {};
      this.reagentsSelected.forEach((reagent) => {
        if (!(reagent in this.fertilizerMass)) {
          fertilizerMass[reagent] = 0;
        } else {
          fertilizerMass[reagent] = this.fertilizerMass[reagent];
        }
      });
      this.fertilizerMass = { ...fertilizerMass };
      if (this.fertilizerVolume) {
        this.countDose();
      }
    },
    recipeExampleChosen() {
      const recipe = this.RECIPES.find((item) => item.name === this.recipeExampleChosen);
      if (recipe) {
        this.reagentsSelected = Object.keys(recipe.reagents);
        this.recipeName = recipe.name;
        this.recipeNote = recipe.note;
        this.fertilizerVolume = recipe.fertilizerVolume;
        this.tankVolume = recipe.tankVolume;
        Object.keys(recipe.reagents).forEach((reagent) => {
          this.fertilizerMass[reagent] = recipe.reagents[reagent];
        });
      }
    },
    tankVolume() {
      if (this.fertilizerVolume) {
        this.countDose();
      }
    },
    dialogShare() {
      if (!this.dialogShare) {
        this.curRecipeIndex = null;
      }
    },
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD',
      'RECIPE_REMOVE',
      'RECIPE_EDIT',
      'RECIPE_MOVE',
      'SNACKBAR_SHOW',
      'GUIDE_CLOSE',
    ]),
    countTotalIonConcentration,
    countTotalIonDose,
    countTotalDose,
    isConcentration,
    countPercent,
    convertIonName,
    convertIonRatio,
    resetComponent(dialog = false) {
      this.reagentsSelected = [];
      this.recipeExampleChosen = null;
      this.fertilizerMass = {};
      this.fertilizerVolume = null;
      this.recipeName = '';
      this.recipeNote = null;
      this.tankVolume = null;
      this.curRecipeIndex = null;
      this.solute = {};
      this.dialog = dialog;
      this.isWater = true;
      this.isShared = false;
    },
    setComponent(recipe, index = null) {
      this.fertilizerType = recipe.type;
      this.reagentsSelected = recipe.reagents;
      this.fertilizerMass = recipe.mass;
      this.fertilizerVolume = recipe.volume;
      this.tankVolume = recipe.tankVolume;
      this.recipeName = recipe.name;
      this.recipeNote = recipe.note;
      this.curRecipeIndex = index;
      this.dialog = true;
      this.isWater = recipe.volume > 0;
    },
    countDose() {
      this.reagentsSelected.forEach((reagent) => {
        const { ions } = FORMULAS[reagent];
        const result = {};
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            let value = (
              (this.fertilizerMass[reagent] / this.fertilizerVolume / this.tankVolume)
              * (this.countPercent(reagent)[ion] * this.convertIonRatio(ion) * 1000)
            );
            value = parseFloat(value.toFixed(5));
            result[ion] = value;
            Vue.set(this.solute, reagent, result);
          }
        });
      });
    },
    setIsWater(value) {
      this.isWater = value;
      this.fertilizerVolume = null;
      this.tankVolume = null;
    },
    inputMass(value, reagent) {
      const mass = parseFloat(value);
      Vue.set(this.fertilizerMass, reagent, +mass ? mass : '');
      if (this.tankVolume && +mass) {
        this.countDose();
      }
    },
    inputVolume(value) {
      this.fertilizerVolume = parseFloat(value);
      if (this.tankVolume && +this.fertilizerVolume) {
        this.countDose();
      }
    },
    inputIonDose(value, reagent, curIon) {
      const solute = {};
      const ratio = {};
      Object.keys(this.solute[reagent]).forEach((ion) => {
        ratio[ion] = this.convertIonRatio(ion);
      });
      Object.keys(this.solute[reagent]).forEach((ion) => {
        let ionDose = parseFloat(value);
        if (ion !== curIon) {
          if (ratio[curIon] > 1) {
            ionDose /= ratio[curIon];
          } else {
            ionDose *= ratio[ion];
          }
          ionDose *= (this.countPercent(reagent)[ion] / this.countPercent(reagent)[curIon]);
        }
        solute[ion] = parseFloat(ionDose) ? parseFloat(ionDose.toFixed(4)) : 0;
        Vue.set(this.solute, reagent, solute);
      });
      const fertilizerMass = { ...this.fertilizerMass };
      let mass;
      if (!this.solute[reagent][curIon]) {
        mass = 0;
      } else {
        mass = (this.solute[reagent][curIon] * this.tankVolume * this.fertilizerVolume)
          / 1000 / this.countPercent(reagent)[curIon] / this.convertIonRatio(curIon);
      }
      fertilizerMass[reagent] = parseFloat(mass.toFixed(3));
      this.fertilizerMass = { ...fertilizerMass };
    },
    fertilizerMassHint(reagent) {
      let hint = '';
      Object.keys(this.FORMULAS[reagent].ions).forEach((ion) => {
        const data = this.FORMULAS[reagent].ions[ion];
        if (data.isNeeded) {
          if (ion !== this.convertIonName(ion)) {
            hint += `${ion}/${this.convertIonName(ion)}:
            ${
              this.concentration[reagent][ion].toFixed(2)
            }/${
              (this.convertIonRatio(ion) * this.concentration[reagent][ion]).toFixed(2)
            } г/л`;
          } else {
            hint += `${ion}:  ${this.concentration[reagent][ion].toFixed(3)} г/л `;
          }
        }
      });
      return hint;
    },
    openAddRecipe() {
      this.resetComponent();
      this.dialog = true;
      if (this.$refs.recipeForm) {
        this.$refs.recipeForm.resetValidation();
      }
    },
    addRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({
          type: this.fertilizerType,
          name: this.recipeName,
          note: this.recipeNote,
          volume: this.fertilizerVolume,
          reagents: [...this.reagentsSelected],
          mass: { ...this.fertilizerMass },
          concentration: { ...this.concentration },
          tankVolume: this.tankVolume,
        });
        this.resetComponent();
        this.SNACKBAR_SHOW('Рецепт добавлен');
      }
    },
    openEditRecipe(index) {
      this.resetComponent();
      this.setComponent(this.recipes[index], index);
      if (this.$refs.recipeForm) {
        this.$refs.recipeForm.resetValidation();
      }
    },
    editRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_EDIT({
          index: this.curRecipeIndex,
          recipe: {
            type: this.fertilizerType,
            name: this.recipeName,
            note: this.recipeNote,
            volume: this.fertilizerVolume,
            tankVolume: this.tankVolume,
            reagents: [...this.reagentsSelected],
            mass: { ...this.fertilizerMass },
            concentration: { ...this.concentration },
          },
        });
        this.resetComponent();
        this.SNACKBAR_SHOW('Рецепт изменен');
      }
    },
    removeRecipe() {
      this.RECIPE_REMOVE(this.curRecipeIndex);
      this.resetComponent();
      this.SNACKBAR_SHOW('Рецепт удален');
    },
    showComponents(ions) {
      const output = [];
      Object.entries(ions).forEach(([ion, value]) => {
        output.push(`${ion}: ${(value * 100).toFixed(1)}%`);
      });
      return output.join(' ');
    },
    openShareDialog(index) {
      this.curRecipeIndex = index;
      this.dialogShare = true;
    },
    copyUrl() {
      const encodedUrl = document.getElementById('encodedUrl');
      encodedUrl.select();
      encodedUrl.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.SNACKBAR_SHOW('Ссылка скопирована');
    },
  },
};
</script>

<style lang="sass">
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
