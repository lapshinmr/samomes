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
  <v-btn
    v-bind="$attrs"
    block
    size="x-large"
    tile
    :color="color"
    :variant="variant"
    class="mb-2 px-3"
    :disabled="!amount"
  >
    <template #default>
      <div class="d-flex justify-space-between align-center w-100">
        <div class="text-truncate text-subtitle-2 text-sm-h6 font-weight-regular mx-2">
          <div
            class="text-uppercase"
            style="overflow: hidden; text-overflow: ellipsis;"
          >
            {{ fertilizerName }}
          </div>
        </div>
        <div
          v-if="amount > 0"
          class="text-h6 text-sm-h5 ml-2"
        >
          {{ format(amount) }}
        </div>
      </div>
    </template>
  </v-btn>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ScheduleButton',
});

const props = defineProps<{
  fertilizerName: string;
  amount: number;
  status: AmountStatus;
}>();

const color = computed(() => ['primary', 'primary', 'grey'][props.status]);
const variant = computed<'outlined' | 'elevated'>(() => {
  return ['outlined', 'elevated', 'outlined'][props.status] as 'outlined' | 'elevated';
});
</script>

<style lang="sass">
.v-btn__content
  width: 100%
</style>
