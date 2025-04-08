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
        Удобрения
      </LayoutPageTitle>
      <client-only>
        <v-col
          v-if="fertilizerModels.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p class="mb-8 text-h6 text-md-h5">
            У вас еще нет ни одного удобрения
          </p>
        </v-col>
        <CommonTheCards
          v-else
          v-model="fertilizerModels"
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
              :to="`${ROUTES.fertilizers.path}${index}/`"
              class="mr-n4"
            >
              Открыть
            </v-btn>
          </template>
        </CommonTheCards>
        <BaseGuide>
          <p>
            На этой странице вы можете добавить любимые фирменные удобрения с известным составом,
            чтобы система помогла подобрать дозировки и включила их в ваше персональное
            <router-link :to="ROUTES.dosing.path">
              расписание.
            </router-link>
          </p>
          <p>
            Даже если вы не знаете точного состава удобрения, вы можете добавить его в систему —
            это поможет вести учет внесений и не пропустить важные подкормки для ваших растений.
          </p>
          <p>
            Начните с нажатия на кнопку со знаком «<a @click="onAdd">плюс</a>», чтобы добавить новое удобрение.
          </p>
        </BaseGuide>
      </client-only>
    </v-row>
    <BaseAddButton :action="onAdd">
      Добавить удобрение
    </BaseAddButton>

    <PopupsTheRemovePopup
      v-model="isRemovePopup"
      @remove="onRemoveFertilizerConfirmation"
    >
      Are you sure you want to remove this fertilizer? This action cannot be undone.
    </PopupsTheRemovePopup>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const router = useRouter();
const fertilizersStore = useFertilizersStore();
const snackbarStore = useSnackbarStore();
const { itemIndexToRemove, isRemovePopup, onRemove, onRemoveConfirmation } = useRemovePopup();

const fertilizerModels = computed({
  get: () => fertilizersStore.fertilizers,
  set: (value) => fertilizersStore.moveFertilizers(value),
});

// TODO: move this to the component call
function onAdd() {
  router.push('/fertilizers/create/');
}

async function onRemoveFertilizerConfirmation() {
  fertilizersStore.removeFertilizer(itemIndexToRemove.value);
  snackbarStore.showSuccess('Рецепт удален');
  onRemoveConfirmation();
}

definePageMeta({
  title: 'Список фирменных удобрений для аквариума',
});
</script>

<style lang="sass" scoped>
</style>
