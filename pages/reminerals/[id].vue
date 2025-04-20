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
          Реминерализатор {{ remineralModel.name }}
        </template>
      </LayoutPageTitle>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="remineralForm">
          <v-combobox
            :model-value="reagentsChosen"
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
            :items="REMINERAL_RECIPES"
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
                :model-value="remineralModel.waterVolume"
                label="Объем воды"
                suffix="мл"
                hint="Вы можете пропустить это поле, если хотите использовать сухую смесь"
                persistent-hint
                class="mb-2 mb-sm-4"
                @update:model-value="onInputWaterVolume"
              />
              <div
                v-for="reagent in reagentsChosen"
                :key="reagent.key"
                class="d-flex mb-4"
              >
                <BaseNumberField
                  :model-value="reagent.amount"
                  :label="reagent.text"
                  :suffix="reagent.isLiquid ? 'мл' : 'г'"
                  hide-details="auto"
                  :disabled="reagentsLocked[reagent.key]"
                  :rules="[required, positive]"
                  :error="checkSolubilityError(reagent)"
                  :error-messages="getSolubilityErrorMessage(reagent)"
                  @update:model-value="onInputReagentAmount(reagent.key, $event)"
                />
                <div class="d-flex ml-4">
                  <div style="width: 40px;">
                    <BaseNumberField
                      :model-value="ghPerReagent[reagent.key]"
                      label="Gh"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      :disabled="ghPerReagent[reagent.key] === null || reagentsLocked[reagent.key]"
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
                      :disabled="khPerReagent[reagent.key] === null || reagentsLocked[reagent.key]"
                      @update:model-value="onInputReagentKh(reagent, $event)"
                    />
                  </div>
                  <Icon
                    :name="`mdi:${reagentsLocked[reagent.key] ? 'lock' : 'lock-open-variant'}`"
                    size="24"
                    class="mt-3 ml-2 align-self-center mr-2 cursor-pointer text-grey-darken-1"
                    @click="onLockReagent(reagent.key)"
                  />
                  <Icon
                    name="mdi:delete"
                    size="24"
                    class="mt-3 ml-2 align-self-center mr-2 cursor-pointer text-grey-darken-1"
                    @click="onRemoveReagent(reagent.key)"
                  />
                </div>
              </div>
              <RemineralsTheHardnessTable
                :change-volume="remineralModel.changeVolume"
                :dose-volume="remineralModel.doseVolume"
                :gh="gh"
                :kh="kh"
                :ca-mg-ratio="caMgRatio"
                :remineral="remineralModel"
                :kh-disabled="isLocked"
                :ca-mg-ratio-disabled="isLocked"
                class="mt-4"
                @update:change-volume="onInputChangeVolume"
                @update:dose-volume="onInputDoseVolume"
                @update:gh="onInputGh"
                @update:kh="onInputKh"
                @update:ca-mg-ratio="onInputCaMgRatio"
              />
              <v-expand-transition>
                <div v-if="isReagentsAmount">
                  <RemineralsTheCationsAndAnions
                    :remineral="remineralModel"
                  />
                  <BaseDividerWithNote
                    v-model="isTable"
                    class="mb-4"
                    button
                  >
                    Таблица с навесками
                  </BaseDividerWithNote>
                  <v-expand-transition>
                    <RemineralsTheRemineralsRecipesTable
                      v-if="isTable"
                      :remineral="remineralModel"
                      :reagents="reagentsChosen"
                    />
                  </v-expand-transition>
                  <template v-if="!remineralModel.isLiquid">
                    <BaseDividerWithNote
                      v-model="isMix"
                      class="mb-4"
                      button
                    >
                      Подготовка смеси
                    </BaseDividerWithNote>
                    <v-expand-transition>
                      <RemineralsTheRemineralsMixTable
                        v-if="isMix"
                        :remineral="remineralModel"
                      />
                    </v-expand-transition>
                  </template>
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <v-row v-if="isReagentsAmount">
              <v-col cols="12">
                <v-text-field
                  v-model="remineralModel.name"
                  label="Имя рецепта"
                  variant="underlined"
                  hide-details="auto"
                  hint="Придумайте имя рецепта, чтобы не путать его с другими рецептами"
                  :rules="[required, isNameExist]"
                  class="mb-4"
                />
                <v-textarea
                  v-model="remineralModel.description"
                  label="Примечание"
                  variant="underlined"
                  hide-details="auto"
                  auto-grow
                  rows="1"
                  hint="Вы можете добавить дополнительные сведения к рецепту"
                />
              </v-col>
              <v-col
                class="d-flex mt-2 mt-sm-4"
                cols="12"
              >
                <v-btn
                  v-if="isEdit && !isShare"
                  color="error"
                  @click="onRemoveRemineral"
                >
                  Удалить
                </v-btn>
                <v-btn
                  class="ml-auto"
                  @click="$router.push('/reminerals/')"
                >
                  Отмена
                </v-btn>
                <v-btn
                  color="primary"
                  class="ml-2"
                  v-on="isCreate || isShare ? { click: onAddRemineral } : { click: onEditRemineral }"
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
import { required, positive } from '~/utils/validation';

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const remineralsStore = useRemineralsStore();

