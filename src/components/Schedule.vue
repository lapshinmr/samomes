<template>
  <div class="row schedule">
    <div class="col-12">
      <h2>Расписание</h2>
    </div>
    <div class="col-1">
      <h6>Аквариум</h6>
      {{ tankVolume }}
    </div>
    <div class="col-1">
      <h6>Ион</h6>
      <div>
        <div>
          NO3
        </div>
        <div>PO4</div>
        <div>K</div>
      </div>
    </div>
    <div class="col-1">
      <h6>NO3</h6>
      <div>
        <input type="text" v-model="amount" class="schedule__amount">
      </div>
    </div>
    <div class="col-1">
      <h6>PO4</h6>
    </div>
    <div class="col-1">
      <h6>K</h6>
    </div>
    <div v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day" class="col-1 schedule__day">
      <h6>{{ day }}</h6>
      <div>
        <div>
          <div>
            NO3
          </div>
          <div>
            {{ ( amount / syringe / 7 ).toFixed(1) }} мл
          </div>
        </div>
        <div>PO4 {{ }}</div>
        <div>K {{ }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  props: {
    'tankVolume': Number,
    'syringe': {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      amount: 0
    }
  }
}
</script>

<style lang="sass" scoped>
.schedule
  .schedule__day
    font-size: 10px
  .schedule__amount
    width: 25px
  .col-1, .col-2
    padding: 0
</style>
