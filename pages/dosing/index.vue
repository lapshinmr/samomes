<template>
  <v-container class="mb-12">
    <v-row>
      <LayoutPageTitle>
        Подбор дозировок
      </LayoutPageTitle>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="scheduleForm">
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model.number="tank.volume"
                :items="tanks"
                item-title="name"
                variant="underlined"
                label="Выберите аквариум или введите объем"
                persistent-hint
                hide-selected
                hint="Объем необходим для расчета дозировок"
                :rules="rulesTank"
                @update:model-value="onChooseTank"
              />
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="tank.volume"
                cols="12"
              >
                <div class="d-flex flex-column flex-md-row align-md-center">
                  <v-combobox
                    v-model="portionsChosen"
                    :items="allFertilizers"
                    variant="underlined"
                    label="Выберите удобрения"
                    item-title="fertilizer.name"
                    persistent-hint
                    multiple
                    :return-object="true"
                    hint="* здесь собраны все ваши рецепты и удобрения. Нажмите
                      «Фирменные» для просмотра полного списка."
                  />
                  <v-switch
                    v-model="isDefaultFertilizers"
                    color="primary"
                    label="Фирменные"
                    class="ml-md-4 flex-shrink-0"
                  />
                </div>
              </v-col>
            </v-expand-transition>
            <v-col
              v-if="portionsChosen.length > 0"
              cols="12"
            >
              <div class="subtitle-1 text-sm-h6 my-4">
                Подбор дозировок
                <v-tooltip
                  bottom
                  max-width="400"
                >
                  <template #activator="{ props }">
                    <v-icon v-bind="props">
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  Подбирая объем выбранных рецептов, вы можете получить необходимую концентрацию элементов
                  в аквариуме. Таким образом вы можете подобрать ориентировочное значение, которое "съедают"
                  растения за заданный период времени.
                </v-tooltip>
              </div>
              <!--              <DosingTheFertilizersPortionTable-->
              <!--                v-model:portions="portionsChosen"-->
              <!--                v-model:water-change-volume="tank.waterChangeVolume"-->
              <!--              />-->
            </v-col>
            <v-expand-transition>
              <v-col
                v-if="portionsChosen.length > 0"
                cols="12"
                class="pt-0"
              >
                <!--                <DosingTheElementsTable-->
                <!--                  is-helpful-info-->
                <!--                  is-switchers-->
                <!--                  :dosing="dosingObject"-->
                <!--                />-->
              </v-col>
            </v-expand-transition>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// import FertilizerDoseTable, {
//   FERTILIZATION_EVERY_DAY,
//   FERTILIZATION_IN_TAP_WATER,
//   FERTILIZATION_MIX,
// } from '~/components/FertilizersDoseTable.vue';
// import ElementsTable from '~/components/ElementsTable.vue';
// import {
//   OXIDE_TO_ELEMENT,
//   getOxideToElementRatio,
// } from '~/utils/funcs';
// import { FERTILIZERS_SORTED } from '~/utils/constants/fertilizers';

defineOptions({
  name: 'DosingPage',
});

const { tanks } = useTanksStore();
const { recipeModels } = useRecipesStore();
const { fertilizerModels } = useFertilizersStore();
const { remineralModels } = useRemineralsStore();
const dosingStore = useDosingStore();
const snackbarStore = useSnackbarStore();

// TANK HANDLING
const tank = ref<{
  name: string,
  volume: number,
  waterChangeVolume: number,
}>({
  name: null,
  volume: null,
  waterChangeVolume: null,
});

const allFertilizers = computed(() => {
  return [...recipeModels, ...fertilizerModels, ...remineralModels];
  // if (isDefaultFertilizers.value) {
  //   const recipesNames = recipeInstances.map((item) => item.name);
  //   const fertilizersNames = fertilizers.map((item) => item.name);
  //   const defaultFertilizersFiltered = defaultFertilizers.value.filter(
  //     (item) => ![...recipesNames, ...fertilizersNames].includes(item.name),
  //   );
  //   result.push(...defaultFertilizersFiltered);
  // }
});

const onChooseTank = (value: number | TankType) => {
  if (typeof value === 'number') {
    tank.value.name = value.toString();
    tank.value.volume = value;
    return;
  }
  tank.value = {
    name: value.name,
    volume: value.volume,
    waterChangeVolume: value.waterChangeVolume,
  };
};

