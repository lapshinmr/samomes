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
  <v-btn
    color="white"
    @click="toggleLocale"
  >
    {{ curLocale.name }}
  </v-btn>
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();

defineOptions({
  name: 'LanguageSwitcher',
});

const localeObject = locales.value.find((item) => item.code === locale.value);

const curLocale = ref({
  code: localeObject.code || 'ru',
  name: localeObject.name || 'Ru',
});

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const toggleLocale = async () => {
  const availableLocale = availableLocales.value[0];
  await setLocale(availableLocale.code);
  curLocale.value.code = availableLocale.code;
  curLocale.value.name = availableLocale.name;
};

defineEmits(['update:modelValue']);
</script>
