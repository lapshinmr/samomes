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
          to="/articles/simplest-nitrate/"
          min-height="471px"
        >
          <v-img
            height="250"
            :src="require('@/assets/images/simplest-nitrate-thumb.webp')"
            alt="Easiest nitrate recipe"
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
              text
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
          to="/articles/simplest-phosphate/"
          min-height="471px"
        >
          <v-img
            height="250"
            :src="require('@/assets/images/simplest-phosphate-thumb.webp')"
            alt="Easiest phosphate recipe"
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
              text
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
          to="/articles/potassium/"
        >
          <v-img
            height="250"
            :src="require('@/assets/images/potassium-thumb.webp')"
            alt="Easiest potassium recipe"
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
              text
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
          to="/articles/no-tests-part-1/"
        >
          <v-img
            height="250"
            :src="require('@/assets/images/no-tests/14-min.jpeg')"
            alt="Easiest potassium recipe"
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
              text
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
          to="/articles/no-tests-part-2/"
        >
          <v-img
            height="250"
            :src="require('@/assets/images/no-tests/15-min.jpeg')"
            alt="Easiest potassium recipe"
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
              text
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

<script>
export default {
  name: 'ArticlesPage',
  head() {
    return {
      title: 'Статьи о самодельных удобрениях для аквариумных растений',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Подробные рецепты и инструкции по приготовлению самодельных удобрений для '
            + 'аквариумных растений: нитраты, фосфаты и калий. Простые способы создания эффективных '
            + 'удобрений в домашних условиях.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'самодельные удобрения, аквариумные растения, нитрат, фосфат, калий, рецепты удобрений, '
            + 'самомес, монорастворы, аквариум с растениями',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
