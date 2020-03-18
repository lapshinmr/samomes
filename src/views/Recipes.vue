<template>
  <v-container>
    <v-row v-if="recipes.length > 0">
      <v-col cols="12" md="6"
        v-for="(recipe, index) in recipes"
        :key="recipe.name"
      >
        <v-card>
          <v-card-title>
            {{ recipe.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ recipe.note }}
          </v-card-subtitle>
          <v-card-text>
            <div v-if="recipe.volume" class="d-flex justify-content-between">
              <span>Объем удобрения</span>
              <span>{{ recipe.volume }} мл</span>
            </div>
            <v-divider />
            <div class="mt-3 mb-2">Реагенты</div>
            <template v-for="reagent in recipe.reagents">
              <div v-if="recipe.mass[reagent]" class="d-flex justify-content-between" :key="reagent">
                <span>
                  {{ FORMULAS[reagent].name }} ({{ reagent }})
                </span>
                <span>
                  {{ parseFloat(recipe.mass[reagent]).toFixed(2) }} г
                </span>
              </div>
            </template>
            <v-divider />
            <div class="mt-3 d-flex justify-content-between">
              <div>Концентрация</div>
              <div>
                <span
                  v-for="(value, ion, index) in countTotalConcentration(recipe.concentration)"
                  :class="{'ml-2': index !== 0}"
                  :key="ion"
                >
                  {{ convertIonName(ion) }}: {{ (convertIonRatio(ion) * value).toFixed(1) }} г/л
                </span>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="setComponent(index)">
              Изменить
            </v-btn>
          </v-card-actions>
        </v-card>
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
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="!isEditing">
            Новый рецепт
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Редактирование рецепта
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="recipeForm">
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="fertilizerTypes"
                  v-model="fertilizerType"
                  label="Выберите тип удобрения"
                  hint="От типа зависит как будет использоваться удобрение в расчете"
                  persistent-hint
                  hide-details="auto"
                  hide-selected
                ></v-select>
              </v-col>

              <v-col v-if="fertilizerType === 'Самомес'" cols="12">
                <v-row>
                  <v-col cols="12">
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
                    ></v-select>
                    <div
                      class="mt-2"
                    >
                      <div
                        v-for="(reagent, index) in reagentsSelected"
                        :key="reagent"
                        class="d-flex justify-content-between"
                      >
                        <div>{{ reagents[index].text }}</div>
                        <div>{{ showComponents(countProcent(reagent)) }}</div>
                      </div>
                    </div>
                    <div v-if="reagentsSelected.length > 0" class="mt-3">
                      <small>
                        *Так как аквариумисту удобнее работать с нитратом (NO3), а не с азотом (N), далее
                        азот будет приведен к нитрату.
                      </small>
                    </div>
                  </v-col>
                  <v-expand-transition>
                    <v-col v-if="reagentsSelected.length > 0" cols="12">
                      <v-combobox
                        :items="tanks"
                        v-model="tankVolume"
                        item-text="name"
                        item-value="volume"
                        label="Объем аквариума"
                        persistent-hint
                        hide-selected
                        hint="Выберите аквариум или введите объем"
                        suffix="л"
                        :return-object="false"
                      ></v-combobox>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="reagentsSelected.length > 0" cols="12">
                      <v-text-field
                        :value="fertilizerVolume"
                        @input="inputVolume"
                        label="Введите объем удобрения"
                        suffix="мл"
                        hint="Выбирайте объем, который вы сможете использовать в течении 2-3x месяцев"
                        hide-details="auto"
                        :rules="rulesVolume"
                      >
                      </v-text-field>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="reagentsSelected.length > 0 && fertilizerVolume && tankVolume" cols="12">
                      <v-row>
                        <v-col cols="12">
                          <div class="d-flex align-items-center">
                            <v-divider />
                            <span class="mx-3">
                              Введите массу реагента
                              <v-tooltip bottom max-width="400">
                                <template v-slot:activator="{ on }">
                                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                Введите массу реагента и калькулятор автоматически рассчитает
                                дозы элементов.
                              </v-tooltip>
                            </span>
                            <v-divider />
                          </div>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <template v-for="reagent in reagentsSelected">
                              <v-col :key="reagent + 1" cols="6">
                                <v-text-field
                                  :value="fertilizerMass[reagent]"
                                  @input="inputMass(reagent)"
                                  :label="reagent"
                                  suffix="г"
                                  hint="Введите массу"
                                  hide-details="auto"
                                  :key="reagent"
                                  :rules="[rulesMass.isExist(), rulesMass.solubility(reagent, fertilizerVolume, FORMULAS)]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col class="d-flex align-items-center" cols="6" :key="reagent + 2">
                                <template v-for="(data, ion) in FORMULAS[reagent].ions">
                                  <span v-if="data.isNeeded" :key="reagent + '_' + ion" class="ml-2" style="white-space: nowrap">
                                    {{ convertIonName(ion) + ': ' + (convertIonRatio(ion) * concentration[reagent][ion]).toFixed(2) + ' г/л' }}
                                  </span>
                                </template>
                              </v-col>
                            </template>
                            <v-col v-if="reagentsSelected.length > 1" cols="12">
                              <v-row>
                                <v-col cols="6">
                                  Суммарная концентрация
                                </v-col>
                                <v-col cols="6">
                                  <span class="ml-2" v-for="(value, name) in countTotalConcentration(concentration)" :key="name">
                                    {{ convertIonName(name) }}: {{ (convertIonRatio(name) * value).toFixed(2) }} г/л
                                  </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <div class="d-flex align-items-center">
                            <v-divider />
                            <span class="mx-3">
                              Или введите дозу элемента
                              <v-tooltip bottom max-width="400">
                                <template v-slot:activator="{ on }">
                                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                Введите дозу элемента. Калькулятор автоматически рассчитает
                                необходимую массу реагента.
                                Например, вы хотите сделать макро удобрение с нитратом.
                                И для удобства введения его в аквариум вы бы хотели, чтобы
                                на каждый вводимый 1 мл удобрения, нитрат повышался на 0.5.
                              </v-tooltip>
                            </span>
                            <v-divider />
                          </div>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <template v-for="reagent in reagentsSelected">
                              <v-col cols="12" :key="reagent" class="py-0">
                                <v-row>
                                  <v-col cols="4">
                                    {{ reagent }}
                                  </v-col>
                                  <template v-for="(data, ion) in FORMULAS[reagent].ions">
                                    <v-col v-if="data.isNeeded" :key="reagent + ion" class="py-0">
                                      <v-text-field
                                        :value="solute[reagent][ion]"
                                        @input="inputIon(reagent, ion)"
                                        :label="convertIonName(ion)"
                                        suffix="мг/л"
                                        hide-details="auto"
                                      ></v-text-field>
                                    </v-col>
                                  </template>
                                </v-row>
                              </v-col>
                            </template>
                            <v-col v-if="reagentsSelected.length > 1" cols="12">
                              <v-row>
                                <v-col cols="4">
                                  Общая доза
                                </v-col>
                                <v-col v-for="(value, name) in countTotalDose(solute)" :key="name">
                                  {{ convertIonName(name) }}: {{ value}} мг/л
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="reagentsSelected.length > 0 && fertilizerVolume && tankVolume" cols="12">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="recipeName"
                            label="Имя рецепта"
                            hide-details="auto"
                            hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                            :rules="rulesName"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="recipeNote"
                            label="Примечание"
                            hide-details="auto"
                            hint="Вы можете добавить дополнительные сведения к рецепту"
                          ></v-text-field>
                        </v-col>
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
                            Создать
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-expand-transition>
                </v-row>
              </v-col>
              <v-col v-else cols="12">
                <v-row>
                  <v-col cols="12">
                    Введите концентрации элементов. Концентрацию можно найти на этикетке флакона с удобрением.
                    Элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-for="(value, name) in elements"
                      v-model.number="elements[name]"
                      :label="name"
                      :value="value"
                      suffix="г/л"
                      persistent-hint
                      hide-details="auto"
                      :key="name"
                    ></v-text-field>
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
                      <v-text-field
                        v-model="recipeNote"
                        label="Примечание"
                        hide-details="auto"
                        hint="Вы можете добавить дополнительные сведения к рецепту"
                      ></v-text-field>
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
                        Создать
                      </v-btn>
                    </v-col>
                  </v-expand-transition>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

    </v-dialog>

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          bottom
          right
          color="primary"
          dark
          fab
          fixed
          @click="openAddRecipe"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить удобрение</span>
    </v-tooltip>

  </v-container>
