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
  <v-container
    min-height="100%"
    class="mb-12 position-relative"
  >
    <v-row>
      <BasePageTitle>
        Аквариумы
      </BasePageTitle>
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
              v-model="tanksModel"
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
                  <v-expansion-panel-title class="pa-3 py-sm-4 px-sm-6">
                    <div
                      class="d-flex align-center"
                      style="width: 100%;"
                    >
                      <div
                        class="no-break font-weight-regular mr-auto"
                        :class="{'subtitle-1': $vuetify.display.xs, 'title': $vuetify.display.smAndUp}"
                      >
                        {{ tank.name }}
                      </div>
                      <div
                        class="mr-1 mx-sm-4"
                        style="white-space: nowrap;"
                      >
                        {{ formatPrecision(tank.volume, 1) }} {{ $t('units.l') }}
                      </div>
                      <div>
                        <v-tooltip
                          location="bottom"
                          max-width="400"
                        >
                          <template #activator="{ props }">
                            <v-icon
                              class="handle"
                              v-bind="props"
                            >
                              mdi mdi-drag
                            </v-icon>
                          </template>
                          {{ $t('tanks.panels.header.pull') }}
                        </v-tooltip>
                      </div>
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div
                      v-if="tank.length"
                      class="body-2"
                    >
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.length') }}</div>
                        <div>{{ formatPrecision(tank.length, 1) }} {{ $t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.width') }}</div>
                        <div>{{ formatPrecision(tank.width, 1) }} {{ $t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ $t('tanks.dialog.height') }}</div>
                        <div>{{ formatPrecision(tank.height, 1) }} {{ $t('units.cm') }}</div>
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
                        <div>{{ formatPrecision(tank.filter, 1) }} {{ $t('units.l') }}</div>
                      </div>
                      <div
                        v-if="tank.soil"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ $t('tanks.dialog.soil') }}</div>
                        <div>{{ formatPrecision(tank.soil, 1) }} {{ $t('units.l') }}</div>
                      </div>
                      <div
                        v-if="tank.waterChangeVolume"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ $t('tanks.dialog.waterChange') }}</div>
                        <div>
                          {{ formatPrecision(tank.waterChangeVolume, 1) }} {{ $t('units.l') }} —
                          {{ formatPrecision(tank.waterChangeVolume / tank.volume * 100, 1) }}%
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
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </transition-group>
            </draggable>
          </v-expansion-panels>
        </v-col>
        <BaseGuide>
          <p>
            {{ $t('tanks.guide.paragraph1') }}
          </p>
          <p>
            {{ $t('tanks.guide.paragraph2') }}
          </p>
          <p>
            {{ $t('tanks.guide.paragraph3') }}
            <NuxtLink to="/recipes/">
              {{ $t('routes.recipes').toLowerCase() }}
            </NuxtLink>
            {{ $t('common.or') }}
            <NuxtLink to="/schedules/">
              {{ $t('routes.schedules').toLowerCase() }}
            </NuxtLink>
          </p>
          <p>
            {{ $t('tanks.guide.paragraph4') }}
          </p>
        </BaseGuide>
      </client-only>
    </v-row>

    <BaseAddButton :action="addTank">
      {{ $t('tanks.addButton') }}
    </BaseAddButton>
  </v-container>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { useRouter } from 'vue-router';
import { useTanksStore } from '~/stores/tanks';

definePageMeta({
  title: 'Список аквариумов',
  meta: [
    {
      name: 'description',
      content: 'На этой странице вы можете управлять списком ваших аквариумов, рассчитывать '
        + 'их объемы по линейным размерам, а также учитывать объем фильтра и воды в грунте. '
        + 'Добавив аквариум, вы получите доступ к его параметрам во всех разделах калькулятора, '
        + 'что упрощает работу с сервисом и экономит ваше время.',
    },
    {
      name: 'keywords',
      content: 'аквариумы, расчет объема, фильтр, грунт, управление аквариумами',
    },
  ],
});

const router = useRouter();
const tanksStore = useTanksStore();

const drag = ref(false);

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
};

const tanks = computed(() => tanksStore.tanks);

const tanksModel = computed({
  get: () => tanksStore.tanks,
  set: (value) => tanksStore.moveTanks(value)
});

function addTank() {
  return router.push('/tanks/create/');
}

function formatPrecision(value, precision = 2) {
  if (value === undefined || value === null) return '';

  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(num)) return '';

  // Format with the specified precision
  const formatted = num.toFixed(precision);

  // Remove trailing zeros
  return formatted.replace(/\.?0+$/, '');
}
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
