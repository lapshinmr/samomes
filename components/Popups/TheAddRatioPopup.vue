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
        Новые элементы
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            v-model="firstElement"
            label="Первый элемент"
            variant="underlined"
            hint="Введите элемент, который есть в выбранных удобрениях"
            :rules="[required, isIon]"
            persistent-hint
          />
          <v-text-field
            v-model="secondElement"
            label="Второй элемент"
            hint="Введите второй элемент"
            variant="underlined"
            :rules="[required, isIon]"
            persistent-hint
          />
          <v-expand-transition>
            <div
              v-if="ratio !== null"
              class="mt-6"
            >
              Соотношение равно <span class="font-weight-medium">{{ format(ratio) || '—' }}</span>
            </div>
          </v-expand-transition>
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
          @click="onAddElements"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const props = defineProps<{
  concentration: IonsType
}>();

const emit = defineEmits(['save']);

const isIon = (value: string) => {
  return value in props.concentration || 'Нет такого элемента';
};

const { required } = useValidation();
const { t } = useI18n();
const snackbarStore = useSnackbarStore();

const formRef = ref();
const firstElement = ref<string>();
const secondElement = ref<string>();

const ratio = computed(() => {
  return RemineralRecipe.countRatio(props.concentration, firstElement.value, secondElement.value);
});

async function onAddElements() {
  const { valid } = await formRef.value.validate();
  if (!valid) {
    snackbarStore.showWarning(t('common.isFormErrors'));
    return;
  }
  emit('save', [firstElement.value, secondElement.value]);
  firstElement.value = null;
  secondElement.value = null;
  model.value = false;
}
</script>

<style scoped lang="sass">

</style>
