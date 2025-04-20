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
    <div class="d-flex justify-space-between">
      <div class="mb-2">Состав</div>
      <div class="d-flex text-body-2">
        <div>
          <table>
            <tr
              v-for="[ion, value] in sortObject(fertilizer.ions)"
              :key="ion + 'name'"
            >
              <td>{{ ion }}</td>
              <td class="d-flex justify-end ml-2">
                <span>{{ format(value, 3) }}</span>
                <span class="ml-1">{{ fertilizer.isPercent ? "%" : "г/л" }}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <template v-if="fertilizer.description">
      <v-divider class="my-3" />
      <div>
        <div class="mb-3 mr-md-3">Описание</div>
        <div
          class="text-body-2"
          style="word-break: break-word; white-space: pre-wrap"
        >
          {{ fertilizer.description }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'FertilizerCard',
});

defineProps<{
  fertilizer: InstanceType<typeof Fertilizer>;
}>();
</script>

<style scoped></style>
