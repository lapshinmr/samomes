<!--
  Samomes

  Copyright (C) 2021 Mikhail Lapshin

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
      <page-title>
        Аквариумы
      </page-title>
      <guide>
        На этой странице можно рассчитать объем аквариума по линейным размерам и добавить аквариум в список.
        <br>
        <br>
        Список аквариумов упрощает выбор объема при составлении
        <router-link to="/recipes">
          рецепта
        </router-link>
        или
        <router-link to="/schedules">
          расписания
        </router-link>
        внесения удобрений.
      </guide>
      <v-col
        v-if="tanks.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного аквариума
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-expansion-panels multiple>
          <draggable
            v-model="tanks"
            v-bind="dragOptions"
            @start="drag=true"
            @end="drag=false"
            style="width: 100%;"
            handle=".handle"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <v-expansion-panel
                v-for="(tank, index) in tanks"
                :key="tank.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div
                    class="d-flex align-center"
                    style="width: 100%;"
                  >
                    <div
                      class="no-break font-weight-regular mr-auto"
                      :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                    >
                      {{ tank.name }}
                    </div>
                    <div
                      class="mr-1 mx-sm-4"
                      style="white-space: nowrap;"
                    >
                      {{ tank.volume.toFixed(1) }} {{ $t('units.l') }}
                    </div>
                    <div>
                      <v-tooltip
                        bottom
                        max-width="400"
                      >
                        <template #activator="{ on }">
                          <v-icon
                            class="handle"
                            v-on="on"
                          >
                            mdi mdi-drag
                          </v-icon>
                        </template>
                        {{ $t('tanks.panels.header.pull') }}
                      </v-tooltip>
                    </div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    v-if="tank.length"
                    class="body-2"
                  >
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.length') }}</div>
                      <div>{{ tank.length }} {{ $t('units.cm') }}</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.width') }}</div>
                      <div>{{ tank.width }} {{ $t('units.cm') }}</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.height') }}</div>
                      <div>{{ tank.height }} {{ $t('units.cm') }}</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>{{ $t('tanks.dialog.glassThickness') }}</div>
                      <div>{{ tank.glassThickness }} {{ $t('units.mm') }}</div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="body-2"
                  >
                    {{ $t('tanks.panels.body.noSizes') }}
                  </div>
                  <div class="d-flex justify-end mt-4">
                    <v-btn
                      text
                      right
                      @click.stop="setComponent(index)"
                      class="mr-n4"
                    >
                      {{ $t('buttons.open') }}
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </draggable>
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
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title v-if="!isEditing">
            {{ $t('tanks.dialog.tankNew') }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            {{ $t('tanks.dialog.tankEdit') }}
          </v-toolbar-title>
          <v-btn
            icon
            dark
            @click="dialog = false"
            class="ml-auto"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="8"
                offset-md="2"
              >
                <v-form ref="tankForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model.lazy="name"
                        :label="$t('tanks.dialog.name')"
                        hide-details="auto"
                        clearable
                        :hint="$t('tanks.dialog.nameHint')"
                        :rules="nameRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      class="pt-0"
                    >
                      <v-text-field
                        v-model.number="volume"
                        type="Number"
                        :label="$t('tanks.dialog.volume')"
                        :suffix="$t('units.l')"
                        hide-details="auto"
                        :hint="$t('tanks.dialog.volumeHint')"
                        :rules="volumeRules"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      class="text-center pb-0"
                    >
                      <div class="d-flex align-center my-3">
                        <v-divider />
                        <div class="mx-2">
                          {{ $t('tanks.dialog.orSizes') }}
                        </div>
                        <v-divider />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pt-0"
                    >
                      <v-text-field
                        v-model.number="length"
                        type="number"
                        :label="$t('tanks.dialog.length')"
                        :suffix="$t('units.cm')"
                        hide-details="auto"
                      />
                      <v-text-field
                        v-model.number="width"
                        type="number"
                        :label="$t('tanks.dialog.width')"
                        :suffix="$t('units.cm')"
                        hide-details="auto"
                      />
                      <v-text-field
                        v-model.number="height"
                        type="number"
                        :label="$t('tanks.dialog.height')"
                        :suffix="$t('units.cm')"
                        :hint="$t('tanks.dialog.heightHint')"
                        hide-details="auto"
                      />
                      <v-text-field
                        v-model.number="glassThickness"
                        type="number"
                        :label="$t('tanks.dialog.glassThickness')"
                        :suffix="$t('units.mm')"
                        hide-details="auto"
                      />
                    </v-col>
                    <v-expand-transition>
                      <v-col
                        class="text-right"
                        cols="12"
                      >
                        <v-btn
                          v-if="isEditing"
                          @click="removeTank"
                        >
                          {{ $t('buttons.remove') }}
                        </v-btn>
                        <v-btn
                          v-if="isEditing"
                          @click="editTank"
                          color="primary"
                          class="ml-2"
                        >
                          {{ $t('buttons.save') }}
                        </v-btn>
                        <v-btn
                          v-if="!isEditing"
                          @click="addTank"
                          color="primary"
                        >
                          {{ $t('buttons.add') }}
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
    <add-button :action="openAddTank">
      {{ $t('tanks.addButton') }}
    </add-button>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'Tank',
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      name: null,
      volume: null,
      length: null,
      height: null,
      width: null,
      glassThickness: null,
      curTankIndex: null,
      dialog: this.$route.params.open,
      nameRules: [
        (v) => !!v || this.$t('tanks.dialog.nameRules.require'),
        () => (!this.isExist || this.isSame) || this.$t('tanks.dialog.nameRules.exists'),
      ],
      volumeRules: [
        (v) => !!v || this.$t('tanks.dialog.volumeRules.require'),
      ],
    };
  },
  computed: {
    ...mapState([
      'tanks',
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    tanks: {
      get() {
        return this.$store.state.tanks;
      },
      set(value) {
        this.TANK_MOVE(value);
      },
    },
    isExist() {
      const names = this.tanks.map((item) => item.name);
      return names.findIndex((item) => item === this.name) !== -1;
    },
    isSame() {
      const names = this.tanks.map((item) => item.name);
      return names.findIndex((item) => item === this.name) === this.curTankIndex;
    },
    isEditing() {
      return this.curTankIndex !== null;
    },
  },
  watch: {
    dimensions() {
      if (this.length && this.height && this.width) {
        this.volume = Math.round(
          ((this.length - (2 * this.glassThickness) / 10) * this.height * (this.width - (2 * this.glassThickness) / 10))
          / (1000 * 100),
        ) / 100;
      } else {
        this.volume = 0;
      }
    },
  },
  methods: {
    ...mapMutations([
      'TANK_ADD',
      'TANK_REMOVE',
      'TANK_EDIT',
      'TANK_MOVE',
      'SNACKBAR_SHOW',
    ]),
    resetComponent() {
      this.name = null;
      this.volume = null;
      this.length = null;
      this.height = null;
      this.width = null;
      this.glassThickness = null;
      this.curTankIndex = null;
      this.isTankVolumeCalc = false;
      this.dialog = false;
    },
    setComponent(index) {
      const tank = this.tanks[index];
      this.name = tank.name;
      this.volume = tank.volume;
      this.length = tank.length;
      this.height = tank.height;
      this.width = tank.width;
      this.glassThickness = tank.glassThickness;
      this.curTankIndex = index;
      this.dialog = true;
    },
    openAddTank() {
      this.resetComponent();
      this.dialog = !this.dialog;
      if (this.$refs.tankForm) {
        this.$refs.tankForm.resetValidation();
      }
    },
    addTank() {
      if (this.$refs.tankForm.validate()) {
        this.TANK_ADD({
          name: this.name,
          volume: this.volume,
          length: this.length,
          height: this.height,
          width: this.width,
          glassThickness: this.glassThickness,
        });
        this.resetComponent();
        this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankAdd'));
      }
    },
    editTank() {
      if (this.$refs.tankForm.validate()) {
        this.TANK_EDIT({
          index: this.curTankIndex,
          tank: {
            name: this.name,
            volume: this.volume,
            length: this.length,
            height: this.height,
            width: this.width,
            glassThickness: this.glassThickness,
          },
        });
        this.resetComponent();
        this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankEdit'));
      }
    },
    removeTank() {
      this.TANK_REMOVE(this.curTankIndex);
      this.resetComponent();
      this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankRemove'));
    },
  },
};
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
