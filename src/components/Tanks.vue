<template>
  <div class="row">
    <div class="col-12 mb-2">
      <div class="card">
        <div class="card-body">
          <div class="form-row">
            <div class="col">
              <input v-model.lazy="name" type="text" class="form-control form-control-sm mb-2" :placeholder="name">
              <input v-model.number="volume" type="text" class="form-control form-control-sm" placeholder="Введите объем, л">
            </div>
            <div class="col">
              <button
                  class="btn btn-outline-success btn-sm btn-block mb-2"
                  :class="{'disabled': isExist !== -1}"
                  @click="addTank"
              >
                Добавить
              </button>
              <button v-if="!isTankVolumeCalc" class="btn btn-outline-success btn-sm btn-block" @click="isTankVolumeCalc = true">
                Расчитать объем аквариума
              </button>
              <button v-else class="btn btn-outline-success btn-sm btn-block m-0" @click="isTankVolumeCalc = false">
                Скрыть
              </button>
            </div>
          </div>
          <div v-if="isTankVolumeCalc" class="form-row mt-2">
            <div class="col">
              <input v-model="length" type="text" class="form-control form-control-sm" placeholder="Длина, см">
            </div>
            <div class="col">
              <input v-model="width" type="text" class="form-control form-control-sm" placeholder="Ширина, см">
            </div>
            <div class="col">
              <input v-model="height" type="text" class="form-control form-control-sm" placeholder="Высота, см">
            </div>
            <div class="col">
              <input v-model="glassThickness" type="text" class="form-control form-control-sm" placeholder="Толщина стекла, мм">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
        v-for="(tank, index) in tanks"
        :key="tank.name"
        class="col-4 tank"
    >
      <div class="card tank__container" @click="name_ = tank.name">
        <div class="card-body p-3">
          <button type="button" class="close" @click.stop="removeTank(index)">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">
            {{ tank.name }}
          </h5>
          <div class="card-subtitle mb-2 text-muted">
            Объем: {{ tank.volume }} л
          </div>
          <div v-if="tank.length" class="tank__sizes">
            {{ tank.length }} x
            {{ tank.width }} x
            {{ tank.height }} x
            {{ tank.glassThickness }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tank',
  props: [ 'tanks', 'removeTank' ],
  data () {
    return {
      ...this.resetComponent(),
      isTankVolumeCalc: false,
      tankEditedIndex: null
    }
  },
  computed: {
    dimensions () {
      return `${this.length}|${this.height}|${this.width}|${this.glassThickness}`
    },
    isExist () {
      let names = this.tanks.map(item => item.name)
      return names.findIndex(item => item === this.name_)
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
    },
    name_ () {
      if (this.isExist !== -1) {
        let tank = this.tanks[this.isExist]
        Object.assign(this.$data, {
          name: tank.name,
          volume: tank.volume,
          length: tank.length,
          height: tank.height,
          width: tank.width,
          glassThickness: tank.glassThickness
        })
      }
    }
  },
  methods: {
    addTank () {
      if (this.isExist === -1) {
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
        glassThickness: null
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.tank
  color: black
  .tank__container
    cursor: pointer
  .tank__sizes
    font-size: 0.9rem
</style>
