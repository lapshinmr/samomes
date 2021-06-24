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
