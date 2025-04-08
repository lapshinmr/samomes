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
  data: ChartData<'doughnut'>;
  options: ChartOptions<'doughnut'>;
}>();

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: any) { // TODO: replace any
    const { ctx, width, height, options } = chart;
    ctx.restore();
    const fontSize = height * 0.1;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textBaseline = 'middle';

    const text = options.plugins.centerText.text;
    if (text) {
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2 + fontSize * 0.9;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  },
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  annotationPlugin,
  centerTextPlugin,
);

defineOptions({
  name: 'PieChart',
});
</script>
