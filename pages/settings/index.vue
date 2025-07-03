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
  <v-container>
    <v-row>
      <PageTitle>
        {{ t('settings.title') }}
      </PageTitle>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <div class="text-h5 mb-8">
          {{ t('common.reagents') }}
        </div>

        <TheReagentsTable class="mb-10" />

        <div class="text-h5 mb-8">
          {{ t('settings.resetData') }}
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('tanks.title') }} ({{ tanksStore.tanks.length }})
          </div>
          <v-btn
            color="red"
            :disabled="tanksStore.tanks.length === 0"
            @click="tanksStore.resetTanks()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('common.reagents') }} ({{ reagentsStore.reagentsTotal }})
          </div>
          <v-btn
            color="red"
            :disabled="!reagentsStore.isReagents"
            @click="reagentsStore.resetReagents()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('recipes.title') }} ({{ recipesStore.fertilizerRecipes.length }})
          </div>
          <v-btn
            color="red"
            :disabled="recipesStore.fertilizerRecipes.length === 0"
            @click="recipesStore.resetRecipes()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('fertilizers.title') }} ({{ fertilizersStore.fertilizers.length }})
          </div>
          <v-btn
            color="red"
            :disabled="fertilizersStore.fertilizers.length === 0"
            @click="fertilizersStore.resetFertilizers()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('reminerals.title') }} ({{ remineralsStore.remineralRecipes.length }})
          </div>
          <v-btn
            color="red"
            :disabled="remineralsStore.remineralRecipes.length === 0"
            @click="remineralsStore.resetReminerals()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            Расписания ({{ schedulesStore.schedules.length }})
          </div>
          <v-btn
            color="red"
            :disabled="schedulesStore.schedules.length === 0"
            @click="schedulesStore.reset()"
          >
            {{ t('buttons.reset' )}}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('dosing.title') }}
          </div>
          <v-btn
            color="red"
            @click="dosingStore.resetDosing()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('hardness.title') }}
          </div>
          <v-btn
            color="red"
            @click="hardnessStore.reset()"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-between">
          <div>
            {{ t('settings.allData') }}
          </div>
          <v-btn
            color="red"
            @click="resetAll"
          >
            {{ t('buttons.reset') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Settings',
});

const { t } = useI18n();

const tanksStore = useTanksStore();
const reagentsStore = useReagentsStore();
const recipesStore = useRecipesStore();
const fertilizersStore = useFertilizersStore();
const remineralsStore = useRemineralsStore();
const dosingStore = useDosingStore();
const schedulesStore = useSchedulesStore();
const hardnessStore = useHardnessStore();
const snackbarStore = useSnackbarStore();

function resetAll() {
  tanksStore.resetTanks();
  reagentsStore.resetReagents();
  recipesStore.resetRecipes();
  fertilizersStore.resetFertilizers();
  remineralsStore.resetReminerals();
  dosingStore.resetDosing();
  hardnessStore.reset();
  schedulesStore.reset();
  snackbarStore.show('Все данные удалены');
}

useSeoMeta({
  title: t('meta.settings.title'),
});
</script>

<style lang="sass" scoped>
</style>
