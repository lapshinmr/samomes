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
  <v-dialog
    v-model="model"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h6">
        Инструкция по установке
        <br>
        приложения Samomes
      </v-card-title>
      <v-card-text>
        <template v-if="platform === 'ios'">
          <p>Для iPhone & iPad:</p>
          <ol class="space-y-2 text-gray-600 ml-6">
            <li class="mb-2 mb-md-3">
              Нажмите на кнопку "Поделиться"
              <v-icon size="20">
                mdi mdi-export-variant
              </v-icon>
            </li>
            <li class="mb-2 mb-md-3">
              Прокрутите меню вниз до пункта "На экран «Домой»" и нажмите его
            </li>
            <li>Нажмите "Добавить" для завершения установки</li>
          </ol>
        </template>
        <template v-else-if="platform === 'macos'">
          <p>Для MacOS:</p>
          <ol class="space-y-2 text-gray-600 ml-6">
            <li class="mb-2 mb-md-3">
              Нажмите на кнопку "Поделиться"
              <v-icon size="20">
                mdi mdi-export-variant
              </v-icon>
            </li>
            <li class="mb-2 mb-md-3">
              Нажмите "Добавить в Док" или "Добавить в Док-панель"
            </li>
            <li>Нажмите "Добавить" для завершения установки</li>
          </ol>
        </template>
        <!-- TODO: probably this is not used -->
        <template v-else-if="platform === 'android' && browser === 'chrome'">
          <p>Для браузера Chrome на Android:</p>
          <ol class="space-y-2 text-gray-600 ml-6">
            <li class="mb-2 mb-md-3">
              Нажмите на иконку меню
              <v-icon size="20">
                mdi mdi-dots-vertical
              </v-icon> в Chrome
            </li>
            <li class="mb-2 mb-md-3">
              Выберите пункт "Установить приложение" или "Добавить на главный экран"
            </li>
            <li>Нажмите "Установить" для завершения</li>
          </ol>
        </template>
        <template v-else>
          Проект Samomes официально поддерживает только браузер Chrome. Установите его, чтобы
          можно было использовать наше приложение.
          <br><br>
          Если у вас другая операционная система или браузер, то установка приложения всё равно возможна,
          так как большинство современных браузеров поддерживают эту технологию.
          Чтобы найти инструкцию по установке, используйте следующий поисковый запрос в любой поисковой системе:
          <br><br>
          "Как установить PWA в браузере [название вашего браузера]"
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          @click="$emit('update:modelValue', false)"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();

withDefaults(defineProps<{
  platform?: string;
  browser?: string;
}>(), {
  platform: 'unknown',
  browser: 'unknown',
});

defineEmits(['update:modelValue']);

defineOptions({
  name: 'PWAPopup',
});
</script>

<style scoped lang="sass">
p
  margin-bottom: 16px
</style>
