<template>
  <div class="phone-mockup">
    <div class="phone-mockup__frame">
      <div class="phone-mockup__screen">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="sass">
@import 'assets/variables.sass'

@keyframes phone-mockup-appear
  from
    opacity: 0
    transform: scale(0.8) translateY(50px)
  to
    opacity: 1
    transform: scale(1) translateY(0)

.phone-mockup
  display: flex
  justify-content: center
  align-items: center
  padding: 20px
  animation: phone-mockup-appear 1s ease-out

.phone-mockup__frame
  position: relative
  background: linear-gradient(145deg, #2c2c2c, #1a1a1a)
  border-radius: 40px
  box-shadow: 0 0 0 8px #1a1a1a, 0 0 0 12px #333, 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255, 255, 255, 0.1)
  padding: 6px 6px
  @media (max-width: $xs)
    padding: 6px 6px

.phone-mockup__screen
  position: relative
  width: 100%
  height: 100%
  background: #000
  border-radius: 32px
  overflow: hidden
  display: flex
  flex-direction: column
</style>
