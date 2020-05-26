<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options', 'styles'],
  mounted () {
    this.renderChart(this.chartData, {
      maintainAspectRatio: false,
      responsive: true
    })
  },
  watch: {
    chartData () {
      this.renderChart(this.chartData, {
        maintainAspectRatio: false,
        responsive: true,
        animation: false
      })
    }
  }
}
</script>

<style>
</style>