// FORM FIELDS
const remineralForm = ref(null);
const reagentsChosen = ref<InstanceType<typeof Reagent>[]>([]);
const ghPerReagent = reactive<Record<string, number>>({});
const khPerReagent = reactive<Record<string, number>>({});
const reagentsLocked = ref<Partial<Record<FormulaKeyType, boolean>>>({});
const gh = ref<number>(null);
const kh = ref<number>(null);
const caMgRatio = ref<number>(null);

const remineralExampleChosen = ref(null);

// MODEL
const remineralModel = reactive(new RemineralRecipe({
  name: '',
  description: '',
  waterVolume: null,
  reagents: [],
  changeVolume: 10, // l
  doseVolume: 10, // ml
}));

const reagents = [
  ...Object.entries({ ...FORMULAS, ...COMPOUNDS }).map(([key, data]) => new Reagent({
    key,
    ...data,
    amount: 1,
    type: key in FORMULAS ? ReagentTypeName.FORMULA : ReagentTypeName.COMPOUND,
  })),
];

const isReagents = computed(() => reagentsChosen.value.length > 0);
const isReagentsAmount = computed(() => remineralModel.totalMass > 0);
const isLocked = computed(() => Object.values(reagentsLocked.value).some((item) => item === true));

function updateGhPerReagent() {
  Object.entries(remineralModel.ghPerReagent).forEach(([reagentKey, reagentGh]) => {
    ghPerReagent[reagentKey] = format(reagentGh);
  });
}

function updateKhPerReagent() {
  Object.entries(remineralModel.khPerReagent).forEach(([reagentKey, reagentKh]) => {
    khPerReagent[reagentKey] = format(reagentKh);
  });
}

function updateGh() {
  gh.value = format(remineralModel.gh);
}

function updateKh() {
  kh.value = format(remineralModel.kh);
}

function updateCaMgRatio() {
  caMgRatio.value = format(remineralModel.caMgRatio);
}

function updateAmounts() {
  remineralModel.reagents.forEach((reagent) => {
    const reagentFound = reagentsChosen.value.find((item) => item.key === reagent.key);
    reagentFound.amount = format(reagent.amount);
  });
}

