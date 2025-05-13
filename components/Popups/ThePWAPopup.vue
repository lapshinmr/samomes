<template>
  <v-dialog
    :value="value"
    max-width="500"
    @input="$emit('input', $event)"
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
          <ol class="space-y-2 text-gray-600 ml-2">
            <li class="mb-2 mb-md-3">
              Нажмите на кнопку "Поделиться" <v-icon size="20">
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
          <ol class="space-y-2 text-gray-600 ml-2">
            <li class="mb-2 mb-md-3">
              Нажмите на кнопку "Поделиться" <v-icon size="20">
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
          <ol class="space-y-2 text-gray-600 ml-2">
            <li class="mb-2 mb-md-3">
              Нажмите на иконку меню <v-icon size="20">
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
          text
          @click="$emit('input', false)"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PWAPopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    platform: {
      type: String,
      default: 'unknown',
    },
    browser: {
      type: String,
      default: 'unknown',
    },
  },
};
</script>

<style scoped lang="sass">

</style>
