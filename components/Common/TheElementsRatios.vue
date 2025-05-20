<template>
  <div class="text-body-2">
    <div class="d-flex flex-wrap ga-2">
      <v-text-field
        :model-value="format(No3Po4Ratio) || '—'"
        label="NO3 / PO4"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
        style="min-width: 100px;"
      />
      <v-text-field
        :model-value="format(No3KRatio) || '—'"
        label="NO3 / K"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
        style="min-width: 100px;"
      />
      <v-text-field
        :model-value="format(FeMnRatio) || '—'"
        label="Fe / Mn"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
        style="min-width: 100px;"
      />
      <v-text-field
        :model-value="format(CaMgRatio) || '—'"
        label="Ca / Mg"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
        style="min-width: 100px;"
      />
      <v-text-field
        v-if="isGh"
        :model-value="format(gh, 2) || '—'"
        label="Gh"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
        style="min-width: 100px;"
      />
      <v-text-field
        v-for="([el1, el2, ratio], index) in elementsAndRatios"
        :key="`${el1}_${el2}_${index}`"
        :model-value="format(ratio) || '—'"
        :label="`${el1} / ${el2}`"
        variant="outlined"
        readonly
        density="compact"
        hide-details="auto"
        style="min-width: 100px;"
      />
    </div>
    <div
      class="d-flex justify-end text-blue cursor-pointer mt-4"
      @click="isAddRatioPopup = true;"
    >
      Нет нужного соотношения?
    </div>
    <TheAddRatioPopup
      v-model="isAddRatioPopup"
      :concentration="props.concentration"
      @save="onAddElements"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TheElementsRatios',
});

const props = withDefaults(defineProps<{
  concentration: IonsType;
  isGh?: boolean;
}>(), {
  isGh: false,
});

const isAddRatioPopup = ref<boolean>(false);
const elements = ref<[string, string][]>([]);

const No3Po4Ratio = computed(() => {
  return RemineralRecipe.countRatio(props.concentration, 'NO3', 'PO4');
});

const No3KRatio = computed(() => {
  return RemineralRecipe.countRatio(props.concentration, 'NO3', 'K');
});

const CaMgRatio = computed(() => {
  return RemineralRecipe.countRatio(props.concentration, 'Ca', 'Mg');
});

const FeMnRatio = computed(() => {
  return RemineralRecipe.countRatio(props.concentration, 'Fe', 'Mn');
});

// TODO: refactor this place around units
const gh = computed(() => {
  return RemineralRecipe.countGh(props.concentration, 1 / MG_IN_G);
});

const elementsAndRatios = computed(() => {
  return elements.value.map(
    ([el1, el2]) => [el1, el2, RemineralRecipe.countRatio(props.concentration, el1, el2)]);
});

function onAddElements(value: [string, string]) {
  elements.value.push(value);
}
</script>

<style scoped lang="sass">

</style>
