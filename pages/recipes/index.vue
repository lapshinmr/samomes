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
      <PageTitle>
        {{ t('recipes.title') }}
      </PageTitle>
      <client-only>
        <PageSubtitle v-if="recipeModels.length === 0">
          {{ t('recipes.noRecipes') }}
        </PageSubtitle>
        <PageText
          v-if="recipeModels.length === 0"
          class="mb-16"
        >
          {{ t('recipes.hints.p4') }}
        </PageText>
        <v-col
          sm="8"
          offset-sm="2"
        >
          <v-alert
            v-if="recipeModels.length !== 0"
            class="mb-10"
            type="info"
            color="green-lighten-1"
            icon="mdi-help-circle"
          >
            <p class="mb-2">
              Оцените, пожалуйста, изменения на странице создания рецептов, заполнив анкету
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScXuYGhwL_dSBuxbt8wKSqj5vCk1jruUH4v-dvz0zWFahj8qQ/viewform?usp=header"
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
        <TheCards
          v-if="recipeModels.length !== 0"
          v-model="recipeModels"
        >
          <template #default="{ item }">
            <FertilizerRecipeCard :recipe="item" />
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
              :to="`${appRoutes.recipes.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.edit') }}
            </v-btn>
          </template>
        </TheCards>
        <Guide>
          <p class="mb-2">
            {{ t('recipes.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('recipes.hints.p2') }}
          </p>
          <p class="mb-2">
            {{ t('recipes.hints.p3') }}
          </p>
        </Guide>
      </client-only>
    </v-row>

    <AddButton :action="onAdd">
      {{ t('recipes.addButton') }}
    </AddButton>

    <TheSharePopup
      v-model="isSharePopup"
      :url="encodedUrl"
    />

    <TheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveRecipeConfirmation"
    >
      {{ t('recipes.removePopupContent') }}
    </TheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
const { t } = useI18n();
const { appRoutes } = useAppRoutes();
const recipesStore = useRecipesStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();
const { itemIndexToShare, isSharePopup, onShare, encodeUrl } = useSharePopup();

const recipeModels = computed({
  get: () => recipesStore.fertilizerRecipeModels,
  set: (value) => recipesStore.moveRecipes(value.map((item) => item.toJson())),
});

const encodedUrl = computed(() => {
  const data = recipesStore.fertilizerRecipes[itemIndexToShare.value];
  return encodeUrl(data);
});

function onAdd() {
  return router.push(`${appRoutes.value.recipes.path}create/`);
}

async function onRemoveRecipeConfirmation() {
  recipesStore.removeRecipe(itemIndexToRemove.value);
  snackbarStore.showSuccess(t('recipes.page.message.recipeRemoved'));
  onRemoveConfirmation();
}

definePageMeta({
  title: 'Список рецептов самодельных удобрений',
  meta: [
    {
      name: 'description',
      content: 'На этой странице вы можете создавать рецепты самодельных микро и макро удобрений из '
        + 'реагентов или готовых смесей, а также воспользоваться готовыми рецептами, которые уже проверены '
        + 'и успешно применяются многими аквариумистами.',
    },
    {
      name: 'keywords',
      content: 'рецепты удобрений, самомес, макро, микро, аквариум, самодельные удобрения, удобрения для аквариума',
    },
  ],
});
</script>

<style lang="sass" scoped>
</style>
