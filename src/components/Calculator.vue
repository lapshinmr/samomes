<template>
  <div class="hello">
    <h1>Калькулятор удобрений для аквариума</h1>
    <div class="form-group">
      <template v-for="formula in formulas">
        <input type="radio" v-model="formulaSelected" :value="formula" :key="formula">
        <label >{{ formula }}</label>
      </template>
    </div>
  </div>
</template>

<script>

const COMPONENTS = {
  'H': 1,
  'N': 14,
  'O': 16,
  'P': 31,
  'K': 39.1
};

export default {
  name: 'Calculator',
  data() {
    return {
      formulas: ['KNO3', 'KH2PO4', 'K2SO4'],
      formulaSelected: 'KNO3'
    }
  },
  computed: {
    calculateComponents() {
      let components = {}
      let lastElement;
      for (let el of this.formulaSelected) {
        if (isNaN(el)) {
          components[lastElement] = el * COMPONENTS[lastElement]
        } else {
          lastElement = el;
          components[el] = 1
        }
      }
      return components
    }
  }
}
</script>

<style scoped>
</style>
