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
          class="parallax-video"
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
    <v-container
      fluid
      class="pa-3"
    >
      <v-row>
        <v-col
          cols="12"
          class="main-section position-relative"
          style="height: 100vh;"
        >
          <div class="main-section__content d-flex flex-column">
            <h1 class="main-section__title">
              Samomes
            </h1>
            <h3 class="main-section__subtitle">
              калькулятор удобрений для растительного аквариума
            </h3>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <h2 class="text-h4 text-sm-h2 mb-8 mb-sm-16 text-center">
            Встречайте вашего надежного помощника!
          </h2>
          <div class="d-flex flex-column align-center">
            <p class="w-sm-50 text-center mb-8">
              Мы знаем как может быть утомительно аквариумисту подбирать дозировки удобрений.
            </p>
            <p>
              Samomes поможет вам делать это с легкостью и исключит ошибки в расчетах.
            </p>
            <p class="w-sm-50 text-center mb-8">
              Теперь вы сможете сосредоточиться на идее, а не на расчетах.
            </p>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <h2 class="text-h4 text-sm-h2 mb-16 text-center">
            В вашем распоряжении<br>целый набор инструментов
          </h2>
          <v-row class="d-flex justify-center">
            <v-col
              cols="12"
              sm="4"
            >
              <v-card class="d-flex flex-column justify-center py-16">
                <NuxtLink
                  :to="appRoutes.dosing.path"
                  class="text-center text-primary mb-4"
                >
                  <Icon
                    :name="appRoutes.dosing.icon"
                    size="100"
                  />
                </NuxtLink>
                <div class="text-h5 text-center">
                  Дозирование
                </div>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-card class="d-flex flex-column justify-center py-16">
                <NuxtLink
                  :to="appRoutes.schedules.path"
                  class="text-center text-primary mb-4"
                >
                  <Icon
                    :name="appRoutes.schedules.icon"
                    size="100"
                  />
                </NuxtLink>
                <div class="text-h5 text-center">
                  Расписание
                </div>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-card class="d-flex flex-column justify-center py-16">
                <NuxtLink
                  :to="appRoutes.recipes.path"
                  class="text-center text-primary mb-4"
                >
                  <Icon
                    :name="appRoutes.recipes.icon"
                    size="100"
                  />
                </NuxtLink>
                <div class="text-h5 text-center">
                  Рецепты
                </div>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-card class="d-flex flex-column justify-center py-16">
                <NuxtLink
                  :to="appRoutes.fertilizers.path"
                  class="text-center text-primary mb-4"
                >
                  <Icon
                    :name="appRoutes.fertilizers.icon"
                    size="100"
                  />
                </NuxtLink>
                <div class="text-h5 text-center">
                  Удобрения
                </div>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-card class="d-flex flex-column justify-center py-16">
                <NuxtLink
                  :to="appRoutes.reminerals.path"
                  class="text-center text-primary mb-4"
                >
                  <Icon
                    :name="appRoutes.reminerals.icon"
                    size="100"
                  />
                </NuxtLink>
                <div class="text-h5 text-center">
                  Реминерализаторы
                </div>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-card class="d-flex flex-column justify-center py-16">
                <NuxtLink
                  :to="appRoutes.remineralization.path"
                  class="text-center text-primary mb-4"
                >
                  <Icon
                    :name="appRoutes.remineralization.icon"
                    size="100"
                  />
                </NuxtLink>
                <div class="text-h5 text-center">
                  Водоподготовка
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="text-h4 text-sm-h3 mt-16 text-center font-weight-regular">
                Все они работают как один организм!
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="order-1 order-sm-0 d-flex justify-center w-sm-50 mb-4 mb-sm-0">
              <div class="video-wrapper w-sm-50 elevation-4">
                <video
                  class="background-video"
                  autoplay
                  loop
                  controls
                  muted
                  width="100%"
                  height="auto"
                  controlslist="nodownload nofullscreen noremoteplayback"
                  disablepictureinpicture
                  @contextmenu.prevent
                >
                  <source src="/images/landing/dosing.webm" type="video/webm">
                  <source src="/images/landing/dosing.mp4" type="video/mp4">
                  Ваш браузер не поддерживает видео.
                </video>
                <div class="video-overlay" @click.prevent @contextmenu.prevent/>
              </div>
            </div>
            <div class="order-0 order-sm-1 w-sm-40 align-self-center">
              <nuxt-link :to="appRoutes.dosing.path">
                <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                  Дозирование
                </h2>
              </nuxt-link>
              <h3 class="text-h6 mb-4 mb-sm-0 text-center text-sm-left font-weight-regular">
                Подбирайте дозировки за минуту
              </h3>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="ml-sm-auto align-self-center w-sm-40">
              <nuxt-link :to="appRoutes.schedules.path">
                <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                  Расписание
                </h2>
              </nuxt-link>
              <h3 class="text-h6 mb-4 mb-sm-0 text-center text-sm-left font-weight-regular">
                Составьте график, чтобы не забыть внести удобрения
              </h3>
            </div>
            <div class="d-flex justify-center w-sm-50">
              <div class="video-wrapper w-sm-50 elevation-4">
                <video
                  class="background-video"
                  autoplay
                  loop
                  controls
                  muted
                  width="100%"
                  height="auto"
                  controlslist="nodownload nofullscreen noremoteplayback"
                  disablepictureinpicture
                  @contextmenu.prevent
                >
                  <source src="/images/landing/schedule.mov" type="video/mp4">
                  Ваш браузер не поддерживает видео.
                </video>
                <div class="video-overlay" @click.prevent @contextmenu.prevent/>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="order-1 order-sm-0 d-flex justify-center w-sm-50">
              <div class="video-wrapper w-sm-50 elevation-4">
                <video
                  class="background-video"
                  autoplay
                  loop
                  controls
                  muted
                  width="100%"
                  height="auto"
                  controlslist="nodownload nofullscreen noremoteplayback"
                  disablepictureinpicture
                  @contextmenu.prevent
                >
                  <source src="/images/landing/dosing.webm" type="video/webm">
                  <source src="/images/landing/dosing.mp4" type="video/mp4">
                  Ваш браузер не поддерживает видео.
                </video>
                <div class="video-overlay" @click.prevent @contextmenu.prevent/>
              </div>
            </div>
            <div class="order-0 ordre-sm-1 w-sm-40 align-self-center">
              <nuxt-link :to="appRoutes.fertilizers.path">
                <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                  Удобрения
                </h2>
              </nuxt-link>
              <h3 class="text-h6 mb-4 mb-sm-0 text-center text-sm-left font-weight-regular">
                Мы собрали для вас удобрения известных производителей в одном месте
              </h3>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="w-sm-40 ml-auto align-self-center">
              <nuxt-link :to="appRoutes.recipes.path">
                <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                  Рецепты
                </h2>
              </nuxt-link>
              <h3 class="text-h6 mb-4 mb-sm-10 text-center text-sm-left font-weight-regular">
                Делайте удобрения сами из любых реагентов
              </h3>
            </div>
            <div class="d-flex justify-center w-sm-50">
              <div class="video-wrapper w-sm-50 elevation-4">
                <video
                  class="background-video"
                  autoplay
                  loop
                  controls
                  muted
                  width="100%"
                  height="auto"
                  controlslist="nodownload nofullscreen noremoteplayback"
                  disablepictureinpicture
                  @contextmenu.prevent
                >
                  <source src="/images/landing/schedule.mov" type="video/mp4">
                  Ваш браузер не поддерживает видео.
                </video>
                <div class="video-overlay" @click.prevent @contextmenu.prevent/>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="order-1 order-sm-0 d-flex justify-center w-sm-50">
              <div class="video-wrapper w-sm-50 elevation-4">
                <video
                  class="background-video"
                  autoplay
                  loop
                  controls
                  muted
                  width="100%"
                  height="auto"
                  controlslist="nodownload nofullscreen noremoteplayback"
                  disablepictureinpicture
                  @contextmenu.prevent
                >
                  <source src="/images/landing/dosing.webm" type="video/webm">
                  <source src="/images/landing/dosing.mp4" type="video/mp4">
                  Ваш браузер не поддерживает видео.
                </video>
                <div class="video-overlay" @click.prevent @contextmenu.prevent/>
              </div>
            </div>
            <div class="w-sm-40 align-self-center">
              <nuxt-link :to="appRoutes.reminerals.path">
                <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                  Реминерализаторы
                </h2>
              </nuxt-link>
              <h3 class="text-h6 mb-4 mb-sm-10 text-center text-sm-left font-weight-regular">
                Создавайте идеальный состав воды
              </h3>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="w-sm-40 ml-auto align-self-center">
              <nuxt-link
                :to="appRoutes.remineralization.path"
                class="section__icon-link"
              >
                <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                  Водоподготовка
                </h2>
              </nuxt-link>
              <h3 class="text-h6 mb-4 mb-sm-0 text-center text-sm-left font-weight-regular">
                Для контроля жесткости воды
              </h3>
            </div>
            <div class="d-flex justify-center w-sm-50">
              <div class="video-wrapper w-sm-50 elevation-4">
                <video
                  class="background-video"
                  autoplay
                  loop
                  controls
                  muted
                  width="100%"
                  height="auto"
                  controlslist="nodownload nofullscreen noremoteplayback"
                  disablepictureinpicture
                  @contextmenu.prevent
                >
                  <source src="/images/landing/schedule.mov" type="video/mp4">
                  Ваш браузер не поддерживает видео.
                </video>
                <div class="video-overlay" @click.prevent @contextmenu.prevent/>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="section"
        >
          <div class="d-flex flex-column flex-sm-row">
            <div class="order-1 order-sm-0 w-sm-40 mx-sm-auto">
              <v-lazy v-model="isVKVisible">
                <div id="vk_groups" class="w-100" />
              </v-lazy>
            </div>
            <div class="order-0 order-sm-1 w-sm-50 align-self-center">
              <h2 class="text-h4 text-sm-h2 mb-4 mb-sm-10 text-primary text-center text-sm-left">
                Связаться с нами
              </h2>
              <div class="d-flex justify-space-between mt-auto pa-4 text-grey-darken-1 w-sm-50">
                <a href="https://t.me/samomes_calculator" target="_blank">
                  <Icon
                    name="mdi:telegram"
                    size="60"
                    class="text-primary"
                  />
                </a>
                <a href="https://vk.com/samomes" target="_blank">
                  <Icon
                    name="mdi:vk-circle"
                    size="60"
                    class="text-primary"
                  />
                </a>
                <a href="https://github.com/lapshinmr/samomes" target="_blank">
                  <Icon
                    name="mdi:github"
                    size="60"
                    class="text-primary"
                  />
                </a>
              </div>
            </div>
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

