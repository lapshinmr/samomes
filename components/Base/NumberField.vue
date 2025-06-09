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
  <v-text-field
    :model-value="model"
    :inputmode="inputmode"
    variant="underlined"
    @update:model-value="onInput"
    @click:append="$emit('click:append', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'NumberField',
});

const model = defineModel<string | number>({ required: true });

withDefaults(defineProps<{
  inputmode?: string;
}>(), {
  inputmode: 'decimal',
});

const emit = defineEmits(['update:modelValue', 'click:append']);

function onInput(value: string | number) {
  let valueReplaced = value;
  if (typeof value === 'string') {
    valueReplaced = +(
      value
        .replace(',', '.')
        .replace(/[^0-9,.]/g, '')
    );
  }
  emit('update:modelValue', valueReplaced);
}
</script>

<style scoped>

</style>
