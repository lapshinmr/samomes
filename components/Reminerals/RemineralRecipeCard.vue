<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
      <span>{{ format(reagent.amount) }} {{ reagent.isLiquid ? t('units.ml') : t('units.g') }}</span>
    </div>
    <v-divider class="my-3" />
    <div>
      <div class="mb-2 mr-sm-4">{{ t('reminerals.card.explanation') }}</div>
      <div
        v-if="remineral.isLiquid"
        class="text-body-2"
      >
        <span class="font-weight-bold">{{ remineral.doseVolume }}</span>
        {{ t('reminerals.card.explanation.dry.t1') }}
        <span class="font-weight-bold">{{ remineral.changeVolume }}</span> {{ t('units.l') }}
        {{ t('reminerals.card.explanation.dry.t2') }}
        <span class="font-weight-bold">{{ format(remineral.gh, 2) }}</span>
        <template v-if="remineral.kh">
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
        <span class="font-weight-bold">{{ format(remineral.gh, 2) }}</span>
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
