<template>
  <div>
    <Calculator />
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'calculator',
  components: {
    Calculator
  }
}
</script>

<style lang="sass">
body
  font-family: Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
