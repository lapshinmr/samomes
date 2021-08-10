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
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-btn
          class="mr-0"
          square
          to="/recipes"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <page-title>
        <template v-if="isCreate && !isShared">
          <template v-if="!isShared">
            Новый рецепт
          </template>
          <template v-if="isShared">
            <p class="text-h4">
              С вами поделились рецептом!
            </p>
            <p class="text-h6 font-weight-regular">
              Посмотрите рецепт, дайте ему
              название и напишите примечание. После этого можете сохранить его.
            </p>
          </template>
        </template>
        <template v-else>
          Рецепт {{ name }}
        </template>
      </page-title>
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
                  <v-select
                    :items="formulas"
                    item-text="text"
                    v-model="reagents"
                    multiple
                    label="Формула"
                    hint="Вы можете выбрать несколько реагентов"
                    persistent-hint
                    hide-details="auto"
                    :rules="rulesReagent"
                    :return-object="true"
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
                  sm="6"
                >
                  <v-select
                    :items="compoundsList"
                    item-text="text"
                    v-model="compounds"
                    multiple
                    label="Готовая смесь"
                    hint="Вы можете выбрать несколько смесей"
                    persistent-hint
                    hide-details="auto"
                    :rules="rulesReagent"
                    :return-object="true"
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
                    <template v-for="reagent in reagents">
                      <div
                        class="d-flex justify-space-between caption"
                        :key="reagent.value"
                      >
                        <div>{{ reagent.text }}</div>
                        <div>{{ showComponents(countPercent(reagent.key)) }}</div>
                      </div>
                    </template>
                    <template v-for="compound in compounds">
                      <div
                        class="d-flex justify-space-between caption"
                        :key="compound.name"
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
                    v-if="isReagents && isWater"
                    cols="12"
                  >
                    <v-text-field
                      :value="volume"
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
                    v-if="isReagents && (volume || !isWater)"
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
                        v-for="reagent in reagents"
                        cols="12"
                        :key="reagent.key"
                        class="py-0"
                      >
                        <v-text-field
                          :value="mass[reagent.key]"
                          @input="inputMass($event, reagent.key)"
                          :label="reagent.text"
                          :key="reagent.key"
                          type="number"
                          :suffix="reagent.density ? 'мл' : 'г'"
                          hide-details="auto"
                          :rules="[
                            rulesMass.isExist(),
                          ]"
                          :error="isWater && (mass[reagent.key] / volume) * 1000
                            > FORMULAS[reagent.key].solubilityLimit"
                          :error-messages="
                            isWater && (mass[reagent.key] / volume) * 1000
                              > FORMULAS[reagent.key].solubilityLimit
                              ? `Достигнута максимальная растворимость -
                                      ${FORMULAS[reagent.key].solubilityLimit} г/л при 20°С!`
                              : ''
                          "
                        />
                      </v-col>
                      <v-col
                        v-for="compound in compounds"
                        cols="12"
                        :key="compound.key"
                        class="py-0"
                      >
                        <v-text-field
                          :value="mass[compound.key]"
                          @input="inputMass($event, compound.key)"
                          :label="compound.text"
                          :key="compound.key"
                          :suffix="compound.isLiquid ? 'мл' : 'г'"
                          type="number"
                          hide-details="auto"
                          :rules="[
                            rulesMass.isExist(),
                          ]"
                        />
                      </v-col>
                      <v-expand-transition>
                        <v-col
                          cols="12"
                          v-if="isWater"
                          class="pt-0"
                        >
                          <elements-table
                            :total-ion-concentration="totalIonConcentration"
                            :fertilizer-mass="mass"
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
                            :fertilizer-mass="mass"
                            :total-fertilizer-mass="totalFertilizerMass"
                          />
                        </v-col>
                      </v-expand-transition>
                      <v-expand-transition>
                        <v-col
                          v-if="isHardness"
                          cols="12"
                          class="pt-0"
                        >
                          <hardness-table
                            :total-ion-concentration="totalIonConcentration"
                            :fertilizer-mass="mass"
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
                          v-if="isReagents && isWater"
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
                          <template v-for="reagent in reagents">
                            <v-col
                              cols="12"
                              :key="reagent.key"
                              class="py-0"
                            >
                              <v-row class="mb-3">
                                <template v-for="(data, ion) in FORMULAS[reagent.key].ions">
                                  <v-col
                                    v-if="data.isNeeded"
                                    :key="reagent.key + ion"
                                    class="py-0"
                                  >
                                    <v-text-field
                                      :value="solute[reagent.key][ion]"
                                      @input="inputIonDose($event, reagent.key, ion)"
                                      type="number"
                                      :label="convertIonName(ion) + ', мг/л'"
                                      :hint="'из ' + reagent.key"
                                      persistent-hint
                                    />
                                  </v-col>
                                </template>
                              </v-row>
                            </v-col>
                          </template>
                          <template v-for="compound in compounds">
                            <v-col
                              cols="12"
                              :key="compound.key"
                              class="py-0"
                            >
                              <v-row class="mb-3">
                                <template v-for="ion in Object.keys(compound.ions)">
                                  <v-col
                                    :key="compound.key + ion"
                                    class="py-0"
                                  >
                                    <v-text-field
                                      :value="solute[compound.key][ion]"
                                      @input="inputIonDose($event, compound.key, ion)"
                                      :label="convertIonName(ion) + ', мг/л'"
                                      :hint="'из ' + compound.key"
                                      type="number"
                                      persistent-hint
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
                                  {{ value.toFixed(3) }}
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
                    v-if="isReagents && (volume || !isWater)"
                    cols="12"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="name"
                          label="Имя рецепта"
                          hide-details="auto"
                          hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
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
                        class="text-right"
                        cols="12"
                      >
                        <v-btn
                          v-if="!isCreate"
                          @click="removeRecipe"
                        >
                          Удалить
                        </v-btn>
                        <v-btn
                          v-if="!isCreate"
                          color="primary"
                          @click="editRecipe"
                          class="ml-2"
                        >
                          Сохранить
                        </v-btn>
                        <v-btn
                          v-if="isCreate"
                          color="primary"
                          @click="addRecipe"
                        >
                          Добавить
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

