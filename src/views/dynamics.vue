<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

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
      <page-title>
        Динамика элементов
      </page-title>
      <guide>
        На данной странице можно найти равновесные концентрации элементов в зависимости от объема и частоты подмены,
        а так же дозировок вносимых удобрений.
        <br>
        <br>
        Страница находится на доработке!
      </guide>
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
                label="Количество дней между подменами"
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
          class="mt-4"
        >
          <v-select
            :items="items"
            v-model="recipesSelected"
            label="Выберите рецепты"
            item-text="name"
            multiple
            :return-object="true"
            hide-details="auto"
          />
          <fertilizers-dose-table
            :recipes-selected="recipesSelected"
            :days="waterChangePeriod"
            @input="inputDose"
          />
        </v-col>
      </v-expand-transition>
      <v-expand-transition>
        <v-col
          v-if="Object.keys(totalElements).length > 0"
          cols="12"
          sm="8"
          offset-sm="2"
        >
          <elements-table
            :recipes-selected="recipesSelected"
            :days-total="waterChangePeriod"
            :volume="tankVolume"
          />
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
            :chart-data="ionDynamics"
            class="line-chart"
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
        v-if="Object.keys(ionDynamics.datasets).length > 0"
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-tabs
          v-model="tabs"
          class="mb-4"
        >
          <v-tab
            v-for="({label: ion}) in ionDynamics.datasets"
            :key="ion"
          >
            {{ ion }}
          </v-tab>
        </v-tabs>
        <v-tabs-items
          v-model="tabs"
        >
          <v-tab-item
            v-for="({label: ion}) in ionDynamics.datasets"
            :key="ion"
            class="py-2"
          >
            <v-container>
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
            </v-container>
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
import { convertIonName, convertIonRatio, isRecipe } from '@/helpers/funcs';
import ElementsTable from '@/components/ElementsTable.vue';
import FertilizersDoseTable from '@/components/FertilizersDoseTable.vue';
import LineChart from '../components/Chart.vue';

export default {
  name: 'Dynamics',
  components: {
    LineChart,
    ElementsTable,
    FertilizersDoseTable,
  },
  data() {
    return {
      FORMULAS,
      ELEMENTS,
      tank: null,
      tankVolume: null,
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
      'tanks',
      'recipes',
      'fertilizers',
    ]),
    items() {
      return [...this.recipes, ...this.fertilizers];
    },
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
            if (recipe.amountDay) {
              result[ion] += (recipe.concentration[reagent][ion] / this.tankVolume) * recipe.amountDay;
              if ((!recipe.volume) && isRecipe(recipe)) {
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
    ionDynamics() {
      const dynamics = {
        labels: Object.keys([...Array(this.duration)]),
        datasets: [],
      };
      Object.keys(this.totalElements).forEach((ion) => {
        dynamics.datasets.push({
          label: this.convertIonName(ion),
          fill: false,
          borderColor: this.ionsColors[this.convertIonName(ion)],
          data: this.countDynamics(ion),
        });
      });
      return dynamics;
    },
  },
  watch: {
    recipesSelected() {
      this.recipesSelected.forEach((recipe) => {
        if (!recipe.amount) {
          recipe.amount = '';
        }
        if (!recipe.amountDay) {
          recipe.amountDay = '';
        }
      });
    },
  },
  methods: {
    inputDose(index, value) {
      Vue.set(this.recipesSelected, index, value);
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
    countDynamics(ion) {
      const amount = this.convertIonRatio(ion) * this.totalElements[ion];
      let sum = this.ionsInit[this.convertIonName(ion)] || 0;
      let dynamics = [];
      if (amount) {
        Object.keys([...Array(this.duration)]).forEach((day) => {
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
.line-chart
  height: 300px
  position: relative
</style>
