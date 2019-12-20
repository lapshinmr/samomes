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
           :class="{'text-warning': isWarning}"
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
          v-model.number.lazy="fertilizerMass"
          type="number"
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
            <input :value="solute[ion].toFixed(2)" @input="inputIon(ion)" type="text" class="form-control">
          </div>
        </template>
      </div>
      <small>
        Повышение концентрации удобрения в аквариуме на 1 мл вводимого раствора
      </small>
    </div>

    <div class="form-group">
      <label>Имя рецепта</label>
      <input v-model.number.lazy="recipeName" type="text" class="form-control">
      <small></small>
    </div>

    <button class="btn btn-success btn-block" @click="saveRecipe">
      Добавить рецепт
    </button>

    <transition name="fade">
      <div v-if="recipes.length > 0" class="row mb-4">
        <h2 class="col-12 text-center my-3">
          Рецепты
        </h2>
        <div
            v-for="(recipe, index) in recipes"
            :key="recipe.name"
            class="col-md-4 col-sm-6 recipe"
        >
          <div class="card recipe__container">
            <div class="card-body p-3">
              <button type="button" class="close" @click.stop="removeRecipe(index)">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="card-title recipe__title">
                {{ recipe.name }}
              </h5>
              <div class="card-subtitle recipe__subtitle mb-2 text-muted">
                {{ recipe.reagent }}
              </div>
              <div class="recipe__body">
                <div class="d-flex justify-content-between">
                  <span>Название аквариума</span><span>{{ recipe.tank.name }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Объем аквариума</span><span>{{ recipe.tank.volume }} л</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Масса реагента</span><span>{{ recipe.mass.toFixed(1) }} г</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Объем удобрения</span><span>{{ recipe.volume }} мл</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Концентрация</span>
                  <span class="d-flex flex-column align-items-end">
                    <span v-for="(value, key) in recipe.concentration" class="" :key="key">
                      {{ key }}: {{ value.toFixed(1) }} г/л
                    </span>
                  </span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Доза</span>
                  <span class="d-flex flex-column align-items-end">
                    <span v-for="(value, key) in recipe.solute" class="" :key="key">
                      {{ key }}: {{ value.toFixed(2) }} мг/мл
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { FORMULAS, COMPONENTS } from '../constants.js'

export default {
  name: 'recipe',
  props: ['tanks', 'recipes', 'removeRecipe'],
  data () {
    return {
      FORMULAS: FORMULAS,
      reagents: ['KNO3', 'KH2PO4', 'K2SO4'],
      reagentSelected: 'KNO3',
      tank: {},
      solute: {},
      fertilizerMass_: 0,
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
        if (ions[ion].isNeeded) {
          result[ion] = this.fertilizerMass * this.calcProcent[ion] / this.fertilizerVolume_
        }
      }
      return result
    },
    recipeName: {
      get () {
        let name = this.FORMULAS[this.reagentSelected].name
        return (
          this.recipeName_ ||
          `${this.tank.name} (${name} ${this.fertilizerMass_.toFixed(2)} г на ${this.fertilizerVolume} мл)`
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
    fertilizerMass: {
      get () {
        return this.fertilizerMass_
      },
      set (value) {
        this.fertilizerMass_ = event.target.value
        let ions = FORMULAS[this.reagentSelected].ions
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            let value = this.fertilizerMass_ / this.tank.volume / this.fertilizerVolume_ * this.calcProcent[ion]
            Vue.set(this.solute, ion, value)
          }
        }
      }
    },
    watched () {
      return `${this.tank.volume}|${this.fertilizerVolume}`
    },
    isWarning () {
      console.log(this.fertilizerMass_, this.fertilizerVolume_)
      return FORMULAS[this.reagentSelected].solubilityLimit < this.fertilizerMass / this.fertilizerVolume_
    }
  },
  watch: {
    watched () {
      let ions = this.FORMULAS[this.reagentSelected].ions
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          let value = this.fertilizerMass / this.tank.volume * this.calcProcent[ion] * this.fertilizerVolume_
          this.solute[ion] = value
          this.solute = Object.assign({}, this.solute)
        }
      }
    },
    reagentSelected () {
      this.solute = this.resetSolute()
      this.fertilizerMass_ = 0
      this.recipeName_ = ''
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
    inputIon (curIon) {
      let value
      for (let ion in this.solute) {
        if (ion === curIon) {
          value = parseFloat(event.target.value)
        } else {
          value = event.target.value / (this.calcProcent[curIon] / this.calcProcent[ion])
        }
        Vue.set(this.solute, ion, value)
      }
      this.fertilizerMass_ = this.solute[curIon] * this.tank.volume / this.calcProcent[curIon] * this.fertilizerVolume_
    },
    saveRecipe () {
      return this.$emit('save-recipe', {
        name: this.recipeName,
        reagent: this.reagentSelected,
        tank: Object.assign({}, this.tank),
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

.recipe
  color: black
  .recipe__container
  .recipe__title
    font-size: 1rem
  .recipe__body
    font-size: 0.85rem
    div > span + span
      opacity: 0.6

</style>
