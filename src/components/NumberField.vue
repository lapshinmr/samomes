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
    @focus="toggleFocus(true)"
    @blur="toggleFocus(false)"
  />
</template>

<script>
export default {
  name: 'NumberField',
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
    trimZeros(value) {
      let [left, right] = (+value).toFixed(this.precisionShow).split('.');
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
      }
      return left;
    },
    prepareValue(value) {
      if (value === undefined || value === null || value === '') {
        return '';
      }
      let result = value;
      if (this.isFocused) {
        if (!Number.isNaN(value)) {
          result = value.toFixed(this.precisionValue || this.precisionShow);
          return +result;
        }
      }
      result = value.toFixed(this.precisionShow);
      result = this.trimZeros(result);
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
