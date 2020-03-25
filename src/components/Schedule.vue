<template>
  <v-card class="mb-2">
    <v-card-title>
      {{ schedule.tank.name }}
    </v-card-title>
    <v-card-subtitle>
      Объем: {{ schedule.tank.volume }} л
    </v-card-subtitle>
    <v-card-text>
      <v-simple-table class="schedule">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Дни</th>
              <th class="text-left" v-for="(quotas, recipeName) in daysQuotas" :key="recipeName">
                {{ recipeName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(day, index) in schedule.daysTotal" :key="day">
              <td>
                <span style="text-transform: capitalize;">{{ schedule.datesColumn[index].weekday }}</span>,
                <span class="schedule__date text-secondary">{{ schedule.datesColumn[index].date }}</span>
              </td>
              <td v-for="(quotas, recipeName) in daysQuotas" :key="recipeName + day">
                <div class="d-flex align-items-center">
                  <v-checkbox
                    v-if="schedule.selected[recipeName][index]"
                    color="primary"
                    :input-value="schedule.completed[recipeName][index] === 1"
                    @click.stop="clickDay(recipeName, index)"
                    :indeterminate="schedule.completed[recipeName][index] === 2"
                    hide-details="auto"
                    dense
                    class="mt-0 pt-0"
                  >
                  </v-checkbox>
                  <span v-if="schedule.selected[recipeName][index]" class="schedule__label" :class="{
                    'text-success': schedule.completed[recipeName][index] === 1,
                    'text-secondary': schedule.completed[recipeName][index] === 2
                   }"
                  >
                   {{ quotas[index].toFixed(2) }}
                  </span>
                  <span v-if="!schedule.selected[recipeName][index]"> - </span>
                </div>
              </td>
            </tr>
            <tr class="">
              <td>
              </td>
              <td v-for="(item, index) in totalSum" :key="index">
                  {{ item.sum.toFixed(1) }} / {{ item.amount }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <div class="caption ml-3">
        * нажмите несколько раз, чтобы пропустить день
      </div>
      <v-spacer />
      <v-btn text @click="$emit('remove', index)">
        Завершить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'schedule',
  props: [ 'index' ],
  data () {
    return {
    }
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
      let result = []
      for (const recipe of this.schedule.recipesSelected) {
        let sum = 0
        for (const index in this.daysQuotas[recipe.name]) {
          if (this.schedule.completed[recipe.name][index]) {
            sum += this.daysQuotas[recipe.name][index]
          }
        }
        result.push({
          'sum': sum,
          'amount': recipe.amount
        })
      }
      return result
    }
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_COMPLETE'
    ]),
    clickDay (recipeName, index) {
      this.SCHEDULE_COMPLETE({
        indexSchedule: this.index,
        indexDay: index,
        recipeName: recipeName
      })
    }
  }
}
</script>

<style lang="sass">
  @media (max-width: 600px)
    .schedule__date
      font-size: 0.8rem!important
    .schedule__label
      font-size: 0.9rem!important
    .v-data-table td
      padding: 0 8px!important
    .v-input--selection-controls__ripple
      margin: 0!important
    .v-input--selection-controls__input
      margin-right: 0!important
    .v-label
      margin-bottom: 0
</style>
