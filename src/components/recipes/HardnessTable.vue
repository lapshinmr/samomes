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
    <base-text-field
      v-model="amount"
    />
    <div>
      Gh: {{ totalGh }} Kh: {{ totalKh }}
    </div>
  </div>
</template>

<script>
import { countPercent } from '@/helpers/funcs';
import { KH, GH, countKh } from '@/constants/hardness';

export default {
  name: 'ElementsTable',
  props: {
    totalIonConcentration: {
      type: Object,
      default: () => {},
    },
    fertilizerMass: {
      type: Object,
      default: () => {},
    },
    concentration: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      VOLUME: 10,
      amount: 1,
    };
  },
  computed: {
    totalGh() {
      let result = 0;
      if ('Ca' in this.totalIonConcentration) {
        result += this.totalIonConcentration.Ca * this.amount / GH.Ca;
      }
      if ('Mg' in this.totalIonConcentration) {
        result += this.totalIonConcentration.Mg * this.amount / GH.Mg;
      }
      return result;
    },
    totalKh() {
      let result = 0;
      if ('CO3' in this.totalIonConcentration) {
        const massHCO3 = this.totalIonConcentration.CO3 * KH.HCO3 / KH.CO3;
        result += countKh(massHCO3, this.VOLUME) * this.amount;
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
