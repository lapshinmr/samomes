<template>
  <Pie
    id="my-chart-id"
    :options="options"
    :data="data"
    :plugins="[ChartDataLabels]"
  />
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData, type ChartOptions } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

defineProps<{
  data: ChartData<'pie'>;
  options: ChartOptions<'pie'>;
}>();

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  annotationPlugin,
);

defineOptions({
  name: 'PieChart',
});
</script>