<script>
import Vue from 'vue';
import FORMULAS from '@/constants/formulas';
import COMPOUNDS from '@/constants/compounds';
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
import { KH, GH } from '@/constants/hardness';
import { mapState, mapMutations } from 'vuex';
import ElementsTable from '@/components/recipes/ElementsTable.vue';
import ElementsDryTable from '@/components/recipes/ElementsDryTable.vue';
import HardnessTable from '@/components/recipes/HardnessTable.vue';

export default {
  name: 'Recipe',
  components: {
    ElementsTable,
    ElementsDryTable,
    HardnessTable,
  },
  data() {
    return {
      FORMULAS,
      COMPOUNDS,
      RECIPES,
      OPPOSITE,
      reagents: [],
      compounds: [],
      recipeExampleChosen: null,
      volume: null,
      tankVolume: null,
      mass: {},
      solute: {},
      name: '',
      note: null,
      isShared: false,
      isWater: true,
      rulesReagent: [
        () => (this.reagents.length > 0 || this.compounds.length > 0) || 'Выберите реагент',
      ],
      rulesMass: {
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
        () => !this.isExist || 'Рецепт с таким названием уже существует',
      ],
    };
  },
  mounted() {
    const { share } = this.$router.currentRoute.query;
    if (this.isCreate) {
      return;
    }
    let recipe;
    if (share) {
      this.isShared = true;
      [recipe] = JSON.parse(decodeURIComponent(share));
    } else if (!this.isCreate) {
      recipe = JSON.parse(JSON.stringify({ ...this.recipes[this.recipeIndex] }));
    }
    const reagents = [];
    const compounds = [];
    this.formulas.forEach((formula) => {
      if (recipe.reagents && recipe.reagents.includes(formula.key)) {
        reagents.push(formula);
      }
    });
    this.compoundsList.forEach((compound) => {
      if (recipe.compounds && recipe.compounds.includes(compound.key)) {
        compounds.push(compound);
      }
    });
    delete recipe.reagents;
    delete recipe.compounds;
    Object.assign(this.$data, recipe);
    this.reagents = reagents;
    this.compounds = compounds;
    this.isWater = recipe.volume > 0;
  },
  computed: {
    ...mapState([
      'tanks',
      'recipes',
    ]),
    isCreate() {
      return this.$route.params.id === 'create';
    },
    recipeIndex() {
      return this.$route.params.id;
    },
    formulas() {
      const result = [];
      Object.entries(FORMULAS).forEach(([formula, data]) => {
        result.push({
          key: formula,
          text: `${data.name} - ${formula}`,
          ...data,
        });
      });
      result.sort((a, b) => a.text.localeCompare(b.text));
      return result;
    },
    compoundsList() {
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
    },
    recipesExamples() {
      const recipeExamples = [];
      RECIPES.forEach((item) => {
        recipeExamples.push(item.name);
      });
      recipeExamples.sort((a, b) => a.localeCompare(b));
      return recipeExamples;
    },
    isReagents() {
      return this.reagents.length > 0 || this.compounds.length > 0;
    },
    totalFertilizerMass() {
      return Object.values(this.mass).reduce((sum, value) => sum + value);
    },
    concentration() {
      const result = {};
      if (this.isReagents && Object.keys(this.mass).length > 0) {
        this.reagents.forEach((reagent) => {
          result[reagent.key] = {};
          const { ions } = reagent;
          Object.entries(ions).forEach(([ion, data]) => {
            if (data.isNeeded) {
              let factor = 1;
              if (this.volume) {
                factor = 1 / (this.volume / 1000);
              } else if (!this.volume) {
                factor = 1 / this.totalFertilizerMass;
              }
              result[reagent.key][ion] = this.mass[reagent.key] * this.countPercent(reagent.key)[ion] * factor;
            }
          });
        });
        this.compounds.forEach((compound) => {
          result[compound.key] = {};
          const { ions } = compound;
          Object.entries(ions).forEach(([ion, value]) => {
            let factor = 1;
            if (this.volume) {
              factor = 1 / (this.volume / 1000);
            } else if (!this.volume) {
              factor = 1 / this.totalFertilizerMass;
            }
            result[compound.key][ion] = this.mass[compound.key] * value * factor;
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
      const index = names.findIndex((item) => item === this.name);
      const isExist = index !== -1;
      const isEdit = index === +this.recipeIndex;
      return isExist && !isEdit;
    },
    ionTotalDoseSorted() {
      const result = Object.entries(countTotalIonDose(this.solute));
      result.sort((a, b) => b[1] - a[1]);
      return result;
    },
    isHardness() {
      let result = false;
      Object.keys(this.totalIonConcentration).forEach((ion) => {
        result = [...Object.keys(GH), ...Object.keys(KH)].includes(ion);
      });
      return result;
    },
  },
  watch: {
    reagents(newValue, oldValue) {
      if (newValue.length < oldValue.length) {
        const reagentsToRemove = oldValue.filter((item) => !newValue.includes(item));
        reagentsToRemove.forEach((item) => {
          delete this.mass[item.key];
        });
      }
      if (!this.name && this.reagents.length === 1) {
        const reagent = this.reagents[0];
        this.name = reagent.key;
      }
      const solute = {};
      this.reagents.forEach((reagent) => {
        const { ions } = reagent;
        solute[reagent.key] = {};
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            solute[reagent.key][ion] = 0;
          }
        });
      });
      this.solute = { ...solute };
      const mass = { ...this.mass };
      this.reagents.forEach((reagent) => {
        if (!(reagent.key in mass)) {
          mass[reagent.key] = 0;
        }
      });
      this.mass = { ...mass };
      if (this.volume) {
        this.countDose();
      }
    },
    compounds(newValue, oldValue) {
      if (newValue.length < oldValue.length) {
        const compoundsToRemove = oldValue.filter((item) => !newValue.includes(item));
        compoundsToRemove.forEach((item) => {
          delete this.mass[item.key];
        });
      }
      if (!this.name && this.compounds.length === 1) {
        this.name = this.compounds[0].key;
      }
      const solute = {};
      this.compounds.forEach((compound) => {
        const { ions } = compound;
        solute[compound.key] = {};
        Object.keys(ions).forEach((ion) => {
          solute[compound.key][ion] = 0;
        });
      });
      this.solute = { ...solute };
      const mass = { ...this.mass };
      this.compounds.forEach((compound) => {
        if (!(compound.key in mass)) {
          mass[compound.key] = 0;
        }
      });
      this.mass = { ...mass };
      if (this.volume) {
        this.countDose();
      }
    },
    recipeExampleChosen() {
      const recipe = this.RECIPES.find((item) => item.name === this.recipeExampleChosen);
      this.mass = {};
      if (recipe) {
        const reagents = [];
        this.formulas.forEach((formula) => {
          if (recipe.reagents && formula.key in recipe.reagents) {
            reagents.push(formula);
          }
        });
        const compounds = [];
        this.compoundsList.forEach((compound) => {
          if (recipe.compounds && compound.key in recipe.compounds) {
            compounds.push(compound);
          }
        });
        this.reagents = reagents;
        this.compounds = compounds;
        this.name = recipe.name;
        this.note = recipe.note;
        this.volume = recipe.volume;
        this.tankVolume = recipe.tankVolume;
        if (recipe.reagents) {
          Object.entries(recipe.reagents).forEach(([reagent, mass]) => {
            this.mass[reagent] = mass;
          });
        }
        if (recipe.compounds) {
          Object.entries(recipe.compounds).forEach(([compound, mass]) => {
            this.mass[compound] = mass;
          });
        }
        this.isWater = recipe.volume > 0;
      }
    },
    tankVolume() {
      if (this.volume) {
        this.countDose();
      }
    },
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD',
      'RECIPE_REMOVE',
      'RECIPE_EDIT',
      'SNACKBAR_SHOW',
    ]),
    countTotalIonConcentration,
    countTotalIonDose,
    countTotalDose,
    isConcentration,
    countPercent,
    convertIonName,
    convertIonRatio,
    countDose() {
      this.reagents.forEach((reagent) => {
        const { ions } = reagent;
        const result = {};
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            let dose = (
              (this.mass[reagent.key] / this.volume / this.tankVolume)
              * (this.countPercent(reagent.key)[ion] * this.convertIonRatio(ion) * 1000)
            );
            dose = parseFloat(dose.toFixed(5));
            result[ion] = dose;
            Vue.set(this.solute, reagent.key, result);
          }
        });
      });
      this.compounds.forEach((compound) => {
        const { ions } = compound;
        const result = {};
        Object.entries(ions).forEach(([ion, value]) => {
          let dose = (
            (this.mass[compound.key] / this.volume / this.tankVolume) * (value * this.convertIonRatio(ion) * 1000)
          );
          dose = parseFloat(dose.toFixed(5));
          result[ion] = dose;
          Vue.set(this.solute, compound.key, result);
        });
      });
    },
    // BufferAdd_cleardata() {
    //   document.BufferAddForm.BufferAddResult.value = "";
    // },
    // Buffer_add_calc() {
    //   BufferAdd_cleardata();
    //   var KHKoeff;
    //   var CurrentBufferValue = parseFloat(document.BufferAddForm.CurrentBufferValue.value.replace(',', '.'));
    //   var NeedBufferValue = parseFloat(document.BufferAddForm.NeedBufferValue.value.replace(',', '.'));
    //   if (document.BufferAddForm.BufferAdd_form[0].checked) {
    //     KHKoeff = 3;
    //   }
    //   if (document.BufferAddForm.BufferAdd_form[1].checked) {
    //     KHKoeff = 1.8841;
    //   }
    //   if (CurrentBufferValue > NeedBufferValue) {
    //     alert("Ошибка ввода! Текущее значение выше требуемого! Введите правильные данные!");
    //     return;
    //   }
    //   document.BufferAddForm.BufferAddResult.value = (
    //     (NeedBufferValue - CurrentBufferValue)
    //     * parseFloat(document.BufferAddForm.AquariumV.value.replace(',', '.'))
    //     / 100 * KHKoeff).toFixed(1); }
    // },
    setIsWater(value) {
      this.isWater = value;
      this.volume = null;
      this.tankVolume = null;
    },
    showComponents(ions) {
      const output = [];
      Object.entries(ions).forEach(([ion, value]) => {
        output.push(`${ion}: ${(value * 100).toFixed(2)}%`);
      });
      return output.join(' ');
    },
    inputMass(value, key) {
      const mass = parseFloat(value);
      Vue.set(this.mass, key, +mass ? mass : '');
      if (this.tankVolume && +mass) {
        this.countDose();
      }
    },
    inputVolume(value) {
      this.volume = parseFloat(value);
      if (this.tankVolume && +this.volume) {
        this.countDose();
      }
    },
    isFormula(name) {
      return name in FORMULAS;
    },
    inputIonDose(value, key, curIon) {
      const solute = {};
      const ratio = {};
      Object.keys(this.solute[key]).forEach((ion) => {
        ratio[ion] = this.convertIonRatio(ion);
      });
      Object.keys(this.solute[key]).forEach((ion) => {
        let ionDose = parseFloat(value);
        if (ion !== curIon) {
          if (ratio[curIon] > 1) {
            ionDose /= ratio[curIon];
          } else {
            ionDose *= ratio[ion];
          }
          if (this.isFormula(key)) {
            ionDose *= (this.countPercent(key)[ion] / this.countPercent(key)[curIon]);
          } else {
            ionDose *= (COMPOUNDS[key].ions[ion] / COMPOUNDS[key].ions[curIon]);
          }
        }
        solute[ion] = parseFloat(ionDose) ? parseFloat(ionDose.toFixed(4)) : 0;
        Vue.set(this.solute, key, solute);
      });
      const fertilizerMass = { ...this.mass };
      let mass = 0;
      if (!this.solute[key][curIon]) {
        mass = 0;
      } else if (this.isFormula(key)) {
        mass = (this.solute[key][curIon] * this.tankVolume * this.volume)
          / 1000 / this.countPercent(key)[curIon] / this.convertIonRatio(curIon);
      } else {
        mass = (this.solute[key][curIon] * this.tankVolume * this.volume)
          / 1000 / COMPOUNDS[key].ions[curIon] / this.convertIonRatio(curIon);
      }
      fertilizerMass[key] = parseFloat(mass.toFixed(3));
      this.mass = { ...fertilizerMass };
    },
    addRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({
          name: this.name,
          note: this.note,
          volume: this.volume,
          reagents: [...this.reagents.map((reagent) => reagent.key)],
          compounds: [...this.compounds.map((compound) => compound.key)],
          mass: { ...this.mass },
          concentration: { ...this.concentration },
          tankVolume: this.tankVolume,
        });
        this.SNACKBAR_SHOW('Рецепт добавлен');
        this.$router.push('/recipes');
      }
    },
    editRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_EDIT({
          index: this.recipeIndex,
          recipe: {
            name: this.name,
            note: this.note,
            volume: this.volume,
            tankVolume: this.tankVolume,
            reagents: [...this.reagents.map((reagent) => reagent.key)],
            compounds: [...this.compounds.map((compound) => compound.key)],
            mass: { ...this.mass },
            concentration: { ...this.concentration },
          },
        });
        this.SNACKBAR_SHOW('Рецепт изменен');
        this.$router.push('/recipes');
      }
    },
    removeRecipe() {
      this.RECIPE_REMOVE(this.recipeIndex);
      this.SNACKBAR_SHOW('Рецепт удален');
      this.$router.push('/recipes');
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
