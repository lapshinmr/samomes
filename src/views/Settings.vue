<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          Удаление и перезагрузка
        </p>
        <p class="mb-10">
          Эта страница предназначена для удаления данных и перезагрузки сайта в ситуации
          когда сайт был обновлен, сайт не реагирует на какие-либо ваши действия и т.д.
        </p>
        <v-divider class="my-5" />
        <div>
          <div class="d-flex justify-space-between mb-3">
            <div>
              Аквариумы ({{ tanks.length }})
            </div>
            <v-btn
              color="red"
              @click="TANKS_REMOVE()"
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
              @click="RECIPES_REMOVE()"
              :disabled="!recipes.length"
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
              @click="SCHEDULES_REMOVE()"
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
              @click="removeAll()"
              :disabled="!tanks.length && !recipes.length && !schedules.length"
            >
              Удалить
            </v-btn>
          </div>
          <v-divider class="my-5" />
          <div class="d-flex justify-end">
            <v-btn
              color="primary"
              @click="reload()"
            >
              Перезагрузить
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'reload',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'schedules'
    ])
  },
  methods: {
    ...mapMutations([
      'TANKS_REMOVE',
      'RECIPES_REMOVE',
      'SCHEDULES_REMOVE'
    ]),
    removeAll () {
      this.TANKS_REMOVE()
      this.RECIPES_REMOVE()
      this.SCHEDULES_REMOVE()
    },
    reload () {
      location.reload(true)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
