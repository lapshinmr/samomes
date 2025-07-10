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
      <BackButton :path="appRoutes.fertilizers.path"/>
      <PageTitle>
        <template v-if="isCreate">
          {{ t('fertilizers.page.titleNew') }}
        </template>
        <template v-else>
          {{ fertilizerModel.name }}
        </template>
      </PageTitle>

      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <v-form ref="fertilizerFormRef">
          <div>
            {{ t('fertilizers.page.formDescription') }}
            <DividerWithNote class="mb-3 mt-10">
              {{ t('common.or') }}
            </DividerWithNote>
          </div>
          <Combobox
            v-model="fertilizerExampleChosen"
            :items="fertilizersSorted"
            variant="underlined"
            :label="t('fertilizers.page.fertilizers')"
            :hint="t('fertilizers.page.fertilizersHint')"
            persistent-hint
            item-title="name"
            hide-details="auto"
          />
          <v-alert
            v-if="fertilizerModel.updatedAt"
            type="success"
            class="mt-2"
          >
            {{ t('fertilizers.page.alertInfo') }} {{ fertilizerModel.updatedAt }}
          </v-alert>
          <DividerWithNote class="mt-10 mb-3">
            {{ t('fertilizers.card.composition') }}
          </DividerWithNote>
          <v-radio-group
            v-model="fertilizerModel.isLiquid"
            inline
            color="primary"
            class="mt-3 ml-n2"
            hide-details="auto"
          >
            <v-radio
              :label="t('common.liquid')"
              :value="true"
            />
            <v-radio
              :label="t('common.dry')"
              :value="false"
            />
          </v-radio-group>
          <v-expand-transition>
            <v-radio-group
              v-if="fertilizerModel.isLiquid"
              v-model="fertilizerModel.isPercent"
              inline
              color="primary"
              class="mt-3 ml-n2"
              hide-details="auto"
            >
              <v-radio
                :label="t('units.g/l')"
                :value="false"
              />
              <v-radio
                label="%"
                :value="true"
              />
            </v-radio-group>
          </v-expand-transition>
          <v-alert
            v-if="isUnitsChangedAlert"
            type="error"
            class="mt-4"
          >
            {{ t('fertilizers.page.alertWarning') }}
          </v-alert>
          <Combobox
            :model-value="ionsChosen"
            :items="allIons"
            item-title="ion"
            variant="underlined"
            :label="t('fertilizers.page.ionsInput')"
            :hint="t('fertilizers.page.ionsInputHint')"
            persistent-hint
            hide-details="auto"
            multiple
            chips
            closable-chips
            :rules="[required]"
            class="mb-4"
            @update:model-value="onInputIon"
          />
          <NumberField
            v-for="item in ionsChosen"
            :key="item.ion"
            v-model="item.conc"
            :label="item.ion"
            :suffix="fertilizerModel.isPercent ? '%' : t('units.g/l')"
            variant="underlined"
            persistent-placeholder
            placeholder="0"
            hide-details="auto"
            :rules="[required]"
            class="mb-2"
          />
          <DividerWithNote
            v-model="isRemineral"
            button
            class="mt-10 mb-3"
          >
            {{ t('fertilizers.page.remineral') }}
          </DividerWithNote>
          <v-expand-transition>

            <v-row
              v-if="isRemineral"
              class="d-flex flex-wrap mb-2"
            >
              <v-col cols="12">
                <div class="mb-4">
                  {{ t('fertilizers.page.remineralInstruction') }}
                </div>
                <div class="text-body-2 text-grey-darken-1">
                  {{ t('fertilizers.page.remineralExample1') }}<br>
                  {{ t('fertilizers.page.remineralExample2') }}
                </div>

              </v-col>
              <v-col cols="6">
                <number-field
                  v-model="fertilizerModel.hardness.gh"
                  :label="t('fertilizers.page.ghInput')"
                  suffix="Gh"
                  :hint="t('fertilizers.page.ghInputHint')"
                  hide-details="auto"
                />
                <number-field
                  v-model="fertilizerModel.hardness.amount"
                  :label="t('fertilizers.page.remineralAmountInput')"
                  :hint="t('fertilizers.page.remineralAmountInputHint')"
                  :suffix="fertilizerModel.isLiquid ? t('units.ml') : t('units.g')"
                  hide-details="auto"
                />
              </v-col>
              <v-col cols="6">
                <number-field
                  v-model="fertilizerModel.hardness.kh"
                  :label="t('fertilizers.page.khInput')"
                  suffix="Kh"
                  :hint="t('fertilizers.page.khInputHint')"
                  hide-details="auto"
                />
                <number-field
                  v-model="fertilizerModel.hardness.volume"
                  :label="t('fertilizers.page.remineralVolumeInput')"
                  :hint="t('fertilizers.page.remineralVolumeInputHint')"
                  :suffix="t('units.l')"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
          </v-expand-transition>
          <v-text-field
            v-model="fertilizerModel.name"
            variant="underlined"
            :label="t('fertilizers.page.name')"
            :hint="t('fertilizers.page.nameHint')"
            hide-details="auto"
            :rules="[required, isNameExist]"
            class="mb-2 mt-8"
          />
          <v-textarea
            v-model="fertilizerModel.description"
            variant="underlined"
            :label="t('fertilizers.page.description')"
            :hint="t('fertilizers.page.descriptionHint')"
            hide-details="auto"
            auto-grow
            rows="1"
          />
          <div class="d-flex mt-10">
            <v-btn
              v-if="isEdit"
              color="error"
              @click="onRemoveFertilizer"
            >
              {{ t('buttons.remove') }}
            </v-btn>
            <v-btn
              class="ml-auto"
              :to="appRoutes.fertilizers.path"
            >
              {{ t('buttons.cancel') }}
            </v-btn>
            <v-btn
              color="primary"
              class="ml-2"
              v-on="isCreate ? { click: onAddFertilizer } : { click: onEditFertilizer }"
            >
              {{ t('buttons.save') }}
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {FERTILIZERS} from "~/utils/constants/fertilizers";

