<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License. To view a copy of this license, visit
  http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
  Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

  You are free to:
  - Share — copy and redistribute the material in any medium or format
  - Adapt — remix, transform, and build upon the material

  Under the following terms:
  - Attribution — You must give appropriate credit
  - NonCommercial — You may not use the material for commercial purposes
  - ShareAlike — If you remix, transform, or build upon the material,
    you must distribute your contributions under the same license as the original

  No warranties are given. The license may not give you all of the permissions
  necessary for your intended use.
-->

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
