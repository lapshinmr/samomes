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
  <v-dialog
    v-model="model"
    width="500"
  >
    <v-card>
      <v-card-title>
        {{ t('tanks.page.sectionDescription2') }}
      </v-card-title>
      <v-card-text>
        <v-form ref="tankVolumeFormRef">
          <NumberField
            v-model="tankEdit.length"
            variant="underlined"
            :label="t('tanks.page.length')"
            :suffix="t('units.cm')"
            hide-details="auto"
            class="mb-2"
            :rules="[required, positive]"
          />
          <NumberField
            v-model="tankEdit.width"
            variant="underlined"
            :label="t('tanks.page.width')"
            :suffix="t('units.cm')"
            hide-details="auto"
            class="mb-2"
            :rules="[required]"
          />
          <NumberField
            v-model="tankEdit.height"
            variant="underlined"
            :label="t('tanks.page.height')"
            :suffix="t('units.cm')"
            :hint="t('tanks.page.heightHint')"
            persistent-hint
            class="mb-2"
            :rules="[required, positive]"
          />
          <NumberField
            v-model="tankEdit.glassThickness"
            variant="underlined"
            :label="t('tanks.page.glassThickness')"
            :suffix="t('units.mm')"
            hide-details="auto"
            class="mb-4"
            :rules="[positiveOrEmpty]"
          />
          <div class="font-weight-medium">
            {{ t('tanks.page.volumeCount') }}: {{ format(tankVolume, 4) }} {{ t('units.l') }}
          </div>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          variant="text"
          @click="model = false"
        >
          Закрыть
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="onSave"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const tankEdit = reactive<{
  length: number;
  width: number;
  height: number;
  glassThickness : number;
}>({
  length: null,
  width: null,
  height: null,
  glassThickness : null,
});

const emit = defineEmits(['save']);

const { required, positive, positiveOrEmpty } = useValidation();
const { t } = useI18n();
const snackbarStore = useSnackbarStore();

const tankVolume = computed(() => Tank.getVolumeSize(
  tankEdit.length,
  tankEdit.width,
  tankEdit.height,
  tankEdit.glassThickness ?? 0,
));

const tankVolumeFormRef = ref(null);

async function onSave() {
  const { valid } = await tankVolumeFormRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  emit('save', format(tankVolume.value, 4));
  model.value = false;
}
</script>

<style scoped lang="sass">

</style>
