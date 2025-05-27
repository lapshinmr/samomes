<template>
  <Line
    id="my-chart-id"
    :options="options"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
);

defineProps<{
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}>();
</script>
