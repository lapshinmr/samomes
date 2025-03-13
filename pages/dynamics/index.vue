<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
      <v-col
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
              cols="6"
              sm="4"
              class="py-0"
            >
              <number-field
                :value="waterChangeVolume"
                @input="onInputWaterChangeVolume"
                label="Объем подмены"
                hide-details
                suffix="л"
              />
            </v-col>
            <v-col
              cols="6"
              sm="4"
              class="py-0"
            >
              <number-field
                :value="waterChange"
                @input="onInputWaterChange"
                label="Процент подмены"
                hide-details
                suffix="%"
              />
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="py-0"
            >
              <number-field
                v-model.number="waterChangePeriod"
                type="number"
                inputmode="numeric"
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
            v-if="recipesSelected.length > 0"
            :fertilization-type="fertilizationType"
            :recipes-selected="recipesSelected"
            :days="waterChangePeriod"
            :water-change-volume="waterChangeVolume"
            :is-water-change="false"
            @input="inputDose"
            @change="fertilizationType = $event"
            class="mt-4"
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
            :fertilization-type="fertilizationType"
            :recipes-selected="recipesSelected"
            :days-total="waterChangePeriod"
            :volume="tankVolume"
            :water-change-volume="waterChangeVolume"
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
                      totalElements[convertIonName(ion)].amountDay !== undefined
                        ? (
                          convertIonRatio(convertIonName(ion)) * totalElements[convertIonName(ion)].amountDay
                        ).toFixed(3)
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
                  <number-field
                    :value="ionsWaterConcentration[convertIonName(ion)]"
                    @input="inputIonsWaterConcentration(ion, $event)"
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
                  <number-field
                    :value="ionsInit[convertIonName(ion)]"
                    @input="inputIonsInit(ion, $event)"
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
                  <number-field
                    :value="ionsReduction[convertIonName(ion)]"
                    @input="inputIonsReduction(ion, $event)"
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
      <the-guide>
        Динамика — это анализ процессов изменения и достижения равновесной концентрации питательных
        элементов в вашем аквариуме. Основываясь на вашем режиме подмен воды и графике внесения удобрений,
        система рассчитывает временные зависимости концентраций всех важных элементов.
        <br>
        <br>
        Такой расчет позволяет видеть более детальную картину состояния аквариума. А для таких
        элементов как калий, можно рассчитать довольно точную равновесную концентрацию и сэкономить
        время и деньги на тестах.
      </the-guide>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import ELEMENTS from '@/helpers/constants/elements';
import FORMULAS from '@/helpers/constants/formulas';
import { mapState } from 'vuex';
import { convertIonName, convertIonRatio, isRecipe } from '@/helpers/funcs/funcs';
import ElementsTable from '@/components/ElementsTable.vue';
import FertilizersDoseTable, {
  FERTILIZATION_EVERY_DAY,
  FERTILIZATION_IN_TAP_WATER,
  FERTILIZATION_MIX,
} from '@/components/FertilizersDoseTable.vue';
import LineChart from '@/components/Chart.vue';

export default {
  name: 'Dynamics',
  components: {
    LineChart,
    ElementsTable,
    FertilizersDoseTable,
  },
  head() {
    return {
      title: 'Динамика элементов в аквариуме: расчет равновесных концентраций',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Анализ процессов изменения и достижения равновесной концентрации питательных элементов '
            + 'в аквариуме. Рассчитайте временные зависимости концентраций всех важных элементов '
            + 'на основе режима подмен воды и графика внесения удобрений.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'калий, нитрат, фосфат, концентрация, равновесие, динамика элементов, аквариум, удобрения, '
            + 'подмена воды',
        },
      ],
    };
  },
  data() {
    return {
      FORMULAS,
      ELEMENTS,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_MIX,
      fertilizationType: FERTILIZATION_EVERY_DAY,
      tank: null,
      tankVolume: null,
      waterChange: null,
      waterChangeVolume: null,
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
    totalElements() {
      const result = {};
      this.recipesSelected.forEach((recipe) => {
        Object.values(recipe.concentration).forEach((value) => {
          Object.keys(value).forEach((ion) => {
            if (!(ion in result)) {
              result[ion] = {
                amount: 0,
                amountDay: 0,
              };
            }
            if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
              const amountDay = (recipe.amountDay * value[ion]) / this.tankVolume;
              result[ion].amount += amountDay * this.waterChangePeriod;
              result[ion].amountDay += amountDay;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion].amount *= 1000;
                result[ion].amountDay *= 1000;
              }
            } else if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
              const amount = (recipe.amount * value[ion]) / this.tankVolume;
              result[ion].amount += amount;
              result[ion].amountDay += amount / this.waterChangePeriod;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion].amount *= 1000;
                result[ion].amountDay *= 1000;
              }
            } else if (this.fertilizationType === FERTILIZATION_MIX) {
              const amount = (recipe.amount * value[ion]) / this.tankVolume;
              const amountDay = (recipe.amountDay * value[ion]) / this.tankVolume;
              result[ion].amount += amount;
              result[ion].amountDay += amountDay;
              if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion].amount *= 1000;
                result[ion].amountDay *= 1000;
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
    isRecipe,
    convertIonName,
    convertIonRatio,
    onInputWaterChange(value) {
      if (value < 0) {
        return;
      }
      if (value <= 100) {
        this.waterChange = +value;
        this.waterChangeVolume = (this.tankVolume * value) / 100;
      }
    },
    onInputWaterChangeVolume(value) {
      if (value < 0) {
        return;
      }
      if (value <= this.tankVolume) {
        this.waterChangeVolume = +value;
        this.waterChange = (value / this.tankVolume) * 100;
      }
    },
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
    countDynamics(ion) {
      let sum = this.ionsInit[this.convertIonName(ion)] || 0;
      let dynamics = [];
      if (this.totalElements[ion].amount || this.totalElements[ion].amountDay) {
        Object.keys([...Array(this.duration)]).forEach((day) => {
          if (day > 0 && day % this.waterChangePeriod === 0) {
            const ionWaterConcentration = this.ionsWaterConcentration[this.convertIonName(ion)] || 0;
            sum = sum - sum * (this.waterChange / 100) + ionWaterConcentration * (this.waterChange / 100);
          }
          if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
            const amountDay = this.convertIonRatio(ion) * this.totalElements[ion].amountDay;
            sum += amountDay;
            sum -= this.ionsReduction[this.convertIonName(ion)] || 0;
            if (sum < 0) {
              sum = 0;
            }
          } else if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
            const amount = this.convertIonRatio(ion) * this.totalElements[ion].amount;
            if (day % this.waterChangePeriod === 0) {
              sum += amount;
            }
            sum -= this.ionsReduction[this.convertIonName(ion)] || 0;
            if (sum < 0) {
              sum = 0;
            }
          } else if (this.fertilizationType === FERTILIZATION_MIX) {
            const amount = this.convertIonRatio(ion) * this.totalElements[ion].amount;
            const amountDay = this.convertIonRatio(ion) * this.totalElements[ion].amountDay;
            if (day % this.waterChangePeriod === 0) {
              sum += amount;
            }
            sum += amountDay;
            sum -= this.ionsReduction[this.convertIonName(ion)] || 0;
            if (sum < 0) {
              sum = 0;
            }
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
