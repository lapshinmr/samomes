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
  <v-container
    class="landing"
  >
    <v-row>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--about"
      >
        <div class="about__image">
          <v-img
            src="/images/npk-512x512-min.png"
            max-height="300"
            max-width="300"
            alt="Main logotype NPK"
          />
        </div>
        <div class="about__content d-flex flex-column">
          <h1 class="about__title">
            Самомес
          </h1>
          <h3 class="about__subtitle">
            калькулятор удобрений для растительного аквариума
          </h3>
          <h3 class="about__question">
            Рассчитаем калий вместе? 😉
          </h3>
          <div class="mt-6">
            <div>
              У нас есть Telegram-канал! Подпишитесь, чтобы быть в курсе всех новинок и обновлений.
            </div>
            <v-btn
              href="https://t.me/samomes_calculator"
              target="_blank"
              color="primary"
              class="my-4"
            >
              Перейти в Telegram
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="9"
        offset-sm="2"
        class="section section--goals"
      >
        <p class="goals__description">
          Калькулятор упрощает расчет концентрации элементов, избавляя от рутинной работы. С его помощью вы можете:
        </p>
        <ul class="goals__list">
          <li>
            создать собственный рецепт удобрения или реминерализатора, а также использовать готовые формулы
          </li>
          <li>
            рассчитать оптимальные дозировки как самодельных, так и фирменных удобрений для вашего аквариума
          </li>
          <li>
            составить эффективное расписание внесения удобрений
          </li>
          <li>
            вычислить временную и постоянную жесткость при подмене воды
          </li>
          <li>
            отслеживать динамику содержания элементов в вашем аквариуме
          </li>
        </ul>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--tanks"
      >
        <nuxt-link
          :to="ROUTES.tanks.path"
          class="section__icon-link"
        >
          <Icon
            :name="ROUTES.tanks.icon"
            class="section__icon text-blue"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.tanks.path">
            <h2 class="section__title">
              Аквариумы
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Для чего нужны аквариумы?
            </p>
            <p>
              На этой странице вы можете рассчитать объем вашего прямоугольного аквариума по его размерам,
              а также учесть объем фильтра и воду, содержащуюся в грунте.
            </p>
            <p>
              Аквариум в нашей системе — это базовая сущность, которая создаётся здесь,
              а используется на других страницах сервиса. Добавив аквариум однажды, вы получите
              доступ к его параметрам во всех разделах калькулятора.
            </p>
            <p>
              Это значительно упрощает работу с сервисом и экономит ваше время.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--recipes"
      >
        <nuxt-link
          :to="ROUTES.recipes.path"
          class="section__icon-link"
        >
          <Icon
            class="section__icon text-green"
            :name="ROUTES.recipes.icon"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.recipes.path">
            <h2 class="section__title">
              Рецепты
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Хотите создать собственное удобрение?
            </p>
            <p>
              Вам сюда!
            </p>
            <p>
              На этой странице вы можете разработать свой уникальный рецепт самодельного удобрения.
              Для этого в вашем распоряжении есть как чистые реагенты (с точными химическими формулами),
              так и распространенные среди аквариумистов готовые смеси удобрений.
            </p>
            <p class="font-italic">
              Кажется сложным?
            </p>
            <p>
              Не беспокойтесь — вы всегда можете воспользоваться готовыми рецептами, которые уже
              проверены и успешно применяются многими аквариумистами.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--fertilizers"
      >
        <nuxt-link
          :to="ROUTES.fertilizers.path"
          class="section__icon-link"
        >
          <Icon
            class="section__icon text-purple"
            :name="ROUTES.fertilizers.icon"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.fertilizers.path">
            <h2 class="section__title">
              Удобрения
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Предпочитаете фирменные удобрения?
            </p>
            <p>
              Самодельные рецепты — лишь часть нашего сервиса. На этой странице вы можете добавить
              любимые фирменные удобрения с известным составом, чтобы система помогла подобрать дозировки и
              включила их в ваше персональное расписание.
            </p>
            <p>
              Даже если вы не знаете точного состава удобрения, вы можете добавить его в систему —
              это поможет вести учет внесений и не пропустить важные подкормки для ваших растений.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--schedules"
      >
        <nuxt-link
          :to="ROUTES.schedules.path"
          class="section__icon-link"
        >
          <Icon
            class="section__icon text-teal"
            :name="ROUTES.schedules.icon"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.schedules.path">
            <h2 class="section__title">
              Расписание
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Сердце нашего сервиса
            </p>
            <p>
              Страница "Расписание" — это, пожалуй, самая важная часть всего сервиса.
              Она одинаково полезна как приверженцам самодельных составов, так и любителям фирменных удобрений.
            </p>
            <p>
              Здесь вы можете:
            </p>
            <ul>
              <li>
                рассчитать точные дозировки удобрений для каждого из ваших аквариумов
              </li>
              <li>
                составить персонализированное расписание внесения на неделю вперед
              </li>
              <li>
                отслеживать процесс внесения через удобный интерактивный виджет
              </li>
            </ul>
            <p>
              Система поддерживает различные типы расписаний внесения удобрений, позволяя настроить график
              именно под ваши потребности и режим обслуживания аквариума.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--reminerals"
      >
        <nuxt-link
          :to="ROUTES.reminerals.path"
          class="section__icon-link"
        >
          <Icon
            class="section__icon text-blue-gray"
            :name="ROUTES.reminerals.icon"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.reminerals.path">
            <h2 class="section__title">
              Реминерализаторы
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Не хотите использовать фирменный реминерализатор?
            </p>
            <p>
              На этой странице вы можете разработать свой собственный рецепт реминерализатора.
              Для этого в вашем распоряжении есть реагенты, которые часто используются аквариумистами.
            </p>
            <p class="font-italic">
              Не знаете как это сделать?
            </p>
            <p>
              Не беспокойтесь — вы всегда можете воспользоваться готовыми рецептами, которые уже
              проверены и успешно применяются многими аквариумистами.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--remineralization"
      >
        <nuxt-link
          :to="ROUTES.remineralization.path"
          class="section__icon-link"
        >
          <Icon
            class="section__icon text-blue"
            :name="ROUTES.remineralization.icon"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.remineralization.path">
            <h2 class="section__title">
              Водоподготовка
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Управление жесткостью воды (gH и kH)
            </p>
            <p>
              В этом разделе вы можете точно настроить параметры постоянной (gH) и временной (kH)
              жесткости воды для вашего аквариума. Сервис предлагает гибкие возможности,
              использования фирменных реминерализаторов с известным составом, а так же применение своих
              собственных рецептов.
            </p>
            <p>
              Этот инструмент особенно ценен для аквариумистов, которые разбавляют водопроводную воду осмосом,
              позволяя достичь идеальных параметров воды для конкретных видов рыб и растений.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--dynamics"
      >
        <nuxt-link
          :to="ROUTES.dynamics.path"
          class="section__icon-link"
        >
          <Icon
            class="section__icon text-orange"
            :name="ROUTES.dynamics.icon"
          />
        </nuxt-link>
        <div class="section__content">
          <nuxt-link :to="ROUTES.dynamics.path">
            <h2 class="section__title">
              Динамика
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Что такое динамика элементов?
            </p>
            <p>
              Динамика — это анализ процессов изменения и достижения равновесной концентрации питательных
              элементов в вашем аквариуме. Основываясь на вашем режиме подмен воды и графике внесения
              удобрений, система рассчитывает временные зависимости концентраций всех важных элементов.
            </p>
            <p>
              Такой расчет позволяет видеть более детальную картину состояния аквариума.
              А для таких элементов как калий, можно рассчитать
              довольно точную равновесную концентрацию и сэкономить время и деньги на тестах.
            </p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--questions"
      >
        <a
          href="https://vk.com/samomes"
          target="_blank"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="success"
          >
            mdi mdi-comment-question-outline
          </v-icon>
        </a>
        <div class="section__content">
          <h2 class="section__title">
            Остались вопросы?
          </h2>
          <p class="section__text">
            Не стесняйтесь задавать их в
            <a
              href="https://t.me/samomes_calculator"
              target="_blank"
            >Telegram-канале</a> или в группе
            <a
              href="https://vk.com/samomes"
              target="_blank"
            >ВКонтакте</a>.
            Просто оставьте свой вопрос на стене
            в группе, в комментариях под любым из постов или в личных сообщениях автору проекта.
          </p>
          <v-lazy v-model="isVKVisible">
            <div id="vk_groups" />
          </v-lazy>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const isVKVisible = ref<boolean>(false);

