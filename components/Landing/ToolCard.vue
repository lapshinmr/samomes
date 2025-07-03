<template>
  <v-col
    cols="12"
    sm="6"
    md="4"
  >
    <v-card
      class="d-flex flex-column justify-center text-center py-16 card"
      :to="link"
    >
      <div class="text-primary mb-4">
        <Icon
          :name="icon"
          size="100"
        />
      </div>
      <div class="text-h5 mb-4">
        {{ title }}
      </div>
      <div class="text-subtitle text-grey-darken-1">
        {{ subtitle }}
      </div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  link: string;
  icon: string;
  title: string;
  subtitle: string;
}>();

defineOptions({
  name: 'ToolCard',
});
</script>

<style scoped lang="sass">
@import 'assets/variables.sass'

.card
  @media(min-width: $xs)
    max-height: 322px
</style>
