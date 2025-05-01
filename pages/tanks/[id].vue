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
          <BaseDividerWithNote
            :model-value="isStep1"
            class="mb-6"
            :button="!isStep1"
            :dividers="false"
            @update:model-value="toggleSection(STEPS.FIRST)"
          >
            <span class="text-h6">
              {{ t('tanks.page.sectionTitle1') }}
            </span>
            <template #content>
              <v-text-field
                v-model="tank.name"
                variant="underlined"
                :label="t('tanks.page.name')"
                hide-details="auto"
                clearable
                :hint="t('tanks.page.nameHint')"
                :rules="[isNameExist]"
                class="mb-4"
              />
              <BaseNumberField
                v-model="tank.volume"
                variant="underlined"
                :label="t('tanks.page.volume')"
                :suffix="t('units.l')"
                hide-details="auto"
                :hint="t('tanks.page.volumeHint')"
                :rules="[positiveOrEmpty]"
              />
              <BaseDividerWithNote
                v-model="isVolumeInfo"
                class="mt-6"
                button
              >
                {{ t('tanks.page.volumeInfo.title') }}
                <template #content>
                  <div class="text-grey-darken-1 text-body-2">
                    <p class="mb-2">
                      {{ t('tanks.page.volumeInfo.p1') }}
                    </p>
                    <p class="mb-2">
                      {{ t('tanks.page.volumeInfo.p2') }}
                    </p>
                    <p class="mb-2">
                      {{ t('tanks.page.volumeInfo.p3') }}
                    </p>
                    <p class="mb-2">
                      {{ t('tanks.page.volumeInfo.p4') }}
                    </p>
                  </div>
                </template>
              </BaseDividerWithNote>
              <div class="d-flex justify-end">
                <v-btn
                  size="small"
                  class="mt-4"
                  @click="toggleSection(STEPS.SECOND)"
                >
                  {{ t('tanks.page.volumeSkip') }}
                </v-btn>
              </div>
            </template>
          </BaseDividerWithNote>
          <BaseDividerWithNote
            :model-value="isStep2"
            class="my-6"
            :button="!isStep2"
            :dividers="false"
            @update:model-value="toggleSection(1)"
          >
            <span class="text-h6">
              {{ t('tanks.page.sectionTitle2') }}
            </span>
            <template #content>
              <p class="mb-4 text-grey-darken-1">
                {{ t('tanks.page.sectionDescription2') }}
              </p>
              <BaseNumberField
                v-model="tank.length"
                variant="underlined"
                :label="t('tanks.length')"
                :suffix="t('units.cm')"
                hide-details="auto"
                class="mb-2"
                :rules="[positiveOrEmpty]"
              />
              <BaseNumberField
                v-model="tank.width"
                variant="underlined"
                :label="t('tanks.width')"
                :suffix="t('units.cm')"
                hide-details="auto"
                class="mb-2"
                :rules="[positiveOrEmpty]"
              />
              <BaseNumberField
                v-model="tank.height"
                variant="underlined"
                :label="t('tanks.height')"
                :suffix="t('units.cm')"
                :hint="t('tanks.page.heightHint')"
                persistent-hint
                class="mb-2"
                :rules="[positiveOrEmpty]"
              />
              <BaseNumberField
                v-model="tank.glassThickness"
                variant="underlined"
                :label="t('tanks.glassThickness')"
                :suffix="t('units.mm')"
                hide-details="auto"
                class="mb-4"
                :rules="[positiveOrEmpty]"
              />
              <div class="font-weight-medium">
                {{ t('tanks.page.volumeCount') }}: {{ tankModel.volumeSize.toFixed(2) }} {{ t('units.l') }}
              </div>
            </template>
          </BaseDividerWithNote>
          <BaseDividerWithNote
            :model-value="isStep3"
            class="my-6"
            :button="!isStep3"
            :dividers="false"
            @update:model-value="toggleSection(STEPS.THIRD)"
          >
            <span class="text-h6">
              {{ t('tanks.page.sectionTitle3') }}
            </span>
            <template #content>
              <p class="mb-4">
                {{ t('tanks.page.sectionDescription3') }}
              </p>
              <BaseNumberField
                v-model="tank.filterVolume"
                variant="underlined"
                :label="t('tanks.filterVolume')"
                :suffix="t('units.l')"
                :hint="t('tanks.page.filterVolumeHint')"
                hide-details="auto"
                :rules="[positiveOrEmpty]"
              />
              <div class="d-flex mb-4">
                <BaseNumberField
                  :model-value="tank.waterChangePercent"
                  variant="underlined"
                  :label="t('tanks.page.waterChangePercent')"
                  suffix="%"
                  hide-details="auto"
                  :rules="[positiveOrEmpty]"
                  @update:model-value="onInputWaterChangePercent"
                />
                <BaseNumberField
                  :model-value="tank.waterChangeVolume"
                  variant="underlined"
                  :label="t('tanks.waterChangeVolume')"
                  :suffix="t('units.l')"
                  hide-details="auto"
                  class="ml-2"
                  :rules="[positiveOrEmpty]"
                  @update:model-value="onInputWaterChangeVolume"
                />
              </div>
              <div class="font-weight-medium">
                {{ t('tanks.page.volumeWithFilter') }}: {{ tankModel.volumeTotal.toFixed(2) }} {{ t('units.l') }}
              </div>
            </template>
          </BaseDividerWithNote>
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
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { TankType } from '~/utils/types/types';

const { t } = useI18n();
const { positiveOrEmpty } = useValidation();
const { appRoutes } = useAppRoutes();
const route = useRoute();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();
const tankFormRef = ref(null);

enum STEPS {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
}
const isStep1 = ref(true);
const isStep2 = ref(false);
const isStep3 = ref(false);
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
});

const isCreate = computed(() => route.params.id === 'create');
const isEdit = computed(() => route.params.id !== 'create');
const tankIndex = computed(() => +route.params.id);

const tankModel = computed(() => new Tank(tank.value));

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

function toggleSection(step: STEPS) {
  if (step === 0) {
    isStep1.value = true;
    isStep2.value = false;
    isStep3.value = false;
  } else if (step === 1) {
    isStep1.value = false;
    isStep2.value = true;
    isStep3.value = false;
  } else if (step === 2) {
    isStep1.value = false;
    isStep2.value = false;
    isStep3.value = true;
  }
}

function onInputWaterChangePercent(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    tank.value.waterChangePercent = value;
    tank.value.waterChangeVolume = format(tankModel.value.volumeTotal * value / 100, 3);
  }
}

function onInputWaterChangeVolume(value: number) {
  if (value < 0) {
    return;
  }
  if (value <= tankModel.value.volumeTotal) {
    tank.value.waterChangeVolume = value;
    tank.value.waterChangePercent = format(value / tankModel.value.volumeTotal * 100, 3);
  }
}

const onAddTank = async () =>{
  const valid = tankModel.value.volumeTotal;
  if (!valid) {
    snackbarStore.showWarning(t('tanks.page.message.isFormErrors'));
    return;
  }
  tanksStore.addTank({ ...tankModel.value.toJson() });
  snackbarStore.showSuccess(t('tanks.page.message.tankAdded'));
  await router.push(appRoutes.value.tanks.path);
};

const onEditTank = async () => {
  const valid = tankModel.value.volumeTotal;
  if (!valid) {
    snackbarStore.showWarning(t('tanks.page.message.isFormErrors'));
    return;
  }
  tanksStore.editTank({
    tank: { ...tankModel.value.toJson() },
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
