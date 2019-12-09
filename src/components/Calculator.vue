<template>
  <div class="">

    <section class="box bg-green bg-parallax">
      <h1 class="text-center text-white py-4">
        Калькулятор удобрений для аквариума
      </h1>
    </section>

    <section class="box bg-yellow bg-parallax">
      <h2 class="text-center text-white p-3">
        Аквариумы
      </h2>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <tanks
                @add-tank="tanks.push($event)"
                :tanks="tanks"
                :remove-tank="removeTank"
                class="mb-2"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="box bg-blue bg-parallax">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center text-white p-3">
              Рецепты
            </h2>
            <recipe
                :tanks="tanks"
                @save-recipe="saveRecipe($event)"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="box bg-emerald bg-parallax">
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
import Tanks from './Tanks.vue'
import Recipe from './Recipe.vue'
import TankRecipes from './TankRecipes.vue'
import Schedule from './Schedule.vue'

export default {
  name: 'Calculator',
  components: { Recipe, Tanks, TankRecipes, Schedule },
  data () {
    return {
      recipes: {},
      tanks: [],
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
      this.recipes = data.recipes || {}
    }
  },
  watch: {
    tanks () {
      let data = JSON.parse(localStorage.getItem('data')) || {}
      console.log(this.tanks)
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
      this.recipes[recipe.name] = recipe.concentration
      this.recipes = Object.assign({}, this.recipes)
    },
    selectTank (volume) {
      this.tankSelected = volume
    },
    removeTank (index) {
      this.tanks.splice(index, 1)
    },
    addToSchedule (value) {
      Vue.set(this.recipesSelected, value.tankVolume, value.recipesSelected)
    }
  }
}
</script>

<style lang="sass" scoped>
section
  color: white

.bg-parallax
  background-attachment: fixed
  background-position: center
  background-repeat: no-repeat
  background-size: cover
.box
  min-height: 100vh
.bg-yellow
  background-color: #f1c40f
  background-image: url("../assets/bg-yellow.png")
.bg-green
  background-color: #2ecc71
  background-image: url("../assets/bg-green.png")
.bg-emerald
  background-color: #1abc9c
  background-image: url("../assets/bg-emerald.png")
.bg-blue
  background-color: #3498db
  background-image: url("../assets/bg-blue.png")

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s
</style>
