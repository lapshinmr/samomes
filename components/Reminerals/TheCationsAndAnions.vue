<template>
  <v-row>
    <v-col
      cols="12"
      class="text-h6 text-center"
    >
      TDS ~{{ format(remineral.tds) }} ppm
    </v-col>
    <v-col
      cols="4"
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
          <div>
            <div>{{ format(value[0] * 100) }}%</div>
            <div>{{ format(value[1]) }}, {{ t('units.mg/l') }}</div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col
      cols="8"
      sm="4"
    >
      <BasePieChart
        :data="cationsData"
        :options="options"
      />
    </v-col>
    <v-col
      cols="4"
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
          <div>
            <div>{{ format(value[0] * 100) }}%</div>
            <div>{{ format(value[1]) }}, {{ t('units.mg/l') }}</div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col
      cols="8"
      sm="4"
    >
      <BasePieChart
        :data="anionsData"
        :options="options"
      />
    </v-col>
    <v-col cols="12">
      <div class="text-h6 mb-2">
        {{ t('reminerals.page.ionsTotal') }}
      </div>
      <div>
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
