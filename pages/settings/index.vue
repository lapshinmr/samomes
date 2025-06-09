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
        md="8"
        offset-md="2"
      >
        <!--        <v-divider class="my-5" />-->
        <!--        <div class="text-h5 mb-8">-->
        <!--          Копирование данных-->
        <!--        </div>-->
        <!--        <div class="mb-3">-->
        <!--          <div class="mb-4">-->
        <!--            Данный раздел помогает перенести все данные из одного браузера в другой или с одного устройства на-->
        <!--            другое.-->
        <!--            <br>-->
        <!--            <br>-->
        <!--            Нажмите кнопку "Копировать" или выделите все данные комбинацией клавиш "Ctrl + A" и "Ctrl + C".-->
        <!--            Все ваши аквариумы, рецепты и расписания будут скопированы в буфер. Затем вставьте данные в поле-->
        <!--            ниже в другом браузере или на другом устройстве. Также таким образом можно сделать резервную-->
        <!--            копию данных, сохранив их в текстовый файл.-->
        <!--          </div>-->
        <!--          <div class="d-flex align-items-center mb-8">-->
        <!--            <v-text-field-->
        <!--              id="storageData"-->
        <!--              v-model="storageData"-->
        <!--              label="Это все ваши данные с сайта"-->
        <!--            />-->
        <!--            <v-btn-->
        <!--              color="primary"-->
        <!--              class="ml-8"-->
        <!--              @click="copyAll"-->
        <!--            >-->
        <!--              Копировать-->
        <!--            </v-btn>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="mb-3">-->
        <!--          <div class="mb-4">-->
        <!--            Вставьте сюда данные, которые были скопированы из другого браузера или устройства.-->
        <!--          </div>-->
        <!--          <div class="d-flex align-items-center">-->
        <!--            <v-text-field-->
        <!--              v-model="newStorageData"-->
        <!--              label="Вставьте сюда ваши данные из буфера"-->
        <!--            />-->
        <!--            <v-btn-->
        <!--              color="primary"-->
        <!--              class="ml-4"-->
        <!--              @click="saveAll"-->
        <!--            >-->
        <!--              Сохранить-->
        <!--            </v-btn>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <v-divider class="my-5" />-->
        <div class="text-h5 mb-8">
          {{ t('common.reagents') }}
        </div>
        <SettingsTheReagentsTable class="mb-10" />

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
        <!--        <div class="d-flex justify-space-between mb-3">-->
        <!--          <div>-->
        <!--            Расписания ({{ schedules.length }})-->
        <!--          </div>-->
        <!--          <v-btn-->
        <!--            color="red"-->
        <!--            :disabled="!schedules.length"-->
        <!--            @click="SCHEDULES_REMOVE"-->
        <!--          >-->
        <!--            Удалить-->
        <!--          </v-btn>-->
        <!--        </div>-->
        <div class="d-flex justify-space-between mb-3">
          <div>
            {{ t('reminerals.title') }} ({{ remineralsStore.remineralRecipes.length }})
          </div>
          <v-btn
            color="red"
            :disabled="remineralsStore.resetReminerals.length === 0"
            @click="remineralsStore.resetReminerals()"
          >
            {{ t('buttons.reset') }}
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

// storageData: '',
// newStorageData: '',

// head() {
//   return {
//     title: 'Страница настроек',
//     meta: [
//       {
//         hid: 'description',
//         name: 'description',
//         content: 'На данной странице пользователь может скопировать, сохранить или удалить свои данные',
//       },
//       {
//         hid: 'keywords',
//         name: 'keywords',
//         content: 'копирование, сохранение, удаление, данные',
//       },
//     ],
//   };
// },

// mounted() {
//   this.storageData = localStorage.getItem('udata');
// },

// copyAll() {
//   const storageData = document.getElementById('storageData');
//   storageData.select();
//   storageData.setSelectionRange(0, 99999);
//   document.execCommand('copy');
//   this.SNACKBAR_SHOW('Данные скопированы');
// }

// handleField(newData, field) {
//   const oldData = [...this[field]];
//   newData[field].forEach((newItem) => {
//     if (oldData.find((oldItem) => oldItem.name === newItem.name)) {
//       newItem.name = `${newItem.name}_1`;
//     }
//     oldData.push(newItem);
//   });
//   switch (true) {
//   case (field === 'tanks'):
//     this.TANKS_SET(oldData);
//     break;
//   case (field === 'recipes'):
//     this.RECIPES_SET(oldData);
//     break;
//   case (field === 'fertilizers'):
//     this.FERTILIZERS_SET(oldData);
//     break;
//   case (field === 'schedules'):
//     this.SCHEDULES_SET(oldData);
//     break;
//   default:
//     console.log('unknown case');
//   }
// },

// saveAll() {
//   if (this.newStorageData) {
//     const newStorageData = JSON.parse(this.newStorageData);
//     this.handleField(newStorageData, 'tanks');
//     this.handleField(newStorageData, 'recipes');
//     this.handleField(newStorageData, 'fertilizers');
//     this.handleField(newStorageData, 'schedules');
//     this.SNACKBAR_SHOW('Данные сохранены');
//   }
// },

function resetAll() {
  tanksStore.resetTanks();
  reagentsStore.resetReagents();
  recipesStore.resetRecipes();
  fertilizersStore.resetFertilizers();
  remineralsStore.resetReminerals();
  dosingStore.resetDosing();
}
</script>

<style lang="sass" scoped>
</style>
