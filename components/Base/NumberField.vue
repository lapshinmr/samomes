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
  <v-text-field
    :model-value="model"
    :inputmode="inputmode"
    variant="underlined"
    @update:model-value="onInput"
    @click:append="$emit('click:append', $event)"
  />
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
    valueReplaced = +(value.replace(',', '.').replace(/[^0-9,.]/g, ''));
  }
  emit('update:modelValue', valueReplaced);
}
</script>

<style scoped>

</style>
