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
    <div class="mb-2">{{ t('tanks.card.title') }}</div>
    <div class="text-body-2">
      <div class="d-flex justify-space-between">
        <div>{{ t('tanks.page.volume') }}</div>
        <div>{{ format(tank.volume) }} {{ t('units.l') }}</div>
      </div>
      <div
        v-if="tank.filterVolume"
        class="d-flex justify-space-between"
      >
        <div>{{ t('tanks.filterVolume') }}</div>
        <div>{{ format(tank.filterVolume) }} {{ t('units.l') }}</div>
      </div>
      <div
        v-if="tank.waterChangeVolume"
        class="d-flex justify-space-between"
      >
        <div>{{ t('tanks.waterChangeVolume') }}</div>
        <div>
          {{ format(tank.waterChangeVolume) }} {{ t('units.l') }}
          ({{ format(tank.waterChangePercent) }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  tank: InstanceType<typeof Tank>;
}>();
</script>

<style scoped lang="sass">

</style>
