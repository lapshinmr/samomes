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
  <v-card class="mb-2">
    <v-card-title class="headline d-flex justify-space-between align-start flex-nowrap">
      <div class="no-break">
        {{ schedule.tank.name }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      Объем: {{ schedule.tank.volume }} л
    </v-card-subtitle>
    <v-card-text>
      <v-stepper
        v-model="activeIndex"
        alt-labels
      >
        <v-stepper-items class="mb-4">
          <v-stepper-content
            v-for="(n, index) in schedule.daysTotal"
            :key="`${n}-content`"
            :step="n"
            class="pa-0"
          >
            <div class="display-1 text-center mb-5">
              <span style="text-transform: capitalize;">{{ schedule.datesColumn[index].weekday }}</span>,
              <span class="">{{ schedule.datesColumn[index].date }}</span>
            </div>
            <div v-for="(quotas, recipeName) in daysQuotas" :key="recipeName + n" class="headline">
              <v-row>
                <v-col cols="12" sm="10" offset-sm="1" class="py-0">
                  <v-btn
                    v-if="schedule.selected[recipeName][index]"
                    block
                    x-large
                    tile
                    :color="['primary', 'primary', 'grey'][schedule.completed[recipeName][index]]"
                    :outlined="[true, false, true][schedule.completed[recipeName][index]]"
                    @click="clickDay(recipeName, index)"
                    class="mb-2 px-3"
                    style="max-width: 100%;"
                  >
                    <template v-slot:default>
                      <div
                        class="d-flex justify-space-between align-center w-100"
                        :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'headline': $vuetify.breakpoint['smAndUp']}"
                      >
                        <v-icon v-if="schedule.completed[recipeName][index] === 0" color="primary">far fa-circle</v-icon>
                        <v-icon v-if="schedule.completed[recipeName][index] === 1" color="white">far fa-check-circle</v-icon>
                        <v-icon v-if="schedule.completed[recipeName][index] === 2" color="grey">far fa-times-circle</v-icon>
                        <div class="flex-shrink-1" style="white-space: nowrap; width: 60%;">
                          <div style="overflow: hidden; text-overflow: ellipsis;">
                            {{ recipeName }}
                          </div>
                        </div>
                        <div class="d-flex flex-column align-end flex-shrink-1">
                          <div>
                            {{ quotas[index].toFixed(2) }}
                          </div>
                          <div class="caption mt-n2">
                            {{ totalSum[recipeName]['sum'].toFixed(1) }} / {{ totalSum[recipeName]['amount'] }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-stepper-content>
        </v-stepper-items>
        <v-stepper-header v-if="$vuetify.breakpoint['smAndUp']">
          <template v-for="(n, index) in schedule.daysTotal">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="isCompletedDay[index]"
              :step="n"
              editable
              edit-icon="fas fa-check"
              complete-icon="fas fa-check"
            >
              <span style="text-transform: capitalize;">{{ schedule.datesColumn[index].weekday }}</span>
            </v-stepper-step>
            <v-divider
              v-if="n !== schedule.daysTotal"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        v-if="activeIndex > 1"
        @click="prevStep()"
        class="ml-auto"
      >
        Назад
      </v-btn>
      <v-btn
        text
        v-if="activeIndex < schedule.daysTotal"
        @click="nextStep()"
        class="ml-3"
        :class="{'ml-auto': activeIndex === 1}"
      >
        Далее
      </v-btn>
      <v-btn
        v-else
        text
        @click="$emit('remove', index)"
        class="ml-3"
      >
        Завершить
      </v-btn>
      <v-btn
        text
        @click="$emit('edit', index)"
        class="ml-3"
      >
        Открыть
      </v-btn>
    </v-card-actions>
    <v-progress-linear
      :value="progressValue"
    >
    </v-progress-linear>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'schedule',
  props: [ 'index' ],
  data () {
    return {
      activeIndex: 1
    }
  },
  created () {
    this.activeIndex = this.findCurActiveDay()
  },
  computed: {
    ...mapState([
      'schedules'
    ]),
    schedule () {
      return this.schedules[this.index]
    },
    daysQuotas () {
      let quotas = {}
      if (Object.keys(this.schedule.completed).length === 0) {
        return
      }
      for (const recipe of this.schedule.recipesSelected) {
        let result = []
        let selectedList = this.schedule.selected[recipe.name]
        let completeList = this.schedule.completed[recipe.name]
        let excludedTotal = selectedList.filter(x => x === false).length
        let daysLeft = this.schedule.daysTotal - excludedTotal
        let amount = parseFloat(recipe.amount)
        let currentDay = amount / (this.schedule.daysTotal - excludedTotal)
        for (const index in [...Array(this.schedule.daysTotal)]) {
          switch (true) {
            case completeList[index] === 1:
              currentDay = amount / daysLeft
              amount -= currentDay
              daysLeft -= 1
              break
            case !selectedList[index]:
              currentDay = 0
              break
            case completeList[index] === 2:
              currentDay = 0
              daysLeft -= 1
              break
            default:
              currentDay = amount / daysLeft
          }
          result.push(currentDay)
        }
        quotas[recipe.name] = result
      }
      return quotas
    },
    totalSum () {
      let result = {}
      for (const recipe of this.schedule.recipesSelected) {
        let sum = 0
        for (const index in this.daysQuotas[recipe.name]) {
          if (this.schedule.completed[recipe.name][index]) {
            sum += this.daysQuotas[recipe.name][index]
          }
        }
        result[recipe.name] = {
          'sum': sum,
          'amount': recipe.amount
        }
      }
      return result
    },
    isCompletedDay () {
      let result = Array(this.schedule.daysTotal).fill(true)
      for (let day in result) {
        for (let recipeName in this.schedule.selected) {
          if (!this.schedule.selected[recipeName][day]) {
            continue
          }
          result[day] = result[day] && (this.schedule.completed[recipeName][day] === 1 || this.schedule.completed[recipeName][day] === 2)
        }
      }
      return result
    },
    progressValue () {
      let sum = 0
      let amount = 0
      for (let item in this.totalSum) {
        amount += parseFloat(this.totalSum[item].amount)
        sum += parseFloat(this.totalSum[item].sum)
      }
      return sum / amount * 100
    }
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_COMPLETE',
      'PROGRESS_EDIT'
    ]),
    clickDay (recipeName, index) {
      this.SCHEDULE_COMPLETE({
        indexSchedule: this.index,
        indexDay: index,
        recipeName: recipeName
      })
      // if (this.isCompletedDay[index]) {
      //   setTimeout(() => this.nextStep(), 1000)
      // }
      this.PROGRESS_EDIT({
        tankName: this.schedule.tank.name,
        value: this.progressValue
      })
    },
    prevStep () {
      if (this.activeIndex > 1) {
        this.activeIndex--
      }
    },
    nextStep () {
      if (this.activeIndex < this.schedule.daysTotal) {
        this.activeIndex++
      }
    },
    findCurActiveDay () {
      let completed = [ ...this.isCompletedDay ]
      completed.reverse()
      let found = completed.findIndex(item => item === true)
      found = found === -1 ? completed.length : found
      let curActiveDay = completed.length - found + 1
      if (curActiveDay > completed.length) {
        curActiveDay = completed.length
      }
      return curActiveDay
    }
  }
}
</script>

<style lang="sass">
.v-stepper
  box-shadow: none!important
.v-stepper__step__step .v-icon
  font-size: 1rem!important
.v-btn__content
  width: 100%
</style>
