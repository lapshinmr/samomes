<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          О проекте
        </p>
        <p>
          Проект "Самомес" - это калькулятор удобрений для аквариума. Цель проекта снизить рутинную работу по составлению рецептов, подсчета
          суммарной концентрации реагентов в удобрении и составлению расписания по внесению удобрений
          в аквариум.
        </p>
        <p>
          Он не научит вас химии, не объяснит почему выбраны те или
          иные реагенты и каким образом замешиваются удобрения. Калькулятор не скажет
          какие концентрации элементов необходимы для разных растений.
          Он только поможет подсчитаить количество удобрений, которое необходимо залить в
          ваш аквариум для достижения нужных концентраций элементов в воде.
        </p>
        <p class="font-weight-medium">
          Новичкам здесь не место! За все действия вы несете личную ответственность!
        </p>
        <p>
          Если вы все-таки хотите научиться делать удобрения для аквариума своими
          руками и воспользоваться калькулятором, то советую ознакомиться с ниже
          представленными ссылками на сайты и видео материалы сайта Youtube. А так же
          обзавестись тестами аквариумной воды.
        </p>
        <v-divider class="my-5" />
        <p class="my-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-1': $vuetify.breakpoint['smAndUp']}">
          Видео
        </p>
        <p class="d-flex flex-column">
          <a href="https://www.youtube.com/watch?v=CljFli5z9DM" target="_blank">Удобрения для аквариумных растений ч.1</a>
          <a href="https://www.youtube.com/watch?v=E2kDFEIJ1zM&t=199s" target="_blank">Удобрения для аквариумных растений ч.2</a>
          <a href="https://www.youtube.com/watch?v=Vyq-R0tv384" target="_blank">Удобрение для аквариумных растений своими руками. Фосфор, Азот,Калий и Микро.</a>
          <a href="https://www.youtube.com/watch?v=wslFKci51uo" target="_blank">Как мы корректируем дозировку своих удобрений для аквариумных растений.</a>
          <a href="https://www.youtube.com/watch?v=UlbCnqntrww&t=143s" target="_blank">Самомес.Удобрения NPK в аквариум.</a>
          <a href="https://www.youtube.com/watch?v=YToPYOHs37U" target="_blank">Макро удобрения для аквариумных растений</a>
        </p>
        <p class="my-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-1': $vuetify.breakpoint['smAndUp']}">
          Статьи и сайты
        </p>
        <p class="d-flex flex-column">
          <a href="http://www.aqua-botanic.ru/" target="_blank">
            Aqua Botanic
          </a>
          <a href="https://fanfishka.ru/akvariumnye-stati/akvaskeyp/2033-vse-o-makro-udobreniyah-dlya-akvariuma.html" target="_blank">
            Все о макро-удобрениях для аквариума
          </a>
        </p>
        <p>
          Это не полный список материалов, но достаточный, чтобы понять что и для чего нужно.
        </p>
        <v-divider class="my-5" />
        <p>
          По всем возникающим вопросам и пожеланиям вы можете найти меня ВКонтакте
          <a href="https://vk.com/lapshinmr" target="_blank">Михаил Лапшин</a> или написать на почту lapshinmr@gmail.com.
          Буду рад помочь.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
