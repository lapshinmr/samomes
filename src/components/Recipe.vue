<template lang="html">
  <div>
    <h4>Рецепт</h4>

    <div class="form-group">
      <template v-for="recipe in recipes">
        <input type="radio" v-model="recipeSelected" :value="recipe" :key="recipe + 'input'">
        <label :key="recipe + 'label'">{{ recipe }}</label>
      </template>
    </div>
    <div class="form-group">
      {{ calcProcent | SHOW_COMPONENTS }}
    </div>
    <div class="form-group">
      <label>Объем аквариума</label>
      <select v-if="tanks && tanks.length > 1" v-model="tankSelected" class="form-control">
        <option v-for="tank in tanks" :key="tank">
          {{ tank }}
        </option>
      </select>
      <div v-else>
        {{ tankSelected }}
      </div>
    </div>

    <div class="form-group">
      <label>Масса удобрения, г</label>
      <input v-model.number.lazy="fertilizerMass" type="text" class="form-control" :class="{'bg-danger': FORMULAS[recipeSelected].solubilityLimit < fertilizerMass}">
      <small>Введите массу удобрения {{ recipeSelected }}, которое будет замешано на литр воды.</small>
      <br />
      <small>Растворимость: {{ FORMULAS[recipeSelected].solubilityLimit }} г/л</small>
    </div>

    <div class="form-row">
      <template v-for="component in FORMULAS[recipeSelected].components">
        <div class="col" :key="component">
          <label>{{ component }} мг/мл</label>
          <input :value="syringe[component]" type="text" class="form-control">
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
  props: [ 'tanks' ],
  data () {
    return {
      FORMULAS: FORMULAS,
      recipes: ['KNO3', 'KH2PO4', 'K2SO4'],
      recipeSelected: 'KNO3',
      syringe: {},
      isHoldConcentration: false,
      tankSelected: null,
      recipeName: ''
    }
  },
  created () {
    this.tankSelected = this.tanks[0]
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
    calcProcent () {
      let massTotal = this.calcMass(this.recipeSelected)
      let components = {}
      FORMULAS[this.recipeSelected].components.forEach(value => {
        components[value] = this.calcMass(value) / massTotal
      })
      return components
    },
    fertilizerMass: {
      get () {
        return (this.syringe * this.tankSelected / this.calcProcent[this.calcIon])
      },
      set (value) {
        for (let ion in this.FORMULAS[this.recipeSelected].components) {
          this.syringe[ion] = (this.calcProcent[ion] * value / this.tankSelected)
        }
      }
    }
  },
  methods: {
    calcMass (recipe) {
      let mass = 0
      let lastElement
      for (let el of recipe) {
        mass += !isNaN(el)
          ? COMPONENTS[lastElement] * (parseInt(el) - 1)
          : COMPONENTS[el]
        lastElement = el
      }
      return mass
    },
    saveRecipe () {
      return this.$emit('save-recipe', {
        'name': this.recipeName,
        'NO3': '',
        'PO4': '',
        'K': ''
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
