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
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-btn
          color="primary"
          class="mr-0"
          square
          to="/tanks/"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <PageTitle>
        <template v-if="isCreate">
          Новый аквариум
        </template>
        <template v-else>
          {{ tank.name }}
        </template>
      </PageTitle>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-form ref="tankForm">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="tank.name"
                :label="$t('tanks.dialog.name')"
                hide-details="auto"
                clearable
                :hint="$t('tanks.dialog.nameHint')"
                :rules="rulesName"
              />
            </v-col>
            <v-col
              cols="12"
              class="pt-0"
            >
              <p class="grey--text text--darken-1 body-2 mt-8 mt-md-4 mb-0">
                Теперь нужно добавить объем воды в аквариуме. Это общий объем воды, который получилось залить
                в аквариум при запуске.
                Он состоит из объема водяного столба, воды в грунте и внешнем фильтре за вычетом
                всех декораций аквариума.
                <br>
                <br>
                Проще всего узнать точный объем воды, измерив его при запуске аквариума с помощью емкости
                или весов. Но если вы не знаете точное значение, то его можно
                рассчитать с помощью формы, представленной ниже.
                <br>
                <br>
                Не переживайте! Вам не обязательно знать точный объем. Погрешность в 10-20% не приведет к
                большим ошибкам в расчетах удобрений, водорослям или чему-то плохому, т.к. в конечном итоге
                мы не можем очень точно контролировать поглощение удобрений и опираемся на внешний вид растений.
              </p>
              <NumberField
                v-model="tank.volume"
                :label="$t('tanks.dialog.volume')"
                :suffix="$t('units.l')"
                hide-details="auto"
                :hint="$t('tanks.dialog.volumeHint')"
                :rules="volumeRules"
              />
            </v-col>
            <v-col
              cols="12"
              class="text-center pb-0"
            >
              <div class="d-flex align-center my-3">
                <v-divider />
                <div class="mx-2">
                  {{ $t('tanks.dialog.orSizes') }}
                </div>
                <v-divider />
              </div>
            </v-col>
            <v-col
              cols="12"
              class="pt-0"
            >
              <NumberField
                v-model="tank.length"
                :precision-show="1"
                :label="$t('tanks.dialog.length')"
                :suffix="$t('units.cm')"
                hide-details="auto"
              />
              <NumberField
                v-model="tank.width"
                :precision-show="1"
                :label="$t('tanks.dialog.width')"
                :suffix="$t('units.cm')"
                hide-details="auto"
              />
              <NumberField
                v-model="tank.height"
                :precision-show="1"
                :label="$t('tanks.dialog.height')"
                :suffix="$t('units.cm')"
                :hint="$t('tanks.dialog.heightHint')"
                hide-details="auto"
              />
              <NumberField
                v-model="tank.glassThickness"
                :precision-show="1"
                :label="$t('tanks.dialog.glassThickness')"
                :suffix="$t('units.mm')"
                hide-details="auto"
              />
            </v-col>
            <v-col
              cols="12"
              class="text-center pb-0"
            >
              <div class="d-flex align-center my-3">
                <v-divider />
                <div class="mx-2">
                  Дополнительные объемы
                </div>
                <v-divider />
              </div>
            </v-col>
            <v-col
              cols="12"
              class="pt-0"
            >
              <NumberField
                v-model="tank.filter"
                :precision-show="1"
                :label="$t('tanks.dialog.filter')"
                :suffix="$t('units.l')"
                :hint="$t('tanks.dialog.filterHint')"
                hide-details="auto"
              />
              <NumberField
                v-model="tank.soil"
                :precision-show="1"
                :label="$t('tanks.dialog.soil')"
                :suffix="$t('units.l')"
                :hint="$t('tanks.dialog.soilHint')"
                hide-details="auto"
              />
              <div class="d-flex">
                <NumberField
                  :model-value="tank.waterChange"
                  @update:model-value="onInputWaterChange"
                  :precision-show="1"
                  :label="$t('tanks.dialog.waterChange')"
                  suffix="%"
                  hide-details="auto"
                />
                <NumberField
                  :model-value="tank.waterChangeVolume"
                  @update:model-value="onInputWaterChangeVolume"
                  :precision-show="1"
                  :label="$t('tanks.dialog.waterChangeVolume')"
                  :suffix="$t('units.l')"
                  hide-details="auto"
                  class="ml-2"
                />
              </div>
            </v-col>
            <v-expand-transition>
              <v-col
                class="text-right"
                cols="12"
              >
                <v-btn
                  v-if="!isCreate"
                  @click="removeTank"
                >
                  {{ $t('buttons.remove') }}
                </v-btn>
                <v-btn
                  v-if="!isCreate"
                  @click="editTank"
                  color="primary"
                  class="ml-2"
                >
                  {{ $t('buttons.save') }}
                </v-btn>
                <v-btn
                  v-if="isCreate"
                  @click="addTank"
                  color="primary"
                >
                  {{ $t('buttons.save') }}
                </v-btn>
              </v-col>
            </v-expand-transition>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTanksStore } from '~/stores/tanks';
