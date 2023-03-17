<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th
            v-for="reagentName in reagentsNames"
            :key="reagentName"
            class="text-left"
          >
            {{ reagentName }}
          </th>
          <th class="text-left">
            Gh/Kh
          </th>
          <th class="text-left">
            Объем
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in HARDNESS_VOLUMES"
          :key="index"
        >
          <td
            v-for="reagentName in reagentsNames"
            :key="reagentName"
          >
            {{ countReagentsMassByGh(item.gh, item.volume)[reagentName].toFixed(2) }} г
          </td>
          <td>{{ item.gh.toFixed(1) }} / {{ countKhByGh(item.gh).toFixed(1) }}</td>
          <td>{{ item.volume }} л</td>
        </tr>
        <tr>
          <td
            v-for="reagentName in reagentsNames"
            :key="reagentName"
          >
            {{ countReagentsMassByGh(customGh, customVolume)[reagentName].toFixed(2) }} г
          </td>
          <td>
            <div class="d-flex align-center">
              <div style="width: 40px;">
                <number-field
                  :value="customGh"
                  @input="onInputCustomGh"
                  placeholder="Gh"
                  :precision-show="1"
                  class="mt-0 pt-0"
                  hide-details="auto"
                />
              </div>
              <div class="mx-2">
                /
              </div>
              <div style="width: 40px;">
                <number-field
                  :value="customKh"
                  @input="onInputCustomKh"
                  placeholder="Kh"
                  :precision-show="1"
                  class="mt-0 pt-0"
                  hide-details="auto"
                />
              </div>
            </div>
          </td>
          <td>
            <div
              class="d-flex align-center"
              style="width: 60px"
            >
              <v-text-field
                :value="customVolume"
                @input="onInputCustomVolume"
                suffix="л"
                class="mt-0 pt-0"
                hide-details="auto"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { countGh, countKh } from '~/helpers/funcs/hardness';
import { countDryIonConcentrationPerIon, countTotalReagentsMass } from '~/helpers/funcs/concentrations';

const HARDNESS_VOLUMES = [
  { gh: 1, volume: 10 },
  { gh: 6, volume: 10 },
  { gh: 8, volume: 10 },
];

export default {
  name: 'TheRemineralsRecipesTable',
  props: {
    reagentsMassObject: {
      type: Object,
      default() {
        return {};
      },
    },
    volume: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      HARDNESS_VOLUMES,
      customGh: null,
      customKh: null,
      customVolume: null,
    };
  },
  computed: {
    reagentsNames() {
      return Object.keys(this.reagentsMassObject);
    },
    concentrationPerIon() {
      return countDryIonConcentrationPerIon(this.reagentsMassObject);
    },
    totalGh() {
      return countGh(this.concentrationPerIon, this.totalMass, this.volume);
    },
    totalKh() {
      return countKh(this.concentrationPerIon, this.totalMass, this.volume);
    },
    totalMass() {
      return countTotalReagentsMass(this.reagentsMassObject);
    },
  },
  methods: {
    countReagentsMassByGh(dstGh, volume) {
      const gh = countGh(this.concentrationPerIon, this.totalMass, volume);
      const factor = gh / dstGh;
      const reagentsMassObjectPrepared = {};
      Object.entries(this.reagentsMassObject).forEach(([key, value]) => {
        reagentsMassObjectPrepared[key] = value / factor;
      });
      return reagentsMassObjectPrepared;
    },
    countKhByGh(gh) {
      return (this.totalKh / this.totalGh) * gh;
    },
    countGhByKh(kh) {
      return (this.totalKh / this.totalGh) * kh;
    },
    onInputCustomGh(value) {
      this.customGh = value;
      this.customKh = this.countKhByGh(value);
    },
    onInputCustomKh(value) {
      this.customKh = value;
      this.customGh = this.countGhByKh(value);
    },
    onInputCustomVolume(value) {
      this.customVolume = value;
    },
  },
};
</script>

<style scoped>

</style>
