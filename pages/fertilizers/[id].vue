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
      <LayoutBackButton :path="ROUTES.fertilizers.path"/>
      <LayoutPageTitle>
        <template v-if="isCreate">
          Новое удобрение
        </template>
        <template v-else>
          {{ fertilizerModel.name }}
        </template>
      </LayoutPageTitle>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="fertilizerForm">
          <div>
            Чтобы добавить своё фирменное удобрение, воспользуйтесь формой ниже. Выберите единицы
            измерения и введите концентрации элементов, указанные на этикетке.
            <BaseDividerWithNote class="my-3">
              или
            </BaseDividerWithNote>
          </div>
          <v-combobox
            v-model="fertilizerExampleChosen"
            :items="FERTILIZERS_SORTED"
            variant="underlined"
            label="Выберите удобрение из списка"
            hint="Здесь есть большинство фирменных удобрений"
            persistent-hint
            item-title="name"
            :return-object="true"
            hide-details="auto"
          />
          <v-alert
            v-if="fertilizerModel.updatedAt"
            type="success"
            class="mt-2"
          >
            Информация о составе удобрения обновлена {{ fertilizerModel.updatedAt }}
            в соответствии с данными производителя.
          </v-alert>
          <v-radio-group
            v-model="fertilizerModel.isPercent"
            :inline="$vuetify.display.smAndUp"
            class="mt-0"
            hide-details="auto"
          >
            <v-radio
              label="г/л"
              :value="false"
            />
            <v-radio
              label="%"
              :value="true"
            />
          </v-radio-group>
          <v-alert
            v-if="isUnitsChangedAlert"
            type="error"
            class="mt-4"
          >
            Внимание! Вы изменили единицы измерения. Концентрации теперь отличаются в 10
            раз от указанных на этикетке.
            Если вы не уверены в правильности изменений, вернитесь к исходному варианту.
          </v-alert>
          <BaseDividerWithNote class="mt-4">
            Состав
          </BaseDividerWithNote>
          <v-combobox
            :model-value="ionsChosen"
            :items="allIons"
            item-title="ion"
            variant="underlined"
            label="Выберите элементы из списка"
            hint="Здесь есть все необходимые элементы"
            persistent-hint
            hide-details="auto"
            multiple
            clearable
            :rules="[required]"
            @update:model-value="onInputIon"
          />
          <BaseNumberField
            v-for="item in ionsChosen"
            :key="item.ion"
            v-model="item.conc"
            :label="item.ion"
            :suffix="fertilizerModel.isPercent ? '%' : 'г/л'"
            variant="underlined"
            hide-details="auto"
            append-icon="mdi-delete"
            :rules="[required]"
            @click:append="onRemoveIon(item.ion)"
          />
          <v-text-field
            v-model="fertilizerModel.name"
            variant="underlined"
            label="Название удобрения"
            hide-details="auto"
            hint="* название удобрения должно быть уникальным"
            :rules="[required, isNameExist]"
            class="mb-2 mt-8"
          />
          <v-textarea
            v-model="fertilizerModel.description"
            variant="underlined"
            label="Описание"
            hide-details="auto"
            auto-grow
            rows="1"
            hint="Вы можете добавить дополнительные сведения к удобрению"
          />
          <div class="d-flex mt-2 mt-sm-4">
            <v-btn
              v-if="isEdit"
              color="error"
              @click="onRemoveFertilizer"
            >
              Удалить
            </v-btn>
            <v-btn
              class="ml-auto"
              @click="$router.push('/fertilizers/')"
            >
              Отмена
            </v-btn>
            <v-btn
              color="primary"
              class="ml-2"
              v-on="isCreate ? { click: onAddFertilizer } : { click: onEditFertilizer }"
            >
              Сохранить
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { required } from '~/utils/validation';

const router = useRouter();
const route = useRoute();
const fertilizersStore = useFertilizersStore();
const snackbarStore = useSnackbarStore();

// MODEL
const fertilizerForm = ref(null);
const ionsChosen = ref<{ ion: IonType, conc: number }[]>([]);
const fertilizerExampleChosen = ref(null);

const fertilizerModel = reactive(new Fertilizer({
  name: 'Удобрение',
  description: '',
  ions: {},
  isPercent: false,
  updatedAt: '',
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
  fertilizerModel.updatedAt = fertilizer.updatedAt;
  typedEntries(fertilizer.ions).forEach(([ion, conc]) => {
    ionsChosen.value.push({ ion, conc });
  });
}

function resetForm() {
  fertilizerModel.name = 'Удобрение';
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
});

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

const isNameExist = () => !isExist.value || 'Удобрение или рецепт с таким названием уже существует';

onMounted(async () => {
  if (isCreate.value) {
    return;
  }
  const fertilizer = { ...fertilizersStore.fertilizers[fertilizerIndex.value] };
  if (!fertilizer) {
    await router.push('/fertilizers/');
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

function onRemoveIon(ion: string) {
  const ionIndex = ionsChosen.value.findIndex((item) => item.ion === ion);
  ionsChosen.value.splice(ionIndex, 1);
}

async function onAddFertilizer() {
  const { valid } = await fertilizerForm.value.validate();
  if (valid) {
    fertilizersStore.addFertilizer(fertilizerModel.toJson());
    snackbarStore.show('Удобрение добавлено');
    await router.push('/fertilizers/');
  }
}

async function onEditFertilizer() {
  const { valid } = await fertilizerForm.value.validate();
  if (valid) {
    fertilizersStore.editFertilizer({
      index: fertilizerIndex.value,
      fertilizer: fertilizerModel.toJson(),
    });

    snackbarStore.show('Удобрение изменено');
    await router.push('/fertilizers/');
  }
}

async function onRemoveFertilizer() {
  fertilizersStore.removeFertilizer(fertilizerIndex.value);
  snackbarStore.show('Удобрение удалено');
  await router.push('/fertilizers/');
}

definePageMeta({
  title: 'Редактирование удобрения',
});
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
