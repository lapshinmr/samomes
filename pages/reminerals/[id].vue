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
          Реминерализатор {{ remineralObject.name }}
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
            @update:model-value="onInputReagent"
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
                v-model="remineralObject.waterVolume"
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
                  :model-value="reagent.amount"
                  :label="reagent.text"
                  suffix="г"
                  hide-details="auto"
                  @update:model-value="onInputReagentAmount(reagent.key, $event)"
                />
                <div class="d-flex ml-4">
                  <div style="width: 40px;">
                    <BaseNumberField
                      :model-value="ghPerReagent[reagent.key]"
                      label="Gh"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      :disabled="ghPerReagent[reagent.key] === null"
                      @update:model-value="onInputReagentGh(reagent, $event)"
                    />
                  </div>
                  <div class="mx-2 align-self-end mb-1">
                    /
                  </div>
                  <div style="width: 40px;">
                    <BaseNumberField
                      :model-value="khPerReagent[reagent.key]"
                      label="Kh"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      :disabled="khPerReagent[reagent.key] === null"
                      @update:model-value="onInputReagentKh(reagent, $event)"
                    />
                  </div>
                  <Icon
                    name="game-icons:trash-can"
                    size="24"
                    class="ml-4 align-self-center mr-2 cursor-pointer"
                    @click="onRemoveReagent(reagent.key)"
                  />
                </div>
              </div>
              <RemineralsTheHardnessTable
                v-model:volume="remineralObject.volume"
                v-model:dose-volume="remineralObject.doseVolume"
                v-model:gh="gh"
                v-model:kh="kh"
                v-model:ca-mg-ratio="caMgRatio"
                :remineral="remineralObject"
                class="mt-4"
                @update:gh="onInputGh"
                @update:kh="onInputKh"
                @update:ca-mg-ratio="onInputCaMgRatio"
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
              />
              <template v-if="!remineralObject.isLiquid">
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
                  v-model="remineralObject.name"
                  label="Имя рецепта"
                  variant="underlined"
                  hide-details="auto"
                  hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                  :rules="rulesName"
                  class="mb-4"
                />
                <v-textarea
                  v-model="remineralObject.description"
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

// FORM FIELDS
const remineralForm = ref(null);
const reagentsChosen = ref<InstanceType<typeof Reagent>[]>([]);
const ghPerReagent = reactive<Record<string, number>>({});
const khPerReagent = reactive<Record<string, number>>({});
const gh = ref<number>(null);
const kh = ref<number>(null);
const caMgRatio = ref<number>(null);

const remineralExampleChosen = ref(null);

// MODEL
const remineralObject = reactive(new Remineral({
  name: '',
  description: '',
  waterVolume: null,
  reagents: [],
  volume: 10,
  doseVolume: 10,
}));

const reagents = [
  ...Object.entries({ ...FORMULAS }).map(([key, data]) => new Reagent({
    key,
    ...data,
    amount: 0,
    type: ReagentTypeName.FORMULA,
  })),
];

const isReagents = computed(() => reagentsChosen.value.length > 0);

// TODO: refactor onInputs
function onInputReagent(value: InstanceType<typeof Reagent>[]) {
  // UPDATE MODEL
  if (value.length > reagentsChosen.value.length) {
    const lastReagent = [...value].pop();
    // Skip if search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
    ghPerReagent[lastReagent.key] = remineralObject.ghPerReagent[lastReagent.key];
    khPerReagent[lastReagent.key] = remineralObject.khPerReagent[lastReagent.key];
  }
  reagentsChosen.value = value;
  remineralObject.reagents = [...reagentsChosen.value].map((reagent) => new Reagent(reagent));
  // UPDATE FORM
  gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
}

function onRemoveReagent(reagentKey: string) {
  const reagentIndex = reagentsChosen.value.findIndex((reagent) => reagent.key === reagentKey);
  reagentsChosen.value.splice(reagentIndex, 1);
  remineralObject.reagents.splice(reagentIndex, 1);
  gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
}

function onInputReagentAmount(reagentKey: string, value: number) {
  // UPDATE MODEL
  remineralObject.setReagentAmount(reagentKey, value);
  // UPDATE FORM
  const reagentFound = reagentsChosen.value.find((reagent) => reagent.key === reagentKey);
  reagentFound.amount = value;
  ghPerReagent[reagentKey] = +format(remineralObject.ghPerReagent[reagentKey]);
  khPerReagent[reagentKey] = +format(remineralObject.khPerReagent[reagentKey]);
  gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
}

function onInputReagentGh(reagent: InstanceType<typeof Reagent>, value: number) {
  // UPDATE MODEL
  const newReagentAmount = remineralObject.countReagentAmountByGh(reagent, value);
  remineralObject.setReagentAmount(reagent.key, newReagentAmount);
  // UPDATE FORM
  ghPerReagent[reagent.key] = value;
  reagent.amount = +format(newReagentAmount);
  khPerReagent[reagent.key] = remineralObject.khPerReagent[reagent.key] !== null
    ? +format(remineralObject.khPerReagent[reagent.key]) : null;
  gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
}

// TODO: check double counting
function onInputReagentKh(reagent: InstanceType<typeof Reagent>, value: number) {
  // UPDATE MODEL
  const newReagentAmount = remineralObject.countReagentAmountByKh(reagent, value);
  remineralObject.setReagentAmount(reagent.key, newReagentAmount);
  // UPDATE FORM
  khPerReagent[reagent.key] = value;
  reagent.amount = +format(newReagentAmount);
  ghPerReagent[reagent.key] = remineralObject.ghPerReagent[reagent.key] !== null
    ? +format(remineralObject.ghPerReagent[reagent.key]) : null;
  gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
}

