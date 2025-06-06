<template>
  <v-combobox
    ref="comboboxContainer"
    v-bind="$attrs"
    :menu="menu"
    :search="search"
    @focus="scrollToTop"
    @update:menu="onMenu"
    @update:search="onSearch"
  />
</template>

<script setup lang="ts">
const menu = ref<boolean>();
const search = ref<string>();
const initialViewportHeight = ref<number>();

const comboboxContainer = ref();

const { mobile } = useDisplay();
const goTo = useGoTo();

onMounted(() => {
  initialViewportHeight.value = getViewportHeight();
});

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight;
}

function onMenu(event: boolean) {
  if (event === false) {
    search.value = '';
  }
  const curViewportHeight = getViewportHeight();
  const isMobileKeyboardOpened = mobile.value === true && initialViewportHeight.value > curViewportHeight;
  if (isMobileKeyboardOpened) {
    menu.value = true;
  } else {
    menu.value = event;
  }
}

function onSearch(event: string) {
  search.value = event;
}

const scrollToTop = () => {
  if (mobile.value === true) {
    scrollBy({
      top: 175,
      behavior: 'smooth',
    });
  }
};
</script>

<style scoped lang="sass">

</style>
