<template>
  <v-container>
    <div class="col-12 d-flex">
      <div class="flex-fill">
        <h6>
          Рецепт
        </h6>
        <div
            v-for="(recipe, index) in recipesSelected"
            :key="recipe.name + index"
            class="schedule__cell"
        >
          {{ recipe.name }}
        </div>
      </div>

      <!--
      <div
          v-for="(day, index) in days"
          :key="day"
          class="flex-fill schedule__cell"
      >
        <h6>{{ day }}</h6>
        <div
            v-for="recipe in recipesSelected"
            :key="recipe.name + index"
            class="schedule__amount d-flex justify-content-around"
              :class="{
                'text-success': completed[recipe.name] && completed[recipe.name][index],
                'text-muted': excluded[recipe.name] && excluded[recipe.name][index],
                'text-info': skipped[recipe.name] && skipped[recipe.name][index]
              }"
        >
          <div
              @click="confirmDay(recipe.name, index)"
          >
            {{ (daysQuotas[recipe.name][index]).toFixed(1) }} мл
          </div>
          <div
              @click="excludeDay(recipe.name, index)"
          >
            -
          </div>
        </div>
      </div>
      -->

      <div class="flex-fill">
        <h6>
          Влито
        </h6>
        <div
            v-for="(item, index) in totalSum"
            :key="index"
            class="schedule__cell"
        >
          {{ item.toFixed(2) }}
        </div>
      </div>
    </div>

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
              v-if="isEditing"
              dark
              text
              @click="editSchedule"
            >Сохранить</v-btn>
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
                    v-model="tankVolume"
                    item-text="name"
                    item-value="volume"
                    label="Выберите аквариум"
                    persistent-hint
                    hide-selected
                    hint="Выберите аквариум, для которого будет составлено расписание"
                  ></v-select>
                </v-col>
                <v-expand-transition>
                  <v-col v-if="tankVolume" cols="12">
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
                  <v-col v-if="tankVolume && recipesSelected.length > 0" cols="12">
                    <h6>Повышение концентрации в аквариуме</h6>
                    <div v-for="(value, name) in totalElements" :key="name" class="d-flex justify-content-between">
                      <span>{{ name }}</span>
                      <span>{{ value !== undefined ? value.toFixed(2) : 0 }} мг/л</span>
                    </div>
                  </v-col>
                </v-expand-transition>
                <v-col cols="12">
                  <v-date-picker v-model="dates" locale="ru" no-title scrollable first-day-of-week="1" range></v-date-picker>
                </v-col>
                <v-col cols="12">
                  <v-text-field :value="dates" label="Date range" readonly></v-text-field>
                </v-col>
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

export default {
  name: 'tank-recipes',
  data () {
    return {
      tankVolume: null,
      recipesSelected: [],
      dates: [],
      completed: {},
      excluded: {},
      skipped: {},
      dialog: false
    }
  },
  created () {
    if (this.tanks.length > 0) {
      this.tankSelected = this.tanks[0]
    }
    for (const recipe of this.recipesSelected) {
      this.completed[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
      this.excluded[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
      this.skipped[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes'
    ]),
    isEditing () {
      return true
    },
    totalElements () {
      let result = {}
      for (let recipe of this.recipesSelected) {
        for (let ion in recipe.concentration) {
          if (!(ion in result)) {
            result[ion] = 0
          }
          if (recipe.amount) {
            result[ion] += recipe.concentration[ion] / this.tankVolume * recipe.amount
          }
        }
      }
      return result
    },
    daysTotal () {
      if (this.dates.length === 2) {

      }
      return this.days.length
    },
    daysQuotas () {
      let quotas = {}
      for (const recipe of this.recipesSelected) {
        let result = []
        let excludeList = this.excluded[recipe.name]
        let completeList = this.completed[recipe.name]
        let skipList = this.skipped[recipe.name]
        let excludedTotal = excludeList.filter(x => x === true).length
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
            case excludeList[index]:
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
        result.push(sum)
      }
      return result
    }
  },
  watch: {
    recipesSelected (newValue, oldValue) {
      for (const recipe of newValue.slice(oldValue.length, newValue.length)) {
        this.completed[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
        this.excluded[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
        this.skipped[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
      }
    }
  },
  methods: {
    ...mapMutations([
    ]),
    inputRecipeAmount (index) {
      let recipe = this.recipesSelected[index]
      Vue.set(this.recipesSelected, index, {
        ...recipe,
        amount: event.target.value
      })
    },
    confirmDay (recipeName, index) {
      if (!this.excluded[recipeName][index]) {
        let value = this.completed[recipeName][index]
        this.completed[recipeName][index] = !value
        this.completed = Object.assign({}, this.completed)
      }
    },
    excludeDay (recipeName, index) {
      let isSkipped = this.completed[recipeName].some(x => x === true)
      if (!this.completed[recipeName][index]) {
        if (isSkipped && !this.excluded[recipeName][index]) {
          let value = this.skipped[recipeName][index]
          this.skipped[recipeName][index] = !value
          this.skipped = Object.assign({}, this.skipped)
        }
        if (!isSkipped) {
          let value = this.excluded[recipeName][index]
          this.excluded[recipeName][index] = !value
          this.excluded = Object.assign({}, this.excluded)
        }
      }
    },
    addSchedule () {
      if (this.$refs.recipeForm.validate()) {
        this.SCHEDULE_ADD({
          tankVolume: this.tankVolume,
          recipesSelected: [...this.recipesSelected]
        })
        this.resetComponent()
      }
    },
    editSchedule () {},
    removeSchedule () {}
  }
}
</script>

<style lang="sass" scoped>
</style>
