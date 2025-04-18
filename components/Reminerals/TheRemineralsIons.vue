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
    <v-table>
      <thead>
        <tr>
          <th>Ион</th>
          <th>Концентрация, мг/л</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[ion, value] in concentrationSorted"
          :key="ion"
        >
          <td>{{ ion }}</td>
          <td>{{ format(value) }} ({{ format(value / concentrationTotal * 100) }}%)</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
}>();

const concentrationSorted = computed(() => {
  const result: [string, number][] = Object.entries(props.remineral.concentrationInChangeWater);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const concentrationTotal = computed(() => {
  return typedValues(props.remineral.concentrationInChangeWater)
    .reduce((acc, value) => acc + value, 0);
});
</script>
