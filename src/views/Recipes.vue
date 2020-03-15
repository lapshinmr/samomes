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
            <div class="d-flex justify-content-between">
              <span>Реагент</span><span>{{ recipe.reagent }}</span>
            </div>
            <div v-if="recipe.mass" class="d-flex justify-content-between">
              <span>Масса реагента</span><span>{{ parseFloat(recipe.mass).toFixed(2) }} г</span>
            </div>
            <div v-if="recipe.mass" class="d-flex justify-content-between">
              <span>Объем удобрения</span><span>{{ recipe.volume }} мл</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Концентрация</span>
              <span class="d-flex flex-column align-items-end">
                <span v-for="(value, key) in recipe.concentration" class="" :key="key">
                  {{ key }}: {{ value.toFixed(1) }} г/л
                </span>
              </span>
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
                      v-model="reagentSelected"
                      label="Реагент"
                      :hint="hintReagent"
                      persistent-hint
                      hide-details="auto"
                      hide-selected
                      :rules="rulesReagent"
                    ></v-select>
                  </v-col>
                  <v-expand-transition>
                    <v-col v-if="reagentSelected" cols="12">
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
                    <v-col v-if="reagentSelected && fertilizerVolume" cols="12">
                      <div class="d-flex align-items-center">
                        <v-divider />
                        <span class="mx-3">
                          Расчет по массе
                          <v-tooltip bottom max-width="400">
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                            </template>
                            "Расчет по массе" позволяет добавить удобрение если
                            известна масса реагента и необходимый объем воды.
                          </v-tooltip>
                        </span>
                        <v-divider />
                      </div>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="reagentSelected && fertilizerVolume" cols="12">
                      <v-text-field
                        :value="fertilizerMass"
                        @input="inputMass"
                        label="Введите массу реагента"
                        suffix="г"
                        hint="Чем больше масса реагента на выбранный объем, тем больше концентрация"
                        hide-details="auto"
                        :rules="rulesMass"
                      ></v-text-field>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="fertilizerMass && fertilizerVolume" cols="12">
                      Концентрация элементов в удобрении:
                      <template v-for="(data, ion) in FORMULAS[reagentSelected].ions">
                        <span v-if="data.isNeeded" :key="ion" class="ml-2">
                          {{ ion + ' - ' + concentration[ion].toFixed(2) + ' г/л' }}
                        </span>
                      </template>
                    </v-col>
                  </v-expand-transition>
                  <v-col v-if="reagentSelected && fertilizerVolume" cols="12">
                    <div class="d-flex align-items-center">
                      <v-divider />
                      <span class="mx-3">
                        Расчет по дозе
                        <v-tooltip bottom max-width="400">
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                          </template>
                          "Расчет по дозе" - это удобный способ расчитать массу
                          реагента для определенного объема аквариума и заданного
                          объема удобрения.
                          Например, вы хотите сделать макро удобрение с нитратом.
                          И для удобства введения его в аквариум вы бы хотели, чтобы
                          на каждый вводимый мл удобрения, повышался показатель
                          нитрата на 0.5.
                        </v-tooltip>
                      </span>
                      <v-divider />
                    </div>
                  </v-col>
                  <v-col v-if="reagentSelected && fertilizerVolume" cols="12">
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
                  <v-expand-transition>
                    <v-col cols="12" v-if="this.tankVolume">
                      <div>
                        Повышение концентрации в аквариуме на 1 мл вводимого удобрения
                      </div>
                      <v-row >
                        <template v-for="(data, ion) in FORMULAS[reagentSelected].ions">
                          <v-col v-if="data.isNeeded" :key="ion">
                            <v-text-field
                              :value="solute[ion]"
                              @input="inputIon(ion)"
                              :label="ion"
                              suffix="мг/л"
                              persistent-hint
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                        </template>
                      </v-row>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="fertilizerMass && fertilizerVolume" cols="12">
                      <v-text-field
                        v-model="recipeName"
                        label="Имя рецепта"
                        hide-details="auto"
                        hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                        :rules="rulesName"
                      ></v-text-field>
                    </v-col>
                  <v-expand-transition>
                  </v-expand-transition>
                    <v-col v-if="fertilizerMass && fertilizerVolume" cols="12">
                      <v-text-field
                        v-model="recipeNote"
                        label="Примечание"
                        hide-details="auto"
                        hint="Вы можете добавить дополнительные сведения к рецепту"
                      ></v-text-field>
                    </v-col>
                  </v-expand-transition>
                  <v-expand-transition>
                    <v-col v-if="fertilizerMass && fertilizerVolume" class="text-right" cols="12">
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
import { FORMULAS, COMPONENTS } from '../constants.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'recipe',
  data () {
    return {
      FORMULAS: FORMULAS,
      fertilizerTypes: ['Самомес', 'Готовое удобрение'],
      fertilizerType: 'Самомес',
      reagents: ['KNO3', 'KH2PO4', 'K2SO4'],
      elements: {
        'NO3': null,
        'N': null,
        'PO4': null,
        'P': null,
        'K': null
      },
      isNO3: true,
      isPO4: true,
      isPercent: false,
      reagentSelected: null,
      tankVolume: null,
      fertilizerMass: null,
      fertilizerVolume: null,
      solute: {},
      recipeName_: null,
      recipeNote: null,
      curRecipeIndex: null,
      dialog: false,
      rulesReagent: [
        v => !!v || 'Выберите реагент'
      ],
      rulesMass: [
        v => (
          (this.fertilizerMass / this.fertilizerVolume * 1000) < this.FORMULAS[this.reagentSelected].solubilityLimit ||
          `Достигнута максимальная растворимость - ${this.FORMULAS[this.reagentSelected].solubilityLimit} г/л при 20°С!`
        ),
        v => !!v || 'Введите массу'
      ],
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
    hintReagent () {
      if (this.reagentSelected) {
        return `${this.FORMULAS[this.reagentSelected].name} - ${this.showComponents(this.calcProcent)}`
      } else {
        return ''
      }
    },
    calcProcent () {
      if (!this.reagentSelected) { return {} }
      let massTotal = this.calcMass(this.reagentSelected)
      let result = {}
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in ions) {
        result[ion] = this.calcMass(ion) * ions[ion].count / massTotal
      }
      return result
    },
    concentration () {
      let result = {}
      if (this.fertilizerType === 'Самомес') {
        if (!this.reagentSelected && !this.fertilizerMass && !this.fertilizerVolume) { return result }
        let ions = FORMULAS[this.reagentSelected].ions
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            result[ion] = this.fertilizerMass * this.calcProcent[ion] / (this.fertilizerVolume / 1000)
          }
        }
      } else {
        for (let el in this.elements) {
          if (el === 'N' && this.elements['N']) {
            result['NO3'] = this.calcMass('NO3') / this.calcMass('N') * this.elements[el]
          } else if (el === 'P' && this.elements['P']) {
            result['PO4'] = this.calcMass('PO4') / this.calcMass('P') * this.elements[el]
          } else {
            result[el] = this.elements[el]
          }
        }
      }
      return result
    },
    recipeName: {
      get () {
        if (this.reagentSelected) {
          let name = this.FORMULAS[this.reagentSelected].name
          if (this.recipeName_ === null) {
            if (this.fertilizerMass && this.fertilizerVolume) {
              name += ` ${parseFloat(this.fertilizerMass).toFixed(2)} г на ${this.fertilizerVolume} мл`
            }
            return name
          } else {
            return this.recipeName_
          }
        } else {
          return 'Удобрение'
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
    }
  },
  watch: {
    reagentSelected () {
      if (!this.reagentSelected) { return }
      let ions = this.FORMULAS[this.reagentSelected].ions
      let solute = {}
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          solute[ion] = 0
        }
      }
      this.solute = solute
    },
    tankVolume () {
      if (this.fertilizerMass && this.fertilizerVolume) {
        this.countDose()
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD', 'RECIPE_REMOVE', 'RECIPE_EDIT'
    ]),
    resetComponent () {
      this.reagentSelected = null
      this.fertilizerMass = null
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
      this.reagentSelected = recipe.reagent
      this.fertilizerMass = recipe.mass
      this.fertilizerVolume = recipe.volume
      this.recipeName_ = recipe.name
      this.recipeNote = recipe.note
      this.curRecipeIndex = index
      this.dialog = true
    },
    calcMass (reagent) {
      let mass = 0
      let lastElement
      for (let el of reagent) {
        mass += !isNaN(el)
          ? COMPONENTS[lastElement] * (parseInt(el) - 1)
          : COMPONENTS[el]
        lastElement = el
      }
      console.log(mass)
      return mass
    },
    countDose () {
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          let value = this.fertilizerMass / (this.fertilizerVolume / 1000) / this.tankVolume * this.calcProcent[ion]
          Vue.set(this.solute, ion, value)
        }
      }
    },
    inputMass () {
      this.fertilizerMass = event.target.value
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
    inputIon (curIon) {
      let value
      for (let ion in this.solute) {
        if (ion === curIon) {
          value = parseFloat(event.target.value)
        } else {
          value = event.target.value / (this.calcProcent[curIon] / this.calcProcent[ion])
        }
        Vue.set(this.solute, ion, value)
      }
      let fertilizerMass = this.solute[curIon] * this.tankVolume / this.calcProcent[curIon] * this.fertilizerVolume / 1000
      this.fertilizerMass = fertilizerMass.toFixed(2)
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
          reagent: this.reagentSelected,
          mass: this.fertilizerMass,
          volume: this.fertilizerVolume,
          concentration: Object.assign({}, this.concentration)
        })
        this.resetComponent()
      }
    },
    editRecipe () {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_EDIT({
          index: this.curRecipeIndex,
          recipe: {
            name: this.recipeName,
            note: this.recipeNote,
            reagent: this.reagentSelected,
            mass: this.fertilizerMass,
            volume: this.fertilizerVolume,
            concentration: Object.assign({}, this.concentration)
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
