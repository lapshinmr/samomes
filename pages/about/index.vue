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
    min-height="100%"
    class="mb-12 position-relative"
  >
    <v-row>
      <PageTitle>
        О проекте
      </PageTitle>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <p>
          Проект "Самомес" — это калькулятор самодельных рецептов удобрений для аквариума и удобный способ
          составить расписание внесения удобрений на неделю или любой другой период времени.
        </p>
        <p>
          Калькулятор снижает рутинную работу по расчету суммарной концентрации реагентов в удобрении
          (особенно калия) при составлении рецептов.
        </p>
        <p>
          Вы можете использовать как самодельные удобрения при составлении расписания, так и заводские
          или чужие самодельные удобрения с известными концентрациями элементов.
        </p>
        <p>
          Калькулятор не научит вас химии, не объяснит, почему выбраны те или иные реагенты и каким
          образом замешиваются удобрения, не скажет, какие концентрации элементов необходимы для вашего
          аквариума и растений. Он только поможет рассчитать количество удобрений, которое необходимо
          добавить в ваш аквариум для достижения нужных концентраций элементов в воде.
        </p>
        <p class="font-weight-medium red--text">
          Внимание! С помощью калькулятора вы делаете удобрения и составляете расписание на свой страх и риск!
        </p>
        <p>
          Если вы всё-таки хотите научиться делать удобрения для аквариума своими руками и
          воспользоваться калькулятором, рекомендуем ознакомиться с представленными ниже ссылками
          на сайты и видеоматериалы YouTube.
        </p>
        <v-divider class="my-5" />
        <p class="my-8">
          Видео
        </p>
        <p class="d-flex flex-column body-2">
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=GSLYotAT8Xs"
            target="_blank"
          >Промо видео проекта</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=Vyq-R0tv384"
            target="_blank"
          >Удобрение для аквариумных растений своими руками. Фосфор, Азот, Калий и Микро.</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=wslFKci51uo"
            target="_blank"
          >Как мы корректируем дозировку своих удобрений для аквариумных растений.</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=niAYM8DRv_w"
            target="_blank"
          >Удобрения в аквариуме! Как мы подаём и чего придерживаемся в своих аквариумах!</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=UlbCnqntrww"
            target="_blank"
          >Самомес. Удобрения NPK в аквариум.</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=YToPYOHs37U"
            target="_blank"
          >Макро удобрения для аквариумных растений</a>
        </p>
        <v-divider class="my-5" />
        <p class="body-1">
          Все возникающие вопросы и пожелания вы можете писать в
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  head: {
    title: 'О проекте Самомес - Калькулятор Удобрений для Аквариума',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Проект "Самомес" предлагает набор инструментов для расчета удобрений для аквариума. '
          + 'Он помогает снизить рутинную работу по расчету концентраций реагентов и составлению '
          + 'расписания внесения удобрений. Используйте как самодельные, так и фирменные удобрения для '
          + 'достижения нужных концентраций элементов в воде.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'самомес, калькулятор удобрений, аквариумные удобрения, самодельные рецепты, '
          + 'концентрация элементов, расписание, аквариумные растения',
      },
    ],
  },
});
</script>

<style lang="sass" scoped>
p
  margin-bottom: 16px
</style>
