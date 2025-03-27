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
      <LayoutPageTitle>
        Удобрения
      </LayoutPageTitle>
      <client-only>
        <v-col
          v-if="fertilizers.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            У вас еще нет ни одного удобрения
          </p>
        </v-col>
        <v-col
          v-else
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
                  <v-expansion-panel-title class="pa-3 py-sm-4 px-sm-6">
                    <div
                      class="d-flex justify-space-between align-center"
                      style="width: 100%;"
                    >
                      <span
                        class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
                        :class="{'text-subtitle-1': $vuetify.display.xs, 'text-h6': !$vuetify.display.xs}"
                      >
                        <span style="line-height: 1.25rem;">
                          {{ item.name }}
                        </span>
                      </span>
                      <span class="mr-3">
                        <v-tooltip
                          location="bottom"
                          max-width="400"
                        >
                          <template #activator="{ props }">
                            <v-icon
                              class="handle ml-2"
                              v-bind="props"
                            >mdi-drag</v-icon>
                          </template>
                          Перетащите, чтобы изменить порядок
                        </v-tooltip>
                      </span>
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <RecipesRecipe :recipe="item" />
                    <div class="d-flex justify-end mt-4">
                      <v-btn
                        variant="text"
                        :to="`/fertilizers/${index}/`"
                        class="mr-n4"
                      >
                        Открыть
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
            На этой странице вы можете добавить любимые фирменные удобрения с известным составом,
            чтобы система помогла подобрать дозировки и включила их в ваше персональное
            <router-link to="/schedules/">
              расписание.
            </router-link>
          </p>
          <p>
            Даже если вы не знаете точного состава удобрения, вы можете добавить его в систему —
            это поможет вести учет внесений и не пропустить важные подкормки для ваших растений.
          </p>
          <p>
            Начните с нажатия на кнопку со знаком «<a @click="addFertilizer">плюс</a>», чтобы добавить новое удобрение.
          </p>
        </BaseGuide>
      </client-only>
    </v-row>
    <BaseAddButton :action="addFertilizer">
      Добавить удобрение
    </BaseAddButton>
  </v-container>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { DRAG_OPTIONS } from '~/utils/constants/application';

import { useFertilizersStore } from '~/stores/fertilizers';

const router = useRouter();
const fertilizersStore = useFertilizersStore();

const drag = ref(false);

const fertilizers = computed({
  get() {
    return fertilizersStore.fertilizers;
  },
  set(value) {
    fertilizersStore.moveFertilizers(value);
  },
});

// TODO: move this to the component call
function addFertilizer() {
  router.push('/fertilizers/create/');
}

definePageMeta({
  title: 'Список фирменных удобрений для аквариума',
});
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
