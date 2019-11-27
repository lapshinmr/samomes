<template>
  <div class="row mt-4">
    <div class="col-12 d-flex">

      <div class="flex-fill">
        <h6>
          Рецепт
        </h6>
        <div v-for="(recipe, index) in recipesSelected" :key="recipe.name + index">
          {{ recipe.name }}
        </div>
      </div>

      <div v-for="(day, index) in days" :key="day" class="flex-fill schedule__day">
        <h6>{{ day }}</h6>
        <div
            v-for="recipe in recipesSelected"
            :key="recipe.name + index"
            class="schedule__amount d-flex justify-content-around"
              :class="{
                'bg-success': completed[recipe.name] && completed[recipe.name][index],
                'bg-secondary': excluded[recipe.name] && excluded[recipe.name][index]
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

      <div class="flex-fill">
        <h6>
          Влито
        </h6>
        <div v-for="(item, index) in total" :key="index">
          {{ item.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  props: [ 'recipesSelected' ],
  data () {
    return {
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      completed: {},
      excluded: {}
    }
  },
  computed: {
    daysQuotas () {
      let quotas = {}
      for (const recipe of this.recipesSelected) {
        let result = []
        let excludeList = this.excluded[recipe.name]
        console.log(recipe.name, this.excluded)
        // let completeList = this.completed[recipeName]
        let excludedTotal = this.excluded[recipe.name].filter(x => x === true).length
        for (const index in excludeList) {
          result.push(!excludeList[index] ? recipe.amount / (this.daysTotal - excludedTotal) : 0)
        }
        quotas[recipe.name] = result
      }
      console.log(quotas)
      return quotas
    },
    total () {
      let result = []
      for (const recipe of this.recipesSelected) {
        if (this.completed[recipe.name] && this.completed[recipe.name]) {
          result.push(
            recipe.amount / this.daysTotal * this.completed[recipe.name].filter(x => x === true).length
          )
        } else {
          result.push(0)
        }
      }
      return result
    },
    daysTotal () {
      return this.days.length
    }
  },
  watch: {
    recipesSelected () {
      let update = false
      for (const recipe of this.recipesSelected) {
        if (!(recipe.name in this.completed)) {
          this.completed[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
          this.excluded[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
          update = true
        }
      }
      if (update) {
        this.completed = Object.assign({}, this.completed)
        this.excluded = Object.assign({}, this.excluded)
      }
      console.log('+')
    }
  },
  methods: {
    confirmDay (recipeName, index) {
      if (!this.excluded[recipeName][index]) {
        let value = this.completed[recipeName][index]
        this.completed[recipeName][index] = !value
        this.completed = Object.assign({}, this.completed)
      }
    },
    excludeDay (recipeName, index) {
      if (!this.completed[recipeName][index]) {
        let value = this.excluded[recipeName][index]
        this.excluded[recipeName][index] = !value
        this.excluded = Object.assign({}, this.excluded)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.schedule__day
  font-size: 12px
.schedule__amount
  cursor: pointer
  &.completed
    background-color: gray
</style>
