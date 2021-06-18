<template>
  <v-col
    cols="12"
    sm="8"
    offset-sm="2"
  >
    <h1 :class="{'d-none': $vuetify.breakpoint['xs'], 'text-h4': $vuetify.breakpoint['smAndUp']}">
      <slot />
    </h1>
  </v-col>
</template>

<script>
export default {
  name: 'PageTitle',
};
</script>

<style scoped>

</style>
