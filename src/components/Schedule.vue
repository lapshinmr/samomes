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
  <v-card class="mb-2">
    <v-card-title class="headline d-flex justify-space-between align-start flex-nowrap">
      <div class="no-break">
        {{ schedule.tank.name }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      <span>Объем: {{ schedule.tank.volume }} л</span>
    </v-card-subtitle>
    <v-card-text>
      <v-stepper
        v-model="activeIndex"
        alt-labels
      >
        <v-stepper-items>
          <v-stepper-content
            v-for="(n, index) in schedule.daysTotal"
            :key="`${n}-content`"
            :step="n"
            class="pa-0 pb-8"
          >
            <div class="d-flex flex-column text-h4 text-center mb-4">
              <div>
                <span style="text-transform: capitalize;">{{ schedule.datesColumn[index].weekday }}</span>,
                <span>{{ schedule.datesColumn[index].date }}</span>
              </div>
              <div class="text-center text-body-1">
                {{ schedule.datesRange[0] | format("DD MMMM") }} -
                {{ schedule.datesRange[1] | format("DD MMMM") }}
              </div>
            </div>
            <div
              v-if="[FERTILIZATION_IN_TAP_WATER, FERTILIZATION_MIX].includes(schedule.fertilizationType)
                && index === 0"
            >
              <div class="mb-4 text-subtitle-1 text-center">
                Подмена
              </div>
              <div
                v-for="(quota, recipeName) in waterChangeQuotas"
                :key="`water_change_${recipeName}`"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="10"
                    offset-sm="1"
                    class="py-1"
                  >
                    <schedule-button
                      :disabled="quota === 0"
                      :status="schedule.completedWaterChange[recipeName]"
                      :value="quota"
                      :sum="totalSum[recipeName]['sum']"
                      :amount="totalSum[recipeName]['amount']"
                      :recipe-name="recipeName"
                      @click="clickWaterChangeDay(recipeName)"
                    >
                      {{ recipeName }}
                    </schedule-button>
                  </v-col>
                </v-row>
              </div>
            </div>
            <v-divider
              v-if="Object.keys(waterChangeQuotas).length > 0 && index === 0"
              class="mt-4 mb-6"
            />
            <div
              v-for="(quotas, recipeName) in daysQuotas"
              :key="recipeName + n"
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="10"
                  offset-sm="1"
                  class="py-1"
                >
                  <schedule-button
                    :disabled="!schedule.selected[recipeName][index] || quotas[index] === 0"
                    :status="schedule.completed[recipeName][index]"
                    :value="quotas[index]"
                    :sum="totalSum[recipeName]['sum']"
                    :amount="totalSum[recipeName]['amount']"
                    :recipe-name="recipeName"
                    @click="clickDay(index, recipeName)"
                  />
                </v-col>
              </v-row>
            </div>
          </v-stepper-content>
        </v-stepper-items>
        <v-stepper-header v-if="$vuetify.breakpoint['smAndUp']">
          <template v-for="(n, index) in schedule.daysTotal">
            <v-stepper-step
              :key="`${n}-step`"
              :step="n"
              :complete="isCompletedDay[index]"
              editable
            >
              <span style="text-transform: capitalize;">{{ schedule.datesColumn[index].weekday }}</span>
            </v-stepper-step>
            <v-divider
              v-if="n !== schedule.daysTotal"
              :key="n"
            />
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        :disabled="activeIndex <= 1"
        @click="prevStep"
        class="ml-auto"
      >
        Назад
      </v-btn>
      <v-btn
        text
        :disabled="activeIndex === schedule.daysTotal"
        @click="nextStep"
        class="ml-0 ml-sm-3"
      >
        Далее
      </v-btn>
      <v-btn
        text
        @click="$router.push(`/schedules/${scheduleIndex}`)"
        class="ml-0 ml-sm-3"
      >
        Открыть
      </v-btn>
    </v-card-actions>
    <v-progress-linear :value="progressValue" />
  </v-card>
</template>

<script>
import {
  FERTILIZATION_IN_TAP_WATER,
  FERTILIZATION_EVERY_DAY,
  FERTILIZATION_MIX,
} from '@/components/FertilizersDoseTable.vue';
import ScheduleButton from '@/components/ScheduleButton.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Schedule',
  components: {
    ScheduleButton,
  },
  props: {
    scheduleIndex: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      activeIndex: 1,
      FERTILIZATION_IN_TAP_WATER,
      FERTILIZATION_EVERY_DAY,
      FERTILIZATION_MIX,
    };
  },
  created() {
    this.activeIndex = this.findCurActiveDay();
  },
  computed: {
    ...mapState([
      'schedules',
    ]),
    schedule() {
      return this.schedules[this.scheduleIndex];
    },
    waterChangeQuotas() {
      const quotas = {};
      this.schedule.recipesSelected.forEach((recipe) => {
        quotas[recipe.name] = recipe.amount || 0;
      });
      return quotas;
    },
    daysQuotas() {
      if (Object.keys(this.schedule.completed).length === 0) {
        return null;
      }
      const quotas = {};
      this.schedule.recipesSelected.forEach((recipe) => {
        const result = [];
        const selectedList = this.schedule.selected[recipe.name];
        const completeList = this.schedule.completed[recipe.name];
        const excludedTotal = selectedList.filter((x) => x === false).length;
        let daysLeft = this.schedule.daysTotal - excludedTotal;
        let amount = recipe.amountDay * this.schedule.daysTotal;
        let currentDay = amount / (this.schedule.daysTotal - excludedTotal);
        Object.keys([...Array(this.schedule.daysTotal)]).forEach((index) => {
          if (!amount) {
            result.push(0);
          } else {
            switch (true) {
              case completeList[index] === 1:
                currentDay = amount / daysLeft;
                amount -= currentDay;
                daysLeft -= 1;
                break;
              case !selectedList[index]:
                currentDay = 0;
                break;
              case completeList[index] === 2:
                currentDay = 0;
                daysLeft -= 1;
                break;
              default:
                currentDay = amount / daysLeft;
            }
            result.push(currentDay);
          }
        });
        quotas[recipe.name] = result;
      });
      return quotas;
    },
    totalSum() {
      const result = {};
      this.schedule.recipesSelected.forEach((recipe) => {
        let sum = 0;
        Object.keys(this.daysQuotas[recipe.name]).forEach((index) => {
          if (this.schedule.completed[recipe.name][index]) {
            sum += this.daysQuotas[recipe.name][index];
          }
        });
        if (this.schedule.completedWaterChange[recipe.name]) {
          sum += this.waterChangeQuotas[recipe.name];
        }
        result[recipe.name] = {
          sum,
          amount: recipe.amount + recipe.amountDay * this.schedule.daysTotal,
        };
      });
      return result;
    },
    isCompletedDay() {
      const result = Array(this.schedule.daysTotal).fill(false);
      result.forEach((day) => {
        let fertilizersWereClicked = 0;
        Object.keys(this.schedule.selected).forEach((recipeName) => {
          const completed = this.schedule.completed[recipeName][day];
          const selected = this.schedule.selected[recipeName][day];
          if (!selected || completed === 1 || completed === 2) {
            fertilizersWereClicked += 1;
          }
        });
        if (fertilizersWereClicked === Object.keys(this.schedule.completed).length) {
          if (parseInt(day, 10) === 0 || result[day - 1]) {
            result[day] = true;
          }
        }
      });
      return result;
    },
    progressValue() {
      let sum = 0;
      let amount = 0;
      Object.keys(this.totalSum).forEach((item) => {
        amount += parseFloat(this.totalSum[item].amount);
        sum += parseFloat(this.totalSum[item].sum);
      });
      return (sum / amount) * 100;
    },
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_COMPLETE',
      'SCHEDULE_COMPLETE_WATER_CHANGE',
    ]),
    clickDay(dayIndex, recipeName) {
      this.SCHEDULE_COMPLETE({
        scheduleIndex: this.scheduleIndex,
        dayIndex,
        recipeName,
      });
    },
    clickWaterChangeDay(recipeName) {
      this.SCHEDULE_COMPLETE_WATER_CHANGE({
        scheduleIndex: this.scheduleIndex,
        recipeName,
      });
    },
    prevStep() {
      if (this.activeIndex > 1) {
        this.activeIndex -= 1;
      }
    },
    nextStep() {
      if (this.activeIndex < this.schedule.daysTotal) {
        this.activeIndex += 1;
      }
    },
    findCurActiveDay() {
      const completed = [...this.isCompletedDay];
      completed.reverse();
      let found = completed.findIndex((item) => item === true);
      found = found === -1 ? completed.length : found;
      let curActiveDay = completed.length - found + 1;
      if (curActiveDay > completed.length) {
        curActiveDay = completed.length;
      }
      return curActiveDay;
    },
  },
};
</script>

<style lang="sass">
.v-stepper
  box-shadow: none!important
.v-stepper__step__step .v-icon
  font-size: 1rem!important
.v-btn__content
  width: 100%
</style>