function onInputGh(value: number) {
  // UPDATE MODEL
  remineralObject.updateReagentAmountsByGhAndCaMgRatio(value, caMgRatio.value);
  // UPDATE FORM
  gh.value = value;
  Object.entries(remineralObject.ghPerReagent).forEach(([reagentKey, reagentGh]) => {
    ghPerReagent[reagentKey] = +format(reagentGh);
  });
  Object.entries(remineralObject.khPerReagent).forEach(([reagentKey, reagentKh]) => {
    khPerReagent[reagentKey] = +format(reagentKh);
  });
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
  remineralObject.reagents.forEach((reagent) => {
    const reagentFound = reagentsChosen.value.find((item) => item.key === reagent.key);
    reagentFound.amount = +format(reagent.amount);
  });
}

function onInputKh(value: number) {
  // UPDATE MODEL
  remineralObject.updateReagentAmountsByKhAndCaMgRatio(value);
  // UPDATE FORM
  kh.value = value;
  Object.entries(remineralObject.khPerReagent).forEach(([reagentKey, reagentKh]) => {
    khPerReagent[reagentKey] = +format(reagentKh);
  });
  Object.entries(remineralObject.ghPerReagent).forEach(([reagentKey, reagentGh]) => {
    ghPerReagent[reagentKey] = +format(reagentGh);
  });
  gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
  caMgRatio.value = +format(remineralObject.caMgRatio);
  remineralObject.reagents.forEach((reagent) => {
    const reagentFound = reagentsChosen.value.find((item) => item.key === reagent.key);
    reagentFound.amount = +format(reagent.amount);
  });
}

function onInputCaMgRatio(value: number) {
  // TODO: choose formula regarding to the gh/kh lock
  // UPDATE MODEL
  remineralObject.updateReagentAmountsByGhAndCaMgRatio(gh.value, value);
  // UPDATE FORM
  caMgRatio.value = value;
  Object.entries(remineralObject.ghPerReagent).forEach(([reagentKey, reagentGh]) => {
    ghPerReagent[reagentKey] = +format(reagentGh);
  });
  Object.entries(remineralObject.khPerReagent).forEach(([reagentKey, reagentKh]) => {
    khPerReagent[reagentKey] = +format(reagentKh);
  });
  kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
  remineralObject.reagents.forEach((reagent) => {
    const reagentFound = reagentsChosen.value.find((item) => item.key === reagent.key);
    reagentFound.amount = +format(reagent.amount);
  });
}

watch(reagentsChosen, () => {
  // Set recipe default name by first reagent name
  if (!remineralObject.name && reagentsChosen.value.length === 1) {
    const reagent = reagentsChosen.value[0];
    remineralObject.name = reagent.text;
  }
});

function fillForm(remineral: RemineralType) {
  remineralObject.name = remineral.name;
  remineralObject.description = remineral.description;
  remineralObject.volume = remineral.volume;
  remineralObject.waterVolume = remineral.waterVolume;
  remineralObject.doseVolume = remineral.doseVolume;
}

const onInputRemineralExample = (remineral: RemineralExampleType) => {
  reagentsChosen.value = [];
  remineralObject.reagents = [];
  reagents.forEach((reagent) => {
    if (reagent.key in remineral.reagents) {
      reagent.amount = remineral.reagents[reagent.key];
      reagentsChosen.value.push(reagent);
      remineralObject.reagents.push(new Reagent({ ...reagent }));
      gh.value = remineralObject.gh !== null ? +format(remineralObject.gh) : null;
      kh.value = remineralObject.kh !== null ? +format(remineralObject.kh) : null;
      caMgRatio.value = +format(remineralObject.caMgRatio);
      Object.entries(remineralObject.ghPerReagent).forEach(([reagentKey, reagentGh]) => {
        ghPerReagent[reagentKey] = +format(reagentGh);
      });
      Object.entries(remineralObject.khPerReagent).forEach(([reagentKey, reagentKh]) => {
        khPerReagent[reagentKey] = +format(reagentKh);
      });
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
  const index = names.findIndex((item) => item === remineralObject.name);
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
      reagentsChosen.value.push(new Reagent(reagent));
      remineralObject.reagents.push(new Reagent(reagent));
      Object.entries(remineralObject.ghPerReagent).forEach(([reagentKey, reagentGh]) => {
        ghPerReagent[reagentKey] = +format(reagentGh);
      });
      Object.entries(remineralObject.khPerReagent).forEach(([reagentKey, reagentKh]) => {
        khPerReagent[reagentKey] = +format(reagentKh);
      });
    }
  });

  gh.value = +format(remineralObject.gh);
  kh.value = +format(remineralObject.kh);
  caMgRatio.value = +format(remineralObject.caMgRatio);

  fillForm(remineral);
});

async function onAddRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    remineralsStore.addRemineral({ ...remineralObject.toJson() });
    snackbarStore.show('Реминерализатор добавлен');
    await router.push(ROUTES.reminerals.path);
  }
}

async function onEditRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    remineralsStore.editRemineral({
      index: +remineralIndex.value,
      remineral: { ...remineralObject.toJson() },
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
