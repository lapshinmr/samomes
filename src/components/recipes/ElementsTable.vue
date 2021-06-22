<template>
  <div>
    <div
      class="d-flex mt-1"
      :class="{
        'flex-column': $vuetify.breakpoint['xs'],
        'flex-row': $vuetify.breakpoint['smAndUp']
      }"
    >
      <v-switch
        v-model="isConcentrationPercent"
        label="Показать соотношение"
        hide-details="auto"
        class="mr-4"
      />
      <v-switch
        v-model="isConvertion"
        label="Показать N и P"
        hide-details="auto"
        class="mr-4"
      />
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="pl-0 text-center">
              Реагент
            </th>
            <th
              v-for="(ion, index) in Object.keys(totalIonConcentration)"
              :key="ion"
              class="text-center"
              :class="{'pr-0': index === Object.keys(totalIonConcentration).length - 1}"
            >
              <template v-if="isConvertion && ion !== convertIonName(ion)">
                {{ ion }} /
              </template>
              <template v-if="ion !== convertIonName(ion)">
                {{ convertIonName(ion) }}, г/л
              </template>
              <template v-else>
                {{ ion }}, г/л
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="reagent in Object.keys(concentration)"
            :key="reagent"
          >
            <td class="pl-0 text-center">
              {{ reagent }}
            </td>
            <td
              v-for="(value, ion, index) in totalIonConcentration"
              :key="reagent + ion"
              class="text-center"
              :class="{'pr-0': index === Object.keys(concentration).length - 1}"
            >
              <template v-if="Object.keys(concentration[reagent]).includes(ion)">
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ concentration[reagent][ion].toFixed(3) }} /
                </template>
                <template v-if="ion !== convertIonName(ion)">
                  {{ (convertIonRatio(ion) * concentration[reagent][ion]).toFixed(3) }}
                </template>
                <template v-else>
                  {{ concentration[reagent][ion].toFixed(3) }}
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
            <td class="pl-0 text-center">
              Сумма
            </td>
            <template
              v-for="(value, ion, index) in totalIonConcentration"
            >
              <td
                v-if="ion !== convertIonName(ion)"
                :key="ion"
                class="text-center"
                :class="{'pr-0': index === Object.keys(totalIonConcentration).length - 1}"
              >
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ value.toFixed(3) }} /
                </template>
                {{ (convertIonRatio(ion) * value).toFixed(3) }}
              </td>
              <td
                v-else
                class="text-center"
                :class="{'pr-0': index === Object.keys(totalIonConcentration).length - 1}"
                :key="ion"
              >
                {{ value.toFixed(3) }}
              </td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { convertIonName, convertIonRatio, countPercent } from '@/helpers/funcs';

export default {
  name: 'ElementsTable',
  props: {
    totalIonConcentration: {
      type: Object,
      default: () => {},
    },
    fertilizerMass: {
      type: Object,
      default: () => {},
    },
    concentration: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isConcentrationPercent: false,
      isConvertion: false,
    };
  },
  methods: {
    convertIonRatio,
    convertIonName,
    countPercent,
  },
};
</script>

<style scoped>

</style>
