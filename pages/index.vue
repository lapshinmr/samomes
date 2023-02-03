<!--
  Samomes

  Copyright (C) 2023 Mikhail Lapshin

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
          <img
            :src="require('@/assets/images/npk-512x512.png')"
            alt="npk"
          >
        </div>
        <div
          class="about__content d-flex flex-column"
        >
          <h1 class="about__title">
            Самомес
          </h1>
          <h3 class="about__subtitle">
            набор инструментов аквариумиста
          </h3>
          <h3 class="about__question">
            Рассчитаем калий вместе? 😉
          </h3>
          <div id="vk_groups" />
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        class="section section--goals"
      >
        <p class="goals__description">
          Калькулятор снижает рутинную работу расчета концентрации элементов в удобрении, например калия, при
          составлении рецептов или расчете дозировок. Может помочь:
        </p>
        <ul class="goals__list">
          <li>
            составить самодельный рецепт удобрения и реминерализатора или использовать уже готовый рецепт
          </li>
          <li>
            прикинуть дозировки удобрений для вашего аквариума на основе самодельных или фирменных удобрений
          </li>
          <li>
            составить расписание внесения удобрений
          </li>
          <li>
            рассчитать временную и постоянную жесткость при подмене воды
          </li>
          <li>
            посмотреть динамику элементов в аквариуме
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
          to="/tanks"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="blue"
          >
            mdi-fishbowl-outline
          </v-icon>
        </nuxt-link>
        <div class="section__content">
          <nuxt-link to="/tanks">
            <h2 class="section__title">
              Аквариумы
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Для чего они нужны?
            </p>
            <p>
              На этой странице вы можете рассчитать объем прямоугольного аквариума по его линейным размерам, учесть
              объем фильтра и воды, содержащейся в грунте.
            </p>
            <p>
              Аквариум - это сущность, которая рождается здесь, а живет на других страницах. Добавляя аквариум на
              этой странице, вы получите доступ к его характеристикам на других страницах.
            </p>
            <p>
              Это удобно.
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
          to="/recipes"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="green"
          >
            mdi-clipboard-text-multiple-outline
          </v-icon>
        </nuxt-link>
        <div class="section__content">
          <nuxt-link to="/recipes">
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
              На этой странице вы можете создать свой уникальный рецепт самодельного удобрения.
              Для этого у вас есть чистые реагенты (формулы), а так же распространенные в среде аквариумистов
              готовые смеси удобрений.
            </p>
            <p class="font-italic">
              Сложно?
            </p>
            <p>
              Тогда просто воспользуйтесь готовыми рецептами, которые уже опробованы многими аквариумистами.
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
          to="/fertilizers"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="purple"
          >
            mdi-flask
          </v-icon>
        </nuxt-link>
        <div class="section__content">
          <nuxt-link to="/fertilizers">
            <h2 class="section__title">
              Удобрения
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Я использую только фирменные удобрения.
            </p>
            <p>
              Самодельные рецепты лишь часть сервиса. На этой странице вы можете добавить свои фирменные удобрения
              с известным составом, чтобы на странице с расписанием можно было рассчитать дозировки и составить
              расписание.
            </p>
            <p>
              Так же можно добавить удобрения без состава, чтобы учесть его в расписании и не
              забыть внести в аквариум.
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
          to="/schedules"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="teal"
          >
            mdi-calendar-blank-multiple
          </v-icon>
        </nuxt-link>
        <div class="section__content">
          <nuxt-link to="/schedules">
            <h2 class="section__title">
              Расписание
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              А что здесь?
            </p>
            <p>
              Страница "Расписание", это, пожалуй, самая важная часть сервиса. Она будет полезной не только
              аквариумистам с самодельными удобрениями, но и тем, кто использует фирменные удобрения.
            </p>
            <p>
              Здесь можно сделать прикидку дозировок удобрений на свои аквариумы. А потом составить расписание
              внесения удобрений на неделю. Удобный виджет легко поможет отследить процесс внесения.
            </p>
            <p>
              Расчет дозировок включает разные типы расписаний внесения удобрений. Любой аквариумист сможет настроить
              расписание под себя.
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
          to="/remineralization"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="blue-gray"
          >
            fas fa-cubes
          </v-icon>
        </nuxt-link>
        <div class="section__content">
          <nuxt-link to="/remineralization">
            <h2 class="section__title">
              Реминерализация
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Речь идет о gH и kH?
            </p>
            <p>
              Да, верно. Здесь осуществляется водоподготовка по параметрам постоянной и временной жесткости.
              Можно использовать как фирменные реминерализаторы, так и свои самодельные, так же можно добавить свой
              состав готового реминерализатора.
            </p>
            <p>
              А еще эта страница будет очень полезна для тех, кто разбавляет водопроводную воду осмосом.
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
          to="/dynamics"
          class="section__icon-link"
        >
          <v-icon
            class="section__icon"
            color="orange"
          >
            far fa-chart-bar
          </v-icon>
        </nuxt-link>
        <div class="section__content">
          <nuxt-link to="/dynamics">
            <h2 class="section__title">
              Динамика
            </h2>
          </nuxt-link>
          <div class="section__text">
            <p class="font-italic">
              Что такое динамика?
            </p>
            <p>
              Под динамикой подразумевается процесс изменения и установления равновесной концентрации элементов
              в аквариуме. Имея определенный режим подмен и внесения удобрений можно рассчитать временные зависимости
              концентраций элементов.
            </p>
            <p>
              Такой расчет позволяет, в дополнение к тестам, видеть более детальную обстановку в аквариуме. А для
              элементов, концентрации которых в основном обусловлены подменами воды, рассчитать довольно точную
              равновесную концентрацию и сэкономить на тестах.
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
          <p>
            Не стесняйтесь их задавать в группе ВКонтакте
            <a
              href="https://vk.com/samomes"
              target="_blank"
            >здесь</a>. Просто оставьте свой вопрос на стене в группе, под любым из постов или в личные сообщения
            автору проекта.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  mounted() {
    const vk = document.createElement('script');
    vk.setAttribute('src', 'https://vk.com/js/api/openapi.js?169');
    vk.onload = () => {
      // eslint-disable-next-line no-undef
      VK.Widgets.Group('vk_groups', { mode: 0, width: 'auto', height: '300' }, 205374081);
    };
    document.head.appendChild(vk);
  },
};
</script>

<style lang="sass" scoped>
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
        width: 50%
      img
        height: 300px
        width: 300px
    .about__content
      @media (min-width: $xs)
        width: 50%
      @media (max-width: $xs)
        margin-top: 2rem
        padding: 0 1rem
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
        @media (max-width: $xs)
          font-size: 0.9rem !important
          margin-left: 0
        font-size: 1.2rem !important
        font-weight: 300
        margin-left: 1.5rem
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
        margin-left: 30%
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
  .section--remineralization
    text-align: right
    .section__icon-link
      justify-content: flex-end
      @media (min-width: $xs)
        justify-content: center
        order: 2
    .section__content
      @media (min-width: $xs)
        order: 1
  .section--dynamics
    .section__icon-link
      justify-content: flex-start
      @media (min-width: $xs)
        justify-content: center
  .section--questions
    text-align: right
    .section__icon-link
      justify-content: flex-end
      @media (min-width: $xs)
        justify-content: center
        order: 2
    .section__content
      @media (min-width: $xs)
        order: 1
</style>
