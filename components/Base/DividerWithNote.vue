<template>
  <div class="d-flex align-center">
    <v-divider />
    <div class="mx-3 flex-shrink-0">
      <v-btn
        v-if="button"
        center
        variant="text"
        @click="emit('update:modelValue', !modelValue)"
      >
        <slot />
        <v-icon>{{ modelValue ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      <template v-else>
        <slot />
      </template>
    </div>
    <v-divider />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean;
    button?: boolean;
  }>(),
  {
    modelValue: false,
    button: false,
  },
);

const emit = defineEmits(['update:modelValue']);

defineOptions({
  name: 'BaseDividerWithNote',
});
</script>

<style scoped lang="sass">

</style>
