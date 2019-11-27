<template>
  <div>
    <div class="form-group">
      <label>Объем аквариума (л)</label>
    </div>
    <div class="form-group">
      <input v-model.number="tankVolume" type="text" class="form-control" placeholder="Объем">
    </div>
    <div class="form-group">
      <template v-if="isTankVolumeCalc">
        <input v-model="tankLength" type="text" class="form-control mb-1" placeholder="Длина, см">
        <input v-model="tankHeight" type="text" class="form-control mb-1" placeholder="Высота, см">
        <input v-model="tankWidth" type="text" class="form-control mb-1" placeholder="Ширина, см">
        <input v-model="tankGlassThickness" type="text" class="form-control" placeholder="Толщина стекла, мм">
      </template>
    </div>
    <button class="btn btn-outline-success btn-block" @click="$emit('add-tank', tankVolume)">
      Добавить аквариум
    </button>
    <button v-if="!isTankVolumeCalc" class="btn btn-link" @click="isTankVolumeCalc = true">
      Расчитать объем аквариума
    </button>
  </div>
</template>

<script>
export default {
  name: 'tank',
  data () {
    return {
      tankVolume: 0,
      tankLength: null,
      tankHeight: null,
      tankWidth: null,
      tankGlassThickness: null,
      isTankVolumeCalc: false,
      amount: 0
    }
  },
  computed: {
    tankDimensions () {
      return `${this.tankLength}|${this.tankHeight}|${this.tankWidth}|${this.tankGlassThickness}`
    }
  },
  watch: {
    tankDimensions () {
      if (this.tankLength && this.tankHeight && this.tankWidth) {
        this.tankVolume = Math.round(
          (this.tankLength - 2 * this.tankGlassThickness / 10) *
          this.tankHeight *
          (this.tankWidth - 2 * this.tankGlassThickness / 10) / 1000 *
          100
        ) / 100
      } else {
        this.tankVolume = 0
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
