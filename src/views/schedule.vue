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
  <v-container class="mb-12">
    <v-row>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-btn
          class="mr-0"
          square
          text
          to="/schedules"
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
                @input="chooseTank"
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
                <v-select
                  :items="items"
                  v-model="recipesSelected"
                  label="Выберите удобрения"
                  item-text="name"
                  persistent-hint
                  multiple
                  hint="Выберите рецепты, которые хотите использовать для данного аквариума"
                  :return-object="true"
                />
              </v-col>
            </v-expand-transition>
            <v-col
              v-if="recipesSelected.length > 0"
              cols="12"
            >
              <div
                class="mb-2"
                :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
              >
                Выбранные рецепты
                <v-tooltip
                  bottom
                  max-width="400"
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  Подбирая объем выбранных рецептов, вы можете получить необходимую концентрацию элементов
                  в аквариуме. Таким образом вы можете подобрать ориентировочное значение, которое "съедают"
                  растения за заданный период времени.
                </v-tooltip>
              </div>
              <elements-dose-table
                :recipes-selected="recipesSelected"
                :days="daysTotal"
                @input="inputDose"
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
                  :recipes-selected="recipesSelected"
                  :days-total="daysTotal"
                  :volume="tank.volume"
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
                  v-model="datesRange"
                  locale="ru"
                  no-title
                  first-day-of-week="1"
                  full-width
                  range
                >
                  <template v-slot:default>
                    <v-text-field
                      :value="daysTotal"
                      label="Длительность периода"
                      :suffix="daysSuffix"
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
                <fertilizers-doze-table
                  :dates-column="datesColumn"
                  :days-total="daysTotal"
                  :recipes-selected="recipesSelected"
                  :selected="selected"
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
                  Добавить
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
import ElementsDoseTable from '@/components/FertilizersDoseTable.vue';
import ElementsTable from '@/components/ElementsTable.vue';
import FertilizersDozeTable from '@/components/schedules/ScheduleDozeTable.vue';
import { mapState, mapMutations } from 'vuex';
import { convertIonName, convertIonRatio, isRecipe } from '@/helpers/funcs';

export default {
  name: 'Schedules',
  components: {
    ElementsDoseTable,
    ElementsTable,
    FertilizersDozeTable,
  },
  data() {
    return {
      tank: {
        name: '',
        volume: '',
      },
      recipesSelected: [],
      datesRange: [],
      selected: {},
      completed: {},
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
      const schedule = { ...this.schedules[this.scheduleIndex] };
      this.tank = { ...schedule.tank };
      this.recipesSelected = [...schedule.recipesSelected];
      this.datesRange = [...schedule.datesRange];
      this.selected = { ...schedule.selected };
      this.completed = { ...schedule.completed };
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
    items() {
      return [...this.recipes, ...this.fertilizers];
    },
    isAmount() {
      return this.recipesSelected.length > 0 && this.recipesSelected.every((x) => x.amount > 0);
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
    daysSuffix() {
      let word = 'дней';
      if ([2, 3, 4].includes(this.daysTotal)) {
        word = 'дня';
      }
      return word;
    },
  },
  watch: {
    daysTotal() {
      if (!this.daysTotal) { return; }
      Object.keys(this.recipesSelected).forEach((index) => {
        const recipe = this.recipesSelected[index];
        if (this.selected[recipe.name].length < this.daysTotal) {
          const delta = this.daysTotal - this.selected[recipe.name].length;
          this.selected[recipe.name].push(...Array(delta).fill(true, 0, delta));
        } else {
          this.selected[recipe.name] = [...this.selected[recipe.name].slice(0, this.daysTotal)];
        }
        Vue.set(this.completed, recipe.name, Array(this.daysTotal).fill(0, 0, this.daysTotal));
        const { amountDay } = recipe;
        const amount = amountDay * this.daysTotal;
        Vue.set(this.recipesSelected, index, {
          ...recipe,
          amount: !Number.isNaN(amount) ? parseFloat(amount) : '',
          amountDay: !Number.isNaN(amountDay) ? parseFloat(amountDay) : '',
        });
      });
    },
    recipesSelected() {
      const selected = {};
      this.recipesSelected.forEach((recipe) => {
        if (recipe.name in this.selected) {
          selected[recipe.name] = [...this.selected[recipe.name]];
        } else {
          selected[recipe.name] = Array(this.daysTotal).fill(true, 0, this.daysTotal);
        }
        Vue.set(this.completed, recipe.name, Array(this.daysTotal).fill(0, 0, this.daysTotal));
        if (!recipe.amount) {
          recipe.amount = '';
        }
        if (!recipe.amountDay) {
          recipe.amountDay = '';
        }
      });
      this.selected = { ...selected };
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
    chooseTank(value) {
      if (typeof value === 'object') {
        this.tank = {
          name: value.name,
          volume: +value.volume,
        };
      } else {
        this.tank.name = value;
        this.tank.volume = +value;
      }
    },
    inputDose(index, value) {
      Vue.set(this.recipesSelected, index, value);
    },
    addSchedule() {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_ADD({
          tank: this.tank,
          recipesSelected: this.recipesSelected,
          datesRange: this.datesRange,
          selected: this.selected,
          completed: this.completed,
          daysTotal: this.daysTotal,
          datesColumn: this.datesColumn,
        });
        this.SNACKBAR_SHOW('Расписание добавлено');
        this.$router.push('/schedules');
      }
    },
    editSchedule() {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_EDIT({
          index: this.scheduleIndex,
          schedule: {
            tank: this.tank,
            recipesSelected: this.recipesSelected,
            datesRange: this.datesRange,
            selected: this.selected,
            completed: this.completed,
            daysTotal: this.daysTotal,
            datesColumn: this.datesColumn,
          },
        });
        this.SNACKBAR_SHOW('Расписание сохранено');
        this.$router.push('/schedules');
      }
    },
    removeSchedule() {
      this.SCHEDULE_REMOVE(this.scheduleIndex);
      this.SNACKBAR_SHOW('Расписание удалено');
      this.$router.push('/schedules');
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
