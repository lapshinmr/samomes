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
  <v-menu
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        v-on="on"
      >
        {{ curLang }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(title, short, index) in LANGUAGES"
        @click="langSet(short)"
        :key="index"
      >
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { LANGUAGES } from '@/constants/lang';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      LANGUAGES,
    };
  },
  computed: {
    ...mapState([
      'lang',
    ]),
    curLang() {
      return this.LANGUAGES[this.lang];
    },
  },
  methods: {
    ...mapActions([
      'langSet',
    ]),
  },
};
</script>