const { t, locale } = useI18n();

const router = useRouter();
const route = useRoute();
const { appRoutes } = useAppRoutes();
const { required } = useValidation();
const fertilizersStore = useFertilizersStore();
const snackbarStore = useSnackbarStore();

const fertilizers = [...FERTILIZERS];
if (locale.value === 'en') {
  FERTILIZER_NAMES_EN.forEach((item) => {
    const fertilizer = fertilizers.find((fertilizer) => item.key === fertilizer.key);
    if (fertilizer) {
      fertilizer.name = item.name;
      fertilizer.description = item.description;
    }
  });
}

const fertilizersSorted = fertilizers.sort((a, b) => a.name.localeCompare(b.name));

// MODEL
const fertilizerFormRef = ref(null);
const ionsChosen = ref<{ ion: IonType, conc: number }[]>([]);
const fertilizerExampleChosen = ref(null);
const isRemineral = ref(false);

const fertilizerModel = reactive(new Fertilizer({
  name: '',
  description: '',
  ions: {},
  isLiquid: true,
  isPercent: true,
  updatedAt: '',
  hardness: {
    gh: null,
    kh: null,
    amount: null,
    volume: null,
  },
}));

const isN = computed(() => {
  return !!ionsChosen.value.find(({ ion }) => ['N', 'NO3'].includes(ion));
});

const isP = computed(() => {
  return !!ionsChosen.value.find(({ ion }) => ['P', 'PO4', 'P2O5'].includes(ion));
});

const isK = computed(() => {
  return !!ionsChosen.value.find(({ ion }) => ['K', 'K2O'].includes(ion));
});

const isCa = computed(() => {
  return !!ionsChosen.value.find(({ ion }) => ['Ca', 'CaO'].includes(ion));
});

const isMg = computed(() => {
  return !!ionsChosen.value.find(({ ion }) => ['Mg', 'MgO'].includes(ion));
});

