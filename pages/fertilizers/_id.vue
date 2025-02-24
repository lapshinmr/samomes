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
          to="/fertilizers"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <page-title>
        <template v-if="isCreate">
          Новое удобрение
        </template>
        <template v-else>
          {{ name }}
        </template>
      </page-title>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="fertilizerForm">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12">
                  Чтобы добавить своё фирменное удобрение, воспользуйтесь формой ниже. Выберите единицы
                  измерения и введите концентрации элементов, указанные на этикетке.
                </v-col>
                <v-col cols="12">
                  <div class="d-flex align-center my-3">
                    <v-divider />
                    <div class="mx-4">
                      или
                    </div>
                    <v-divider />
                  </div>
                  <v-combobox
                    v-model="fertilizerExampleChosen"
                    :items="fertilizerExamples"
                    label="Выберите удобрение из списка"
                    hint="* здесь есть большинство фирменных удобрений"
                    persistent-hint
                    item-text="name"
                    :return-object="true"
                    hide-details="auto"
                  />
                  <v-alert
                    v-if="updatedAt"
                    type="success"
                    class="mt-2"
                  >
                    Информация о составе удобрения обновлена {{ updatedAt | format('DD MMMM YYYY') }}
                    в соответствии с данными производителя.
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <v-radio-group
                    v-model="isPercent"
                    row
                    class="mt-0"
                    hide-details="auto"
                  >
                    <v-radio
                      label="г/л"
                      :value="false"
                    />
                    <v-radio
                      label="%"
                      :value="true"
                    />
                  </v-radio-group>
                  <v-alert
                    v-if="isUnitsChangedAlert"
                    type="error"
                    class="mt-4"
                  >
                    Внимание! Вы изменили единицы измерения. Концентрации теперь отличаются в 10
                    раз от указанных на этикетке.
                    Если вы не уверены в правильности изменений, вернитесь к исходному варианту.
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="12"
                      class="text--red"
                    >
                      * элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
                    </v-col>
                    <v-col
                      v-for="el in Object.keys(elements)"
                      :cols="elementCols[el]"
                      class="py-0"
                      :key="el"
                    >
                      <number-field
                        v-model="elements[el]"
                        :precision-show="5"
                        :label="el"
                        :suffix="isPercent ? '%' : 'г/л'"
                        persistent-hint
                        hide-details="auto"
                        :disabled="isDisabledCol[el]"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-expand-transition>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Название удобрения"
                      hide-details="auto"
                      hint="* название удобрения должно быть уникальным"
                      :rules="rulesName"
                    />
                  </v-col>
                </v-expand-transition>
                <v-expand-transition>
                  <v-col cols="12">
                    <v-textarea
                      v-model="note"
                      label="Примечание"
                      hide-details="auto"
                      auto-grow
                      rows="1"
                      hint="Вы можете добавить дополнительные сведения к удобрению"
                    />
                  </v-col>
                </v-expand-transition>
                <v-expand-transition>
                  <v-col
                    class="text-right"
                    cols="12"
                  >
                    <v-btn
                      v-if="!isCreate"
                      @click="removeFertilizer"
                    >
                      Удалить
                    </v-btn>
                    <v-btn
                      v-if="!isCreate"
                      color="primary"
                      @click="editFertilizer"
                      class="ml-2"
                    >
                      Сохранить
                    </v-btn>
                    <v-btn
                      v-if="isCreate"
                      color="primary"
                      @click="addFertilizer"
                    >
                      Добавить
                    </v-btn>
                  </v-col>
                </v-expand-transition>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FORMULAS from '~/helpers/constants/formulas';
