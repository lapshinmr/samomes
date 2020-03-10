<template>
  <v-container>

    <v-row>
      <v-col cols="12">
        <Schedule
          v-for="schedule in schedules"
          :schedule="schedule"
          :key="schedule.tank.name"
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
          <v-toolbar-title v-if="isEditing">Новое расписание</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              v-if="isEditing"
              text
              dark
              @click="removeSchedule"
            >Удалить</v-btn>
            <v-btn
              v-if="!isEditing"
              dark
              text
              @click="addSchedule"
            >
              Создать
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
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
                      hide-selected
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
                  <v-col v-if="tank && recipesSelected.length > 0" cols="12">
                    <h6>Повышение концентрации в аквариуме</h6>
                    <div v-for="(value, name) in totalElements" :key="name" class="d-flex justify-content-between">
                      <span>{{ name }}</span>
                      <span>{{ value !== undefined ? value.toFixed(2) : 0 }} мг/л</span>
                    </div>
                  </v-col>
                </v-expand-transition>
                <v-expand-transition>
                  <v-col  v-if="tank && recipesSelected.length > 0" cols="12">
                    <v-text-field
                      v-model.number="daysTotal"
                      label="Введите длительность периода"
                      hint="Выберите количество дней, в течении которых будут вноситься удобрения"
                      :suffix="daysSuffix"
                      :rules="rulesDays"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                </v-expand-transition>
                <template v-if="daysTotal && recipesSelected.length > 0">
                  <v-col v-for="(quotas, recipeName) in daysQuotas" :key="recipeName">
                    <v-card>
                      <v-card-title>
                        {{ recipeName }}
                      </v-card-title>
                      <v-card-text>
                        <v-list two-line flat>
                          <v-list-item-group>
                            <v-list-item v-for="(day, index) in quotas"  :key="recipeName + index">
                              <template>
                                <v-list-item-action>
                                  <v-checkbox
                                    color="primary"
                                    v-model="selected[recipeName][index]"
                                  ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ isNaN(day) ? '-' : day.toFixed(2) + 'мл' }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
                                </v-list-item-content>
                              </template>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </template>
                <!--
                <v-col cols="12">
                  <v-date-picker v-model="dates" locale="ru" no-title scrollable first-day-of-week="1" range></v-date-picker>
                </v-col>
                <v-col cols="12">
                  <v-text-field :value="dates" label="Date range" readonly></v-text-field>
                </v-col>
                -->
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
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
          @click="dialog = !dialog"
          v-on="on"
        >
          <v-icon>mdi-calendar-plus</v-icon>
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
      daysTotal: 7,
      completed: {},
      selected: {},
      skipped: {},
      curScheduleIndex: null,
      dialog: false,
      rulesDays: [
        v => v >= 2 || 'Период должен быть больше одного дня'
      ],
      rulesTank: [
        v => !!v || 'Выберите аквариум',
        v => (!this.isExist || this.isSame) || 'Расписание для данного аквариума уже существует. Завершите цель или выберите другой аквариум.'
      ]
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'schedules'
    ]),
    isExist () {
      let names = this.schedules.map(item => item.tank.name)
      return names.findIndex(item => item === this.tank.name) !== -1
    },
    isSame () {
      let names = this.schedules.map(item => item.tank.name)
      return names.findIndex(item => item === this.tank.name) === this.curScheduleIndex
    },
    isEditing () {
      return this.curScheduleIndex !== null
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
    daysSuffix () {
      let word = 'дней'
      if ([2, 3, 4].includes(this.daysTotal)) {
        word = 'дня'
      }
      return word
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
        let amount = recipe.amount
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
    }
  },
  watch: {
    daysTotal () {
      this.fillDays()
    },
    recipesSelected () {
      this.fillDays()
    }
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_ADD', 'SCHEDULE_EDIT', 'SCHEDULE_REMOVE'
    ]),
    fillDays () {
      for (const recipe of this.recipesSelected) {
        Vue.set(this.completed, recipe.name, Array(this.daysTotal).fill(false, 0, this.daysTotal))
        Vue.set(this.selected, recipe.name, Array(this.daysTotal).fill(true, 0, this.daysTotal))
        Vue.set(this.skipped, recipe.name, Array(this.daysTotal).fill(false, 0, this.daysTotal))
      }
    },
    resetComponent () {
      this.tank = null
      this.daysTotal = 7
      this.recipesSelected = []
      this.curScheduleIndex = null
      this.dialog = false
    },
    setComponent (index) {
      let schedule = this.schedules[index]
      this.tank = schedule.tank
      this.daysTotal = schedule.daysTotal
      this.recipesSelected = schedule.recipesSelected
      this.curScheduleIndex = index
      this.dialog = true
    },
    inputRecipeAmount (index) {
      let recipe = this.recipesSelected[index]
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: event.target.value
      })
    },
    addSchedule () {
      if (this.$refs.scheduleForm.validate()) {
        this.SCHEDULE_ADD({
          tank: this.tank,
          daysTotal: this.daysTotal,
          recipesSelected: [...this.recipesSelected]
        })
        this.resetComponent()
      }
    },
    removeSchedule () {
      this.SCHEDULE_REMOVE(this.curScheduleIndex)
      this.resetComponent()
    },
    excludeDay (recipeName, index) {
      // let isSkipped = this.completed[recipeName].some(x => x === true)
      // if (!this.completed[recipeName][index]) {
      //   if (isSkipped && !this.excluded[recipeName][index]) {
      //     let value = this.skipped[recipeName][index]
      //     this.skipped[recipeName][index] = !value
      //     this.skipped = Object.assign({}, this.skipped)
      //   }
      //   if (!isSkipped) {
      let value = this.excluded[recipeName][index]
      this.excluded[recipeName][index] = !value
      this.excluded = Object.assign({}, this.excluded)
      console.log(this.excluded)
      // }
      // }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
