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
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h5 text-md-h4 mt-md-4">
          Статьи
        </h1>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          :to="localePath('/articles/simplest-nitrate/')"
          min-height="471px"
        >
          <NuxtImg
            src="/images/makrandra.jpeg"
            alt="Easiest nitrate recipe"
            class="card-image"
            sizes="100vw sm:50vw md:33vw lg:33vw xl:33vw xxl:33vw"
            :placeholder="[50, 25, 75, 5]"
          />

          <v-card-title>
            Простейший рецепт нитрата NO<sub>3</sub>
          </v-card-title>

          <v-card-text>
            Данная статья посвящена самому простому рецепту жидкого удобрения, содержащего нитрат. Нитрат
            - один из ключевых элементов, на которые обращает...
          </v-card-text>

          <v-divider class="mx-4 mt-auto" />

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              class="ml-auto"
            >
              Читать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          :to="localePath('/articles/simplest-phosphate/')"
          min-height="471px"
        >
          <NuxtImg
            src="/images/indica.jpeg"
            class="card-image"
            alt="Easiest phosphate recipe"
            sizes="100vw sm:50vw md:33vw lg:33vw xl:33vw xxl:33vw"
            :placeholder="[50, 25, 75, 5]"
          />

          <v-card-title>
            Простейший рецепт фосфата PO<sub>4</sub>
          </v-card-title>

          <v-card-text>
            В этой статье мы продолжим рассматривать самые простые способы приготовления домашних удобрений и теперь
            поговорим о фосфате — элементе...
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              class="ml-auto"
            >
              Читать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          min-height="471px"
          :to="localePath('/articles/potassium/')"
        >
          <NuxtImg
            src="/images/stavrogin.jpeg"
            class="card-image"
            alt="Easiest potassium recipe"
            sizes="100vw sm:50vw md:33vw lg:33vw xl:33vw xxl:33vw"
            :placeholder="[50, 25, 75, 5]"
          />

          <v-card-title>Рецепт калия</v-card-title>

          <v-card-text>
            Эта статья завершает серию из трех самых простых рецептов домашних удобрений для аквариума с растениями,
            сосредотачиваясь на калии. Для ознакомления с рецептами...
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              class="ml-auto"
            >
              Читать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          min-height="471px"
          :to="localePath('/articles/no-tests-part-1/')"
        >
          <NuxtImg
            src="/images/no-tests/14.jpeg"
            class="card-image"
            alt="Easiest potassium recipe"
            sizes="100vw sm:50vw md:33vw lg:33vw xl:33vw xxl:33vw"
            :placeholder="[50, 25, 75, 5]"
          />

          <v-card-title>
            Тесты для аквариума не нужны
            <div class="subtitle-1">Часть 1</div>
          </v-card-title>

          <v-card-text>
            В этой статье я хочу поделиться опытом содержания аквариума как с использованием тестов, так и без них —
            основываясь на собственной практике и опыте...
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              class="ml-auto"
            >
              Читать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          min-height="471px"
          :to="localePath('/articles/no-tests-part-2/')"
        >
          <NuxtImg
            src="/images/no-tests/15.jpeg"
            class="card-image"
            alt="Easiest potassium recipe"
            sizes="100vw sm:50vw md:33vw lg:33vw xl:33vw xxl:33vw"
            :placeholder="[50, 25, 75, 5]"
          />

          <v-card-title>
            Тесты для аквариума не нужны
            <div class="subtitle-1">Часть 2</div>
          </v-card-title>

          <v-card-text>
            И вот мы добрались до самого корня зла. Я буду рассматривать оба элемента, так как
            они чаще всего идут в паре в удобрениях, в обсуждениях и т.д. Что же опасного может быть в таких...
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              class="ml-auto"
            >
              Читать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

defineOptions({
  name: 'ArticlesPage',
});

useSeoMeta({
  title: t('meta.articles.title'),
  description: t('meta.articles.description'),
  keywords: t('meta.articles.description'),
});
</script>

<style lang="sass">
@import 'assets/variables.sass'

.card-image
  width: 100%
  height: 250px
  object-fit: cover
  display: block

.hidden-xs-only
  @media(max-width: $xs)
    display: none
</style>
