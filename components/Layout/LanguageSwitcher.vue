<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <v-btn
    text
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
