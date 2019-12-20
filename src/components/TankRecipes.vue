<template>
  <div class="row schedule pb-4">
    <div class="col-12">
      <h2>Цель на неделю</h2>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col">
          <h6>Аквариум</h6>
          <div v-for="(tank, index) in tanks"
              @click="selectTank(index)"
              :key="tank.name">
            {{ tank.name }}
            <span v-if="tankSelected.name === tank.name">+</span>
          </div>
        </div>
        <div class="col">
          <h6>Рецепт</h6>
          <div v-for="(recipeSelected, index) in recipesSelected" class="d-flex justify-content-between" :key="index">
            <select @input="selectRecipe(index)">
              <option disabled value="" selected>Выберите рецепт</option>
              <option v-for="recipe in recipes" :key="recipe.name">
                {{ recipe.name }}
              </option>
            </select>
            <div class="d-flex align-items-center">
              <input
                  type="number"
                  :value="recipeSelected.amount"
                  @input="inputRecipeAmount(index)"
                  class="schedule__amount"
              >
              <span>
                мл
              </span>
            </div>
          </div>
          <button @click="addRecipe">
            Добавить удобрение
          </button>
        </div>
        <div class="col">
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
      <div class="row">
        <div class="col">
          <button class="btn btn-outline-success" @click="addToSchedule">
            Добавить в расписание
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'tank-recipes',
  props: {
    'tanks': Array,
    'recipes': Array
  },
  data () {
    return {
      recipesSelected: [],
      tankSelected: null
    }
  },
  created () {
    if (this.tanks.length > 0) {
      this.tankSelected = this.tanks[0]
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
        for (let ion in recipe.recipe.solute) {
          result[ion] += recipe.recipe.solute[ion] * recipe.amount
        }
      }
      return result
    }
  },
  methods: {
    selectTank (value) {
      this.tankSelected = value
    },
    addRecipe () {
      this.recipesSelected.push(
        {
          name: '',
          recipe: {},
          amount: 0
        }
      )
    },
    selectRecipe (index) {
      Vue.set(this.recipesSelected, index, {
        amount: this.recipesSelected[index].amount,
        recipe: this.recipes[index],
        name: this.recipes[index].name
      })
    },
    inputRecipeAmount (index) {
      Vue.set(this.recipesSelected, index, {
        amount: event.target.value,
        recipe: this.recipesSelected[index].recipe,
        name: this.recipesSelected[index].name
      })
    },
    addToSchedule () {
      return this.$emit('add-to-schedule', {
        tankVolume: this.tankSelected,
        recipesSelected: [...this.recipesSelected]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .schedule__amount
    width: 45px
    display: block
</style>
