<template>
  <div class="row mt-4">
    <div class="col-12">
      <h3>{{ tankVolume }}</h3>
    </div>
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

      <div class="flex-fill">
        <h6>
          Влито
        </h6>
        <div
            v-for="(item, index) in total"
            :key="index"
            class="schedule__cell"
        >
          {{ item.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  props: [ 'recipesSelected', 'tankVolume' ],
  data () {
    return {
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      completed: {},
      excluded: {},
      skipped: {}
    }
  },
  computed: {
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
    total () {
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
    },
    daysTotal () {
      return this.days.length
    }
  },
  created () {
    for (const recipe of this.recipesSelected) {
      this.completed[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
      this.excluded[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
      this.skipped[recipe.name] = Array(this.daysTotal).fill(false, 0, this.daysTotal)
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
    }
  }
}
</script>

<style lang="sass" scoped>
.schedule__cell
  font-size: 12px
.schedule__amount
  cursor: pointer
  &.completed
    background-color: gray
</style>