</template>

<script>
import Vue from 'vue'
import { FORMULAS } from '../constants.js'
import { countTotalConcentration, countTotalDose, countMass, convertIonName, convertIonRatio } from '../funcs.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'recipe',
  data () {
    return {
      FORMULAS: FORMULAS,
      fertilizerTypes: ['Самомес', 'Готовое удобрение'],
      fertilizerType: 'Самомес',
      elements: {
        'NO3': null,
        'N': null,
        'PO4': null,
        'P': null,
        'K': null
      },
      reagentsSelected: [],
      fertilizerVolume: null,
      tankVolume: null,
      fertilizerMass: {},
      solute: {},
      recipeName_: null,
      recipeNote_: null,
      curRecipeIndex: null,
      dialog: false,
      rulesReagent: [
        v => !!(v.length > 0) || 'Выберите реагент'
      ],
      rulesMass: {
        solubility (reagent, volume, formulas) {
          return v => (
            (v / volume * 1000) < formulas[reagent].solubilityLimit ||
            `Достигнута максимальная растворимость - ${formulas[reagent].solubilityLimit} г/л при 20°С!`
          )
        },
        isExist () {
          return v => !!v || 'Введите массу'
        }
      },
      rulesVolume: [
        v => !!v || 'Введите объем удобрения'
      ],
      rulesName: [
        v => !!v || 'Введите название',
        v => (!this.isExist || this.isSame) || 'Рецепт с таким названием уже существует'
      ]
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes'
    ]),
    reagents () {
      let result = []
      for (let formula in this.FORMULAS) {
        result.push({
          text: `${this.FORMULAS[formula].name} - ${formula}`,
          value: formula
        })
      }
      return result
    },
    concentration () {
      let result = {}
      if (this.fertilizerType === 'Самомес') {
        if (this.reagentsSelected.length === 0 && !this.fertilizerMass && !this.fertilizerVolume) { return result }
        for (let reagent of this.reagentsSelected) {
          result[reagent] = {}
          let ions = FORMULAS[reagent].ions
          for (let ion in ions) {
            if (ions[ion].isNeeded) {
              result[reagent][ion] = this.fertilizerMass[reagent] * this.countProcent(reagent)[ion] / (this.fertilizerVolume / 1000)
            }
          }
        }
      } else {
        for (let el in this.elements) {
          if (el === 'N' && this.elements['N']) {
            result['NO3'] = this.convertIon('N') * this.elements[el]
          } else if (el === 'P' && this.elements['P']) {
            result['PO4'] = this.convertIon('P') * this.elements[el]
          } else {
            result[el] = this.elements[el]
          }
        }
      }
      return result
    },
    recipeName: {
      get () {
        if (this.recipeName_ === null && this.reagentsSelected.length === 1) {
          let reagent = this.reagentsSelected[0]
          return this.FORMULAS[reagent].name
        } else if (this.recipeName_ === null) {
          return 'Самомес'
        } else {
          return this.recipeName_
        }
      },
      set (value) {
        this.recipeName_ = value
      }
    },
    recipeNote: {
      get () {
        if (this.recipeNote_ === null && this.reagentsSelected.length === 1) {
          let reagent = this.reagentsSelected[0]
          if (this.fertilizerMass[reagent] && this.fertilizerVolume) {
            return `${parseFloat(this.fertilizerMass[reagent]).toFixed(2)} г на ${this.fertilizerVolume} мл`
          } else {
            return ''
          }
        } else {
          return this.recipeNote_
        }
      },
      set (value) {
        this.recipeNote_ = value
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
    }
  },
  watch: {
    reagentsSelected () {
      if (this.reagentsSelected.length === 0) { }
      let solute = {}
      for (let reagent of this.reagentsSelected) {
        let ions = this.FORMULAS[reagent].ions
        solute[reagent] = {}
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            solute[reagent][ion] = 0
          }
        }
      }
      this.solute = { ...solute }
      let fertilizerMass = {}
      for (let reagent of this.reagentsSelected) {
        if (!(reagent in this.fertilizerMass)) {
          fertilizerMass[reagent] = 0
        } else {
          fertilizerMass[reagent] = this.fertilizerMass[reagent]
        }
      }
      this.fertilizerMass = { ...fertilizerMass }
      if (this.fertilizerVolume) {
        this.countDose()
      }
    },
    tankVolume () {
      if (this.fertilizerVolume) {
        this.countDose()
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD', 'RECIPE_REMOVE', 'RECIPE_EDIT'
    ]),
    resetComponent () {
      this.reagentsSelected = []
      this.fertilizerMass = {}
      this.fertilizerVolume = null
      this.recipeName_ = null
      this.recipeNote = null
      this.tankVolume = null
      this.curRecipeIndex = null
      this.solute = {}
      this.dialog = false
    },
    setComponent (index) {
      let recipe = this.recipes[index]
      this.reagentsSelected = recipe.reagents
      this.fertilizerMass = recipe.mass
      this.fertilizerVolume = recipe.volume
      this.tankVolume = recipe.tankVolume
      this.recipeName_ = recipe.name
      this.recipeNote = recipe.note
      this.curRecipeIndex = index
      this.dialog = true
    },
    countMass (element) {
      return countMass(element)
    },
    countProcent (element) {
      let massTotal = this.countMass(element)
      let result = {}
      let ions = FORMULAS[element].ions
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          result[ion] = this.countMass(ion) * ions[ion].count / massTotal
        }
      }
      return result
    },
    convertIonName (el) {
      return convertIonName(el)
    },
    convertIonRatio (el) {
      return convertIonRatio(el)
    },
    countDose () {
      for (let reagent of this.reagentsSelected) {
        let ions = FORMULAS[reagent].ions
        let result = {}
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            let value = this.fertilizerMass[reagent] / (this.fertilizerVolume / 1000) / this.tankVolume * this.countProcent(reagent)[ion] * this.convertIonRatio(ion)
            result[ion] = parseFloat(value.toFixed(3))
            Vue.set(this.solute, reagent, result)
          }
        }
      }
    },
    inputMass (reagent) {
      Vue.set(this.fertilizerMass, reagent, parseFloat(event.target.value))
      if (this.tankVolume) {
        this.countDose()
      }
    },
    inputVolume () {
      this.fertilizerVolume = event.target.value
      if (this.tankVolume) {
        this.countDose()
      }
    },
    inputIon (reagent, curIon) {
      let value
      let solute = {}
      let ratio = {}
      for (let ion in this.solute[reagent]) {
        ratio[ion] = this.convertIonRatio(ion)
      }
      for (let ion in this.solute[reagent]) {
        value = parseFloat(event.target.value)
        if (ion !== curIon) {
          if (ratio[curIon] > 1) {
            value = value / ratio[curIon]
          } else {
            value = value * ratio[ion]
          }
          value = value * (this.countProcent(reagent)[ion] / this.countProcent(reagent)[curIon])
          value = parseFloat(value.toFixed(3))
        }
        solute[ion] = !isNaN(value) ? value : ''
        Vue.set(this.solute, reagent, solute)
      }
      let fertilizerMass = { ...this.fertilizerMass }
      let mass
      if (!this.solute[reagent][curIon]) {
        mass = 0
      } else {
        mass = this.solute[reagent][curIon] * this.tankVolume / this.countProcent(reagent)[curIon] * this.fertilizerVolume / 1000 / this.convertIonRatio(curIon)
      }
      fertilizerMass[reagent] = mass.toFixed(3)
      this.fertilizerMass = { ...fertilizerMass }
    },
    countTotalConcentration (concentration) {
      return countTotalConcentration(concentration)
    },
    countTotalDose (solute) {
      return countTotalDose(solute)
    },
    openAddRecipe () {
      this.resetComponent()
      this.dialog = !this.dialog
      if (this.$refs.recipeForm) {
        this.$refs.recipeForm.resetValidation()
      }
    },
    addRecipe () {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({
          name: this.recipeName,
          note: this.recipeNote,
          volume: this.fertilizerVolume,
          tankVolume: this.tankVolume,
          reagents: [ ...this.reagentsSelected ],
          mass: { ...this.fertilizerMass },
          concentration: { ...this.concentration }
        })
        this.resetComponent()
      }
    },
    editRecipe () {
      if (this.$refs.recipeForm.validate()) {
        console.log(this.recipeName, this.recipeNote)
        this.RECIPE_EDIT({
          index: this.curRecipeIndex,
          recipe: {
            name: this.recipeName,
            note: this.recipeNote,
            volume: this.fertilizerVolume,
            tankVolume: this.tankVolume,
            reagents: [...this.reagentsSelected],
            mass: { ...this.fertilizerMass },
            concentration: { ...this.concentration }
          }
        })
        this.resetComponent()
      }
    },
    removeRecipe () {
      this.RECIPE_REMOVE(this.curRecipeIndex)
      this.resetComponent()
    },
    showComponents (ions) {
      let output = []
      for (let key in ions) {
        output.push(`${key}: ${(ions[key] * 100).toFixed(1)}%`)
      }
      return output.join(' ')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
