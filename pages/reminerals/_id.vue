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
          color="primary"
          class="mr-0"
          square
          to="/reminerals"
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
                :value="reagents"
                @input="onReagentInput"
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
              <v-combobox
                v-model="recipeExampleChosen"
                :items="remineralsExamples"
                item-text="name"
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
                <SDivider>
                  Введите масс{{ reagents.length > 1 ? 'ы' : 'у' }} реагент{{ reagents.length > 1 ? 'ов' : 'а' }}
                </SDivider>
              </v-col>
              <v-col :cols="12">
                <number-field
                  v-for="reagent in reagents"
                  :key="reagent.key"
                  v-model="reagentsMassObject[reagent.key]"
                  :label="reagent.text"
                  :precision-show="3"
                  suffix="г"
                  hide-details="auto"
                  class="mb-4"
                />
              </v-col>
              <v-col cols="12">
                <hardness-table
                  :concentration="concentrationPerIon"
                  :mass.sync="totalMass"
                  :volume.sync="volume"
                  class="mt-4"
                />
              </v-col>
              <v-col cols="12">
                <SDivider class="mb-4">
                  Таблица с навесками
                </SDivider>
                <the-reminerals-recipes-table
                  :reagents-mass-object="reagentsMassObject"
                  :volume="volume"
                />
              </v-col>
              <v-col cols="12">
                <SDivider class="mb-4">
                  Подготовка смеси
                </SDivider>
                <TheRemineralsMixTable
                  :reagents-mass-object="reagentsMassObject"
                />
              </v-col>
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
                  class="mb-4"
                />
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
import { mapState, mapMutations } from 'vuex';

import FORMULAS from '~/helpers/constants/formulas';
import RECIPES from '~/helpers/constants/remineralRecipes';
import { prepareFormulas, sortArrayByObjectField } from '~/helpers/funcs/funcs';
import {
  countDryIonConcentrationPerIon,
  countTotalReagentsMass,
} from '~/helpers/funcs/concentrations';
import { countGh, countKh } from '~/helpers/funcs/hardness';

import HardnessTable from '~/components/Recipes/HardnessTable.vue';
import TheRemineralsRecipesTable from '~/components/Reminerals/TheRemineralsRecipesTable.vue';
import TheRemineralsMixTable from '~/components/Reminerals/TheRemineralsMixTable.vue';

export default {
  name: 'RemineralPage',
  components: {
    HardnessTable,
    TheRemineralsRecipesTable,
    TheRemineralsMixTable,
  },
  data() {
    return {
      FORMULAS,
      RECIPES,
      isShared: false,
      reagents: [],
      search: '',
      recipeExampleChosen: null,
      reagentsMassObject: {},
      totalMass: 0,
      volume: 10,
      name: '',
      note: '',
      rulesReagent: [
        () => (this.reagents.length > 0) || 'Выберите реагент',
      ],
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
      recipe = JSON.parse(JSON.stringify({ ...this.reminerals[this.recipeIndex] }));
    }
    const reagents = [];
    const reagentsNames = Object.keys(recipe.reagentsMassObject);
    this.formulas.forEach((formula) => {
      if (reagentsNames.includes(formula.key)) {
        reagents.push(formula);
      }
    });
    this.reagents = reagents;
    this.name = recipe.name;
    this.note = recipe.note;
    this.reagentsMassObject = recipe.reagentsMassObject;
  },
  computed: {
    ...mapState([
      'reminerals',
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
        volume: this.volume,
        reagentsMassObject: { ...this.reagentsMassObject },
        gh: countGh(this.concentrationPerIon, this.totalMass, this.volume),
        kh: countKh(this.concentrationPerIon, this.totalMass, this.volume),
      };
    },
    formulas() {
      return prepareFormulas(['Ca', 'Mg']);
    },
    remineralsExamples() {
      return sortArrayByObjectField(RECIPES, 'name');
    },
    isReagents() {
      return this.reagents.length > 0;
    },
    concentrationPerIon() {
      return countDryIonConcentrationPerIon(this.reagentsMassObject);
    },
    isExist() {
      const names = this.reminerals.map((item) => item.name);
      const index = names.findIndex((item) => item === this.name);
      const isExist = index !== -1;
      const isEdit = index === +this.recipeIndex;
      return isExist && !isEdit;
    },
  },
  watch: {
    recipeExampleChosen(recipe) {
      this.reagents = [];
      this.reagentsMassObject = {};
      this.reagentsMassObject = { ...recipe.reagentsMassObject };
      const reagents = [];
      Object.keys(recipe.reagentsMassObject).forEach((reagentName) => {
        reagents.push({
          key: reagentName,
          text: `${FORMULAS[reagentName].name} - ${reagentName}`,
          ...FORMULAS[reagentName],
        });
      });
      this.reagents = reagents;
      this.name = recipe.name;
      this.note = recipe.note;
      this.totalMass = recipe.mass;
      this.volume = recipe.volume;
    },
    reagentsMassObject: {
      deep: true,
      handler() {
        this.totalMass = countTotalReagentsMass(this.reagentsMassObject);
      },
    },
  },
  methods: {
    ...mapMutations([
      'REMINERAL_ADD',
      'REMINERAL_REMOVE',
      'REMINERAL_EDIT',
      'SNACKBAR_SHOW',
    ]),
    onReagentInput(newValue) {
      if (newValue.length < this.reagents.length) {
        const reagentsToRemove = this.reagents.filter((item) => !newValue.includes(item));
        reagentsToRemove.forEach((item) => {
          delete this.reagentsMassObject[item.key];
        });
      }
      this.reagents = [...newValue];
      this.reagents.forEach((reagent) => {
        if (!(reagent.key in this.reagentsMassObject)) {
          this.reagentsMassObject[reagent.key] = 0;
        }
      });
    },
    addRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.REMINERAL_ADD({ ...this.recipe });
        this.SNACKBAR_SHOW('Рецепт добавлен');
        this.$router.push('/reminerals');
      }
    },
    editRecipe() {
      if (this.$refs.recipeForm.validate()) {
        this.REMINERAL_EDIT({
          index: this.recipeIndex,
          recipe: { ...this.recipe },
        });
        this.SNACKBAR_SHOW('Рецепт изменен');
        this.$router.push('/reminerals');
      }
    },
    removeRecipe() {
      this.REMINERAL_REMOVE(this.recipeIndex);
      this.SNACKBAR_SHOW('Рецепт удален');
      this.$router.push('/reminerals');
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
