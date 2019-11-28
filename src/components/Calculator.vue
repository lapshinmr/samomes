<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="text-center my-4">Калькулятор удобрений для аквариума</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-8">
        <template v-for="reagent in reagents">
          <input type="radio" v-model="reagentSelected" :value="reagent" :key="reagent + 'input'">
          <label :key="reagent + 'label'">{{ reagent }}</label>
        </template>
      </div>

      <div class="col-8">

        <recipe
            v-for="reagent in reagents"
            v-show="reagent === reagentSelected"
            :tank-volume="tankSelected"
            :reagentSelected="reagent"
            :key="reagent"
            @save-recipe="saveRecipe($event)"
        />

      </div>
      <div class="col-4">

        <tank @add-tank="tanks.push($event)" />

        <tanks
            :tanks="tanks"
            :tank-selected="tankSelected"
            :select-tank="selectTank"
            :remove-tank="removeTank"
        />

      </div>
    </div>

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

  </div>
</template>

<script>
import Vue from 'vue'
import Tank from './Tank.vue'
import Tanks from './Tanks.vue'
import Recipe from './Recipe.vue'
import TankRecipes from './TankRecipes.vue'
import Schedule from './Schedule.vue'

export default {
  name: 'Calculator',
  components: { Recipe, Tank, Tanks, TankRecipes, Schedule },
  data () {
    return {
      reagents: ['KNO3', 'KH2PO4', 'K2SO4'],
      reagentSelected: 'KNO3',
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
</style>
