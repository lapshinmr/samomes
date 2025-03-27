<template>
  <v-col
    cols="12"
    sm="8"
    offset-sm="2"
    class="d-flex"
  >
    <v-btn
      color="primary"
      class="mr-0"
      square
      :to="path"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <slot />
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  path: string;
}>();

</script>

<style scoped lang="sass">

</style>
