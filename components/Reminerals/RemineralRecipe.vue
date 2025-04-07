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
    <div class="d-flex flex-column flex-sm-row">
      <div class="mr-sm-4">
        <div class="text-subtitle-1 mb-2">
          Жесткость
        </div>
        <div class="d-flex">
          <v-text-field
            :value="remineral.gh.toFixed(2)"
            label="Gh"
            suffix="dGh"
            hide-details="auto"
            readonly
            outlined
            persistent-hint
            class="mb-3 mr-3"
          />
          <v-text-field
            :value="remineral.kh.toFixed(2)"
            label="Kh"
            suffix="dKh"
            hide-details="auto"
            readonly
            outlined
            persistent-hint
            class="mb-3"
          />
        </div>
      </div>
      <div>
        <div class="text-subtitle-1 mb-2">
          Объем
        </div>
        <v-text-field
          :value="remineral.volume"
          label="Объем"
          suffix="л"
          hide-details="auto"
          readonly
          outlined
          persistent-hint
          class="mb-3"
        />
      </div>
    </div>
    <div v-if="remineral.note" class="text-subtitle-1 mb-2">
      Примечание
    </div>
    <div v-if="remineral.note" class="mb-4">
      {{ remineral.note }}
    </div>
    <div class="text-subtitle-1 mb-2">
      Реагенты
    </div>
    <div class="d-flex flex-column">
      <div
        v-for="(mass, name) in remineral.mass"
        :key="name"
        class="d-flex justify-space-between mb-1"
      >
        <div>{{ name }}</div>
        <div>{{ mass }} г</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RemineralType } from '~/utils/types/types';

defineProps({
  remineral: {
    type: Object as PropType<RemineralType>,
    required: true,
  },
});
</script>