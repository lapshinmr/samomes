<template>
  <v-tooltip left>
    <template #activator="{ on }">
      <v-btn
        color="primary"
        dark
        fab
        @click="action"
        v-on="on"
        fixed
        bottom
        right
        :class="{'drawer': drawer && $vuetify.breakpoint['smAndUp']}"
        style="transition: all 0.2s;"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span><slot /></span>
  </v-tooltip>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AddButton',
  props: {
    action: {
      type: Function,
      default: null,
    },
  },
  computed: {
    ...mapState([
      'drawer',
    ]),
  },
};
</script>

<style scoped>

</style>
