<!--
  Samomes

  Copyright (C) 2023 Mikhail Lapshin

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
    <div class="d-flex align-start mb-4">
      <number-field
        :value="mass"
        @input="$emit('update:mass', $event)"
        label="Введите массу смеси"
        suffix="г"
        hide-details="auto"
        style="flex-basis: 0;"
      />
      <number-field
        :value="volume"
        @input="$emit('update:volume', $event)"
        label="Введите объем"
        suffix="л"
        hide-details="auto"
        class="ml-2"
        style="flex-basis: 0;"
      />
    </div>
    <div class="text-subtitle-2 mb-3">
      {{ mass }} г смеси повышают в {{ volume }} л:
    </div>
    <div class="d-flex">
      <v-text-field
        :value="totalGh.toFixed(2)"
        label="Общую жесткость"
        suffix="dGh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2"
      />
      <v-text-field
        :value="totalKh.toFixed(2)"
        label="Карбонатную жесткость"
        suffix="dKh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2 ml-2"
      />
    </div>
    <div class="text-subtitle-2 mt-2">
      Соотношение Ca / Mg
      <template v-if="totalIonConcentration.Ca && totalIonConcentration.Mg">
        = {{ (totalIonConcentration.Ca / totalIonConcentration.Mg).toFixed(2) }}
      </template>
      <template v-else>
        будет вычислено после ввода массы реагентов
      </template>
    </div>
  </div>
</template>

<script>
import { countPercent } from '~/helpers/funcs/funcs';
import { GH } from '~/helpers/constants/hardness';
import { countKh } from '~/helpers/funcs/hardness';

export default {
  name: 'HardnessTable',
  props: {
    totalIonConcentration: {
      type: Object,
      default: () => {},
    },
    mass: {
      type: Number,
      default: 0,
    },
    volume: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalGh() {
      let result = 0;
      if ('Ca' in this.totalIonConcentration) {
        result += (this.totalIonConcentration.Ca * this.mass) / (GH.Ca * this.volume);
      }
      if ('Mg' in this.totalIonConcentration) {
        result += (this.totalIonConcentration.Mg * this.mass) / (GH.Mg * this.volume);
      }
      result *= 1000;
      return result;
    },
    totalKh() {
      let result = 0;
      if ('CO3' in this.totalIonConcentration) {
        result += countKh(this.totalIonConcentration.CO3, this.volume) * this.mass;
        result *= 1000;
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
