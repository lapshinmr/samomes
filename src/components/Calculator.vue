<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="text-center my-4">Калькулятор удобрений для аквариума</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-8">

        <recipe :tanks="tanks" @save-recipe="recipes.push($event)"/>

      </div>
      <div class="col-4">

        <tank @add-tank="tanks.push($event)" />

        <div v-for="(volume, index) in tanks" :key="volume" class="d-flex justify-content-between mt-3">
          <div>
            {{ volume }} л
          </div>
          <div @click="tanks.pop(index)" style="cursor: pointer">
            удалить
          </div>
        </div>
      </div>
    </div>

    <!--
    <schedule :tankVolume="tankVolume" :syringe="syringe"/>
    -->

  </div>
</template>

<script>
// import Schedule from './Schedule.vue'
import Recipe from './Recipe.vue'
import Tank from './Tank.vue'

export default {
  name: 'Calculator',
  components: { Recipe, Tank },
  data () {
    return {
      tanks: [],
      recipes: []
    }
  },
  created () {
    let data = JSON.parse(localStorage.getItem('data'))
    if (data && data.tanks.length > 0) {
      this.tanks = data.tanks
    }
  },
  watch: {
    tanks () {
      let data = JSON.parse(localStorage.getItem('data')) || {}
      data['tanks'] = this.tanks
      localStorage.setItem('data', JSON.stringify(data))
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
