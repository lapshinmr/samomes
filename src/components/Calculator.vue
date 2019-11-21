<template>
  <div class="hello">
    <h1>Калькулятор удобрений для аквариума</h1>
    <div class="form-group">
      <template v-for="formula in formulas">
        <input type="radio" v-model="formulaSelected" :value="formula" :key="formula + 'input'">
        <label :key="formula + 'label'">{{ formula }}</label>
      </template>
    </div>
    <div class="form-group">
      {{ calcProcent }}
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
  'KNO3': ['K', 'NO3'],
  'KH2PO4': ['K', 'H2', 'PO4'],
  'K2SO4': ['K2', 'SO4']
}

export default {
  name: 'Calculator',
  data () {
    return {
      formulas: ['KNO3', 'KH2PO4', 'K2SO4'],
      formulaSelected: 'KNO3'
    }
  },
  computed: {
    calcProcent () {
      let massTotal = 0
      let massCurrent
      for (let item of FORMULAS[this.formulaSelected]) {
        this.calcComponents(item)
      }
      return 1
    }
  },
  methods: {
    calcComponents (formula) {
      let components = {}
      let lastElement
      for (let el of formula) {
        if (!isNaN(el)) {
          components[lastElement] = el * COMPONENTS[lastElement]
        } else {
          components[el] = 1 * COMPONENTS[el]
          lastElement = el
        }
      }
      return components
    }
  }
}
</script>

<style scoped>
</style>
