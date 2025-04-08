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
          v-if="tankModels.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            У вас еще нет ни одного аквариума
          </p>
        </v-col>
        <CommonTheCards
          v-else
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
              :to="`${ROUTES.tanks.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.open') }}
            </v-btn>
          </template>
        </CommonTheCards>
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

    <BaseAddButton :action="onAdd">
      {{ t('tanks.addButton') }}
    </BaseAddButton>

    <PopupsTheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveTankConfirmation"
    >
      Are you sure you want to remove this tank? This action cannot be undone.
    </PopupsTheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
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
  snackbarStore.showSuccess('Аквариум удален');
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
