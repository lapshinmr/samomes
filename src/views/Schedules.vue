<template>
  <v-container>

    <v-row>
      <v-col cols="12">
        <Schedule
          v-for="(schedule, index) in schedules"
          :index="index"
          :key="schedule.tank.name"
          @remove="openRemoveDialog($event)"
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
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            Новое расписание
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
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
                ></v-select>
              </v-col>
              <v-expand-transition>
                <v-col v-if="tank" cols="12">
                  <v-select
                    :items="recipes"
                    v-model="recipesSelected"
                    label="Выберите рецепты"
                    item-text="name"
                    persistent-hint
                    multiple
                    hint="Выберите рецепты, которые хотите использовать для данного аквариума"
                    :return-object="true"
                  ></v-select>
                </v-col>
              </v-expand-transition>
              <v-col v-if="recipesSelected.length > 0" cols="12">
                <h6>Выбранные рецепты</h6>
                <div v-for="(recipeSelected, index) in recipesSelected" :key="index" class="d-flex justify-content-between align-items-center">
                  <div>
                    {{ recipeSelected.name }}
                  </div>
                  <div>
                    <v-text-field
                      :value="recipeSelected.amount"
                      @input="inputRecipeAmount(index)"
                      label="Введите объем"
                      suffix="мл"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
               </div>
              </v-col>
              <v-expand-transition>
                <v-col v-if="isAmount" cols="12">
                  <h6>Повышение концентрации в аквариуме</h6>
                  <div v-for="(value, name) in totalElements" :key="name" class="d-flex justify-content-between">
                    <span>{{ name }}</span>
                    <span>{{ value !== undefined ? value.toFixed(2) : 0 }} мг/л</span>
                  </div>
                </v-col>
              </v-expand-transition>
              <v-expand-transition>
                <v-col v-if="isAmount" cols="12">
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
                      ></v-text-field>
                    </template>
                  </v-date-picker>
                </v-col>
              </v-expand-transition>
              <v-expand-transition>
                <v-col v-if="recipesSelected.length > 0 && isAmount && daysTotal" cols="12">
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
                              v-if="!isNaN(quotas[index])"
                              color="primary"
                              dense
                              v-model="selected[recipeName][index]"
                              hide-details="auto"
                              class="mt-0"
                            >
                               <template v-slot:label>
                                 <span class="mt-1">
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
                <v-col v-if="recipesSelected.length > 0 && isAmount && daysTotal" class="text-right" cols="12">
                  <v-btn color="primary" @click="addSchedule">
                    Создать
                  </v-btn>
                </v-col>
              </v-expand-transition>
            </v-row>
          </v-form>
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
          Подтвердите, что вы хотите удалить расписание для аквариума "{{ schedules[curScheduleIndex].tank.name }}"
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="removeSchedule"
          >
            Удалить
          </v-btn>
          <v-btn text @click="dialogRemove = false">
            Отменить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          bottom
          right
          color="primary"
          dark
          fab
          fixed
          @click="openAddSchedule"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить расписание</span>
    </v-tooltip>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Schedule from '@/components/Schedule.vue'

