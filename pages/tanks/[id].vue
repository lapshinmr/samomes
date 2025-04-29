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
      <LayoutBackButton :path="appRoutes.tanks.path" />
      <LayoutPageTitle>
        <template v-if="isCreate">
          {{ t('tanks.page.titleNew') }}
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
        <v-form ref="tankFormRef">
          <v-text-field
            v-model="tank.name"
            variant="underlined"
            :label="t('tanks.page.name')"
            hide-details="auto"
            clearable
            :hint="t('tanks.page.nameHint')"
            :rules="[required, isNameExist]"
          />
          <BaseDividerWithNote
            v-model="isVolumeInfo"
            class="mt-6"
            button
          >
            {{ t('tanks.page.volumeInfo.title') }}
          </BaseDividerWithNote>
          <v-expand-transition>
            <div
              v-if="isVolumeInfo"
              class="text-grey-darken-1 text-body-2 mt-6 mb-0"
            >
              <p class="mb-2">
                {{ t('tanks.page.volumeInfo.p1') }}
              </p>
              <p class="mb-2">
                {{ t('tanks.page.volumeInfo.p2') }}
              </p>
              <p class="mb-2">
                {{ t('tanks.page.volumeInfo.p3') }}
              </p>
            </div>
          </v-expand-transition>
          <BaseNumberField
            v-model="tank.volume"
            variant="underlined"
            :label="t('common.volume')"
            :suffix="t('units.l')"
            hide-details="auto"
            :hint="t('tanks.page.volumeHint')"
            :rules="[required]"
          />
          <BaseDividerWithNote class="mb-3 mt-10">
            {{ t('tanks.page.orSizes') }}
          </BaseDividerWithNote>
          <BaseNumberField
            v-model="tank.length"
            variant="underlined"
            :label="t('tanks.length')"
            :suffix="t('units.cm')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.width"
            variant="underlined"
            :label="t('tanks.width')"
            :suffix="t('units.cm')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.height"
            variant="underlined"
            :label="t('tanks.height')"
            :suffix="t('units.cm')"
            :hint="t('tanks.heightHint')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.glassThickness"
            variant="underlined"
            :label="t('tanks.glassThickness')"
            :suffix="t('units.mm')"
            hide-details="auto"
          />
          <BaseDividerWithNote class="mb-3 mt-10">
            {{ t('tanks.page.extraVolumes') }}
          </BaseDividerWithNote>
          <BaseNumberField
            v-model="tank.filterVolume"
            variant="underlined"
            :label="t('tanks.filterVolume')"
            :suffix="t('units.l')"
            :hint="t('tanks.page.filterVolumeHint')"
            hide-details="auto"
          />
          <BaseNumberField
            v-model="tank.soilVolume"
            variant="underlined"
            :label="t('tanks.soilVolume')"
            :suffix="t('units.l')"
            :hint="t('tanks.page.soilVolumeHint')"
            hide-details="auto"
          />
          <div class="d-flex">
            <BaseNumberField
              :model-value="tank.waterChangePercent"
              variant="underlined"
              :label="t('tanks.page.waterChangePercent')"
              suffix="%"
              hide-details="auto"
              @update:model-value="onInputWaterChangePercent"
            />
            <BaseNumberField
              :model-value="tank.waterChangeVolume"
              variant="underlined"
              :label="t('tanks.waterChangeVolume')"
              :suffix="t('units.l')"
              hide-details="auto"
              class="ml-2"
              @update:model-value="onInputWaterChangeVolume"
            />
          </div>
          <v-expand-transition>
            <div class="d-flex justify-space-between mt-10">
              <v-btn
                v-if="isEdit"
                color="error"
                @click="onRemoveTank"
              >
                {{ t('buttons.remove') }}
              </v-btn>
              <v-btn
                color="primary"
                class="ml-auto"
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
const { appRoutes } = useAppRoutes();
const { required } = useValidation();
const route = useRoute();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();
const tankFormRef = ref(null);

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

const isNameExist = () => !isExist.value || t('tanks.page.message.nameExists');

onMounted(async () => {
  if (!isCreate.value) {
    const existingTank = tanksStore.tanks[tankIndex.value];
    if (!existingTank) {
      await router.push('/tanks/');
      return;
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
  const { valid } = await tankFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  tanksStore.addTank({ ...tankObject.value.toJson() });
  snackbarStore.showSuccess(t('tanks.page.message.tankAdded'));
  await router.push(appRoutes.value.tanks.path);
};

const onEditTank = async () => {
  const { valid } = await tankFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  tanksStore.editTank({
    tank: { ...tankObject.value.toJson() },
    index: tankIndex.value,
  });
  snackbarStore.showSuccess(t('tanks.page.message.tankEdited'));
  await router.push(appRoutes.value.tanks.path);
};

const onRemoveTank = async () => {
  tanksStore.removeTank(tankIndex.value);
  snackbarStore.showSuccess(t('tanks.page.message.tankRemoved'));
  await router.push(appRoutes.value.tanks.path);
};
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
