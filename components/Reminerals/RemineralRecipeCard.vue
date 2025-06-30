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
    <div class="mb-2">{{ t('reminerals.card.reagents') }}</div>
    <div
      v-for="reagent in remineral.reagents"
      :key="reagent.key"
      class="d-flex justify-space-between text-body-2"
    >
      <span>{{ reagent.name }}</span>
      <span class="flex-shrink-0 ml-1">
        {{ format(reagent.amount) }} {{ reagent.isLiquid ? t('units.ml') : t('units.g') }}
      </span>
    </div>
    <v-divider class="my-3" />
    <div>
      <div class="mb-2 mr-sm-4">{{ t('reminerals.card.explanationTitle') }}</div>
      <div
        v-if="remineral.isLiquid"
        class="text-body-2"
      >
        <span class="font-weight-bold">{{ remineral.doseVolume }}</span>
        {{ t('reminerals.card.explanation.dry.t1') }}
        <span class="font-weight-bold">{{ remineral.changeVolume }}</span> {{ t('units.l') }}
        {{ t('reminerals.card.explanation.dry.t2') }}
        <span class="font-weight-bold mr-1">{{ format(remineral.gh, 2) }}</span>
        <template v-if="!!remineral.kh">
          {{ t('reminerals.card.explanation.dry.t3') }}
          <span class="font-weight-bold">{{ format(remineral.kh, 2) }}</span>
        </template>
      </div>
      <div
        v-else
        class="text-body-2"
      >
        <span class="font-weight-bold">{{ format(remineral.totalMass) }}</span>
        {{ t('reminerals.card.explanation.liquid.t1') }}
        <span class="font-weight-bold">{{ remineral.changeVolume }}</span> {{ t('units.l') }}
        {{ t('reminerals.card.explanation.liquid.t2') }}
        <span class="font-weight-bold mr-1">{{ format(remineral.gh, 2) }}</span>
        <template v-if="!!remineral.kh">
          {{ t('reminerals.card.explanation.liquid.t3') }}
          <span class="font-weight-bold">{{ format(remineral.kh) }}</span>
        </template>
      </div>
    </div>
    <v-divider
      v-if="remineral.description"
      class="my-3"
    />
    <div v-if="remineral.description">
      <div class="mb-2 mr-sm-4">{{ t('reminerals.card.description') }}</div>
      <div
        class="text-body-2"
        style="word-break: break-word; white-space: pre-wrap;"
      >
        {{ remineral.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
}>();

defineOptions({
  name: 'RemineralRecipeCard',
});
</script>
