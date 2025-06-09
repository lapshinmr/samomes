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
  <div>
    <div class="d-flex align-center">
      <v-divider v-if="dividers"/>
      <div
        class="flex-shrink-0"
        :class="{
          'mx-3': dividers,
        }"
      >
        <div
          v-if="button"
          class="cursor-pointer"
          @click="emit('update:modelValue', !modelValue)"
        >
          <slot />
          <v-icon
            icon="mdi-chevron-down"
            class="transition"
            :class="{
              'rotate-180': modelValue,
            }"
          />
        </div>
        <template v-else>
          <slot />
        </template>
      </div>
      <v-divider v-if="dividers"/>
    </div>
    <v-expand-transition>
      <div
        v-if="modelValue"
        class="mt-4"
      >
        <slot name="content" />
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean;
    button?: boolean;
    dividers?: boolean;
  }>(),
  {
    modelValue: false,
    button: false,
    dividers: true,
  },
);

const emit = defineEmits(['update:modelValue']);

defineOptions({
  name: 'DividerWithNote',
});
</script>

<style scoped lang="sass">
.transition
  transition: 0.2s
.rotate-180
  transform: rotate(180deg)
</style>
