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
        {{ t('reminerals.title') }}
      </LayoutPageTitle>
      <client-only>
        <LayoutPageSubtitle v-if="remineralModels.length === 0">
          {{ t('reminerals.noReminerals') }}
        </LayoutPageSubtitle>
        <LayoutPageText
          v-if="remineralModels.length === 0"
          class="mb-16"
        >
          {{ t('reminerals.hints.p3') }}
        </LayoutPageText>
        <v-col
          sm="8"
          offset-sm="2"
        >
          <v-alert
            v-if="remineralModels.length !== 0"
            class="mb-10"
            type="info"
            color="green-lighten-1"
            icon="mdi-help-circle"
          >
            <p class="mb-2">
              Оцените, пожалуйста, изменения на странице создания рецептов реминерализаторов, заполнив анкету
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdjwZ3c1fjGRF1P3ws2fTPiBD0-ggEdtkT9xW9xUMrpU8-OQg/viewform?usp=header"
                target="_blank"
                class="text-underlined"
              >
                здесь
              </a> (количество заполнений анкеты не ограничено).
            </p>
            <p>
              Если при использовании сайта у вас возникли трудности или непонятные моменты, обязательно
              сообщите нам через
              <a
                href="https://t.me/samomes_calculator"
                target="_blank"
              >
                телеграм-канал
              </a>
              или личные сообщения в телеграм автору проекта (@lapshinmr).
              Мы постараемся сделать сервис доступнее и удобнее.
            </p>
          </v-alert>
        </v-col>
        <CommonTheCards
          v-if="remineralModels.length !== 0"
          v-model="remineralModels"
        >
          <template #default="{ item }">
            <RemineralsRemineralRecipeCard :remineral="item" />
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
              class="ml-auto"
              @click="onShare(index)"
            >
              {{ t('buttons.share') }}
            </v-btn>
            <v-btn
              variant="text"
              :to="`${appRoutes.reminerals.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.edit') }}
            </v-btn>
          </template>
        </CommonTheCards>
        <BaseGuide>
          <p class="mb-2">
            {{ t('reminerals.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('reminerals.hints.p2') }}
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
      {{ t('reminerals.removePopupContent') }}
    </PopupsTheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
const { t } = useI18n();
const { appRoutes } = useAppRoutes();
const remineralsStore = useRemineralsStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();
const { itemIndexToShare, isSharePopup, onShare, encodeUrl } = useSharePopup();

const remineralModels = computed({
  get: () => remineralsStore.remineralRecipeModels,
  set: (value) => remineralsStore.moveReminerals(value.map((item) => item.toJson())),
});

const encodedUrl = computed(() => {
  const data = remineralsStore.remineralRecipes[itemIndexToShare.value];
  return encodeUrl(data);
});

function onAdd() {
  return router.push('/reminerals/create/');
}

async function onRemoveRemineralConfirmation() {
  remineralsStore.removeRemineral(itemIndexToRemove.value);
  snackbarStore.showSuccess(t('reminerals.page.message.remove'));
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
