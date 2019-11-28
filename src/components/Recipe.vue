<template lang="html">
  <div>
    <h4>Рецепт</h4>

    <div class="form-group">
      {{ calcProcent | SHOW_COMPONENTS }}
    </div>

    <div class="form-group">
      <label>Масса удобрения, г</label>
      <input :value="fertilizerMass" @input="inputFertilizerMass()" type="text" class="form-control" :class="{'bg-danger': FORMULAS[reagentSelected].solubilityLimit < fertilizerMass}">
      <small>Введите массу удобрения {{ reagentSelected }}, которое будет замешано на литр воды.</small>
      <br />
      <small>Растворимость {{ FORMULAS[reagentSelected].solubilityLimit }} г/л при 20°С</small>
    </div>

    <div class="form-row">
      <template v-for="(data, ion) in FORMULAS[reagentSelected].ions">
        <div v-if="data.isNeeded" class="col" :key="ion">
          <label>{{ ion }}, мг/мл</label>
          <input :value="solute[ion]" @input="inputIon(ion)" type="text" class="form-control">
          <small>Концентрация в удобрении {{ concentration[ion].toFixed(2) }}, г/л</small>
        </div>
      </template>
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

const COMPONENTS = {
  'H': 1,
  'N': 14,
  'O': 16,
  'P': 31,
  'S': 32.1,
  'K': 39.1
}

const FORMULAS = {
  'KNO3': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'NO3': {
        isNeeded: true,
        count: 1
      }
    },
    solubilityLimit: 242
  },
  'KH2PO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 1
      },
      'PO4': {
        isNeeded: true,
        count: 1
      },
      'H2': {
        isNeeded: false,
        count: 1
      }
    },
    solubilityLimit: 226
  },
  'K2SO4': {
    ions: {
      'K': {
        isNeeded: true,
        count: 2
      },
      'SO4': {
        isNeeded: false,
        count: 1
      }
    },
    solubilityLimit: 111
  }
}

export default {
  name: 'recipe',
  props: {
    tankVolume: { type: Number, default: 0 },
    reagentSelected: { type: String }
  },
  data () {
    return {
      FORMULAS: FORMULAS,
      solute: {},
      fertilizerMass: 0,
      recipeName_: ''
    }
  },
  created () {
    let ions = this.FORMULAS[this.reagentSelected].ions
    for (let ion in ions) {
      if (ions[ion].isNeeded) {
        this.solute[ion] = 0
      }
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
        result[ion] = this.fertilizerMass * this.calcProcent[ion]
      }
      return result
    },
    recipeName: {
      get () {
        return this.recipeName_ || `${this.reagentSelected}_${this.fertilizerMass}_${this.tankVolume}`
      },
      set (value) {
        this.recipeName_ = value
      }
    }
  },
  watch: {
    tankVolume () {
      this.calsSolute()
    }
  },
  methods: {
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
    calsSolute () {
      for (let ion in this.calcProcent) {
        let value = (this.fertilizerMass / this.tankVolume * this.calcProcent[ion]).toFixed(2)
        this.solute[ion] = value
        this.solute = Object.assign({}, this.solute)
      }
    },
    inputFertilizerMass () {
      this.fertilizerMass = event.target.value
      let ions = FORMULAS[this.reagentSelected].ions
      for (let ion in this.calcProcent) {
        if (ions[ion]) {
          let value = (this.fertilizerMass / this.tankVolume * this.calcProcent[ion]).toFixed(2)
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
          value = (event.target.value / (this.calcProcent[curIon] / this.calcProcent[ion])).toFixed(2)
        }
        Vue.set(this.solute, ion, value)
      }
      this.fertilizerMass = (this.solute[curIon] * this.tankVolume / this.calcProcent[curIon]).toFixed(2)
    },
    saveRecipe () {
      return this.$emit('save-recipe', {
        name: this.recipeName,
        concentration: this.concentration,
        solute: Object.assign({}, this.solute)
      })
    }
  },
  filters: {
    'SHOW_COMPONENTS': (ions) => {
      let output = []
      for (let key in ions) {
        output.push(`${key}: ${(ions[key] * 100).toFixed(2)}%`)
      }
      return output.join(' ')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
