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
          {{ name }}
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
            v-if="updatedAt"
            type="success"
            class="mt-2"
          >
            Информация о составе удобрения обновлена {{ updatedAt }}
            в соответствии с данными производителя.
          </v-alert>
          <v-radio-group
            v-model="isPercent"
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
          <v-combobox
            v-model="ionsChosen"
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
          />
          <BaseNumberField
            v-for="item in ionsChosen"
            :key="item.ion"
            v-model="item.conc"
            :label="item.ion"
            :suffix="isPercent ? '%' : 'г/л'"
            variant="underlined"
            hide-details="auto"
            :rules="[required]"
          />
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
          <div class="d-flex justify-end">
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
const recipesStore = useRecipesStore();
const snackbarStore = useSnackbarStore();

// PAGE MATH LOGIC
const fertilizerForm = ref(null);
const ionsChosen = ref<{ ion: IonType, conc: number }[]>([]);

const fertilizerExampleChosen = ref(null);
const isPercent = ref(false);
const name = ref('Удобрение');
const description = ref('');
const updatedAt = ref(null);

// TODO: come up with idea how to prevent user to choose N and NO3 simulteniusly
const allIons: { ion: IonType, conc: number }[] = ALL_IONS.map((ion: IonType) => ({ ion: ion, conc: null }));

const ions = computed(() => {
  const result: Record<IonType, number> = {};
  ionsChosen.value.forEach(({ ion, conc }) => {
    result[ion] = conc;
  });
  return result;
});

const fertilizerObject = computed(() => {
  return new Fertilizer({
    name: name.value,
    description: description.value,
    ions: { ...ions.value },
    isPercent: isPercent.value,
    updatedAt: updatedAt.value,
  });
});

function resetForm() {
  ionsChosen.value = [];
  name.value = 'Удобрение';
  description.value = '';
  isPercent.value = false;
  updatedAt.value = undefined;
}

watch(fertilizerExampleChosen, (value: FertilizerType) => {
  if (value === null || typeof value === 'string') {
    resetForm();
    return;
  }

  resetForm();
  name.value = value.name;
  description.value = value.description || '';
  isPercent.value = value.isPercent;
  updatedAt.value = value.updatedAt;
  Object.entries(value.ions).forEach(([ion, conc]) => {
    ionsChosen.value.push({ ion, conc });
  });
});

// PAGE MANIPULATION
const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const fertilizerIndex = computed(() => +route.params.id);

const isUnitsChangedAlert = computed(() => {
  return fertilizerExampleChosen.value !== null
    && typeof fertilizerExampleChosen.value !== 'string'
    && fertilizerExampleChosen.value?.isPercent !== isPercent.value;
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
// Lifecycle hooks
onMounted(async () => {
  if (isCreate.value) {
    return;
  }
  const fertilizer = { ...fertilizersStore.fertilizers[fertilizerIndex.value] };
  if (!fertilizer) {
    await router.push('/fertilizers/');
    return;
  }

  name.value = fertilizer.name;
  description.value = fertilizer.description;
  isPercent.value = fertilizer.isPercent;
  updatedAt.value = fertilizer.updatedAt;
  Object.entries(fertilizer.ions).forEach(([ion, conc]) => {
    ionsChosen.value.push({ ion, conc });
  });
});

// Methods
async function onAddFertilizer() {
  const { valid } = await fertilizerForm.value.validate();
  if (valid) {
    fertilizersStore.addFertilizer(fertilizerObject.value.toJson());
    snackbarStore.show('Удобрение добавлено');
    await router.push('/fertilizers/');
  }
}

async function onEditFertilizer() {
  const { valid } = await fertilizerForm.value.validate();
  if (valid) {
    fertilizersStore.editFertilizer({
      index: fertilizerIndex.value,
      fertilizer: fertilizerObject.value.toJson(),
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
