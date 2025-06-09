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
  <v-row>
    <v-col
      cols="12"
      class="text-h6 text-center"
    >
      TDS ~{{ format(remineral.tds) }} ppm
    </v-col>
    <v-col
      cols="5"
      sm="2"
    >
      <div class="text-h6 mb-4">
        {{ t('reminerals.page.cations') }}
      </div>
      <div>
        <div
          v-for="(value, ion) in remineral.cations"
          :key="ion"
          class="d-flex justify-space-between mb-3 text-body-2"
        >
          <div class="font-weight-medium">{{ ion }}</div>
          <div class="text-right">
            <div>{{ format(value[0] * 100) }}%</div>
            <div>{{ format(value[1]) }}, {{ t('units.mg/l') }}</div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col
      cols="7"
      sm="4"
    >
      <PieChart
        :data="cationsData"
        :options="options"
      />
    </v-col>
    <v-col
      cols="5"
      sm="2"
    >
      <div class="text-h6 mb-4">
        {{ t('reminerals.page.anions') }}
      </div>
      <div>
        <div
          v-for="(value, ion) in remineral.anions"
          :key="ion"
          class="d-flex justify-space-between mb-3 text-body-2"
        >
          <div class="font-weight-medium">{{ ion }}</div>
          <div class="text-right">
            <div>{{ format(value[0] * 100) }}%</div>
            <div>{{ format(value[1]) }}, {{ t('units.mg/l') }}</div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col
      cols="7"
      sm="4"
    >
      <PieChart
        :data="anionsData"
        :options="options"
      />
    </v-col>
    <v-col cols="12">
      <div class="text-h6 mb-2">
        {{ t('reminerals.page.ionsTotal') }}
      </div>
      <div class="d-flex flex-wrap">
        <span
          v-for="[ion, value] in sortObject(remineral.concentrationInChangeWater)"
          :key="ion"
          class="mr-2"
        >
          <span class="font-weight-medium mr-1">{{ ion }}:</span>
          <span>{{ format(value / remineral.tds * 100) }}%</span>
        </span>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ChartData } from 'chart.js';

const { t } = useI18n();

const props = defineProps<{
  remineral: InstanceType<typeof RemineralRecipe>;
}>();

const cationsData = computed(() => {
  const cations = Object.entries(props.remineral.cations).filter(([, value]) => value[0] > 0);
  cations.sort((a, b) => b[1][0] - a[1][0]);
  const labels = cations.map(([key]) => key);
  const values = cations.map(([, value]) => value[1]);
  return {
    datasets: [
      {
        backgroundColor: ['#4db6ac', '#ff8a65', '#64B5F6'],
        data: values,
        datalabels: {
          color: 'white',
          font: {
            size: 20,
          },
          formatter: function(_, context) {
            return labels[context.dataIndex];
          },
        },
      },
    ],
  } as ChartData<'pie'>;
});

const anionsData = computed(() => {
  const anions = Object.entries(props.remineral.anions).filter(([, value]) => value[0] > 0);
  anions.sort((a, b) => b[1][0] - a[1][0]);
  const labels = anions.map(([key]) => key);
  const values = anions.map(([, value]) => value[1]);
  return {
    datasets: [
      {
        backgroundColor: ['#4db6ac', '#ff8a65', '#64B5F6'],
        data: values,
        datalabels: {
          color: 'white',
          font: {
            size: 20,
          },
          formatter: function(_, context) {
            return labels[context.dataIndex];
          },
        },
      },
    ],
  } as ChartData<'pie'>;
});

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
}));
</script>

<style scoped lang="sass">

</style>
