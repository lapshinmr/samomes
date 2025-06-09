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
  <v-container class="fill-height">
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-column align-center justify-center"
      >
        <template v-if="error.statusCode === 404">
          <h1 class="text-h1">
            404
          </h1>
          <h2 class="text-h4">
            Страница не найдена
          </h2>
          <div class="mt-4 mt-md-6 text-center">
            Вернуться на
            <a href="/_old_code/static">
              главную страницу
            </a>
          </div>
        </template>
        <templave v-else>
          <h1 class="text-h1">
            Oops!
          </h1>
          <h2 class="text-h4">
            Что-то пошло не так
          </h2>
          <div class="mt-4 mt-md-6 text-center">
            Вы хорошо поможете проекту, если сообщите о проблеме в
            <a href="https://t.me/samomes_calculator">Telegram канале</a> или
            <a href="https://vk.com/samomes">группе VK</a>
          </div>
          <div class="mt-4 mt-md-6 text-center">
            Вернуться на
            <a href="/_old_code/static">
              главную страницу
            </a>
          </div>
        </templave>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    // Handle page refresh with dynamic routes
    if (this.error.statusCode === 404) {
      const path = window.location.pathname;
      localStorage.setItem('404_redirect_path', path);
      window.location.href = '/';
    }
  },
};
</script>

<style scoped>
</style>
