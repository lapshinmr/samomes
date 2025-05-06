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
