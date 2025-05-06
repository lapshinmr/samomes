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
        rounded="xl"
        position="fixed"
        :style="style"
        @click="action"
      >
        <Icon
          name="mdi:plus"
        />
        {{ t('buttons.add') }}
      </v-btn>
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

const { t } = useI18n();
const { smAndUp } = useDisplay();

const { isOpen } = storeToRefs(useDrawerStore());

const style = computed(() => {
  let style = 'transition: 0.2s; z-index: 999;';
  if (smAndUp.value) {
    style += ` right: calc(${ isOpen ? '255px' : '0px' } + 16px); bottom: 128px;`;
  } else {
    style += ' right: 16px; bottom: 16px;';
  }
  return style;
});
</script>

<style lang="sass" scoped>
</style>
