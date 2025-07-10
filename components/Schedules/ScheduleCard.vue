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
  <v-card
    v-bind="$attrs"
    elevation="4"
  >
    <v-card-title class="d-flex justify-space-between align-start font-weight-regular flex-nowrap">
      <div class="no-break">
        {{ schedule.dosing.tank.name }}
      </div>
    </v-card-title>
    <v-card-subtitle class="mt-n3">
      {{ startDate }} - {{ endDate }}
    </v-card-subtitle>
    <v-card-text class="mt-6 mb-4">
      <v-window v-model="curDay">
        <v-window-item
          v-for="(day, dayIndex) in days"
          :key="`${dayIndex}-content`"
        >
          <v-row>
            <v-col
              cols="12"
              sm="10"
              offset-sm="1"
            >
              <div class="d-flex flex-column text-h4 text-center mb-4">
                <div>
                  <span style="text-transform: capitalize;">{{ getWeekday(day.date, locale) }}</span>,
                  <span>{{ formatDate(day.date, locale) }}</span>
                </div>
              </div>
              <template v-if="dayIndex === 0">
                <div
                  v-for="(data, fertilizerName) in schedule.waterChangeDay.fertilizers"
                  :key="`water_change_${fertilizerName}`"
                >
                  <ScheduleButton
                    :fertilizer-name="fertilizerName"
                    :amount="data.amount"
                    :status="data.status"
                    @click="onClickWaterChangeDay(scheduleIndex, fertilizerName)"
                  >
                    {{ fertilizerName }}
                  </ScheduleButton>
                </div>
              </template>
              <div
                v-for="(data, fertilizerName) in schedule.days[dayIndex]?.fertilizers || {}"
                :key="`water_change_${fertilizerName}`"
              >
                <ScheduleButton
                  :fertilizer-name="fertilizerName"
                  :amount="data.amount"
                  :status="data.status"
                  @click="onClickDay(scheduleIndex, dayIndex, fertilizerName)"
                >
                  {{ fertilizerName }}
                </ScheduleButton>
              </div>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <template v-if="days.length > 1">
        <v-btn
          :disabled="curDay === 0"
          @click="prevStep"
        >
          {{ t('buttons.back') }}
        </v-btn>
        <v-btn
          :disabled="curDay === slidesTotal - 1"
          class="ml-0 ml-sm-3"
          @click="nextStep"
        >
          {{ t('buttons.next') }}
        </v-btn>
      </template>
      <v-btn
        class="ml-0 ml-sm-3"
        @click="onScheduleOpen"
      >
        {{ t('buttons.edit' )}}
      </v-btn>
    </v-card-actions>
    <v-progress-linear
      color="primary"
      :model-value="scheduleProgress"
    />
  </v-card>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const router = useRouter();
const dosingStore = useDosingStore();
const schedulesStore = useSchedulesStore();
const { appRoutes } = useAppRoutes();

const props = defineProps<{
  schedule: ScheduleType;
  scheduleIndex: number;
}>();

const curDay = ref(0);

const startDate = computed(() => {
  const startDateObject = new Date(props.schedule.startDate);
  return formatDate(startDateObject, locale.value);
});

const endDate = computed(() => {
  const startDateObject = new Date(props.schedule.startDate);
  const endDateObject = new Date(startDateObject.setDate(startDateObject.getDate() + props.schedule.dosing.daysTotal - 1));
  return formatDate(endDateObject, locale.value);
});

const days = computed(() => {
  let [firstDay, ...otherDays] = JSON.parse(JSON.stringify(props.schedule.days));
  if (!firstDay) {
    firstDay = { ...props.schedule.waterChangeDay };
  } else {
    firstDay.fertilizers = { ...props.schedule.waterChangeDay.fertilizers, ...(firstDay?.fertilizers || {}) };
  }
  return [firstDay, ...(otherDays || [])];
});

const slidesTotal = computed(() => {
  return days.value.length;
});

const scheduleProgress = computed(() => (curDay.value + 1) / slidesTotal.value * 100);


onMounted(() => {
  curDay.value = findCurActiveDay();
});

function findCurActiveDay() {
  const dayIndex = days.value.findIndex(
    (day) => typedValues(day.fertilizers).some(
      (data) => data.status === AmountStatus.ACTIVE && data.amount,
    ),
  );
  if (dayIndex === -1) {
    return slidesTotal.value - 1;
  }
  return dayIndex;
}

function onClickDay(scheduleIndex: number, dayIndex: number, fertilizerName: string) {
  schedulesStore.toggleDay(scheduleIndex, dayIndex, fertilizerName);
}

function onClickWaterChangeDay(scheduleIndex: number, fertilizerName: string) {
  schedulesStore.toggleWaterChangeDay(scheduleIndex, fertilizerName);
}

function prevStep() {
  if (curDay.value >= 1) {
    curDay.value -= 1;
  }
}

function nextStep() {
  if (curDay.value < slidesTotal.value - 1) {
    curDay.value += 1;
  }
}

async function onScheduleOpen() {
  dosingStore.setDaysTotal(props.schedule.dosing.daysTotal);
  dosingStore.setFertilizersRegime(props.schedule.dosing.fertilizersRegime);
  dosingStore.setTank(props.schedule.dosing.tank);
  dosingStore.setDoses(props.schedule.dosing.doses);
  await router.push(`${appRoutes.value.dosing.path}?schedule=${props.scheduleIndex}`);
}

defineOptions({
  name: 'ScheduleCard',
});
</script>

<style lang="sass">
</style>
