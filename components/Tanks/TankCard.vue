<template>
  <div>
    <div class="mb-2">Параметры аквариума</div>
    <div class="text-body-2">
      <div class="d-flex justify-space-between">
        <div>{{ t('tanks.dialog.volume') }}</div>
        <div>{{ format(tank.volume, 1) }} {{ t('units.l') }}</div>
      </div>
      <template v-if="tank.length">
        <div class="d-flex justify-space-between">
          <div>{{ t('tanks.dialog.length') }}</div>
          <div>{{ format(tank.length, 1) }} {{ t('units.cm') }}</div>
        </div>
        <div class="d-flex justify-space-between">
          <div>{{ t('tanks.dialog.width') }}</div>
          <div>{{ format(tank.width, 1) }} {{ t('units.cm') }}</div>
        </div>
        <div class="d-flex justify-space-between">
          <div>{{ t('tanks.dialog.height') }}</div>
          <div>{{ format(tank.height, 1) }} {{ t('units.cm') }}</div>
        </div>
        <div class="d-flex justify-space-between">
          <div>{{ t('tanks.dialog.glassThickness') }}</div>
          <div>{{ tank.glassThickness }} {{ t('units.mm') }}</div>
        </div>
      </template>
      <div
        v-if="tank.filterVolume"
        class="d-flex justify-space-between"
      >
        <div>{{ t('tanks.dialog.filter') }}</div>
        <div>{{ format(tank.filterVolume, 1) }} {{ t('units.l') }}</div>
      </div>
      <div
        v-if="tank.soilVolume"
        class="d-flex justify-space-between"
      >
        <div>{{ t('tanks.dialog.soil') }}</div>
        <div>{{ format(tank.soilVolume, 1) }} {{ t('units.l') }}</div>
      </div>
      <div
        v-if="tank.waterChangeVolume"
        class="d-flex justify-space-between"
      >
        <div>{{ t('tanks.dialog.waterChange') }}</div>
        <div>
          {{ format(tank.waterChangeVolume, 1) }} {{ t('units.l') }}
          ({{ format(tank.waterChangePercent, 3) }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  tank: TankType;
}>();
</script>

<style scoped lang="sass">

</style>
