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
