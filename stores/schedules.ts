/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { acceptHMRUpdate, defineStore } from 'pinia';

export const useSchedulesStore = defineStore(
  'schedules',
  () => {
    const schedules = ref<ScheduleType[]>([]);

    const isSchedules = computed(() => schedules.value.length > 0);

    function saveSchedule(schedule: ScheduleType) {
      schedules.value.push(schedule);
    }

    function editSchedule(index: number, schedule: ScheduleType) {
      schedules.value[index] = schedule;
    }

    const removeSchedule = (index: number) => {
      schedules.value.splice(index, 1);
    };

    function toggleDay(scheduleIndex: number, dayIndex: number, fertilizerName: string) {
      const curFertilizer = schedules
        .value[scheduleIndex]
        .days[dayIndex]
        .fertilizers[fertilizerName];
      curFertilizer.status = (curFertilizer.status + 1) % 2;
    }

    function toggleWaterChangeDay(scheduleIndex: number, fertilizerName: string) {
      const curFertilizer = schedules
        .value[scheduleIndex]
        .waterChangeDay
        .fertilizers[fertilizerName];
      curFertilizer.status = (curFertilizer.status + 1) % 2;
    }

    return {
      schedules,
      isSchedules,
      saveSchedule,
      editSchedule,
      toggleDay,
      toggleWaterChangeDay,
      removeSchedule,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSchedulesStore, import.meta.hot));
}
