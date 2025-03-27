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
      <LayoutBackButton :path="ROUTES.fertilizers.path">
      </LayoutBackButton>
      <LayoutPageTitle>
        <template v-if="isCreate">
          Новое удобрение
        </template>
        <template v-else>
          {{ name }}
        </template>
      </LayoutPageTitle>

      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-form ref="fertilizerForm">
          <v-row>
            <v-col cols="12">
              Чтобы добавить своё фирменное удобрение, воспользуйтесь формой ниже. Выберите единицы
              измерения и введите концентрации элементов, указанные на этикетке.
              <div class="d-flex align-center my-3">
                <v-divider />
                <div class="mx-4">
                  или
                </div>
                <v-divider />
              </div>
              <v-combobox
                v-model="fertilizerExampleChosen"
                :items="FERTILIZERS_SORTED"
                variant="underlined"
                label="Выберите удобрение из списка"
                hint="* здесь есть большинство фирменных удобрений"
                persistent-hint
                item-title="name"
                :return-object="true"
                hide-details="auto"
              />
              <v-alert
                v-if="updatedAt"
                type="success"
                class="mt-2"
              >
                Информация о составе удобрения обновлена {{ updatedAt }}
                в соответствии с данными производителя.
              </v-alert>
            </v-col>
            <v-col cols="12">
              <v-radio-group
                v-model="isPercent"
                row
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
            </v-col>
            <v-col cols="12">
              * элементы, которые есть в списке, но нет в составе удобрения, можно пропустить.
            </v-col>
            <v-col
              v-for="el in Object.keys(elements)"
              :key="el"
              :cols="elementCols[el]"
              class="py-1"
            >
              <BaseNumberField
                v-model="elements[el]"
                variant="underlined"
                :precision-show="5"
                :label="el"
                :suffix="isPercent ? '%' : 'г/л'"
                persistent-hint
                hide-details="auto"
                :disabled="isDisabledCol[el]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                variant="underlined"
                label="Название удобрения"
                hide-details="auto"
                hint="* название удобрения должно быть уникальным"
                :rules="[required, isNameExist]"
                class="mb-2 mt-8"
              />
              <v-textarea
                v-model="description"
                variant="underlined"
                label="Примечание"
                hide-details="auto"
                auto-grow
                rows="1"
                hint="Вы можете добавить дополнительные сведения к удобрению"
              />
            </v-col>
            <v-col
              class="d-flex justify-end"
              cols="12"
            >
              <v-btn
                v-if="isEdit"
                color="error"
                @click="removeFertilizer"
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
                v-on="isCreate ? { click: addFertilizer } : { click: editFertilizer }"
              >
                Сохранить
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// TODO: check useless imports
import { FERTILIZERS_SORTED } from '~/utils/constants/fertilizers';
// import { OXIDE_TO_ELEMENT } from '~/utils/constants/elements';
// import { getOxideToElementRatio } from '~/utils/funcs';
import { required } from '~/utils/validation';

const router = useRouter();
const route = useRoute();
const fertilizerForm = ref(null);
const fertilizersStore = useFertilizersStore();
const recipesStore = useRecipesStore();
const snackbarStore = useSnackbarStore();

// Form data
const fertilizerExampleChosen = ref(null);
const name = ref('Удобрение');
const description = ref('');
const updatedAt = ref<string | undefined>(undefined);
const isPercent = ref(false);

const elements = ref({
  N: null,
  NO3: null,
  P: null,
  PO4: null,
  P2O5: null,
  K: null,
  K2O: null,
  Ca: null,
  CaO: null,
  Mg: null,
  MgO: null,
  Fe: null,
  Mn: null,
  B: null,
  Zn: null,
  Cu: null,
  Mo: null,
  Ni: null,
  S: null,
  Cl: null,
  Na: null,
  Co: null,
  Rb: null,
  V: null,
});

// Computed properties
const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const fertilizerIndex = computed(() => +route.params.id);

const isUnitsChangedAlert = computed(() => {
  return fertilizerExampleChosen.value !== null
    && typeof fertilizerExampleChosen.value !== 'string'
    && fertilizerExampleChosen.value?.isPercent !== isPercent.value;
});

