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
  <v-container class="mb-10">
    <v-row>
      <v-col v-if="recipes.length === 0" cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          У вас еще нет рецептов
        </p>
        <p>
          Необходимо
          <router-link v-if="recipes.length === 0" :to="{ name: 'recipes', params: { open: true }}">добавить рецепт</router-link>
          и после этого можно будет реминерализовать воду.
        </p>
      </v-col>
      <v-col v-if="recipes.length > 0" cols="12" sm="8" offset-sm="2">
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
              thumb-label
            ></v-slider>
            <v-text-field
              v-model.number="ghInit"
              label="Gh в аквариуме"
              suffix="dGh"
              hide-details="auto"
            >
            </v-text-field>
            <v-text-field
              v-model.number="ghWaterChange"
              label="Gh в подменной воде"
              suffix="dGh"
              hide-details="auto"
            >
            </v-text-field>
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <v-select
            v-if="ghInit !== null"
            :items="recipes"
            v-model="recipesSelected"
            label="Выберите рецепты"
            item-text="name"
            multiple
            :return-object="true"
            hide-details="auto"
          ></v-select>
        </v-expand-transition>
        <v-text-field
          v-for="(recipeSelected, index) in recipesSelected"
          :value="recipeSelected.amountDay"
          @input="inputRecipeAmountDay(index)"
          :label="recipeSelected.name"
          hint="Введите дневную дозу"
          :suffix="recipeSelected.isWater === undefined || recipeSelected.isWater ? 'мл/день' : 'г'"
          hide-details="auto"
          :key="index"
        ></v-text-field>
        <div v-if="Object.keys(totalElements).length > 0" class="mt-5">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="pl-0 text-center">
                    Элемент
                  </th>
                  <th class="text-center">
                    dGh
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
                    <template v-if="name in HARDNESS">
                      +{{ (value / HARDNESS[name]).toFixed(2) }}
                    </template>
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { COMPONENTS, FORMULAS, HARDNESS } from '../constants.js'
import { mapState } from 'vuex'
import { convertIonName, convertIonRatio, countPercent } from '../funcs.js'

export default {
  name: 'remineralization',
  data () {
    return {
      FORMULAS,
      COMPONENTS,
      HARDNESS,
      tankVolume: null,
      tank: null,
      waterChange: 30,
      ghInit: null,
      ghWaterChange: 0,
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
        if (recipe.isWater === undefined || recipe.isWater) {
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
        } else if (recipe.isWater === false) {
          for (let [ion, mass] of Object.entries(this.countTotalIonMass(recipe.mass))) {
            if (!(ion in result)) {
              result[ion] = 0
            }
            if (recipe.amount) {
              result[ion] += recipe.amount / this.tankVolume
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
    }
  },
  methods: {
    convertIonName (ion) {
      return convertIonName(ion)
    },
    convertIonRatio (ion) {
      return convertIonRatio(ion)
    },
    countPercent (ion) {
      return countPercent(ion)
    },
    countTotalIonMass (ion) {
      return countTotalIonMass(ion)
    },
    inputRecipeAmountDay (index) {
      let recipe = this.recipesSelected[index]
      let amount = parseFloat(event.target.value)
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !isNaN(amount) ? amount : ''
      })
    }
  }
}
</script>

<style lang="sass">
</style>
