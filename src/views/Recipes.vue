<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          Рецепты
        </h2>
      </v-col>
    </v-row>

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
            <div class="d-flex justify-content-between">
              <span>Масса реагента</span><span>{{ parseFloat(recipe.mass).toFixed(2) }} г</span>
            </div>
            <div class="d-flex justify-content-between">
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
          <v-toolbar-title v-if="isEditing">Новый рецепт</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              v-if="isEditing"
              text
              dark
              @click="removeRecipe"
            >Удалить</v-btn>
            <v-btn
              v-if="isEditing"
              dark
              text
              @click="editRecipe"
            >Сохранить</v-btn>
            <v-btn
              v-if="!isEditing"
              dark
              text
              @click="addRecipe"
            >
              Создать
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form ref="recipeForm">
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
              </v-row>
              <v-expand-transition>
                <v-row v-if="reagentSelected">
                  <v-col cols="12">
                    <v-text-field
                      :value="fertilizerVolume"
                      @input="inputVolume"
                      label="Введите объем удобрения, мл"
                      hint="Выбирайте объем, который вы сможете использовать в течении 2-3x месяцев"
                      hide-details="auto"
                      :rules="rulesVolume"
                    >
                      <!--
                        <template v-slot:prepend>
                          <v-tooltip bottom >
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                            </template>
                            text
                          </v-tooltip>
                        </template>
                      -->
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-expand-transition>
              <v-expand-transition>
                <v-row v-if="reagentSelected && fertilizerVolume">
                  <v-col cols="12">
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
                  <v-col cols="12">
                    <v-text-field
                      :value="fertilizerMass"
                      @input="inputMass"
                      label="Введите массу реагента, г"
                      hint="Чем больше масса реагента на выбранный объем, тем больше концентрация"
                      hide-details="auto"
                      :rules="rulesMass"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-expand-transition>
              <v-expand-transition>
                <div v-if="fertilizerMass && fertilizerVolume">
                  Концентрация элементов в удобрении:
                  <template v-for="(data, ion) in FORMULAS[reagentSelected].ions">
                    <span v-if="data.isNeeded" :key="ion" class="ml-2">
                      {{ ion + ' - ' + concentration[ion].toFixed(2) + ' г/л' }}
                    </span>
                  </template>
                </div>
              </v-expand-transition>
              <v-row v-if="reagentSelected && fertilizerVolume">
                <v-col cols="12">
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
                <v-col cols="12">
                  <v-combobox
                    :items="tanks"
                    v-model="tankVolume"
                    item-text="name"
                    item-value="volume"
                    label="Объем аквариума"
                    persistent-hint
                    hide-selected
                    hint="Выберите аквариум или введите объем, л"
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
                            :label="ion + ', мг/л'"
                            persistent-hint
                            hide-details="auto"
                          ></v-text-field>
                        </v-col>
                      </template>
                    </v-row>
                  </v-col>
                </v-expand-transition>
              </v-row>
              <v-expand-transition>
                <v-row v-if="fertilizerMass && fertilizerVolume">
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
                </v-row>
              </v-expand-transition>
            </v-form>
          </v-container>
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
          <v-icon>mdi-clipboard-plus-outline</v-icon>
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
      reagents: ['KNO3', 'KH2PO4', 'K2SO4'],
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
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          result[ion] = this.fertilizerMass * this.calcProcent[ion] / (this.fertilizerVolume / 1000)
        }
      }
      return result
    },
    recipeName: {
      get () {
        if (!this.reagentSelected) { return '' }
        let name = this.FORMULAS[this.reagentSelected].name
        if (this.recipeName_ === null) {
          if (this.fertilizerMass && this.fertilizerVolume) {
            name += ` ${parseFloat(this.fertilizerMass).toFixed(2)} г на ${this.fertilizerVolume} мл`
          }
          return name
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
