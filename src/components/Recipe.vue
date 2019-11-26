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
      <template v-for="(isNeeded, ion) in FORMULAS[reagentSelected].ions">
        <div v-if="isNeeded" class="col" :key="ion">
          <label>{{ ion }}, мг/мл</label>
          <input :value="solute[ion]" @input="inputIon(ion)" type="text" class="form-control">
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
      'K': true,
      'NO3': true
    },
    solubilityLimit: 242
  },
  'KH2PO4': {
    ions: {
      'K': true,
      'PO4': true,
      'H2': false
    },
    solubilityLimit: 226
  },
  'K2SO4': {
    ions: {
      'K2': true,
      'SO4': false
    },
    solubilityLimit: 111
  }
}

export default {
  name: 'recipe',
  props: {
    tankVolume: {
      type: Number,
      default: 0
    },
    reagentSelected: {
      type: String
    }
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
      if (ions[ion]) {
        this.solute[ion] = 0
      }
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
  },
  computed: {
    calcProcent () {
      let massTotal = this.calcMass(this.reagentSelected)
      let ions = {}
      for (let ion in FORMULAS[this.reagentSelected].ions) {
        ions[ion] = this.calcMass(ion) / massTotal
      }
      return ions
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
      this.$forceUpdate()
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
        Vue.set(this.solute, ion, value)
      }
    },
    inputFertilizerMass () {
      this.fertilizerMass = event.target.value
      for (let ion in this.calcProcent) {
        let value = (this.fertilizerMass / this.tankVolume * this.calcProcent[ion]).toFixed(2)
        Vue.set(this.solute, ion, value)
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
        solute: this.solute
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
