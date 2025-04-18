<template>
  <v-row class="my-8">
    <v-col
      cols="12"
      class="text-h6 text-center"
    >
      TDS ~{{ format(remineral.tds) }} ppm
    </v-col>
    <v-col cols="2">
      <div class="text-h6 mb-4">
        Катионы
      </div>
      <div>
        <div
          v-for="(value, ion) in remineral.cations"
          :key="ion"
          class="d-flex justify-space-between mb-3 text-body-2"
        >
          <div class="font-weight-medium">{{ ion }}</div>
          <div>
            <div>{{ format(value[0] * 100) }}%</div>
            <div>{{ format(value[1]) }}, мг/л</div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="4">
      <BasePieChart
        :data="cationsData"
        :options="options"
      />
    </v-col>
    <v-col cols="2">
      <div class="text-h6 mb-4">
        Анионы
      </div>
      <div>
        <div
          v-for="(value, ion) in remineral.anions"
          :key="ion"
          class="d-flex justify-space-between mb-3 text-body-2"
        >
          <div class="font-weight-medium">{{ ion }}</div>
          <div>
            <div>{{ format(value[0] * 100) }}%</div>
            <div>{{ format(value[1]) }}, мг/л</div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="4">
      <BasePieChart
        :data="anionsData"
        :options="options"
      />
    </v-col>
    <v-col cols="12">
      <div class="text-h6 mb-2">
        Общий ионный состав
      </div>
      <div>
        <span
          v-for="[ion, value] in concentrationSorted"
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

const concentrationSorted = computed(() => {
  const result: [string, number][] = Object.entries(props.remineral.concentrationInChangeWater);
  result.sort((a, b) => b[1] - a[1]);
  return result;
});

const concentrationTotal = computed(() => {
  return typedValues(props.remineral.concentrationInChangeWater)
    .reduce((acc, value) => acc + value, 0);
});
</script>

<style scoped lang="sass">

</style>
