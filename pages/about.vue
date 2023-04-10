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
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <p>
          Проект "Самомес" - это калькулятор самодельных рецептов удобрений для аквариума и
          удобный способ составить расписание внесения удобрений на неделю или любой
          другой период времени.
        </p>
        <p>
          Калькулятор снижает рутинную работу расчета
          суммарной концентрации реагентов в удобрении (особенно калия) при
          составлении рецептов.
        </p>
        <p>
          Вы можете использовать как
          самодельные удобрения при составлении расписания, так и заводские или
          чужие самодельные удобрения с известными концентрациями элементов.
        </p>
        <p>
          Калькулятор не научит вас химии, не объяснит почему выбраны те или
          иные реагенты и каким образом замешиваются удобрения, не скажет
          какие концентрации элементов необходимы для разных растений.
        </p>
        <p>
          Он только поможет раcсчитать количество удобрений, которое необходимо залить в
          ваш аквариум для достижения нужных концентраций элементов в воде.
        </p>
        <p>
          Проект расчитан на более опытных аквариумистов.
        </p>
        <p class="font-weight-medium red--text">
          Внимание! С помощью калькулятора вы делаете удобрения и составляете
          расписание на свой страх и риск!
        </p>
        <p>
          Если вы все-таки хотите научиться делать удобрения для аквариума своими
          руками и воспользоваться калькулятором, то советую ознакомиться с ниже
          представленными ссылками на сайты и видео материалы сайта Youtube.
        </p>
        <v-divider class="my-5" />
        <p
          class="my-8"
          :class="{'headline': $vuetify.breakpoint['xs'], 'display-1': $vuetify.breakpoint['smAndUp']}"
        >
          Видео
        </p>
        <p class="d-flex flex-column body-2">
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=GSLYotAT8Xs&t=27s"
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
            href="https://www.youtube.com/watch?v=niAYM8DRv_w&t=338s"
            target="_blank"
          >Удобрения в аквариуме! Как мы подаём и чего придерживаемся в своих аквариумах!</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=UlbCnqntrww&t=143s"
            target="_blank"
          >Самомес. Удобрения NPK в аквариум.</a>
          <a
            class="mb-2"
            href="https://www.youtube.com/watch?v=YToPYOHs37U"
            target="_blank"
          >Макро удобрения для аквариумных растений</a>
        </p>
        <p
          class="my-8"
          :class="{'headline': $vuetify.breakpoint['xs'], 'display-1': $vuetify.breakpoint['smAndUp']}"
        >
          Статьи и сайты
        </p>
        <p class="d-flex flex-column body-2">
          <a
            class="mb-2"
            href="http://www.amania.org/"
            target="_blank"
          >
            Amania - все о том КАК сделать аквариум с растениями
          </a>
          <a
            class="mb-2"
            href="https://aquascape-promotion.com"
            target="_blank"
          >
            Aquascape-promotion (сайт Сергея Ермолаева)
          </a>
          <a
            class="mb-2"
            href="https://fanfishka.ru/akvariumnye-stati/akvaskeyp/2033-vse-o-makro-udobreniyah-dlya-akvariuma.html"
            target="_blank"
          >
            Все о макро-удобрениях для аквариума
          </a>
        </p>
        <p>
          Это не полный список материалов, но достаточный, чтобы понять что и для чего нужно.
        </p>
        <v-divider class="my-5" />
        <p class="body-1">
          По всем возникающим вопросам и пожеланиям вы можете писать в группу ВКонтакте
          <a
            href="https://vk.com/samomes"
            target="_blank"
          >Аквариум Самомес</a>.
        </p>
        <p>
          Буду рад помочь.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  head() {
    return {
      title: 'О проекте',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Проект "Samomes" был создан для того, чтобы облегчить рутинные расчеты дозировок удобрений, '
            + 'составления расписания, расчета самодельных рецептов.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'samomes, самомес',
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
</style>
