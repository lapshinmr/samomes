<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
    v-on="$listeners"
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
            v-if="value !== ''"
            class="text-h6 text-sm-h5"
          >
            {{ value | precision(2) }}
          </div>
          <div
            v-else
            class="text-h6 text-sm-h5"
          >
            -
          </div>
          <div class="d-none d-sm-block caption mt-n2">
            {{ sum }} / {{ amount }}
          </div>
        </div>
      </div>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: 'ScheduleButton',
  props: {
    recipeName: {
      type: String,
      default: '',
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
      type: [String, Number],
      default: 0,
    },
    sum: {
      type: Number,
      default: 0,
    },
    amount: {
      type: [String, Number],
      default: 0,
    },
  },
};
</script>

<style scoped>

</style>
