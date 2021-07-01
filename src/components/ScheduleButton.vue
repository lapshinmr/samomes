<template>
  <v-btn
    :disabled="disabled"
    block
    x-large
    tile
    :color="['primary', 'primary', 'grey'][status]"
    :outlined="[true, false, true][status]"
    class="mb-2 px-3"
    style="max-width: 100%;"
    @click="clickDay"
  >
    <template v-slot:default>
      <div class="d-flex align-center w-100">
        <v-icon
          :color="['primary', 'white', 'grey'][status]"
        >
          {{ ['far fa-circle', 'far fa-check-circle', 'far fa-times-circle'][status] }}
        </v-icon>
        <div
          class="d-flex justify-start justify-sm-center text-truncate flex-grow-1 text-subtitle-2
                 text-sm-h6 font-weight-regular mx-2"
        >
          <div style="overflow: hidden; text-overflow: ellipsis; position: relative; top: 1px;">
            {{ recipeName }}
          </div>
        </div>
        <div class="d-flex flex-column align-end flex-shrink-1 ml-auto">
          <div
            v-if="value !== null"
            class="text-h6 text-sm-h5"
          >
            {{ value.toFixed(1) }}
          </div>
          <div
            v-else
            class="text-h6 text-sm-h5"
          >
            -
          </div>
          <div class="d-none d-sm-block caption mt-n2">
            {{ sum.toFixed(1) }} /
            {{ amount.toFixed(1) }}
          </div>
        </div>
      </div>
    </template>
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ScheduleButton',
  props: {
    recipeName: {
      type: String,
      default: '',
    },
    dayIndex: {
      type: Number,
      default: 0,
    },
    scheduleIndex: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    sum: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapMutations([
      'SCHEDULE_COMPLETE',
    ]),
    clickDay() {
      this.SCHEDULE_COMPLETE({
        scheduleIndex: this.scheduleIndex,
        indexDay: this.dayIndex,
        recipeName: this.recipeName,
      });
    },
  },
};
</script>

<style scoped>

</style>
