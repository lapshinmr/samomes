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
        <CommonTheCards
          v-else
          v-model="remineralModels"
        >
          <template #default="{ item }">
            <RemineralsRemineralRecipe :remineral="item" />
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
              @click="onShare(index)"
            >
              Поделиться
            </v-btn>
            <v-btn
              variant="text"
              :to="`${ROUTES.reminerals.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.open') }}
            </v-btn>
          </template>
        </CommonTheCards>
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

    <BaseAddButton :action="onAdd">
      {{ t('reminerals.addButton') }}
    </BaseAddButton>

    <PopupsTheSharePopup
      v-model="isSharePopup"
      :url="encodedUrl"
    />

    <PopupsTheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveRemineralConfirmation"
    >
      Are you sure you want to remove this remineral? This action cannot be undone.
    </PopupsTheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
const { t } = useI18n();
const remineralsStore = useRemineralsStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();
const { itemIndexToShare, isSharePopup, onShare, encodeUrl } = useSharePopup();

const remineralModels = computed({
  get: () => remineralsStore.remineralInstances,
  set: (value) => remineralsStore.moveReminerals(value),
});

const encodedUrl = computed(() => {
  const data = remineralsStore.reminerals[itemIndexToShare.value];
  return encodeUrl(data);
});

function onAdd() {
  return router.push('/reminerals/create/');
}

async function onRemoveRemineralConfirmation() {
  remineralsStore.removeRemineral(itemIndexToRemove.value);
  snackbarStore.showSuccess('Реминерализатор удален');
  onRemoveConfirmation();
}

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
</style>