const portionsChosen = ref<InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>[]>([]);

const rulesTank = [
  (v) => !!v || 'Выберите аквариум',
];

const isDefaultFertilizers = computed({
  get() {
    return dosingStore.isDefaultFertilizers;
  },
  set(value) {
    dosingStore.setDefaultFertilizers(value);
    snackbarStore.show(
      value
        ? 'Фирменные удобрения добавлены в список'
        : 'Фирменные удобрения удалены из списка',
    );
  },
});

// const defaultFertilizers = computed(() => FERTILIZERS_SORTED.map(
// (fertilizer) => this.convertFertilizer(fertilizer)));

// const defaultFertilizers = computed(() => FERTILIZERS_SORTED.map((fertilizer) => fertilizer));

// const dosingObject = computed(() => new Dosing(
//   portionsChosen.value,
//   dosingStore.fertilizersRegime,
//   dosingStore.daysTotal,
//   tank.value,
// ));

// watch(recipesSelected, () => {
//   this.recipesSelected.forEach((recipe) => {
//     if (
//       !(recipe.name in this.selected)
//       && this.fertilizationType !== FERTILIZATION_IN_TAP_WATER
//     ) {
//       recipe.amount = '';
//       recipe.amountDay = '';
//       Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
//         !!recipe.amountDay, 0, this.daysTotal,
//       )]);
//       Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
//       Vue.set(this.completedWaterChange, recipe.name, 0);
//     } else if (
//       !(recipe.name in this.completedWaterChange)
//       && this.fertilizationType === FERTILIZATION_IN_TAP_WATER
//     ) {
//       recipe.amount = '';
//       recipe.amountDay = '';
//       Vue.set(this.completedWaterChange, recipe.name, 0);
//     }
//   });
// });

// const convertFertilizer = (fertilizer) => {
//   const result = {
//     name: fertilizer.name,
//     note: '',
//     elements: { ...fertilizer.elements },
//     isPercent: fertilizer.isPercent,
//   };
//   const concentration = {
//     [fertilizer.name]: {},
//   };
//   Object.entries(fertilizer.elements).forEach(([el, value]) => {
//     const convertRatio = fertilizer.isPercent ? 10 : 1;
//     if (value && ['NO3', 'PO4', 'MgO', 'CaO'].includes(el)) {
//       concentration[fertilizer.name][OXIDE_TO_ELEMENT[el]] = getOxideToElementRatio(el) * value * convertRatio;
//     } else if (value && el === 'P2O5') {
//       concentration[fertilizer.name].P = getOxideToElementRatio(el) * value * convertRatio;
//     } else if (value && el === 'K2O') {
//       concentration[fertilizer.name].K = getOxideToElementRatio(el) * value * convertRatio;
//     } else if (value) {
//       concentration[fertilizer.name][el] = value * convertRatio;
//     }
//   });
//   result.concentration = { ...concentration };
//   return result;
// };

// const onChangeFertilizationType = (value) => {
//   this.fertilizationType = value;
//   if (this.fertilizationType === FERTILIZATION_IN_TAP_WATER) {
//     this.recipesSelected.forEach((recipe) => {
//       Vue.set(this.completedWaterChange, recipe.name, 0);
//     });
//   } else if (this.fertilizationType === FERTILIZATION_EVERY_DAY) {
//     this.recipesSelected.forEach((recipe) => {
//       Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
//         !!recipe.amountDay, 0, this.daysTotal,
//       )]);
//       Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
//       Vue.delete(this.completedWaterChange, recipe.name);
//     });
//   } else if (this.fertilizationType === FERTILIZATION_MIX) {
//     this.recipesSelected.forEach((recipe) => {
//       Vue.set(this.selected, recipe.name, [...Array(this.daysTotal).fill(
//         !!recipe.amountDay, 0, this.daysTotal,
//       )]);
//       Vue.set(this.completed, recipe.name, [...Array(this.daysTotal).fill(0, 0, this.daysTotal)]);
//       Vue.set(this.completedWaterChange, recipe.name, 0);
//     });
//   }
// };
</script>

<style scoped lang="sass">

</style>
