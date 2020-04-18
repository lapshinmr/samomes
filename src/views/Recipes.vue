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
      <v-col v-if="recipes.length === 0" cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          У вас еще нет рецептов
        </p>
        <p>
          <a @click="dialog = true">Добавьте рецепты</a>, чтобы вы могли
          использовать их для составления расписания по внесению удобрений.
        </p>
        <p v-if="tanks.length === 0">
          <router-link :to="{ name: 'tanks', params: { open: true }}">Добавьте аквариум</router-link>
          и после этого можно будет составлять расписание.
        </p>
      </v-col>
      <v-col cols="12" md="8" offset-md="2"
        v-for="(recipe, index) in recipes"
        :key="recipe.name"
      >
        <v-card>
          <v-card-title>
            <div class="d-flex justify-space-between" style="width: 100%;">
              <span class="no-break">
                {{ recipe.name }}
              </span>
              <span>
                <v-tooltip bottom max-width="400">
                  <template v-slot:activator="{ on }">
                    <a class="ml-3" @click="openShareDialog(index)" v-on="on">
                      <v-icon>fas fa-share</v-icon>
                    </a>
                  </template>
                  Поделиться ссылкой на рецепт
                </v-tooltip>
              </span>
            </div>
          </v-card-title>
          <v-card-subtitle>
            {{ recipe.type }}
          </v-card-subtitle>
          <v-card-text>
            <div v-if="recipe.volume" class="d-flex justify-space-between">
              <span class="font-weight-medium">
                Объем удобрения
              </span>
              <span>
                {{ recipe.volume }} мл
              </span>
            </div>
            <v-divider v-if="recipe.type === 'Самомес'" class="my-3"/>
            <div v-if="recipe.type === 'Самомес'" class="mb-2 font-weight-medium">
              Реагенты
            </div>
            <template v-for="reagent in recipe.reagents">
              <div v-if="recipe.mass[reagent]" class="d-flex justify-space-between" :key="reagent">
                <span>
                  {{ FORMULAS[reagent].name }}
                </span>
                <span>
                  {{ recipe.mass[reagent].toFixed(2) }} г
                </span>
              </div>
            </template>
            <v-divider v-if="recipe.type === 'Самомес'" class="my-3"/>
            <div
              v-if="isConcentration(recipe.concentration)"
              class="d-flex justify-space-between"
            >
              <div class="font-weight-medium">Концентрация</div>
              <div class="d-flex">
                <div>
                  <div
                    v-for="(value, ion) in countTotalIonConcentration(recipe.concentration)"
                    class="mr-3"
                    :key="ion + 'name'"
                  >
                    {{ convertIonName(ion) }}
                  </div>
                </div>
                <div>
                  <div
                    v-for="(value, ion) in countTotalIonConcentration(recipe.concentration)"
                    :key="ion + 'unit'"
                    class="text-right"
                  >
                    {{ (convertIonRatio(ion) * value).toFixed(2) }} г/л
                  </div>
                </div>
              </div>
            </div>
            <v-divider v-if="recipe.note" class="my-3"/>
            <div v-if="recipe.note" class="d-flex justify-space-between">
              <div class="font-weight-medium mr-3">Примечание</div>
              <div class="text-right">
                {{ recipe.note }}
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="setComponent(recipes[index], index)">
              Изменить
            </v-btn>
          </v-card-actions>
        </v-card>
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
            Новый рецепт
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Редактирование рецепта
          </v-toolbar-title>
          <v-btn icon dark @click="dialog = false" class="ml-auto">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-2">
          <v-container>
            <v-row>
              <v-col cols="12" md="8" offset-md="2">
                <v-form ref="recipeForm">
                  <v-row>
                    <v-col v-if="isShared" cols="12">
                      <p class="display-1">
                        С вами поделились рецептом!
                      </p>
                      <p>
                        Посмотрите рецепт, дайте ему
                        название и напишите примечание. После этого можете сохранить его.
                      </p>
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <v-select
                        :items="fertilizerTypes"
                        v-model="fertilizerType"
                        label="Выберите тип удобрения"
                        hint="От типа зависит расчет удобрения"
                        persistent-hint
                        hide-details="auto"
                        hide-selected
                        :disabled="isEditing"
                      ></v-select>
                    </v-col>
                    <v-col v-if="fertilizerType === 'Самомес'" cols="12" class="pt-0">
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="reagents"
                            item-text="text"
                            item-value="value"
                            v-model="reagentsSelected"
                            multiple
                            label="Реагент"
                            hint="Вы можете выбрать несколько реагентов"
                            persistent-hint
                            hide-details="auto"
                            :rules="rulesReagent"
                          ></v-select>
                          <v-btn text @click="showExamples = !showExamples" class="px-0 mt-3">
                            Выбрать готовый рецепт
                            <v-icon>
                              {{ showExamples ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                            </v-icon>
                          </v-btn>
                          <v-expand-transition>
                            <div v-if="showExamples">
                              <v-select
                                :items="recipesExamples['самомес']"
                                v-model="recipeExampleChosen"
                                label="Рецепт"
                                hint="Нажмите, чтобы выбрать один из рецептов"
                                persistent-hint
                                hide-details="auto"
                              ></v-select>
                            </div>
                          </v-expand-transition>
                          <div class="mt-3">
                            <template v-for="(reagent, index) in reagents">
                              <div
                                v-if="reagentsSelected.includes(reagent.value)"
                                class="d-flex justify-space-between caption"
                                :key="reagent.value"
                              >
                                <div>{{ reagents[index].name }}</div>
                                <div>{{ showComponents(countProcent(reagent.value)) }}</div>
                              </div>
                            </template>
                          </div>
                          <div v-if="reagentsSelected.length > 0" class="mt-3">
                            <small>
                              *Так как аквариумисту удобнее работать с нитратом (NO3), а не с азотом (N), далее
                              азот будет приведен к нитрату.
                            </small>
                          </div>
                        </v-col>
                        <v-expand-transition>
                          <v-col v-if="reagentsSelected.length > 0" cols="12">
                            <v-combobox
                              :items="tanks"
                              v-model.number="tankVolume"
                              item-text="name"
                              item-value="volume"
                              label="Объем аквариума"
                              persistent-hint
                              hide-selected
                              hint="Выберите аквариум или введите объем"
                              suffix="л"
                              :return-object="false"
                              :rules="rulesTankVolume"
                            ></v-combobox>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col v-if="reagentsSelected.length > 0" cols="12">
                            <v-text-field
                              :value="fertilizerVolume"
                              @input="inputVolume"
                              label="Введите объем удобрения"
                              suffix="мл"
                              hint="Выбирайте объем, который вы сможете использовать в течении 2-3x месяцев. Обычно это 250-300 мл."
                              hide-details="auto"
                              :rules="rulesVolume"
                            >
                            </v-text-field>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col v-if="reagentsSelected.length > 0 && fertilizerVolume && tankVolume" cols="12">
                            <v-row>
                              <v-col cols="12">
                                <div class="d-flex align-center">
                                  <v-divider />
                                  <span class="mx-3">
                                    Введите массу реагента
                                    <v-tooltip bottom max-width="400">
                                      <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                      </template>
                                      Введите массу реагента и калькулятор автоматически рассчитает
                                      дозы элементов, которые показаны ниже.
                                    </v-tooltip>
                                  </span>
                                  <v-divider />
                                </div>
                              </v-col>
                              <v-col v-for="reagent in reagentsSelected" cols="12" :key="reagent" class="py-0">
                                <v-text-field
                                  :value="fertilizerMass[reagent]"
                                  @input="inputMass(reagent)"
                                  :label="reagent"
                                  suffix="г"
                                  :hint="fertilizerMassHint(reagent)"
                                  hide-details="auto"
                                  :key="reagent"
                                  :rules="[rulesMass.isExist(), rulesMass.solubility(reagent, fertilizerVolume, FORMULAS)]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-2 pb-0">
                                <v-btn
                                  center
                                  text
                                  @click="isShowConcentration = !isShowConcentration"
                                  class="px-0"
                                >
                                  Показать концентрации
                                  <v-icon>{{ isShowConcentration ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                              </v-col>
                              <v-expand-transition>
                                <v-col cols="12" v-if="isShowConcentration" class="pt-0">
                                  <v-switch
                                    v-model="isConcentrationPercent"
                                    label="Показать соотношение"
                                    hide-details="auto"
                                    class="mt-1"
                                  ></v-switch>
                                  <v-switch
                                    v-model="isWithoutConvertion"
                                    label="Показать N и P"
                                    hide-details="auto"
                                    class="mt-1"
                                  ></v-switch>
                                  <v-simple-table>
                                    <template v-slot:default>
                                      <thead>
                                        <tr>
                                          <th>
                                            Реагент
                                          </th>
                                          <th
                                            v-for="ion in Object.keys(countTotalIonConcentration(concentration))"
                                            :key="ion"
                                          >
                                            <template v-if="isWithoutConvertion && ion !== convertIonName(ion)">
                                              {{ ion }} /
                                            </template>
                                            <template v-if="ion !== convertIonName(ion)">
                                              {{ convertIonName(ion) }}, мг/л
                                            </template>
                                            <template v-else>
                                              {{ ion }}, мг/л
                                            </template>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="reagent in Object.keys(concentration)" :key="reagent">
                                          <td>
                                            {{ reagent }}
                                          </td>
                                          <td v-for="(value, ion) in countTotalIonConcentration(concentration)" :key="reagent + ion">
                                            <template v-if="Object.keys(concentration[reagent]).includes(ion)">
                                              <template v-if="isWithoutConvertion && ion !== convertIonName(ion)">
                                                {{ concentration[reagent][ion].toFixed(2) }} /
                                              </template>
                                              <template v-if="ion !== convertIonName(ion)" >
                                                {{ (convertIonRatio(ion) * concentration[reagent][ion]).toFixed(2) }}
                                              </template>
                                              <template v-else>
                                                {{ concentration[reagent][ion].toFixed(2) }}
                                              </template>
                                              <template v-if="value && isConcentrationPercent">
                                                ({{ (concentration[reagent][ion] / value * 100).toFixed(1) }}%)
                                              </template>
                                            </template>
                                            <template v-else>
                                              -
                                            </template>
                                          </td>
                                        </tr>
                                        <tr class="font-weight-bold">
                                          <td>
                                            Сумма
                                          </td>
                                          <template v-for="(value, ion) in countTotalIonConcentration(concentration)">
                                            <td v-if="ion !== convertIonName(ion)" :key="ion">
                                              <template v-if="isWithoutConvertion && ion !== convertIonName(ion)">
                                                {{ value.toFixed(2) }} /
                                              </template>
                                              {{ (convertIonRatio(ion) * value).toFixed(2) }}
                                            </td>
                                            <td v-else :key="ion">
                                              {{ value.toFixed(2) }}
                                            </td>
                                          </template>
                                        </tr>
                                      </tbody>
                                    </template>
                                 </v-simple-table>
                                </v-col>
                              </v-expand-transition>
                              <v-col cols="12">
                                <div class="d-flex align-center">
                                  <v-divider />
                                  <span class="mx-3">
                                    Или введите дозу элемента
                                    <v-tooltip bottom max-width="400">
                                      <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                      </template>
                                      Введите дозу элемента. Калькулятор автоматически рассчитает
                                      необходимую массу реагента.
                                      Доза - это количество элемента, на которую повысится концентрация
                                      элемента в заданном объеме аквариума при внесении 1 мл удобрения.
                                      Например, вы хотите сделать макро удобрение с нитратом.
                                      И для удобства введения его в аквариум вы бы хотели, чтобы
                                      на каждый вводимый 1 мл удобрения, нитрат повышался на 0.5 мг/л.
                                      0.5 - это доза.
                                    </v-tooltip>
                                  </span>
                                  <v-divider />
                                </div>
                              </v-col>
                              <v-col cols="12" class="pb-0">
                                <v-row>
                                  <template v-for="reagent in reagentsSelected">
                                    <v-col cols="12" :key="reagent" class="py-0">
                                      <v-row class="mb-3">
                                        <template v-for="(data, ion) in FORMULAS[reagent].ions">
                                          <v-col v-if="data.isNeeded" :key="reagent + ion" class="py-0">
                                            <v-text-field
                                              :value="solute[reagent][ion]"
                                              @input="inputIon(reagent, ion)"
                                              :label="convertIonName(ion) + ', мг/л'"
                                              :hint="'из ' + reagent"
                                              persistent-hint
                                            ></v-text-field>
                                          </v-col>
                                        </template>
                                      </v-row>
                                    </v-col>
                                  </template>
                                  <v-col v-if="reagentsSelected.length > 1" cols="12" class="d-flex justify-space-between pb-0">
                                    <div>
                                      Общая доза, мг/л
                                    </div>
                                    <div class="d-flex flex-column">
                                      <div
                                        v-for="(value, name) in countTotalIonDose(solute)"
                                        class="d-flex justify-space-between"
                                        :key="name"
                                      >
                                        <div>{{ convertIonName(name) }}:</div>
                                        <div class="ml-3">
                                          {{ value.toFixed(3) }}
                                          <template v-if="countTotalDose(solute)">
                                            ({{ (value / countTotalDose(solute) * 100).toFixed(1) }}%)
                                          </template>
                                        </div>
                                      </div>
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col v-if="reagentsSelected.length > 0 && fertilizerVolume && tankVolume" cols="12">
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="recipeName"
                                  label="Имя рецепта"
                                  hide-details="auto"
                                  hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                                  :rules="rulesName"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-textarea
                                  v-model="recipeNote"
                                  label="Примечание"
                                  hide-details="auto"
                                  auto-grow
                                  rows="1"
                                  hint="Вы можете добавить дополнительные сведения к рецепту"
                                ></v-textarea>
                              </v-col>
                              <v-col class="text-right" cols="12">
                                <v-btn
                                  v-if="isEditing"
                                  @click="removeRecipe"
                                >Удалить</v-btn>
                                <v-btn
                                  v-if="isEditing"
                                  color="primary"
                                  @click="editRecipe"
                                  class="ml-2"
                                >Сохранить</v-btn>
                                <v-btn
                                  v-if="!isEditing"
                                  color="primary"
                                  @click="addRecipe"
                                >
                                  Сохранить
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-expand-transition>
                      </v-row>
                    </v-col>
                    <v-col v-else cols="12">
                      <v-row>
                        <v-col cols="12">
                          <v-btn text @click="showExamples = !showExamples" class="px-0 mt-3">
                            Выбрать готовый рецепт
                            <v-icon>
                              {{ showExamples ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                            </v-icon>
                          </v-btn>
                          <v-expand-transition>
                            <div v-if="showExamples">
                              <v-select
                                :items="recipesExamples['готовое']"
                                v-model="recipeExampleChosen"
                                label="Рецепт"
                                hint="Нажмите, чтобы выбрать один из рецептов"
                                persistent-hint
                                hide-details="auto"
                              ></v-select>
                            </div>
                          </v-expand-transition>
                        </v-col>
                        <v-col cols="12">
                          Выберите единицы и введите концентрации элементов, которые указаны в составе удобрения.
                          Элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
                        </v-col>
                        <v-col cols="12">
                          <v-radio-group
                            v-model="isPercent"
                            row
                            class="mt-0"
                            hide-details="auto"
                          >
                            <v-radio label="г/л" :value="false"></v-radio>
                            <v-radio label="%" :value="true"></v-radio>
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
                                :label="el"
                                :value="amount"
                                :suffix="isPercent ? '%' : 'г/л'"
                                persistent-hint
                                hide-details="auto"
                                :disabled="opposite[el] ? Boolean(elements[opposite[el]]) : false"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-expand-transition>
                          <v-col cols="12">
                            <v-text-field
                              v-model="recipeName"
                              label="Имя рецепта"
                              hide-details="auto"
                              hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                              :rules="rulesName"
                            ></v-text-field>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col cols="12">
                            <v-textarea
                              v-model="recipeNote"
                              label="Примечание"
                              hide-details="auto"
                              auto-grow
                              rows="1"
                              hint="Вы можете добавить дополнительные сведения к рецепту"
                            ></v-textarea>
                          </v-col>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-col class="text-right" cols="12">
                            <v-btn
                              v-if="isEditing"
                              @click="removeRecipe"
                            >Удалить</v-btn>
                            <v-btn
                              v-if="isEditing"
                              color="primary"
                              @click="editRecipe"
                              class="ml-2"
                            >Сохранить</v-btn>
                            <v-btn
                              v-if="!isEditing"
                              color="primary"
                              @click="addRecipe"
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

    <v-dialog
      v-model="dialogShare"
      width="500"
    >
      <v-card>
        <v-card-title>
          Поделиться ссылкой
        </v-card-title>
        <v-card-text v-if="this.curRecipeIndex !== null">
            <v-text-field
              :value="encodedUrl"
              label="Ваша ссылка для отправки"
              hint="Скопируйте ссылку"
              id="encodedUrl"
            >
              <template v-slot:append>
                <v-tooltip bottom max-width="400">
                  <template v-slot:activator="{ on }">
                    <a @click="copyUrl()">
                      <v-icon v-on="on">fas fa-clipboard</v-icon>
                    </a>
                  </template>
                  Скопировать
                </v-tooltip>
              </template>
            </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogShare = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          fab
          @click="openAddRecipe"
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
      <span>Добавить удобрение</span>
    </v-tooltip>

  </v-container>
</template>

<script>
import Vue from 'vue'
import { FORMULAS, RECIPE_EXAMPLES } from '../constants.js'
import {
  countTotalIonConcentration,
  countTotalConcentration,
  isConcentration,
  countTotalIonDose,
  countTotalDose,
  countMass,
  convertIonName,
  convertIonRatio
} from '../funcs.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'recipe',
  data () {
    return {
      FORMULAS: FORMULAS,
      RECIPE_EXAMPLES: RECIPE_EXAMPLES,
      fertilizerTypes: ['Самомес', 'Готовое'],
      fertilizerType: 'Самомес',
      reagentsSelected: [],
      recipeExampleChosen: null,
      showExamples: false,
      fertilizerVolume: null,
      tankVolume: null,
      fertilizerMass: {},
      solute: {},
      recipeName_: null,
      recipeNote: null,
      elements: { ...this.resetElements() },
      opposite: {
        'N': 'NO3',
        'NO3': 'N',
        'P': 'PO4',
        'PO4': 'P'
      },
      isPercent: false,
      isShared: false,
      isConcentrationPercent: false,
      isShowConcentration: false,
      isWithoutConvertion: false,
      curRecipeIndex: null,
      dialog: this.$route.params.open,
      dialogShare: false,
      timeout: 2000,
      rulesReagent: [
        v => !!(v.length > 0) || 'Выберите реагент'
      ],
      rulesMass: {
        solubility (reagent, volume, formulas) {
          return v => (
            (v / volume * 1000) < formulas[reagent].solubilityLimit ||
            `Достигнута максимальная растворимость - ${formulas[reagent].solubilityLimit} г/л при 20°С!`
          )
        },
        isExist () {
          return v => !!v || 'Введите массу'
        }
      },
      rulesVolume: [
        v => !!v || 'Введите объем удобрения'
      ],
      rulesTankVolume: [
        v => !!v || 'Введите обеъм аквариума'
      ],
      rulesName: [
        v => !!v || 'Введите название',
        v => (!this.isExist || this.isSame) || 'Рецепт с таким названием уже существует'
      ]
    }
  },
  mounted () {
    let query = this.$router.currentRoute.query
    if (query.share) {
      this.setComponent(JSON.parse(decodeURIComponent(query.share))[0])
      this.isShared = true
    }
  },
  computed: {
    ...mapState([
      'tanks', 'recipes', 'drawer'
    ]),
    reagents () {
      let result = []
      for (let formula in this.FORMULAS) {
        result.push({
          text: `${this.FORMULAS[formula].name} - ${formula}`,
          name: `${this.FORMULAS[formula].name}`,
          value: formula
        })
      }
      return result
    },
    recipesExamples () {
      let recipeExamples = {
        'самомес': [],
        'готовое': []
      }
      for (let item of this.RECIPE_EXAMPLES) {
        recipeExamples[item.type].push(item.name)
      }
      return recipeExamples
    },
    concentration () {
      let result = {}
      if (this.fertilizerType === 'Самомес') {
        if (this.reagentsSelected.length === 0 && !this.fertilizerMass && !this.fertilizerVolume) { return result }
        for (let reagent of this.reagentsSelected) {
          result[reagent] = {}
          let ions = FORMULAS[reagent].ions
          for (let ion in ions) {
            if (ions[ion].isNeeded) {
              result[reagent][ion] = this.fertilizerMass[reagent] * this.countProcent(reagent)[ion] / (this.fertilizerVolume / 1000)
            }
          }
        }
      } else {
        result[this.recipeName] = {}
        for (let el in this.elements) {
          let convertRatio = this.isPercent ? 10 : 1
          if (this.elements[el] && ['NO3', 'PO4'].includes(el)) {
            result[this.recipeName][this.convertIonName(el)] = this.convertIonRatio(el) * this.elements[el] * convertRatio
          } else if (this.elements[el]) {
            result[this.recipeName][el] = this.elements[el] * convertRatio
          } else {
            continue
          }
        }
      }
      return result
    },
    recipeName: {
      get () {
        if (this.recipeName_ === null && this.reagentsSelected.length === 1) {
          let reagent = this.reagentsSelected[0]
          return this.FORMULAS[reagent].name
        } else if (this.recipeName_ === null) {
          return this.fertilizerType
        } else {
          return this.recipeName_
        }
      },
      set (value) {
        this.recipeName_ = value
      }
    },
    isExist () {
      let names = this.recipes.map(item => item.name)
      return names.findIndex(item => item === this.recipeName_) !== -1
    },
    isSame () {
      let names = this.recipes.map(item => item.name)
      return names.findIndex(item => item === this.recipeName_) === this.curRecipeIndex
    },
    isEditing () {
      return this.curRecipeIndex !== null
    },
    encodedUrl () {
      let jsonString = JSON.stringify([this.recipes[this.curRecipeIndex]])
      jsonString = jsonString.replace(/%/g, '%25')
      let encoded = encodeURIComponent(jsonString)
      return window.location.origin + window.location.pathname + '?share=' + encoded
    }
  },
  watch: {
    reagentsSelected () {
      if (this.reagentsSelected.length === 0) { }
      let solute = {}
      for (let reagent of this.reagentsSelected) {
        let ions = this.FORMULAS[reagent].ions
        solute[reagent] = {}
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            solute[reagent][ion] = 0
          }
        }
      }
      this.solute = { ...solute }
      let fertilizerMass = {}
      for (let reagent of this.reagentsSelected) {
        if (!(reagent in this.fertilizerMass)) {
          fertilizerMass[reagent] = 0
        } else {
          fertilizerMass[reagent] = this.fertilizerMass[reagent]
        }
      }
      this.fertilizerMass = { ...fertilizerMass }
      if (this.fertilizerVolume) {
        this.countDose()
      }
    },
    recipeExampleChosen () {
      for (let item of this.RECIPE_EXAMPLES) {
        if (item.name === this.recipeExampleChosen && item.type === 'самомес') {
          this.reagentsSelected = Object.keys(item.reagents)
          this.recipeName_ = item.name
          this.recipeNote = item.note
          this.fertilizerVolume = item.fertilizerVolume
          this.tankVolume = item.tankVolume
          for (let reagent in item.reagents) {
            this.fertilizerMass[reagent] = item.reagents[reagent]
          }
          break
        } else if (item.name === this.recipeExampleChosen && item.type === 'готовое') {
          this.isPercent = item.isPercent
          this.elements = Object.assign({}, this.resetElements())
          this.elements = Object.assign(this.elements, item.elements)
          this.recipeName_ = item.name
          this.recipeNote = item.note
          break
        }
      }
    },
    tankVolume () {
      if (this.fertilizerVolume) {
        this.countDose()
      }
    },
    dialogShare () {
      if (!this.dialogShare) {
        this.curRecipeIndex = null
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECIPE_ADD', 'RECIPE_REMOVE', 'RECIPE_EDIT', 'SNACKBAR_SHOW'
    ]),
    resetComponent () {
      this.fertilizerType = 'Самомес'
      this.reagentsSelected = []
      this.fertilizerMass = {}
      this.fertilizerVolume = null
      this.recipeName_ = null
      this.recipeNote = null
      this.tankVolume = null
      this.curRecipeIndex = null
      this.solute = {}
      this.dialog = false
      this.isPercent = false
      this.isShared = false
      this.elements = { ...this.resetElements() }
    },
    setComponent (recipe, index = null) {
      this.fertilizerType = recipe.type
      this.reagentsSelected = recipe.reagents
      this.fertilizerMass = recipe.mass
      this.fertilizerVolume = recipe.volume
      this.tankVolume = recipe.tankVolume
      this.recipeName_ = recipe.name
      this.recipeNote = recipe.note
      this.curRecipeIndex = index
      this.dialog = true
      this.isPercent = recipe.isPercent
      if (recipe.type !== 'Самомес') {
        let reagent = Object.keys(recipe.concentration)[0]
        let convertRatio = recipe.isPercent ? 10 : 1
        for (let ion in recipe.concentration[reagent]) {
          this.elements[ion] = recipe.concentration[reagent][ion] / convertRatio
        }
      }
    },
    resetElements () {
      return {
        'N': null,
        'NO3': null,
        'P': null,
        'PO4': null,
        'K': null,
        'Ca': null,
        'Mg': null,
        'Fe': null,
        'Mn': null,
        'B': null,
        'Zn': null,
        'Cu': null,
        'Mo': null
      }
    },
    countMass (element) {
      return countMass(element)
    },
    countProcent (element) {
      let massTotal = this.countMass(element)
      let result = {}
      let ions = FORMULAS[element].ions
      for (let ion in ions) {
        if (ions[ion].isNeeded) {
          result[ion] = this.countMass(ion) * ions[ion].count / massTotal
        }
      }
      return result
    },
    convertIonName (el) {
      return convertIonName(el)
    },
    convertIonRatio (el) {
      return convertIonRatio(el)
    },
    countDose () {
      for (let reagent of this.reagentsSelected) {
        let ions = FORMULAS[reagent].ions
        let result = {}
        for (let ion in ions) {
          if (ions[ion].isNeeded) {
            let value = this.fertilizerMass[reagent] / (this.fertilizerVolume / 1000) / this.tankVolume * this.countProcent(reagent)[ion] * this.convertIonRatio(ion)
            if (!isNaN(value)) {
              value = parseFloat(value.toFixed(3))
            }
            result[ion] = value
            Vue.set(this.solute, reagent, result)
          }
        }
      }
    },
    inputMass (reagent) {
      let value = parseFloat(event.target.value)
      Vue.set(this.fertilizerMass, reagent, !isNaN(value) ? value : '')
      if (this.tankVolume && !isNaN(value)) {
        this.countDose()
      }
    },
    inputVolume () {
      this.fertilizerVolume = parseFloat(event.target.value)
      if (this.tankVolume && !isNaN(this.fertilizerVolume)) {
        this.countDose()
      }
    },
    inputIon (reagent, curIon) {
      let value
      let solute = {}
      let ratio = {}
      for (let ion in this.solute[reagent]) {
        ratio[ion] = this.convertIonRatio(ion)
      }
      for (let ion in this.solute[reagent]) {
        value = parseFloat(event.target.value)
        if (ion !== curIon) {
          if (ratio[curIon] > 1) {
            value = value / ratio[curIon]
          } else {
            value = value * ratio[ion]
          }
          value = value * (this.countProcent(reagent)[ion] / this.countProcent(reagent)[curIon])
        }
        solute[ion] = !isNaN(parseFloat(value)) ? parseFloat(value.toFixed(3)) : 0
        Vue.set(this.solute, reagent, solute)
      }
      let fertilizerMass = { ...this.fertilizerMass }
      let mass
      if (!this.solute[reagent][curIon]) {
        mass = 0
      } else {
        mass = this.solute[reagent][curIon] * this.tankVolume / this.countProcent(reagent)[curIon] * this.fertilizerVolume / 1000 / this.convertIonRatio(curIon)
      }
      fertilizerMass[reagent] = parseFloat(mass.toFixed(3))
      this.fertilizerMass = { ...fertilizerMass }
    },
    countTotalConcentration (concentration) {
      return countTotalConcentration(concentration)
    },
    countTotalIonConcentration (concentration) {
      return countTotalIonConcentration(concentration)
    },
    countTotalIonDose (solute) {
      return countTotalIonDose(solute)
    },
    countTotalDose (solute) {
      return countTotalDose(solute)
    },
    isConcentration (concentration) {
      return isConcentration(concentration)
    },
    fertilizerMassHint (reagent) {
      let hint = ''
      for (let ion in this.FORMULAS[reagent].ions) {
        let data = this.FORMULAS[reagent].ions[ion]
        if (data.isNeeded) {
          if (ion !== this.convertIonName(ion)) {
            hint += ion + '/' + this.convertIonName(ion) + ':  ' + this.concentration[reagent][ion].toFixed(2) + '/' + (this.convertIonRatio(ion) * this.concentration[reagent][ion]).toFixed(2) + ' г/л '
          } else {
            hint += ion + ':  ' + this.concentration[reagent][ion].toFixed(2) + ' г/л '
          }
        }
      }
      return hint
    },
    openAddRecipe () {
      this.resetComponent()
      this.dialog = !this.dialog
      if (this.$refs.recipeForm) {
        this.$refs.recipeForm.resetValidation()
      }
    },
    addRecipe () {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_ADD({
          type: this.fertilizerType,
          name: this.recipeName,
          note: this.recipeNote,
          volume: this.fertilizerVolume,
          tankVolume: this.tankVolume,
          reagents: [ ...this.reagentsSelected ],
          mass: { ...this.fertilizerMass },
          concentration: { ...this.concentration },
          isPercent: this.isPercent
        })
        this.resetComponent()
        this.SNACKBAR_SHOW('Рецепт добавлен')
      }
    },
    editRecipe () {
      if (this.$refs.recipeForm.validate()) {
        this.RECIPE_EDIT({
          index: this.curRecipeIndex,
          recipe: {
            type: this.fertilizerType,
            name: this.recipeName,
            note: this.recipeNote,
            volume: this.fertilizerVolume,
            tankVolume: this.tankVolume,
            reagents: [...this.reagentsSelected],
            mass: { ...this.fertilizerMass },
            concentration: { ...this.concentration },
            isPercent: this.isPercent
          }
        })
        this.resetComponent()
        this.SNACKBAR_SHOW('Рецепт изменен')
      }
    },
    removeRecipe () {
      this.RECIPE_REMOVE(this.curRecipeIndex)
      this.resetComponent()
      this.SNACKBAR_SHOW('Рецепт удален')
    },
    showComponents (ions) {
      let output = []
      for (let key in ions) {
        output.push(`${key}: ${(ions[key] * 100).toFixed(1)}%`)
      }
      return output.join(' ')
    },
    openShareDialog (index) {
      this.curRecipeIndex = index
      this.dialogShare = true
    },
    copyUrl () {
      var encodedUrl = document.getElementById('encodedUrl')
      encodedUrl.select()
      encodedUrl.setSelectionRange(0, 99999)
      document.execCommand('copy')
      this.SNACKBAR_SHOW('Ссылка скопирована')
    }
  }
}
</script>

<style lang="sass">
</style>
