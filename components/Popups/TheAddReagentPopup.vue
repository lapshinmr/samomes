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
  <v-dialog
    v-model="model"
    width="500"
  >
    <v-card>
      <v-card-title>
        Новый реагент
      </v-card-title>
      <v-card-text>
        <v-tabs
          v-model="tab"
          align-tabs="center"
          color="deep-purple-accent-4"
        >
          <v-tab :value="ReagentTypeName.FORMULA">Формула</v-tab>
          <v-tab :value="ReagentTypeName.COMPOUND">Готовый состав</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="ReagentTypeName.FORMULA">
            <v-form ref="reagentFormulaFormRef">
              <v-text-field
                v-model="formula"
                label="Введите формулу *"
                variant="underlined"
                :error="isFormulaError"
                :error-messages="getFormulaErrorMessage(isFormulaError)"
                :rules="[required, isFormulaExist]"
                hide-details="auto"
              />
              <div
                v-if="formulaModel !== undefined"
                class="mt-4"
              >
                <span
                  v-for="[ion, fraction] in Object.entries(formulaModel.fraction)"
                  :key="ion"
                >
                  {{ ion }}: {{ format(fraction * 100) }}%
                </span>
              </div>
              <v-radio-group
                v-model="isLiquid"
                inline
                color="primary"
                class="mt-3 ml-n2"
                hide-details="auto"
                :rules="[required]"
              >
                <v-radio
                  label="Порошок"
                  :value="false"
                />
                <v-radio
                  label="Жидкость"
                  :value="true"
                />
              </v-radio-group>
              <v-expand-transition>
                <NumberField
                  v-if="isLiquid"
                  v-model="density"
                  label="Введите плотность"
                  hint="Например, плотность воды равна 1 г/см3"
                  :rules="[required]"
                />
              </v-expand-transition>
              <v-text-field
                v-model="name"
                label="Введите название *"
                variant="underlined"
                :rules="[required, isNameExist]"
              />
              <!--                    <v-text-field-->
              <!--                      v-model="cation"-->
              <!--                      label="Катион"-->
              <!--                      variant="underlined"-->
              <!--                    />-->
              <!--                    <v-text-field-->
              <!--                      v-model="anion"-->
              <!--                      label="Анион"-->
              <!--                      variant="underlined"-->
              <!--                    />-->
              <v-expand-transition>
                <NumberField
                  v-if="!isLiquid"
                  v-model="solubility"
                  label="Введите значение растворимости"
                  hint="Обычно растворимость берется для 25°С в литре воды"
                />
              </v-expand-transition>
              <!--                    <v-select-->
              <!--                      v-model="HCO3"-->
              <!--                      :items="[1, 2]"-->
              <!--                      label="Количество гидрокарбонатов"-->
              <!--                      variant="underlined"-->
              <!--                    />-->
            </v-form>
          </v-tabs-window-item>
          <v-tabs-window-item :value="ReagentTypeName.COMPOUND">
            <v-form ref="reagentCompoundFormRef">
              <v-text-field
                v-model="name"
                label="Введите название"
                variant="underlined"
                :rules="[required, isNameExist]"
              />
              <v-radio-group
                v-model="isLiquid"
                inline
                color="primary"
                class="mt-3 ml-n2"
                hide-details="auto"
                :rules="[required]"
              >
                <v-radio
                  label="Порошок"
                  :value="false"
                />
                <v-radio
                  label="Жидкость"
                  :value="true"
                />
              </v-radio-group>
              <v-combobox
                :model-value="ionsChosen"
                :items="allIons"
                item-title="ion"
                variant="underlined"
                :label="t('fertilizers.page.ionsInput')"
                :hint="t('fertilizers.page.ionsInputHint')"
                persistent-hint
                hide-details="auto"
                multiple
                chips
                closable-chips
                :rules="[required]"
                class="mb-4"
                @update:model-value="onInputIon"
              />
              <NumberField
                v-for="item in ionsChosen"
                :key="item.ion"
                v-model="item.conc"
                :label="item.ion"
                suffix="%"
                variant="underlined"
                persistent-placeholder
                placeholder="0"
                hide-details="auto"
                :rules="[required, positive]"
                class="mb-2"
              />
            </v-form>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          variant="text"
          @click="model = false"
        >
          Закрыть
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="onAddReagent"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const { required, positive } = useValidation();
const { checkName } = useReagents();
const { t } = useI18n();
const reagentsStore = useReagentsStore();
const snackbarStore = useSnackbarStore();

const tab = ref(ReagentTypeName.FORMULA);
const reagentFormulaFormRef = ref();
const reagentCompoundFormRef = ref();

// COMMON
const name = ref<string>();
const isLiquid = ref<boolean>();

// FORMULA
const formula = ref<string>();
const density = ref<number>();
// const cation = ref<CationType>();
// const anion = ref<AnionType>();
// const HCO3 = ref<number>();
const solubility = ref<number>();
const formulaModel = ref<InstanceType<typeof MolecularFormula>>();
const isFormulaError = ref<boolean>(false);

watch(() => formula.value, () => {
  isFormulaError.value = false;
  try {
    formulaModel.value = new MolecularFormula(formula.value);
    if (isNaN(formulaModel.value.mass)) {
      isFormulaError.value = true;
    }
  } catch {
    isFormulaError.value = true;
  }
}, { deep: true });

function getFormulaErrorMessage(isError: boolean) {
  return isError ? 'Формула введена неправильно. Правильный формат формулы CaSO4(H2O)2 или CaSO6H4.' : '';
}

// COMPOUND
const ionsChosen = ref<{ ion: IonType, conc: number }[]>([]);

const allIons = computed(() => {
  const result: { ion: IonType, conc: number }[] = [];
  for (const ion of ALL_IONS as IonType[]) {
    result.push({ ion: ion, conc: null });
  }
  return result;
});

function onInputIon(value: []) {
  if (value.length > ionsChosen.value.length) {
    const lastIon = [...value].pop();
    // Skip if search value is a string
    if (typeof lastIon === 'string') {
      return;
    }
  }
  ionsChosen.value = value;
}

// Validation
const isFormulaExist = () => !checkName(formula.value) || t('reagents.formulaExists');
const isNameExist = () => !checkName(name.value) || t('reagents.nameExists');

async function onAddReagent() {
  if (tab.value === ReagentTypeName.FORMULA) {
    const { valid } = await reagentFormulaFormRef.value.validate();
    if (!valid) {
      snackbarStore.showWarning(t('common.isFormErrors'));
      return;
    }
    reagentsStore.addReagent({
      type: ReagentTypeName.FORMULA,
      key: formula.value,
      name: name.value,
      isLiquid: isLiquid.value,
      density: density.value,
      solubility: solubility.value,
      // cation: { key: cation.value, number: 1 },
      // anion: { key: anion.value, number: 1 },
      // HCO3: HCO3.value,
    });
    reagentFormulaFormRef.value.reset();
  } else if (tab.value === ReagentTypeName.COMPOUND) {
    const { valid } = await reagentCompoundFormRef.value.validate();
    if (!valid) {
      snackbarStore.showWarning(t('common.isFormErrors'));
      return;
    }
    const ions: Partial<Record<IonType, number>> = {};
    ionsChosen.value.forEach(({ ion, conc }) => ions[ion] = conc / 100);
    reagentsStore.addReagent({
      type: ReagentTypeName.COMPOUND,
      key: name.value,
      name: name.value,
      isLiquid: isLiquid.value,
      ions,
    });
    reagentCompoundFormRef.value.reset();
  }
  model.value = false;
}
</script>

<style scoped lang="sass">

</style>
