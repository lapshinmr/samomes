<template>
  <div class="card">
    <div class="card-body">
      <div class="form-row mb-2">
        <div class="col">
          <input v-model.lazy="name" type="text" class="form-control form-control-sm mb-2" :placeholder="name">
          <input v-model.number="volume" type="text" class="form-control form-control-sm" placeholder="Введите объем, л">
        </div>
        <div class="col">
          <button
              class="btn btn-outline-success btn-sm btn-block"
              :class="{'disabled': disabled}"
              @click="addTank"
          >
            Добавить аквариум
          </button>
          <button v-if="!isTankVolumeCalc" class="btn btn-link btn-sm" @click="isTankVolumeCalc = true">
            Расчитать объем аквариума
          </button>
          <button v-else class="btn btn-link btn-sm" @click="isTankVolumeCalc = false">
            Скрыть
          </button>
        </div>
      </div>
      <div v-if="isTankVolumeCalc" class="form-row">
        <div class="col">
          <input v-model="length" type="text" class="form-control form-control-sm mb-1" placeholder="Длина, см">
        </div>
        <div class="col">
          <input v-model="width" type="text" class="form-control form-control-sm mb-1" placeholder="Ширина, см">
        </div>
        <div class="col">
          <input v-model="height" type="text" class="form-control form-control-sm mb-1" placeholder="Высота, см">
        </div>
        <div class="col">
          <input v-model="glassThickness" type="text" class="form-control form-control-sm" placeholder="Толщина стекла, мм">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tank',
  props: [ 'tanks' ],
  data () {
    return {
      ...this.resetComponent()
    }
  },
  computed: {
    dimensions () {
      return `${this.length}|${this.height}|${this.width}|${this.glassThickness}`
    },
    disabled () {
      let names = this.tanks.map(item => item.name)
      console.log(names.find(item => item === this.name_))
      return names.find(item => item === this.name_)
    },
    name: {
      get () {
        let counter = this.tanks.length + 1
        return this.name_ || `Аквариум #${counter}`
      },
      set (value) {
        this.name_ = value
      }
    }
  },
  watch: {
    dimensions () {
      if (this.length && this.height && this.width) {
        this.volume = Math.round(
          (this.length - 2 * this.glassThickness / 10) *
          this.height *
          (this.width - 2 * this.glassThickness / 10) / 1000 *
          100
        ) / 100
      } else {
        this.volume = 0
      }
    }
  },
  methods: {
    addTank () {
      if (!this.disabled) {
        this.$emit('add-tank', {
          name: this.name_ || this.name,
          volume: this.volume,
          length: this.length,
          height: this.height,
          width: this.width,
          glassThickness: this.glassThickness
        })
        Object.assign(this.$data, this.resetComponent())
      }
    },
    resetComponent () {
      return {
        name_: null,
        volume: null,
        length: null,
        height: null,
        width: null,
        glassThickness: null,
        isTankVolumeCalc: false
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
