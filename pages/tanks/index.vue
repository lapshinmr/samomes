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
        Аквариумы
      </page-title>
      <client-only>
        <v-col
          v-if="tanks.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            У вас еще нет ни одного аквариума
          </p>
        </v-col>
        <v-col
          v-else
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
                        {{ tank.volume | precision(1) }} {{ $t('units.l') }}
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
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.length') }}</div>
                        <div>{{ tank.length | precision(1) }} {{ $t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.width') }}</div>
                        <div>{{ tank.width | precision(1) }} {{ $t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.height') }}</div>
                        <div>{{ tank.height | precision(1) }} {{ $t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.glassThickness') }}</div>
                        <div>{{ tank.glassThickness }} {{ $t('units.mm') }}</div>
                      </div>
                      <div
                        v-if="tank.filter"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ $t('tanks.dialog.filter') }}</div>
                        <div>{{ tank.filter | precision(1) }} {{ $t('units.l') }}</div>
                      </div>
                      <div
                        v-if="tank.soil"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ $t('tanks.dialog.soil') }}</div>
                        <div>{{ tank.soil | precision(1) }} {{ $t('units.l') }}</div>
                      </div>
                      <div
                        v-if="tank.waterChangeVolume"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ $t('tanks.dialog.waterChange') }}</div>
                        <div>
                          {{ tank.waterChangeVolume | precision(1) }} {{ $t('units.l') }} —
                          {{ tank.waterChangeVolume / tank.volume * 100 | precision(1) }}%
                        </div>
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
                        :to="`/tanks/${index}/`"
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
        <the-guide>
          <p>
            На этой странице вы можете рассчитать объем вашего прямоугольного аквариума по его размерам,
            а также учесть объем фильтра и воду, содержащуюся в грунте.
          </p>
          <p>
            Аквариум в нашей системе — это базовая сущность, которая создаётся здесь, а используется на
            других страницах сервиса. Добавив аквариум однажды, вы получите доступ к его
            параметрам во всех разделах калькулятора.
          </p>
          <p>
            Это значительно упрощает работу с сервисом и экономит ваше время, например, при составлении
            <nuxt-link to="/recipes/">
              рецепта
            </nuxt-link>
            или
            <nuxt-link to="/schedules/">
              расписания
            </nuxt-link>
            внесения удобрений.
          </p>
          <p>
            Начните с нажатия на кнопку со знаком «<a @click="addTank">плюс</a>», чтобы добавить новый аквариум.
          </p>
        </the-guide>
      </client-only>
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
  name: 'Tanks',
  components: {
    draggable,
  },
  head() {
    return {
      title: 'Список аквариумов',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'На этой странице вы можете управлять списком ваших аквариумов, рассчитывать '
            + 'их объемы по линейным размерам, а также учитывать объем фильтра и воды в грунте. '
            + 'Добавив аквариум, вы получите доступ к его параметрам во всех разделах калькулятора, '
            + 'что упрощает работу с сервисом и экономит ваше время.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'аквариумы, расчет объема, фильтр, грунт, управление аквариумами',
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
      return this.$router.push('/tanks/create/');
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
