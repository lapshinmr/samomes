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
          <div class="mt-6">
            Результат: {{ format(ratio) || '—' }}
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
