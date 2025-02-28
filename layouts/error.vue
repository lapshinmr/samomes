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
  <v-container class="fill-height">
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-column align-center justify-center"
      >
        <h1 class="text-h1">
          404
        </h1>
        <h2 class="text-h4">
          {{ pageNotFound }}
        </h2>
        <div class="mt-4 mt-md-6">
          Вернуться на
          <a
            href="/"
          >
            главную страницу
          </a>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  data() {
    return {
      pageNotFound: 'Страница не найдена',
    };
  },
  head() {
    return { title: this.pageNotFound };
  },
};
</script>

<style scoped>
</style>
