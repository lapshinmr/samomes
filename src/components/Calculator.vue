<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Калькулятор удобрений для аквариума</h1>
      </div>
    </div>

    <tank-volume />

    <recipe />

    <schedule :tankVolume="tankVolume" :syringe="syringe"/>

  </div>
</template>

<script>
import Schedule from './Schedule.vue'
import Recipe from './Recipe.vue'
import TankVolume from './TankVolume.vue'

export default {
  name: 'Calculator',
  components: { Schedule, Recipe, TankVolume },
  data () {
    return {
      formulas: ['KNO3', 'KH2PO4', 'K2SO4'],
      formulaSelected: 'KNO3',
      tankVolume: 100,
      isTankVolumeCalc: false,
      isHoldConcentration: false,
      concentration: 0,
      syringe: 0,
      amount: 0
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
