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
    <Parallax />
    <v-container
      fluid
      class="pa-3"
    >
      <v-row>
        <MainSection />
        <ToolsSection />
        <DosingSection />
        <SchedulesSection />
        <FertilizersSection />
        <RecipesSection />
        <RemineralsSection />
        <HardnessSection />
        <ContactUsSection />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineOptions({
  name: 'LandingPage',
});

useSeoMeta({
  title: t('meta.landing.title'),
  description: t('meta.landing.description'),
  keywords: t('meta.landing.keywords'),
});

definePageMeta({
  layout: 'landing',
});
</script>

<style lang="sass">
@import 'assets/variables.sass'

.w-40
  width: 40%

.w-sm-40
  @media (min-width: $xs)
    width: 40%

p
  margin-bottom: 12px

.section
  min-height: 400px
  background: linear-gradient(180deg, #f4faf5 0%, #ffffff 100%)
  border-top: 1px solid #C8E6C9
  padding-top: 150px
  padding-bottom: 150px
  @media (max-width: $xs)
    padding-top: 100px
    padding-bottom: 100px
</style>
