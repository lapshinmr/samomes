<template>
  <div>
    <div class="form-group">
      <label>Объем аквариума (л)</label>
    </div>
    <div class="form-row">
      <div class="col">
        <input v-model="tankVolume" type="text" class="form-control" placeholder="Объем">
      </div>
      <template v-if="isTankVolumeCalc">
        <div class="col">
          <input v-model="tankLength" type="text" class="form-control" placeholder="Длина, см">
        </div>
        <div class="col">
          <input v-model="tankHeight" type="text" class="form-control" placeholder="Высота, см">
        </div>
        <div class="col">
          <input v-model="tankWidth" type="text" class="form-control" placeholder="Ширина, см">
        </div>
        <div class="col">
          <input v-model="tankGlassThickness" type="text" class="form-control" placeholder="Толщина стекла, мм">
        </div>
      </template>
      <button v-else class="btn btn-link" @click="isTankVolumeCalc = true">
        Расчитать объем аквариума
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tank-volume',
  data () {
    return {
      tankLength: null,
      tankHeight: null,
      tankWidth: null,
      tankGlassThickness: 6
    }
  },
  computed: {
    tankDimensions () {
      return `${this.tankLength}|${this.tankHeight}|${this.tankWidth}`
    }
  },
  watch: {
    tankDimensions () {
      if (this.tankLength && this.tankHeight && this.tankWidth) {
        this.tankVolume = (
          (this.tankLength - 2 * this.tankGlassThickness / 10) *
          this.tankHeight *
          (this.tankWidth - 2 * this.tankGlassThickness / 10) / 1000
        ).toFixed(1)
      } else {
        this.tankVolume = 0
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
