<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            Объем реминерализатора, мл
          </th>
          <th class="text-left">
            Gh/Kh
          </th>
          <th class="text-left">
            Объем подмены, л
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in HARDNESS_VOLUMES"
          :key="index"
        >
          <td>
            {{ countVolume(item.gh, item.volume) }} мл
          </td>
          <td>{{ item.gh.toFixed(1) }} / {{ countKhByGh(item.gh).toFixed(1) }}</td>
          <td>{{ item.volume }} л</td>
        </tr>
        <tr>
          <td>
            {{ countVolume(customGh, customVolume) }} мл
          </td>
          <td>
            <div class="d-flex align-center">
              <div style="width: 40px;">
                <number-field
                  v-model="customGh"
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
                  v-model="customKh"
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

const HARDNESS_VOLUMES = [
  { gh: 1, volume: 10 },
  { gh: 6, volume: 10 },
  { gh: 8, volume: 10 },
];

export default {
  name: 'TheRemineralsRecipesLiquidTable',
  props: {
    substance: {
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
      return Object.keys(this.substance.reagentsMassObject);
    },
    totalGh() {
      return countGh(this.substance.concentrationPerIon, this.substance.totalReagentsMass, this.volume);
    },
    totalKh() {
      return countKh(this.substance.concentrationPerIon, this.substance.totalReagentsMass, this.volume);
    },
  },
  methods: {
    countVolume(dstGh, volume) {
      const gh = countGh(this.substance.concentrationPerIon, this.substance.totalReagentsMass, volume);
      const factor = gh / dstGh;
      return (this.substance.volume / factor).toFixed(0);
    },
    countKhByGh(gh) {
      return ((this.totalKh / this.totalGh) * gh);
    },
    countGhByKh(kh) {
      return ((this.totalGh / this.totalKh) * kh);
    },
    onInputCustomGh(value) {
      this.customKh = this.countKhByGh(value);
    },
    onInputCustomKh(value) {
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
