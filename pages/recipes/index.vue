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
        Рецепты
      </LayoutPageTitle>
      <client-only>
        <v-col
          v-if="recipeModels.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            У вас еще нет ни одного рецепта
          </p>
        </v-col>
        <CommonTheCards
          v-else
          v-model="recipeModels"
        >
          <template #default="{ item }">
            <RecipesRecipe :recipe="item" />
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
              Поделиться
            </v-btn>
            <v-btn
              variant="text"
              :to="`${ROUTES.recipes.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.open') }}
            </v-btn>
          </template>
        </CommonTheCards>
        <BaseGuide>
          <p>
            {{ t('recipes.guide.paragraph1') }}
          </p>
          <p>
            {{ t('recipes.guide.paragraph2') }}
          </p>
          <p>
            {{ t('recipes.guide.paragraph3') }}
            <NuxtLink :to="ROUTES.recipes.path">
              {{ t('routes.recipes').toLowerCase() }}
            </NuxtLink>
            {{ t('common.or') }}
            <NuxtLink :to="ROUTES.schedules.path">
              {{ t('routes.schedules').toLowerCase() }}
            </NuxtLink>
          </p>
          <p>
            {{ t('recipes.guide.paragraph4') }}
          </p>
        </BaseGuide>
      </client-only>
    </v-row>

    <BaseAddButton :action="onAdd">
      {{ t('recipes.addButton') }}
    </BaseAddButton>

    <PopupsTheSharePopup
      v-model="isSharePopup"
      :url="encodedUrl"
    />

    <PopupsTheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveRecipeConfirmation"
    >
      Are you sure you want to remove this recipe? This action cannot be undone.
    </PopupsTheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
const { t } = useI18n();
const recipesStore = useRecipesStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();
const { itemIndexToShare, isSharePopup, onShare, encodeUrl } = useSharePopup();

const recipeModels = computed({
  get: () => recipesStore.recipeModels,
  set: (value) => recipesStore.moveRecipes(value),
});

const encodedUrl = computed(() => {
  const data = recipesStore.recipes[itemIndexToShare.value];
  return encodeUrl(data);
});

function onAdd() {
  return router.push('/recipes/create/');
}

async function onRemoveRecipeConfirmation() {
  recipesStore.removeRecipe(itemIndexToRemove.value);
  snackbarStore.showSuccess('Рецепт удален');
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
