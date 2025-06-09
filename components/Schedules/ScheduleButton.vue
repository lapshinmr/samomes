<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License. To view a copy of this license, visit
  http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
  Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

  You are free to:
  - Share — copy and redistribute the material in any medium or format
  - Adapt — remix, transform, and build upon the material

  Under the following terms:
  - Attribution — You must give appropriate credit
  - NonCommercial — You may not use the material for commercial purposes
  - ShareAlike — If you remix, transform, or build upon the material,
    you must distribute your contributions under the same license as the original

  No warranties are given. The license may not give you all of the permissions
  necessary for your intended use.
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