export default {
  name: 'schedules',
  components: { Schedule },
  data () {
    return {
      tank: null,
      recipesSelected: [],
      datesRange: [],
      selected: {},
      completed: {},
      curScheduleIndex: null,
      dialog: false,
      dialogRemove: false,
      rulesDays: [
        v => v >= 2 || 'Период должен быть больше одного дня'
      ],
      rulesTank: [
        v => !!v || 'Выберите аквариум',
        v => (!this.isExist || this.isSame) || 'Расписание для данного аквариума уже существует. Завершите цель или выберите другой аквариум.'
      ]
    }
  },
  created () {
    const duration = 6
    let dateStart = new Date().toISOString().split('T')[0]
    let dateFinish = new Date()
    dateFinish = new Date(dateFinish.setDate(dateFinish.getDate() + duration))
    dateFinish = dateFinish.toISOString().split('T')[0]
    this.datesRange = [dateStart, dateFinish]
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'schedules'
    ]),
    isExist () {
      let names = this.schedules.map(item => item.tank.name)
      if (!this.tank) {
        return
      }
      return names.findIndex(item => item === this.tank.name) !== -1
    },
    isSame () {
      let names = this.schedules.map(item => item.tank.name)
      return names.findIndex(item => item === this.tank.name) === this.curScheduleIndex
    },
    isAmount () {
      return this.recipesSelected.find(x => x.amount !== undefined)
    },
    totalElements () {
      let result = {}
      for (let recipe of this.recipesSelected) {
        for (let ion in recipe.concentration) {
          if (!(ion in result)) {
            result[ion] = 0
          }
          if (recipe.amount) {
            result[ion] += recipe.concentration[ion] / this.tank.volume * recipe.amount
          }
        }
      }
      return result
    },
    datesRangeSorted () {
      let datesRange = this.datesRange.slice()
      datesRange.sort()
      return datesRange
    },
    datesColumn () {
      let range = []
      let startDate = new Date(this.datesRangeSorted[0])
      for (let i = 0; i < this.daysTotal; i++) {
        let day = startDate.toLocaleDateString('ru-Ru', { month: 'numeric', day: 'numeric' })
        let weekday = startDate.toLocaleDateString('ru-Ru', { weekday: 'short' })
        range.push({
          weekday: weekday,
          date: day
        })
        startDate = new Date(startDate.setDate(startDate.getDate() + 1))
      }
      return range
    },
    daysTotal () {
      if (this.datesRangeSorted.length < 2) {
        return 0
      }
      return (new Date(this.datesRangeSorted[1]) - new Date(this.datesRangeSorted[0])) / (1000 * 3600 * 24) + 1
    },
    daysSuffix () {
      let word = 'дней'
      if ([2, 3, 4].includes(this.daysTotal)) {
        word = 'дня'
      }
      return word
    },
    daysQuotas () {
      let quotas = {}
      for (const recipe of this.recipesSelected) {
        let result = []
        let selectedList = this.selected[recipe.name]
        let excludedTotal = selectedList.filter(x => x === false).length
        let daysLeft = this.daysTotal - excludedTotal
        let amount = recipe.amount
        let currentDay = amount / (this.daysTotal - excludedTotal)
        for (const index in [...Array(this.daysTotal)]) {
          switch (true) {
            case !selectedList[index]:
              currentDay = 0
              break
            default:
              currentDay = amount / daysLeft
          }
          result.push(currentDay)
        }
        quotas[recipe.name] = result
      }
      return quotas
    }
  },
  watch: {
    daysTotal () {
      this.fillDays()
    },
    recipesSelected () {
      this.fillDays()
    },
    dialogRemove () {
      if (!this.dialogRemove) {
        this.curScheduleIndex = null
      }
    }
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_ADD', 'SCHEDULE_EDIT', 'SCHEDULE_REMOVE'
    ]),
    fillDays () {
      for (const recipe of this.recipesSelected) {
        Vue.set(this.selected, recipe.name, Array(this.daysTotal).fill(true, 0, this.daysTotal))
        Vue.set(this.completed, recipe.name, Array(this.daysTotal).fill(0, 0, this.daysTotal))
      }
    },
    resetComponent () {
      this.tank = null
      this.recipesSelected = []
      this.curScheduleIndex = null
      this.dialog = false
      this.datesRange = []
      this.selected = {}
      this.completed = {}
    },
    inputRecipeAmount (index) {
      let recipe = this.recipesSelected[index]
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: event.target.value
      })
    },
    openAddSchedule () {
      if (this.$refs.scheduleForm) {
        this.$refs.scheduleForm.resetValidation()
      }
      this.dialog = true
    },
    addSchedule () {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_ADD({
          tank: this.tank,
          recipesSelected: [...this.recipesSelected],
          datesRange: this.datesRange,
          daysTotal: this.daysTotal,
          datesColumn: [...this.datesColumn],
          selected: Object.assign({}, this.selected),
          completed: Object.assign({}, this.completed)
        })
        this.resetComponent()
      }
    },
    openRemoveDialog (index) {
      this.curScheduleIndex = index
      this.dialogRemove = true
    },
    removeSchedule () {
      this.SCHEDULE_REMOVE(this.curScheduleIndex)
      this.dialogRemove = false
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
