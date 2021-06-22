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
      return this.isFocused ? value : value.toFixed(2);
    },
  },
};
</script>

<style scoped>

</style>