import FERTILIZERS from '~/helpers/constants/fertilizers';
import {
  convertIonName,
  convertIonRatio,
  OXIDE_TO_ELEMENT,
  OPPOSITE,
  getOxideToElementRatio,
} from '~/helpers/funcs/funcs';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Fertilizer',
  data() {
    return {
      FORMULAS,
      FERTILIZERS,
      fertilizerExampleChosen: null,
      solute: {},
      name: 'Удобрение',
      note: '',
      updatedAt: undefined,
      elements: {
        N: null,
        NO3: null,
        P: null,
        PO4: null,
        P2O5: null,
        K: null,
        K2O: null,
        Ca: null,
        CaO: null,
        Mg: null,
        MgO: null,
        Fe: null,
        Mn: null,
        B: null,
        Zn: null,
        Cu: null,
        Mo: null,
        Ni: null,
        S: null,
        Cl: null,
        Na: null,
        Co: null,
        Rb: null,
        V: null,
      },
      isPercent: false,
      rulesName: [
        (v) => !!v || 'Введите название',
        () => !this.isExist || 'Удобрение с таким названием уже существует',
      ],
    };
  },
  mounted() {
    if (!this.isCreate) {
      Object.assign(this.$data, JSON.parse(JSON.stringify({ ...this.fertilizers[this.fertilizerIndex] })));
    }
  },
  computed: {
    ...mapState([
      'fertilizers',
    ]),
    isCreate() {
      return this.$route.params.id === 'create';
    },
    fertilizerIndex() {
      return this.$route.params.id;
    },
    fertilizerExamples() {
      const fertilizerExamples = [...this.FERTILIZERS];
      fertilizerExamples.sort((a, b) => a.name.localeCompare(b));
      return fertilizerExamples;
    },
    isUnitsChangedAlert() {
      return this.fertilizerExampleChosen && this.fertilizerExampleChosen?.isPercent !== this.isPercent;
    },
    elementCols() {
      const result = {};
      Object.keys(this.elements).forEach((el) => {
        if (['N', 'NO3', 'K', 'K2O', 'Ca', 'CaO', 'Mg', 'MgO'].includes(el)) {
          result[el] = 6;
        } else if (['P', 'PO4', 'P2O5'].includes(el)) {
          result[el] = 4;
        } else {
          result[el] = 12;
        }
      });
      return result;
    },
    concentration() {
      const result = {};
      result[this.name] = {};
      Object.entries(this.elements).forEach(([el, value]) => {
        const convertRatio = this.isPercent ? 10 : 1;
        // TODO: Simplify condition; remove this.name data nesting
        if (value && ['NO3', 'PO4', 'MgO', 'CaO'].includes(el)) {
          result[this.name][OXIDE_TO_ELEMENT[el]] = this.getOxideToElementRatio(el) * value * convertRatio;
        } else if (value && el === 'P2O5') {
          result[this.name].P = this.getOxideToElementRatio(el) * value * convertRatio;
        } else if (value && el === 'K2O') {
          result[this.name].K = this.getOxideToElementRatio(el) * value * convertRatio;
        } else if (value) {
          result[this.name][el] = value * convertRatio;
        }
      });
      return result;
    },
    isDisabledCol() {
      const result = {};
      const OPPOSITE_EXTENDED = {
        ...OPPOSITE,
        K: 'K2O',
        K2O: 'K',
        MgO: 'Mg',
        Mg: 'MgO',
        CaO: 'Ca',
        Ca: 'CaO',
      };
      Object.entries(this.elements).forEach(([el, value]) => {
        if (value) {
          if (this.concentration[this.name].P) {
            result.P = !this.elements.P;
            result.PO4 = !this.elements.PO4;
            result.P2O5 = !this.elements.P2O5;
          } else if (OPPOSITE_EXTENDED[el]) {
            result[OPPOSITE_EXTENDED[el]] = true;
          }
        }
      });
      return result;
    },
    isExist() {
      const names = this.fertilizers.map((item) => item.name);
      const index = names.findIndex((item) => item === this.name);
      const isExist = index !== -1;
      const isEdit = index === +this.fertilizerIndex;
      return isExist && !isEdit;
    },
  },
  watch: {
    fertilizerExampleChosen: {
      deep: true,
      handler(value) {
        this.isPercent = value.isPercent;
        Object.keys(this.elements).forEach((ion) => {
          this.elements[ion] = null;
        });
        this.elements = Object.assign(this.elements, value.elements);
        this.name = value.name;
        this.note = value.note;
        this.updatedAt = value.updatedAt;
      },
    },
  },
  methods: {
    ...mapMutations([
      'FERTILIZER_ADD',
      'FERTILIZER_REMOVE',
      'FERTILIZER_EDIT',
      'SNACKBAR_SHOW',
    ]),
    convertIonName,
    convertIonRatio,
    getOxideToElementRatio,
    addFertilizer() {
      if (this.$refs.fertilizerForm.validate()) {
        this.FERTILIZER_ADD({
          name: this.name,
          note: this.note,
          elements: { ...this.elements },
          concentration: { ...this.concentration },
          isPercent: this.isPercent,
        });
        this.SNACKBAR_SHOW('Удобрение добавлено');
        this.$router.push('/fertilizers');
      }
    },
    editFertilizer() {
      if (this.$refs.fertilizerForm.validate()) {
        this.FERTILIZER_EDIT({
          index: this.fertilizerIndex,
          fertilizer: {
            name: this.name,
            note: this.note,
            concentration: { ...this.concentration },
            elements: { ...this.elements },
            isPercent: this.isPercent,
          },
        });
        this.SNACKBAR_SHOW('Удобрение изменено');
        this.$router.push('/fertilizers');
      }
    },
    removeFertilizer() {
      this.FERTILIZER_REMOVE(this.fertilizerIndex);
      this.SNACKBAR_SHOW('Удобрение удалено');
      this.$router.push('/fertilizers');
    },
  },
};
</script>

<style lang="sass">
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
