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
          У вас еще нет рецептов
        </p>
        <p>
          Необходимо
          <router-link
            v-if="recipes.length === 0"
            :to="{ name: 'recipes', params: { open: true }}"
          >
            добавить рецепт
          </router-link>
          и после этого можно будет посмотреть динамику ионов.
        </p>
      </v-col>
      <v-col
        v-if="recipes.length > 0"
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-combobox
          :items="tanks"
          v-model.number="tankVolume"
          item-text="name"
          item-value="volume"
          label="Объем аквариума"
          hide-selected
          hide-details="auto"
          hint="Выберите аквариум или введите объем"
          persistent-hint
          suffix="л"
          :return-object="false"
          class="mb-5"
        />
      </v-col>
      <v-expand-transition>
        <v-col
          v-if="tankVolume"
          cols="12"
          sm="8"
          offset-sm="2"
          class="py-0"
        >
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="py-0"
            >
              <v-text-field
                v-model.number="waterChange"
                type="number"
                :label="'Объем подмены: ' + waterChangeVolume.toFixed(1) + ' л'"
                hide-details
                suffix="%"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="py-0"
            >
              <v-text-field
                v-model.number="waterChangePeriod"
                type="number"
                label="Частота подмены воды"
                hide-details
              />
            </v-col>
          </v-row>
        </v-col>
      </v-expand-transition>
      <v-expand-transition>
        <v-col
          v-if="tankVolume"
          cols="12"
          sm="8"
          offset-sm="2"
        >
          <v-select
            :items="recipes"
            v-model="recipesSelected"
            label="Выберите рецепты"
            item-text="name"
            multiple
            :return-object="true"
            hide-details="auto"
          />
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="py-0"
              v-for="(recipeSelected, index) in recipesSelected"
              :key="index"
            >
              <v-text-field
                :value="recipeSelected.amountDay"
                @input="inputRecipeAmountDay(index)"
                type="number"
                :label="recipeSelected.name"
                hint="Введите дневную дозу"
                suffix="мл/день"
                hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-expand-transition>
      <v-expand-transition>
        <v-col
          v-if="Object.keys(totalElements).length > 0"
          cols="12"
          sm="8"
          offset-sm="2"
        >
          <v-simple-table
            dense
            style="background-color: #fafafa;"
          >
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
                <tr
                  v-for="[name, value] in totalElementsSorted"
                  :key="name"
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
        </v-col>
      </v-expand-transition>
      <v-expand-transition>
        <v-col
          v-if="recipesSelected.length > 0"
          cols="12"
          sm="8"
          offset-sm="2"
        >
          <line-chart
            :chart-data="ionDinamics"
            :styles="{height: '300px', position: 'relative'}"
          />
          <v-slider
            v-model="duration"
            min="2"
            max="90"
            thumb-label
            thumb-color="primary"
            hide-details="auto"
            class="px-5"
          />
        </v-col>
      </v-expand-transition>
      <v-col
        v-if="Object.keys(ionDinamics.datasets).length > 0"
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-tabs
          v-model="tabs"
          background-color="#fafafa"
          class="mb-4"
        >
          <v-tab
            v-for="({label: ion}) in ionDinamics.datasets"
            :key="ion"
          >
            {{ ion }}
          </v-tab>
        </v-tabs>
        <v-tabs-items
          v-model="tabs"
          style="background-color: #fafafa;"
        >
          <v-tab-item
            v-for="({label: ion}) in ionDinamics.datasets"
            :key="ion"
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                class="py-0"
              >
                <v-text-field
                  :value="
                    totalElements[convertIonName(ion)] !== undefined
                      ? (convertIonRatio(convertIonName(ion)) * totalElements[convertIonName(ion)]).toFixed(3)
                      : 0
                  "
                  label="Поступает из удобрений"
                  suffix="мг/л"
                  hide-details="auto"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="py-0"
              >
                <v-text-field
                  :value="ionsWaterConcentration[convertIonName(ion)]"
                  @input="inputIonsWaterConcentration(ion, $event)"
                  type="number"
                  label="Концентрация в подменной воде"
                  suffix="мг/л"
                  hide-details="auto"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="py-0"
              >
                <v-text-field
                  :value="ionsInit[convertIonName(ion)]"
                  @input="inputIonsInit(ion, $event)"
                  type="number"
                  label="В аквариуме сейчас"
                  suffix="мг/л"
                  hide-details="auto"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="py-0"
              >
                <v-text-field
                  :value="ionsReduction[convertIonName(ion)]"
                  @input="inputIonsReduction(ion, $event)"
                  type="number"
                  label="Потребление в день"
                  suffix="мг/л"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import ELEMENTS from '@/constants/elements';
