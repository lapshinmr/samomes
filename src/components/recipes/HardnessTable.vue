<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div>
    <div class="text-subtitle-2 mb-4">
      Данный рецепт повышает жесткость
    </div>
    <div class="d-flex align-center mb-2">
      <base-text-field
        v-model="amount"
        type="number"
        label="Введите количество"
        hint="То количество, которое будет внесено на объем подмены или весь объем аквариума"
        :suffix="isVolume ? 'мл' : 'г'"
      />
      <base-text-field
        v-model="volume"
        type="number"
        label="Введите объем"
        hint="Объем подмены или весь объем аквариума"
        suffix="л"
        class="ml-2"
      />
    </div>
    <div class="d-flex">
      <v-text-field
        :value="totalGh.toFixed(2)"
        label="Общая жесткость"
        suffix="dGh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2"
      />
      <v-text-field
        :value="totalKh.toFixed(2)"
        label="Карбонатная жесткость"
        suffix="dKh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2 ml-2"
      />
    </div>
    <div
      v-if="totalIonConcentration.Ca && totalIonConcentration.Mg"
      class="text-subtitle-2 mt-2"
    >
      Соотношение Ca / Mg = {{ (totalIonConcentration.Ca / totalIonConcentration.Mg).toFixed(2) }}
    </div>
  </div>
</template>

<script>
import { countPercent } from '@/helpers/funcs';
import { GH, countKh } from '@/constants/hardness';

export default {
  name: 'HardnessTable',
  props: {
    totalIonConcentration: {
      type: Object,
      default: () => {},
    },
    isVolume: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      volume: 10,
      amount: 1,
    };
  },
  computed: {
    totalGh() {
      let result = 0;
      if ('Ca' in this.totalIonConcentration) {
        result += this.totalIonConcentration.Ca * this.amount / (GH.Ca * this.volume);
      }
      if ('Mg' in this.totalIonConcentration) {
        result += this.totalIonConcentration.Mg * this.amount / (GH.Mg * this.volume);
      }
      if (!this.isVolume) {
        result *= 1000;
      }
      return result;
    },
    totalKh() {
      let result = 0;
      if ('CO3' in this.totalIonConcentration) {
        result += countKh(this.totalIonConcentration.CO3, this.volume) * this.amount;
        if (!this.isVolume) {
          result *= 1000;
        }
      }
      return result;
    },
  },
  methods: {
    countPercent,
  },
};
</script>

<style scoped>

</style>
