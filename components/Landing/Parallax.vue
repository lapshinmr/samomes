<template>
  <div
    ref="parallaxContainer"
    class="parallax"
  >
    <div
      ref="parallaxContent"
      class="parallax__content"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    >
      <client-only>
        <video
          v-if="isIntroVideo"
          ref="introVideoRef"
          autoplay
          muted
          preload="auto"
          playsinline
          class="parallax__video"
          @canplay="onIntroVideoReady"
          @ended="onIntroVideoEnded"
        >
          <source src="/video/intro-video.mp4" type="video/mp4">
        </video>
        <video
          v-if="isMainVideo"
          autoplay
          muted
          loop
          preload="auto"
          playsinline
          class="parallax__video"
          @canplay="onMainVideoReady"
        >
          <source src="/video/main-video.mp4" type="video/mp4" >
        </video>
      </client-only>
      <NuxtImg
        v-if="isPhotoPlaceholder"
        src="/images/landing/placeholder.jpeg"
        alt="Video Placeholder"
        quality="100"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        class="parallax__image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Background handling
const isPhotoPlaceholder = ref<boolean>(true);
const introVideoRef = ref(null);
const isIntroVideo = ref<boolean>(true);
const isIntroVideoEnded = ref<boolean>(false);
const isMainVideo = ref<boolean>(true);

const onIntroVideoReady = () => {
  isPhotoPlaceholder.value = false;
};

const onIntroVideoEnded = () => {
  isIntroVideoEnded.value = true;
  if (isMainVideo.value) {
    isIntroVideo.value = false;
  } else {
    introVideoRef.value?.play();
  }
};

const onMainVideoReady = () => {
  isMainVideo.value = true;
  if (isIntroVideoEnded.value) {
    isIntroVideo.value = false;
  }
};

// Parallax effect for video background
const parallaxOffset = ref(0);

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

</script>

<style scoped lang="sass">
.parallax
  z-index: -1
  position: absolute
  left: 0
  right: 0
  top: 0
  height: 100vh
  overflow: hidden

  .parallax__content
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 100vh
    overflow: hidden

  .parallax__video
    object-fit: cover
    height: 100%
    width: 100%

  .parallax__image
    object-fit: cover
    height: 100%
    width: 100%
    position: absolute!important
    top: 50%
    left: 50%
    height: 100%!important
    transform: translate(-50%, -50%)
    pointer-events: none

</style>
