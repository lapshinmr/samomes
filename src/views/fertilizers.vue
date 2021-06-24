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
        Удобрения
      </page-title>
      <guide>
        На этой странице можно добавить готовые удобрения (самодельные или фирменные удобрения с известным составом).
        А так же можно добавить удобрение с неизвестным составом, чтобы была возможность учесть его в расписании.
        <br>
        <br>
        Готовые удобрения можно использовать при составлении
        <router-link to="/schedules">
          расписания
        </router-link>
        внесения удобрений.
      </guide>
      <v-col
        v-if="fertilizers.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного удобрения
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-expansion-panels
          multiple
        >
          <draggable
            v-model="fertilizers"
            v-bind="dragOptions"
            @start="drag=true"
            @end="drag=false"
            handle=".handle"
            style="width: 100%;"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <v-expansion-panel
                v-for="(item, index) in fertilizers"
                :key="item.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div
                    class="d-flex justify-space-between align-center"
                    style="width: 100%;"
                  >
                    <span
                      class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
                      :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                    >
                      <span style="line-height: 1.25rem;">
                        {{ item.name }}
                      </span>
                    </span>
                    <span class="mr-3">
                      <v-tooltip
                        bottom
                        max-width="400"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon
                            class="handle ml-2"
                            v-on="on"
                          >mdi mdi-drag</v-icon>
                        </template>
                        {{ $t('fertilizers.panels.header.pull') }}
                      </v-tooltip>
                    </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <recipe :recipe="item" />
                  <div class="d-flex justify-end mt-4">
                    <v-btn
                      text
                      @click="openEditFertilizer(index)"
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
            {{ $t('fertilizers.dialog.fertilizerEdit') }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            {{ $t('fertilizers.dialog.fertilizerEdit') }}
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
                              v-for="(amount, el) in elements"
                              :cols="['N', 'NO3', 'P', 'PO4'].includes(el) ? 6 : 12"
                              class="py-0"
                              :key="el"
                            >
                              <v-text-field
                                v-model.number="elements[el]"
                                type="number"
                                :label="el"
                                :value="amount"
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
                              v-model="fertilizerName"
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
                              v-model="fertilizerNote"
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
                              v-if="isEditing"
                              @click="removeFertilizer"
                            >
                              Удалить
                            </v-btn>
                            <v-btn
                              v-if="isEditing"
                              color="primary"
                              @click="editFertilizer"
                              class="ml-2"
                            >
                              Сохранить
                            </v-btn>
                            <v-btn
                              v-if="!isEditing"
                              color="primary"
                              @click="addFertilizer"
                            >
                              Сохранить
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
        </v-card-text>
      </v-card>
    </v-dialog>
    <add-button :action="openAddSolution">
      {{ $t('fertilizers.addButton') }}
    </add-button>
  </v-container>
</template>

<script>
import FORMULAS from '@/constants/formulas';
import FERTILIZERS from '@/constants/fertilizers';
import { convertIonName, convertIonRatio, OPPOSITE } from '@/helpers/funcs';
import { mapMutations } from 'vuex';
import draggable from 'vuedraggable';
import Recipe from '@/components/recipes/Recipe.vue';

export default {
  name: 'Fertilizers',
  components: {
    draggable,
    Recipe,
  },
  data() {
    return {
      FORMULAS,
      FERTILIZERS,
      OPPOSITE,
      drag: false,
      fertilizerExampleChosen: null,
      solute: {},
      fertilizerName: 'Удобрение',
      fertilizerNote: '',
      elements: { ...this.resetElements() },
      isPercent: false,
      curFertilizerIndex: null,
      dialog: this.$route.params.open,
      dialogShare: false,
      timeout: 2000,
      rulesName: [
        (v) => !!v || 'Введите название',
        () => (!this.isExist || this.isSame) || 'Рецепт с таким названием уже существует',
      ],
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    fertilizers: {
      get() {
        return this.$store.state.fertilizers;
      },
      set(value) {
        this.FERTILIZER_MOVE(value);
      },
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
      result[this.fertilizerName] = {};
      Object.entries(this.elements).forEach(([el, value]) => {
        const convertRatio = this.isPercent ? 10 : 1;
        if (value && ['NO3', 'PO4'].includes(el)) {
          result[this.fertilizerName][this.convertIonName(el)] = this.convertIonRatio(el) * value * convertRatio;
        } else if (value) {
          result[this.fertilizerName][el] = value * convertRatio;
        }
      });
      return result;
    },
    isExist() {
      const names = this.fertilizers.map((item) => item.name);
      return names.findIndex((item) => item === this.fertilizerName) !== -1;
    },
    isSame() {
      const names = this.fertilizers.map((item) => item.name);
      return names.findIndex((item) => item === this.fertilizerName) === this.curFertilizerIndex;
    },
    isEditing() {
      return this.curFertilizerIndex !== null;
    },
  },
  watch: {
    fertilizerExampleChosen() {
      this.FERTILIZERS.forEach((item) => {
        if (item.name === this.fertilizerExampleChosen) {
          this.isPercent = item.isPercent;
          this.elements = { ...this.resetElements() };
          this.elements = Object.assign(this.elements, item.elements);
          this.fertilizerName = item.name;
          this.fertilizerNote = item.note;
        }
      });
    },
    dialogShare() {
      if (!this.dialogShare) {
        this.curFertilizerIndex = null;
      }
    },
  },
  methods: {
    ...mapMutations([
      'FERTILIZER_ADD',
      'FERTILIZER_REMOVE',
      'FERTILIZER_EDIT',
      'FERTILIZER_MOVE',
      'SNACKBAR_SHOW',
    ]),
    convertIonName,
    convertIonRatio,
    resetComponent(dialog = false) {
      this.fertilizerExampleChosen = null;
      this.fertilizerName = '';
      this.fertilizerNote = null;
      this.curFertilizerIndex = null;
      this.solute = {};
      this.dialog = dialog;
      this.isPercent = false;
      this.elements = { ...this.resetElements() };
    },
    setComponent(fertilizer, index = null) {
      this.fertilizerName = fertilizer.name;
      this.fertilizerNote = fertilizer.note;
      this.curFertilizerIndex = index;
      this.dialog = true;
      this.isPercent = fertilizer.isPercent;
      this.elements = { ...fertilizer.elements };
    },
    resetElements() {
      return {
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
      };
    },
    openAddSolution() {
      this.resetComponent();
      this.dialog = true;
      if (this.$refs.fertilizerForm) {
        this.$refs.fertilizerForm.resetValidation();
      }
    },
    addFertilizer() {
      if (this.$refs.fertilizerForm.validate()) {
        this.FERTILIZER_ADD({
          name: this.fertilizerName,
          note: this.fertilizerNote,
          mass: { ...this.fertilizerMass },
          elements: { ...this.elements },
          concentration: { ...this.concentration },
          isPercent: this.isPercent,
        });
        this.resetComponent();
        this.SNACKBAR_SHOW('Рецепт добавлен');
      }
    },
    openEditFertilizer(index) {
      this.resetComponent();
      this.setComponent(this.fertilizers[index], index);
      if (this.$refs.fertilizerForm) {
        this.$refs.fertilizerForm.resetValidation();
      }
    },
    editFertilizer() {
      if (this.$refs.fertilizerForm.validate()) {
        this.FERTILIZER_EDIT({
          index: this.curFertilizerIndex,
          fertilizer: {
            name: this.fertilizerName,
            note: this.fertilizerNote,
            volume: this.fertilizerVolume,
            mass: { ...this.fertilizerMass },
            concentration: { ...this.concentration },
            elements: { ...this.elements },
            isPercent: this.isPercent,
          },
        });
        this.resetComponent();
        this.SNACKBAR_SHOW('Рецепт изменен');
      }
    },
    removeFertilizer() {
      this.FERTILIZER_REMOVE(this.curFertilizerIndex);
      this.resetComponent();
      this.SNACKBAR_SHOW('Рецепт удален');
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
