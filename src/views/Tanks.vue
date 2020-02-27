<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          Аквариумы
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6"
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
      max-width="800px"
    >
      <v-card>
        <v-card-title class="" color="primary">
          Добавить аквариум
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="tankForm">
              <v-row class="mx-2">
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
                    label="Введите объем, л"
                    hide-details="auto"
                    :hint="volumeHint"
                    :rules="volumeRules"
                  ></v-text-field>
                </v-col>

                <v-expand-transition>
                  <v-col cols="12" v-if="isTankVolumeCalc">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.lazy="length"
                          label="Длина, см"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.lazy="width"
                          label="Ширина, см"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.lazy="height"
                          label="Высота, см"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.lazy="glassThickness"
                          label="Толщина стекла, мм"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-expand-transition>

              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="isTankVolumeCalc = !isTankVolumeCalc"
          >
            <v-icon>{{ isTankVolumeCalc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            Калькулятор
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="isEditing"
            text
            color="red"
            @click="removeTank"
          >Удалить</v-btn>
          <v-btn
            text
            @click="dialog = false"
          >Отменить</v-btn>
          <v-btn
            v-if="isEditing"
            text
            color="primary"
            @click="editTank"
          >Сохранить</v-btn>
          <v-btn
            v-if="!isEditing"
            text
            color="primary"
            @click="addTank"
          >Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      bottom
      right
      color="primary"
      dark
      fab
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

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
      dialog: false,
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
      'tanks'
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
      this.$refs.tankForm.resetValidation()
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
