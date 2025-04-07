<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

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
      <LayoutBackButton :path="ROUTES.reminerals.path"/>
      <LayoutPageTitle>
        <template v-if="isShared">
          <p class="text-h4">
            С вами поделились рецептом!
          </p>
          <p class="text-h6 font-weight-regular">
            Посмотрите рецепт, дайте ему
            название и напишите примечание. После этого можете сохранить его.
          </p>
        </template>
        <template v-else-if="isCreate">
          Новый реминерализатор
        </template>
        <template v-else>
          Реминерализатор {{ name }}
        </template>
      </LayoutPageTitle>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="remineralForm">
          <v-combobox
            v-model="reagentsChosen"
            :items="reagents"
            item-title="text"
            variant="underlined"
            multiple
            clearable
            label="Реагенты"
            hint="Вы можете выбрать несколько реагентов"
            persistent-hint
            hide-details="auto"
            validate-on-blur
            :rules="[required]"
          />
          <v-combobox
            v-model="remineralExampleChosen"
            :items="REMINERALS"
            item-title="name"
            variant="underlined"
            label="Рецепт"
            hint="или выбрать один из рецептов"
            persistent-hint
            hide-details="auto"
            @update:model-value="onInputRemineralExample"
          />
          <v-expand-transition>
            <div v-if="isReagents">
              <BaseDividerWithNote>
                Реагенты
              </BaseDividerWithNote>
              <BaseNumberField
                v-model="waterVolume"
                label="Объем воды"
                suffix="мл"
                hint="Вы можете пропустить это поле, если хотите использовать сухую смесь"
                persistent-hint
                class="mb-2 mb-sm-4"
              />
              <div
                v-for="reagent in reagentsChosen"
                :key="reagent.key"
                class="d-flex mb-4"
              >
                <BaseNumberField
                  v-model="reagent.amount"
                  :label="reagent.text"
                  suffix="г"
                  hide-details="auto"
                />
                <div class="d-flex ml-4">
                  <div style="width: 40px;">
                    <BaseNumberField
                      :model-value="+format(remineralObject.ghPerReagent[reagent.key])"
                      label="Gh"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      @update:model-value="onInputReagentGh(reagent, $event)"
                    />
                  </div>
                  <div class="mx-2 align-self-end mb-1">
                    /
                  </div>
                  <div style="width: 40px;">
                    <BaseNumberField
                      :model-value="+format(remineralObject.khPerReagent[reagent.key])"
                      label="Kh"
                      :disabled="remineralObject.khPerReagent[reagent.key] === 0"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      @update:model-value="onInputReagentKh(reagent, $event)"
                    />
                  </div>
                </div>
              </div>
              <RemineralsTheHardnessTable
                v-model:volume="volume"
                v-model:dose-volume="doseVolume"
                :remineral="remineralObject"
                class="mt-4"
              />
              <v-col cols="12">
                <BaseDividerWithNote class="mb-4">
                  Таблица с навесками
                </BaseDividerWithNote>
                <RemineralsTheRemineralsRecipesTable
                  :remineral="remineralObject"
                  :reagents="reagentsChosen"
                  :volume="volume"
                />
              </v-col>
              <v-col
                v-if="!isLiquid"
                cols="12"
              >
                <BaseDividerWithNote class="mb-4">
                  Подготовка смеси
                </BaseDividerWithNote>
                <RemineralsTheRemineralsMixTable :remineral="remineralObject" />
              </v-col>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <v-row v-if="isReagents">
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Имя рецепта"
                  variant="underlined"
                  hide-details="auto"
                  hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                  :rules="rulesName"
                  class="mb-4"
                />
                <v-textarea
                  v-model="description"
                  label="Примечание"
                  variant="underlined"
                  hide-details="auto"
                  auto-grow
                  rows="1"
                  hint="Вы можете добавить дополнительные сведения к рецепту"
                />
              </v-col>
              <v-col
                class="text-right"
                cols="12"
              >
                <v-btn
                  v-if="!isCreate && !isShared"
                  @click="onRemoveRecipe"
                >
                  Удалить
                </v-btn>
                <v-btn
                  v-if="!isShared"
                  color="primary"
                  class="ml-2"
                  v-on="isCreate ? { click: onAddRemineral } : { click: onEditRemineral }"
                >
                  Сохранить
                </v-btn>
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const { reminerals, addRemineral, removeRemineral, editRemineral } = useRemineralsStore();

const remineralForm = ref(null);
const waterVolume = ref<number>(null);
const reagentsChosen = ref<Reagent[]>([]);
const remineralExampleChosen = ref(null);
const volume = ref(10);
const doseVolume = ref(10);
const name = ref('');
const description = ref('');

const isShared = ref(false);

const reagents = [
  ...Object.entries({ ...FORMULAS }).map(([key, data]) => new Reagent({
    key,
    ...data,
    amount: 0,
    type: ReagentTypeName.FORMULA,
  })),
];

const isLiquid = computed(() => waterVolume.value !== null && waterVolume.value > 0);

const remineralObject = computed(() => {
  return new Remineral(
    {
      name: name.value,
      description: description.value,
      waterVolume: waterVolume.value,
      reagents: reagentsChosen.value,
      volume: volume.value,
      doseVolume: doseVolume.value,
    },
  );
});

const remineralObjectDebug = computed(() => {
  return {
    ...remineralObject.value,
    concentration: remineralObject.value.concentration,
    totalConcentration: remineralObject.value.totalConcentration,
    ghPerReagent: remineralObject.value.ghPerReagent,
    khPerReagent: remineralObject.value.khPerReagent,
    gh: remineralObject.value.gh,
    kh: remineralObject.value.kh,
  };
});

