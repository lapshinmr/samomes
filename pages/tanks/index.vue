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
        {{ t('tanks.title') }}
      </LayoutPageTitle>
      <client-only>
        <LayoutPageSubtitle
          v-if="tankModels.length === 0"
          class="mb-16"
        >
          {{ t('tanks.noTanks') }}
        </LayoutPageSubtitle>
        <CommonTheCards
          v-if="tankModels.length > 0"
          v-model="tankModels"
        >
          <template #default="{ item }">
            <TanksTankCard :tank="item" />
          </template>
          <template #actions="{ index }">
            <v-btn
              variant="text"
              right
              color="red"
              class="ml-n4"
              @click="onRemove(index)"
            >
              {{ t('buttons.remove') }}
            </v-btn>
            <v-btn
              variant="text"
              right
              :to="`${appRoutes.tanks.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.open') }}
            </v-btn>
          </template>
        </CommonTheCards>
        <BaseGuide>
          <p class="mb-2">
            {{ t('tanks.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('tanks.hints.p2') }}
          </p>
          <p class="mb-2">
            {{ t('tanks.hints.p3') }}
          </p>
          <p class="mb-2">
            {{ t('tanks.hints.p4') }}
          </p>
        </BaseGuide>
      </client-only>
    </v-row>

    <BaseAddButton :action="onAdd">
      {{ t('tanks.addButton') }}
    </BaseAddButton>

    <PopupsTheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveTankConfirmation"
    >
      {{ t('tanks.removePopupContent') }}
    </PopupsTheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { appRoutes } = useAppRoutes();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();

const tankModels = computed({
  get: () => tanksStore.tanks,
  set: (value) => tanksStore.moveTanks(value),
});

function onAdd() {
  return router.push('/tanks/create/');
}

async function onRemoveTankConfirmation() {
  tanksStore.removeTank(itemIndexToRemove.value);
  snackbarStore.showSuccess(t('tanks.page.message.tankRemoved'));
  onRemoveConfirmation();
}

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
</style>
