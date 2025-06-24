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
        {{ t('tanks.title') }}
      </PageTitle>
      <client-only>
        <PageSubtitle v-if="tankModels.length === 0">
          {{ t('tanks.noTanks') }}
        </PageSubtitle>
        <PageText
          v-if="tankModels.length === 0"
          class="mb-16"
        >
          {{ t('tanks.hints.p4') }}
        </PageText>
        <TheCards
          v-if="tankModels.length > 0"
          v-model="tankModels"
        >
          <template #default="{ item }">
            <TankCard :tank="item" />
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
              {{ t('buttons.edit') }}
            </v-btn>
          </template>
        </TheCards>
        <Guide>
          <p class="mb-2">
            {{ t('tanks.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('tanks.hints.p2') }}
          </p>
          <p class="mb-2">
            {{ t('tanks.hints.p3') }}
          </p>
        </Guide>
      </client-only>
    </v-row>

    <AddButton :action="onAdd">
      {{ t('tanks.addButton') }}
    </AddButton>

    <TheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveTankConfirmation"
    >
      {{ t('tanks.removePopupContent') }}
    </TheRemovePopup>
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
  get: () => tanksStore.tankModels,
  set: (value) => tanksStore.moveTanks(value.map((item) => item.toJson())),
});

function onAdd() {
  return router.push(`${appRoutes.value.tanks.path}create`);
}

async function onRemoveTankConfirmation() {
  tanksStore.removeTank(itemIndexToRemove.value);
  snackbarStore.show(t('tanks.page.message.tankRemoved'));
  onRemoveConfirmation();
}

useSeoMeta({
  title: t('meta.tanks.title'),
  description: t('meta.tanks.description'),
  keywords: t('meta.tanks.keywords'),
});
</script>

<style lang="sass" scoped>
</style>
