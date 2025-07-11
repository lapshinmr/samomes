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
  <v-container class="post">
    <v-row>
      <v-col>
        <NuxtImg
          src="/images/no-tests/14.jpeg"
          class="full-width-main-image"
          quality="50"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          :placeholder="[50, 25, 75, 5]"
          format="webp"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <v-btn
          color="primary"
          class="mr-0"
          square
          :to="localePath('/articles/')"
        >
          <v-icon>mdi-chevron-left</v-icon> {{ t('articles.common.allArticles') }}
        </v-btn>
      </v-col>
    </v-row>
    <component :is="locale === 'ru' ? RuContent : EnContent" />
  </v-container>
</template>

<script lang="ts" setup>
import RuContent from '~/components/Articles/NoTests1/NoTests1Ru.vue';
import EnContent from '~/components/Articles/NoTests1/NoTests1En.vue';

const localePath = useLocalePath();
const { t, locale } = useI18n();

defineOptions({
  name: 'NoTestsPart1Page',
});

useSeoMeta({
  title: t('meta.articles.noTests1.title'),
  description: t('meta.articles.noTests1.description'),
  keywords: t('meta.articles.noTests1.keywords'),
});
</script>

<style lang="sass" scoped>
</style>
