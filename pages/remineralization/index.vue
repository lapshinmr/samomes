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
  <v-container class="mb-10">
    <v-row>
      <page-title>
        Водоподготовка
      </page-title>
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
        <div class="mt-2 mt-sm-4">
          Выберите тип подмены
        </div>
        <div class="d-flex flex-column flex-md-row">
          <v-radio-group
            v-model="remineralizationType"
            class="my-2"
            hide-details="auto"
            :column="$vuetify.breakpoint.name === 'xs'"
            :row="$vuetify.breakpoint.name !== 'xs'"
          >
            <v-radio
              label="Осмос + реминерализатор"
              :value="REMINERALIZATION_TYPES_REM"
            />
            <v-radio
              label="Осмос + водопровод"
              :value="REMINERALIZATION_TYPES_TAP"
              class="mt-1 mt-sm-0"
            />
            <v-radio
              label="Другое"
              :value="REMINERALIZATION_TYPES_MIX"
              class="mt-1 mt-sm-0"
            />
          </v-radio-group>
          <v-checkbox
            v-model="isTests"
            label="Тестирую воду"
            class="my-2"
          />
        </div>
        <v-expand-transition>
          <div v-if="tank.volume && remineralizationType !== null">
            <div class="text-subtitle-1">
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
                v-if="[REMINERALIZATION_TYPES_TAP, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)"
                :value="osmosisChange"
                @input="inputOsmosisChange"
                :precision-show="1"
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
            <v-expand-transition>
              <div
                v-if="
                  isTests
                    || [REMINERALIZATION_TYPES_TAP, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)
                "
              >
                <div class="text-headline mt-8">
                  Исходная жесткость
                </div>
                <div class="d-flex">
                  <number-field
                    v-if="[REMINERALIZATION_TYPES_TAP, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)"
                    :value="ghWaterChange"
                    @input="inputGhWaterChange"
                    label="Gh водопровода"
                    suffix="dGh"
                    hide-details="auto"
                  />
                  <number-field
                    v-if="isTests"
                    :value="ghInit"
                    @input="inputGhInit"
                    label="Gh в аквариуме"
                    suffix="dGh"
                    hide-details="auto"
                    :class="{
                      'ml-3': [REMINERALIZATION_TYPES_TAP, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)
                    }"
                  />
                </div>
                <div class="d-flex">
                  <number-field
                    v-if="[REMINERALIZATION_TYPES_TAP, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)"
                    :value="khWaterChange"
                    @input="inputKhWaterChange"
                    label="Kh водопровода"
                    suffix="dKh"
                    hide-details="auto"
                  />
                  <number-field
                    v-if="isTests"
                    :value="khInit"
                    @input="inputKhInit"
                    label="Kh в аквариуме"
                    suffix="dKh"
                    hide-details="auto"
                    :class="{
                      'ml-3': [REMINERALIZATION_TYPES_TAP, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)
                    }"
                  />
                </div>
              </div>
            </v-expand-transition>
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <div
            v-if="
              tank.volume
                && [REMINERALIZATION_TYPES_REM, REMINERALIZATION_TYPES_MIX].includes(remineralizationType)
            "
          >
            <div class="text-subtitle-1 mt-8">
              Реминерализатор и удобрения
            </div>
            <div class="d-flex flex-column flex-sm-row mb-8">
              <v-combobox
                v-model="remineralsSelected"
                :items="remineralsAll"
                label="Реминерализатор"
                hint="Выберите готовый реминерализатор"
                item-text="name"
                :return-object="true"
                persistent-hint
                multiple
              />
              <v-combobox
                v-model="recipesSelected"
                :items="items"
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
                  <v-row class="d-flex flex-wrap mb-2">
                    <v-col cols="6">
                      <number-field
                        v-model="ownRemineral.gh"
                        label="Gh"
                        suffix="dGh"
                        hide-details="auto"
                      />
                      <number-field
                        v-model="ownRemineral.volume"
                        label="Объем"
                        hint="Объем, на который рассчитан состав"
                        suffix="л"
                        hide-details="auto"
                      />
                    </v-col>
                    <v-col cols="6">
                      <number-field
                        v-model="ownRemineral.kh"
                        label="Kh"
                        suffix="dKh"
                        hide-details="auto"
                      />
                      <number-field
                        v-model="ownRemineral.mass"
                        label="Масса"
                        hint="Масса, которая повышает Gh и Кh в n объеме на m градусов"
                        suffix="г"
                        hide-details="auto"
                      />
                    </v-col>
                  </v-row>
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
        <div
          v-for="(remineral, index) in remineralsSelected"
          :key="`rem_${index}`"
        >
          <div class="d-flex align-start">
            <number-field
              v-model="remineral.amount"
              :label="remineral.name"
              :hint="remineral.liquid ? 'Введите объем реминерализатора' : 'Введите массу реминерализатора'"
              :suffix="remineral.liquid ? 'мл' : 'г'"
              persistent-hint
            />
            <v-icon
              class="cursor-pointer ml-2 ml-md-2 mt-5 mt-md-5"
              @click="onRemoveRemineral(index)"
            >
              mdi-delete
            </v-icon>
          </div>
          <div
            v-if="remineral.reagents"
            class="d-flex body-2 text--secondary my-2 my-md-4"
          >
            <div class="mr-2 mr-md-4">
              Реагенты:
            </div>
            <div>
              <div
                v-for="(mass, name) in remineral.reagents"
                :key="`rem_${index}_${mass}`"
              >
                {{ name }}:
                <template v-if="remineral.amount">
                  {{ (mass * ( remineral.amount / remineral.mass )).toFixed(2) }} г
                </template>
                <template v-else>
                  —
                </template>
              </div>
            </div>
          </div>
        </div>
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
            v-if="tank.volume && remineralizationType !== null"
            class="mt-8"
          >
            <div class="text-subtitle-1 mb-2">
              Подготовленная жесткость
            </div>
            <div>
              <div class="d-flex">
                <v-text-field
                  :value="waterChangeGh.toFixed(2)"
                  label="Gh в подмене"
                  suffix="dGh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  class="mb-3"
                  :rules="rulesCalculation"
                />
                <v-text-field
                  v-if="isTests"
                  :value="totalGh.toFixed(2)"
                  label="Gh в аквариуме"
                  suffix="dGh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  class="mb-3 ml-3"
                  :rules="rulesCalculation"
                />
              </div>
              <div class="d-flex">
                <v-text-field
                  :value="waterChangeKh.toFixed(2)"
                  label="Kh в подмене"
                  suffix="dKh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  :rules="rulesCalculation"
                />
                <v-text-field
                  v-if="isTests"
                  :value="totalKh.toFixed(2)"
                  label="Kh в аквариуме"
                  suffix="dKh"
                  hide-details="auto"
                  readonly
                  outlined
                  persistent-hint
                  class="ml-3"
                  :rules="rulesCalculation"
                />
              </div>
            </div>
          </div>
        </v-expand-transition>
      </v-col>
      <the-guide>
        На этой странице можно рассчитать Gh/Kh в аквариуме в зависимости от исходной воды, разбавления осмосом,
        реминерализатора и дозировок удобрений.
      </the-guide>
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
} from '@/helpers/funcs/funcs';
import FertilizersDoseTable, { FERTILIZATION_IN_TAP_WATER } from '@/components/FertilizersDoseTable.vue';
import { countKh } from '@/helpers/funcs/hardness';

