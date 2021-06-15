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
      <v-col v-if="recipes.length === 0" cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          {{ $t('recipes.alert.title') }}
        </p>
        <p>
          <a @click="dialog = true">{{ $t('recipes.alert.todo.action') }}</a> {{ $t('recipes.alert.todo.text') }}
        </p>
      </v-col>
      <v-col cols="12" sm="8" offset-sm="2">
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
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <v-expansion-panel
                v-for="(recipe, index) in recipes"
                :key="recipe.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div class="d-flex justify-space-between align-center" style="width: 100%;">
                    <span class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
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
                      <v-tooltip bottom max-width="400">
                        <template v-slot:activator="{ on }">
                          <v-icon class="handle ml-2" v-on="on">mdi mdi-drag</v-icon>
                        </template>
                        {{ $t('recipes.panel.header.pull') }}
                      </v-tooltip>
                    </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-if="recipe.type === 'Самомес'" class="mb-2">
                    Рецепт
                  </div>
                  <div v-if="recipe.volume" class="d-flex justify-space-between body-2">
                    <span class="">
                      Объем удобрения
                    </span>
                    <span>
                      {{ recipe.volume }} мл
                    </span>
                  </div>
                  <template v-for="reagent in recipe.reagents">
                    <div v-if="recipe.mass[reagent]" class="d-flex justify-space-between body-2" :key="reagent">
                      <span>
                        {{ FORMULAS[reagent].name }}
                      </span>
                      <span>
                        {{ recipe.mass[reagent].toFixed(2) }} г
                      </span>
                    </div>
                  </template>
                  <v-divider v-if="recipe.type === 'Самомес'" class="my-3"/>
                  <div
                    v-if="isConcentration(recipe.concentration)"
                    class="d-flex justify-space-between"
                  >
                    <div class="">Концентрация</div>
                    <div class="d-flex body-2">
                      <div>
                        <div
                          v-for="(value, ion) in countTotalIonConcentration(recipe.concentration)"
                          class="mr-3"
                          :key="ion + 'name'"
                        >
                          {{ convertIonName(ion) }}
                        </div>
                      </div>
                      <div>
                        <div
                          v-for="(value, ion) in countTotalIonConcentration(recipe.concentration)"
                          :key="ion + 'unit'"
                          class="text-right"
                        >
                          {{ (convertIonRatio(ion) * value * (recipe.volume || recipe.type === 'Готовое' ? 1 : 1000)).toFixed(2) }} {{ recipe.volume || recipe.type === 'Готовое' ? 'г/л' : 'мг/г'}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <v-divider v-if="recipe.note" class="my-3"/>
                  <div v-if="recipe.note" class="d-flex justify-space-between">
                    <div class="mr-3">Примечание</div>
                    <div class="text-right body-2">
                      {{ recipe.note }}
                    </div>
                  </div>
                  <div class="d-flex justify-end mt-4">
                    <v-btn text @click="openShareDialog(index)">
                      Поделиться
                    </v-btn>
                    <v-btn text @click="openEditRecipe(index)" class="mr-n4">
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
        <v-toolbar dark color="primary">
          <v-toolbar-title v-if="!isEditing">
            {{ $t('recipes.dialog.recipeEdit') }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            {{ $t('recipes.dialog.recipeEdit') }}
          </v-toolbar-title>
          <v-btn icon dark @click="dialog = false" class="ml-auto">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
          <v-container>
            <v-row>
              <v-col cols="12" md="8" offset-md="2">
                <v-form ref="recipeForm">
                  <v-row>
                    <v-col v-if="isShared" cols="12">
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
                        <v-col cols="12" sm="6">
                          Выберите единицы и введите концентрации элементов, которые указаны в составе удобрения.
                          Элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="recipesExamples['готовое']"
                            v-model="recipeExampleChosen"
                            label="Удобрение"
                            hint="или выберите удобрение из списка"
                            persistent-hint
                            hide-details="auto"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-radio-group
                            v-model="isPercent"
                            row
                            class="mt-0"
                            hide-details="auto"
                          >
                            <v-radio label="г/л" :value="false"></v-radio>
                            <v-radio label="%" :value="true"></v-radio>
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
                                :disabled="opposite[el] ? Boolean(elements[opposite[el]]) : false"
                              ></v-text-field>
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
                            ></v-text-field>
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
                            ></v-textarea>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col class="text-right" cols="12">
                            <v-btn
                              v-if="isEditing"
                              @click="removeRecipe"
                            >Удалить</v-btn>
                            <v-btn
                              v-if="isEditing"
                              color="primary"
                              @click="editRecipe"
                              class="ml-2"
                            >Сохранить</v-btn>
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
              <v-tooltip bottom max-width="400">
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
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogShare = false">
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
import { FORMULAS, RECIPE_EXAMPLES } from '@/constants'
import { convertIonName, convertIonRatio } from '@/funcs'
import { mapState, mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'Solutions',
  components: {
    draggable
  },
  data () {
    return {
      FORMULAS,
      RECIPE_EXAMPLES,
      drag: false,
      fertilizerType: 'Готовое',
      reagentsSelected: [],
      recipeExampleChosen: null,
      solute: {},
      recipeName_: null,
      recipeNote: null,
      elements: { ...this.resetElements() },
      opposite: {
        'N': 'NO3',
        'NO3': 'N',
        'P': 'PO4',
        'PO4': 'P'
      },
      isPercent: false,
      isShared: false,
      curRecipeIndex: null,
      dialog: this.$route.params.open,
      dialogShare: false,
      timeout: 2000,
      rulesName: [
        v => !!v || 'Введите название',
        v => (!this.isExist || this.isSame) || 'Рецепт с таким названием уже существует'
      ]
    }
  },
  mounted () {
    let query = this.$router.currentRoute.query
    if (query.share) {
      this.setComponent(JSON.parse(decodeURIComponent(query.share))[0])
      this.isShared = true
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'drawer'
    ]),
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    recipes: {
      get () {
        return this.$store.state.recipes.filter((item) => item.type === 'Готовое')
      },
      set (value) {
        this.RECIPE_MOVE(value)
      }
    },
    reagents () {
      let result = []
      for (let formula in this.FORMULAS) {
        result.push({
          text: `${this.FORMULAS[formula].name} - ${formula}`,
          name: `${this.FORMULAS[formula].name}`,
          value: formula
        })
      }
      result.sort((a, b) => a.text.localeCompare(b.text))
      return result
    },
    recipesExamples () {
      let recipeExamples = {
        'самомес': [],
        'готовое': []
      }
      for (let item of this.RECIPE_EXAMPLES) {
        recipeExamples[item.type].push(item.name)
        recipeExamples[item.type].sort((a, b) => a.localeCompare(b))
      }
      return recipeExamples
    },
    concentration () {
      let result = {}
      result[this.recipeName] = {}
      for (let el in this.elements) {
        let convertRatio = this.isPercent ? 10 : 1
        if (this.elements[el] && ['NO3', 'PO4'].includes(el)) {
          result[this.recipeName][this.convertIonName(el)] = this.convertIonRatio(el) * this.elements[el] * convertRatio
        } else if (this.elements[el]) {
          result[this.recipeName][el] = this.elements[el] * convertRatio
        } else {
          continue
        }
      }
      return result
    },
    recipeName: {
      get () {
        if (this.recipeName_ === null) {
          return this.fertilizerType
        } else {
          return this.recipeName_
        }
      },
      set (value) {
        this.recipeName_ = value
      }
    },
    isExist () {
      let names = this.recipes.map(item => item.name)
      return names.findIndex(item => item === this.recipeName_) !== -1
    },
    isSame () {
      let names = this.recipes.map(item => item.name)
      return names.findIndex(item => item === this.recipeName_) === this.curRecipeIndex
    },
    isEditing () {
      return this.curRecipeIndex !== null
    },
    encodedUrl () {
      let jsonString = JSON.stringify([this.recipes[this.curRecipeIndex]])
      jsonString = jsonString.replace(/%/g, '%25')
      let encoded = encodeURIComponent(jsonString)
      return window.location.origin + window.location.pathname + '?share=' + encoded
    }
  },
  watch: {
    recipeExampleChosen () {
      for (let item of this.RECIPE_EXAMPLES) {
        if (item.name === this.recipeExampleChosen) {
          this.isPercent = item.isPercent
          this.elements = Object.assign({}, this.resetElements())
          this.elements = Object.assign(this.elements, item.elements)
          this.recipeName_ = item.name
          this.recipeNote = item.note
          break
        }
      }
    },
    dialogShare () {
      if (!this.dialogShare) {
        this.curRecipeIndex = null
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD', 'RECIPE_REMOVE', 'RECIPE_EDIT', 'RECIPE_MOVE', 'SNACKBAR_SHOW'
    ]),
    resetComponent (dialog = false) {
      this.recipeExampleChosen = null
      this.recipeName_ = null
      this.recipeNote = null
      this.curRecipeIndex = null
      this.solute = {}
      this.dialog = dialog
      this.isPercent = false
      this.isShared = false
      this.elements = { ...this.resetElements() }
    },
    setComponent (recipe, index = null) {
      this.fertilizerType = recipe.type
      this.recipeName_ = recipe.name
      this.recipeNote = recipe.note
      this.curRecipeIndex = index
      this.dialog = true
      this.isPercent = recipe.isPercent
      this.elements = { ...recipe.elements }
    },
    resetElements () {
      return {
        'N': null,
        'NO3': null,
        'P': null,
        'PO4': null,
        'K': null,
        'Ca': null,
        'Mg': null,
        'Fe': null,
        'Mn': null,
        'B': null,
        'Zn': null,
        'Cu': null,
        'Mo': null,
        'Ni': null
      }
    },
    convertIonName (el) {
      return convertIonName(el)
    },
    convertIonRatio (el) {
      return convertIonRatio(el)
    },
    openAddRecipe () {
      this.resetComponent()
      this.dialog = true
      if (this.$refs.recipeForm) {
        this.$refs.recipeForm.resetValidation()
      }
    },
    addRecipe () {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({
          type: this.fertilizerType,
          name: this.recipeName,
          note: this.recipeNote,
          mass: { ...this.fertilizerMass },
          elements: { ...this.elements },
          concentration: { ...this.concentration },
          isPercent: this.isPercent
        })
        this.resetComponent()
        this.SNACKBAR_SHOW('Рецепт добавлен')
      }
    },
    openEditRecipe (index) {
      this.resetComponent()
      this.setComponent(this.recipes[index], index)
      if (this.$refs.recipeForm) {
        this.$refs.recipeForm.resetValidation()
      }
    },
    editRecipe () {
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
            elements: { ...this.elements },
            isPercent: this.isPercent
          }
        })
        this.resetComponent()
        this.SNACKBAR_SHOW('Рецепт изменен')
      }
    },
    removeRecipe () {
      this.RECIPE_REMOVE(this.curRecipeIndex)
      this.resetComponent()
      this.SNACKBAR_SHOW('Рецепт удален')
    },
    openShareDialog (index) {
      this.curRecipeIndex = index
      this.dialogShare = true
    },
    copyUrl () {
      var encodedUrl = document.getElementById('encodedUrl')
      encodedUrl.select()
      encodedUrl.setSelectionRange(0, 99999)
      document.execCommand('copy')
      this.SNACKBAR_SHOW('Ссылка скопирована')
    }
  }
}
</script>

<style lang="sass">
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
