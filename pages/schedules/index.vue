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
  <v-container class="mb-12">
    <v-row>
      <page-title>
        Расписание
      </page-title>
      <client-only>
        <v-col
          v-if="schedules.length === 0"
          cols="12"
          md="8"
          offset-md="2"
        >
          <p
            class="mb-8"
            :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
          >
            У вас еще нет ни одного расписания
          </p>
        </v-col>
        <v-col
          v-else
          cols="12"
          md="8"
          offset-md="2"
        >
          <Schedule
            v-for="(schedule, index) in schedules"
            :schedule-index="index"
            :key="index"
          />
        </v-col>
        <the-guide>
          На этой странице можно составить расписание внесения удобрений в аквариум.
          <br>
          <br>
          Калькулятор сам рассчитает концентрации элементов, по которым можно прикинуть дозировки вносимых
          удобрений. А так же предложит составить расписание.
        </the-guide>
      </client-only>
    </v-row>

    <add-button :action="openAddSchedule">
      Добавить расписание
    </add-button>
  </v-container>
</template>

<script>
import Schedule from '~/components/Schedule.vue';
import { mapState } from 'vuex';

export default {
  name: 'Schedules',
  components: {
    Schedule,
  },
  head() {
    return {
      title: 'Дозировка и расписание удобрений в аквариуме',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Создавайте и управляйте расписаниями внесения удобрений для вашего аквариума.'
            + 'Калькулятор поможет рассчитать концентрации элементов и определить оптимальные '
            + 'дозировки для здорового роста растений.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'аквариум, удобрения, расписание внесения, дозировки, планирование удобрений',
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'schedules',
    ]),
  },
  methods: {
    openAddSchedule() {
      return this.$router.push('/schedules/create/');
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
