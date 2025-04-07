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
    <div class="d-flex align-center mb-2">
      <div class="mr-4">
        Хочу подготовить
      </div>
      <div style="width: 60px">
        <BaseNumberField
          v-model="requiredMixMass"
          suffix="г"
          hide-details="auto"
          class="mt-0 pt-0"
        />
      </div>
    </div>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="reagent in remineral.reagents"
            :key="reagent.key"
            class="text-left"
          >
            {{ reagent.key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="reagent in remineral.reagents"
            :key="reagent.key"
          >
            {{ format(reagent.amount / remineral.totalMass * requiredMixMass) }} г
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'TheRemineralsCompoundsTable',
});

defineProps<{
  remineral: Remineral;
}>();

const requiredMixMass = ref(100);
</script>
