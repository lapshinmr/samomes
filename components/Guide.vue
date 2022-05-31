<!--
  Samomes

  Copyright (C) 2022 Mikhail Lapshin

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
  <v-col
    v-if="!guideIsClosed[dst]"
    cols="12"
    md="8"
    offset-md="2"
  >
    <v-card>
      <v-card-text>
        <div class="guide">
          <span class="guide__close">
            <v-tooltip
              bottom
              max-width="400"
            >
              <template #activator="{ on }">
                <a
                  class="ml-3 font-weight-light"
                  @click="GUIDE_CLOSE(dst)"
                  v-on="on"
                >
                  <v-icon>mdi-close</v-icon>
                </a>
              </template>
              Закрыть подсказку
            </v-tooltip>
          </span>
          <p
            :class="{'text-subtitle-2': $vuetify.breakpoint['xs'], 'text-subtitle-1': $vuetify.breakpoint['smAndUp']}"
            class="guide__text"
          >
            <slot />
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Guide',
  computed: {
    ...mapState([
      'guideIsClosed',
    ]),
    dst() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapMutations([
      'GUIDE_CLOSE',
    ]),
  },
};
</script>

<style lang="sass" scoped>
.guide
  position: relative
  padding: 10px 30px 10px 10px
  .guide__close
    position: absolute
    right: 0
    top: 0
  .guide__text
    font-size: 16px
    font-weight: 400
</style>
