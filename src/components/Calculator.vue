<template>
  <div class="">

    <section v-if="tanks.length > 0" class="box bg-blue bg-parallax">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center text-white p-3">
              Рецепты
            </h2>
            <recipe
                :tanks="tanks"
                :recipes="recipes"
                :remove-recipe="removeRecipe"
                @save-recipe="saveRecipe($event)"
            />
          </div>
        </div>
      </div>
    </section>

    <section v-if="tanks.length > 0 && recipes.length > 0" class="box bg-emerald bg-parallax">
      <tank-recipes
          :tanks="tanks"
          :recipes="recipes"
          @add-to-schedule="addToSchedule($event)"
      />
      <schedule
          v-for="(recipes, tankVolume) in recipesSelected"
          :recipesSelected="recipes"
          :tankVolume="tankVolume"
          :key="tankVolume"
      />
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Recipe from './Recipe.vue'
import TankRecipes from './TankRecipes.vue'
import Schedule from './Schedule.vue'

export default {
  name: 'Calculator',
  components: { Recipe, TankRecipes, Schedule },
  data () {
    return {
      tanks: [],
      recipes: [],
      tankSelected: null,
      recipesSelected: {}
    }
  },
  created () {
    let data = JSON.parse(localStorage.getItem('data'))
    if (data) {
      if (data.tanks.length > 0) {
        this.tanks = data.tanks
        this.tankSelected = data.tanks[0]
      }
      this.recipes = data.recipes || []
    }
  },
  watch: {
    tanks () {
      let data = JSON.parse(localStorage.getItem('data')) || {}
      data['tanks'] = this.tanks
      localStorage.setItem('data', JSON.stringify(data))
    },
    recipes () {
      let data = JSON.parse(localStorage.getItem('data')) || {}
      data['recipes'] = this.recipes
      localStorage.setItem('data', JSON.stringify(data))
    }
  },
  methods: {
    saveRecipe (recipe) {
      console.log(recipe, this.recipes)
      this.recipes.push(recipe)
    },
    selectTank (volume) {
      this.tankSelected = volume
    },
    removeTank (index) {
    },
    removeRecipe (index) {
      this.recipes.splice(index, 1)
    },
    addToSchedule (value) {
      Vue.set(this.recipesSelected, value.tankVolume, value.recipesSelected)
    }
  }
}
</script>

<style lang="sass" scoped>
.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s
</style>
