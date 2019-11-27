<template>
  <div class="row mt-4">
    <div class="col-12 d-flex">
      <div v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day" class="flex-fill schedule__day">
        <h6>{{ day }}</h6>
        <div>
          <div>
            <div>
              NO3
            </div>
            <div>
              {{ }} мл
            </div>
          </div>
          <div>PO4 </div>
          <div>K {{  }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>
.schedule
  .schedule__day
    font-size: 10px
  .schedule__amount
    width: 25px
    display: block
</style>
