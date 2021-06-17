<!--
  Samomes

  Copyright (C) 2020 Mikhail Lapshin

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
        v-if="recipes.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}"
        >
          {{ $t('recipes.alert.title') }}
        </p>
        <p>
          <a @click="dialog = true">{{ $t('recipes.alert.todo.action') }}</a> {{ $t('recipes.alert.todo.text') }}
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
                      <span class="font-weight-light caption text-lowercase ml-0 ml-sm-1">
                        {{ recipe.type }}
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
                        {{ $t('recipes.panel.header.pull') }}
                      </v-tooltip>
                    </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <recipe :recipe="recipe" />
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
                      Изменить
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
                    <v-col
                      v-if="isShared"
                      cols="12"
                    >
                      <p class="display-1">
                        С вами поделились рецептом!
                      </p>
                      <p>
                        Посмотрите рецепт, дайте ему
                        название и напишите примечание. После этого можете сохранить его.
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          Выберите единицы и введите концентрации элементов, которые указаны в составе удобрения.
                          Элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-select
                            :items="recipesExamples"
                            v-model="recipeExampleChosen"
                            label="Удобрение"
                            hint="или выберите удобрение из списка"
                            persistent-hint
                            hide-details="auto"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-radio-group
                            v-model="isPercent"
                            row
                            class="mt-0"
                            hide-details="auto"
                          >
                            <v-radio
                              label="г/л"
                              :value="false"
                            />
                            <v-radio
                              label="%"
                              :value="true"
                            />
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col
                              v-for="(amount, el) in elements"
                              :cols="['N', 'NO3', 'P', 'PO4'].includes(el) ? 6 : 12"
                              class="py-0"
                              :key="el"
                            >
                              <v-text-field
                                v-model.number="elements[el]"
                                type="number"
                                :label="el"
                                :value="amount"
                                :suffix="isPercent ? '%' : 'г/л'"
                                persistent-hint
                                hide-details="auto"
                                :disabled="OPPOSITE[el] ? Boolean(elements[OPPOSITE[el]]) : false"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-expand-transition>
                          <v-col cols="12">
                            <v-text-field
                              v-model="recipeName"
                              label="Имя рецепта"
                              hide-details="auto"
                              hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                              :rules="rulesName"
                            />
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
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
                        </v-expand-transition>
                        <v-expand-transition>
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

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          fab
          @click="openAddRecipe"
          v-on="on"
          fixed
          bottom
          right
          :class="{'drawer': drawer && $vuetify.breakpoint['smAndUp']}"
          style="transition: all 0.2s;"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('recipes.addButton') }}</span>
    </v-tooltip>
  </v-container>
</template>

<script>
import FORMULAS from '@/constants/formulas';
import RECIPE_EXAMPLES from '@/constants/recipes';
import { convertIonName, convertIonRatio, OPPOSITE } from '@/helpers/funcs';
import { mapState, mapMutations } from 'vuex';
import draggable from 'vuedraggable';
import Recipe from '@/components/recipes/Recipe.vue';

export default {
  name: 'Solutions',
  components: {
    draggable,
    Recipe,
  },
  data() {
    return {
      FORMULAS,
      RECIPE_EXAMPLES,
      OPPOSITE,
      drag: false,
      fertilizerType: 'Готовое',
      reagentsSelected: [],
      recipeExampleChosen: null,
      solute: {},
      recipeName: this.fertilizerType,
      recipeNote: null,
      elements: { ...this.resetElements() },
      isPercent: false,
      isShared: false,
      curRecipeIndex: null,
      dialog: this.$route.params.open,
      dialogShare: false,
      timeout: 2000,
      rulesName: [
        (v) => !!v || 'Введите название',
        () => (!this.isExist || this.isSame) || 'Рецепт с таким названием уже существует',
      ],
    };
  },
  mounted() {
    const { query } = this.$router.currentRoute;
    if (query.share) {
      this.setComponent(JSON.parse(decodeURIComponent(query.share))[0]);
      this.isShared = true;
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'drawer',
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
        return this.$store.state.recipes.filter((item) => item.type === 'Готовое');
      },
      set(value) {
        this.RECIPE_MOVE(value);
      },
    },
    recipesExamples() {
      const recipeExamples = [];
      this.RECIPE_EXAMPLES.forEach((item) => {
        if (item.type === 'готовое') {
          recipeExamples.push(item.name);
          recipeExamples.sort((a, b) => a.localeCompare(b));
        }
      });
      return recipeExamples;
    },
    concentration() {
      const result = {};
      result[this.recipeName] = {};
      Object.entries(this.elements).forEach((el, value) => {
        const convertRatio = this.isPercent ? 10 : 1;
        if (value && ['NO3', 'PO4'].includes(el)) {
          result[this.recipeName][this.convertIonName(el)] = this.convertIonRatio(el) * value * convertRatio;
        } else if (this.elements[el]) {
          result[this.recipeName][el] = value * convertRatio;
        }
      });
      return result;
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
    recipeExampleChosen() {
      this.RECIPE_EXAMPLES.forEach((item) => {
        if (item.name === this.recipeExampleChosen) {
          this.isPercent = item.isPercent;
          this.elements = { ...this.resetElements() };
          this.elements = Object.assign(this.elements, item.elements);
          this.recipeName = item.name;
          this.recipeNote = item.note;
        }
      });
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
    ]),
    convertIonName,
    convertIonRatio,
    resetComponent(dialog = false) {
      this.recipeExampleChosen = null;
      this.recipeName = '';
      this.recipeNote = null;
      this.curRecipeIndex = null;
      this.solute = {};
      this.dialog = dialog;
      this.isPercent = false;
      this.isShared = false;
      this.elements = { ...this.resetElements() };
    },
    setComponent(recipe, index = null) {
      this.fertilizerType = recipe.type;
      this.recipeName = recipe.name;
      this.recipeNote = recipe.note;
      this.curRecipeIndex = index;
      this.dialog = true;
      this.isPercent = recipe.isPercent;
      this.elements = { ...recipe.elements };
    },
    resetElements() {
      return {
        N: null,
        NO3: null,
        P: null,
        PO4: null,
        K: null,
        Ca: null,
        Mg: null,
        Fe: null,
        Mn: null,
        B: null,
        Zn: null,
        Cu: null,
        Mo: null,
        Ni: null,
      };
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
          mass: { ...this.fertilizerMass },
          elements: { ...this.elements },
          concentration: { ...this.concentration },
          isPercent: this.isPercent,
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
            mass: { ...this.fertilizerMass },
            concentration: { ...this.concentration },
            elements: { ...this.elements },
            isPercent: this.isPercent,
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
