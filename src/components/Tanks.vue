<template lang="html">
  <div class="">
    <div v-for="(volume, index) in tanks" :key="volume" class="d-flex justify-content-between mt-3">
      <div @click="selectTank(volume)" style="cursor: pointer" >
        {{ volume }} л
      </div>
      <div v-if="tankSelected === volume">+</div>
      <div @click="removeTank(index)" style="cursor: pointer">
        удалить
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tanks',
  props: [ 'tanks', 'tankSelected', 'selectTank', 'removeTank' ]
}
</script>

<style lang="css" scoped>
</style>
