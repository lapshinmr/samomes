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
          Привет! Меня зовут Михаил, и я создатель "Samomes" — калькулятора удобрений для растительного аквариума.
        </p>
        <p>
          Этот проект родился на пересечении моих профессиональных навыков веб-разработки и любимого с детства хобби —
          аквариумистики. Проект развивался постепенно, вместе с моим собственным опытом, и продолжает расти благодаря
          обратной связи от аквариумистов, которые его используют.
        </p>
        <h2 class="text-h5 font-weight-regular my-6">
          Мой путь в аквариумистике
        </h2>
        <p>
          Мой первый аквариум появился в далеком 1995 году, когда я учился в первом классе. Тогда я прочитал свою первую
          книгу по аквариумистике немецкого автора, где был описан удивительный подводный мир. Уже в то время меня очень
          интересовали растения.
        </p>
        <p>
          После 10 лет активного увлечения случился долгий перерыв на 15 лет. Вернулся я в аквариумистику, получив в
          наследство сильно запущенный аквариум. И тут все возобновилось с новой силой — но уже на совершенно новом
          уровне (ниже представлены мои аквариумы в хронологическом порядке).
        </p>
        <NuxtImg
          src="/images/about/2019_1.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div class="mb-2">
          Лето 2019. 60 литров
        </div>
        <NuxtImg
          src="/images/about/2019_2.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div>
          Осень 2019. 60 литров
        </div>
        <h2 class="text-h5 font-weight-regular my-6">
          Рождение идеи
        </h2>
        <p>
          Идея калькулятора появилась в 2019 году, когда я начал заниматься выращиванием растений с использованием
          современных подходов. Помню, как стоял с бутылками удобрений в руках и не знал, как правильно рассчитать
          дозировки.
        </p>
        <p>
          На бутылке с нитратом были указаны концентрации азота и калия. На бутылке с фосфатом — фосфора и калия. В
          микроудобрении было перечислено множество элементов, включая тот же калий. Плюс у меня была отдельная бутылка
          калия. Калий, калий, калий!
        </p>
        <p>
          В добавок ко всему, производитель на каждой бутылке указал разные инструкции: на одной — "лить 2-3 раза в
          неделю по 1-2 мл на 100 л", на другой — "1 раз в неделю 3-5 мл на 50 л". А калий, как я уже заметил,
          содержался в каждой из них. Считать его общую сумму — то еще удовольствие!
        </p>
        <NuxtImg
          src="/images/about/2020_1.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div>
          Весна 2020. 180 литров
        </div>
        <h2 class="text-h5 font-weight-regular my-6">
          Развитие проекта
        </h2>
        <p>
          Сначала я несколько раз посчитал нужные дозировки на листочке. Но когда появился второй аквариум и пришлось
          пересчитывать все заново, стало понятно — так дело не пойдет. Так появилась первая страница с расчетом
          дозировок.
        </p>
        <p>
          Потом мне показалось, что покупать готовые удобрения довольно дорого, и их можно изготавливать самостоятельно.
          Микроудобрения были сложны в приготовлении, а их расход был меньше, поэтому я сосредоточился на
          макроэлементах. Так появилась страница с рецептами, а для микро сделал отдельный раздел с готовыми
          удобрениями.
        </p>
        <p>
          Проект рос, новые инструменты добавлялись, и теперь это не просто калькулятор для самодельных удобрений.
          Это целая система, которая помогает рассчитать любую химию для аквариума и увидеть полную картину
          элементов, что исключает необходимость в постоянном тестировании.
        </p>
        <NuxtImg
          src="/images/about/2021_1.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div>
          Весна 2021. 180 литров
        </div>
        <h2 class="text-h5 font-weight-regular my-6">
          О качестве
        </h2>
        <p>
          У вас может возникнуть вопрос: "О каком габитусе и сложности выращивания растений идет речь в проекте с
          названием Samomes?" Отвечу — о самом высоком уровне, какой только можно представить. Проект ставит перед собой
          цель помочь в достижении аквариума максимального уровня сложности.
        </p>
        <p>
          Все фотографии и видео на сайте — это мои собственные аквариумы или аквариумы людей, которые используют
          проект. Название "Samomes" — лишь историческое наследие, проект давно вырос за рамки простых самодельных
          рецептов.
        </p>
        <div class="w-sm-75 mx-sm-auto">
          <NuxtImg
            src="/images/about/2021_3.JPG"
            class="full-width-image mb-2"
            quality="85"
            sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
            loading="lazy"
          />
          <div>
            Лето 2021. 22 литра
          </div>
        </div>
        <h2 class="text-h5 font-weight-regular my-6">
          Ваш путь в аквариумистике
        </h2>
        <p>
          На своем пути вы будете принимать множество решений — растительный аквариум это не просто. Я хочу,
          чтобы Samomes стал вашим верным спутником в принятии правильных решений.
        </p>
        <p>
          У каждого аквариумиста свой путь: кто-то покупает готовые удобрения, кто-то делает все сам. Даже один человек
          может менять свои взгляды со временем — как это было со мной. Я менял удобрения, количество и типы аквариумов,
          подходы к обслуживанию. Вчера использовал страницу с рецептами, а сегодня интересует только подготовка
          осмотической воды. Никогда не знаешь, что ждет впереди!
        </p>
        <p>
          Вам придется пересчитывать дозировки сотни, а может и тысячи раз. Постоянно что-то корректировать и менять. Я
          хочу, чтобы Samomes помог вам всеми своими инструментами — или тем единственным, который нужен именно сейчас.
        </p>
        <p>
          Так вы сможете получать больше удовольствия от аквариума, а не тратить время на скучные расчеты.
        </p>
        <NuxtImg
          src="/images/about/2021_2.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div>
          Осень 2021. 120 литров
        </div>
        <h2 class="text-h5 font-weight-regular my-6">
          Благодарность
        </h2>
        <p>
          За годы существования проект прошел путь от никому не известного сайта до инструмента, которым пользуются
          тысячи аквариумистов по всему миру. География пользователей постоянно расширяется и уже давно вышла за океан.
        </p>
        <p>
          Я благодарен каждому, кто использует Samomes и делится своим опытом — именно ваша обратная связь помогает
          проекту становиться лучше.
        </p>
        <p class="my-10 text-right font-italic">
          Михаил Лапшин,<br>
          Основатель Samomes
        </p>
        <NuxtImg
          src="/images/about/2022_1.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div class="mb-2">
          Осень 2022. 35 литров
        </div>
        <NuxtImg
          src="/images/about/2023_1.JPG"
          class="full-width-image mb-2"
          quality="85"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
        />
        <div class="mb-2">
          Лето 2023. 20 литров
        </div>
        <p>
          Жизнь этого аквариума подробно показана на моем
          <a href="https://www.youtube.com/@lapshinmr" target="_blank">
            Youtube-канале.
          </a>
        </p>

        <!--        <p>-->
        <!--          Если вы всё-таки хотите научиться делать удобрения для аквариума своими руками и-->
        <!--          воспользоваться калькулятором, рекомендуем ознакомиться с представленными ниже ссылками-->
        <!--          на сайты и видеоматериалы YouTube.-->
        <!--        </p>-->
        <!--        <v-divider class="my-5" />-->
        <!--        <p class="my-8">-->
        <!--          Видео-->
        <!--        </p>-->
        <!--        <p class="d-flex flex-column body-2">-->
        <!--          <a-->
        <!--            class="mb-2"-->
        <!--            href="https://www.youtube.com/watch?v=GSLYotAT8Xs"-->
        <!--            target="_blank"-->
        <!--          >Промо видео проекта</a>-->
        <!--          <a-->
        <!--            class="mb-2"-->
        <!--            href="https://www.youtube.com/watch?v=Vyq-R0tv384"-->
        <!--            target="_blank"-->
        <!--          >Удобрение для аквариумных растений своими руками. Фосфор, Азот, Калий и Микро.</a>-->
        <!--          <a-->
        <!--            class="mb-2"-->
        <!--            href="https://www.youtube.com/watch?v=wslFKci51uo"-->
        <!--            target="_blank"-->
        <!--          >Как мы корректируем дозировку своих удобрений для аквариумных растений.</a>-->
        <!--          <a-->
        <!--            class="mb-2"-->
        <!--            href="https://www.youtube.com/watch?v=niAYM8DRv_w"-->
        <!--            target="_blank"-->
        <!--          >Удобрения в аквариуме! Как мы подаём и чего придерживаемся в своих аквариумах!</a>-->
        <!--          <a-->
        <!--            class="mb-2"-->
        <!--            href="https://www.youtube.com/watch?v=UlbCnqntrww"-->
        <!--            target="_blank"-->
        <!--          >Самомес. Удобрения NPK в аквариум.</a>-->
        <!--          <a-->
        <!--            class="mb-2"-->
        <!--            href="https://www.youtube.com/watch?v=YToPYOHs37U"-->
        <!--            target="_blank"-->
        <!--          >Макро удобрения для аквариумных растений</a>-->
        <!--        </p>-->
        <v-divider class="my-10" />
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
const { t } = useI18n();

useSeoMeta({
  title: t('meta.about.title'),
  description: t('meta.about.description'),
  keywords: t('meta.about.keywords'),
});
</script>

<style lang="sass" scoped>
@import 'assets/variables.sass'

p
  margin-bottom: 16px

.w-sm-60
  @media(min-width: $xs)
    width: 60%

.w-sm-35
  @media(min-width: $xs)
    width: 35%

.full-width-image
  width: 100%
  object-fit: cover
  display: block
</style>
