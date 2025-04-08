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
        <template v-if="isShare">
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
              <RemineralsTheCationsAndAnions
                :remineral="remineralObject"
              />
              <BaseDividerWithNote class="mb-4">
                Таблица с навесками
              </BaseDividerWithNote>
              <RemineralsTheRemineralsRecipesTable
                :remineral="remineralObject"
                :reagents="reagentsChosen"
                :volume="volume"
              />
              <template v-if="!isLiquid">
                <BaseDividerWithNote class="mb-4">
                  Подготовка смеси
                </BaseDividerWithNote>
                <RemineralsTheRemineralsMixTable :remineral="remineralObject" />
              </template>
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
                  v-if="isEdit && !isShare"
                  @click="onRemoveRecipe"
                >
                  Удалить
                </v-btn>
                <v-btn
                  v-if="!isShare"
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
const remineralsStore = useRemineralsStore();

const remineralForm = ref(null);
const waterVolume = ref<number>(null);
const reagentsChosen = ref<InstanceType<typeof Reagent>[]>([]);
const remineralExampleChosen = ref(null);
const volume = ref(10);
const doseVolume = ref(10);
const name = ref('');
const description = ref('');

const reagents = [
  ...Object.entries({ ...FORMULAS }).map(([key, data]) => new Reagent({
    key,
    ...data,
    amount: 0,
    type: ReagentTypeName.FORMULA,
  })),
];

const isReagents = computed(() => reagentsChosen.value.length > 0);
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
    concentrationPerIon: remineralObject.value.concentrationPerReagent,
    concentration: remineralObject.value.concentration,
    totalElements: remineralObject.value.totalElements,
    cations: remineralObject.value.cations,
    anions: remineralObject.value.anions,
  };
});

function onInputReagentGh(reagent: InstanceType<typeof Reagent>, value: number) {
  reagent.amount = +format(reagent.amount * value / remineralObject.value.ghPerReagent[reagent.key]);
}

function onInputReagentKh(reagent: InstanceType<typeof Reagent>, value: number) {
  reagent.amount = +format(reagent.amount * value / remineralObject.value.khPerReagent[reagent.key]);
}

watch(reagentsChosen, () => {
  // Set recipe default name by first reagent name
  if (!name.value && reagentsChosen.value.length === 1) {
    const reagent = reagentsChosen.value[0];
    name.value = reagent.text;
  }
});

function fillForm(remineral: RemineralType) {
  name.value = remineral.name;
  description.value = remineral.description;
  volume.value = remineral.volume;
  waterVolume.value = remineral.waterVolume;
  doseVolume.value = remineral.doseVolume;
}

const onInputRemineralExample = (remineral: RemineralExampleType) => {
  reagentsChosen.value = [];
  reagents.forEach((reagent) => {
    if (reagent.key in remineral.reagents) {
      reagent.amount = remineral.reagents[reagent.key];
      reagentsChosen.value.push(reagent);
    }
  });

  fillForm(remineral);
};

// PAGE MANIPULATION
const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.params.query === 'share');
const remineralIndex = computed(() => +route.params.id);

const rulesName = [
  (v) => !!v || 'Введите название',
  () => !isExist.value || 'Рецепт с таким названием уже существует',
];

// TODO: move to useNameExist
const isExist = computed(() => {
  const names = remineralsStore.reminerals.map((item) => item.name);
  const index = names.findIndex((item) => item === name.value);
  const isExistValue = index !== -1;
  const isEdit = index === +remineralIndex.value;
  return isExistValue && !isEdit;
});

onMounted(async () => {
  if (isCreate.value && !isCopy.value) {
    return;
  }

  let remineral: RemineralType;
  if (isShare.value) {
    [remineral] = JSON.parse(decodeURIComponent(route.params.query as string));
  } else if (isEdit.value) {
    remineral = JSON.parse(JSON.stringify({ ...remineralsStore.reminerals[+remineralIndex.value] }));
  }

  if (Object.keys(remineral).length === 0) {
    await router.push(ROUTES.reminerals.path);
    return;
  }

  const remineralReagents = {};
  remineral.reagents.forEach((reagent: ReagentType) => {
    remineralReagents[reagent.key] = reagent;
  });
  reagents.forEach((reagent: ReagentType) => {
    if (reagent.key in remineralReagents) {
      reagent.amount = remineralReagents[reagent.key].amount;
      reagentsChosen.value.push(reagent);
    }
  });

  fillForm(remineral);
});

async function onAddRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    remineralsStore.addRemineral({ ...remineralObject.value.toJson() });
    snackbarStore.show('Реминерализатор добавлен');
    await router.push(ROUTES.reminerals.path);
  }
}

async function onEditRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    remineralsStore.editRemineral({
      index: +remineralIndex.value,
      remineral: { ...remineralObject.value.toJson() },
    });
    snackbarStore.show('Рецепт изменен');
    await router.push(ROUTES.reminerals.path);
  }
}

async function onRemoveRecipe() {
  remineralsStore.removeRemineral(+remineralIndex.value);
  snackbarStore.show('Рецепт удален');
  await router.push(ROUTES.reminerals.path);
}
</script>

<style lang="sass" scoped>
</style>
