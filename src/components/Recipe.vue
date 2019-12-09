<template lang="html">
  <div>
    <div class="d-flex justify-content-around">
      <div v-for="reagent in reagents" class="reagent" :key="reagent">
        <input
            type="radio"
            v-model="reagentSelected"
            :value="reagent"
            class="reagent__input"
            :id="reagent"
        >
        <label
            class="d-flex flex-column align-items-center reagent__label"
            :for="reagent"
        >
          <span class="reagent__formula">
            {{ reagent }}
          </span>
          <span class="reagent__name">
            {{ FORMULAS[reagent].name }}
          </span>
        </label>
      </div>
    </div>

    <div class="form-group d-flex justify-content-center">
      <span class="components">
        <small>
          Состав: {{ calcProcent | SHOW_COMPONENTS }}
        </small>
        <br />
        <small
           :class="{'text-warning': FORMULAS[reagentSelected].solubilityLimit < fertilizerMass}"
        >
          Растворимость: {{ FORMULAS[reagentSelected].solubilityLimit }} г/л при 20°С
        </small>
      </span>
    </div>

    <div class="form-group">
      <select v-model="tank" class="form-control">
        <option selected value="">Выберите аквариум</option>
        <option v-for="tank in tanks" :key="tank.name" :value="tank">
          {{ tank.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>Масса удобрения, г</label>
      <input
          :value="fertilizerMass"
          @input="inputFertilizerMass()"
          type="text"
          class="form-control"
          placeholder="Введите массу"
      >
      <small>Введите массу удобрения {{ reagentSelected }}</small>
    </div>

    <div class="form-group">
      <label>Объем воды, мл</label>
      <input
          v-model.number.lazy="fertilizerVolume"
          type="text"
          class="form-control"
      >
      <small>Введите объем воды</small>
    </div>

    <div class="form-group">
      <label>
        Настройка дозы удобрения
      </label>
      <div class="d-flex">
        <template v-for="(data, ion, index) in FORMULAS[reagentSelected].ions">
          <div v-if="data.isNeeded" class="flex-fill" :class="{'ml-2': index !== 0}" :key="ion">
            <label>{{ ion }} ({{ concentration[ion].toFixed(2) }} г/л), мг/мл</label>
            <input :value="solute[ion]" @input="inputIon(ion)" type="text" class="form-control">
          </div>
        </template>
      </div>
      <small>
        Повышение концентрации удобрения в аквариуме на 1 мл вводимого раствора
      </small>
    </div>

    <div class="form-group">
      <label>Имя рецепта</label>
      <input v-model.number.lazy="recipeName" type="text" class="form-control" >
      <small></small>
    </div>

    <button class="btn btn-outline-success" @click="saveRecipe">
      Добавить рецепт
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import { FORMULAS, COMPONENTS } from '../constants.js'

export default {
  name: 'recipe',
  props: ['tanks'],
  data () {
    return {
      FORMULAS: FORMULAS,
      reagents: ['KNO3', 'KH2PO4', 'K2SO4'],
      reagentSelected: 'KNO3',
      tank: {},
      solute: {},
      fertilizerMass: 0,
      fertilizerVolume_: 1,
      recipeName_: ''
    }
  },
  created () {
    this.solute = this.resetSolute()
    if (this.tanks.length >= 0) {
      this.tank = this.tanks[0]
    }
  },
  computed: {
    calcProcent () {
      let massTotal = this.calcMass(this.reagentSelected)
      let result = {}
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in ions) {
        result[ion] = this.calcMass(ion) * ions[ion].count / massTotal
      }
      return result
    },
    concentration () {
      let result = {}
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in ions) {
        result[ion] = this.fertilizerMass * this.calcProcent[ion] / this.fertilizerVolume_
      }
      return result
    },
    recipeName: {
      get () {
        let name = this.FORMULAS[this.reagentSelected].name
        return (
          this.recipeName_ ||
          `${this.tank.name} (${name} ${this.fertilizerMass.toFixed(1)} г на ${this.fertilizerVolume} мл)`
        )
      },
      set (value) {
        this.recipeName_ = value
      }
    },
    fertilizerVolume: {
      get () {
        return this.fertilizerVolume_ * 1000
      },
      set (value) {
        this.fertilizerVolume_ = value / 1000
      }
    },
    watched () {
      return `${this.tank.volume}|${this.fertilizerVolume}`
    }
  },
  watch: {
    watched () {
      for (let ion in this.calcProcent) {
        let value = this.fertilizerMass / this.tank.volume * this.calcProcent[ion] * this.fertilizerVolume_
        this.solute[ion] = value
        this.solute = Object.assign({}, this.solute)
      }
    },
    reagentSelected () {
      this.solute = this.resetSolute()
      this.fertilizerMass = 0
    }
  },
  methods: {
    resetSolute () {
      let ions = this.FORMULAS[this.reagentSelected].ions
      let solute = {}
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          solute[ion] = 0
        }
      }
      return solute
    },
    calcMass (reagent) {
      let mass = 0
      let lastElement
      for (let el of reagent) {
        mass += !isNaN(el)
          ? COMPONENTS[lastElement] * (parseInt(el) - 1)
          : COMPONENTS[el]
        lastElement = el
      }
      return mass
    },
    inputFertilizerMass () {
      this.fertilizerMass = event.target.value
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in this.calcProcent) {
        if (ions[ion]) {
          let value = this.fertilizerMass / this.tank.volume / this.fertilizerVolume_ * this.calcProcent[ion]
          Vue.set(this.solute, ion, value)
        }
      }
    },
    inputIon (curIon) {
      let value
      for (let ion in this.solute) {
        if (ion === curIon) {
          value = event.target.value
        } else {
          value = event.target.value / (this.calcProcent[curIon] / this.calcProcent[ion])
        }
        Vue.set(this.solute, ion, value)
      }
      console.log(this.fertilizerVolume)
      this.fertilizerMass = this.solute[curIon] * this.tank.volume / this.calcProcent[curIon] * this.fertilizerVolume_
    },
    saveRecipe () {
      return this.$emit('save-recipe', {
        name: this.recipeName,
        mass: this.fertilizerMass,
        volume: this.fertilizerVolume,
        concentration: Object.assign({}, this.concentration),
        solute: Object.assign({}, this.solute)
      })
    }
  },
  filters: {
    'SHOW_COMPONENTS': (ions) => {
      let output = []
      for (let key in ions) {
        output.push(`${key}: ${(ions[key] * 100).toFixed(1)}%`)
      }
      return output.join(' ')
    }
  }
}
</script>

<style lang="sass" scoped>
.reagent
  &:not(:first-child)
    margin-left: 1rem
  .reagent__input
    display: none

  .reagent__label
    cursor: pointer

    .reagent__formula
      font-size: 1.5rem

    .reagent__name
      font-size: 1rem

  .reagent__input:checked + label
    color: red

.components
  font-size: 1.2rem
  text-align: center

</style>
