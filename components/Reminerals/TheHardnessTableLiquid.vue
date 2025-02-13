<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
      <div style="width: 80px;">
        <number-field
          :value="doseVolume"
          @input="$emit('update:dose-volume', $event)"
          suffix="мл"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
      <div class="mx-2">
        раствора повышают в
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
        :value="totalGh"
        label="Общую жесткость на"
        suffix="dGh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2"
      />
      <v-text-field
        :value="totalKh"
        label="Карбонатную жесткость на"
        suffix="dKh"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2 ml-2"
      />
      <v-text-field
        :value="CaMgRatio"
        label="Ca / Mg"
        hide-details="auto"
        readonly
        outlined
        persistent-hint
        class="mb-2 ml-2"
      />
    </div>
  </div>
</template>

<script>
import { countGh, countKh } from '@/helpers/funcs/hardness';
import { countRatio } from '@/helpers/funcs/funcs';

export default {
  name: 'TheHardnessTableLiquid',
  props: {
    substance: {
      type: Object,
      default: () => {},
    },
    doseVolume: {
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
      if (!this.substance.volume) {
        return '—';
      }
      const result = countGh(
        this.substance.concentrationPerIon, this.substance.totalReagentsMass, this.volume,
      ) * (this.doseVolume / this.substance.volume);
      return result.toFixed(2);
    },
    totalKh() {
      if (!this.substance.volume) {
        return '—';
      }
      const result = countKh(
        this.substance.concentrationPerIon, this.substance.totalReagentsMass, this.volume,
      ) * (this.doseVolume / this.substance.volume).toFixed(2);
      return result.toFixed(2);
    },
    CaMgRatio() {
      return countRatio(this.substance.concentrationPerIon, 'Ca', 'Mg');
    },
  },
};
</script>

<style scoped>

</style>
