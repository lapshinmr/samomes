<!--
  Samomes

  Copyright (C) 2020 Mikhail Lapshin

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
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <p class="mb-10">
          Эта страница предназначена для удаления данных в ситуации
          когда сайт не реагирует на какие-либо ваши действия и т.д.
        </p>
        <v-divider class="my-5" />
        <div>
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
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'tanks',
      'recipes',
      'fertilizers',
      'schedules',
    ]),
  },
  methods: {
    ...mapMutations([
      'TANKS_REMOVE',
      'RECIPES_REMOVE',
      'FERTILIZERS_REMOVE',
      'SCHEDULES_REMOVE',
    ]),
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
