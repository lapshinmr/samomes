<template>
  <v-dialog
    v-model="model"
    max-width="400"
  >
    <v-card>
      <v-card-title>
        {{ t('common.removePopupTitle') }}
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="model = false"
        >
          {{ t('buttons.cancel') }}
        </v-btn>
        <v-btn
          color="error"
          @click="emit('remove')"
        >
          {{ t('buttons.remove') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const { t } = useI18n();

const model = defineModel<boolean>();

const emit = defineEmits(['remove']);

defineOptions({
  name: 'TheRemovePopup',
});
</script>

<style scoped>

</style>