import { useSnackbarStore } from '~/stores/snackbar';

const route = useRoute();
const router = useRouter();
const tanksStore = useTanksStore();
const snackbarStore = useSnackbarStore();
const tankForm = ref(null);

const tank = ref({
  name: null,
  volume: null,
  waterChange: null,
  waterChangeVolume: null,
  length: null,
  height: null,
  width: null,
  glassThickness: null,
  filter: null,
  soil: null,
});

const isCreate = computed(() => route.params.id === 'create');
const tankIndex = computed(() => route.params.id);

const isEdit = computed(() => {
  const names = tanksStore.tanks.map((item) => item.name);
  const index = names.indexOf(tank.value.name);
  return index === +tankIndex.value;
});

const isExist = computed(() => {
  const names = tanksStore.tanks.map((item) => item.name);
  const nameFound = names.find((item) => item === tank.value.name);
  return nameFound && !isEdit.value;
});

const dimensions = computed(() => `
  ${tank.value.length}
  ${tank.value.height}
  ${tank.value.width}
  ${tank.value.glassThickness}
  ${tank.value.filter}
  ${tank.value.soil}
`);

const rulesName = [
  (v) => !!v || 'Введите название',
  () => !isExist.value || 'Аквариум с таким названием уже существует',
];

const volumeRules = [
  (v) => !!v || 'Введите объем в литрах',
];

watch(dimensions, () => {
  let volume = 0;
  if (tank.value.length && tank.value.height && tank.value.width) {
    volume += Math.round(
      ((
        (tank.value.length - (2 * tank.value.glassThickness) / 10)
        * tank.value.height
        * (tank.value.width - (2 * tank.value.glassThickness) / 10)
      ) / 1000) * 100,
    ) / 100;
  }
  if (tank.value.soil) {
    volume += tank.value.soil;
  }
  if (tank.value.filter) {
    volume += tank.value.filter;
  }
  if (volume) {
    tank.value.volume = volume;
  }
});

onMounted(async () => {
  if (!isCreate.value) {
    const existingTank = tanksStore.tanks[tankIndex.value];
    if (!existingTank) {
      await router.push('/tanks/');
    }
    tank.value = JSON.parse(JSON.stringify({ ...existingTank }));
  }
});

function onInputWaterChange(value) {
  if (value < 0) {
    return;
  }
  if (value <= 100) {
    tank.value.waterChange = +value;
    tank.value.waterChangeVolume = (tank.value.volume * value) / 100;
  }
}

function onInputWaterChangeVolume(value) {
  if (value < 0) {
    return;
  }
  if (value <= tank.value.volume) {
    tank.value.waterChangeVolume = +value;
    tank.value.waterChange = (value / tank.value.volume) * 100;
  }
}

function addTank() {
  if (tankForm.value.validate()) {
    tanksStore.addTank({ ...tank.value });
    snackbarStore.showSuccess('Аквариум добавлен');
    router.push('/tanks/');
  }
}

function editTank() {
  if (tankForm.value.validate()) {
    tanksStore.editTank({
      index: tankIndex.value,
      tank: { ...tank.value },
    });
    snackbarStore.showSuccess('Аквариум изменен');
    router.push('/tanks/');
  }
}

function removeTank() {
  tanksStore.removeTank(tankIndex.value);
  router.push('/tanks/');
  snackbarStore.showSuccess('Аквариум удален');
}
</script>

<style lang="sass" scoped>
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>