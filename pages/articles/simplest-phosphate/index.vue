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
  <v-container class="post">
    <v-row>
      <v-col>
        <NuxtImg
          src="/images/indica.jpeg"
          class="full-width-image"
          quality="50"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          alt="Easiest phosphate recipe"
          :placeholder="[50, 25, 75, 5]"
          format="webp"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <v-btn
          color="primary"
          class="mr-0"
          square
          :to="localePath('/articles/')"
        >
          <v-icon>mdi-chevron-left</v-icon> Все статьи
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
      >
        <h1 class="text-h4 text-md-h3 mt-md-10">
          Простейший рецепт фосфата PO<sub>4</sub>
        </h1>
        <h2 class="title font-weight-regular mb-6">
          самодельное удобрение с фосфатом для растительного аквариума
        </h2>
        <div class="subtitle-2">
          Михаил Лапшин
        </div>
        <div class="subtitle-2 mb-10">
          11 марта 2024
        </div>

        <v-alert
          type="success"
          prominent
          :icon="false"
          class="mb-6"
          variant="tonal"
        >
          Для тех, кто хочет создать более сложный рецепт, есть основная
          <nuxt-link :to="localePath('/recipes/')">
            страница
          </nuxt-link>
          с рецептами.
        </v-alert>

        <p>
          В этой статье мы продолжим рассматривать самые простые способы приготовления домашних удобрений и теперь
          поговорим о фосфате — элементе, на который аквариумисты-любители водных растений обращают внимание во вторую
          очередь.
        </p>

        <p>
          Позвольте мне сделать небольшое уточнение относительно того, что я подразумеваю под "вторым важным элементом".
          Здесь я имею в виду, что фосфат часто становится вторым элементом, на который вы обратите внимание при покупке
          удобрений, подборе дозировок или проведении анализа воды. Относительно влияния на рост растений, нельзя
          сказать, что существует самый важный или неважный элемент: отсутствие даже одного необходимого элемента может
          негативно сказаться на росте растений. Обычно первым элементом, на который обращают внимание, является нитрат,
          а следующим — фосфат.
        </p>

        <p>
          Переходя к рецепту, его приготовление такое же простое, как и в случае с нитратом.
          Если вы никогда не занимались
          приготовлением домашних удобрений и не знакомы с процессом изготовления
          <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
            нитратного удобрения
          </nuxt-link>, я рекомендую
          начать именно с него, поскольку в данной статье будет пояснений меньше.
        </p>

        <p>
          Обычно фосфат вносят в аквариум в десять раз меньше, чем нитрат, если мы говорим о наиболее часто используемом
          нейтральном грунте. Так, если в неделю вы добавляете 7 мг/л
          нитрата, то фосфат следует давать в количестве 0.7 мг/л, то есть в пропорции 1 к 10 к нитрату. Я не советую
          полагаться на тесты; лучше наблюдать за состоянием растений. Ведь ваши глаза — самый надежный инструмент для
          оценки потребностей аквариума.
        </p>

        <p>
          Для приготовления фосфат-содержащего удобрения чаще всего используют монофосфат калия
          (KH<sub>2</sub>PO<sub>4</sub>), поскольку он
          является наиболее распространенным и доступным реагентом. Кроме того, он содержит меньше калия по сравнению с
          другими фосфорсодержащими удобрениями. В большинстве случаев я бы рекомендовал избегать добавления
          дополнительного калия, если вы не уверены в его необходимости для вашего аквариума.
        </p>

        <p class="mb-10">
          Ставший уже классическим -
          <a href="https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html ">рецепт</a>
          с сайта Aqua Botanic выглядит следующим образом:
        </p>

        <v-alert
          type="info"
          icon="mdi-receipt-text"
          class="mb-10"
          variant="tonal"
        >
          <template #prepend>
            <Icon
              name="mdi-receipt-text"
              size="24"
            />
          </template>
          7.01 грамма монофосфата калия (KH<sub>2</sub>PO<sub>4</sub>) на 1000 мл
        </v-alert>

        <p>
          Этот рецепт был разработан так, чтобы 1 мл раствора увеличивает уровень фосфата на 0.05 мг/л в аквариуме
          объёмом 100 литров.
        </p>

        <p class="mb-10">
          А теперь, аналогично описанию в статье про
          <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
            самодельный нитрат,
          </nuxt-link> вы можете составить свой рецепт с помощью ниже представленной формы:
        </p>

        <v-row>
          <v-col
            cols="12"
            md="10"
            offset-md="1"
          >
            <NumberField
              v-model="recipeModel.tankVolume"
              label="Объем аквариума"
              suffix="л"
              variant="outlined"
              @update:model-value="onInputTankVolume"
            />
            <NumberField
              v-model="reagentH2O.amount"
              label="Объем удобрения"
              suffix="мл"
              variant="outlined"
              @update:model-value="onInputWaterVolume"
            />
            <v-radio-group
              v-model="toggleDose"
              inline
              color="primary"
              class="mt-0"
            >
              <v-radio
                v-for="dose in doseExamples"
                :key="dose"
                :label="`${dose} ${dose !== OTHER_DOSE ? 'мг/л' : ''}`"
                :value="dose"
              />
            </v-radio-group>
            <NumberField
              :model-value="unitConcs['PO4']"
              label="Дозировка"
              suffix="мг/л"
              variant="outlined"
              :disabled="typeof toggleDose === 'number'"
              @update:model-value="onInputPO4UnitConc"
            />
            <NumberField
              v-model="reagentKH2PO4.amount"
              label="Масса монофосфата калия"
              suffix="г"
              variant="outlined"
              :error="checkSolubilityError(reagentKH2PO4)"
              :error-messages="getSolubilityErrorMessage(reagentKH2PO4)"
              @update:model-value="onInputReagentAmount"
            />
          </v-col>
        </v-row>

        <v-alert
          type="success"
          icon="mdi-receipt-text"
          class="mt-4 mb-10"
        >
          <template #prepend>
            <Icon
              name="mdi-receipt-text"
              size="24"
            />
          </template>
          Рецепт:
          <br><br>
          {{ reagentKH2PO4.amount ? format(reagentKH2PO4.amount) : '-' }}
          г монофосфата калия (KH<sub>2</sub>PO<sub>4</sub>) на {{ reagentH2O.amount }} мл.<br><br>
          1 мл данного удобрения повышает уровень фосфата на
          {{ unitConcs['PO4'] ? format(unitConcs['PO4'], 2) : '-' }} мг/л и калия на
          {{ unitConcs['K'] ? format(unitConcs['K'], 2) : '-' }} мг/л в аквариуме объемом
          {{ recipeModel.tankVolume }} л
        </v-alert>

        <p>
          Вот так просто вы создали свой второй рецепт. Остается только приготовить его.
        </p>

        <p class="mb-15">
          Продолжайте и у вас все получится 👍
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
        class="d-flex justify-space-between my-15"
      >
        <v-btn
          color="primary"
          :to="localePath('/articles/simplest-nitrate/')"
        >
          <v-icon>mdi-chevron-left</v-icon> Предыдущая <span class="hidden-xs-only">статья</span>
        </v-btn>
        <v-btn
          color="primary"
          :to="localePath('/articles/potassium/')"
        >
          Следующая <span class="hidden-xs-only">статья</span> <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const { getReagents } = useReagents();