const allIons = computed(() => {
  const result: { ion: IonType, conc: number }[] = [];
  for (const ion of ALL_IONS as IonType[]) {
    if (
      isN.value && ['N', 'NO3'].includes(ion)
      || isP.value && ['P', 'PO4', 'P2O5'].includes(ion)
      || isK.value && ['K', 'K2O'].includes(ion)
      || isCa.value && ['Ca', 'CaO'].includes(ion)
      || isMg.value && ['Mg', 'MgO'].includes(ion)
    ) {
      continue;
    }
    result.push({ ion: ion, conc: null });
  }
  return result;
});

function fillForm(fertilizer: FertilizerType) {
  fertilizerModel.name = fertilizer.name;
  fertilizerModel.description = fertilizer.description;
  fertilizerModel.isPercent = fertilizer.isPercent;
  fertilizerModel.isLiquid = fertilizer.isLiquid;
  fertilizerModel.updatedAt = fertilizer.updatedAt;
  fertilizerModel.hardness = { ...fertilizer.hardness };
  if (fertilizer.hardness) {
    isRemineral.value = true;
  }
  typedEntries(fertilizer.ions).forEach(([ion, conc]) => {
    ionsChosen.value.push({ ion, conc });
  });
}

function resetForm() {
  fertilizerModel.name = '';
  fertilizerModel.description = '';
  fertilizerModel.isPercent = false;
  fertilizerModel.updatedAt = undefined;
  ionsChosen.value = [];
  fertilizerModel.ions = {};
}

watch(fertilizerExampleChosen, (fertilizer: FertilizerType) => {
  if (fertilizer === null || typeof fertilizer === 'string') {
    resetForm();
    return;
  }
  resetForm();
  fillForm(fertilizer);
});

watch(ionsChosen, () => {
  ionsChosen.value.forEach(({ ion, conc }) => {
    fertilizerModel.ions[ion] = conc;
  });
}, { deep: true });

// PAGE MANIPULATION
const { checkName } = useNameExist();

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const fertilizerIndex = computed(() => +route.params.id);

const isUnitsChangedAlert = computed(() => {
  return fertilizerExampleChosen.value !== null
    && typeof fertilizerExampleChosen.value !== 'string'
    && fertilizerExampleChosen.value?.isPercent !== fertilizerModel.isPercent;
});

const isExist = computed(() => {
  return checkName(fertilizerModel.name) && !isEdit.value;
});

const isNameExist = () => !isExist.value || t('fertilizers.page.message.nameExists');

onMounted(async () => {
  if (isCreate.value) {
    return;
  }
  const fertilizer = { ...fertilizersStore.fertilizers[fertilizerIndex.value] };
  if (!fertilizer) {
    await router.push(appRoutes.value.fertilizers.path);
    return;
  }
  fillForm(fertilizer);
});

// TODO: come up with idea how to reuse this (create own combobox component with guard?)
function onInputIon(value: []) {
  if (value.length > ionsChosen.value.length) {
    const lastIon = [...value].pop();
    // Skip if search value is a string
    if (typeof lastIon === 'string') {
      return;
    }
  }
  ionsChosen.value = value;
}

async function onAddFertilizer() {
  const { valid } = await fertilizerFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  fertilizersStore.addFertilizer(fertilizerModel.toJson());
  snackbarStore.show(t('fertilizers.page.message.fertilizerAdded'));
  await router.push(appRoutes.value.fertilizers.path);
}

async function onEditFertilizer() {
  const { valid } = await fertilizerFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  fertilizersStore.editFertilizer({
    index: fertilizerIndex.value,
    fertilizer: fertilizerModel.toJson(),
  });
  snackbarStore.show(t('fertilizers.page.message.fertilizerEdited'));
  await router.push(appRoutes.value.fertilizers.path);
}

async function onRemoveFertilizer() {
  fertilizersStore.removeFertilizer(fertilizerIndex.value);
  snackbarStore.show(t('fertilizers.page.message.fertilizerRemoved'));
  await router.push(appRoutes.value.fertilizers.path);
}

useSeoMeta({
  title: t('meta.fertilizer.title'),
});
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
