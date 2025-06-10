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
  <div class="position-relative">
    <div
      ref="parallaxContainer"
      class="position-absolute left-0 right-0 top-0 parallax-container"
      style="z-index: -1; height: 100vh; overflow: hidden;"
    >
      <div
        ref="parallaxContent"
        class="parallax-content"
        :style="{ transform: `translateY(${parallaxOffset}px)` }"
      >
        <ScriptYouTubePlayer
          video-id="98gR9vmb3S0"
          trigger="immediate"
          :player-vars="{
            autoplay: 1,
            controls: 0,
            loop: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
          }"
        >
          <template #placeholder>
            <NuxtImg
              src="/image/makrandra-landing.jpeg"
              alt="Video Placeholder"
            />
          </template>
        </ScriptYouTubePlayer>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="section section--about position-relative"
          style="height: 100vh;"
        >
          <div
            class="about__content d-flex flex-column position-absolute"
            style="bottom: 150px;"
          >
            <h1 class="about__title">
              Самомес
            </h1>
            <h3 class="about__subtitle">
              калькулятор удобрений для растительного аквариума
            </h3>
            <!--            <h3 class="about__question">-->
            <!--              Рассчитаем калий вместе? 😉-->
            <!--            </h3>-->
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section section--goals bg-white"
        >
          <h2 class="text-h2 mb-4">
            Встречайте вашего надежного помощника!
          </h2>
          <p class="">
            Мы знаем как может быть тяжело аквариумисту подбирать дозировки удобрений для своего
            растительного аквариума. Самомес поможет вам
            делать это с легкостью и исключит ошибки в расчетах. Теперь вы сможете сосредоточиться
            на идее, а не на расчетах.
          </p>
        </v-col>
        <v-col cols="12">
          <h2 class="text-h2">
            В вашем распоряжении следующий набор инструментов
          </h2>
        </v-col>
        <v-col cols="12">
          <div class="d-flex">
            <NuxtImg
              src="/images/test.gif"
              width="300"
              alt="Main logotype NPK"
              class="mr-10"
            />
            <div class="">
              <nuxt-link
                :to="appRoutes.dosing.path"
                class="section__icon-link"
              >
                <h2 class="text-h2">
                  Дозирование
                </h2>
              </nuxt-link>
              <div class="section__text">
                <p class="font-italic">
                  Это сердце нашего сервиса
                </p>
                <p>
                  Здесь вы за минуты сможете подобрать дозировки всех ваших удобрений и увидеть комплексную
                  картину концентраций элементов в своем аквариуме
                </p>
                <p>
                  Удобрения могут быть как фирменными, так и самодельными.
                </p>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex">
            <NuxtImg
              src="/images/test.gif"
              width="300"
              alt="Main logotype NPK"
              class="mr-10"
            />
            <div class="">
              <nuxt-link
                :to="appRoutes.dosing.path"
                class="section__icon-link"
              >
                <h2 class="text-h2">
                  Расписание
                </h2>
              </nuxt-link>
              <div class="section__text">
                <p class="font-italic">
                  Все ваши дозировки в одном месте в виде удобного виджета
                </p>
                <p>
                  Теперь вам не составит никакого труда отслеживать график внесения удобрений во все ваши аквариумы
                </p>
              </div>
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
            :to="appRoutes.fertilizers.path"
            class="section__icon-link"
          >
            <Icon
              class="section__icon text-purple"
              :name="appRoutes.fertilizers.icon"
            />
          </nuxt-link>
          <div class="section__content">
            <nuxt-link :to="appRoutes.fertilizers.path">
              <h2 class="section__title">
                Удобрения
              </h2>
            </nuxt-link>
            <div class="section__text">
              <p class="font-italic">
                Мы собрали для вас большой список удобрений известных производителей, которые вы можете использовать
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
            :to="appRoutes.recipes.path"
            class="section__icon-link"
          >
            <Icon
              class="section__icon text-green"
              :name="appRoutes.recipes.icon"
            />
          </nuxt-link>
          <div class="section__content">
            <nuxt-link :to="appRoutes.recipes.path">
              <h2 class="section__title">
                Рецепты
              </h2>
            </nuxt-link>
            <div class="section__text">
              <p class="font-italic">
                Делаете удобрения сами?
              </p>
              <p>
                Мы создали вам очень удобный инструмент, с помощью которого вы сможете сделать даже
                очень сложное удобрение с легкостью за минуты.
              </p>
              <p>
                Из любых реагентов!
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
            :to="appRoutes.reminerals.path"
            class="section__icon-link"
          >
            <Icon
              class="section__icon text-blue-gray"
              :name="appRoutes.reminerals.icon"
            />
          </nuxt-link>
          <div class="section__content">
            <nuxt-link :to="appRoutes.reminerals.path">
              <h2 class="section__title">
                Реминерализаторы
              </h2>
            </nuxt-link>
            <div class="section__text">
              <p class="font-italic">
                Для тех кто любит контролировать абсолютно все детали в аквариуме мы создали
                инструмент с помощью которого вы сможете подготовить воду с любым составом.
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
            :to="appRoutes.remineralization.path"
            class="section__icon-link"
          >
            <Icon
              class="section__icon text-blue"
              :name="appRoutes.remineralization.icon"
            />
          </nuxt-link>
          <div class="section__content">
            <nuxt-link :to="appRoutes.remineralization.path">
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
          class="section section--tanks"
        >
          <nuxt-link
            :to="appRoutes.tanks.path"
            class="section__icon-link"
          >
            <Icon
              :name="appRoutes.tanks.icon"
              class="section__icon text-blue"
            />
          </nuxt-link>
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
  </div>
</template>

<script lang="ts" setup>
const { appRoutes } = useAppRoutes();

const isVKVisible = ref<boolean>(false);
const parallaxOffset = ref(0);

// Parallax effect for YouTube background
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  // Calculate parallax offset based on scroll position
  // The 0.5 factor controls the speed of the parallax effect (lower = slower)
  // Using requestAnimationFrame for smoother performance
  window.requestAnimationFrame(() => {
    parallaxOffset.value = window.scrollY * 0.5;
  });
};

watch(isVKVisible, (value) => {
  if (value) {
    const vk = document.createElement('script');
    vk.setAttribute('src', 'https://vk.com/js/api/openapi.js?169');
    vk.onload = () => {

      // @ts-expect-error VK.Widgets
      VK.Widgets.Group('vk_groups', { mode: 0, width: 'auto', height: '300' }, 205374081);
    };
    document.head.appendChild(vk);
  }
});

defineOptions({
  name: 'Home',
});

definePageMeta({
  layout: 'landing',
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

.parallax-container
  position: absolute
  left: 0
  right: 0
  top: 0
  height: 100vh
  overflow: hidden

.parallax-content
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 120vh  // Extra height to allow for movement
  will-change: transform  // Optimize for animations
  transform-style: preserve-3d  // Enhance 3D effect
  backface-visibility: hidden  // Prevent flickering

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
  color: white
  text-shadow: 1px 1px 1px black
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
      margin-bottom: 8px
      @media (min-width: $xs)
        font-size: 7rem !important
        line-height: 3.75rem
    .about__subtitle
      margin-left: 2rem
      @media (max-width: $xs)
        font-size: 0.9rem !important
      font-size: 1.5rem !important
      font-weight: 400
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
.section--reminerals
  .section__icon-link
    justify-content: flex-start
    @media (min-width: $xs)
      justify-content: center
.section--dosing
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
.section--questions
  .section__icon-link
    justify-content: flex-start
    @media (min-width: $xs)
      justify-content: center
</style>