const INITIAL_REAGENT_AMOUNT = 0;
const reagents = getReagents(INITIAL_REAGENT_AMOUNT);

const OTHER_DOSE = 'другая';
const doseExamples: (number | string)[] = [0.025, 0.05, 0.1, OTHER_DOSE];
const toggleDose = ref<number>(0.05);
const unitConcs = ref<Partial<Record<IonType, number>>>({});

const recipeModel = reactive(new FertilizerRecipe(
  {
    name: '',
    description: '',
    tankVolume: 100,
    reagents: [
      reagents.find((reagent) => reagent.key === H2O),
      reagents.find((reagent) => reagent.key === 'KH2PO4'),
    ],
  },
));

const reagentH2O = recipeModel.reagents[0];
const reagentKH2PO4 = recipeModel.reagents[1];
reagentH2O.amount = 500;
reagentKH2PO4.amount = 500;

unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagentKH2PO4);

// TODO: move to the composables
const checkSolubilityError = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility
    ? `${t('validation.solubilityLimit')} - ${reagent.solubility} ${t('units.g/l')} ${t('common.for')} 25°С!`
    : '';
};

watch(() => reagentKH2PO4.amount, () => {
  unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagentKH2PO4);
});

watch(toggleDose, (value) => {
  if (typeof toggleDose.value === 'string') {
    return;
  }
  reagentKH2PO4.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagentKH2PO4, 'PO4'));
}, { immediate: true });

function onInputTankVolume() {
  reagentKH2PO4.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['PO4'], reagentKH2PO4, 'PO4'));
}

function onInputWaterVolume() {
  reagentKH2PO4.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['PO4'], reagentKH2PO4, 'PO4'));
}

function onInputReagentAmount() {
  reagentKH2PO4.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['PO4'], reagentKH2PO4, 'PO4'));
}

function onInputPO4UnitConc(value: number) {
  reagentKH2PO4.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagentKH2PO4, 'PO4'));
}

defineOptions({
  name: 'SimplestPhosphatePage',
});

useSeoMeta({
  title: t('meta.articles.phosphate.title'),
  description: t('meta.articles.phosphate.description'),
  keywords: t('meta.articles.phosphate.keywords'),
});
</script>

<style lang="sass" scoped>
.post
  .post__title
    font-family: "Lexend", sans-serif !important
p
  margin-bottom: 16px
.full-width-image
  width: 100%
  object-fit: cover
  display: block
</style>
