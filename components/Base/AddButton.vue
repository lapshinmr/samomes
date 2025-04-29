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
  <v-tooltip location="left">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        dark
        fab
        icon="mdi-plus"
        position="fixed"
        :style="`right: calc(${ isOpen ? '255px' : '0px' } + 16px); bottom: 16px; transition: 0.2s;`"
        @click="action"
      />
    </template>
    <slot />
  </v-tooltip>
</template>

<script setup>
defineOptions({
  name: 'AddButton',
});

defineProps({
  action: {
    type: Function,
    default: null,
  },
});

const { isOpen } = storeToRefs(useDrawerStore());
</script>

<style lang="sass" scoped>
</style>
