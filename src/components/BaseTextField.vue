<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

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
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :value="countValue($attrs.value)"
    @input="onInput"
    @focus="toggleFocus(true)"
    @blur="toggleFocus(false)"
  />
</template>

<script>
export default {
  name: 'BaseTextField',
  inheritAttrs: false,
  props: {
    precisionShow: {
      type: Number,
      default: 2,
    },
    precisionValue: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    toggleFocus(value) {
      this.isFocused = value;
    },
    countValue(value) {
      if (value === undefined || value === null || Number.isNaN(+value)) {
        return '';
      }
      if (this.isFocused) {
        let result = value;
        if (this.precisionValue !== undefined && !Number.isNaN(+value)) {
          result = Math.round(+value * 10 ** this.precisionValue) / 10 ** this.precisionValue;
        }
        return result;
      }
      let [result, right] = (+value).toFixed(this.precisionShow).split('.');
      if (right) {
        right = right.split('');
        right.reverse();
        let valueEdited = '';
        let found = false;
        right.forEach((item) => {
          if (item !== '0') {
            found = true;
          }
          if (found) {
            valueEdited = item + valueEdited;
          }
        });
        if (valueEdited) {
          result = `${result}.${valueEdited}`;
        }
      }
      return result;
    },
    onInput(value) {
      return this.$emit('input', value);
    },
  },
};
</script>

<style scoped>

</style>
