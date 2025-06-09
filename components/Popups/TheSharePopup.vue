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
