<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
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
          представленными ссылками на сайты и видео материалы сайта Youtube. А так же
          обзавестись тестами аквариумной воды.
        </p>
        <v-divider class="my-5" />
        <p class="my-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-1': $vuetify.breakpoint['smAndUp']}">
          Видео
        </p>
        <p class="d-flex flex-column body-2">
          <a class="mb-2" href="https://www.youtube.com/watch?v=CljFli5z9DM" target="_blank">Удобрения для аквариумных растений ч.1</a>
          <a class="mb-2" href="https://www.youtube.com/watch?v=E2kDFEIJ1zM&t=199s" target="_blank">Удобрения для аквариумных растений ч.2</a>
          <a class="mb-2" href="https://www.youtube.com/watch?v=Vyq-R0tv384" target="_blank">Удобрение для аквариумных растений своими руками. Фосфор, Азот,Калий и Микро.</a>
          <a class="mb-2" href="https://www.youtube.com/watch?v=wslFKci51uo" target="_blank">Как мы корректируем дозировку своих удобрений для аквариумных растений.</a>
          <a class="mb-2" href="https://www.youtube.com/watch?v=UlbCnqntrww&t=143s" target="_blank">Самомес.Удобрения NPK в аквариум.</a>
          <a class="mb-2" href="https://www.youtube.com/watch?v=YToPYOHs37U" target="_blank">Макро удобрения для аквариумных растений</a>
        </p>
        <p class="my-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-1': $vuetify.breakpoint['smAndUp']}">
          Статьи и сайты
        </p>
        <p class="d-flex flex-column body-2">
          <a class="mb-2" href="http://www.aqua-botanic.ru/" target="_blank">
            Aqua Botanic
          </a>
          <a class="mb-2" href="https://fanfishka.ru/akvariumnye-stati/akvaskeyp/2033-vse-o-makro-udobreniyah-dlya-akvariuma.html" target="_blank">
            Все о макро-удобрениях для аквариума
          </a>
        </p>
        <p>
          Это не полный список материалов, но достаточный, чтобы понять что и для чего нужно.
        </p>
        <v-divider class="my-5" />
        <p class="body-2">
          По всем возникающим вопросам и пожеланиям вы можете найти меня ВКонтакте
          (<a href="https://vk.com/lapshinmr" target="_blank">Михаил Лапшин</a>)
          или написать на почту lapshinmr@gmail.com.
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
  name: 'about',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
