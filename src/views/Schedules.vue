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
                  <v-col cols="12" v-if="tank">
                    <v-text-field
                      v-model.number="days"
                      label="Введите длительность периода"
                      hint="Выберите количество дней, в течении которых будут вноситься удобрения"
                      :suffix="daysSuffix"
                      :rules="rulesDays"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                </v-expand-transition>
                <v-expand-transition>
                  <v-col v-if="tank && days" cols="12">
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
      days: 7,
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
      if ([2, 3, 4].includes(this.days)) {
        word = 'дня'
      }
      return word
    },
    recipesSelectedProgress () {
      let result = {
        completed: {},
        excluded: {},
        skipped: {}
      }
      for (const recipe of this.recipesSelected) {
        result.completed[recipe.name] = Array(this.days).fill(false, 0, this.days)
        result.excluded[recipe.name] = Array(this.days).fill(false, 0, this.days)
        result.skipped[recipe.name] = Array(this.days).fill(false, 0, this.days)
      }
      return result
    }
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_ADD', 'SCHEDULE_EDIT', 'SCHEDULE_REMOVE'
    ]),
    resetComponent () {
      this.tank = null
      this.days = 7
      this.recipesSelected = []
      this.curScheduleIndex = null
      this.dialog = false
    },
    setComponent (index) {
      let schedule = this.schedules[index]
      this.tank = schedule.tank
      this.days = schedule.days
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
          days: this.days,
          recipesSelected: [...this.recipesSelected],
          recipesSelectedProgress: this.recipesSelectedProgress
        })
        this.resetComponent()
      }
    },
    removeSchedule () {
      this.Schedule_REMOVE(this.curScheduleIndex)
      this.resetComponent()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
