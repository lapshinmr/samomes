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
  <v-container class="mb-12">
    <v-row>
      <page-title>
        Расписание
      </page-title>
      <guide>
        На этой странице можно составить расписание для аквариума.
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
          :shedule-index="index"
          :key="schedule.tank.name + index"
          @remove="openRemoveDialog($event)"
          @edit="openAddSchedule($event)"
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
                      <v-select
                        :items="tanks"
                        v-model="tank"
                        item-text="name"
                        label="Выберите аквариум"
                        persistent-hint
                        hide-selected
                        hint="Выберите аквариум, для которого будет составлено расписание"
                        :return-object="true"
                        :rules="rulesTank"
                        :disabled="isOverview"
                      />
                    </v-col>
                    <v-expand-transition>
                      <v-col
                        v-if="tank"
                        cols="12"
                      >
                        <v-select
                          :items="recipes"
                          v-model="recipesSelected"
                          label="Выберите рецепты"
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
                      <div
                        v-for="(recipeSelected, index) in recipesSelected"
                        :key="index"
                        class="d-flex justify-space-between align-center"
                      >
                        <v-text-field
                          :value="recipeSelected.amount"
                          @input="inputRecipeAmount(index)"
                          type="number"
                          :label="recipeSelected.name"
                          hint="Введите весь объем"
                          :suffix="recipeSelected.volume > 0 || recipeSelected.type === 'Готовое' ? 'мл' : 'г'"
                          persistent-hint
                          class="mr-3"
                        />
                        <v-text-field
                          :value="recipeSelected.amountDay"
                          @input="inputRecipeAmountDay(index)"
                          type="number"
                          hint="или объем в день"
                          :suffix="recipeSelected.volume > 0 || recipeSelected.type === 'Готовое'
                            ? 'мл/день'
                            : 'г/день'
                          "
                          persistent-hint
                          :readonly="isOverview"
                        />
                      </div>
                    </v-col>
                    <v-expand-transition>
                      <v-col
                        v-if="recipesSelected.length > 0"
                        cols="12"
                        class="pt-0"
                      >
                        <div class="d-flex flex-column flex-sm-row align-sm-center mt-2 mb-2">
                          <v-switch
                            v-model="isHardness"
                            label="dGh"
                            hide-details="auto"
                            class="mt-0 mb-2 mb-sm-0"
                          />
                          <v-switch
                            v-model="isWithoutConvertion"
                            label="N & P"
                            hide-details="auto"
                            class="mt-0 mb-2 mb-sm-0 ml-sm-4"
                          />
                        </div>
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="pl-0 text-center">
                                  Элемент
                                </th>
                                <th
                                  v-if="isHardness"
                                  class="text-center"
                                >
                                  dGh
                                </th>
                                <th class="text-center">
                                  Общая доза, <span>мг/л</span>
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
                                :class="{
                                  'caption': $vuetify.breakpoint['xs'],
                                  'regular': $vuetify.breakpoint['smAndUp']
                                }"
                              >
                                <td class="pl-0 text-center">
                                  {{ name }}
                                  <template v-if="convertIonName(name) !== name && isWithoutConvertion">
                                    / {{ convertIonName(name) }}
                                  </template>
                                </td>
                                <td
                                  v-if="isHardness"
                                  class="text-center"
                                >
                                  <template v-if="name in HARDNESS && daysTotal">
                                    +{{ (value / HARDNESS[name]).toFixed(2) }}
                                  </template>
                                </td>
                                <td class="text-center">
                                  <template v-if="daysTotal">
                                    +{{ value !== undefined ? value.toFixed(3) : 0 }}
                                    <template v-if="convertIonName(name) !== name && isWithoutConvertion">
                                      / {{ (value * convertIonRatio(name)).toFixed(3) }}
                                    </template>
                                  </template>
                                </td>
                                <td class="text-center pr-0">
                                  <template v-if="daysTotal">
                                    +{{ value !== undefined ? (value / daysTotal).toFixed(3) : 0 }}
                                  </template>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <div
                          v-if="isHelpful"
                          class="d-flex flex-column flex-sm-row justify-space-between caption mt-2"
                        >
                          <div
                            v-if="totalElements['P'] > 0 && totalElements['N'] > 0"
                            class="mr-2"
                          >
                            NO3 / PO4 =
                            {{ (
                              totalElements['N'] * convertIonRatio('N') / (totalElements['P'] * convertIonRatio('P'))
                            ).toFixed(2) }}
                            (N / P = {{ (totalElements['N'] / totalElements['P']).toFixed(2) }})
                          </div>
                          <div
                            v-if="totalElements['P'] > 0 && totalElements['B'] > 0"
                            class="mr-2"
                          >
                            P / B = {{ (totalElements['P'] / totalElements['B']).toFixed(2) }}
                          </div>
                          <div
                            v-if="totalElements['Fe'] > 0 && totalElements['B'] > 0"
                            class="mr-2"
                          >
                            Fe / B = {{ (totalElements['Fe'] / totalElements['B']).toFixed(2) }}
                          </div>
                        </div>
                      </v-col>
                    </v-expand-transition>
                    <v-expand-transition>
                      <v-col
                        v-if="isAmount"
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
                        v-if="recipesSelected.length > 0 && isAmount && daysTotal"
                        cols="12"
                      >
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center pl-0">
                                  Дни
                                </th>
                                <th
                                  class="text-center"
                                  v-for="recipeName in Object.keys(daysQuotas)"
                                  :key="recipeName"
                                >
                                  {{ recipeName }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(day, index) in daysTotal"
                                :key="day"
                              >
                                <td class="pl-0 text-center">
                                  <span style="text-transform: capitalize;">{{ datesColumn[index].weekday }}</span>,
                                  <span class="text-secondary">{{ datesColumn[index].date }}</span>
                                </td>
                                <td
                                  v-for="(quotas, recipeName, idx) in daysQuotas"
                                  class="text-center"
                                  :class="{'pr-0': idx === Object.keys(daysQuotas).length - 1}"
                                  :key="recipeName + day"
                                >
                                  <v-checkbox
                                    v-if="!isNaN(quotas[index])"
                                    color="primary"
                                    dense
                                    v-model="selected[recipeName][index]"
                                    hide-details="auto"
                                    class="mt-0"
                                    :disabled="isOverview"
                                    style="display: inline-block;"
                                  >
                                    <template v-slot:label>
                                      <span class="mt-0">
                                        {{ quotas[index].toFixed(2) }}
                                      </span>
                                    </template>
                                  </v-checkbox>
                                  <span v-else> - </span>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-expand-transition>
                    <v-expand-transition>
                      <v-col
                        v-if="recipesSelected.length > 0 && isAmount && daysTotal"
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
import { mapState, mapMutations } from 'vuex';
import { convertIonName, convertIonRatio } from '@/helpers/funcs';
import HARDNESS from '@/constants/hardness';

export default {
  name: 'Schedules',
  components: {
    Schedule,
  },
  data() {
    return {
      HARDNESS,
      tank: null,
      recipesSelected: [],
      datesRange: [],
      selected: {},
      completed: {},
      curScheduleIndex: null,
      dialog: false,
      dialogRemove: false,
      rulesDays: [
        (v) => v >= 2 || 'Период должен быть больше одного дня',
      ],
      rulesTank: [
        (v) => !!v || 'Выберите аквариум',
      ],
      isWithoutConvertion: false,
      isHardness: false,
    };
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'schedules', 'drawer',
    ]),
    isOverview() {
      return this.curScheduleIndex !== null;
    },
    isAmount() {
      return this.recipesSelected.length > 0 && this.recipesSelected.every((x) => x.amount > 0);
    },
    isHelpful() {
      return (
        (this.totalElements.P > 0 && this.totalElements.N > 0)
        || (this.totalElements.P > 0 && this.totalElements.B > 0)
        || (this.totalElements.Fe > 0 && this.totalElements.B > 0)
      );
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
              if (recipe.volume || recipe.type === 'Готовое') {
                result[ion] += (recipe.amount * recipe.concentration[reagent][ion]) / this.tank.volume;
              } else if ((!recipe.volume) && recipe.type === 'Самомес') {
                result[ion] += (recipe.amount * recipe.concentration[reagent][ion] * 1000) / this.tank.volume;
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
    daysQuotas() {
      const quotas = {};
      this.recipesSelected.forEach((recipe) => {
        const result = [];
        const selectedList = this.selected[recipe.name];
        const excludedTotal = selectedList.filter((x) => x === false).length;
        const daysLeft = this.daysTotal - excludedTotal;
        const { amount } = recipe;
        let currentDay = amount / (this.daysTotal - excludedTotal);
        [...Array(this.daysTotal)].forEach((index) => {
          switch (true) {
            case !selectedList[index]:
              currentDay = 0;
              break;
            default:
              currentDay = amount / daysLeft;
          }
          result.push(currentDay);
        });
        quotas[recipe.name] = result;
      });
      return quotas;
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
      });
      this.selected = { ...selected };
    },
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_ADD', 'SCHEDULE_EDIT', 'SCHEDULE_REMOVE', 'SNACKBAR_SHOW',
    ]),
    convertIonName(ion) {
      return convertIonName(ion);
    },
    convertIonRatio(ion) {
      return convertIonRatio(ion);
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
      this.tank = null;
      this.recipesSelected = [];
      this.curScheduleIndex = null;
      this.dialog = false;
      this.datesRange = [];
      this.selected = {};
      this.completed = {};
    },
    setComponent(index) {
      const schedule = this.schedules[index];
      console.log(schedule.recipesSelected);
      this.tank = schedule.tank;
      this.recipesSelected = [...schedule.recipesSelected];
      this.selected = { ...schedule.selected };
      this.datesRange = schedule.datesRange;
    },
    inputRecipeAmount(event, index) {
      const recipe = this.recipesSelected[index];
      const amount = parseFloat(event.target.value);
      const amountDay = amount / this.daysTotal;
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !Number.isNaN(amount) ? parseFloat(amount.toFixed(3)) : '',
        amountDay: !Number.isNaN(amountDay) ? parseFloat(amountDay.toFixed(3)) : '',
      });
    },
    inputRecipeAmountDay(event, index) {
      const recipe = this.recipesSelected[index];
      const amountDay = parseFloat(event.target.value);
      const amount = amountDay * this.daysTotal;
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !Number.isNaN(amount) ? parseFloat((amount).toFixed(3)) : '',
        amountDay: !Number.isNaN(amountDay) ? parseFloat(amountDay.toFixed(3)) : '',
      });
    },
    openAddSchedule(index = null) {
      if (index !== null) {
        this.curScheduleIndex = index;
        this.setComponent(index);
      } else {
        this.createDatesRange();
      }
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
