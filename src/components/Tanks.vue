<template>
  <div class="row">
    <div
        v-for="(tank, index) in tanks"
        :key="tank.name"
        class="col-4 tank"
    >
      <div class="card">
        <div class="card-body">
          <button type="button" class="close" @click="removeTank(index)">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">
            {{ tank.name }}
          </h5>
          <div class="card-subtitle mb-2 text-muted">
            Объем: {{ tank.volume }} л
          </div>
          <div v-if="tank.length" class="tank__sizes">
            {{ tank.length }} x
            {{ tank.width }} x
            {{ tank.height }} x
            {{ tank.glassThickness }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tanks',
  props: [ 'tanks', 'removeTank' ]
}
</script>

<style lang="sass" scoped>
.tank
  .tank__sizes
    font-size: 0.9rem
</style>
