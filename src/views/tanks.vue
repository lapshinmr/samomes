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
  <v-container class="mb-12">
    <v-row>
      <page-title>
        Аквариумы
      </page-title>
      <guide>
        На этой странице можно рассчитать объем аквариума по линейным размерам и добавить аквариум в список.
        <br>
        <br>
        Список аквариумов упрощает выбор объема при составлении
        <router-link to="/recipes">
          рецепта
        </router-link>
        или
        <router-link to="/schedules">
          расписания
        </router-link>
        внесения удобрений.
      </guide>
      <v-col
        v-if="tanks.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного аквариума
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-expansion-panels multiple>
          <draggable
            v-model="tanks"
            v-bind="dragOptions"
            @start="drag=true"
            @end="drag=false"
            style="width: 100%;"
            handle=".handle"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <v-expansion-panel
                v-for="(tank, index) in tanks"
                :key="tank.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div
                    class="d-flex align-center"
                    style="width: 100%;"
                  >
                    <div
                      class="no-break font-weight-regular mr-auto"
                      :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                    >
                      {{ tank.name }}
                    </div>
                    <div
                      class="mr-1 mx-sm-4"
                      style="white-space: nowrap;"
                    >
                      {{ tank.volume.toFixed(1) }} {{ $t('units.l') }}
                    </div>
                    <div>
                      <v-tooltip
                        bottom
                        max-width="400"
                      >
                        <template #activator="{ on }">
                          <v-icon
                            class="handle"
                            v-on="on"
                          >
                            mdi mdi-drag
                          </v-icon>
                        </template>
                        {{ $t('tanks.panels.header.pull') }}
                      </v-tooltip>
                    </div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    v-if="tank.length"
                    class="body-2"
                  >
                    <div class="body-1 mb-2">
                      Линейные размеры
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.length') }}</div>
                      <div>{{ tank.length }} {{ $t('units.cm') }}</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.width') }}</div>
                      <div>{{ tank.width }} {{ $t('units.cm') }}</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.height') }}</div>
                      <div>{{ tank.height }} {{ $t('units.cm') }}</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.glassThickness') }}</div>
                      <div>{{ tank.glassThickness }} {{ $t('units.mm') }}</div>
                    </div>
                    <div class="body-1 my-2">
                      Дополнительные объемы
                    </div>
                    <div
                      v-if="tank.filter"
                      class="d-flex justify-space-between"
                    >
                      <div>{{ $t('tanks.dialog.filter') }}</div>
                      <div>{{ tank.filter }} {{ $t('units.l') }}</div>
                    </div>
                    <div
                      v-if="tank.soil"
                      class="d-flex justify-space-between"
                    >
                      <div>{{ $t('tanks.dialog.soil') }}</div>
                      <div>{{ tank.soil }} {{ $t('units.l') }}</div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="body-2"
                  >
                    {{ $t('tanks.panels.body.noSizes') }}
                  </div>
                  <div class="d-flex justify-end mt-4">
                    <v-btn
                      text
                      right
                      :to="`/tanks/${index}`"
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

    <add-button :action="addTank">
      {{ $t('tanks.addButton') }}
    </add-button>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'Tank',
  components: {
    draggable,
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
    tanks: {
      get() {
        return this.$store.state.tanks;
      },
      set(value) {
        this.TANK_MOVE(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      'TANK_MOVE',
    ]),
    addTank() {
      return this.$router.push('/tanks/create');
    },
  },
};
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
