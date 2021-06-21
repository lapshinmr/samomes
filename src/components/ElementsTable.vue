<template>
  <div>
    <div
      v-if="isSwitchers"
      class="d-flex flex-column flex-sm-row align-sm-center mt-2 mb-2"
    >
      <v-switch
        v-model="isHardness"
        label="dGh"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0"
      />
      <v-switch
        v-model="isWithoutConversion"
        label="N & P"
        hide-details="auto"
        class="mt-0 mb-2 mb-sm-0 ml-sm-4"
      />
    </div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="pl-0 text-center">
              Элемент
            </th>
            <th
              v-if="isHardness"
              class="text-center"
            >
              dGh
            </th>
            <th class="text-center">
              Общая доза, <span>мг/л</span>
            </th>
            <th class="text-center pr-0">
              В день, <span>мг/л</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="[name, value] in totalElementsSorted"
            :key="name"
            :class="{
              'caption': $vuetify.breakpoint['xs'],
              'regular': $vuetify.breakpoint['smAndUp']
            }"
          >
            <td class="pl-0 text-center">
              {{ name }}
              <template v-if="convertIonName(name) !== name && isWithoutConversion">
                / {{ convertIonName(name) }}
              </template>
            </td>
            <td
              v-if="isHardness"
              class="text-center"
            >
              <template v-if="name in HARDNESS && daysTotal">
                +{{ (value / HARDNESS[name]).toFixed(2) }}
              </template>
            </td>
            <td class="text-center">
              <template v-if="daysTotal">
                +{{ value !== undefined ? value.toFixed(3) : 0 }}
                <template v-if="convertIonName(name) !== name && isWithoutConversion">
                  / {{ (value * convertIonRatio(name)).toFixed(3) }}
                </template>
              </template>
            </td>
            <td class="text-center pr-0">
              <template v-if="daysTotal">
                +{{ value !== undefined ? (value / daysTotal).toFixed(3) : 0 }}
              </template>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div
      v-if="isHelpful && isHelpfulInfo"
      class="d-flex flex-column flex-sm-row justify-space-between caption mt-2"
    >
      <div
        v-if="totalElements['P'] > 0 && totalElements['N'] > 0"
        class="mr-2"
      >
        NO3 / PO4 =
        {{ (
          totalElements['N'] * convertIonRatio('N') / (totalElements['P'] * convertIonRatio('P'))
        ).toFixed(2) }}
        (N / P = {{ (totalElements['N'] / totalElements['P']).toFixed(2) }})
      </div>
      <div
        v-if="totalElements['P'] > 0 && totalElements['B'] > 0"
        class="mr-2"
      >
        P / B = {{ (totalElements['P'] / totalElements['B']).toFixed(2) }}
      </div>
      <div
        v-if="totalElements['Fe'] > 0 && totalElements['B'] > 0"
        class="mr-2"
      >
        Fe / B = {{ (totalElements['Fe'] / totalElements['B']).toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
import { convertIonName, convertIonRatio, isFertilizer } from '@/helpers/funcs';
import HARDNESS from '@/constants/hardness';

export default {
  name: 'ElementsTable',
  props: {
    recipesSelected: {
      type: Array,
      default: () => [],
    },
    daysTotal: {
      type: Number,
      default: 1,
    },
    volume: {
      type: Number,
      default: null,
    },
    isHelpfulInfo: {
      type: Boolean,
      default: false,
    },
    isSwitchers: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      HARDNESS,
      isWithoutConversion: false,
      isHardness: false,
    };
  },
  computed: {
    isHelpful() {
      return (
        (this.totalElements.P > 0 && this.totalElements.N > 0)
        || (this.totalElements.P > 0 && this.totalElements.B > 0)
        || (this.totalElements.Fe > 0 && this.totalElements.B > 0)
      );
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
              if (recipe.volume || this.isFertilizer(recipe)) {
                result[ion] += (recipe.amount * recipe.concentration[reagent][ion]) / this.volume;
              } else if ((!recipe.volume) && this.isRecipe(recipe)) {
                result[ion] += (recipe.amount * recipe.concentration[reagent][ion] * 1000) / this.volume;
              }
            }
          });
        });
      });
      return result;
    },
    totalElementsSorted() {
      const sortableResult = [];
      Object.keys(this.totalElements).forEach((ion) => {
        sortableResult.push([this.convertIonName(ion), this.convertIonRatio(ion) * this.totalElements[ion]]);
      });
      sortableResult.sort((a, b) => b[1] - a[1]);
      return sortableResult;
    },
  },
  methods: {
    convertIonName,
    convertIonRatio,
    isFertilizer,
  },
};
</script>

<style scoped>

</style>
