<template>
  <div>
    <div
      class="d-flex mt-2 mb-2"
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
              class="text-center"
              :class="{'pr-0': index === totalIonConcentration.length - 1}"
              :key="ion"
            >
              <template v-if="isConvertion && ion !== convertIonName(ion)">
                {{ ion }} /
              </template>
              <template v-if="ion !== convertIonName(ion)">
                {{ convertIonName(ion) }}, г
              </template>
              <template v-else>
                {{ ion }}, г
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(mass, reagent) in fertilizerMass"
            :key="reagent"
          >
            <td class="pl-0 text-center">
              {{ reagent }}
            </td>
            <td
              v-for="(value, ion, index) in totalIonConcentration"
              class="text-center"
              :class="{'pr-0': index === totalIonConcentration.length - 1}"
              :key="reagent + ion"
            >
              <template v-if="Object.keys(countPercent(reagent)).includes(ion)">
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ (mass * countPercent(reagent)[ion]).toFixed(3) }} /
                </template>
                <template v-if="ion !== convertIonName(ion)">
                  {{ (convertIonRatio(ion) * mass * countPercent(reagent)[ion]).toFixed(3) }}
                </template>
                <template v-else>
                  {{ (mass * countPercent(reagent)[ion]).toFixed(3) }}
                </template>
                <template v-if="value && isConcentrationPercent">
                  ({{ (mass * countPercent(reagent)[ion] / (value * totalFertilizerMass) * 100).toFixed(1) }}%)
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
            <template v-for="(value, ion, index) in totalIonConcentration">
              <td
                v-if="ion !== convertIonName(ion)"
                class="text-center"
                :class="{'pr-0': index === totalIonConcentration.length - 1}"
                :key="ion"
              >
                <template v-if="isConvertion && ion !== convertIonName(ion)">
                  {{ (value * totalFertilizerMass).toFixed(3) }} /
                </template>
                {{ (convertIonRatio(ion) * value * totalFertilizerMass).toFixed(3) }}
              </td>
              <td
                v-else
                class="text-center"
                :class="{'pr-0': index === totalIonConcentration.length - 1}"
                :key="ion"
              >
                {{ (value * totalFertilizerMass).toFixed(3) }}
              </td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="subtitle-2 mt-2">
      Соотношение элементов
      <v-tooltip
        bottom
        max-width="400"
      >
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">
            mdi-help-circle-outline
          </v-icon>
        </template>
        Учитывает соотношение только между интересующими аквариумиста элементами.
        Такие элементы как сера, хлор, водород, кислород и т.д. в данном соотношении
        не участвуют.
      </v-tooltip>:
    </div>
    <div>
      <span
        v-for="(value, ion) in totalIonConcentration"
        class="mr-2"
        :key="ion"
      >
        {{ convertIonName(ion) }}
        ({{ value
          ? (convertIonRatio(ion) * value / totalUsefulConcentration).toFixed(5)
          : '???' }} %)
      </span>
    </div>
  </div>
</template>

<script>
import { convertIonName, convertIonRatio, countPercent } from '@/helpers/funcs';

export default {
  name: 'ElementsDryTable',
  props: {
    totalIonConcentration: {
      type: Object,
      default: () => {},
    },
    fertilizerMass: {
      type: Object,
      default: () => {},
    },
    totalFertilizerMass: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isConcentrationPercent: false,
      isConvertion: false,
    };
  },
  computed: {
    totalUsefulConcentration() {
      let sum = 0;
      Object.entries(this.totalIonConcentration).forEach(([ion, value]) => {
        sum += this.convertIonRatio(ion) * value;
      });
      return sum;
    },
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
