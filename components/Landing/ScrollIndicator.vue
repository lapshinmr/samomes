<template>
  <v-fade-transition>
    <div
      v-if="isIcon"
      class="scroll-indicator"
    >
      <Icon
        name="mdi-chevron-double-down"
        class="scroll-indicator__icon"
      />
    </div>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isIcon = ref(false);

const checkScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop > 100 || scrollTop + windowHeight >= documentHeight - 100) {
    isIcon.value = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    isIcon.value = true;
  }, 2000);

  window.addEventListener('scroll', checkScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped lang="sass">
@import 'assets/variables.sass'

.scroll-indicator
  position: absolute
  bottom: 15px
  z-index: 1000
  left: 50%
  transform: translateX(-50%)

  .scroll-indicator__icon
    height: 70px
    width: 70px
    animation: bounce 2s infinite
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important
    transition: all 0.3s ease
    @media (max-width: $xs)
      height: 50px
      width: 50px

@keyframes bounce
  0%, 20%, 50%, 80%, 100%
    transform: translateY(0)

  40%
    transform: translateY(-8px)

  60%
    transform: translateY(-4px)
</style>
