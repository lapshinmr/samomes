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
  <v-container class="mb-12">
    <v-row>
      <BackButton :path="appRoutes.reminerals.path">
        <v-btn
          v-if="!isCreate && !isShare"
          color="primary"
          class="ml-auto"
          size="small"
          @click="onCopyRemineral"
        >
          {{ t('buttons.copy') }}
        </v-btn>
      </BackButton>
      <PageTitle>
        <template v-if="isCreate && !isCopy">
          {{ t('reminerals.page.titleNew') }}
        </template>
        <template v-else-if="isCopy">
          <div class="text-h6 text-sm-h5">
            {{ t('reminerals.page.titleCopy') }} {{ remineralModel.name }}
          </div>
          <div class="text-subtitle-1">
            {{ t('reminerals.page.subtitleCopy') }}
          </div>
        </template>
        <template v-else-if="isShare">
          <p class="text-h6 text-sm-h5">
            {{ t('reminerals.page.titleShare') }}
          </p>
          <p class="text-subtitle-1">
            {{ t('reminerals.page.subtitleShare') }}
          </p>
        </template>
        <template v-else>
          {{ remineralModel.name }}
        </template>
      </PageTitle>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <v-form ref="remineralFormRef">
          <div class="text-body-2 text-grey-darken-1 mb-2">
            {{ t('reminerals.page.reagentsHint') }}
          </div>
          <Combobox
            :model-value="reagentsChosen"
            :items="reagents"
            item-title="text"
            :label="t('common.reagents')"
            :hint="t('common.comboboxTypingHint')"
            variant="underlined"
            multiple
            persistent-hint
            hide-details="auto"
            validate-on-blur
            chips
            closable-chips
            :rules="[required]"
            class="mb-2"
            @update:model-value="onInputReagent"
          />
          <Combobox
            v-model="remineralExampleChosen"
            :items="REMINERAL_RECIPES"
            item-title="name"
            variant="underlined"
            :label="t('common.recipes')"
            :hint="t('reminerals.page.recipesHint')"
            persistent-hint
            hide-details="auto"
            @update:model-value="onInputRemineralExample"
          />
          <v-expand-transition>
            <div v-if="isReagents">
              <DividerWithNote class="mt-10 mb-3">
                {{ t('common.reagents') }}
              </DividerWithNote>
              <div
                v-for="reagent in reagentsChosen"
                :key="reagent.key"
                class="d-flex align-start mb-4"
              >
                <NumberField
                  :model-value="reagent.amount"
                  :label="reagent.text"
                  :suffix="reagent.isLiquid ? t('units.ml') : t('units.g')"
                  hide-details="auto"
                  :disabled="reagentsLocked[reagent.key]"
                  :rules="[required, positive]"
                  :error="checkSolubilityError(reagent)"
                  :error-messages="getSolubilityErrorMessage(reagent)"
                  @update:model-value="onInputReagentAmount($event, reagent.key)"
                />
                <div class="d-flex ml-4">
                  <div style="width: 40px;">
                    <NumberField
                      :model-value="ghPerReagent[reagent.key]"
                      label="Gh"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      :disabled="ghPerReagent[reagent.key] === null || reagentsLocked[reagent.key]"
                      @update:model-value="onInputReagentGh($event, reagent)"
                    />
                  </div>
                  <div class="mx-2 align-self-end mb-1">
                    /
                  </div>
                  <div style="width: 40px;">
                    <NumberField
                      :model-value="khPerReagent[reagent.key]"
                      label="Kh"
                      class="mt-0 pt-0"
                      hide-details="auto"
                      :disabled="khPerReagent[reagent.key] === null || reagentsLocked[reagent.key]"
                      @update:model-value="onInputReagentKh($event, reagent)"
                    />
                  </div>
                  <Icon
                    :name="`mdi:${reagentsLocked[reagent.key] ? 'lock' : 'lock-open-variant'}`"
                    size="24"
                    class="mt-3 ml-2 align-self-center mr-2 cursor-pointer text-grey-darken-1"
                    @click="onLockReagent(reagent.key)"
                  />
                </div>
              </div>
              <TheHardnessTable
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
                  <DividerWithNote
                    v-model="isConcentration"
                    class="mt-6 mb-4"
                    button
                  >
                    {{ remineralModel.isLiquid
                      ? t('reminerals.page.soluteConcentration')
                      : t('reminerals.page.dryConcentration')
                    }}
                  </DividerWithNote>
                  <v-expand-transition>
                    <TheSoluteElementsTable
                      v-if="isConcentration"
                      :remineral="remineralModel"
                      class="mb-10"
                    />
                  </v-expand-transition>
                  <DividerWithNote class="mt-10 mb-3">
                    {{ t('reminerals.page.changeWaterConcentration') }}
                  </DividerWithNote>
                  <TheCationsAndAnions
                    :remineral="remineralModel"
                    class="mt-4"
                  />
                  <DividerWithNote
                    v-model="isTable"
                    class="mt-6 mb-4"
                    button
                  >
                    {{ t('reminerals.page.portionsTable') }}
                  </DividerWithNote>
                  <v-expand-transition>
                    <TheRemineralsRecipesTable
                      v-if="isTable"
                      :remineral="remineralModel"
                      :reagents="reagentsChosen"
                    />
                  </v-expand-transition>
                  <template v-if="!remineralModel.isLiquid && !isLiquidReagents">
                    <DividerWithNote
                      v-model="isMix"
                      class="mt-10 mb-3"
                      button
                    >
                      {{ t('reminerals.page.mix.title') }}
                    </DividerWithNote>
                    <v-expand-transition>
                      <TheRemineralsMixTable
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
            <v-row
              v-if="isReagentsAmount"
              class="mt-4"
            >
              <v-col cols="12">
                <v-text-field
                  v-model="remineralModel.name"
                  :label="t('reminerals.page.name')"
                  :hint="t('reminerals.page.nameHint')"
                  variant="underlined"
                  hide-details="auto"
                  :rules="[required, isNameExist]"
                  class="mb-4"
                />
                <v-textarea
                  v-model="remineralModel.description"
                  :label="t('reminerals.page.description')"
                  :hint="t('reminerals.page.descriptionHint')"
                  variant="underlined"
                  hide-details="auto"
                  auto-grow
                  rows="1"
                />
              </v-col>
              <v-col
                class="d-flex mt-10"
                cols="12"
              >
                <v-btn
                  v-if="isEdit && !isShare"
                  color="error"
                  @click="onRemoveRemineral"
                >
                  {{ t('buttons.remove') }}
                </v-btn>
                <v-btn
                  class="ml-auto"
                  @click="$router.push(appRoutes.reminerals.path)"
                >
                  {{ t('buttons.cancel') }}
                </v-btn>
                <v-btn
                  color="primary"
                  class="ml-2"
                  v-on="isCreate || isShare ? { click: onAddRemineral } : { click: onEditRemineral }"
                >
                  {{ t('buttons.save') }}
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
const { t } = useI18n();
const { appRoutes } = useAppRoutes();

