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
        <Icon name="mdi:plus" />
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
const { mdAndUp } = useDisplay();

const style = computed(() => {
  let style = 'z-index: 999;';
  if (mdAndUp.value) {
    style += ' right: 32px; bottom: 128px;';
  } else {
    style += ' right: 16px; bottom: 24px;';
  }
  return style;
});
</script>

<style lang="sass" scoped>
</style>
