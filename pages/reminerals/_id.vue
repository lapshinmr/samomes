<!--
  Samomes

  Copyright (C) 2023 Mikhail Lapshin

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
        <template v-if="isShared">
          <p class="text-h4">
            С вами поделились рецептом!
          </p>
          <p class="text-h6 font-weight-regular">
            Посмотрите рецепт, дайте ему
            название и напишите примечание. После этого можете сохранить его.
          </p>
        </template>
        <template v-else-if="isCreate">
          Новый реминерализатор
        </template>
        <template v-else>
          Реминерализатор {{ name }}
        </template>
      </page-title>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="recipeForm">
          <v-row class="mb-4">
            <v-col
              cols="12"
              sm="6"
            >
              <v-combobox
                v-model="reagents"
                :search-input.sync="search"
                :items="formulas"
                item-text="text"
                multiple
                clearable
                label="Формула"
                hint="Вы можете выбрать несколько реагентов"
                persistent-hint
                hide-details="auto"
                validate-on-blur
                @blur="search = ''"
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
          </v-row>
          <v-expand-transition>
            <v-row v-if="isReagents">
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-divider />
                  <span class="mx-3">
                    Введите массу реагента
                  </span>
                  <v-divider />
                </div>
              </v-col>
              <v-col :cols="12">
                <number-field
                  v-for="reagent in reagents"
                  :key="reagent.key"
                  :value="reagentsMassObject[reagent.key]"
                  @input="inputMass($event, reagent.key)"
                  :label="reagent.text"
                  :precision-show="3"
                  :suffix="reagent.density ? 'мл' : 'г'"
                  hide-details="auto"
                  class="mb-4"
                />
              </v-col>
              <v-expand-transition>
                <v-col cols="12">
                  <hardness-table
                    :total-ion-concentration="totalIonConcentration"
                    :mass.sync="totalMass"
                    :volume.sync="volume"
                    class="mt-4 mb-8"
                  />
                  <v-simple-table>
                    <template #default>
                      <thead>
                        <tr>
                          <th
                            v-for="reagent in reagents"
                            :key="reagent.key"
                            class="text-left"
                          >
                            {{ reagent.key }}
                          </th>
                          <th class="text-left">
                            Масса смеси, г
                          </th>
                          <th class="text-left">
                            Gh/Kh
                          </th>
                          <th class="text-left">
                            Объем, л
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            v-for="reagent in reagents"
                            :key="reagent.key"
                          >
                            {{ countReagentsMassByGh(1, 5)[reagent.key].toFixed(2) }}
                          </td>
                          <td />
                          <td>1 / </td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td
                            v-for="reagent in reagents"
                            :key="reagent.key"
                          >
                            {{ countReagentsMassByGh(1, 10)[reagent.key].toFixed(2) }}
                          </td>
                          <td />
                          <td>1 / </td>
                          <td>10</td>
                        </tr>
                        <tr>
                          <td
                            v-for="reagent in reagents"
                            :key="reagent.key"
                          >
                            {{ countReagentsMassByGh(6, 10)[reagent.key].toFixed(2) }}
                          </td>
                          <td />
                          <td>6 / </td>
                          <td>10</td>
                        </tr>
                        <tr>
                          <td
                            v-for="reagent in reagents"
                            :key="reagent.key"
                          >
                            {{ countReagentsMassByGh(customGh, customVolume)[reagent.key].toFixed(2) }}
                          </td>
                          <td />
                          <td>
                            <div class="d-flex align-center">
                              <v-text-field
                                v-model="customGh"
                                label="Gh"
                                class="mr-2"
                              />
                              <v-text-field
                                label="Kh"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-center">
                              <v-text-field
                                v-model="customVolume"
                                label="Объем, л"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-expand-transition>
            </v-row>
          </v-expand-transition>
          <v-expand-transition>
            <v-row v-if="isReagents">
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
                  v-if="!isCreate && !isShared"
                  @click="removeRecipe"
                >
                  Удалить
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
                  @click="addRecipe"
                >
                  Добавить
                </v-btn>
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import FORMULAS from '~/helpers/constants/formulas';
import RECIPES from '~/helpers/constants/recipes';
import {
  countTotalIonConcentration,
  countPercent,
  countTotalIonDose,
  prepareFormulas,
  OPPOSITE,
} from '~/helpers/funcs/funcs';
import { mapState, mapMutations } from 'vuex';
import { GH } from '~/helpers/constants/hardness';
import HardnessTable from '~/components/Recipes/HardnessTable.vue';
import { countKh } from '~/helpers/funcs/hardness';

