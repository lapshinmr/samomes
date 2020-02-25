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
          <!--
          <v-btn right large absolute text fab @click.stop="REMOVE_TANK(index)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        -->
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              right
              @click.stop="setComponent(index)"
            >
              Редактировать
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
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                v-model.lazy="name"
                label="Название"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.number="volume"
                label="Введите объем, л"
                hide-details
              ></v-text-field>
            </v-col>

            <v-expand-transition>
              <v-col cols="12" v-if="isTankVolumeCalc">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.lazy="length"
                      label="Длина, см"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.lazy="width"
                      label="Ширина, см"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.lazy="height"
                      label="Высота, см"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.lazy="glassThickness"
                      label="Толщина стекла, мм"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-expand-transition>

          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            v-if="!isTankVolumeCalc"
            text
            color="primary"
            @click="isTankVolumeCalc = true"
          >Рассчитать</v-btn>
          <v-btn
            v-if="isTankVolumeCalc"
            text
            color="primary"
            @click="isTankVolumeCalc = false"
          >Скрыть</v-btn>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Отменить</v-btn>
          <v-btn
            v-if="!isEditing"
            text
            :class="{'disabled': isExist !== -1}"
            @click="addTank"
          >Добавить</v-btn>
          <v-btn
            v-if="isEditing"
            text
            :class="{'disabled': isExist !== -1}"
            @click="editTank"
          >Изменить</v-btn>
        </v-card-actions>
      </v-card>this.tanks[index]
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
  props: [ 'removeTank' ],
  data () {
    return {
      ...this.resetComponent(),
      isTankVolumeCalc: false,
      tankEditedIndex: null,
      dialog: false,
      isEditing: false
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
      return names.findIndex(item => item === this.name_)
    },
    name: {
      get () {
        let counter = this.tanks.length + 1
        return this.name_ || `Аквариум #${counter}`
      },
      set (value) {
        this.name_ = value
      }
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
    },
    name_ () {
      if (this.isExist !== -1) {
        let tank = this.tanks[this.isExist]
        Object.assign(this.$data, {
          name: tank.name,
          volume: tank.volume,
          length: tank.length,
          height: tank.height,
          width: tank.width,
          glassThickness: tank.glassThickness
        })
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_TANK',
      'REMOVE_TANK'
    ]),
    resetComponent () {
      return {
        name_: null,
        volume: null,
        length: null,
        height: null,
        width: null,
        glassThickness: null
      }
    },
    setComponent (index) {
      let tank = this.tanks[index]
      this.name_ = tank.name
      this.volume = tank.volume
      this.length = tank.length
      this.height = tank.height
      this.width = tank.width
      this.glassThickness = tank.glassThickness
      this.dialog = true
      this.isEditing = true
    },
    addTank () {
      if (this.isExist === -1) {
        this.ADD_TANK({
          name: this.name_ || this.name,
          volume: this.volume,
          length: this.length,
          height: this.height,
          width: this.width,
          glassThickness: this.glassThickness
        })
        Object.assign(this.$data, this.resetComponent())
      }
      this.dialog = false
    },
    editTank () {
      Object.assign(this.$data, this.resetComponent())
      this.dialog = false
      this.isEditing = false
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
