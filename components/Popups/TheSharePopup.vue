<template>
  <v-dialog
    v-model="model"
    width="500"
  >
    <v-card>
      <v-card-title>
        Поделиться ссылкой
      </v-card-title>
      <v-card-text>
        <v-text-field
          :model-value="url"
          readonly
          label="Ваша ссылка для отправки"
          hint="Скопируйте ссылку"
        >
          <template #append>
            <v-tooltip
              location="bottom"
              max-width="400"
            >
              <template #activator="{ props }">
                <a
                  class="cursor-pointer"
                  @click="copyUrl(url)"
                >
                  <v-icon v-bind="props">mdi-content-copy</v-icon>
                </a>
              </template>
              Скопировать
            </v-tooltip>
          </template>
        </v-text-field>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="model = false"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  url: string;
}>();

const { copyUrl } = useSharePopup();
</script>

<style scoped lang="sass">

</style>
