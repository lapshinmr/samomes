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
      <page-title>
        Расписание
      </page-title>
      <guide>
        На этой странице можно составить расписание внесения удобрений в аквариум.
        <br>
        <br>
        Калькулятор сам рассчитает концентрации элементов, по которым можно прикинуть дозировки вносимых
        удобрений. А так же предложит составить расписание.
      </guide>
      <v-col
        v-if="schedules.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного расписания
        </p>
      </v-col>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <Schedule
          v-for="(schedule, index) in schedules"
          :index-schedule="index"
          :key="`${schedule.tank.name} + ${index}`"
          @remove="openRemoveDialog"
          @edit="openSchedule"
        />
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title v-if="!isOverview">
            Новое расписание
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Обзор расписания
          </v-toolbar-title>
          <v-btn
            icon
            dark
            @click="closeScheduleDialog"
            class="ml-auto"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
          <v-container>
            <v-row>
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
                        :value="tank.name"
                        @input="chooseTank"
                        item-text="name"
                        item-value="volume"
                        label="Выберите аквариум или введите объем"
                        persistent-hint
                        hide-selected
                        hint="Объем необходим для расчета дозировок"
                        :return-object="true"
                        :rules="rulesTank"
                        :disabled="isOverview"
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
                          :disabled="isOverview"
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
                        :is-overview="isOverview"
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
                          :disabled="isOverview"
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
                          :is-overview="isOverview"
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
                          @click="closeScheduleDialog"
                          class="mr-3"
                        >
                          Отменить
                        </v-btn>
                        <v-btn
                          v-if="isOverview"
                          color="primary"
                          @click="openRemoveDialog(curScheduleIndex)"
                        >
                          Удалить
                        </v-btn>
                        <v-btn
                          v-if="!isOverview"
                          color="primary"
                          @click="addSchedule"
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
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogRemove"
      width="500"
    >
      <v-card>
        <v-card-title>
          Удаление расписания
        </v-card-title>
        <v-card-text v-if="curScheduleIndex !== null">
          <p>
            Подтвердите, что вы хотите удалить расписание для аквариума "{{ schedules[curScheduleIndex].tank.name }}".
          </p>
          <p>
            После нажатия кнопки "Удалить" будет предложено создать новое расписание
            с помощью ранее используемых рецептов.
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialogRemove = false"
          >
            Отменить
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="removeSchedule"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <add-button :action="openAddSchedule">
      Добавить расписание
    </add-button>
  </v-container>
</template>

<script>
import Vue from 'vue';
import Schedule from '@/components/Schedule.vue';
import ElementsDoseTable from '@/components/FertilizersDoseTable.vue';
import ElementsTable from '@/components/ElementsTable.vue';
import FertilizersDozeTable from '@/components/schedules/ScheduleDozeTable.vue';
import { mapState, mapMutations } from 'vuex';
import { convertIonName, convertIonRatio, isRecipe } from '@/helpers/funcs';

export default {
  name: 'Schedules',
  components: {
    Schedule,
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
      curScheduleIndex: null,
      isSchedule: false,
      dialog: false,
      dialogRemove: false,
      rulesDays: [
        (v) => v >= 2 || 'Период должен быть больше одного дня',
      ],
      rulesTank: [
        (v) => !!v || 'Выберите аквариум',
      ],
    };
  },
  computed: {
    ...mapState([
      'tanks',
      'recipes',
      'fertilizers',
      'schedules',
      'drawer',
    ]),
    items() {
      return [...this.recipes, ...this.fertilizers];
    },
    isOverview() {
      return this.curScheduleIndex !== null;
    },
    isAmount() {
      return this.recipesSelected.length > 0 && this.recipesSelected.every((x) => x.amount > 0);
    },
    datesRangeSorted() {
      const datesRange = this.datesRange.slice();
      datesRange.sort();
      return datesRange;
    },
    datesColumn() {
      const range = [];
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
      if (this.datesRangeSorted.length < 2) {
        return 0;
      }
      return (new Date(this.datesRangeSorted[1]) - new Date(this.datesRangeSorted[0])) / (1000 * 3600 * 24) + 1;
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
    createDatesRange() {
      const duration = 6;
      const dateStart = new Date().toISOString().split('T')[0];
      let dateFinish = new Date();
      dateFinish = new Date(dateFinish.setDate(dateFinish.getDate() + duration));
      [dateFinish] = dateFinish.toISOString().split('T');
      this.datesRange = [dateStart, dateFinish];
    },
    resetComponent() {
      this.tank = {};
      this.recipesSelected = [];
      this.curScheduleIndex = null;
      this.dialog = false;
      this.datesRange = [];
      this.selected = {};
      this.completed = {};
    },
    setComponent(index) {
      const schedule = this.schedules[index];
      this.tank = schedule.tank;
      this.recipesSelected = [...schedule.recipesSelected];
      this.selected = { ...schedule.selected };
      this.datesRange = schedule.datesRange;
    },
    openAddSchedule() {
      this.createDatesRange();
      if (this.$refs.scheduleForm) {
        this.$refs.scheduleForm.resetValidation();
      }
      this.dialog = true;
    },
    openSchedule(index) {
      this.isSchedule = true;
      this.curScheduleIndex = index;
      this.setComponent(index);
      if (this.$refs.scheduleForm) {
        this.$refs.scheduleForm.resetValidation();
      }
      this.dialog = true;
    },
    addSchedule() {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_ADD({
          tank: this.tank,
          recipesSelected: [...this.recipesSelected],
          datesRange: this.datesRange,
          daysTotal: this.daysTotal,
          datesColumn: [...this.datesColumn],
          selected: { ...this.selected },
          completed: { ...this.completed },
        });
        this.resetComponent();
        this.SNACKBAR_SHOW('Расписание добавлено');
      }
    },
    closeScheduleDialog() {
      this.dialog = false;
      this.resetComponent();
    },
    openRemoveDialog(index) {
      this.curScheduleIndex = index;
      this.dialogRemove = true;
    },
    removeSchedule() {
      this.setComponent(this.curScheduleIndex);
      this.SCHEDULE_REMOVE(this.curScheduleIndex);
      this.dialogRemove = false;
      this.curScheduleIndex = null;
      this.dialog = true;
      this.SNACKBAR_SHOW('Расписание удалено');
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
