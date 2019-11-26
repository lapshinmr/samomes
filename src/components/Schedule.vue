<template>
  <div class="row schedule pb-4">
    <div class="col-12">
      <h2>Расписание</h2>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <h6>Аквариум</h6>
          {{ tankVolume }}
        </div>
        <div class="col-4">
          <h6>Рецепт</h6>
          <div v-for="(recipeSelected, index) in recipesSelected" class="d-flex justify-content-between" :key="index">
            <select :value="recipesSelected[index]" @change="selectRecipe(index)">
              <option v-for="(recipe, name) in recipes" :key="name" :value="name">
                {{ name }}
              </option>
            </select>
            <div class="d-flex align-items-center">
              <input
                  type="text"
                  v-model="recipeSelected.amount"
                  class="schedule__amount"
              >
              <span>
                мл
              </span>
            </div>
          </div>
          <button @click="addRecipe">add</button>
        </div>
        <div class="col-6">
          <h6>Итото повышение в аквариуме</h6>
          <div>
            <div>
              NO3:
              {{ (total.NO3).toFixed(2) }} мг/л
            </div>
            <div>
              PO4:
              {{ (total.PO4).toFixed(2) }} мг/л
            </div>
            <div>
              K:
              {{ (total.K).toFixed(2) }} мг/л
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day" class="col-1 schedule__day">
          <h6>{{ day }}</h6>
          <div>
            <div>
              <div>
                NO3
              </div>
              <div>
                {{ }} мл
              </div>
            </div>
            <div>PO4 </div>
            <div>K {{  }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  props: {
    'tankVolume': Number,
    'recipes': Object
  },
  data () {
    return {
      recipesSelected: [],
      amounts: []
    }
  },
  computed: {
    total () {
      let result = {
        NO3: 0,
        PO4: 0,
        K: 0
      }
      for (let recipe of this.recipesSelected) {
        for (let ion in recipe) {
          result[ion] += recipe[ion] * recipe.amount
        }
      }
      return result
    }
  },
  methods: {
    addRecipe () {
      this.recipesSelected.push(
        {
          recipe: {},
          amount: 0
        }
      )
    },
    selectRecipe (index) {
      console.log(index, this.recipes[event.target.value])
    }
  }
}
</script>

<style lang="sass" scoped>
.schedule
  .schedule__day
    font-size: 10px
  .schedule__amount
    width: 25px
    display: block
  .col-1, .col-2
    padding: 0
</style>
