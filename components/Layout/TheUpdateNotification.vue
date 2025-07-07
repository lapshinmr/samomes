<template>
  <v-snackbar
    v-model="isNeedRefresh"
    timeout="-1"
    :location="mdAndUp ? 'right' : 'bottom'"
  >
    <div class="d-flex flex-column flex-md-row align-md-center">
      <div class="mb-4 mb-md-0">
        Доступно обновление
      </div>
      <div class="d-flex justify-space-between">
        <v-btn
          variant="outlined"
          size="small"
          class="ml-md-2 mr-2"
          @click="onSkip"
        >
          Позже
        </v-btn>
        <v-btn
          variant="outlined"
          size="small"
          @click="onRefresh"
        >
          Обновить
        </v-btn>
      </div>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
const { mdAndUp } = useDisplay();
const { $pwa } = useNuxtApp();

const isNeedRefresh = ref<boolean>(false);

onMounted(async () => {
  isNeedRefresh.value = $pwa.needRefresh;
});

function onRefresh() {
  $pwa.updateServiceWorker();
}

function onSkip() {
  isNeedRefresh.value = false;
}

</script>

<style scoped lang="sass">

</style>
