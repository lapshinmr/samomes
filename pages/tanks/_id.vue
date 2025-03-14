<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
          color="primary"
          class="mr-0"
          square
          to="/tanks/"
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
                v-model="tank.name"
                :label="$t('tanks.dialog.name')"
                hide-details="auto"
                clearable
                :hint="$t('tanks.dialog.nameHint')"
                :rules="rulesName"
              />
            </v-col>
            <v-col
              cols="12"
              class="pt-0"
            >
              <p class="grey--text text--darken-1 body-2 mt-8 mt-md-4 mb-0">
                Теперь нужно добавить объем воды в аквариуме. Это общий объем воды, который получилось залить
                в аквариум при запуске.
                Он состоит из объема водяного столба, воды в грунте и внешнем фильтре за вычетом
                всех декораций аквариума.
                <br>
                <br>
                Проще всего узнать точный объем воды, измерив его при запуске аквариума с помощью емкости
                или весов. Но если вы не знаете точное значение, то его можно
                рассчитать с помощью формы, представленной ниже.
                <br>
                <br>
                Не переживайте! Вам не обязательно знать точный объем. Погрешность в 10-20% не приведет к
                большим ошибкам в расчетах удобрений, водорослям или чему-то плохому, т.к. в конечном итоге
                мы не можем очень точно контролировать поглощение удобрений и опираемся на внешний вид растений.
              </p>
              <number-field
                v-model="tank.volume"
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
              <number-field
                v-model="tank.length"
                :precision-show="1"
                :label="$t('tanks.dialog.length')"
                :suffix="$t('units.cm')"
                hide-details="auto"
              />
              <number-field
                v-model="tank.width"
                :precision-show="1"
                :label="$t('tanks.dialog.width')"
                :suffix="$t('units.cm')"
                hide-details="auto"
              />
              <number-field
                v-model="tank.height"
                :precision-show="1"
                :label="$t('tanks.dialog.height')"
                :suffix="$t('units.cm')"
                :hint="$t('tanks.dialog.heightHint')"
                hide-details="auto"
              />
              <number-field
                v-model="tank.glassThickness"
                :precision-show="1"
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
              <number-field
                v-model="tank.filter"
                :precision-show="1"
                :label="$t('tanks.dialog.filter')"
                :suffix="$t('units.l')"
                :hint="$t('tanks.dialog.filterHint')"
                hide-details="auto"
              />
              <number-field
                v-model="tank.soil"
                :precision-show="1"
                :label="$t('tanks.dialog.soil')"
                :suffix="$t('units.l')"
                :hint="$t('tanks.dialog.soilHint')"
                hide-details="auto"
              />
              <div class="d-flex">
                <number-field
                  :value="tank.waterChange"
                  @input="onInputWaterChange"
                  :precision-show="1"
                  :label="$t('tanks.dialog.waterChange')"
                  suffix="%"
                  hide-details="auto"
                />
                <number-field
                  :value="tank.waterChangeVolume"
                  @input="onInputWaterChangeVolume"
                  :precision-show="1"
                  :label="$t('tanks.dialog.waterChangeVolume')"
                  :suffix="$t('units.l')"
                  hide-details="auto"
                  class="ml-2"
                />
              </div>
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
                  {{ $t('buttons.save') }}
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
        waterChange: null,
        waterChangeVolume: null,
        length: null,
        height: null,
        width: null,
        glassThickness: null,
        filter: null,
        soil: null,
      },
      rulesName: [
        (v) => !!v || this.$t('tanks.dialog.nameRules.require'),
        () => !this.isExist || this.$t('tanks.dialog.nameRules.exists'),
      ],
      volumeRules: [
        (v) => !!v || this.$t('tanks.dialog.volumeRules.require'),
      ],
    };
  },
  async mounted() {
    if (!this.isCreate) {
      const tank = this.tanks[this.tankIndex];
      if (!tank) {
        await this.$router.push('/tanks/');
      }
      this.tank = JSON.parse(JSON.stringify({ ...tank }));
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
    isEdit() {
      const names = this.tanks.map((item) => item.name);
      const index = names.indexOf(this.tank.name);
      return index === +this.tankIndex;
    },
    isExist() {
      const names = this.tanks.map((item) => item.name);
      const nameFound = names.find((item) => item === this.tank.name);
      return nameFound && !this.isEdit;
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
  },
  watch: {
    dimensions() {
      let volume = 0;
      if (this.tank.length && this.tank.height && this.tank.width) {
        volume += Math.round(
          ((
            (this.tank.length - (2 * this.tank.glassThickness) / 10)
            * this.tank.height
            * (this.tank.width - (2 * this.tank.glassThickness) / 10)
          ) / 1000) * 100,
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
    onInputWaterChange(value) {
      if (value < 0) {
        return;
      }
      if (value <= 100) {
        this.tank.waterChange = +value;
        this.tank.waterChangeVolume = (this.tank.volume * value) / 100;
      }
    },
    onInputWaterChangeVolume(value) {
      if (value < 0) {
        return;
      }
      if (value <= this.tank.volume) {
        this.tank.waterChangeVolume = +value;
        this.tank.waterChange = (value / this.tank.volume) * 100;
      }
    },
    addTank() {
      if (this.$refs.tankForm.validate()) {
        this.TANK_ADD({ ...this.tank });
        this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankAdd'));
        this.$router.push('/tanks/');
      }
    },
    editTank() {
      if (this.$refs.tankForm.validate()) {
        this.TANK_EDIT({
          index: this.tankIndex,
          tank: { ...this.tank },
        });
        this.SNACKBAR_SHOW(this.$t('tanks.dialog.messageTankEdit'));
        this.$router.push('/tanks/');
      }
    },
    removeTank() {
      this.TANK_REMOVE(this.tankIndex);
      this.$router.push('/tanks/');
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