.w-40
  width: 40%

p
  margin-bottom: 12px

.video-wrapper
  position: relative
  width: 100%
  height: auto
  overflow: hidden
  //box-shadow: 0 1px 10px #B0BEC5

.background-video
  width: 100%
  height: auto
  display: block
  pointer-events: none

.video-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 10
  background: transparent
  cursor: default

// TODO: check this parallax
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
  height: 100vh
  will-change: transform
  transform-style: preserve-3d
  backface-visibility: hidden

.parallax-video
  @media (max-width: $xs)
    margin-left: -130%!important
    width: 390%!important

.main-section
  color: white
  text-shadow: 1px 1px 1px black
  @media (max-width: $xs)
    flex-direction: column
  .main-section__content
    position: absolute
    bottom: 150px
    left: 100px
    width: 60%
    @media (max-width: $xs)
      left: 24px
      bottom: 100px
      width: 100%
  .main-section__title
    font-size: 3rem !important
    line-height: 2.5rem
    letter-spacing: -0.0083333333em !important
    font-family: "Roboto", sans-serif !important
    font-weight: 300
    margin-bottom: 8px
    @media (min-width: $xs)
      font-size: 7rem !important
      line-height: 3.75rem
  .main-section__subtitle
    margin-left: 2rem
    @media (max-width: $xs)
      font-size: 0.9rem !important
      margin-left: 1rem
    font-size: 1.5rem !important
    font-weight: 400

.section
  min-height: 400px
  background: linear-gradient(180deg, #f4faf5 0%, #ffffff 100%)
  border-top: 1px solid #C8E6C9
  padding-top: 150px
  padding-bottom: 150px
  @media (max-width: $xs)
    padding-top: 50px
    padding-bottom: 50px
</style>
