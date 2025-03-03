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
  <v-container class="mb-12">
    <v-row>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-btn
          color="primary"
          class="mr-0"
          square
          to="/schedules/"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <page-title>
        <template v-if="isCreate">
          Новое расписание
        </template>
        <template v-else>
          Расписание для {{ tank.name }}
        </template>
      </page-title>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="scheduleForm">
          <v-row>
            <v-col cols="12">
              <v-combobox
                :items="tanks"
                :value="tank.volume"
                @input="onChooseTank"
                item-text="name"
                item-value="volume"
                label="Выберите аквариум или введите объем"
                persistent-hint
                hide-selected
                hint="Объем необходим для расчета дозировок"
                :return-object="true"
                :rules="rulesTank"
              />
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="tank.volume"
                cols="12"
              >
                <div class="d-flex flex-column flex-md-row align-md-center">
                  <v-combobox
                    :items="items"
                    :value="recipesSelected"
                    @input="onRecipeSelect"
                    label="Выберите удобрения"
                    item-text="name"
                    persistent-hint
                    multiple
                    :return-object="true"
                    hint="* здесь собраны все ваши рецепты и удобрения.
                      Нажмите «Фирменные» для просмотра полного списка."
                  />
                  <v-switch
                    v-model="isDefaultFertilizers"
                    label="Фирменные"
                    class="ml-md-4"
                  />
                </div>
              </v-col>
            </v-expand-transition>
            <v-col
              v-if="recipesSelected.length > 0"
              cols="12"
            >
              <div class="subtitle-1 text-sm-h6 my-4">
                Подбор дозировок
                <v-tooltip
                  bottom
                  max-width="400"
                >
                  <template #activator="{ on }">
                    <v-icon v-on="on">
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  Подбирая объем выбранных рецептов, вы можете получить необходимую концентрацию элементов
                  в аквариуме. Таким образом вы можете подобрать ориентировочное значение, которое "съедают"
                  растения за заданный период времени.
                </v-tooltip>
              </div>
              <fertilizer-dose-table
                :fertilization-type="fertilizationType"
                :recipes-selected="recipesSelected"
                :days="daysTotal"
                :water-change-volume="tank.waterChangeVolume"
                @input="inputDose"
                @change="onChangeFertilizationType"
                @water-change="tank.waterChangeVolume = $event"
              />
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="recipesSelected.length > 0"
                cols="12"
                class="pt-0"
              >
                <elements-table
                  is-helpful-info
                  is-switchers
                  :fertilization-type="fertilizationType"
                  :recipes-selected="recipesSelected"
                  :days-total="daysTotal"
                  :volume="tank.volume"
                  :water-change-volume="tank.waterChangeVolume"
                  :tank="tank"
                />
              </v-col>
            </v-expand-transition>
            <v-col
              v-if="isAmount"
              cols="12"
              class="mt-2 pb-0"
            >
              <div class="d-flex align-center my-3">
                <v-divider />
                <v-btn
                  center
                  text
                  @click="isSchedule = !isSchedule"
                  class="px-4"
                >
                  Составить расписание
                  <v-icon>{{ isSchedule ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-divider />
              </div>
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="isSchedule && isAmount"
                cols="12"
              >
                <v-date-picker
                  :value="datesRange"
                  @input="onChangeDatesRange"
                  locale="ru"
                  no-title
                  first-day-of-week="1"
                  full-width
                  range
                >
                  <template #default>
                    <v-text-field
                      :value="daysTotal"
                      label="Длительность периода"
                      :suffix="[2, 3, 4].includes(daysTotal) ? 'дня' : 'дней'"
                      :rules="rulesDays"
                      hide-details="auto"
                      readonly
                    />
                  </template>
                </v-date-picker>
              </v-col>
            </v-expand-transition>
            <v-expand-transition>
              <v-col
                v-if="isSchedule && recipesSelected.length > 0 && isAmount && daysTotal"
                cols="12"
              >
                <schedule-doze-table
                  v-model="selected"
                  :key="Object.keys(selected).length"
                  :fertilization-type="fertilizationType"
                  :dates-column="datesColumn"
                  :days-total="daysTotal"
                  :recipes-selected="recipesSelected"
                />
              </v-col>
            </v-expand-transition>
            <v-expand-transition>
              <v-col
                v-if="isSchedule && recipesSelected.length > 0 && isAmount && daysTotal"
                class="text-right"
                cols="12"
              >
                <v-btn
                  v-if="isCreate"
                  @click="addSchedule"
                  color="primary"
                >
                  Сохранить
                </v-btn>
                <v-btn
                  v-if="!isCreate"
                  color="primary"
                  @click="removeSchedule"
                >
                  Удалить
                </v-btn>
                <v-btn
                  v-if="!isCreate"
                  color="primary"
                  @click="editSchedule"
                  class="ml-2"
                >
                  Сохранить
                </v-btn>
              </v-col>
            </v-expand-transition>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import FertilizerDoseTable, {
  FERTILIZATION_EVERY_DAY,
  FERTILIZATION_IN_TAP_WATER,
  FERTILIZATION_MIX,
} from '~/components/FertilizersDoseTable.vue';
import ElementsTable from '~/components/ElementsTable.vue';
import ScheduleDozeTable from '~/components/Schedules/ScheduleDozeTable.vue';
import { mapState, mapMutations } from 'vuex';
import {
  convertIonName,
  convertIonRatio,
  isRecipe,
  OXIDE_TO_ELEMENT,
  getOxideToElementRatio,
} from '~/helpers/funcs/funcs';
import { FERTILIZERS_SORTED } from '~/helpers/constants/fertilizers';

export default {
  name: 'Schedule',
  components: {
    FertilizerDoseTable,
    ElementsTable,
    ScheduleDozeTable,
  },
  data() {
    return {
      fertilizationType: FERTILIZATION_EVERY_DAY,
      tank: {
        name: null,
        volume: null,
        waterChangeVolume: null,
      },
      recipesSelected: [],
      datesRange: [],
      selected: {},
      completed: {},
      completedWaterChange: {},
      isSchedule: false,
      rulesDays: [
        (v) => v >= 2 || 'Период должен быть больше одного дня',
      ],
      rulesTank: [
        (v) => !!v || 'Выберите аквариум',
      ],
    };
  },
  created() {
    if (!this.isCreate) {
      Object.assign(this.$data, JSON.parse(JSON.stringify({ ...this.schedules[this.scheduleIndex] })));
      this.isSchedule = true;
    } else {
      const dateStart = moment().format('YYYY-MM-DD');
      const dateFinish = moment().add(6, 'days').format('YYYY-MM-DD');
      this.datesRange = [dateStart, dateFinish];
    }
  },
  computed: {
    ...mapState([
      'tanks',
      'recipes',
      'fertilizers',
      'schedules',
    ]),
    isCreate() {
      return this.$route.params.id === 'create';
    },
    scheduleIndex() {
      return this.$route.params.id;
    },
    isDefaultFertilizers: {
      get() {
        return this.$store.state.schedule.isDefaultFertilizers;
      },
      set(value) {
        this.$store.commit('SCHEDULE_SET_DEFAULT_FERTILIZERS', value);
        this.SNACKBAR_SHOW(
          value
            ? 'Фирменные удобрения добавлены в список'
            : 'Фирменные удобрения удалены из списка',
        );
      },
    },
    defaultFertilizers() {
      return FERTILIZERS_SORTED.map((fertilizer) => this.convertFertilizer(fertilizer));
    },
    items() {
      const result = [...this.recipes, ...this.fertilizers];
      if (this.isDefaultFertilizers) {
        const recipesNames = this.recipes.map((item) => item.name);
        const fertilizersNames = this.recipes.map((item) => item.name);
        const defaultFertilizersFiltered = this.defaultFertilizers.filter(
          (item) => ![...recipesNames, ...fertilizersNames].includes(item.name),
        );
        result.push(...defaultFertilizersFiltered);
      }
      return result;
    },
    isAmount() {
      return this.recipesSelected.length > 0 && this.recipesSelected.every((x) => x.amount > 0 || x.amountDay > 0);
    },
    datesRangeSorted() {
      if (!this.datesRange) {
        return [];
      }
      const datesRange = [...this.datesRange];
      datesRange.sort();
      return datesRange;
    },
    datesColumn() {
      const range = [];
      if (!this.daysTotal) {
        return [];
      }
      let startDate = new Date(this.datesRangeSorted[0]);
      [...Array(this.daysTotal)].forEach(() => {
        const day = startDate.toLocaleDateString('ru-Ru', { month: 'numeric', day: 'numeric' });
        const weekday = startDate.toLocaleDateString('ru-Ru', { weekday: 'short' });
        range.push({
          weekday,
          date: day,
        });
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      });
      return range;
    },
    daysTotal() {
      if (this.datesRange.length === 2) {
        return moment(this.datesRangeSorted[1]).diff(this.datesRangeSorted[0], 'days') + 1;
      }
      return 0;
    },
  },
  watch: {
    recipesSelected() {
      this.recipesSelected.forEach((recipe) => {
        if (
          !(recipe.name in this.selected)
          && this.fertilizationType !== FERTILIZATION_IN_TAP_WATER
        ) {
          recipe.amount = '';
          recipe.amountDay = '';
          Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
            !!recipe.amountDay, 0, this.daysTotal,
          )]);
          Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
          Vue.set(this.completedWaterChange, recipe.name, 0);
        } else if (
          !(recipe.name in this.completedWaterChange)
          && this.fertilizationType === FERTILIZATION_IN_TAP_WATER
        ) {
          recipe.amount = '';
          recipe.amountDay = '';
          Vue.set(this.completedWaterChange, recipe.name, 0);
        }
      });
    },
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_ADD',
      'SCHEDULE_EDIT',
      'SCHEDULE_REMOVE',
      'SNACKBAR_SHOW',
    ]),
    convertIonName,
    convertIonRatio,
    isRecipe,
    onChooseTank(value) {
      if (typeof value === 'object') {
        this.tank = { ...value };
      } else {
        this.tank.name = value;
        this.tank.volume = +value;
      }
    },
    onRecipeSelect(value) {
      if (value.length > this.recipesSelected.length) {
        const valueCopied = [...value];
        const lastSelected = valueCopied.pop();
        if (typeof lastSelected === 'string') {
          this.recipesSelected = valueCopied;
          return;
        }
      }
      this.recipesSelected = value;
    },
    convertFertilizer(fertilizer) {
      const result = {
        name: fertilizer.name,
        note: '',
        elements: { ...fertilizer.elements },
        isPercent: fertilizer.isPercent,
      };
      const concentration = {
        [fertilizer.name]: {},
      };
      Object.entries(fertilizer.elements).forEach(([el, value]) => {
        const convertRatio = fertilizer.isPercent ? 10 : 1;
        if (value && ['NO3', 'PO4', 'MgO', 'CaO'].includes(el)) {
          concentration[fertilizer.name][OXIDE_TO_ELEMENT[el]] = getOxideToElementRatio(el) * value * convertRatio;
        } else if (value && el === 'P2O5') {
          concentration[fertilizer.name].P = getOxideToElementRatio(el) * value * convertRatio;
        } else if (value && el === 'K2O') {
          concentration[fertilizer.name].K = getOxideToElementRatio(el) * value * convertRatio;
        } else if (value) {
          concentration[fertilizer.name][el] = value * convertRatio;
        }
      });
      result.concentration = { ...concentration };
      return result;
    },
    onChangeFertilizationType(value) {
      this.fertilizationType = value;
      if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
        this.recipesSelected.forEach((recipe) => {
          Vue.delete(this.selected, recipe.name);
          Vue.delete(this.completed, recipe.name);
          Vue.set(this.completedWaterChange, recipe.name, 0);
        });
      } else if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
        this.recipesSelected.forEach((recipe) => {
          Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
            !!recipe.amountDay, 0, this.daysTotal,
          )]);
          Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
          Vue.delete(this.completedWaterChange, recipe.name);
        });
      } else if (this.fertilizationType === FERTILIZATION_MIX) {
        this.recipesSelected.forEach((recipe) => {
          Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
            !!recipe.amountDay, 0, this.daysTotal,
          )]);
          Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
          Vue.set(this.completedWaterChange, recipe.name, 0);
        });
      }
    },
    onChangeDatesRange(value) {
      this.datesRange = value;
      if (value.length === 0) { return; }
      this.recipesSelected.forEach((recipe) => {
        if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
          Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
            !!recipe.amountDay, 0, this.daysTotal,
          )]);
          Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
        } else if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
          Vue.set(this.completedWaterChange, recipe.name, 0);
        } else if (this.fertilizationType === FERTILIZATION_MIX) {
          Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
            !!recipe.amountDay, 0, this.daysTotal,
          )]);
          Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
          Vue.set(this.completedWaterChange, recipe.name, 0);
        }
      });
    },
    inputDose(index, value) {
      Vue.set(this.recipesSelected, index, value);
      Vue.set(this.selected, value.name, [...Array(this.daysTotal).fill(
        !!value.amountDay, 0, this.daysTotal,
      )]);
    },
    addSchedule() {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_ADD({
          fertilizationType: this.fertilizationType,
          tank: this.tank,
          recipesSelected: this.recipesSelected,
          datesRange: this.datesRange,
          selected: this.selected,
          completed: this.completed,
          completedWaterChange: this.completedWaterChange,
          daysTotal: this.daysTotal,
          datesColumn: this.datesColumn,
        });
        this.SNACKBAR_SHOW('Расписание добавлено');
        this.$router.push('/schedules/');
      }
    },
    editSchedule() {
      if (this.$refs.scheduleForm.validate()) {
        this.recipesSelected.forEach((recipe) => {
          if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
            Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
          } else if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
            Vue.set(this.completedWaterChange, recipe.name, 0);
          } else if (this.fertilizationType === FERTILIZATION_MIX) {
            Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
            Vue.set(this.completedWaterChange, recipe.name, 0);
          }
        });
        this.SCHEDULE_EDIT({
          index: this.scheduleIndex,
          schedule: {
            fertilizationType: this.fertilizationType,
            tank: this.tank,
            recipesSelected: this.recipesSelected,
            datesRange: this.datesRange,
            selected: this.selected,
            completed: this.completed,
            completedWaterChange: this.completedWaterChange,
            daysTotal: this.daysTotal,
            datesColumn: this.datesColumn,
          },
        });
        this.SNACKBAR_SHOW('Расписание сохранено');
        this.$router.push('/schedules/');
      }
    },
    removeSchedule() {
      this.SCHEDULE_REMOVE(this.scheduleIndex);
      this.SNACKBAR_SHOW('Расписание удалено');
      this.$router.push('/schedules/');
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
