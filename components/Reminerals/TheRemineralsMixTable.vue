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
    <div class="d-flex align-end mb-2">
      <div class="mr-2 mb-1">
        {{ t('reminerals.page.mix.t1') }}
      </div>
      <div style="width: 60px">
        <NumberField
          v-model="requiredMixMass"
          :suffix="t('units.g')"
          hide-details="auto"
          class="mt-0 pt-0"
        />
      </div>
      ,
      <div class="ml-4 mb-1">
        {{ t('reminerals.page.mix.t2') }}
      </div>
    </div>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="reagent in remineral.reagents"
            :key="reagent.key"
            class="text-left"
          >
            {{ reagent.key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="reagent in remineral.reagents"
            :key="reagent.key"
          >
            {{ format(reagent.amount / remineral.totalMass * requiredMixMass) }} {{ t('units.g') }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineOptions({
  name: 'TheRemineralsCompoundsTable',
});

defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
}>();

const requiredMixMass = ref(100);
</script>