function onInputReagentGh(reagent: Reagent, value: number) {
  reagent.amount = +format(reagent.amount * value / remineralObject.value.ghPerReagent[reagent.key]);
}

function onInputReagentKh(reagent: Reagent, value: number) {
  reagent.amount = +format(reagent.amount * value / remineralObject.value.khPerReagent[reagent.key]);
}

const rulesName = [
  (v) => !!v || 'Введите название',
  () => !isExist.value || 'Рецепт с таким названием уже существует',
];

const isCreate = computed(() => route.params.id === 'create');
const recipeIndex = computed(() => route.params.id as string);

const isExist = computed(() => {
  const names = reminerals.map((item) => item.name);
  const index = names.findIndex((item) => item === name.value);
  const isExistValue = index !== -1;
  const isEdit = index === +recipeIndex.value;
  return isExistValue && !isEdit;
});

// const recipe = computed(() => {
//   return {
//     name: name.value,
//     note: description.value,
//     volume: volume.value,
//     mass: { ...reagentsMassObject.value },
//     substanceVolume: substanceVolume.value,
//     doseVolume: doseVolume.value,
//     gh: gh.value,
//     kh: kh.value,
//   };
// });

// const remineralsExamples = computed(() => {
//   return sortArrayByObjectField(RECIPES, 'name');
// });

const isReagents = computed(() => reagentsChosen.value.length > 0);

// const substance = computed(() => {
//   subst.value.setReagentsMassObject(reagentsMassObject.value);
//   subst.value.setVolume(substanceVolume.value);
//   return subst.value;
// });

const onInputRemineralExample = (recipe: RecipeExampleType) => {
  reagentsChosen.value = [];
  reagents.forEach((reagent) => {
    if (recipe.reagents && reagent.key in recipe.reagents) {
      reagent.amount = recipe.reagents[reagent.key];
      reagentsChosen.value.push(reagent);
    }
  });

  name.value = recipe.name;
  description.value = recipe.description;
  volume.value = recipe.volume;
  // tankVolume.value = recipe.tankVolume;
};

// watch(recipeExampleChosen, (recipe) => {
//   if (!recipe) return;
//
//   reagents.value = [];
//   reagentsMassObject.value = {};
//   reagentsMassObject.value = { ...recipe.reagentsMassObject };
//   const reagentsArray = [];
//   Object.keys(recipe.reagentsMassObject).forEach((reagentName) => {
//     reagentsArray.push({
//       key: reagentName,
//       text: `${FORMULAS[reagentName].name} - ${reagentName}`,
//       ...FORMULAS[reagentName],
//     });
//   });
//   reagents.value = reagentsArray;
//   name.value = recipe.name;
//   description.value = recipe.note;
//   volume.value = recipe.volume;
// });
//
// watch(reagentsMassObject, () => {
//   totalMass.value = countTotalReagentsMass(reagentsMassObject.value);
// }, { deep: true });

// onMounted(async () => {
//   const { share } = route.query;
//   if (isCreate.value) {
//     return;
//   }
//
//   let recipeData;
//   if (share) {
//     isShared.value = true;
//     [recipeData] = JSON.parse(decodeURIComponent(share as string));
//   } else if (!isCreate.value) {
//     recipeData = JSON.parse(JSON.stringify({ ...reminerals.value[+recipeIndex.value] }));
//   }
//
//   if (Object.keys(recipeData).length === 0) {
//     await router.push('/reminerals/');
//     return;
//   }
//
//   const reagentsArray = [];
//   const reagentsNames = Object.keys(recipeData.mass);
//   formulas.value.forEach((formula) => {
//     if (reagentsNames.includes(formula.key)) {
//       reagentsArray.push(formula);
//     }
//   });
//
//   reagents.value = reagentsArray;
//   name.value = recipeData.name;
//   note.value = recipeData.note;
//   volume.value = recipeData.volume;
//   reagentsMassObject.value = recipeData.mass;
//   isLiquid.value = !!recipeData.substanceVolume;
//   substanceVolume.value = recipeData.substanceVolume;
//   doseVolume.value = recipeData.doseVolume;
// });

// function onReagentInput(newValue) {
//   if (newValue.length < reagents.value.length) {
//     const reagentsToRemove = reagents.value.filter((item) => !newValue.includes(item));
//     reagentsToRemove.forEach((item) => {
//       delete reagentsMassObject.value[item.key];
//     });
//   }
//
//   reagents.value = [...newValue];
//   const mass = { ...reagentsMassObject.value };
//   reagents.value.forEach((reagent) => {
//     if (!(reagent.key in mass)) {
//       mass[reagent.key] = 0;
//     }
//   });
//
//   reagentsMassObject.value = { ...mass };
// }

// PAGE MANIPULATION
async function onAddRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    addRemineral(recipe.value);
    snackbarStore.show('Рецепт добавлен');
    await router.push('/reminerals/');
  }
}

async function onEditRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    editRemineral({
      index: +recipeIndex.value,
      remineral: recipe.value,
    });
    snackbarStore.show('Рецепт изменен');
    await router.push('/reminerals/');
  }
}

async function onRemoveRecipe() {
  removeRemineral(+recipeIndex.value);
  snackbarStore.show('Рецепт удален');
  await router.push('/reminerals/');
}
</script>

<style lang="sass" scoped>
//.flip-list-move
//  transition: transform 0.5s
//.ghost
//  opacity: 0.5
//  background: #c8ebfb
</style>
