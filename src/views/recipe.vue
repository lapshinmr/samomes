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
          Новый рецепт
        </template>
        <template v-if="isCreate && isShared">
          <p class="text-h4">
            С вами поделились рецептом!
          </p>
          <p class="text-h6 font-weight-regular">
            Посмотрите рецепт, дайте ему
            название и напишите примечание. После этого можете сохранить его.
          </p>
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
                    item-value="value"
                    v-model="reagents"
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
                    v-if="reagents.length > 0"
                    class="mt-3"
                  >
                    <template v-for="reagent in reagents">
                      <div
                        class="d-flex justify-space-between caption"
                        :key="reagent.value"
                      >
                        <div>{{ reagent }}</div>
                        <div>{{ showComponents(countPercent(reagent)) }}</div>
                      </div>
                    </template>
                  </div>
                  <div
                    v-if="reagents.length > 0"
                    class="mt-3"
                  >
                    <small>
                      *Так как аквариумисту удобнее работать с нитратом (NO3), а не с азотом (N), далее
                      азот в любой форме будет приведен к нитрату.
                    </small>
                  </div>
                </v-col>
                <v-expand-transition>
                  <v-col
                    v-if="reagents.length > 0"
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
                    v-if="reagents.length > 0 && isWater"
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
                    v-if="reagents.length > 0 && (volume || !isWater)"
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
                        :key="reagent"
                        class="py-0"
                      >
                        <v-text-field
                          :value="mass[reagent]"
                          @input="inputMass($event, reagent)"
                          type="number"
                          :label="reagent"
                          suffix="г"
                          :hint="isWater ? fertilizerMassHint(reagent) : ''"
                          hide-details="auto"
                          :key="reagent"
                          :rules="[
                            rulesMass.isExist(),
                          ]"
                          :error="(mass[reagent] / volume) * 1000
                            > FORMULAS[reagent].solubilityLimit"
                          :error-messages="
                            (mass[reagent] / volume) * 1000
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
                          v-if="reagents.length > 0 && isWater"
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
                            v-if="reagents.length > 1"
                            cols="12"
                            class="d-flex justify-space-between pb-0"
                          >
                            <div>
                              Общая доза, мг/л
                            </div>
                            <div class="d-flex flex-column">
                              <div
                                v-for="(value, ionName) in countTotalIonDose(solute)"
                                class="d-flex justify-space-between"
                                :key="ionName"
                              >
                                <div>{{ convertIonName(ionName) }}:</div>
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
                    v-if="reagents.length > 0 && (volume || !isWater)"
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
import ElementsTable from '@/components/recipes/ElementsTable.vue';
import ElementsDryTable from '@/components/recipes/ElementsDryTable.vue';

export default {
  name: 'Recipe',
  components: {
    ElementsTable,
    ElementsDryTable,
  },
  data() {
    return {
      FORMULAS,
      RECIPES,
      OPPOSITE,
      reagents: [],
      recipeExampleChosen: null,
      volume: null,
      tankVolume: null,
      mass: {},
      solute: {},
      name: '',
      note: null,
      isShared: false,
      isWater: true,
      isShowConcentration: false,
      rulesReagent: [
        (v) => v.length > 0 || 'Выберите реагент',
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
    if (share) {
      Object.assign(this.$data, JSON.parse(decodeURIComponent(share))[0]);
      this.isShared = true;
    } else if (!this.isCreate) {
      const recipe = { ...this.recipes[this.recipeIndex] };
      Object.assign(this.$data, recipe);
      this.isWater = recipe.volume > 0;
    }
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
      return Object.values(this.mass).reduce((sum, value) => sum + value);
    },
    concentration() {
      const result = {};
      if (this.reagents.length > 0 && Object.keys(this.mass).length > 0) {
        this.reagents.forEach((reagent) => {
          result[reagent] = {};
          const { ions } = FORMULAS[reagent];
          Object.entries(ions).forEach(([ion, data]) => {
            if (data.isNeeded) {
              let factor = 1;
              if (this.volume) {
                factor = 1 / (this.volume / 1000);
              } else if (!this.volume) {
                factor = 1 / this.totalFertilizerMass;
              }
              result[reagent][ion] = this.mass[reagent] * this.countPercent(reagent)[ion] * factor;
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
      const index = names.findIndex((item) => item === this.name);
      const isExist = index !== -1;
      const isEdit = index === +this.recipeIndex;
      return isExist && !isEdit;
    },
  },
  watch: {
    reagents() {
      if (!this.name && this.reagents.length === 1) {
        const reagent = this.reagents[0];
        this.name = this.FORMULAS[reagent].name;
      }
      const solute = {};
      this.reagents.forEach((reagent) => {
        const { ions } = this.FORMULAS[reagent];
        solute[reagent] = {};
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            solute[reagent][ion] = 0;
          }
        });
      });
      this.solute = { ...solute };
      const mass = {};
      this.reagents.forEach((reagent) => {
        if (!(reagent in this.mass)) {
          mass[reagent] = 0;
        } else {
          mass[reagent] = this.mass[reagent];
        }
      });
      this.mass = { ...mass };
      if (this.volume) {
        this.countDose();
      }
    },
    recipeExampleChosen() {
      const recipe = this.RECIPES.find((item) => item.name === this.recipeExampleChosen);
      if (recipe) {
        this.reagents = Object.keys(recipe.reagents);
        this.name = recipe.name;
        this.note = recipe.note;
        this.volume = recipe.volume;
        this.tankVolume = recipe.tankVolume;
        Object.entries(recipe.reagents).forEach(([reagent, mass]) => {
          this.mass[reagent] = mass;
        });
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
        const { ions } = FORMULAS[reagent];
        const result = {};
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            let value = (
              (this.mass[reagent] / this.volume / this.tankVolume)
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
      this.volume = null;
      this.tankVolume = null;
    },
    showComponents(ions) {
      const output = [];
      Object.entries(ions).forEach(([ion, value]) => {
        output.push(`${ion}: ${(value * 100).toFixed(1)}%`);
      });
      return output.join(' ');
    },
    inputMass(value, reagent) {
      const mass = parseFloat(value);
      Vue.set(this.mass, reagent, +mass ? mass : '');
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
      const fertilizerMass = { ...this.mass };
      let mass;
      if (!this.solute[reagent][curIon]) {
        mass = 0;
      } else {
        mass = (this.solute[reagent][curIon] * this.tankVolume * this.volume)
          / 1000 / this.countPercent(reagent)[curIon] / this.convertIonRatio(curIon);
      }
      fertilizerMass[reagent] = parseFloat(mass.toFixed(3));
      this.mass = { ...fertilizerMass };
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
    addRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({
          name: this.name,
          note: this.note,
          volume: this.volume,
          reagents: [...this.reagents],
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
            reagents: [...this.reagents],
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
