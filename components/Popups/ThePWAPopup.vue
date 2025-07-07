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
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h6">
        {{ t('pwa.title') }}
      </v-card-title>
      <v-card-text>
        <template v-if="platform === 'ios'">
          <p>{{ t('pwa.iphone.title') }}</p>
          <ol class="space-y-2 text-gray-600 ml-6">
            <li class="mb-2 mb-md-3">
              {{ t('pwa.iphone.description.t1') }}
              <v-icon size="20">
                mdi mdi-export-variant
              </v-icon>
            </li>
            <li class="mb-2 mb-md-3">
              {{ t('pwa.iphone.description.t2') }}
            </li>
            <li>
              {{ t('pwa.iphone.description.t3') }}
            </li>
          </ol>
        </template>
        <template v-else-if="platform === 'macos'">
          <p>{{ t('pwa.macOs.title') }}</p>
          <ol class="space-y-2 text-gray-600 ml-6">
            <li class="mb-2 mb-md-3">
              {{ t('pwa.macOs.description.t1') }}
              <v-icon size="20">
                mdi mdi-export-variant
              </v-icon>
            </li>
            <li class="mb-2 mb-md-3">
              {{ t('pwa.macOs.description.t2') }}
            </li>
            <li>
              {{ t('pwa.macOs.description.t3') }}
            </li>
          </ol>
        </template>
        <template v-else-if="platform === 'android' && browser === 'chrome'">
          <p>{{ t('pwa.android.title') }}</p>
          <ol class="space-y-2 text-gray-600 ml-6">
            <li class="mb-2 mb-md-3">
              {{ t('pwa.android.description.t1') }}
              <v-icon size="20">
                mdi mdi-dots-vertical
              </v-icon> в Chrome
            </li>
            <li class="mb-2 mb-md-3">
              {{ t('pwa.android.description.t2') }}
            </li>
            <li>
              {{ t('pwa.android.description.t3') }}
            </li>
          </ol>
        </template>
        <template v-else>
          {{ t('pwa.other.t1') }}
          <br><br>
          {{ t('pwa.other.t2') }}
          <br><br>
          {{ t('pwa.other.t3') }}
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          @click="$emit('update:modelValue', false)"
        >
          {{ t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const model = defineModel<boolean>();

withDefaults(defineProps<{
  platform?: string;
  browser?: string;
}>(), {
  platform: 'unknown',
  browser: 'unknown',
});

defineEmits(['update:modelValue']);

defineOptions({
  name: 'PWAPopup',
});
</script>

<style scoped lang="sass">
p
  margin-bottom: 16px
</style>
