<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ tank.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ tank.volume }} л
      </v-card-subtitle>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Дни</th>
                <th class="text-left" v-for="(quotas, recipeName) in daysQuotas" :key="recipeName">
                  {{ recipeName }}, мл
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(day, index) in daysTotal" :key="day">
                <td>
                  <span style="text-transform: capitalize;">{{ datesColumn[index].weekday }}</span>,
                  <span class="text-secondary">{{ datesColumn[index].date }}</span>
                </td>
                <td v-for="(quotas, recipeName) in daysQuotas" :key="recipeName + day">
                  <v-checkbox
                    v-if="selected[recipeName][index]"
                    color="primary"
                    dense
                    :input-value="completed[recipeName][index]"
                    @click.stop="clickDay(recipeName, index)"
                    :indeterminate="skipped[recipeName][index]"
                    hide-details="auto"
                    class="mt-0"
                  >
                     <template v-slot:label>
                       <span class="mt-1" :class="{
                         'text-success': completed[recipeName][index],
                         'text-secondary': skipped[recipeName][index]
                        }"
                       >
                        {{ quotas[index].toFixed(2) }}
                       </span>
                     </template>
                  </v-checkbox>
                  <span v-else> - </span>
                </td>
              </tr>
              <tr class="mt-4 pt-4">
                <td class="font-weight-bold">
                  Влито
                </td>
                <td v-for="(item, index) in totalSum" :key="index">
                    {{ item.sum.toFixed(1) }} / {{ item.amount }} мл
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('remove', index)">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default {
  name: 'schedule',
  props: [
    'index',
    'tank',
    'recipesSelected',
    'selected',
    'completed',
    'skipped',
    'daysTotal',
    'datesColumn',
    'datesRange',
    'removeSchedule'
  ],
  data () {
    return {
    }
  },
  computed: {
    schedule () {
      return this.schedules[this.index]
    },
    daysQuotas () {
      let quotas = {}
      if (Object.keys(this.completed).length === 0) {
        return
      }
      for (const recipe of this.recipesSelected) {
        let result = []
        let selectedList = this.selected[recipe.name]
        let completeList = this.completed[recipe.name]
        let skipList = this.skipped[recipe.name]
        let excludedTotal = selectedList.filter(x => x === false).length
        let daysLeft = this.daysTotal - excludedTotal
        let amount = parseFloat(recipe.amount)
        let currentDay = amount / (this.daysTotal - excludedTotal)
        for (const index in [...Array(this.daysTotal)]) {
          switch (true) {
            case completeList[index]:
              currentDay = amount / daysLeft
              amount -= currentDay
              daysLeft -= 1
              break
            case !selectedList[index]:
              currentDay = 0
              break
            case skipList[index]:
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
      for (const recipe of this.recipesSelected) {
        let sum = 0
        for (const index in this.daysQuotas[recipe.name]) {
          if (this.completed[recipe.name][index]) {
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
      'SCHEDULE_COMPLETE',
      'SCHEDULE_SKIP'
    ]),
    clickDay (recipeName, index) {
      if (this.completed[recipeName][index]) {
        let completed = [...this.completed[recipeName]]
        let skipped = [...this.skipped[recipeName]]
        completed[index] = false
        if (index !== skipped.length - 1) {
          skipped[index] = true
          Vue.set(this.skipped, recipeName, skipped)
          this.SCHEDULE_SKIP({
            indexSchedule: this.index,
            recipeName: recipeName,
            indexDay: index,
            status: true
          })
        }
        Vue.set(this.completed, recipeName, completed)
        this.SCHEDULE_COMPLETE({
          indexSchedule: this.index,
          recipeName: recipeName,
          indexDay: index,
          status: false
        })
      } else if (this.skipped[recipeName][index]) {
        let skipped = [...this.skipped[recipeName]]
        skipped[index] = false
        Vue.set(this.skipped, recipeName, skipped)
        this.SCHEDULE_SKIP({
          indexSchedule: this.index,
          recipeName: recipeName,
          indexDay: index,
          status: false
        })
      } else {
        let completed = [...this.completed[recipeName]]
        completed[index] = true
        this.completed[recipeName][index] = true
        Vue.set(this.completed, recipeName, completed)
        this.SCHEDULE_COMPLETE({
          indexSchedule: this.index,
          recipeName: recipeName,
          indexDay: index,
          status: true
        })
      }
    }
  }
}
</script>
