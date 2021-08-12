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
    @input="$emit('input', $event)"
    @focus="toggleFocus(true)"
    @blur="toggleFocus(false)"
  />
</template>

<script>
export default {
  name: 'BaseTextField',
  inheritAttrs: false,
  props: {
    precision: {
      type: Number,
      default: 2,
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
      if (typeof value === 'string') {
        return '';
      }
      if (value === undefined || value === null) {
        return '';
      }
      if (this.isFocused) {
        return value;
      }
      const result = value.toFixed(this.precision).split('');
      result.reverse();
      let valueEdited = '';
      let found = false;
      result.forEach((item) => {
        if (item !== '0' && item !== '.') {
          found = true;
        }
        if (found) {
          valueEdited = item + valueEdited;
        }
      });
      return valueEdited;
    },
  },
};
</script>

<style scoped>

</style>
