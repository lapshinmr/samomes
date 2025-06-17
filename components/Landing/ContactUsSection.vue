<template>
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
          {{ t('landing.contactUsSection.title') }}
        </h2>
        <div class="d-flex justify-space-between my-8 mt-sm-auto pa-4 text-grey-darken-1 w-sm-50">
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
</template>

<script setup lang="ts">
const { t } = useI18n();

const isVKVisible = ref<boolean>(false);

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

</script>

<style scoped lang="sass">

</style>