const elementCols = computed(() => {
  const result = {};
  Object.keys(elements.value).forEach((el) => {
    if (['N', 'NO3', 'K', 'K2O', 'Ca', 'CaO', 'Mg', 'MgO'].includes(el)) {
      result[el] = 6;
    } else if (['P', 'PO4', 'P2O5'].includes(el)) {
      result[el] = 4;
    } else {
      result[el] = 12;
    }
  });
  return result;
});

const fertilizer = computed(() => {
  return new Fertilizer({
    name: name.value,
    description: description.value,
    elements: { ...elements.value },
    isPercent: isPercent.value,
    updatedAt: updatedAt.value,
  });
});

const isDisabledCol = computed(() => {
  const result = {};
  const OPPOSITE_EXTENDED = {
    K: 'K2O',
    K2O: 'K',
    MgO: 'Mg',
    Mg: 'MgO',
    CaO: 'Ca',
    Ca: 'CaO',
    N: 'NO3',
    NO3: 'N',
    P: 'PO4',
    PO4: 'P',
    P2O5: 'P',
  };

  Object.entries(elements.value).forEach(([el, value]) => {
    if (value) {
      if (fertilizer.value.concentration[name.value]?.P) {
        result['P'] = !elements.value.P;
        result['PO4'] = !elements.value.PO4;
        result['P2O5'] = !elements.value.P2O5;
      } else if (OPPOSITE_EXTENDED[el]) {
        result[OPPOSITE_EXTENDED[el]] = true;
      }
    }
  });

  return result;
});

const isExist = computed(() => {
  const recipesNames = recipesStore.recipes.map((item) => item.name);
  const fertilizersNames = fertilizersStore.fertilizers.map((item) => item.name);
  const recipeFound = recipesNames.find((item) => item === name.value);
  const fertilizerFound = fertilizersNames.find((item) => item === name.value);
  const isExist = recipeFound || fertilizerFound;
  return isExist && !isEdit.value;
});

const isNameExist = () => !isExist.value || 'Удобрение или рецепт с таким названием уже существует';

// Watchers
watch(fertilizerExampleChosen, (value) => {
  if (value === null || typeof value === 'string') {
    resetForm();
    return;
  }

  resetForm();
  isPercent.value = value.isPercent;
  elements.value = Object.assign({}, elements.value, value.elements);
  name.value = value.name;
  description.value = value.note || '';
  updatedAt.value = value.updatedAt;
}, { deep: true });

// Lifecycle hooks
onMounted(async () => {
  if (!isCreate.value) {
    const fertilizer = fertilizersStore.fertilizers[fertilizerIndex.value];
    if (!fertilizer) {
      await router.push('/fertilizers/');
      return;
    }

    name.value = fertilizer.name || 'Удобрение';
    description.value = fertilizer.description || '';
    isPercent.value = fertilizer.isPercent || false;
    updatedAt.value = fertilizer.updatedAt;
    elements.value = Object.assign({}, elements.value, fertilizer.elements);
  }
});

// Methods
function resetForm() {
  Object.keys(elements.value).forEach((ion) => {
    elements.value[ion] = null;
  });
  name.value = 'Удобрение';
  description.value = '';
  updatedAt.value = undefined;
  isPercent.value = false;
}

function addFertilizer() {
  const { valid } = fertilizerForm.value.validate();
  if (valid) {
    fertilizersStore.addFertilizer(fertilizer.value.toJson());
    snackbarStore.show('Удобрение добавлено');
    router.push('/fertilizers/');
  }
}

function editFertilizer() {
  const { valid } = fertilizerForm.value.validate();
  if (valid) {
    fertilizersStore.editFertilizer({
      index: fertilizerIndex.value,
      fertilizer: fertilizer.value.toJson(),
    });

    snackbarStore.show('Удобрение изменено');
    router.push('/fertilizers/');
  }
}

function removeFertilizer() {
  fertilizersStore.removeFertilizer(fertilizerIndex.value);
  snackbarStore.show('Удобрение удалено');
  router.push('/fertilizers/');
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