const route = useRoute();
const router = useRouter();
const { required, positive } = useValidation();
const snackbarStore = useSnackbarStore();
const remineralsStore = useRemineralsStore();

const { getReagents } = useReagents();

// FORM FIELDS
const remineralFormRef = ref(null);
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
  reagents: [],
  changeVolume: 10, // l
  doseVolume: 10, // ml
}));

const INITIAL_REAGENT_AMOUNT = 1;
const reagents = getReagents(INITIAL_REAGENT_AMOUNT);

const isReagents = computed(() => reagentsChosen.value.length > 0);
const isLiquidReagents = computed(() => reagentsChosen.value.some((reagent) => reagent.isLiquid));
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

watch(reagentsChosen, () => {
  // Set recipe default name by first reagent name
  if (!remineralModel.name && reagentsChosen.value.length === 1) {
    const reagent = reagentsChosen.value[0];
    remineralModel.name = reagent.text;
  }
});

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

function onLockReagent(reagentKey: string) {
  reagentsLocked.value[reagentKey] = !reagentsLocked.value[reagentKey];
}

function onInputReagentAmount(value: number, reagentKey: ReagentKeyType) {
  // UPDATE MODEL
  remineralModel.setReagentAmount(value, reagentKey);
  // UPDATE FORM
  const reagentFound = reagentsChosen.value.find((reagent) => reagent.key === reagentKey);
  reagentFound.amount = value;
  ghPerReagent[reagentKey] = format(remineralModel.ghPerReagent[reagentKey]);
  khPerReagent[reagentKey] = format(remineralModel.khPerReagent[reagentKey]);
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputReagentGh(value: number, reagent: InstanceType<typeof Reagent>) {
  // UPDATE MODEL
  const newReagentAmount = remineralModel.countReagentAmountByGh(reagent, value);
  remineralModel.setReagentAmount(newReagentAmount, reagent.key);
  // UPDATE FORM
  ghPerReagent[reagent.key] = value;
  reagent.amount = format(newReagentAmount);
  khPerReagent[reagent.key] = format(remineralModel.khPerReagent[reagent.key]);
  updateGh();
  updateKh();
  updateCaMgRatio();
}

function onInputReagentKh(value: number, reagent: InstanceType<typeof Reagent>) {
  // UPDATE MODEL
  const newReagentAmount = remineralModel.countReagentAmountByKh(reagent, value);
  remineralModel.setReagentAmount(newReagentAmount, reagent.key);
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

function fillModel(remineral: RemineralRecipeType | RemineralRecipeExampleType) {
  remineralModel.name = remineral.name;
  remineralModel.description = remineral.description;
  remineralModel.changeVolume = remineral.changeVolume;
  remineralModel.doseVolume = remineral.doseVolume;
}

const onInputRemineralExample = (remineral: RemineralRecipeExampleType) => {
  if (typeof remineral === 'string' || remineral === null) {
    remineralExampleChosen.value = remineral;
    return;
  }
  reagentsChosen.value = [];
  remineralModel.reagents = [];
  remineral.reagents.forEach(({ key, amount }) => {
    const reagentFound = reagents.find((reagent) => reagent.key === key);
    if (reagentFound) {
      reagentFound.amount = amount;
      reagentsChosen.value.push(reagentFound);
      remineralModel.reagents.push(reagentFound);
    }
  });
  fillModel(remineral);

  updateGh();
  updateKh();
  updateCaMgRatio();
  updateGhPerReagent();
  updateKhPerReagent();
};

// PAGE MANIPULATION
const { checkName } = useNameExist();

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const isCopy = computed(() => route.query.copy !== undefined);
const isShare = computed(() => route.params.query === 'share');
const isConcentration = ref(false);
const isTable = ref(false);
const isMix = ref(false);
const remineralIndex = computed(() => +route.params.id);

const isExist = computed(() => {
  return checkName(remineralModel.name) && !isEdit.value;
});

const isNameExist = () => !isExist.value || t('reminerals.page.message.nameExists');

const checkSolubilityError = (reagent: ReagentType) => {
  return remineralModel.isLiquid && (reagent.amount / remineralModel.totalVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return remineralModel.isLiquid && (reagent.amount / remineralModel.totalVolume) * 1000 > reagent.solubility
    ? `${t('validation.solubilityLimit')} - ${reagent.solubility} ${t('units.g/l')} ${t('common.for')} 25°С!`
    : '';
};

onMounted(async () => {
  if (isCreate.value && !isCopy.value) {
    return;
  }

  let remineral: RemineralRecipeType;
  if (isShare.value) {
    [remineral] = JSON.parse(decodeURIComponent(route.params.query as string));
  } else if (isCopy.value) {
    const index = route.query.copy as string;
    remineral = JSON.parse(JSON.stringify({ ...remineralsStore.remineralRecipes[+index] }));
  } else if (isEdit.value) {
    remineral = JSON.parse(JSON.stringify({ ...remineralsStore.remineralRecipes[+remineralIndex.value] }));
  }

  if (Object.keys(remineral).length === 0) {
    await router.push(appRoutes.value.reminerals.path);
    return;
  }

  const remineralReagents = {};
  remineral.reagents.forEach((reagent: ReagentType) => {
    remineralReagents[reagent.key] = reagent;
  });
  reagents.forEach((reagent: InstanceType<typeof Reagent>) => {
    if (reagent.key in remineralReagents) {
      reagent.amount = remineralReagents[reagent.key].amount;
      remineralModel.reagents.push(reagent);
      // We need to format amount to show convenient value in the form
      reagentsChosen.value.push(new Reagent({
        ...reagent.toJson(),
        amount: format(reagent.amount),
      }));
    }
  });
  fillModel(remineral);

  updateGh();
  updateKh();
  updateCaMgRatio();
  updateGhPerReagent();
  updateKhPerReagent();
});

async function onAddRemineral() {
  const { valid } = await remineralFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  remineralsStore.addRemineral({ ...remineralModel.toJson() });
  snackbarStore.show(t('reminerals.page.message.add'));
  await router.push(appRoutes.value.reminerals.path);
}

async function onEditRemineral() {
  const { valid } = await remineralFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  remineralsStore.editRemineral({
    index: +remineralIndex.value,
    remineral: { ...remineralModel.toJson() },
  });
  snackbarStore.show(t('reminerals.page.message.edit'));
  await router.push(appRoutes.value.reminerals.path);
}

async function onRemoveRemineral() {
  remineralsStore.removeRemineral(+remineralIndex.value);
  snackbarStore.show(t('reminerals.page.message.remove'));
  await router.push(appRoutes.value.reminerals.path);
}

async function onCopyRemineral() {
  snackbarStore.show(t('reminerals.page.message.copy'));
  await router.push(`${appRoutes.value.reminerals.path}create/?copy=${remineralIndex.value}`);
}

useSeoMeta({
  title: t('meta.remineral.title'),
});
</script>

<style lang="sass" scoped>
</style>
