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
  <v-container
    min-height="100%"
    class="mb-12 position-relative"
  >
    <v-row>
      <PageTitle>
        Расписание
      </PageTitle>
      <client-only>
        <PageSubtitle v-if="scheduleStore.schedules.length === 0">
          У вас еще нет ни одного расписания
        </PageSubtitle>
        <PageText
          v-if="scheduleStore.schedules.length === 0"
          class="mb-16"
        >
          Начните с нажатия на кнопку «Добавить», чтобы добавить новое расписание.
        </PageText>
        <v-col
          sm="10"
          md="8"
          offset-sm="1"
          offset-md="2"
        >
          <ScheduleCard
            v-for="(schedule, index) in scheduleStore.schedules"
            :key="index"
            :schedule="schedule"
            :schedule-index="index"
            class="mb-10"
          />
        </v-col>
        <Guide>
          <p class="mb-2">
            Если у вас несколько бутылок с удобрениями, дозировки каждого удобрения отличаются друг от друга,
            да еще и несколько аквариумов, то можно довольно легко ошибиться с внесением удобрений.
          </p>
          <p class="mb-2">
            Удобный виджет поможет вам составить расписание на всю неделю и следить за тем, какие
            удобрения нужно внести.
          </p>
        </Guide>
      </client-only>
    </v-row>
    <AddButton :action="onAdd">
      Добавить расписание
    </AddButton>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
const { appRoutes } = useAppRoutes();
const { t } = useI18n();
const scheduleStore = useSchedulesStore();

function onAdd() {
  return router.push(`${appRoutes.value.dosing.path}`);
}

useSeoMeta({
  title: t('meta.schedules.title'),
  description: t('meta.schedules.description'),
  keywords: t('meta.schedules.keywords'),
});
</script>

<style lang="sass" scoped>
</style>
