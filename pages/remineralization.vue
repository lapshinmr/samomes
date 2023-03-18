<!--
  Samomes

  Copyright (C) 2023 Mikhail Lapshin

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
  <v-container class="mb-10">
    <v-row>
      <page-title>
        Водоподготовка
      </page-title>
      <guide>
        На этой странице можно рассчитать Gh/Kh в аквариуме в зависимости от исходной воды, разбавления осмосом,
        реминерализатора и дозировок удобрений.
      </guide>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-combobox
          :items="tanks"
          :value="tank.volume"
          @input="chooseTank"
          item-text="name"
          item-value="volume"
          label="Объем аквариума"
          hide-selected
          hide-details="auto"
          hint="Выберите аквариум или введите объем (это может быть объем подмены)"
          persistent-hint
          suffix="л"
          :return-object="true"
        />
        <v-expand-transition>
          <div v-if="tank.volume">
            <div class="text-subtitle-1 mt-4 mt-sm-8">
              Подмена
            </div>
            <div class="d-flex flex-column flex-sm-row align-sm-center">
              <number-field
                :value="tank.waterChangeVolume"
                @input="inputWaterChangeVolume"
                label="Объем"
                hint="Введите объем подмены"
                persistent-hint
                single-line
                suffix="л"
                class="pt-0 mt-0"
                :precision-show="1"
                append-icon="mdi-arrow-up-bold-circle-outline"
                @click:append="inputWaterChangeVolume(tank.volume)"
              />
              <number-field
                :value="waterChange"
                @input="inputWaterChange"
                label="Процент"
                hint="или процент подмены от общего объема"
                persistent-hint
                single-line
                suffix="%"
                class="pt-0 mt-0 ml-sm-3"
                :precision-show="1"
                append-icon="mdi-arrow-up-bold-circle-outline"
                @click:append="inputWaterChange(100)"
              />
              <number-field
                :value="osmosisChange"
                @input="inputOsmosisChange"
                :precision-show="0"
                type="number"
                label="Процент"
                :hint="`
                  Осмос: ${osmosisChangeVolume.toFixed(1)} л.
                  Водопровод: ${(tank.waterChangeVolume - osmosisChangeVolume).toFixed(1)} л.
                `"
                persistent-hint
                class="mt-0 pt-0 ml-sm-3"
                single-line
                suffix="%"
                append-icon="mdi-arrow-up-bold-circle-outline"
                @click:append="inputOsmosisChange(100)"
              />
            </div>
            <div class="text-headline mt-8">
              Значения жесткости
            </div>
            <div class="d-flex">
              <number-field
                :value="ghInit"
                @input="inputGhInit"
                label="Gh в аквариуме"
                suffix="dGh"
                hide-details="auto"
              />
              <number-field
                :value="ghWaterChange"
                @input="inputGhWaterChange"
                label="Gh водопровода"
                suffix="dGh"
                hide-details="auto"
                class="ml-3"
              />
            </div>
            <div class="d-flex">
              <number-field
                :value="khInit"
                @input="inputKhInit"
                label="Kh в аквариуме"
                suffix="dKh"
                hide-details="auto"
              />
              <number-field
                :value="khWaterChange"
                @input="inputKhWaterChange"
                label="Kh водопровода"
                suffix="dKh"
                hide-details="auto"
                class="ml-3"
              />
            </div>
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <div v-if="tank.volume">
            <div class="text-subtitle-1 mt-8">
              Реминерализатор и удобрения
            </div>
            <div class="d-flex flex-column flex-sm-row mb-8">
              <v-combobox
                :items="REMINERALS"
                v-model="remineralsSelected"
                label="Реминерализатор"
                hint="Выберите готовый реминерализатор"
                item-text="name"
                :return-object="true"
                persistent-hint
                multiple
              />
              <v-combobox
                :items="items"
                v-model="recipesSelected"
                label="Удобрение"
                hint="и/или удобрение из списка"
                item-text="name"
                :return-object="true"
                persistent-hint
                multiple
                class="ml-sm-3"
              />
            </div>
            <div class="mb-8">
              <div class="d-flex align-center mb-2">
                <v-divider />
                <v-btn
                  center
                  text
                  @click="isOwnRemineral = !isOwnRemineral"
                  class="px-4"
                >
                  Свой состав
                  <v-icon>{{ isOwnRemineral ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-divider />
              </div>
              <v-expand-transition>
                <div v-if="isOwnRemineral">
                  <div class="d-flex flex-wrap mb-2">
                    <number-field
                      v-model="ownRemineral.gh"
                      label="Gh"
                      suffix="dGh"
                      hide-details="auto"
                      style="min-width: 40%;"
                    />
                    <number-field
                      v-model="ownRemineral.kh"
                      label="Kh"
                      suffix="dKh"
                      hide-details="auto"
                      style="min-width: 40%;"
                      class="ml-sm-3"
                    />
                    <number-field
                      v-model="ownRemineral.mass"
                      label="Масса"
                      hint="Масса, которая повышает Gh и Кh в n объеме на m градусов"
                      suffix="г"
                      hide-details="auto"
                      style="min-width: 40%;"
                    />
                    <number-field
                      v-model="ownRemineral.volume"
                      label="Объем"
                      hint="Объем, на который рассчитан состав"
                      suffix="л"
                      hide-details="auto"
                      style="min-width: 40%;"
                      class="ml-sm-3"
                    />
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn
                      color="primary"
                      @click="addOwnRemineral"
                    >
                      Добавить
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </div>
          </div>
        </v-expand-transition>
        <number-field
          v-for="(remineral, index) in remineralsSelected"
          v-model="remineral.amount"
          :label="remineral.name"
          hint="Введите массу реминерализатора"
          suffix="г"
          hide-details="auto"
          :key="`rem_${index}`"
        />
        <fertilizers-dose-table
          v-if="recipesSelected.length > 0"
          :fertilization-type="FERTILIZATION_IN_TAP_WATER"
          :is-fertilization-types="false"
          :is-water-change="false"
          :recipes-selected="recipesSelected"
          :days="7"
          @input="inputDose"
        />
        <v-expand-transition>
          <div
            v-if="tank.volume"
            class="mt-8"
          >
            <div class="d-flex flex-column flex-sm-row">
              <div class="flex-grow-1">
                <div class="text-subtitle-1 mb-2">
                  Жесткость в подмене
                </div>
                <v-text-field
                  :value="waterChangeGh.toFixed(2)"
                  label="Общая жесткость"
                  suffix="dGh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  class="mb-2"
                  :rules="rulesCalculation"
                />
                <v-text-field
                  :value="waterChangeKh.toFixed(2)"
                  label="Карбонатная жесткость"
                  suffix="dKh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  :rules="rulesCalculation"
                />
              </div>
              <div class="flex-grow-1 ml-sm-2">
                <div class="text-subtitle-1 mb-2">
                  Жесткость в аквариуме
                </div>
                <v-text-field
                  :value="totalGh.toFixed(2)"
                  label="Общая жесткость"
                  suffix="dGh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  class="mb-2"
                  :rules="rulesCalculation"
                />
                <v-text-field
                  :value="totalKh.toFixed(2)"
                  label="Карбонатная жесткость"
                  suffix="dKh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  :rules="rulesCalculation"
                />
              </div>
            </div>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import ELEMENTS from '@/helpers/constants/elements';
import FORMULAS from '@/helpers/constants/formulas';
import { GH } from '@/helpers/constants/hardness';
import REMINERALS from '@/helpers/constants/remineral';
import {
  convertIonName,
  convertIonRatio,
  countPercent,
  countTotalIonConcentration,
  isRecipe,
  isFertilizer,
} from '~/helpers/funcs/funcs';
import FertilizersDoseTable, { FERTILIZATION_IN_TAP_WATER } from '@/components/FertilizersDoseTable.vue';
import { countKh } from '~/helpers/funcs/hardness';

export default {
  name: 'Remineralization',
  components: {
    FertilizersDoseTable,
  },
  data() {
    return {
      FORMULAS,
      ELEMENTS,
      GH,
      REMINERALS,
      FERTILIZATION_IN_TAP_WATER,
      dialog: true,
      tank: {
        name: null,
        volume: null,
        waterChangeVolume: 0,
      },
      waterChange: 0,
      osmosisChange: 0,
      ghInit: 0,
      khInit: 0,
      ghWaterChange: 0,
      khWaterChange: 0,
      recipesSelected: [],
      remineralsSelected: [],
      isOwnRemineral: false,
      ownRemineral: {
        kh: 0,
        gh: 0,
        mass: 0,
        volume: 0,
      },
      rulesCalculation: [
        (v) => (!Number.isNaN(+v) && +v !== Infinity) || 'Проверьте вводимые параметры',
      ],
    };
  },
  computed: {
    ...mapState([
      'tanks',
      'recipes',
      'fertilizers',
    ]),
    items() {
      return [...this.recipes, ...this.fertilizers];
    },
    osmosisChangeVolume() {
      return (this.tank.volume * this.waterChange * this.osmosisChange) / (100 * 100);
    },
    totalElements() {
      const result = {};
      this.recipesSelected.forEach((recipe) => {
        Object.keys(recipe.concentration).forEach((reagent) => {
          Object.keys(recipe.concentration[reagent]).forEach((ion) => {
            if (!(ion in result)) {
              result[ion] = 0;
            }
            if (recipe.amount) {
              let total = (recipe.amount * recipe.concentration[reagent][ion]);
              if ((!recipe.volume) && isRecipe(recipe)) {
                total *= 1000;
              }
              result[ion] += total;
            }
          });
        });
      });
      return result;
    },
    waterChangeGh() {
      const ca = this.totalElements.Ca;
      const mg = this.totalElements.Mg;
      let ghRem = 0;
      if (ca) {
        ghRem += ca / (this.GH.Ca * this.tank.waterChangeVolume);
      }
      if (mg) {
        ghRem += mg / (this.GH.Mg * this.tank.waterChangeVolume);
      }
      this.remineralsSelected.forEach((rem) => {
        if (rem.amount) {
          ghRem += (rem.gh * rem.amount * rem.volume) / (this.tank.waterChangeVolume * rem.mass);
        }
      });
      const ghFromChangeWater = (this.ghWaterChange * (1 - this.osmosisChange / 100));
      return ghFromChangeWater + ghRem;
    },
    waterChangeKh() {
      let khRem = 0;
      const co3 = this.totalElements.CO3;
      if (co3) {
        khRem += countKh(co3, this.tank.waterChangeVolume);
      }
      this.remineralsSelected.forEach((rem) => {
        if (rem.amount) {
          khRem += (rem.kh * rem.amount * rem.volume) / (this.tank.waterChangeVolume * rem.mass);
        }
      });
      const khFromChangeWater = (this.khWaterChange * (1 - this.osmosisChange / 100));
      return khFromChangeWater + khRem;
    },
    totalGh() {
      const ca = this.totalElements.Ca;
      const mg = this.totalElements.Mg;
      let ghRem = 0;
      if (ca) {
        ghRem += ca / (this.GH.Ca * this.tank.volume);
      }
      if (mg) {
        ghRem += mg / (this.GH.Mg * this.tank.volume);
      }
      this.remineralsSelected.forEach((rem) => {
        if (rem.amount) {
          ghRem += ((rem.gh * rem.amount * rem.volume) / ((this.waterChange / 100) * this.tank.volume * rem.mass))
            * (this.waterChange / 100);
        }
      });
      const ghFromChangeWater = (this.ghWaterChange * (1 - this.osmosisChange / 100) * this.waterChange) / 100;
      const ghLeft = this.ghInit * (1 - this.waterChange / 100);
      return ghLeft + ghFromChangeWater + ghRem;
    },
    totalKh() {
      let khRem = 0;
      const co3 = this.totalElements.CO3;
      if (co3) {
        khRem += countKh(co3, this.tank.volume);
      }
      this.remineralsSelected.forEach((rem) => {
        if (rem.amount) {
          khRem += ((rem.kh * rem.amount * rem.volume) / ((this.waterChange / 100) * this.tank.volume * rem.mass))
            * (this.waterChange / 100);
        }
      });
      const khFromChangeWater = (this.khWaterChange * (1 - this.osmosisChange / 100) * this.waterChange) / 100;
      const khLeft = this.khInit * (1 - this.waterChange / 100);
      return khLeft + khFromChangeWater + khRem;
    },
  },
  watch: {
    recipesSelected() {
      this.recipesSelected.forEach((recipe) => {
        if (!recipe.amount) {
          recipe.amount = '';
        }
        if (!recipe.amountDay) {
          recipe.amountDay = '';
        }
      });
    },
  },
  methods: {
    isRecipe,
    isFertilizer,
    convertIonName,
    convertIonRatio,
    countPercent,
    countTotalIonConcentration,
    inputDose(index, value) {
      Vue.set(this.recipesSelected, index, value);
    },
    inputGhInit(value) {
      if (value < 0) {
        return;
      }
      this.ghInit = +value;
    },
    inputKhInit(value) {
      if (value < 0) {
        return;
      }
      this.khInit = +value;
    },
    inputGhWaterChange(value) {
      if (value < 0) {
        return;
      }
      this.ghWaterChange = +value;
    },
    inputKhWaterChange(value) {
      if (value < 0) {
        return;
      }
      this.khWaterChange = +value;
    },
    chooseTank(value) {
      if (typeof value === 'object') {
        this.tank = { ...value };
      } else {
        this.tank.name = value;
        this.tank.volume = +value;
      }
      if (this.tank.volume < 0) {
        return;
      }
      this.tank.waterChangeVolume = this.tank.waterChangeVolume || 0;
      if (this.tank.waterChangeVolume > this.tank.volume) {
        this.tank.waterChangeVolume = this.tank.volume;
      }
      this.waterChange = (this.tank.waterChangeVolume / this.tank.volume) * 100;
    },
    inputWaterChange(value) {
      if (value < 0) {
        return;
      }
      if (value <= 100) {
        this.waterChange = +value;
        this.tank.waterChangeVolume = (this.tank.volume * value) / 100;
      }
    },
    inputWaterChangeVolume(value) {
      if (value < 0) {
        return;
      }
      if (value <= this.tank.volume) {
        this.tank.waterChangeVolume = +value;
        this.waterChange = (value / this.tank.volume) * 100;
      }
    },
    inputOsmosisChange(value) {
      if (value < 0) {
        return;
      }
      if (value <= 100) {
        this.osmosisChange = +value;
      }
    },
    addOwnRemineral() {
      this.remineralsSelected.push({
        name: 'Свой',
        ...this.ownRemineral,
      });
      this.ownRemineral = {
        kh: 0,
        gh: 0,
        reagentsMassObject: 0,
        volume: 0,
      };
    },
  },
};
</script>

<style lang="sass">
</style>
