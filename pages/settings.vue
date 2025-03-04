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
  <v-container>
    <v-row>
      <page-title>
        Настройки
      </page-title>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-divider class="my-5" />
        <div>
          <div class="text-h5 mb-8">
            Копирование данных
          </div>
          <div class="mb-3">
            <div class="mb-4">
              Данный раздел помогает перенести все данные из одного браузера в другой или с одного устройства на
              другое.
              <br>
              <br>
              Нажмите кнопку "копировать" или выделите все данные комбинацией клавиш "ctrl + A" и "ctrl + C".
              Все ваши аквариумы, рецепты и расписания будут скопированы в буфер.
              Затем вставьте данные в поле ниже в другом браузере или на другом устройстве. Так же таким образом можно
              сделать резервную копию данных, сохранив данные в текстовый файл.
            </div>
            <div class="d-flex align-items-center mb-8">
              <v-text-field
                v-model="storageData"
                label="Это все ваши данные с сайта"
                id="storageData"
              />
              <v-btn
                color="primary"
                @click="copyAll"
                class="ml-8"
              >
                Копировать
              </v-btn>
            </div>
          </div>
          <div class="mb-3">
            <div class="mb-4">
              Вставьте сюда данные, которые были скопированы из другого браузера или устройства.
            </div>
            <div class="d-flex align-items-center">
              <v-text-field
                v-model="newStorageData"
                label="Вставьте сюда ваши данные из буфера"
              />
              <v-btn
                color="primary"
                @click="saveAll"
                class="ml-4"
              >
                Сохранить
              </v-btn>
            </div>
          </div>
          <v-divider class="my-5" />
          <div class="text-h5 mb-8">
            Сброс данных
          </div>
          <div class="d-flex justify-space-between mb-3">
            <div>
              Аквариумы ({{ tanks.length }})
            </div>
            <v-btn
              color="red"
              @click="TANKS_REMOVE"
              :disabled="!tanks.length"
            >
              Удалить
            </v-btn>
          </div>
          <div class="d-flex justify-space-between mb-3">
            <div>
              Рецепты ({{ recipes.length }})
            </div>
            <v-btn
              color="red"
              @click="RECIPES_REMOVE"
              :disabled="!recipes.length"
            >
              Удалить
            </v-btn>
          </div>
          <div class="d-flex justify-space-between mb-3">
            <div>
              Удобрения ({{ fertilizers.length }})
            </div>
            <v-btn
              color="red"
              @click="FERTILIZERS_REMOVE"
              :disabled="!fertilizers.length"
            >
              Удалить
            </v-btn>
          </div>
          <div class="d-flex justify-space-between mb-3">
            <div>
              Расписания ({{ schedules.length }})
            </div>
            <v-btn
              color="red"
              @click="SCHEDULES_REMOVE"
              :disabled="!schedules.length"
            >
              Удалить
            </v-btn>
          </div>
          <div class="d-flex justify-space-between mb-3">
            <div>
              Реминерализаторы ({{ reminerals.length }})
            </div>
            <v-btn
              color="red"
              @click="REMINERALS_REMOVE"
              :disabled="!reminerals.length"
            >
              Удалить
            </v-btn>
          </div>
          <div class="d-flex justify-space-between">
            <div>
              Все данные
            </div>
            <v-btn
              color="red"
              @click="removeAll"
              :disabled="!tanks.length && !recipes.length && !schedules.length"
            >
              Удалить
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Settings',
  head() {
    return {
      title: 'Страница настроек',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'На данной странице пользователь может скопировать, сохранить или удалить свои данные',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'копирование, сохранение, удаление, данные',
        },
      ],
    };
  },
  data() {
    return {
      storageData: '',
      newStorageData: '',
    };
  },
  mounted() {
    this.storageData = localStorage.getItem('udata');
  },
  computed: {
    ...mapState([
      'tanks',
      'recipes',
      'fertilizers',
      'schedules',
      'reminerals',
    ]),
  },
  methods: {
    ...mapMutations([
      'TANKS_SET',
      'TANKS_REMOVE',
      'RECIPES_SET',
      'RECIPES_REMOVE',
      'FERTILIZERS_SET',
      'FERTILIZERS_REMOVE',
      'SCHEDULES_SET',
      'SCHEDULES_REMOVE',
      'REMINERALS_REMOVE',
      'SNACKBAR_SHOW',
    ]),
    copyAll() {
      const storageData = document.getElementById('storageData');
      storageData.select();
      storageData.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.SNACKBAR_SHOW('Данные скопированы');
    },
    handleField(newData, field) {
      const oldData = [...this[field]];
      newData[field].forEach((newItem) => {
        if (oldData.find((oldItem) => oldItem.name === newItem.name)) {
          newItem.name = `${newItem.name}_1`;
        }
        oldData.push(newItem);
      });
      switch (true) {
        case (field === 'tanks'):
          this.TANKS_SET(oldData);
          break;
        case (field === 'recipes'):
          this.RECIPES_SET(oldData);
          break;
        case (field === 'fertilizers'):
          this.FERTILIZERS_SET(oldData);
          break;
        case (field === 'schedules'):
          this.SCHEDULES_SET(oldData);
          break;
        default:
          console.log('unknown case');
      }
    },
    saveAll() {
      if (this.newStorageData) {
        const newStorageData = JSON.parse(this.newStorageData);
        this.handleField(newStorageData, 'tanks');
        this.handleField(newStorageData, 'recipes');
        this.handleField(newStorageData, 'fertilizers');
        this.handleField(newStorageData, 'schedules');
        this.SNACKBAR_SHOW('Данные сохранены');
      }
    },
    removeAll() {
      this.TANKS_REMOVE();
      this.RECIPES_REMOVE();
      this.FERTILIZERS_REMOVE();
      this.SCHEDULES_REMOVE();
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
