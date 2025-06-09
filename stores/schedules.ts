/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
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
