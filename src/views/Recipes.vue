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
            {{ recipe.reagent }}
          </v-card-subtitle>
          <v-card-text>
            <div class="d-flex justify-content-between">
              <span>Название аквариума</span><span>{{ recipe.tank.name }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Объем аквариума</span><span>{{ recipe.tank.volume }} л</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Масса реагента</span><span>{{ recipe.mass.toFixed(1) }} г</span>
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
            <div class="d-flex justify-content-between">
              <span>Доза</span>
              <span class="d-flex flex-column align-items-end">
                <span v-for="(value, key) in recipe.solute" class="" :key="key">
                  {{ key }}: {{ value.toFixed(2) }} мг/мл
                </span>
              </span>
            </div>
          </v-card-text>
          <v-card-actions>
            <button type="button" class="close" @click.stop="removeRecipe(index)">
              <span aria-hidden="true">&times;</span>
            </button>
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
          <v-toolbar-title>Рецепт</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveRecipe">Создать</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form ref="recipeForm">
              <v-row class="mx-2">
                <v-col cols="12">
                  <v-select
                    :items="reagents"
                    v-model="reagentSelected"
                    label="Реагент"
                    :hint="hintReagent"
                    persistent-hint
                    hide-selected
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="tanks"
                    v-model="tankVolume"
                    item-text="name"
                    item-value="volume"
                    label="Аквариум"
                    persistent-hint
                    hide-selected
                    hint="Выберите аквариум"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number.lazy="tankVolume"
                    label="Объем аквариума"
                    hide-details="auto"
                    hint="Или введите объем, л"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number.lazy="fertilizerMass"
                    label="Масса реагента"
                    hide-details="auto"
                    hint="Введите массу, г"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number.lazy="fertilizerVolume"
                    label="Объем удобрения"
                    hide-details="auto"
                    hint="Введите объем, мл"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" v-if="reagentSelected">
                  <p>
                    Дозы элементов
                    <br />
                    <small>
                      Повышение концентрации удобрения в аквариуме на 1 мл вводимого раствора
                    </small>
                  </p>
                  <v-row>
                    <template v-for="(data, ion) in FORMULAS[reagentSelected].ions">
                      <v-col v-if="data.isNeeded" :key="ion">
                        <v-text-field
                          :value="solute[ion].toFixed(2)"
                          @input="inputIon(ion)"
                          :label="ion + ' (' + concentration[ion].toFixed(2) + ' г/л), мг/мл'"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </template>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="recipeName"
                    label="Имя рецепта"
                    hide-details="auto"
                    hint="Введите имя рецепта"
                  ></v-text-field>
                </v-col>
              </v-row>
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
          @click="dialog = !dialog"
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
      fertilizerMass_: 0,
      fertilizerVolume_: 1,
      solute: {},
      recipeName_: '',
      dialog: false
    }
  },
  created () {
    // this.solute = this.resetSolute()
    if (this.tanks.length >= 0) {
      this.tank = this.tanks[0]
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes'
    ]),
    hintReagent () {
      if (this.reagentSelected) {
        return `${this.FORMULAS[this.reagentSelected].name} (${this.showComponents(this.calcProcent)}).
        Растворимость: ${this.FORMULAS[this.reagentSelected].solubilityLimit} г/л при 20°С.`
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
          result[ion] = this.fertilizerMass * this.calcProcent[ion] / this.fertilizerVolume_
        }
      }
      return result
    },
    recipeName: {
      get () {
        if (!this.reagentSelected) { return '' }
        let name = this.FORMULAS[this.reagentSelected].name
        return (
          this.recipeName_ ||
          `${this.tank.name} (${name} ${this.fertilizerMass_} г на ${this.fertilizerVolume} мл)`
        )
      },
      set (value) {
        this.recipeName_ = value
      }
    },
    fertilizerVolume: {
      get () {
        return this.fertilizerVolume_ * 1000
      },
      set (value) {
        this.fertilizerVolume_ = value / 1000
      }
    },
    fertilizerMass: {
      get () {
        return this.fertilizerMass_
      },
      set (value) {
        this.fertilizerMass_ = event.target.value
        let ions = FORMULAS[this.reagentSelected].ions
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            let value = this.fertilizerMass_ / this.tank.volume / this.fertilizerVolume_ * this.calcProcent[ion]
            Vue.set(this.solute, ion, value)
          }
        }
      }
    },
    watched () {
      return `${this.tank.volume}|${this.fertilizerVolume}`
    },
    isWarning () {
      return FORMULAS[this.reagentSelected].solubilityLimit < this.fertilizerMass / this.fertilizerVolume_
    }
  },
  watch: {
    //  watched () {
    //    let ions = this.FORMULAS[this.reagentSelected].ions
    //    for (let ion in ions) {
    //      if (ions[ion].isNeeded) {
    //        let value = this.fertilizerMass / this.tank.volume * this.calcProcent[ion] * this.fertilizerVolume_
    //        this.solute[ion] = value
    //        this.solute = Object.assign({}, this.solute)
    //      }
    //    }
    //  },
    reagentSelected () {
      this.solute = this.resetSolute()
      this.fertilizerMass_ = 0
      this.recipeName_ = ''
    }
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD', 'RECIPE_REMOVE'
    ]),
    resetSolute () {
      let ions = this.FORMULAS[this.reagentSelected].ions
      let solute = {}
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          solute[ion] = 0
        }
      }
      return solute
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
      this.fertilizerMass_ = this.solute[curIon] * this.tank.volume / this.calcProcent[curIon] * this.fertilizerVolume_
    },
    saveRecipe () {
      return this.RECIPE_ADD({
        name: this.recipeName,
        reagent: this.reagentSelected,
        mass: this.fertilizerMass,
        volume: this.fertilizerVolume,
        concentration: Object.assign({}, this.concentration),
        solute: Object.assign({}, this.solute)
      })
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
.reagent
  &:not(:first-child)
    margin-left: 1rem
  .reagent__input
    display: none

  .reagent__label
    cursor: pointer

    .reagent__formula
      font-size: 1.5rem

    .reagent__name
      font-size: 1rem

  .reagent__input:checked + label
    color: red

.components
  font-size: 1.2rem
  text-align: center

.recipe
  color: black
  .recipe__container
  .recipe__title
    font-size: 1rem
  .recipe__body
    font-size: 0.85rem
    div > span + span
      opacity: 0.6

</style>
