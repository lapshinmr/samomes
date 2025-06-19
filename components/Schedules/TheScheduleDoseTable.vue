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
  <div>
    <v-text-field
      :model-value="scheduleModel.startDate"
      type="date"
      label="Выберите дату подмены"
      class="mb-4"
      @update:model-value="onDate"
    />
    <v-expand-transition>
      <div v-if="scheduleModel.startDate">
        <v-table>
          <thead>
            <tr>
              <th class="text-center pl-0">
                Дни
              </th>
              <th
                v-for="dose in scheduleModel.dosing.doses"
                :key="dose.fertilizer.name"
                class="text-center"
              >
                {{ dose.fertilizer.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="scheduleModel.dosing.fertilizersRegime === FertilizersRegime.ONCE_A_WEEK
                || scheduleModel.dosing.fertilizersRegime === FertilizersRegime.MIX"
            >
              <td class="pl-0 text-center">
                Подмена
              </td>
              <td
                v-for="dose in scheduleModel.dosing.doses"
                :key="`water_change_${dose.fertilizer.name}`"
                class="text-center"
              >
                {{ scheduleModel.waterChangeDay.fertilizers[dose.fertilizer.name]?.amount || '—' }}
              </td>
            </tr>
            <template v-if="scheduleModel.days.length > 0">
              <tr
                v-for="day in scheduleModel.days"
                :key="day.date"
              >
                <td class="pl-0 text-center">
                  <div class="d-flex flex-column">
                    <span style="text-transform: capitalize;">{{ getWeekday(day.date) }}</span>
                    <span>{{ formatDate(day.date) }}</span>
                  </div>
                </td>
                <td
                  v-for="dose in scheduleModel.dosing.doses"
                  :key="dose.fertilizer.name + day"
                  class="text-center"
                >
                  <div
                    v-if="day.fertilizers[dose.fertilizer.name]?.amount !== undefined"
                    class="d-flex justify-center align-center"
                  >
                    <div style="width: 50px;">
                      <NumberField
                        v-model="day.fertilizers[dose.fertilizer.name].amount"
                      />
                    </div>
                    <v-checkbox
                      v-model="day.fertilizers[dose.fertilizer.name].selected"
                      color="primary"
                      dense
                      hide-details="auto"
                      class="mt-0 ml-1"
                      style="display: inline-block;"
                      @update:model-value="onToggleCheckbox(dose.fertilizer.name, day.fertilizers[dose.fertilizer.name])"
                    />
                  </div>
                  <template v-else>
                    —
                  </template>
                </td>
              </tr>
              <tr>
                <td class="font-weight-medium">
                  Total
                </td>
                <td
                  v-for="dose in scheduleModel.dosing.doses"
                  :key="dose.fertilizer.name"
                  class="text-center"
                >
                  <template v-if="scheduleModel.daysAmountTotal[dose.fertilizer.name]">
                    <div class="d-flex flex-column align-center">
                      <div>
                        <span
                          :class="{
                            'text-warning':
                              format(scheduleModel.daysAmountTotal[dose.fertilizer.name]) !== format(dose.amount)
                          }"
                        >
                          {{ format(scheduleModel.daysAmountTotal[dose.fertilizer.name]) }}
                        </span> / <span class="font-weight-medium">{{ format(dose.amount) }}</span>
                      </div>
                      <div
                        class="text-blue cursor-pointer"
                        @click="scheduleModel.resetDaysAmount(dose.fertilizer.name)"
                      >
                        Сбросить
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    —
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
        <div class="d-flex mt-10">
          <v-btn
            v-if="isScheduleEdit"
            color="error"
            @click="onRemoveSchedule"
          >
            {{ t('buttons.remove') }}
          </v-btn>
          <v-btn
            class="ml-auto mr-2 ml-sm-auto"
            :class="{
              'mr-auto mr-sm-2': isScheduleEdit,
            }"
            @click="router.push(appRoutes.schedules.path)"
          >
            {{ t('buttons.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="onSaveSchedule"
          >
            {{ t('buttons.save') }}
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { appRoutes } = useAppRoutes();

const schedulesStore = useSchedulesStore();
const snackbarStore = useSnackbarStore();

const props = defineProps<{
  dosing: InstanceType<typeof Dosing>;
}>();

const scheduleIndex = ref();

const scheduleModel = reactive(new Schedule(
  props.dosing,
));

const isScheduleEdit = computed(() => {
  return !isNaN(scheduleIndex.value);
});

watch(() => props.dosing, () => {
  scheduleModel.dosing = props.dosing;
  if (scheduleModel.startDate) {
    scheduleModel.initWaterChangeDay();
    scheduleModel.initDays();
  }
});

onMounted(() => {
  scheduleIndex.value = +route.query.schedule;
  if (!isNaN(scheduleIndex.value)) {
    const curSchedule = JSON.parse(JSON.stringify(schedulesStore.schedules[scheduleIndex.value]));
    if (curSchedule) {
      scheduleModel.startDate = curSchedule.startDate;
      scheduleModel.waterChangeDay = curSchedule.waterChangeDay;
      scheduleModel.days = curSchedule.days;
    }
  } else {
    scheduleModel.startDate = getDate(new Date());
    scheduleModel.initWaterChangeDay();
    scheduleModel.initDays();
  }
});

function onDate(value: string) {
  if (value) {
    scheduleModel.startDate = value;
    scheduleModel.initWaterChangeDay();
    if (scheduleModel.days.length > 0) {
      scheduleModel.updateDays();
    } else {
      scheduleModel.initDays();
    }
  }
}

async function onSaveSchedule() {
  if (isScheduleEdit.value) {
    schedulesStore.editSchedule(scheduleIndex.value, scheduleModel.toJson());
  } else {
    schedulesStore.saveSchedule(scheduleModel.toJson());
  }
  await router.push(appRoutes.value.schedules.path);
}

// TODO: add type to fertilizerData
function onToggleCheckbox(fertilizerName: string, fertilizerData) {
  if (!fertilizerData.selected) {
    fertilizerData.amount = 0;
  }
  scheduleModel.spreadDayAmounts(fertilizerName);
}

async function onRemoveSchedule() {
  schedulesStore.removeSchedule(scheduleIndex.value);
  snackbarStore.showSuccess('Расписание удалено');
  await router.push(appRoutes.value.schedules.path);
}

defineOptions({
  name: 'TheScheduleDoseTable',
});
</script>

<style scoped>

</style>
