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
      <LayoutBackButton :path="ROUTES.tanks.path" />
      <LayoutPageTitle>
        <template v-if="isCreate">
          Новый аквариум
        </template>
        <template v-else>
          {{ tank.name }}
        </template>
      </LayoutPageTitle>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-form ref="tankForm">
          <v-text-field
            v-model="tank.name"
            variant="underlined"
            :label="t('tanks.dialog.name')"
            hide-details="auto"
            clearable
            :hint="t('tanks.dialog.nameHint')"
            :rules="[required, isNameExist]"
          />
          <BaseDividerWithNote
            v-model="isVolumeInfo"
            class="my-2 my-sm-4"
            button
          >
            Подробнее об объеме
          </BaseDividerWithNote>
          <v-expand-transition>
            <div
              v-if="isVolumeInfo"
              class="text-grey-darken-1 text-body-2 mt-8 mt-md-4 mb-0"
            >
              Это общий объем воды, который получилось залить
              в аквариум при запуске.
              Он состоит из объема водяного столба, воды в грунте и внешнем фильтре за вычетом
              всех декораций аквариума.
              <br>
              <br>
              Проще всего узнать точный объем воды, измерив его при запуске аквариума с помощью емкости
              или весов. Но если вы не знаете точное значение, то его можно
              рассчитать с помощью формы, представленной ниже.
              <br>
              <br>
              Не переживайте! Вам не обязательно знать точный объем. Погрешность в 10-20% не приведет к
              большим ошибкам в расчетах удобрений, водорослям или чему-то плохому, т.к. в конечном итоге
              мы не можем очень точно контролировать поглощение удобрений и опираемся на внешний вид растений.
            </div>
          </v-expand-transition>
          <BaseNumberField
            v-model="tank.volume"
            variant="underlined"
            :label="t('tanks.dialog.volume')"
            :suffix="t('units.l')"
            hide-details="auto"
            :hint="t('tanks.dialog.volumeHint')"
            :rules="[required]"
            class="mt-2 mt-sm-4"
          />
          <BaseDividerWithNote class="mb-3 mt-10">
            {{ t('tanks.dialog.orSizes') }}
          </BaseDividerWithNote>
          <BaseNumberField
            v-model="tank.length"
            variant="underlined"
            :label="t('tanks.dialog.length')"
            :suffix="t('units.cm')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.width"
            variant="underlined"
            :label="t('tanks.dialog.width')"
            :suffix="t('units.cm')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.height"
            variant="underlined"
            :label="t('tanks.dialog.height')"
            :suffix="t('units.cm')"
            :hint="t('tanks.dialog.heightHint')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.glassThickness"
            variant="underlined"
            :label="t('tanks.dialog.glassThickness')"
            :suffix="t('units.mm')"
            hide-details="auto"
          />
          <BaseDividerWithNote class="mb-3 mt-10">
            Дополнительные объемы
          </BaseDividerWithNote>
          <BaseNumberField
            v-model="tank.filterVolume"
            variant="underlined"
            :label="t('tanks.dialog.filter')"
            :suffix="t('units.l')"
            :hint="t('tanks.dialog.filterHint')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.soilVolume"
            variant="underlined"
            :label="t('tanks.dialog.soil')"
            :suffix="t('units.l')"
            :hint="t('tanks.dialog.soilHint')"
            hide-details="auto"
          />
          <div class="d-flex">
            <BaseNumberField
              :model-value="tank.waterChangePercent"
              variant="underlined"
              :label="t('tanks.dialog.waterChange')"
              suffix="%"
              hide-details="auto"
              @update:model-value="onInputWaterChangePercent"
            />
            <BaseNumberField
              :model-value="tank.waterChangeVolume"
              variant="underlined"
              :label="t('tanks.dialog.waterChangeVolume')"
              :suffix="t('units.l')"
              hide-details="auto"
              class="ml-2"
              @update:model-value="onInputWaterChangeVolume"
            />
          </div>
          <v-expand-transition>
            <div class="d-flex justify-end mt-3 mt-sm-6">
              <v-btn
                v-if="isEdit"
                @click="onRemoveTank"
              >
                {{ t('buttons.remove') }}
              </v-btn>
              <v-btn
                color="primary"
                class="ml-2"
                v-on="isCreate ? { click: onAddTank } : { click: onEditTank }"
              >
                {{ t('buttons.save') }}
              </v-btn>
            </div>
          </v-expand-transition>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { TankType } from '~/utils/types/types';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();
const tankForm = ref(null);

const isVolumeInfo = ref(false);
const tank = ref<TankType>({
  name: null,
  volume: null,
  length: null,
  width: null,
  height: null,
  glassThickness: null,
  waterChangePercent: null,
  waterChangeVolume: null,
  filterVolume: null,
  soilVolume: null,
});

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const tankIndex = computed(() => +route.params.id);

const tankObject = computed(() => new Tank(tank.value));

const isExist = computed(() => {
  const names = tanksStore.tanks.map((item) => item.name);
  const nameFound = names.find((item) => item === tank.value.name);
  return nameFound && !isEdit.value;
});

const isNameExist = () => !isExist.value || 'Аквариум с таким названием уже существует';

onMounted(async () => {
  if (!isCreate.value) {
    const existingTank = tanksStore.tanks[tankIndex.value];
    if (!existingTank) {
      await router.push('/tanks/');
    }
    tank.value = JSON.parse(JSON.stringify({ ...existingTank }));
  }
});

const paramsForWatching = computed(() =>
  `
    ${tank.value.length}
    ${tank.value.width}
    ${tank.value.height}
    ${tank.value.glassThickness}
    ${tank.value.filterVolume}
    ${tank.value.soilVolume}
  `,
);

watch(
  paramsForWatching,
  () => {
    tank.value.volume = tankObject.value.countVolume();
  },
);

function onInputWaterChangePercent(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    tank.value.waterChangePercent = value;
    tank.value.waterChangeVolume = +format(tank.value.volume * value / 100, 3);
  }
}

function onInputWaterChangeVolume(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= tank.value.volume) {
    tank.value.waterChangeVolume = value;
    tank.value.waterChangePercent = +format(value / tank.value.volume * 100, 3);
  }
}

const onAddTank = async () =>{
  const { valid } = await tankForm.value.validate();
  if (valid) {
    tanksStore.addTank({ ...tankObject.value.toJson() });
    snackbarStore.showSuccess('Аквариум добавлен');
    await router.push(ROUTES.tanks.path);
  }
};

const onEditTank = async () => {
  const { valid } = await tankForm.value.validate();
  if (valid) {
    tanksStore.editTank({
      tank: { ...tankObject.value.toJson() },
      index: tankIndex.value,
    });
    snackbarStore.showSuccess('Аквариум изменен');
    await router.push(ROUTES.tanks.path);
  }
};

const onRemoveTank = async () => {
  tanksStore.removeTank(tankIndex.value);
  snackbarStore.showSuccess('Аквариум удален');
  await router.push(ROUTES.tanks.path);
};
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