export default {
  name: 'RemineralPage',
  components: {
    HardnessTable,
  },
  data() {
    return {
      FORMULAS,
      RECIPES,
      OPPOSITE,
      isShared: false,
      reagents: [],
      search: '',
      recipeExampleChosen: null,
      reagentsMassObject: {},
      totalMass: 0,
      customGh: 1,
      customVolume: 10,
      volume: 10,
      solute: {},
      name: '',
      note: null,
      rulesReagent: [
        () => (this.reagents.length > 0) || 'Выберите реагент',
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
    this.formulas.forEach((formula) => {
      if (recipe.reagents && recipe.reagents.includes(formula.key)) {
        reagents.push(formula);
      }
    });
    delete recipe.reagents;
    Object.assign(this.$data, recipe);
    this.reagents = reagents;
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
    recipe() {
      return {
        name: this.name,
        note: this.note,
        reagents: [...this.reagents.map((reagent) => reagent.key)],
        mass: { ...this.reagentsMassObject },
        concentration: { ...this.concentration },
      };
    },
    formulas() {
      return prepareFormulas(['Ca', 'Mg']);
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
      return this.reagents.length > 0;
    },
    totalReagentsMass() {
      if (Object.values(this.reagentsMassObject).length === 0) {
        return 0;
      }
      return Object.values(this.reagentsMassObject).reduce((sum, value) => sum + +value);
    },
    concentration() {
      const result = {};
      if (!this.isReagents || Object.keys(this.reagentsMassObject).length === 0 || !this.totalReagentsMass) {
        return result;
      }
      this.reagents.forEach((reagent) => {
        result[reagent.key] = {};
        const { ions, HCO3 } = reagent;
        Object.entries(ions).forEach(([ion, data]) => {
          if (data.isNeeded) {
            let factor = 1 / this.totalReagentsMass;
            if (ion === 'CO3' && HCO3) {
              factor *= HCO3;
            }
            result[reagent.key][ion] = this.reagentsMassObject[reagent.key] * this.countPercent(reagent.key)[ion] * factor;
          }
        });
      });
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
  },
  watch: {
    reagents(newValue, oldValue) {
      if (newValue.length < oldValue.length) {
        const reagentsToRemove = oldValue.filter((item) => !newValue.includes(item));
        reagentsToRemove.forEach((item) => {
          delete this.reagentsMassObject[item.key];
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
      const mass = { ...this.reagentsMassObject };
      this.reagents.forEach((reagent) => {
        if (!(reagent.key in mass)) {
          mass[reagent.key] = 0;
        }
      });
      this.reagentsMassObject = { ...mass };
    },
    recipeExampleChosen() {
      const recipe = this.RECIPES.find((item) => item.name === this.recipeExampleChosen);
      this.reagentsMassObject = {};
      if (recipe) {
        const reagents = [];
        this.formulas.forEach((formula) => {
          if (recipe.reagents && formula.key in recipe.reagents) {
            reagents.push(formula);
          }
        });
        this.reagents = reagents;
        this.name = recipe.name;
        this.note = recipe.note;
        if (recipe.reagents) {
          Object.entries(recipe.reagents).forEach(([reagent, mass]) => {
            this.reagentsMassObject[reagent] = mass;
          });
        }
      }
    },
    totalReagentsMass(value) {
      this.totalMass = value;
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
    countPercent,
    inputMass(value, key) {
      const mass = +value;
      Vue.set(this.reagentsMassObject, key, mass || '');
    },
    addRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({ ...this.recipe });
        this.SNACKBAR_SHOW('Рецепт добавлен');
        this.$router.push('/Recipes');
      }
    },
    editRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_EDIT({
          index: this.recipeIndex,
          recipe: { ...this.recipe },
        });
        this.SNACKBAR_SHOW('Рецепт изменен');
        this.$router.push('/Recipes');
      }
    },
    removeRecipe() {
      this.RECIPE_REMOVE(this.recipeIndex);
      this.SNACKBAR_SHOW('Рецепт удален');
      this.$router.push('/Recipes');
    },
    countReagentsMassByGh(dstGh, volume) {
      let gh = 0;
      if ('Ca' in this.totalIonConcentration) {
        gh += (this.totalIonConcentration.Ca * this.totalReagentsMass) / (GH.Ca * volume);
      }
      if ('Mg' in this.totalIonConcentration) {
        gh += (this.totalIonConcentration.Mg * this.totalReagentsMass) / (GH.Mg * volume);
      }
      gh *= 1000;
      const factor = gh / dstGh;
      const reagentsMassObjectPrepared = {};
      Object.entries(this.reagentsMassObject).forEach(([key, value]) => {
        reagentsMassObjectPrepared[key] = value / factor;
      });
      return reagentsMassObjectPrepared;
    },
    countKhByGh(volume) {
      let kh = 0;
      if ('CO3' in this.totalIonConcentration) {
        kh += countKh(this.totalIonConcentration.CO3, volume) * this.totalReagentsMass;
        kh *= 1000;
      }
      return kh;
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
