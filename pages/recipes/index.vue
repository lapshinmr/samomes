<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License. To view a copy of this license, visit
  http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
  Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

  You are free to:
  - Share — copy and redistribute the material in any medium or format
  - Adapt — remix, transform, and build upon the material

  Under the following terms:
  - Attribution — You must give appropriate credit
  - NonCommercial — You may not use the material for commercial purposes
  - ShareAlike — If you remix, transform, or build upon the material,
    you must distribute your contributions under the same license as the original

  No warranties are given. The license may not give you all of the permissions
  necessary for your intended use.
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
  snackbarStore.show(t('recipes.page.message.recipeRemoved'));
  onRemoveConfirmation();
}

useSeoMeta({
  title: t('meta.recipes.title'),
  description: t('meta.recipes.description'),
  keywords: t('meta.recipes.keywords'),
});
</script>

<style lang="sass" scoped>
</style>
