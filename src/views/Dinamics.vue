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
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <h1 class="display-1 mb-10">Страница в разработке!</h1>
        <v-combobox
          :items="tanks"
          v-model.number="tankVolume"
          item-text="name"
          item-value="volume"
          label="Объем аквариума"
          hide-selected
          hide-details="auto"
          hint="Выберите аквариум или введите объем"
          suffix="л"
          :return-object="false"
        ></v-combobox>
        <v-text-field
          v-model.number="waterChange"
          label="Объем подмены"
          hide-details="auto"
          suffix="л"
          :return-object="false"
        ></v-text-field>
        <div class="my-10">
          <v-select
            :items="recipes"
            v-model="recipesSelected"
            label="Выберите рецепты"
            item-text="name"
            multiple
            :return-object="true"
            hide-details="auto"
          ></v-select>
          <v-text-field
            v-for="(recipeSelected, index) in recipesSelected"
            :value="recipeSelected.amountDay"
            @input="inputRecipeAmountDay(index)"
            :label="recipeSelected.name"
            hint="Введите дневную дозу"
            suffix="мл/день"
            hide-details="auto"
            :key="index"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" sm="6" v-for="(dinamics, ion) in ionDinamics" :key="ion">
            <v-card>
              <v-sheet
                color="cyan"
                elevation="12"
              >
                <div class="display-1" style="position: absolute; top: 5%; left: 3%;">
                  {{ convertIonName(ion) }}
                </div>
                <v-sparkline
                  :labels="dinamics.map(item => item.toFixed(1))"
                  :value="dinamics"
                  color="white"
                  line-width="2"
                  padding="16"
                ></v-sparkline>
              </v-sheet>
              <v-card-text class="pt-0">
                <v-text-field
                  :value="totalElements[ion] !== undefined ? (convertIonRatio(ion) * totalElements[ion]).toFixed(3) : 0"
                  label="Поступает"
                  :suffix="paramsUnits[ion]"
                  hide-details="auto"
                  readonly
                >
                </v-text-field>
                <v-text-field
                  v-model.number="params[ion]"
                  label="В аквариуме сейчас"
                  :suffix="paramsUnits[ion]"
                  hide-details="auto"
                >
                </v-text-field>
                <v-text-field
                  v-model.number="paramsReduction[ion]"
                  label="Потребление в день"
                  :suffix="paramsUnits[ion]"
                  hide-details="auto"
                >
                </v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { COMPONENTS, FORMULAS } from '../constants.js'
import { mapState } from 'vuex'
import { convertIonName, convertIonRatio } from '../funcs.js'

const GRADIENTS = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export default {
  name: 'dinamics',
  data () {
    return {
      FORMULAS,
      COMPONENTS,
      GRADIENTS,
      tankVolume: null,
      tank: null,
      waterChange: null,
      ionsInit: {
        NO3: null,
        PO4: null,
        K: null
      },
      ionsReduction: {
        NO3: null,
        PO4: null,
        K: null
      },
      paramsUnits: {
        NO3: 'мг/л',
        PO4: 'мг/л',
        K: 'мг/л'
      },
      recipesSelected: [],
      sparkline: {
        width: 2,
        radius: 10,
        padding: 8,
        lineCap: 'round',
        gradient: GRADIENTS[5],
        gradientDirection: 'top',
        fill: false,
        type: 'trend',
        autoLineWidth: false
      }
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'drawer'
    ]),
    waterChangePercent () {
      return this.tankVolume / this.waterChange
    },
    totalElements () {
      let result = {}
      for (let recipe of this.recipesSelected) {
        for (let reagent in recipe.concentration) {
          for (let ion in recipe.concentration[reagent]) {
            if (!(ion in result)) {
              result[ion] = 0
            }
            if (recipe.amount) {
              result[ion] += recipe.concentration[reagent][ion] / this.tankVolume * recipe.amount
            }
          }
        }
      }
      return result
    },
    totalElementsSorted () {
      const sortableResult = []
      for (const ion in this.totalElements) {
        sortableResult.push([this.convertIonName(ion), this.convertIonRatio(ion) * this.totalElements[ion]])
      }
      sortableResult.sort((a, b) => b[1] - a[1])
      return sortableResult
    },
    ionDinamics () {
      const dinamics = {}
      for (let ion in this.totalElements) {
        dinamics[ion] = this.countDinamics(ion)
      }
      return dinamics
    }
  },
  methods: {
    inputRecipeAmountDay (index) {
      let recipe = this.recipesSelected[index]
      let amount = parseFloat(event.target.value)
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !isNaN(amount) ? amount : '',
      })
    },
    convertIonName (ion) {
      return convertIonName(ion)
    },
    convertIonRatio (ion) {
      return convertIonRatio(ion)
    },
    countDinamics (ion) {
      const duration = 28
      const amount = this.convertIonRatio(ion) * this.totalElements[ion]
      let sum = this.ionsInit[ion]
      let dinamics = []
      if (amount) {
        for (const day in [...Array(duration)]) {
          if (day % 7 === 0) {
            sum = sum - sum * this.waterChange / this.tankVolume
          }
          sum += amount
          sum -= this.ionsReduction[ion]
          if (sum < 0) {
            sum = 0
          }
          dinamics.push(sum)
        }
      } else {
        dinamics = Array(duration).fill(0)
      }
      return dinamics
    }
  }
}
</script>

<style lang="sass">
.v-sheet--offset
  top: -24px
  position: relative
</style>
