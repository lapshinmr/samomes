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
        {{ t('fertilizers.title') }}
      </LayoutPageTitle>
      <client-only>
        <v-col
          v-if="fertilizerModels.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            {{ t('fertilizers.noFertilizers') }}
          </p>
        </v-col>
        <CommonTheCards
          v-else
          v-model="fertilizerModels"
        >
          <template #default="{ item }">
            <FertilizersFertilizerCard :fertilizer="item" />
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
              {{ t('buttons.open') }}
            </v-btn>
          </template>
        </CommonTheCards>
        <BaseGuide>
          <p class="mb-2">
            {{ t('fertilizers.hints.p1') }}
          </p>
          <p class="mb-2">
            {{ t('fertilizers.hints.p2') }}
          </p>
          <p class="mb-2">
            {{ t('fertilizers.hints.p3') }}
          </p>
        </BaseGuide>
      </client-only>
    </v-row>
    <BaseAddButton :action="onAdd">
      {{ t('fertilizers.addButton') }}
    </BaseAddButton>

    <PopupsTheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveFertilizerConfirmation"
    >
      {{ t('fertilizers.removePopupContent') }}
    </PopupsTheRemovePopup>
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

// TODO: move this to the component call
function onAdd() {
  router.push(`${appRoutes.value.fertilizers.path}create/`);
}

async function onRemoveFertilizerConfirmation() {
  fertilizersStore.removeFertilizer(itemIndexToRemove.value);
  snackbarStore.showSuccess(t('fertilizers.page.message.fertilizerAdded'));
  onRemoveConfirmation();
}

definePageMeta({
  title: 'Список фирменных удобрений для аквариума',
});
</script>

<style lang="sass" scoped>
</style>
