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
    <div class="mb-2">Рецепт</div>
    <div
      v-for="reagent in remineral.reagents"
      :key="reagent.key"
      class="d-flex justify-space-between text-body-2"
    >
      <span>{{ reagent.name }}</span>
      <span>{{ format(reagent.amount) }} {{ reagent.isLiquid ? 'мл' : 'г' }}</span>
    </div>
    <div
      v-if="remineral.isLiquid"
      class="d-flex justify-space-between text-body-2"
    >
      <span>Вода</span>
      <span>{{ remineral.waterVolume }} мл</span>
    </div>
    <v-divider class="my-3" />
    <div>
      <div class="mb-2 mr-sm-4">Расшифровка</div>
      <div
        v-if="remineral.isLiquid"
        class="text-body-2"
      >
        <span class="font-weight-bold">{{ remineral.doseVolume }}</span>
        мл реминерализатора повышают в
        <span class="font-weight-bold">{{ remineral.changeVolume }}</span> л
        Gh на
        <span class="font-weight-bold">{{ format(remineral.gh, 2) }}</span>
        <template v-if="remineral.kh">
          и Kh на
          <span class="font-weight-bold">{{ format(remineral.kh, 2) }}</span>
        </template>
      </div>
      <div
        v-else
        class="text-body-2"
      >
        <span class="font-weight-bold">{{ format(remineral.totalMass, 3) }}</span>
        г реминерализатора повышают в
        <span class="font-weight-bold">{{ remineral.changeVolume }}</span> л
        Gh на
        <span class="font-weight-bold">{{ format(remineral.gh, 2) }}</span>
        <template v-if="!!remineral.kh">
          и Kh на
          <span class="font-weight-bold">{{ format(remineral.kh) }}</span>
        </template>
      </div>
    </div>
    <v-divider
      v-if="remineral.description"
      class="my-3"
    />
    <div v-if="remineral.description">
      <div class="mb-2 mr-sm-4">Описание</div>
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
defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
}>();

defineOptions({
  name: 'RemineralRecipeCard',
});
</script>
