<template>
  <div>
    <div class="d-flex align-center">
      <v-divider v-if="dividers"/>
      <div
        class="flex-shrink-0"
        :class="{
          'mx-3': dividers,
        }"
      >
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
      <v-divider v-if="dividers"/>
    </div>
    <v-expand-transition>
      <div
        v-if="modelValue"
        class="mt-4"
      >
        <slot name="content" />
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean;
    button?: boolean;
    dividers?: boolean;
  }>(),
  {
    modelValue: false,
    button: false,
    dividers: true,
  },
);

const emit = defineEmits(['update:modelValue']);

defineOptions({
  name: 'DividerWithNote',
});
</script>

<style scoped lang="sass">
.transition
  transition: 0.2s
.rotate-180
  transform: rotate(180deg)
</style>
