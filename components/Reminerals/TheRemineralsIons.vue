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
          v-for="(concentration, ion) in concentrationPerIon"
          :key="ion"
        >
          <td>{{ ion }}</td>
          <td>{{ concentration.toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  concentrationPerIon: {
    type: Object,
    required: true,
  },
});
</script>