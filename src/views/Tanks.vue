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
  <v-container class="mb-12">
    <v-row>
      <v-col v-if="tanks.length === 0" cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          У вас еще нет аквариума
        </p>
        <p>
          <a @click="dialog = true">Добавьте аквариум</a>,
          чтобы вы могли создавать рецепты удобрений и составлять расписание по внесению удобрений.
        </p>
      </v-col>
      <v-col cols="12" sm="8" offset-sm="2">
        <v-expansion-panels
          multiple
        >
          <v-expansion-panel
            v-for="(tank, index) in tanks"
            :key="tank.name"
          >
            <v-expansion-panel-header>
              <div class="d-flex justify-space-between align-center" style="width: 100%;">
                <span class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
                  :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                >
                  {{ tank.name }}
                </span>
                <span class="mr-3">
                  {{ tank.volume }} л
                </span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-if="tank.length" class="body-2">
                <div class="d-flex justify-space-between">
                  <div>Длина</div>
                  <div>{{ tank.length }} см</div>
                </div>
                <div class="d-flex justify-space-between">
                  <div>Ширина</div>
                  <div>{{ tank.width }} см</div>
                </div>
                <div class="d-flex justify-space-between">
                  <div>Высота</div>
                  <div>{{ tank.height }} см</div>
                </div>
                <div class="d-flex justify-space-between">
                  <div>Толщина стекла</div>
                  <div>{{ tank.glassThickness }} мм</div>
                </div>
              </div>
              <div v-else class="body-2">
                Нет дополнительной информации
              </div>
              <div class="d-flex justify-end mt-4">
                <v-btn
                  text
                  right
                  @click.stop="setComponent(index)"
                  class="mr-n4"
                >
                  Изменить
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
          <v-toolbar-title v-if="!isEditing">
            Новый аквариум
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Редактирование аквариума
          </v-toolbar-title>
          <v-btn icon dark @click="dialog = false" class="ml-auto">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
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
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        v-model.number="volume"
                        type="Number"
                        label="Введите объем"
                        suffix="л"
                        hide-details="auto"
                        :hint="volumeHint"
                        :rules="volumeRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-center pb-0">
                      <div class="d-flex align-center my-3">
                        <v-divider />
                        <div class="mx-2">или используйте размеры</div>
                        <v-divider />
                      </div>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        v-model.lazy="length"
                        type="Number"
                        label="Длина"
                        suffix="см"
                        hide-details="auto"
                      ></v-text-field>
                      <v-text-field
                        v-model.lazy="width"
                        type="Number"
                        label="Ширина"
                        suffix="см"
                        hide-details="auto"
                      ></v-text-field>
                      <v-text-field
                        v-model.lazy="height"
                        type="Number"
                        label="Высота"
                        suffix="см"
                        hint="Введите высоту чистого столба воды"
                        hide-details="auto"
                      ></v-text-field>
                      <v-text-field
                        v-model.lazy="glassThickness"
                        type="Number"
                        label="Толщина стекла"
                        suffix="мм"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
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
                          Сохранить
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
          color="primary"
          dark
          fab
          @click="openAddTank"
          v-on="on"
          fixed
          bottom
          right
          :class="{'drawer': drawer && $vuetify.breakpoint['smAndUp']}"
          style="transition: all 0.2s;"
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
      'tanks', 'schedules', 'drawer'
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
      'TANK_EDIT',
      'SNACKBAR_SHOW'
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
          volume: parseFloat(this.volume),
          length: parseFloat(this.length),
          height: parseFloat(this.height),
          width: parseFloat(this.width),
          glassThickness: parseFloat(this.glassThickness)
        })
        this.resetComponent()
        this.SNACKBAR_SHOW('Аквариум добавлен')
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
        this.SNACKBAR_SHOW('Аквариум изменен')
      }
    },
    removeTank () {
      this.TANK_REMOVE(this.curTankIndex)
      this.resetComponent()
      this.SNACKBAR_SHOW('Аквариум удален')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
