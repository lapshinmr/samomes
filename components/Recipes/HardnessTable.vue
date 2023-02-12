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
    <div class="d-flex align-center mb-4">
      <div style="width: 60px;">
        <number-field
          :value="mass"
          @input="$emit('update:mass', $event)"
          suffix="г"
          hide-details="auto"
          class="mr-2 mt-0 pt-0"
          style=""
        />
      </div>
      <div class="mx-2">
        смеси повышают в
      </div>
      <div style="width: 60px;">
        <number-field
          :value="volume"
          @input="$emit('update:volume', $event)"
          suffix="л"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
    </div>
    <div class="d-flex">
      <v-text-field
        :value="totalGh.toFixed(2)"
        label="Общую жесткость на"
        suffix="dGh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2"
      />
      <v-text-field
        :value="totalKh.toFixed(2)"
        label="Карбонатную жесткость на"
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
      <template v-if="concentration.Ca && concentration.Mg">
        = {{ (concentration.Ca / concentration.Mg).toFixed(2) }}
      </template>
      <template v-else>
        будет вычислено после ввода массы реагентов
      </template>
    </div>
  </div>
</template>

<script>
import { countGh, countKh } from '~/helpers/funcs/hardness';

export default {
  name: 'HardnessTable',
  props: {
    concentration: {
      type: Object,
      default: () => {},
    },
    mass: {
      type: Number,
      default: 0,
    },
    volume: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    totalGh() {
      return countGh(this.concentration, this.mass, this.volume);
    },
    totalKh() {
      return countKh(this.concentration, this.mass, this.volume);
    },
  },
};
</script>

<style scoped>

</style>
