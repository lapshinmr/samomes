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
      <BackButton :path="appRoutes.tanks.path" />
      <PageTitle>
        <template v-if="isCreate">
          {{ t('tanks.page.titleNew') }}
        </template>
        <template v-else>
          {{ tank.name }}
        </template>
      </PageTitle>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-form ref="tankFormRef">
          <DividerWithNote class="mt-10 mb-4">
            {{ t('tanks.page.sectionTitle1') }}
          </DividerWithNote>
          <v-text-field
            v-model="tank.name"
            variant="underlined"
            :label="t('tanks.page.name')"
            hide-details="auto"
            clearable
            :hint="t('tanks.page.nameHint')"
            :rules="[required, isNameExist]"
            class="mb-4"
          />
          <NumberField
            v-model="tank.volume"
            variant="underlined"
            :label="t('tanks.page.volume')"
            :suffix="t('units.l')"
            persistent-hint
            :hint="t('tanks.page.volumeHint')"
            :rules="[required]"
          >
            <template #append>
              <v-btn
                color="primary"
                size="small"
                @click="isCalculateVolumePopup = true;"
              >
                Рассчитать
              </v-btn>
            </template>
            <template #message="{ message }">
              <div class="d-flex align-center">
                <span>
                  {{ message }}
                </span>
                <v-tooltip
                  location="bottom"
                  max-width="400"
                  open-on-click
                  open-on-hover
                >
                  <template #activator="{ props }">
                    <Icon
                      v-bind="props"
                      name="mdi-help-circle-outline"
                      size="14"
                      class="ml-1"
                    />
                  </template>
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
                </v-tooltip>
              </div>
            </template>
          </NumberField>
          <DividerWithNote class="mt-15 mb-4">
            {{ t('tanks.page.sectionTitle3') }}
          </DividerWithNote>
          <NumberField
            v-model="tank.filterVolume"
            variant="underlined"
            :label="t('tanks.filterVolume')"
            :suffix="t('units.l')"
            :hint="t('tanks.page.filterVolumeHint')"
            hide-details="auto"
          />
          <div class="d-flex mb-4">
            <NumberField
              :model-value="tank.waterChangePercent"
              variant="underlined"
              :label="t('tanks.page.waterChangePercent')"
              suffix="%"
              hide-details="auto"
              @update:model-value="onInputWaterChangePercent"
            />
            <NumberField
              :model-value="tank.waterChangeVolume"
              variant="underlined"
              :label="t('tanks.waterChangeVolume')"
              :suffix="t('units.l')"
              hide-details="auto"
              class="ml-2"
              @update:model-value="onInputWaterChangeVolume"
            />
          </div>
          <div class="d-flex justify-space-between justify-sm-start font-weight-medium mt-10">
            <span>{{ t('tanks.page.volumeWithFilter') }}:</span>
            <span class="ml-4">{{ format(tankModel.volumeTotal, 4) }} {{ t('units.l') }}</span>
          </div>
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
    <TheCalculateTankVolumePopup
      v-model="isCalculateVolumePopup"
      @save="onVolumeSave"
    />
  </v-container>
</template>

<script lang="ts" setup>
import type { TankType } from '~/utils/types/types';

const { t } = useI18n();
const { required } = useValidation();
const { appRoutes } = useAppRoutes();
const route = useRoute();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();
const tankFormRef = ref(null);

const isCalculateVolumePopup = ref(false);

const tank = ref<TankType>({
  name: null,
  volume: null,
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
      await router.push(appRoutes.value.tanks.path);
      return;
    }
    tank.value = JSON.parse(JSON.stringify({ ...existingTank }));
  }
});

function onVolumeSave(value: number) {
  tank.value.volume = value;
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

  const { valid } = await tankFormRef.value.validate();
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
