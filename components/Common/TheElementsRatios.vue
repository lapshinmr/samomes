<template>
  <div class="d-flex justify-space-around mt-2 text-body-2">
    <v-text-field
      :model-value="format(No3Po4Ratio, 3) || '—'"
      label="NO3 / PO4"
      variant="outlined"
      readonly
      density="compact"
    />
    <v-text-field
      :model-value="format(No3KRatio, 3) || '—'"
      label="NO3 / K"
      variant="outlined"
      readonly
      density="compact"
      class="ml-2"
    />
    <v-text-field
      :model-value="format(CaMgRatio, 3) || '—'"
      label="Ca / Mg"
      variant="outlined"
      readonly
      density="compact"
      class="ml-2"
    />
    <v-text-field
      :model-value="format(Po4BRatio, 3) || '—'"
      label="PO4 / B"
      variant="outlined"
      readonly
      density="compact"
      class="ml-2"
    />
    <v-text-field
      :model-value="format(FeBRatio, 3) || '—'"
      label="Fe / B"
      variant="outlined"
      readonly
      density="compact"
      class="ml-2"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TheElementsRatios',
});

const props = defineProps<{
  concentration: Record<string, number>;
}>();

const No3Po4Ratio = computed(() => {
  return countRatio(props.concentration, 'NO3', 'PO4');
});

const No3KRatio = computed(() => {
  return countRatio(props.concentration, 'NO3', 'K');
});

const CaMgRatio = computed(() => {
  return countRatio(props.concentration, 'Ca', 'Mg');
});

const Po4BRatio = computed(() => {
  return countRatio(props.concentration, 'PO4', 'B');
});
const FeBRatio = computed(() => {
  return countRatio(props.concentration, 'Fe', 'B');
});
</script>

<style scoped lang="sass">

</style>
