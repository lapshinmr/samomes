<template>
  <div>
    <div class="d-flex align-center mb-2">
      <div class="mr-4">
        Хочу подготовить
      </div>
      <div style="width: 60px">
        <number-field
          v-model="requiredMixMass"
          :precision-show="1"
          suffix="г"
          hide-details="auto"
          class="mt-0 pt-0"
        />
      </div>
    </div>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="reagentName in reagentsNames"
              :key="reagentName"
            >
              {{ (reagentsMassObject[reagentName] / totalMass * requiredMixMass) | precision(2) }} г
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { countTotalReagentsMass } from '~/helpers/funcs/concentrations';

export default {
  name: 'TheRemineralsCompoundsTable',
  props: {
    reagentsMassObject: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      requiredMixMass: 100,
    };
  },
  computed: {
    reagentsNames() {
      return Object.keys(this.reagentsMassObject);
    },
    totalMass() {
      return countTotalReagentsMass(this.reagentsMassObject);
    },
  },
};
</script>

<style scoped>

</style>
