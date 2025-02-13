<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
  <v-container class="mb-12">
    <v-row>
      <page-title>
        Удобрения
      </page-title>
      <guide>
        На этой странице можно добавить готовые удобрения (самодельные или фирменные удобрения с известным составом).
        А так же можно добавить удобрение с неизвестным составом, чтобы была возможность учесть его в расписании.
        <br>
        <br>
        Готовые удобрения можно использовать при составлении
        <router-link to="/schedules">
          расписания
        </router-link>
        внесения удобрений.
      </guide>
      <v-col
        v-if="fertilizers.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного удобрения
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-expansion-panels
          multiple
        >
          <draggable
            v-model="fertilizers"
            v-bind="dragOptions"
            @start="drag=true"
            @end="drag=false"
            handle=".handle"
            style="width: 100%;"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <v-expansion-panel
                v-for="(item, index) in fertilizers"
                :key="item.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div
                    class="d-flex justify-space-between align-center"
                    style="width: 100%;"
                  >
                    <span
                      class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
                      :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                    >
                      <span style="line-height: 1.25rem;">
                        {{ item.name }}
                      </span>
                    </span>
                    <span class="mr-3">
                      <v-tooltip
                        bottom
                        max-width="400"
                      >
                        <template #activator="{ on }">
                          <v-icon
                            class="handle ml-2"
                            v-on="on"
                          >mdi mdi-drag</v-icon>
                        </template>
                        {{ $t('fertilizers.panels.header.pull') }}
                      </v-tooltip>
                    </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <recipe :recipe="item" />
                  <div class="d-flex justify-end mt-4">
                    <v-btn
                      text
                      :to="`/fertilizers/${index}`"
                      class="mr-n4"
                    >
                      {{ $t('buttons.open') }}
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </draggable>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <add-button :action="addFertilizer">
      {{ $t('fertilizers.addButton') }}
    </add-button>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import draggable from 'vuedraggable';
import Recipe from '~/components/Recipes/Recipe.vue';

export default {
  name: 'Fertilizers',
  components: {
    draggable,
    Recipe,
  },
  head() {
    return {
      title: 'Список фирменных удобрений',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'На этой странице вы можете добавить свои фирменные удобрения, '
          + ' которые используете в своем аквариуме, чтобы легко расчитать дозировки.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'фирменные удобрения',
        },
      ],
    };
  },
  data() {
    return {
      drag: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    fertilizers: {
      get() {
        return this.$store.state.fertilizers;
      },
      set(value) {
        this.FERTILIZER_MOVE(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      'FERTILIZER_MOVE',
      'SNACKBAR_SHOW',
    ]),
    addFertilizer() {
      return this.$router.push('/fertilizers/create');
    },
  },
};
</script>

<style lang="sass">
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
