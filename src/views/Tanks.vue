<template>
  <v-container>
    <v-row>
      <v-col v-if="tanks.length === 0" cols="12" md="8" offset-md="2">
        <p class="display-1">
          У вас еще нет ни одного аквариума
        </p>
        <p class="headline">
          <a @click="dialog = true">Добавьте аквариум</a>,
          чтобы вы могли создавать рецепты удобрений и расписание по внесению удобрений
          для него.
        </p>
      </v-col>
      <v-col cols="12" md="4"
        v-for="(tank, index) in tanks"
        :key="tank.name"
      >
        <v-card class="tank">
          <v-card-title>
            {{ tank.name }}
          </v-card-title>
          <v-card-subtitle>
            Объем: {{ tank.volume }} л
          </v-card-subtitle>
          <v-card-text>
            <div v-if="tank.length" class="tank__sizes">
              {{ tank.length }} x
              {{ tank.width }} x
              {{ tank.height }} x
              {{ tank.glassThickness }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              right
              @click.stop="setComponent(index)"
            >
              Изменить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="!isEditing">
            Новый аквариум
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Редактирование аквариума
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="8" offset-md="2">
                <v-form ref="tankForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model.lazy="name"
                        label="Название"
                        hide-details="auto"
                        clearable
                        :hint="nameHint"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model.number="volume"
                        label="Введите объем"
                        suffix="л"
                        hide-details="auto"
                        :hint="volumeHint"
                        :rules="volumeRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        center
                        text
                        @click="isTankVolumeCalc = !isTankVolumeCalc"
                        class="px-0"
                      >
                        Калькулятор
                        <v-icon>{{ isTankVolumeCalc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-col>
                    <v-expand-transition>
                      <v-col cols="12" v-if="isTankVolumeCalc">
                        <v-text-field
                          v-model.lazy="length"
                          label="Длина"
                          suffix="см"
                          hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                          v-model.lazy="width"
                          label="Ширина"
                          suffix="см"
                          hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                          v-model.lazy="height"
                          label="Высота"
                          suffix="см"
                          hint="Введите высоту чистого столба воды"
                          hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                          v-model.lazy="glassThickness"
                          label="Толщина стекла"
                          suffix="мм"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-expand-transition>
                    <v-expand-transition>
                      <v-col class="text-right" cols="12">
                        <v-btn
                          v-if="isEditing"
                          @click="removeTank"
                        >Удалить</v-btn>
                        <v-btn
                          v-if="isEditing"
                          @click="editTank"
                          color="primary"
                          class="ml-2"
                        >Сохранить</v-btn>
                        <v-btn
                          v-if="!isEditing"
                          @click="addTank"
                          color="primary"
                        >
                          Создать
                        </v-btn>
                      </v-col>
                    </v-expand-transition>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          bottom
          right
          color="primary"
          dark
          fab
          fixed
          @click="openAddTank"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить аквариум</span>
    </v-tooltip>

  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'tank',
  data () {
    return {
      name: null,
      volume: null,
      length: null,
      height: null,
      width: null,
      glassThickness: null,
      curTankIndex: null,
      isTankVolumeCalc: false,
      dialog: this.$route.params.open,
      nameRules: [
        v => !!v || 'Введите название',
        v => (!this.isExist || this.isSame) || 'Аквариум с таким названием уже существует'
      ],
      volumeRules: [
        v => !!v || 'Введите объем в литрах'
      ]
    }
  },
  computed: {
    ...mapState([
      'tanks', 'schedules'
    ]),
    dimensions () {
      return `${this.length}|${this.height}|${this.width}|${this.glassThickness}`
    },
    isExist () {
      let names = this.tanks.map(item => item.name)
      return names.findIndex(item => item === this.name) !== -1
    },
    isSame () {
      let names = this.tanks.map(item => item.name)
      return names.findIndex(item => item === this.name) === this.curTankIndex
    },
    isEditing () {
      return this.curTankIndex !== null
    },
    nameHint () {
      let counter = this.tanks.length + 1
      return `Придумайте простое название, например "Аквариум ${counter}" или "Большой аквариум"`
    },
    volumeHint () {
      return `Воспользуйтесь калькулятором, если не знаете точное значение`
    }
  },
  watch: {
    dimensions () {
      if (this.length && this.height && this.width) {
        this.volume = Math.round(
          (this.length - 2 * this.glassThickness / 10) *
          this.height *
          (this.width - 2 * this.glassThickness / 10) / 1000 *
          100
        ) / 100
      } else {
        this.volume = 0
      }
    }
  },
  methods: {
    ...mapMutations([
      'TANK_ADD',
      'TANK_REMOVE',
      'TANK_EDIT'
    ]),
    resetComponent () {
      this.name = null
      this.volume = null
      this.length = null
      this.height = null
      this.width = null
      this.glassThickness = null
      this.curTankIndex = null
      this.isTankVolumeCalc = false
      this.dialog = false
    },
    setComponent (index) {
      let tank = this.tanks[index]
      this.name = tank.name
      this.volume = tank.volume
      this.length = tank.length
      this.height = tank.height
      this.width = tank.width
      this.glassThickness = tank.glassThickness
      this.curTankIndex = index
      this.dialog = true
    },
    openAddTank () {
      this.resetComponent()
      this.dialog = !this.dialog
      if (this.$refs.tankForm) {
        this.$refs.tankForm.resetValidation()
      }
    },
    addTank () {
      if (this.$refs.tankForm.validate()) {
        this.TANK_ADD({
          name: this.name,
          volume: this.volume,
          length: this.length,
          height: this.height,
          width: this.width,
          glassThickness: this.glassThickness
        })
        this.resetComponent()
      }
    },
    editTank () {
      if (this.$refs.tankForm.validate()) {
        this.TANK_EDIT({
          index: this.curTankIndex,
          tank: {
            name: this.name,
            volume: this.volume,
            length: this.length,
            height: this.height,
            width: this.width,
            glassThickness: this.glassThickness
          }
        })
        this.resetComponent()
      }
    },
    removeTank () {
      this.TANK_REMOVE(this.curTankIndex)
      this.resetComponent()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
