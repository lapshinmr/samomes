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
      <LayoutPageTitle>
        Аквариумы
      </LayoutPageTitle>
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
              tag="transition-group"
              :component-data="{ name:'fade' }"
              v-bind="DRAG_OPTIONS"
              handle=".handle"
            >
              <template #item="{element: tank, index}">
                <v-expansion-panel>
                  <v-expansion-panel-title class="pa-3 py-sm-4 px-sm-6">
                    <div
                      class="d-flex align-center"
                      style="width: 100%;"
                    >
                      <div class="no-break font-weight-regular mr-auto text-subtitle-1 text-md-h6">
                        {{ tank.name }}
                      </div>
                      <div
                        class="mr-1 mx-sm-4"
                        style="white-space: nowrap;"
                      >
                        {{ format(tank.volume) }} {{ t('units.l') }}
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
                          {{ t('tanks.panels.header.pull') }}
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
                        <div>{{ t('tanks.dialog.length') }}</div>
                        <div>{{ format(tank.length, 1) }} {{ t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ t('tanks.dialog.width') }}</div>
                        <div>{{ format(tank.width, 1) }} {{ t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ t('tanks.dialog.height') }}</div>
                        <div>{{ format(tank.height, 1) }} {{ t('units.cm') }}</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{ t('tanks.dialog.glassThickness') }}</div>
                        <div>{{ tank.glassThickness }} {{ t('units.mm') }}</div>
                      </div>
                      <div
                        v-if="tank.filter"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ t('tanks.dialog.filter') }}</div>
                        <div>{{ format(tank.filter, 1) }} {{ t('units.l') }}</div>
                      </div>
                      <div
                        v-if="tank.soil"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ t('tanks.dialog.soil') }}</div>
                        <div>{{ format(tank.soilVolume, 1) }} {{ t('units.l') }}</div>
                      </div>
                      <div
                        v-if="tank.waterChangeVolume"
                        class="d-flex justify-space-between"
                      >
                        <div>{{ t('tanks.dialog.waterChange') }}</div>
                        <div>
                          {{ format(tank.waterChangeVolume, 1) }} {{ t('units.l') }}
                          ({{ format(tank.waterChangePercent, 3) }}%)
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="body-2"
                    >
                      {{ t('tanks.panels.body.noSizes') }}
                    </div>
                    <div class="d-flex justify-space-between mt-4">
                      <v-btn
                        variant="text"
                        right
                        color="red"
                        class="ml-n4"
                        @click="onTankRemove(index)"
                      >
                        {{ t('buttons.remove') }}
                      </v-btn>
                      <v-btn
                        variant="text"
                        right
                        :to="`/tanks/${index}/`"
                        class="mr-n4"
                      >
                        {{ t('buttons.open') }}
                      </v-btn>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </template>
            </draggable>
          </v-expansion-panels>
        </v-col>
        <BaseGuide>
          <p>
            {{ t('tanks.guide.paragraph1') }}
          </p>
          <p>
            {{ t('tanks.guide.paragraph2') }}
          </p>
          <p>
            {{ t('tanks.guide.paragraph3') }}
            <NuxtLink :to="ROUTES.recipes.path">
              {{ t('routes.recipes').toLowerCase() }}
            </NuxtLink>
            {{ t('common.or') }}
            <NuxtLink :to="ROUTES.schedules.path">
              {{ t('routes.schedules').toLowerCase() }}
            </NuxtLink>
          </p>
          <p>
            {{ t('tanks.guide.paragraph4') }}
          </p>
        </BaseGuide>
      </client-only>
    </v-row>

    <BaseAddButton :action="addTank">
      {{ t('tanks.addButton') }}
    </BaseAddButton>

    <PopupsRemoveDialog
      v-model="isRemoveDialog"
      @remove="onTankRemoveConfirmation"
      @cancel="isRemoveDialog = false"
    >
      Are you sure you want to remove this tank? This action cannot be undone.
    </PopupsRemoveDialog>
  </v-container>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { DRAG_OPTIONS } from '~/utils/constants/application';

const { t } = useI18n();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();

const isRemoveDialog = ref(false);
const tankIndexToRemove = ref(null);

const tanks = computed(() => tanksStore.tanks);

const tanksModel = computed({
  get: () => tanksStore.tanks,
  set: (value) => tanksStore.moveTanks(value),
});

function addTank() {
  return router.push('/tanks/create/');
}

const onTankRemove = (index: number) =>{
  tankIndexToRemove.value = index;
  isRemoveDialog.value = true;
};

const onTankRemoveConfirmation = async () => {
  tanksStore.removeTank(tankIndexToRemove.value);
  snackbarStore.showSuccess('Аквариум удален');
  tankIndexToRemove.value = null;
  isRemoveDialog.value = false;
};

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

</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
