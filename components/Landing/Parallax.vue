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
      <ScriptYouTubePlayer
        video-id="98gR9vmb3S0"
        trigger="immediate"
        class="parallax__video"
        :player-vars="{
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: '98gR9vmb3S0',
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          rel: 0,
          mute: 1,
        }"
        @ready="onYoutubeReady"
      />
      <NuxtImg
        v-if="!isYoutubeReady"
        src="/images/landing/makrandra-landing.jpeg"
        alt="Video Placeholder"
        class="parallax__image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isYoutubeReady = ref<boolean>(false);

// Parallax effect for YouTube background
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

function onYoutubeReady() {
  isYoutubeReady.value = true;
}

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
    will-change: transform
    transform-style: preserve-3d
    backface-visibility: hidden

  .parallax__video
    position: absolute!important
    top: 50%
    left: 50%
    width: 577.78%!important
    height: 100%!important
    min-width: 100%
    min-height: 100%
    transform: translate(-50%, -50%)
    pointer-events: none

  .parallax__image
    position: absolute!important
    top: 50%
    left: 50%
    height: 100%!important
    transform: translate(-50%, -50%)
    pointer-events: none

</style>
