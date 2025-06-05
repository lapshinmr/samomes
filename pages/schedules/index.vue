<!--
  Samomes

  Copyright (C) 2025 Mikhail Lapshin

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
          У вас нет еще ни одного расписания
        </PageSubtitle>
        <PageText
          v-if="scheduleStore.schedules.length === 0"
          class="mb-16"
        >
          Расписание
        </PageText>
        <v-col
          sm="8"
          offset-sm="2"
        >
          <Schedule
            v-for="(schedule, index) in scheduleStore.schedules"
            :key="index"
            :schedule="schedule"
            :schedule-index="index"
            class="mb-10"
          />
        </v-col>
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
const scheduleStore = useSchedulesStore();

function onAdd() {
  return router.push(`${appRoutes.value.dosing.path}`);
}

definePageMeta({
  title: 'Расписание внесений удобрений в аквариум',
  meta: [
    {
      name: 'description',
      content: 'Если у вас несколько бутылок с удобрениями, дозировки каждого удобрения отличаются друг от друга ' +
        'и несколько аквариумов, то можно довольно легко ошибиться с внесением удобрений. Удобный виджет поможет ' +
        'вам составить расписание на всю неделю и следить за тем, какие удобрения нужно внести.',
    },
    {
      name: 'keywords',
      content: 'аквариум, удобрения, расписание внесения, дозировки, планирование удобрений',
    },
  ],
});
</script>

<style lang="sass" scoped>
</style>
