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
        {{ t('reminerals.title') }}
      </PageTitle>
      <client-only>
        <PageSubtitle v-if="remineralModels.length === 0">
          {{ t('reminerals.noReminerals') }}
        </PageSubtitle>
        <PageText
          v-if="remineralModels.length === 0"
          class="mb-16"
        >
          {{ t('reminerals.hints.p3') }}
        </PageText>
        <TheCards
          v-if="remineralModels.length !== 0"
          v-model="remineralModels"
        >
          <template #default="{ item }">
            <RemineralRecipeCard :remineral="item" />
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
              :to="`${appRoutes.reminerals.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.edit') }}
            </v-btn>
          </template>
        </TheCards>
        <Guide>
          <p class="mb-2">
            {{ t('reminerals.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('reminerals.hints.p2') }}
          </p>
        </Guide>
      </client-only>
    </v-row>

    <AddButton :action="onAdd">
      {{ t('reminerals.addButton') }}
    </AddButton>

    <TheSharePopup
      v-model="isSharePopup"
      :url="encodedUrl"
    />

    <TheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveRemineralConfirmation"
    >
      {{ t('reminerals.removePopupContent') }}
    </TheRemovePopup>
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
  return router.push(`${appRoutes.value.reminerals.path}create/`);
}

async function onRemoveRemineralConfirmation() {
  remineralsStore.removeRemineral(itemIndexToRemove.value);
  snackbarStore.showSuccess(t('reminerals.page.message.remove'));
  onRemoveConfirmation();
}

useSeoMeta({
  title: 'Рецепты реминерализаторов',
  description: 'На этой странице вы можете разработать свой собственный рецепт реминерализатора. '
    + 'Для этого в вашем распоряжении есть реагенты, которые часто используются аквариумистами.',
  keywords: 'рецепты реминерализаторов, GH, KH, реминерализация воды',
});
</script>

<style lang="sass" scoped>
</style>
