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
  snackbarStore.showSuccess(t('fertilizers.page.message.fertilizerAdded'));
  onRemoveConfirmation();
}

definePageMeta({
  title: 'Список фирменных удобрений для аквариума',
  meta: [
    {
      name: 'description',
      content: 'На этой странице вы можете добавить фирменные удобрения, '
        + ' которые используете в своем аквариуме, чтобы легко рассчитать дозировки.',
    },
    {
      name: 'keywords',
      content: 'фирменные удобрения, аквариум, дозировки, учет удобрений, подкормки растений',
    },
  ],
});
</script>

<style lang="sass" scoped>
</style>
