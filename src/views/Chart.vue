<!--
  Samomes

  Copyright (C) 2020 Mikhail Lapshin

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