watch(isVKVisible, (value) => {
  if (value) {
    const vk = document.createElement('script');
    vk.setAttribute('src', 'https://vk.com/js/api/openapi.js?169');
    vk.onload = () => {

      VK.Widgets.Group('vk_groups', { mode: 0, width: 'auto', height: '300' }, 205374081);
    };
    document.head.appendChild(vk);
  }
});

defineOptions({
  name: 'Home',
});

definePageMeta({
  title: 'Самомес - калькулятор удобрений для растительного аквариума',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Самомес — это удобный калькулятор для аквариумистов, который упрощает расчет '
        + 'концентрации элементов и дозировок удобрений для растительных аквариумов. '
        + 'С его помощью можно создавать собственные рецепты удобрений, составлять расписания '
        + 'внесения, управлять жесткостью воды и отслеживать динамику содержания элементов.',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: 'аквариумы, рецепты, удобрения, расписание, водоподготовка, динамика, растительный аквариум, '
        + 'реминерализаторы, аквариумисты',
    },
  ],
});
</script>

<style lang="sass" scoped>
@import 'assets/variables.sass'

.landing
  .section
    min-height: 400px
    @media (min-width: $xs)
      margin-top: 50px
    display: flex
    justify-content: space-between
    @media (max-width: $xs)
      flex-direction: column
    .section__icon-link
      height: 150px
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      @media (min-width: $xs)
        flex-shrink: 0
        height: 300px
        width: 300px
      .section__icon
        height: 100px
        width: 100px
        font-size: 100px
        @media (min-width: $xs)
          height: 200px
          width: 200px
          font-size: 200px
    .section__content
      flex-grow: 1
      display: flex
      flex-direction: column
      .section__title
        font-weight: 300
        font-size: 2rem !important
        line-height: 2rem
        letter-spacing: -0.0083333333em !important
        font-family: "Roboto", sans-serif !important
        @media (min-width: $xs)
          font-size: 3.75rem !important
          line-height: 3.75rem
      .section__text
        margin-top: 2rem
  .section--about
    @media (max-width: $xs)
      flex-direction: column
    .about__image
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      @media (min-width: $xs)
        width: 40%
    .about__content
      @media (min-width: $xs)
        width: 60%
      @media (max-width: $xs)
        margin-top: 2rem
      .about__title
        font-size: 3rem !important
        line-height: 2.5rem
        letter-spacing: -0.0083333333em !important
        font-family: "Roboto", sans-serif !important
        font-weight: 300
        @media (min-width: $xs)
          font-size: 4.5rem !important
          line-height: 3.75rem
      .about__subtitle
        margin-left: 1.5rem
        @media (max-width: $xs)
          font-size: 0.9rem !important
        font-size: 1.2rem !important
        font-weight: 300
      .about__question
        @media (max-width: $xs)
          font-size: 1.2rem !important
        font-size: 1.3rem !important
        font-weight: 400
        margin-top: 2rem
        margin-bottom: 1rem
  .section--goals
    display: flex
    flex-direction: column
    justify-content: flex-start
    .goals__description
      font-size: 1.2rem
      @media (min-width: $xs)
        margin-right: 30%
    .goals__list
      @media (min-width: $xs)
        margin-left: 10%
      margin-top: 1rem
      font-size: 1.1rem
      li
        margin-bottom: 1rem
  .section--tanks
    text-align: right
    .section__icon-link
      justify-content: flex-end
      @media (min-width: $xs)
        justify-content: center
        order: 2
    .section__content
      @media (min-width: $xs)
        order: 1
  .section--recipes
    .section__icon-link
      justify-content: flex-start
      @media (min-width: $xs)
        justify-content: center
  .section--fertilizers
    text-align: right
    .section__icon-link
      justify-content: flex-end
      @media (min-width: $xs)
        justify-content: center
        order: 2
    .section__content
      @media (min-width: $xs)
        order: 1
  .section--schedules
    .section__icon-link
      justify-content: flex-start
      @media (min-width: $xs)
        justify-content: center
  .section--reminerals
    text-align: right
    .section__icon-link
      justify-content: flex-end
      @media (min-width: $xs)
        justify-content: center
        order: 2
    .section__content
      @media (min-width: $xs)
        order: 1
  .section--remineralization
    .section__icon-link
      justify-content: flex-start
      @media (min-width: $xs)
        justify-content: center
  .section--dynamics
    text-align: right
    .section__icon-link
      justify-content: flex-end
      @media (min-width: $xs)
        justify-content: center
        order: 2
    .section__content
      @media (min-width: $xs)
        order: 1
  .section--questions
    .section__icon-link
      justify-content: flex-start
      @media (min-width: $xs)
        justify-content: center
</style>
