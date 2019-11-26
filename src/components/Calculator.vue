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

        <div v-for="(volume, index) in tanks" :key="volume" class="d-flex justify-content-between mt-3">
          <div @click="tankSelected = volume" style="cursor: pointer" >
            {{ volume }} л
          </div>
          <div v-if="tankSelected === volume">+</div>
          <div @click="tanks.splice(index, 1)" style="cursor: pointer">
            удалить
          </div>
        </div>

      </div>
    </div>

    <schedule :tankVolume="tankSelected" :recipes="recipes"/>

  </div>
</template>

<script>
import Vue from 'vue'
import Schedule from './Schedule.vue'
import Recipe from './Recipe.vue'
import Tank from './Tank.vue'

export default {
  name: 'Calculator',
  components: { Recipe, Tank, Schedule },
  data () {
    return {
      reagents: ['KNO3', 'KH2PO4', 'K2SO4'],
      reagentSelected: 'KNO3',
      recipes: {},
      tanks: [],
      tankSelected: null
    }
  },
  created () {
    let data = JSON.parse(localStorage.getItem('data'))
    if (data && data.tanks.length > 0) {
      this.tanks = data.tanks
      this.tankSelected = data.tanks[0]
    }
  },
  watch: {
    tanks () {
      let data = JSON.parse(localStorage.getItem('data')) || {}
      data['tanks'] = this.tanks
      localStorage.setItem('data', JSON.stringify(data))
    }
  },
  methods: {
    saveRecipe (recipe) {
      Vue.set(this.recipes, recipe.name, recipe.solute)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
