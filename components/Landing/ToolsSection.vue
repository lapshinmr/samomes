<template>
  <v-col
    cols="12"
    class="section"
  >
    <h2 class="text-h4 text-sm-h2 mb-10 text-center">
      {{ t('landing.toolsSection.title') }}
    </h2>
    <div class="text-h5 my-10 text-center font-weight-regular">
      {{ t('landing.toolsSection.subtitle') }}
    </div>
    <v-row class="d-flex justify-center">
      <ToolCard
        :link="appRoutes.dosing.path"
        :icon="appRoutes.dosing.icon"
        :title="t(`routes.${appRoutes.dosing.key}`)"
        :subtitle="t('landing.toolsSection.dosingSubtitle')"
      />
      <ToolCard
        :link="appRoutes.schedules.path"
        :icon="appRoutes.schedules.icon"
        :title="t(`routes.${appRoutes.schedules.key}`)"
        :subtitle="t('landing.toolsSection.schedulesSubtitle')"
      />
      <ToolCard
        :link="appRoutes.fertilizers.path"
        :icon="appRoutes.fertilizers.icon"
        :title="t(`routes.${appRoutes.fertilizers.key}`)"
        :subtitle="t('landing.toolsSection.fertilizersSubtitle')"
      />
      <ToolCard
        :link="appRoutes.recipes.path"
        :icon="appRoutes.recipes.icon"
        :title="t(`routes.${appRoutes.recipes.key}`)"
        :subtitle="t('landing.toolsSection.recipesSubtitle')"
      />
      <ToolCard
        :link="appRoutes.reminerals.path"
        :icon="appRoutes.reminerals.icon"
        :title="t(`routes.${appRoutes.reminerals.key}`)"
        :subtitle="t('landing.toolsSection.remineralsSubtitle')"
      />
      <ToolCard
        :link="appRoutes.hardness.path"
        :icon="appRoutes.hardness.icon"
        :title="t(`routes.${appRoutes.hardness.key}`)"
        :subtitle="t('landing.toolsSection.hardnessSubtitle')"
      />
    </v-row>
  </v-col>
</template>

<script setup lang="ts">
const { appRoutes } = useAppRoutes();
const { t } = useI18n();
</script>

<style scoped lang="sass">

</style>
