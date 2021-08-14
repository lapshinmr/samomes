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
    :value="prepareValue($attrs.value)"
    @input="onInput"
    @focus="isFocused = true"
    @blur="isFocused = false"
  />
</template>

<script>
export default {
  name: 'NumberField',
  inheritAttrs: false,
  // model: {
  //   prop: 'value',
  //   event: 'input',
  // },
  props: {
    // value: {
    //   type: [String, Number],
    //   default: '',
    // },
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
    prepareValue(value) {
      if (value === undefined || value === null) {
        return '';
      }
      let result = value;
      if (this.isFocused) {
        result = value.toString();
        if (this.precisionValue !== undefined && !Number.isNaN(value)) {
          const [left, right] = result.split('.');
          if (right) {
            result = `${left}${right ? '.' : ''}${right.substring(0, this.precisionValue)}`;
          }
          // value = Math.round(value * 10 ** this.precisionValue) / 10 ** this.precisionValue;
          // value = value.toString();
        }
      } else {
        result = value.toFixed(this.precisionShow);
      }
      let [left, right] = result.split('.');
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
          left = `${left}.${valueEdited}`;
        }
        result = left;
      }
      console.log('result', result);
      return result;
    },
    onInput(value) {
      value = +(value.replace(',', '.').replace(/[^0-9,.]/g, ''));
      return this.$emit('input', value);
    },
  },
};
</script>

<style scoped>

</style>
