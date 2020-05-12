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
        <v-expand-transition>
          <div v-if="tankVolume">
            <v-subheader class="pl-0">
              Объем подмены: {{ (tankVolume * waterChange / 100).toFixed(1) + ' л' }}
            </v-subheader>
            <v-slider
              v-model="waterChange"
              thumb-label="always"
            ></v-slider>
            <v-select
              :items="recipes"
              v-model="recipesSelected"
              label="Выберите рецепты"
              item-text="name"
              multiple
              :return-object="true"
              hide-details="auto"
            ></v-select>
          </div>
        </v-expand-transition>
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
        <v-card v-if="Object.keys(totalElements).length > 0" class="mt-5">
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="pl-0 text-center">
                      Элемент
                    </th>
                    <th class="text-center">
                      В неделю, <span>мг/л</span>
                    </th>
                    <th class="text-center pr-0">
                      В день, <span>мг/л</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="[name, value] in totalElementsSorted" :key="name"
                    :class="{'caption': $vuetify.breakpoint['xs'], 'regular': $vuetify.breakpoint['smAndUp']}"
                  >
                    <td class="pl-0 text-center">
                      {{ name }}
                    </td>
                    <td class="text-center">
                      +{{ value !== undefined ? (value * 7).toFixed(3) : 0 }}
                    </td>
                    <td class="text-center pr-0">
                      +{{ value !== undefined ? (value).toFixed(3) : 0 }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" offset-sm="2" v-for="(dinamics, ion) in ionDinamics" :key="ion">
        <v-card>
          <v-sheet :color="ionsColors[convertIonName(ion)]">
            <v-sheet color="white">
              <div class="display-1" style="position: absolute; top: 5%; left: 3%;">
                {{ convertIonName(ion) }}
              </div>
            </v-sheet>
            <v-sparkline
              :labels="dinamics.map((item, index) => (index % (parseInt(ionsPeriod[convertIonName(ion)] / 10) || 1)) === 0 ? item.toFixed(1) : ' ')"
              :value="dinamics"
              color="white"
              line-width="2"
              padding="8"
              smooth="3"
              auto-draw
            ></v-sparkline>
            <v-slider
              v-model="ionsPeriod[convertIonName(ion)]"
              min="2"
              max="90"
              color="white"
              thumb-label
              thumb-color="primary"
              light
              hide-details="auto"
              class="px-5"
            ></v-slider>
          </v-sheet>
          <v-card-text class="pt-0">
            <v-text-field
              :value="totalElements[ion] !== undefined ? (convertIonRatio(ion) * totalElements[ion]).toFixed(3) : 0"
              label="Поступает"
              :suffix="ionsUnits[ion]"
              hide-details="auto"
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model.number="ionsInit[convertIonName(ion)]"
              label="В аквариуме сейчас"
              :suffix="ionsUnits[convertIonName(ion)]"
              hide-details="auto"
            >
            </v-text-field>
            <v-text-field
              v-model.number="ionsReduction[convertIonName(ion)]"
              label="Потребление в день"
              :suffix="ionsUnits[ion]"
              hide-details="auto"
            >
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { COMPONENTS, FORMULAS } from '../constants.js'
import { mapState } from 'vuex'
import { convertIonName, convertIonRatio } from '../funcs.js'

export default {
  name: 'dinamics',
  data () {
    return {
      FORMULAS,
      COMPONENTS,
      tankVolume: null,
      tank: null,
      waterChange: 30,
      ionsInit: {
        NO3: null,
        PO4: null,
        K: null
      },
      ionsReduction: {
        NO3: 0,
        PO4: 0,
        K: 0
      },
      ionsUnits: {
        NO3: 'мг/л',
        PO4: 'мг/л',
        K: 'мг/л'
      },
      ionsColors: {
        NO3: 'pink lighten-1',
        PO4: 'blue lighten-2',
        K: 'blue-grey lighten-1'
      },
      ionsPeriod: {
        NO3: 28,
        PO4: 28,
        K: 28
      },
      recipesSelected: []
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
      var sortableResult = []
      for (var ion in this.totalElements) {
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
      const duration = this.ionsPeriod[this.convertIonName(ion)]
      const amount = this.convertIonRatio(ion) * this.totalElements[ion]
      let sum = this.ionsInit[this.convertIonName(ion)]
      let dinamics = []
      if (amount) {
        for (const day in [...Array(duration)]) {
          if (day > 0 && day % 7 === 0) {
            sum = sum - sum * this.waterChange / this.tankVolume
          }
          sum += amount
          sum -= this.ionsReduction[this.convertIonName(ion)]
          if (sum < 0) {
            sum = 0
          }
          dinamics.push(sum)
          console.log(sum)
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
