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
        {{ t('fertilizers.title') }}
      </PageTitle>
      <client-only>
        <PageSubtitle v-if="fertilizerModels.length === 0">
          {{ t('fertilizers.noFertilizers') }}
        </PageSubtitle>
        <PageText
          v-if="fertilizerModels.length === 0"
          class="mb-16"
        >
          {{ t('fertilizers.hints.p3') }}
        </PageText>
        <TheCards
          v-if="fertilizerModels.length !== 0"
          v-model="fertilizerModels"
        >
          <template #default="{ item }">
            <FertilizerCard :fertilizer="item" />
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
              :to="`${appRoutes.fertilizers.path}${index}/`"
              class="mr-n4"
            >
              {{ t('buttons.edit') }}
            </v-btn>
          </template>
        </TheCards>
        <Guide>
          <p class="mb-2">
            {{ t('fertilizers.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('fertilizers.hints.p2') }}
          </p>
        </Guide>
      </client-only>
    </v-row>

    <AddButton :action="onAdd">
      {{ t('fertilizers.addButton') }}
    </AddButton>

    <TheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveFertilizerConfirmation"
    >
      {{ t('fertilizers.removePopupContent') }}
    </TheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { appRoutes } = useAppRoutes();
const router = useRouter();
const fertilizersStore = useFertilizersStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();

const fertilizerModels = computed({
  get: () => fertilizersStore.fertilizerModels,
  set: (value) => fertilizersStore.moveFertilizers(value.map((item) => item.toJson())),
});

function onAdd() {
  router.push(`${appRoutes.value.fertilizers.path}create/`);
}

async function onRemoveFertilizerConfirmation() {
  fertilizersStore.removeFertilizer(itemIndexToRemove.value);
  snackbarStore.show(t('fertilizers.page.message.fertilizerAdded'));
  onRemoveConfirmation();
}

useSeoMeta({
  title: 'Список фирменных удобрений для аквариума',
  description: 'На этой странице вы можете добавить фирменные удобрения, '
    + ' которые используете в своем аквариуме, чтобы легко рассчитать дозировки.',
  keywords: 'фирменные удобрения, аквариум, дозировки, учет удобрений, подкормки растений',
});
</script>

<style lang="sass" scoped>
</style>
