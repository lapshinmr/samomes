<template>
  <v-container>
    <v-row>
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

          <v-card-title>Простейший рецепт нитрата NO3</v-card-title>

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

          <v-card-title>Простейший рецепт фосфата PO4</v-card-title>

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
              to="/articles/potassium/"
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
      title: 'Статьи',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Статьи о том как сделать самодельные удобрения и как правильно подобрать дозировки',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'нитрат, фосфат, самомес, монорастворы, рецепт, самодельные удобрения',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
