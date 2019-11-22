<template lang="html">
  <div class="row">
    <div class="col-12">
      <h2>Рецепт</h2>
      <div class="form-group">
        <template v-for="formula in formulas">
          <input type="radio" v-model="formulaSelected" :value="formula" :key="formula + 'input'">
          <label :key="formula + 'label'">{{ formula }}</label>
        </template>
      </div>
      <div class="form-group">
        {{ calcProcent | SHOW_COMPONENTS }}
      </div>
      <div class="form-group">
        <label>Рецепт</label>
        <input v-model.number.lazy="fertilizerMass" type="text" class="form-control" :class="{'bg-danger': FORMULAS[formulaSelected].solubilityLimit < fertilizerMass}">
        <small>Введите массу удобрения в граммах {{ formulaSelected }} на литр воды</small>
        <small>Растворимость: {{ FORMULAS[formulaSelected].solubilityLimit }} г/л</small>
      </div>

      <div class="form-group">
        <label>Концентрация удобрения</label>
        <span>{{ concentration.toFixed(2) }} мг/мл</span>
        <input type="checkbox" v-model="isHoldConcentration">
        <label>зафиксировать</label>
      </div>

      <div class="form-group">
        <label>Хотим повышение концентрации в авариуме на каждый мл вводимого удобрения в шприце</label>
        <input v-model.number.lazy="syringe" type="text" class="form-control" >
        <small>мг/л</small>
      </div>
    </div>
  </div>
</template>

<script>
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
    components: ['K', 'NO3'],
    solubilityLimit: 242
  },
  'KH2PO4': {
    components: ['K', 'H2', 'PO4'],
    solubilityLimit: 226
  },
  'K2SO4': {
    components: ['K2', 'SO4'],
    solubilityLimit: 111
  }
}

export default {
  name: 'recipe',
  data () {
    return {
      FORMULAS: FORMULAS
    }
  },
  filters: {
    'SHOW_COMPONENTS': (components) => {
      let output = []
      for (let key in components) {
        output.push(`${key}: ${(components[key] * 100).toFixed(2)}%`)
      }
      return output.join(' ')
    }
  },
  computed: {
    ion () {
      switch (this.formulaSelected) {
        case 'KNO3':
          return 'NO3'
        case 'KH2PO4':
          return 'PO4'
        case 'K2SO4':
          return 'K2'
        default:
          return 'NO3'
      }
    },
    calcProcent () {
      let massTotal = this.calcMass(this.formulaSelected)
      let components = {}
      FORMULAS[this.formulaSelected].components.forEach(value => {
        components[value] = this.calcMass(value) / massTotal
      })
      return components
    },
    fertilizerMass: {
      get () {
        return (this.syringe * this.tankVolume / this.calcProcent[this.ion]).toFixed(2)
      },
      set (value) {
        this.syringe = (this.calcProcent[this.ion] * value / this.tankVolume).toFixed(2)
      }
    }
  },
  methods: {
    calcMass (formula) {
      let mass = 0
      let lastElement
      for (let el of formula) {
        mass += !isNaN(el)
          ? COMPONENTS[lastElement] * (parseInt(el) - 1)
          : COMPONENTS[el]
        lastElement = el
      }
      return mass
    }
  }
}
</script>

<style lang="css" scoped>
</style>
