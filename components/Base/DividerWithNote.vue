<template>
  <div class="d-flex align-center">
    <v-divider />
    <div class="mx-3 flex-shrink-0">
      <div
        v-if="button"
        class="cursor-pointer"
        @click="emit('update:modelValue', !modelValue)"
      >
        <slot />
        <v-icon
          icon="mdi-chevron-down"
          class="transition"
          :class="{
            'rotate-180': modelValue,
          }"
        />
      </div>
      <template v-else>
        <slot />
      </template>
    </div>
    <v-divider />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
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

// const style = computed(() => {
//   let result = 'transition: 0.2s;';
//   if (props.modelValue) {
//     result += ' transform: rotate(180)';
//   } else {
//     result += ' transform: rotate(0)';
//   }
//   return result;
// });
//
defineOptions({
  name: 'BaseDividerWithNote',
});
</script>

<style scoped lang="sass">
.transition
  transition: 0.2s
.rotate-180
  transform: rotate(180deg)
</style>
