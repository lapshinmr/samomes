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
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-btn
          class="mr-0"
          square
          to="/tanks"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <page-title>
        <template v-if="isCreate">
          Новый аквариум
        </template>
        <template v-else>
          {{ tank.name }}
        </template>
      </page-title>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-form ref="tankForm">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.lazy="tank.name"
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
                v-model.number="tank.volume"
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
                v-model.number="tank.length"
                type="number"
                :label="$t('tanks.dialog.length')"
                :suffix="$t('units.cm')"
                hide-details="auto"
              />
              <v-text-field
                v-model.number="tank.width"
                type="number"
                :label="$t('tanks.dialog.width')"
                :suffix="$t('units.cm')"
                hide-details="auto"
              />
              <v-text-field
                v-model.number="tank.height"
                type="number"
                :label="$t('tanks.dialog.height')"
                :suffix="$t('units.cm')"
                :hint="$t('tanks.dialog.heightHint')"
                hide-details="auto"
              />
              <v-text-field
                v-model.number="tank.glassThickness"
                type="number"
                :label="$t('tanks.dialog.glassThickness')"
                :suffix="$t('units.mm')"
                hide-details="auto"
              />
            </v-col>
            <v-col
              cols="12"
              class="text-center pb-0"
            >
              <div class="d-flex align-center my-3">
                <v-divider />
                <div class="mx-2">
                  Дополнительные объемы
                </div>
                <v-divider />
              </div>
            </v-col>
            <v-col
              cols="12"
              class="pt-0"
            >
              <v-text-field
                v-model.number="tank.filter"
                type="number"
                :label="$t('tanks.dialog.filter')"
                :suffix="$t('units.l')"
                :hint="$t('tanks.dialog.filterHint')"
                hide-details="auto"
              />
              <v-text-field
                v-model.number="tank.soil"
                type="number"
                :label="$t('tanks.dialog.soil')"
                :suffix="$t('units.l')"
                :hint="$t('tanks.dialog.soilHint')"
                hide-details="auto"
              />
            </v-col>
            <v-expand-transition>
              <v-col
                class="text-right"
                cols="12"
              >
                <v-btn
                  v-if="!isCreate"
                  @click="removeTank"
                >
                  {{ $t('buttons.remove') }}
                </v-btn>
                <v-btn
                  v-if="!isCreate"
                  @click="editTank"
                  color="primary"
                  class="ml-2"
                >
                  {{ $t('buttons.save') }}
                </v-btn>
                <v-btn
                  v-if="isCreate"
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
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Tank',
  data() {
    return {
      tank: {
        name: null,
        volume: null,
        length: null,
        height: null,
        width: null,
        glassThickness: null,
        filter: 0,
        soil: 0,
      },
      nameRules: [
        (v) => !!v || this.$t('tanks.dialog.nameRules.require'),
        () => !this.isExist || this.$t('tanks.dialog.nameRules.exists'),
      ],
      volumeRules: [
        (v) => !!v || this.$t('tanks.dialog.volumeRules.require'),
      ],
    };
  },
  mounted() {
    if (!this.isCreate) {
      this.tank = { ...this.tanks[this.tankIndex] };
    }
  },
  computed: {
    ...mapState([
      'tanks',
    ]),
    isCreate() {
      return this.$route.params.id === 'create';
    },
    tankIndex() {
      return this.$route.params.id;
    },
    dimensions() {
      return `
        ${this.tank.length}
        ${this.tank.height}
        ${this.tank.width}
        ${this.tank.glassThickness}
        ${this.tank.filter}
        ${this.tank.soil}
      `;
    },
    isExist() {
      const names = this.tanks.map((item) => item.name);
      const index = names.findIndex((item) => item === this.name);
      const isExist = index !== -1;
      const isEdit = index === +this.tankIndex;
      return isExist && !isEdit;
    },
  },
  watch: {
    dimensions() {
      let volume = 0;
      if (this.tank.length && this.tank.height && this.tank.width) {
        volume += Math.round(
          (this.tank.length - (2 * this.tank.glassThickness) / 10)
          * this.tank.height
          * (this.tank.width - (2 * this.tank.glassThickness) / 10)
          / 1000 * 100,
        ) / 100;
      }
      if (this.tank.soil) {
        volume += this.tank.soil;
      }
      if (this.tank.filter) {
        volume += this.tank.filter;
      }
      if (volume) {
        this.tank.volume = volume;
      }
    },
  },
  methods: {
    ...mapMutations([
      'TANK_ADD',
      'TANK_REMOVE',
      'TANK_EDIT',
      'SNACKBAR_SHOW',
    ]),
    addTank() {
      if (this.$refs.tankForm.validate()) {
        this.TANK_ADD({ ...this.tank });
        this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankAdd'));
        this.$router.push('/tanks');
      }
    },
    editTank() {
      if (this.$refs.tankForm.validate()) {
        this.TANK_EDIT({
          index: this.tankIndex,
          tank: { ...this.tank },
        });
        this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankEdit'));
        this.$router.push('/tanks');
      }
    },
    removeTank() {
      this.TANK_REMOVE(this.tankIndex);
      this.$router.push('/tanks');
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
