<template>
  <div class="d-flex ga-2 flex-column flex-sm-row text-body-2">
    <div class="d-flex ga-2 flex-grow-1">
      <v-text-field
        :model-value="format(No3Po4Ratio) || '—'"
        label="NO3 / PO4"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
      />
      <v-text-field
        :model-value="format(No3KRatio) || '—'"
        label="NO3 / K"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
      />
      <v-text-field
        :model-value="format(Po4BRatio) || '—'"
        label="PO4 / B"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
      />
    </div>
    <div class="d-flex ga-2 flex-grow-1">
      <v-text-field
        :model-value="format(FeBRatio) || '—'"
        label="Fe / B"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
      />
      <v-text-field
        :model-value="format(CaMgRatio) || '—'"
        label="Ca / Mg"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
      />
      <v-text-field
        v-if="isGh"
        :model-value="format(gh, 2) || '—'"
        label="dGh"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TheElementsRatios',
});

const props = withDefaults(defineProps<{
  concentration: Partial<Record<IonType, number>>;
  isGh?: boolean;
}>(), {
  isGh: false,
});

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

const gh = computed(() => {
  return props.concentration['Ca'] / GH['Ca'] + props.concentration['Mg'] / GH['Mg'];
});
</script>

<style scoped lang="sass">

</style>
