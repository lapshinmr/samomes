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
            <!--            <v-btn-->
            <!--              variant="text"-->
            <!--              class="ml-sm-auto px-1 px-sm-4"-->
            <!--              @click="onShare(index)"-->
            <!--            >-->
            <!--              {{ t('buttons.share') }}-->
            <!--            </v-btn>-->
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