function onInputWaterVolume(value: number) {
  // UPDATE MODEL
  remineralModel.waterVolume = value;
  // UPDATE FORM
  updateGhPerReagent();
  updateKhPerReagent();
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputDoseVolume(value: number) {
  if (!value) {
    return;
  }
  // UPDATE MODEL
  remineralModel.doseVolume = value;
  // UPDATE FORM
  updateGhPerReagent();
  updateKhPerReagent();
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputChangeVolume(value: number) {
  if (!value) {
    return;
  }
  // UPDATE MODEL
  remineralModel.changeVolume = value;
  // UPDATE FORM
  updateGhPerReagent();
  updateKhPerReagent();
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputReagent(value: InstanceType<typeof Reagent>[]) {
  if (value.length > reagentsChosen.value.length) {
    const lastReagent = [...value].pop();
    // Skip if search value is a string
    if (typeof lastReagent === 'string') {
      return;
    }
  }
  reagentsChosen.value = value;
  // UPDATE MODEL
  remineralModel.reagents = [...reagentsChosen.value].map((reagent) => new Reagent(reagent));
  // UPDATE FORM
  updateGhPerReagent();
  updateKhPerReagent();
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onRemoveReagent(reagentKey: string) {
  const reagentIndex = reagentsChosen.value.findIndex((reagent) => reagent.key === reagentKey);
  reagentsChosen.value.splice(reagentIndex, 1);
  remineralModel.reagents.splice(reagentIndex, 1);
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onLockReagent(reagentKey: string) {
  reagentsLocked.value[reagentKey] = !reagentsLocked.value[reagentKey];
}

function onInputReagentAmount(reagentKey: string, value: number) {
  // UPDATE MODEL
  remineralModel.setReagentAmount(reagentKey, value);
  // UPDATE FORM
  const reagentFound = reagentsChosen.value.find((reagent) => reagent.key === reagentKey);
  reagentFound.amount = value;
  ghPerReagent[reagentKey] = format(remineralModel.ghPerReagent[reagentKey]);
  khPerReagent[reagentKey] = format(remineralModel.khPerReagent[reagentKey]);
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputReagentGh(reagent: InstanceType<typeof Reagent>, value: number) {
  // UPDATE MODEL
  const newReagentAmount = remineralModel.countReagentAmountByGh(reagent, value);
  remineralModel.setReagentAmount(reagent.key, newReagentAmount);
  // UPDATE FORM
  ghPerReagent[reagent.key] = value;
  reagent.amount = format(newReagentAmount);
  khPerReagent[reagent.key] = format(remineralModel.khPerReagent[reagent.key]);
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputReagentKh(reagent: InstanceType<typeof Reagent>, value: number) {
  // UPDATE MODEL
  const newReagentAmount = remineralModel.countReagentAmountByKh(reagent, value);
  remineralModel.setReagentAmount(reagent.key, newReagentAmount);
  // UPDATE FORM
  khPerReagent[reagent.key] = value;
  reagent.amount = format(newReagentAmount);
  ghPerReagent[reagent.key] = format(remineralModel.ghPerReagent[reagent.key]);
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputGh(value: number) {
  if (!value) {
    return;
  }
  // UPDATE MODEL
  remineralModel.updateReagentAmountsByGh(value, reagentsLocked.value);
  // UPDATE FORM
  gh.value = value;
  updateGhPerReagent();
  updateKhPerReagent();
  updateKh();
  updateCaMgRatio();
  updateAmounts();
}

function onInputKh(value: number) {
  if (!value) {
    return;
  }
  // UPDATE MODEL
  remineralModel.updateReagentAmountsByKh(value);
  // UPDATE FORM
  kh.value = value;
  updateGhPerReagent();
  updateKhPerReagent();
  updateGh();
  updateCaMgRatio();
  updateAmounts();
}

function onInputCaMgRatio(value: number) {
  if (!value) {
    return;
  }
  // UPDATE MODEL
  remineralModel.updateReagentAmountsByGhAndCaMgRatio(gh.value, value);
  // UPDATE FORM
  caMgRatio.value = value;
  updateGhPerReagent();
  updateKhPerReagent();
  updateKh();
  updateAmounts();
}

watch(reagentsChosen, () => {
  // Set recipe default name by first reagent name
  if (!remineralModel.name && reagentsChosen.value.length === 1) {
    const reagent = reagentsChosen.value[0];
    remineralModel.name = reagent.text;
  }
});

function fillForm(remineral: Partial<RemineralType | RemineralExampleType>) {
  remineralModel.name = remineral.name;
  remineralModel.description = remineral.description;
  remineralModel.changeVolume = remineral.changeVolume;
  remineralModel.waterVolume = remineral.waterVolume;
  remineralModel.doseVolume = remineral.doseVolume;
}

const onInputRemineralExample = (remineral: RemineralExampleType) => {
  reagentsChosen.value = [];
  remineralModel.reagents = [];
  remineral.reagents.forEach(({ key, amount }) => {
    const reagentFound = reagents.find((reagent) => reagent.key === key);
    if (reagentFound) {
      reagentFound.amount = amount;
      reagentsChosen.value.push(reagentFound);
      remineralModel.reagents.push(new Reagent({ ...reagentFound }));
    }
  });

  updateGh();
  updateKh();
  updateCaMgRatio();
  updateGhPerReagent();
  updateKhPerReagent();

  fillForm(remineral);
};

// PAGE MANIPULATION
const { checkName } = useNameExist();

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.params.query === 'share');
const isTable = ref(false);
const isMix = ref(false);
const remineralIndex = computed(() => +route.params.id);

const isExist = computed(() => {
  return checkName(remineralModel.name) && !isEdit.value;
});

const isNameExist = () => !isExist.value || 'Рецепт или удобрение с таким названием уже существует';

const checkSolubilityError = (reagent: ReagentType) => {
  return remineralModel.isLiquid && (reagent.amount / remineralModel.waterVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return remineralModel.isLiquid && (reagent.amount / remineralModel.waterVolume) * 1000 > reagent.solubility
    ? `Достигнута максимальная растворимость - ${reagent.solubility} г/л при 25°С!`
    : '';
};

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
  reagents.forEach((reagent: InstanceType<typeof Reagent>) => {
    if (reagent.key in remineralReagents) {
      reagent.amount = remineralReagents[reagent.key].amount;
      reagentsChosen.value.push(reagent);
      remineralModel.reagents.push(new Reagent({ ...reagent }));
    }
  });

  updateGh();
  updateKh();
  updateCaMgRatio();
  updateGhPerReagent();
  updateKhPerReagent();

  fillForm(remineral);
});

async function onAddRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    remineralsStore.addRemineral({ ...remineralModel.toJson() });
    snackbarStore.show('Реминерализатор добавлен');
    await router.push(ROUTES.reminerals.path);
  }
}

async function onEditRemineral() {
  const { valid } = await remineralForm.value.validate();
  if (valid) {
    remineralsStore.editRemineral({
      index: +remineralIndex.value,
      remineral: { ...remineralModel.toJson() },
    });
    snackbarStore.show('Рецепт изменен');
    await router.push(ROUTES.reminerals.path);
  }
}

async function onRemoveRemineral() {
  remineralsStore.removeRemineral(+remineralIndex.value);
  snackbarStore.show('Рецепт удален');
  await router.push(ROUTES.reminerals.path);
}
</script>

<style lang="sass" scoped>
</style>
