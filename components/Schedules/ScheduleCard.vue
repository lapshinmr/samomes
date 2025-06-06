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
          v-for="(day, dayIndex) in schedule.days"
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
                  <span style="text-transform: capitalize;">{{ getWeekday(day.date) }}</span>,
                  <span>{{ formatDate(day.date) }}</span>
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
                v-for="(data, fertilizerName) in day.fertilizers"
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
    <v-card-actions>
      <template v-if="schedule.dosing.fertilizersRegime !== FertilizersRegime.ONCE_A_WEEK">
        <v-btn
          :disabled="curDay === 0"
          class="ml-auto"
          @click="prevStep"
        >
          Назад
        </v-btn>
        <v-btn
          :disabled="curDay === slidesTotal - 1"
          class="ml-0 ml-sm-3"
          @click="nextStep"
        >
          Далее
        </v-btn>
      </template>
      <v-btn
        class="ml-0 ml-sm-3"
        @click="onScheduleOpen"
      >
        Открыть
      </v-btn>
    </v-card-actions>
    <v-progress-linear
      color="primary"
      :model-value="scheduleProgress"
    />
  </v-card>
</template>

<script lang="ts" setup>
const { t } = useI18n();
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
  return formatDate(startDateObject);
});

const endDate = computed(() => {
  const startDateObject = new Date(props.schedule.startDate);
  const endDateObject = new Date(startDateObject.setDate(startDateObject.getDate() + props.schedule.dosing.daysTotal - 1));
  return formatDate(endDateObject);
});

const slidesTotal = computed(() => {
  return props.schedule.dosing.daysTotal;
});

const scheduleProgress = computed(() => (curDay.value + 1) / slidesTotal.value * 100);

const days = computed(() => {
  const [firstDay, ...otherDays] = JSON.parse(JSON.stringify(props.schedule.days));
  firstDay.fertilizers = { ...props.schedule.waterChangeDay.fertilizers, ...firstDay.fertilizers };
  return [firstDay, ...otherDays];
});

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
