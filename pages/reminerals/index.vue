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
        Реминерализаторы
      </LayoutPageTitle>
      <client-only>
        <v-col
          v-if="remineralModels.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            У вас еще нет ни одного реминерализатора
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
              v-model="remineralModels"
              tag="transition-group"
              :component-data="{ name: 'fade' }"
              v-bind="DRAG_OPTIONS"
              handle=".handle"
            >
              <template #item="{ element: remineral, index }">
                <v-expansion-panel>
                  <v-expansion-panel-title class="pa-3 py-sm-4 px-sm-6">
                    <div class="d-flex align-center w-100">
                      <div class="no-break font-weight-regular mr-auto">
                        {{ remineral.name }}
                      </div>
                      <div>
                        <v-tooltip
                          location="bottom"
                          max-width="400"
                        >
                          <template #activator="{ props }">
                            <v-icon
                              class="handle mr-2 mr-sm-4"
                              v-bind="props"
                            >
                              mdi-drag
                            </v-icon>
                          </template>
                          {{ t('recipes.panels.header.pull') }}
                        </v-tooltip>
                      </div>
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <RemineralsRemineralRecipe :remineral="remineral" />
                    <div class="d-flex justify-end mt-4">
                      <v-btn
                        variant="text"
                        @click="openShareDialog(index)"
                      >
                        Поделиться
                      </v-btn>
                      <v-btn
                        variant="text"
                        :to="`/reminerals/${index}/`"
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
            На этой странице вы можете разработать свой собственный рецепт реминерализатора.
            Для этого в вашем распоряжении есть реагенты, которые часто используются аквариумистами.
          </p>
          <p>
            Не беспокойтесь — вы всегда можете воспользоваться готовыми рецептами, которые уже проверены
            и успешно применяются многими аквариумистами.
          </p>
          <p>
            Начните с нажатия на кнопку со знаком «плюс», чтобы добавить новый
            реминерализатор.
          </p>
        </BaseGuide>
      </client-only>
    </v-row>

    <v-dialog
      v-model="dialogShare"
      width="500"
    >
      <v-card>
        <v-card-title>
          Поделиться ссылкой
        </v-card-title>
        <v-card-text v-if="curRemineralIndex !== null">
          <v-text-field
            id="encodedUrl"
            :value="encodedUrl"
            label="Ваша ссылка для отправки"
            hint="Скопируйте ссылку"
          >
            <template #append>
              <v-tooltip
                location="bottom"
                max-width="400"
              >
                <template #activator="{ props }">
                  <a @click="copyUrl()">
                    <v-icon v-bind="props">mdi-content-copy</v-icon>
                  </a>
                </template>
                Скопировать
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialogShare = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BaseAddButton :action="addRemineral">
      {{ t('reminerals.addButton') }}
    </BaseAddButton>
  </v-container>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { DRAG_OPTIONS } from '~/utils/constants/application';

const router = useRouter();
const { t } = useI18n();
const remineralsStore = useRemineralsStore();
const snackbarStore = useSnackbarStore();

const dialogShare = ref(false);
const curRemineralIndex = ref(null);

const remineralModels = computed({
  get: () => remineralsStore.remineralInstances,
  set: (value) => remineralsStore.moveReminerals(value),
});

function addRemineral() {
  return router.push('/reminerals/create/');
}

function openShareDialog(index: number) {
  curRemineralIndex.value = index;
  dialogShare.value = true;
}

function copyUrl() {
  const encodedUrl = document.getElementById('encodedUrl');
  encodedUrl.select();
  encodedUrl.setSelectionRange(0, 99999);
  document.execCommand('copy');
  snackbarStore.showSnackbar('Ссылка скопирована');
}

const encodedUrl = computed(() => {
  if (curRemineralIndex.value === null) return '';

  let jsonString = JSON.stringify([remineralModels.value[curRemineralIndex.value]]);
  jsonString = jsonString.replace(/%/g, '%25');
  const encoded = encodeURIComponent(jsonString);
  return `${window.location.origin + window.location.pathname}/share?share=${encoded}`;
});

definePageMeta({
  title: 'Рецепты реминерализаторов',
  meta: [
    {
      name: 'description',
      content: 'На этой странице вы можете разработать свой собственный рецепт реминерализатора. '
        + 'Для этого в вашем распоряжении есть реагенты, которые часто используются аквариумистами.',
    },
    {
      name: 'keywords',
      content: 'рецепты реминерализаторов, GH, KH, реминерализация воды',
    },
  ],
});
</script>

<style lang="sass" scoped>
//.flip-list-move
//  transition: transform 0.5s
//.ghost
//  opacity: 0.5
//  background: #c8ebfb
</style>
