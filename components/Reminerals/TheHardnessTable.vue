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
    <div
      v-if="remineral.isDry"
      class="d-flex mb-4"
    >
      <div class="mx-2 align-self-end mb-1">
        <span class="font-weight-medium">{{ format(remineral.totalMass) }} {{ t('units.g') }}</span>
        {{ t('reminerals.page.explanation.dry') }}
      </div>
      <div style="width: 60px;">
        <NumberField
          v-model="changeVolume"
          :suffix="t('units.l')"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
    </div>
    <div
      v-else
      class="d-flex mb-4"
    >
      <div style="width: 80px;">
        <NumberField
          v-model="doseVolume"
          :suffix="t('units.ml')"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
      <div class="mx-3 align-self-end mb-1">
        {{ t('reminerals.page.explanation.liquid') }}
      </div>
      <div style="width: 60px;">
        <NumberField
          v-model="changeVolume"
          :suffix="t('units.l')"
          hide-details="auto"
          class="mt-0 pt-0"
          style="flex-basis: 0;"
        />
      </div>
    </div>
    <div class="d-flex">
      <NumberField
        v-model="gh"
        label="Gh"
        suffix="Gh"
        variant="outlined"
        hide-details="auto"
        class="mb-2 flex-1-0-0"
        :disabled="gh === null"
      />
      <NumberField
        v-model="kh"
        label="Kh"
        suffix="Kh"
        variant="outlined"
        hide-details="auto"
        class="mb-2 ml-2 flex-1-0-0"
        :disabled="kh === null || khDisabled"
      />
      <NumberField
        v-model="caMgRatio"
        label="Ca / Mg"
        variant="outlined"
        hide-details="auto"
        class="mb-2 ml-2 flex-1-0-0"
        :disabled="caMgRatio === null || caMgRatioDisabled"
      />
    </div>
    <div class="d-flex align-center text-body-2 text-grey-darken-1">
      <Icon
        name="mdi-information-outline"
        size="16"
        class="mr-1 flex-shrink-0"
      /> {{ t('reminerals.page.ghKhHint') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const changeVolume = defineModel<number>('changeVolume');
const doseVolume = defineModel<number>('doseVolume');
const gh = defineModel<number>('gh');
const kh = defineModel<number>('kh');
const caMgRatio = defineModel<number>('caMgRatio');

withDefaults(defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
  khDisabled?: boolean;
  caMgRatioDisabled?: boolean;
}>(), {
  khDisabled: false,
  caMgRatioDisabled: false,
});
</script>
