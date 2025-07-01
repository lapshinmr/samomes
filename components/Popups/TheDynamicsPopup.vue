<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License. To view a copy of this license, visit
  http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
  Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

  You are free to:
  - Share — copy and redistribute the material in any medium or format
  - Adapt — remix, transform, and build upon the material

  Under the following terms:
  - Attribution — You must give appropriate credit
  - NonCommercial — You may not use the material for commercial purposes
  - ShareAlike — If you remix, transform, or build upon the material,
    you must distribute your contributions under the same license as the original

  No warranties are given. The license may not give you all of the permissions
  necessary for your intended use.
-->

<template>
  <v-dialog
    v-model="model"
    max-width="700"
  >
    <v-card>
      <v-card-title>
        Параметры в аквариуме
      </v-card-title>
      <v-card-text>
        <NumberField
          v-model="waterChangeVolume"
          :label="t('dosing.dosesTable.waterChange')"
          :hint="t('dosing.dosesTable.waterChangeHint')"
          persistent-hint
          class="pr-2 w-60 mb-4"
          validate-on="eager"
          :rules="[positive]"
        />
        <v-expand-transition>
          <div v-if="waterChangeVolume">
            <div class="mb-4 text-body-2">
              При заданном режиме подмен ({{ format(dosing.waterChangePercent, 3) }}%
              объёма каждые {{ dosing.daysTotal }} д) и выбранных дозировках удобрений равновесные
              параметры будут достигнуты через {{ countBalancedWaterChangeNumber() }} подмен
              ({{ dosing.daysTotal * (countBalancedWaterChangeNumber() - 1) }} д)
              и будут следующими
              <v-tooltip
                location="bottom"
                max-width="400"
                open-on-click
                open-on-hover
              >
                <template #activator="{ props }">
                  <Icon
                    name="mdi-help-circle-outline"
                    size="18"
                    class="mb-n1"
                    v-bind="props"
                  />
                </template>
                <p class="mb-2">
                  Данные концентрации в аквариуме рассчитаны с допущением, что в аквариуме нет поглотителей. И если
                  для таких элементов, как калий, кальций, магний, такой расчет является довольно точным, то для фосфата
                  и нитрата данные значения будут сильно завышенными. Тем не менее даже для фосфата и нитрата
                  таким образом мы можем получить верхний диапазон значений, чтобы исключить передозировку
                  этих элементов в том случае, если растения по каким-то причинам перестали расти.
                </p>
                <p>
                  Если вы хотите понять, как будут изменяться концентрации с учетом потребления элементов, то
                  можете воспользоваться расположенной ниже секцией «Динамика».
                </p>
              </v-tooltip>:
            </div>
            <v-table
              v-if="Object.keys(balancedIons).length > 0"
              density="compact"
            >
              <thead>
                <tr>
                  <th class="text-center">Элемент</th>
                  <th class="text-center">Диапазон, мг/л
                    <v-tooltip
                      location="bottom"
                      max-width="400"
                      open-on-click
                      open-on-hover
                    >
                      <template #activator="{ props }">
                        <Icon
                          name="mdi-help-circle-outline"
                          size="18"
                          class="mb-n1"
                          v-bind="props"
                        />
                      </template>
                      Левое значение в диапазоне концентрации элемента — это концентрация сразу после подмены воды
                      и добавления удобрения.
                      Правое значение — это концентрация непосредственно перед подменой. Диапазон показывает,
                      как изменяется концентрация элемента в период между подменами.
                    </v-tooltip>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, ionName) in balancedIons"
                  :key="ionName"
                >
                  <td class="text-center">{{ ionName }}</td>
                  <td class="text-center">{{ format(data[0]) }} — {{ format(data[1]) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <template v-if="caMgRatio1 && caMgRatio2">
                  <tr>
                    <td class="text-center">Ca/Mg</td>
                    <td class="text-center">{{ format(caMgRatio1) }} — {{ format(caMgRatio2) }}</td>
                  </tr>
                  <tr>
                    <td class="text-center">dGh</td>
                    <td class="text-center">{{ format(gh1) }} — {{ format(gh2) }}</td>
                  </tr>
                </template>
                <tr>
                  <td class="text-center">TDS</td>
                  <td class="text-center">
                    {{ format(balancedIonsTotal[0]) }} — {{ format(balancedIonsTotal[1]) }}
                  </td>
                </tr>
              </tfoot>
            </v-table>
            <DividerWithNote
              v-model="isChart"
              button
              class="my-10"
            >
              Динамика
            </DividerWithNote>
            <v-expand-transition>
              <div v-if="isChart">
                <v-select
                  v-model="currentIon"
                  :items="dosing.ionList"
                  variant="outlined"
                  label="Выберите элемент"
                />
                <div
                  :style="mdAndUp ? 'height: 400px;' : 'height: 250px;'"
                  class="mb-4"
                >
                  <LineChart
                    :data="chartData"
                    :options="chartOptions"
                    class="line-chart"
                  />
                </div>
                <NumberField
                  v-model="ionWaterConcentration"
                  label="Концентрация в подменной воде"
                  suffix="мг/л"
                  hide-details="auto"
                />
                <NumberField
                  v-model="ionInit"
                  label="В аквариуме сейчас"
                  suffix="мг/л"
                  hide-details="auto"
                />
                <NumberField
                  v-model="ionConsumption"
                  label="Потребление в день"
                  suffix="мг/л"
                  hide-details="auto"
                />
              </div>
            </v-expand-transition>
          </div>
        </v-expand-transition>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="model = false"
        >
          {{ t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { mdAndUp } = useDisplay();
const { positive } = useValidation();

const dosingStore = useDosingStore();

const model = defineModel<boolean>();
const props = defineProps<{
  dosing: InstanceType<typeof Dosing>;
}>();

// const balancedIons = ref({});
const isChart = ref<boolean>(false);
const currentIon = ref<IonType>();
const ionInit = ref<number>();
const ionWaterConcentration = ref<number>();
const ionConsumption = ref<number>();
const dataset = ref([]);

const ionsColors = {
  NO3: '#D81B60',
  PO4: '#1E88E5',
  K: '#78909C',
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
};

const chartData = computed(() => ({
  labels: Object.keys([...Array(props.dosing.daysTotal * 15)]), // 15 - total cycles
  datasets: [{
    label: currentIon.value,
    fill: false,
    borderColor: ionsColors[currentIon.value],
    data: dataset.value,
  }],
}));

const balancedIons = computed(() => props.dosing.countBalancedIons());
const balancedIonsTotal = computed(() => {
  let concTotal1 = 0;
  let concTotal2 = 0;
  typedValues(balancedIons.value).forEach(([conc1, conc2]) => {
    concTotal1 += conc1;
    concTotal2 += conc2;
  });
  return [concTotal1, concTotal2];
});

// TODO: refactor this place
const caMgRatio1 = computed(() => {
  if ('Ca' in balancedIons.value && 'Mg' in balancedIons.value) {
    return balancedIons.value['Ca'][0] / balancedIons.value['Mg'][0];
  }
  return null;
});
const caMgRatio2 = computed(() => {
  if ('Ca' in balancedIons.value && 'Mg' in balancedIons.value) {
    return balancedIons.value['Ca'][1] / balancedIons.value['Mg'][1];
  }
  return null;
});

// TODO: refactor this place
const gh1 = computed(() => RemineralRecipe.countCaGh(balancedIons.value['Ca'][0], 1 / MG_IN_G, 1)
  + RemineralRecipe.countMgGh(balancedIons.value['Mg'][0], 1 / MG_IN_G, 1));
const gh2 = computed(() => RemineralRecipe.countCaGh(balancedIons.value['Ca'][1], 1 / MG_IN_G, 1)
  + RemineralRecipe.countMgGh(balancedIons.value['Mg'][1], 1 / MG_IN_G, 1));

const waterChangeVolume = computed({
  get() { return dosingStore.tank.waterChangeVolume; },
  set(value) { dosingStore.setWaterChangeVolume(value); },
});

watch(currentIon, () => {
  ionInit.value = 0;
  ionWaterConcentration.value = 0;
  ionConsumption.value = 0;
});

watch([currentIon, ionInit, ionWaterConcentration, ionConsumption, () => props.dosing], () => {
  dataset.value = props.dosing.countIonDynamic(
    currentIon.value,
    ionInit.value,
    ionWaterConcentration.value,
    ionConsumption.value,
  );
});

// TODO: describe formula
function countBalancedWaterChangeNumber() {
  return Math.ceil(Math.log(0.05) / Math.log(1 - props.dosing.waterChangeDecimal));
}

defineOptions({
  name: 'TheDynamicsPopup',
});
</script>

<style scoped>

</style>