import FORMULAS from '@/constants/formulas';
import { mapState } from 'vuex';
import { convertIonName, convertIonRatio } from '@/helpers/funcs';
import LineChart from './Chart.vue';

export default {
  name: 'Dynamics',
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
      FORMULAS,
      COMPONENTS: ELEMENTS,
      tankVolume: null,
      tank: null,
      waterChange: 30,
      waterChangePeriod: 7,
      tabs: 0,
      ionsInit: {},
      ionsReduction: {},
      ionsWaterConcentration: {},
      ionsColors: {
        NO3: '#D81B60',
        PO4: '#1E88E5',
        K: '#78909C',
      },
      duration: 28,
      recipesSelected: [],
    };
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'drawer',
    ]),
    waterChangeVolume() {
      return (this.tankVolume * this.waterChange) / 100;
    },
    totalElements() {
      const result = {};
      this.recipesSelected.forEach((recipe) => {
        Object.keys(recipe.concentration).forEach((reagent) => {
          Object.keys(recipe.concentration[reagent]).forEach((ion) => {
            if (!(ion in result)) {
              result[ion] = 0;
            }
            if (recipe.amount) {
              result[ion] += (recipe.concentration[reagent][ion] / this.tankVolume) * recipe.amount;
              if ((!recipe.volume) && recipe.type === 'Самомес') {
                result[ion] *= 1000;
              }
            }
          });
        });
      });
      return result;
    },
    totalElementsSorted() {
      const sortableResult = [];
      Object.keys(this.totalElements).forEach((ion) => {
        sortableResult.push([this.convertIonName(ion), this.convertIonRatio(ion) * this.totalElements[ion]]);
      });
      sortableResult.sort((a, b) => b[1] - a[1]);
      return sortableResult;
    },
    ionDinamics() {
      const dynamics = {
        labels: Object.keys([...Array(this.duration)]),
        datasets: [],
      };
      Object.keys(this.totalElements).forEach((ion) => {
        dynamics.datasets.push({
          label: this.convertIonName(ion),
          fill: false,
          borderColor: this.ionsColors[this.convertIonName(ion)],
          data: this.countDinamics(ion),
        });
      });
      return dynamics;
    },
  },
  methods: {
    inputRecipeAmountDay(event, index) {
      const recipe = this.recipesSelected[index];
      const amount = parseFloat(event.target.value);
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !Number.isNaN(amount) ? amount : '',
      });
    },
    inputIonsWaterConcentration(ion, value) {
      Vue.set(this.ionsWaterConcentration, ion, parseFloat(value));
    },
    inputIonsInit(ion, value) {
      Vue.set(this.ionsInit, ion, parseFloat(value));
    },
    inputIonsReduction(ion, value) {
      Vue.set(this.ionsReduction, ion, parseFloat(value));
    },
    convertIonName(ion) {
      return convertIonName(ion);
    },
    convertIonRatio(ion) {
      return convertIonRatio(ion);
    },
    countDinamics(ion) {
      const amount = this.convertIonRatio(ion) * this.totalElements[ion];
      let sum = this.ionsInit[this.convertIonName(ion)] || 0;
      let dynamics = [];
      if (amount) {
        [...Array(this.duration)].forEach((day) => {
          if (day > 0 && day % this.waterChangePeriod === 0) {
            const ionWaterConcentration = this.ionsWaterConcentration[this.convertIonName(ion)] || 0;
            sum = sum - sum * (this.waterChange / 100) + ionWaterConcentration * (this.waterChange / 100);
          }
          sum += amount;
          sum -= this.ionsReduction[this.convertIonName(ion)] || 0;
          if (sum < 0) {
            sum = 0;
          }
          dynamics.push(sum);
        });
      } else {
        dynamics = Array(this.duration).fill(0);
      }
      return dynamics;
    },
  },
};
</script>

<style lang="sass">
</style>
