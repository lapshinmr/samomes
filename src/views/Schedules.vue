<template>
  <v-container class="mb-12">
    <v-row>
      <v-col v-if="tanks.length === 0 || recipes.length === 0" cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          <template>
            У вас еще нет
          </template>
          <template v-if="tanks.length === 0">
             аквариума
          </template>
          <template v-if="tanks.length === 0 && recipes.length === 0">
            и
          </template>
          <template v-if="recipes.length === 0">
            рецептов
          </template>
        </p>
        <p>
          Необходимо
          <router-link v-if="tanks.length === 0" :to="{ name: 'tanks', params: { open: true }}">добавить аквариум</router-link>
          <template v-if="tanks.length === 0 && recipes.length === 0">
            и
          </template>
          <router-link v-if="recipes.length === 0" :to="{ name: 'recipes', params: { open: true }}">добавить рецепт</router-link>
          и после этого можно будет составлять расписание.
        </p>
      </v-col>
      <v-col v-if="schedules.length === 0 && tanks.length > 0 && recipes.length > 0" cols="12" md="8" offset-md="2">
        <p v-if="schedules.length === 0" class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          У вас нет ни одного расписания
        </p>
        <p>
          <a @click="dialog = true">Добавьте расписание</a> и вам будет проще
          следить за внесенным количеством удобрений.
        </p>
      </v-col>
      <v-col cols="12" md="8" offset-md="2">
        <Schedule
          v-for="(schedule, index) in schedules"
          :index="index"
          :key="schedule.tank.name"
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
        <v-toolbar dark color="primary">
          <v-toolbar-title v-if="!isEditing">
            Новое расписание
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Обзор расписания
          </v-toolbar-title>
          <v-btn icon dark @click="dialog = false" class="ml-auto">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
          <v-container>
            <v-row>
              <v-col cols="12" md="8" offset-md="2">
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
                        :disabled="isEditing"
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
                          :disabled="isEditing"
                        ></v-select>
                      </v-col>
                    </v-expand-transition>
                    <v-col v-if="recipesSelected.length > 0" cols="12">
                      <div :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}">
                        Выбранные рецепты
                      </div>
                      <div
                        v-for="(recipeSelected, index) in recipesSelected"
                        :key="index"
                        class="d-flex justify-space-between align-center"
                      >
                        <v-text-field
                          :value="recipeSelected.amount"
                          @input="inputRecipeAmount(index)"
                          :label="recipeSelected.name"
                          hint="Введите весь объем"
                          suffix="мл"
                          persistent-hint
                          :disabled="isEditing"
                          class="mr-3"
                        ></v-text-field>
                        <v-text-field
                          :value="daysTotal && recipeSelected.amount ? (recipeSelected.amount / daysTotal).toFixed(2) : ''"
                          @input="inputRecipeAmountDay(index)"
                          hint="или объем в день"
                          suffix="мл/день"
                          persistent-hint
                          :disabled="isEditing"
                        ></v-text-field>
                     </div>
                    </v-col>
                    <v-expand-transition>
                      <v-col v-if="isAmount" cols="12" class="pt-0">
                        <div v-for="(value, name) in totalElements" :key="name" class="d-flex justify-space-between">
                          <span>{{ convertIonName(name) }}</span>
                          <span>
                            <span>
                              {{ value !== undefined ? (convertIonRatio(name) * value).toFixed(2) : 0 }} мг/л
                              <template v-if="daysTotal">
                                ({{ value !== undefined ? (convertIonRatio(name) * value / daysTotal).toFixed(2) : 0 }} мг/л в день)
                              </template>
                            </span>
                          </span>
                        </div>
                        <div :class="{'caption': $vuetify.breakpoint['xs'], 'regular': $vuetify.breakpoint['smAndUp']}">
                          * повышение концентрации в аквариуме
                          <v-tooltip bottom max-width="400">
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                            </template>
                            Подбирая объем выбранных рецептов, вы можете получить необходимую концентрацию элементов в аквариуме.
                            Таким образом вы можете подобрать ориентировочное значение, которое "съедают" растения за заданный период времени.
                          </v-tooltip>
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
                          :disabled="isEditing"
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
                                    :disabled="isEditing"
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
                        <v-btn
                          @click="dialog = false"
                          class="mr-3"
                        >
                          Отменить
                        </v-btn>
                        <v-btn
                          v-if="isEditing"
                          color="primary"
                          @click="openRemoveDialog(curScheduleIndex)"
                        >
                          Удалить
                        </v-btn>
                        <v-btn
                          v-if="!isEditing"
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
            После нажатия кнопки "Удалить" будет предложено создать новое расписание с помощью ранее используемых рецептов.
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogRemove = false">
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

    <v-tooltip v-if="tanks.length > 0 && recipes.length > 0" left>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          fab
          @click="openAddSchedule(null)"
          v-on="on"
          fixed
          bottom
          right
          :class="{'drawer': drawer && $vuetify.breakpoint['smAndUp']}"
          style="transition: all 0.2s;"
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
import { convertIonName, convertIonRatio } from '../funcs.js'

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
    this.createDatesRange()
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'schedules', 'drawer'
    ]),
    isExist () {
      let names = this.schedules.map(item => item.tank.name)
      if (!this.tank) {
        return
      }
      return names.findIndex(item => item === this.tank.name) !== -1
    },
    isEditing () {
      return this.curScheduleIndex !== null
    },
    isSame () {
      let names = this.schedules.map(item => item.tank.name)
      return names.findIndex(item => item === this.tank.name) === this.curScheduleIndex
    },
    isAmount () {
      return this.recipesSelected.find(x => x.amount)
    },
    totalElements () {
      let result = {}
      for (let recipe of this.recipesSelected) {
        for (let reagent in recipe.concentration) {
          for (let ion in recipe.concentration[reagent]) {
            if (!(ion in result)) {
              result[ion] = 0
            }
            if (recipe.amount) {
              result[ion] += recipe.concentration[reagent][ion] / this.tank.volume * recipe.amount
            }
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
      if (!this.daysTotal) { return }
      for (const recipe of this.recipesSelected) {
        if (this.selected[recipe.name].length < this.daysTotal) {
          let delta = this.daysTotal - this.selected[recipe.name].length
          this.selected[recipe.name].push(...Array(delta).fill(true, 0, delta))
        } else {
          this.selected[recipe.name] = [ ...this.selected[recipe.name].slice(0, this.daysTotal) ]
        }
        Vue.set(this.completed, recipe.name, Array(this.daysTotal).fill(0, 0, this.daysTotal))
      }
    },
    recipesSelected () {
      let selected = {}
      for (const recipe of this.recipesSelected) {
        if (recipe.name in this.selected) {
          selected[recipe.name] = [ ...this.selected[recipe.name] ]
        } else {
          selected[recipe.name] = Array(this.daysTotal).fill(true, 0, this.daysTotal)
        }
        Vue.set(this.completed, recipe.name, Array(this.daysTotal).fill(0, 0, this.daysTotal))
      }
      this.selected = { ...selected }
    },
    dialogRemove () {
      if (!this.dialogRemove) {
        this.curScheduleIndex = null
      }
    }
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_ADD', 'SCHEDULE_EDIT', 'SCHEDULE_REMOVE', 'PROGRESS_REMOVE', 'SNACKBAR_SHOW'
    ]),
    convertIonName (ion) {
      return convertIonName(ion)
    },
    convertIonRatio (ion) {
      return convertIonRatio(ion)
    },
    createDatesRange () {
      const duration = 6
      let dateStart = new Date().toISOString().split('T')[0]
      let dateFinish = new Date()
      dateFinish = new Date(dateFinish.setDate(dateFinish.getDate() + duration))
      dateFinish = dateFinish.toISOString().split('T')[0]
      this.datesRange = [dateStart, dateFinish]
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
    setComponent (index) {
      let schedule = this.schedules[index]
      this.tank = schedule.tank
      this.recipesSelected = [ ...schedule.recipesSelected ]
      this.selected = { ...schedule.selected }
      this.createDatesRange()
    },
    inputRecipeAmount (index) {
      let recipe = this.recipesSelected[index]
      let value = parseFloat(event.target.value)
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !isNaN(value) ? value : ''
      })
    },
    inputRecipeAmountDay (index) {
      let recipe = this.recipesSelected[index]
      let value = parseFloat(event.target.value)
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: !isNaN(value) ? value * this.daysTotal : ''
      })
    },
    openAddSchedule (index = null) {
      if (index !== null) {
        this.curScheduleIndex = index
        this.setComponent(index)
      }
      if (this.$refs.scheduleForm) {
        this.$refs.scheduleForm.resetValidation()
      }
      this.dialog = true
    },
    addSchedule () {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_ADD({
          tank: this.tank,
          recipesSelected: [ ...this.recipesSelected ],
          datesRange: this.datesRange,
          daysTotal: this.daysTotal,
          datesColumn: [ ...this.datesColumn ],
          selected: { ...this.selected },
          completed: { ...this.completed }
        })
        this.resetComponent()
        this.SNACKBAR_SHOW('Расписание добавлено')
      }
    },
    openRemoveDialog (index) {
      this.curScheduleIndex = index
      this.dialogRemove = true
    },
    removeSchedule (reopen = false) {
      this.setComponent(this.curScheduleIndex)
      this.PROGRESS_REMOVE(this.tank.name)
      this.SCHEDULE_REMOVE(this.curScheduleIndex)
      this.dialogRemove = false
      this.dialog = true
      this.SNACKBAR_SHOW('Расписание удалено')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
