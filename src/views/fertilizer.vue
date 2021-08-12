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
                <v-col
                  cols="12"
                  sm="6"
                >
                  Выберите единицы и введите концентрации элементов, которые указаны в составе удобрения.
                  Элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-combobox
                    :items="fertilizerExamples"
                    v-model="fertilizerExampleChosen"
                    label="Удобрение"
                    hint="или выберите удобрение из списка"
                    persistent-hint
                    hide-details="auto"
                  />
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
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      v-for="el in Object.keys(elements)"
                      :cols="['N', 'NO3', 'P', 'PO4'].includes(el) ? 6 : 12"
                      class="py-0"
                      :key="el"
                    >
                      <base-text-field
                        v-model="elements[el]"
                        :precision-show="5"
                        :precision-value="7"
                        type="number"
                        :label="el"
                        :suffix="isPercent ? '%' : 'г/л'"
                        persistent-hint
                        hide-details="auto"
                        :disabled="OPPOSITE[el] ? Boolean(elements[OPPOSITE[el]]) : false"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-expand-transition>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Имя рецепта"
                      hide-details="auto"
                      hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
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
                      hint="Вы можете добавить дополнительные сведения к рецепту"
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
import FORMULAS from '@/constants/formulas';
import FERTILIZERS from '@/constants/fertilizers';
import { convertIonName, convertIonRatio, OPPOSITE } from '@/helpers/funcs';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Fertilizer',
  data() {
    return {
      FORMULAS,
      FERTILIZERS,
      OPPOSITE,
      fertilizerExampleChosen: null,
      solute: {},
      name: 'Удобрение',
      note: '',
      elements: {
        N: null,
        NO3: null,
        P: null,
        PO4: null,
        K: null,
        Ca: null,
        Mg: null,
        Fe: null,
        Mn: null,
        B: null,
        Zn: null,
        Cu: null,
        Mo: null,
        Ni: null,
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
      const fertilizerExamples = [];
      this.FERTILIZERS.forEach((item) => {
        fertilizerExamples.push(item.name);
      });
      fertilizerExamples.sort((a, b) => a.localeCompare(b));
      return fertilizerExamples;
    },
    concentration() {
      const result = {};
      result[this.name] = {};
      Object.entries(this.elements).forEach(([el, value]) => {
        const convertRatio = this.isPercent ? 10 : 1;
        if (value && ['NO3', 'PO4'].includes(el)) {
          result[this.name][this.convertIonName(el)] = this.convertIonRatio(el) * value * convertRatio;
        } else if (value) {
          result[this.name][el] = value * convertRatio;
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
    fertilizerExampleChosen() {
      this.FERTILIZERS.forEach((item) => {
        if (item.name === this.fertilizerExampleChosen) {
          this.isPercent = item.isPercent;
          Object.keys(this.elements).forEach((ion) => {
            this.elements[ion] = null;
          });
          this.elements = Object.assign(this.elements, item.elements);
          this.name = item.name;
          this.note = item.note;
        }
      });
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