export const REMINERALIZATION_TYPES_REM = 0;
export const REMINERALIZATION_TYPES_TAP = 1;
export const REMINERALIZATION_TYPES_MIX = 2;

export default {
  name: 'Remineralization',
  components: {
    FertilizersDoseTable,
  },
  head() {
    return {
      title: 'Водоподготовка в аквариуме',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Данный калькулятор позволяет подготовить подменную воду с нужными параметрами жесткости '
            + 'воды и легко рассчитать итоговую жесткость в аквариуме.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'подмена, жесткость воды, gh, kh',
        },
      ],
    };
  },
  data() {
    return {
      FORMULAS,
      ELEMENTS,
      GH,
      REMINERALS,
      FERTILIZATION_IN_TAP_WATER,
      REMINERALIZATION_TYPES_REM,
      REMINERALIZATION_TYPES_TAP,
      REMINERALIZATION_TYPES_MIX,
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
      'reminerals',
    ]),
    remineralizationType: {
      get() {
        return this.$store.state.remineralization.type;
      },
      set(value) {
        this.osmosisChange = 0;
        this.ghInit = 0;
        this.khInit = 0;
        this.ghWaterChange = 0;
        this.khWaterChange = 0;
        this.recipesSelected = [];
        this.remineralsSelected = [];
        this.$store.commit('REMINERALIZATION_SET_TYPE', value);
      },
    },
    isTests: {
      get() {
        return this.$store.state.remineralization.isTests;
      },
      set(value) {
        this.$store.commit('REMINERALIZATION_SET_IS_TESTS', value);
      },
    },
    remineralsAll() {
      const reminerals = this.reminerals.map((rem) => ({
        ...rem,
        mass: Object.values(rem.mass).reduce((acc, val) => acc + val, 0),
        reagents: { ...rem.mass },
      }));
      return [...REMINERALS, ...reminerals];
    },
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
    onRemoveRemineral(index) {
      this.remineralsSelected.splice(index, 1);
    },
  },
};
</script>

<style lang="sass">
</style>
