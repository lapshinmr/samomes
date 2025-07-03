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
          src="/images/stavrogin.jpeg"
          class="full-width-image"
          quality="50"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          alt="Easiest potassium recipe"
          :placeholder="[50, 25, 75, 5]"
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
          Рецепт калия
        </h1>
        <h2 class="title font-weight-regular mb-6">
          самодельное удобрение с калием для растительного аквариума
        </h2>
        <div class="subtitle-2">
          Михаил Лапшин
        </div>
        <div class="subtitle-2 mb-10">
          19 марта 2024
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
          Эта статья завершает серию из трех самых простых рецептов домашних удобрений для аквариума с растениями,
          сосредотачиваясь на калии. Для ознакомления с рецептами
          <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
            нитрата
          </nuxt-link>
          и
          <nuxt-link :to="localePath('/articles/simplest-phosphate/')">
            фосфата
          </nuxt-link>.
          обратитесь к предыдущим публикациям.
        </p>

        <p>
          Калий относится к макроэлементам, таким как нитрат, фосфат, кальций и магний, благодаря его высоким
          концентрациям в аквариумной воде по сравнению с другими элементами. Обычно концентрация калия в воде аквариума
          колеблется от 5 до 30 мг/л, а рекомендуемые дозировки — от 2 до 20 мг/л (подробнее о дозировках см. в другой
          <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
            статье
          </nuxt-link>; не путайте дозировку с концентрацией).
        </p>

        <p>
          Мы будем говорить об аквариуме с дополнительной подачей <b>углекислого газа (CO2)</b>, поскольку они имеют
          отличную от аквариумов без подачи газа динамику роста растений и, соответственно, иные требования к питанию.
        </p>

        <p>
          Калий — это сложный вопрос в аквариумистике. Некоторые считают его крайне важным элементом и начинают вносить
          его сразу после запуска аквариума, в то время как другие видят в нем потенциальный вред и стремятся
          минимизировать его присутствие в удобрениях. Среди такого противоречивого мнения трудно определиться, как
          правильно использовать калий. В этой статье я постараюсь прояснить логику его применения и, если вы решите
          использовать его в своем аквариуме, предложу рецепт его приготовления.
        </p>

        <p class="mb-10">
          Во-первых, когда вы сталкиваетесь с сообщениями от других аквариумистов о положительном опыте использования
          калия в их растительных аквариумах, крайне важно (и да, это действительно ВАЖНО!) узнать о типе используемого
          <b>грунта</b> и <b>составе воды</b>. Без этой информации любой совет может оказаться не только бесполезным,
          но и потенциально опасным. Я, автор данного ресурса, неоднократно сталкивался с подобными проблемами, включая
          скручивание листьев, затыки макушек, растворение нижних листьев, появление дырок и т.д. Передозировка
          калия может быть столь же опасной, как и избыток микроудобрений, и некоторые виды растений могут быть потеряны
          безвозвратно.
        </p>

        <v-row class="mb-6">
          <v-col cols="10">
            <v-alert
              type="info"
              :icon="false"
              rounded="shaped"
              class="mb-0"
              variant="tonal"
            >
              Почему вопрос о грунте так важен?
            </v-alert>
          </v-col>
        </v-row>

        <p>
          Грунты могут быть питательными и нейтральными. В свою очередь, питательные
          грунты делятся на соилы и нейтральные грунты с питательной подложкой. Я не буду подробно останавливаться на
          питательной подложке как на промежуточном варианте между соилами и чисто нейтральными грунтами.
        </p>

        <p>
          Говоря о соилах, стоит отметить, что дополнительная подача калия часто приводит к заметному улучшению роста
          растений, позволяя использовать высокие дозы – иногда даже более 20 мг/л в неделю – без риска возникновения
          проблем. Это связано с тем, что соил эффективно абсорбирует калий, заменяя в своей структуре аммоний на калий.
          В результате растения активно усваивают аммоний – предпочтительный источник азота – через корни, что
          способствует их впечатляющему росту. Именно поэтому аквариумы на основе соила часто выглядят как волшебные
          подводные сады. Отсюда возникает мнение, что именно калий вызывает такой рост растений и что они потребляют
          его в больших количествах, хотя на самом деле калий выступает скорее в роли вспомогательного элемента.
        </p>

        <p>
          Возможно, существуют более сложные биологические процессы, подобные натриево-калиевому насосу, но я не
          собираюсь углубляться в эти аспекты, поскольку они не представляют существенного интереса для обычного
          аквариумиста. Большинству любителей аквариумов важно просто понимать, что им делать, без необходимости
          вдаваться в сложности биологических механизмов. К тому же, корневое питание может компенсировать недостатки
          листового питания. Растения способны компенсировать нехватку питательных веществ, блокированных избытком калия
          в воде, путем их усвоения через корни из питательного грунта. Это одна из причин, почему аквариумы на основе
          соила более терпимы к ошибкам аквариумиста.
        </p>

        <p>
          Я лично наблюдал, как мой друг-аквариумист вводил в аквариум на соиле до 70 мг/л калия в неделю, и к проблемам
          передозировки это привело лишь через несколько недель. При этом последствия передозировки оказались менее
          серьезными, чем могли бы быть при добавлении 20 мг/л калия в неделю в аквариум с нейтральным грунтом. Так мы
          подходим к обсуждению использования калия в аквариумах с нейтральным (пустым) грунтом.
        </p>

        <p>
          Под нейтральным грунтом обычно понимают кварц или, набравший популярность в последнее время, проппант
          или флоратон. Если эти материалы качественные и не
          влияют на химический состав воды, они могут быть отличным выбором.
        </p>

        <p class="mb-10">
          Относительно нейтрального грунта, я бы дал такой совет:
        </p>

        <v-alert
          type="error"
          class="mb-10"
          variant="tonal"
        >
          Не добавляйте калий дополнительно, если вы не уверены в его необходимости или если это не остаётся вашим
          последним вариантом!
        </v-alert>

        <p>
          Риск возникновения проблем значительно превышает потенциальную пользу. На основе личного опыта могу сказать,
          что при внесении калия в дозах от 2 мг/л до 20 мг/л в неделю на нейтральном грунте, начиная с дозы свыше 7
          мг/л при 30%-ной подмене воды, я сталкивался с серьёзными проблемами. При дозировке в 20 мг/л начинались
          необратимые процессы некроза, в результате которых погибали некоторые виды растений.
        </p>

        <p>
          Как же объяснить, что некоторые аквариумисты успешно вносят калий в аквариумы с нейтральным грунтом, не
          сталкиваясь с проблемами, и даже наблюдают улучшение роста растений? Ответ кроется во втором ключевом факторе
          аквариума — в <b>составе воды</b>. В случае с соилом, этот тип грунта способен компенсировать и корректировать
          недостатки воды, чего не скажешь об аквариумах на нейтральном грунте, где аквариумисту приходится
          контролировать больше параметров воды в более узких пределах.
        </p>

        <p>
          Вода в аквариуме может быть или из водопровода, что является наиболее распространенным вариантом, либо
          подготовленной с помощью системы обратного осмоса с последующей реминерализацией. В первом случае состав воды
          значительно зависит от региона проживания. Во втором — аквариумист самостоятельно формирует параметры воды,
          исходя из используемого реминерализатора. В обоих случаях состав воды может сильно различаться, включая и
          содержание натрия — антагониста калия, которое влияет на восприятие растениями калия.
          Обычно мы не располагаем точной информацией
          о концентрации натрия в воде и можем лишь строить предположения.
        </p>

        <v-divider class="my-10" />

        <p>
          Итак, в качестве общего правила для аквариума на нейтральном грунте я рекомендую не добавлять калий
          дополнительно, кроме случаев, когда вы
          абсолютно уверены в настройках вашего аквариума: освещении, CO2, фильтрации и составе воды с точки зрения
          временной и постоянной жёсткости, а также в правильности подачи макро- и микроэлементов. Другими словами, если
          вы уже опробовали все возможное и осталось только попробовать добавить калий. Но даже в таком случае вводите
          его постепенно и малыми дозами (не более 5 мг/л), с интервалом в две недели, чтобы точно наблюдать реакцию
          растений. Или если у вас есть знакомый аквариумист в вашем городе, который успешно использует калий в
          аналогичных условиях.
        </p>

        <p>
          Чаще всего на нейтральном грунте цель состоит в том, чтобы снизить содержание калия в удобрениях.
          Дозировки в 2-3 мг/л в неделю при 30% еженедельной подмене воды обычно достаточны для поддержания концентрации
          калия в диапазоне 5-10 мг/л, что считается наиболее безопасным диапазоном.
        </p>

        <p>
          В заключение, если у вас используется соил, можно добавлять калий до суммарных 15 мг/л в неделю —
          передозировка калия при таких условиях маловероятна. Если же у вас нейтральный грунт, изначально не добавляйте
          калий, делайте это только при наличии вышеупомянутых предпосылок.
        </p>

        <p>
          Если вы дочитали до сюда и всё ещё хотите добавить калий, позвольте предложить вам рецепт домашнего
          калийсодержащего удобрения. В форме ниже вы можете подставить объём своего аквариума и выбрать наиболее
          подходящую дозировку.
        </p>

        <p class="mb-10">
          Для приготовления калийного удобрения чаще всего используют сульфат калия (K<sub>2</sub>SO<sub>4</sub>). И
          мы тоже будем его использовать.
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
              v-model.number="unitConcs['K']"
              label="Дозировка"
              suffix="мг/л"
              variant="outlined"
              :disabled="typeof toggleDose === 'number'"
              @update:model-value="onInputKUnitConc"
            />
            <NumberField
              v-model="reagentK2SO4.amount"
              label="Масса нитрата калия"
              suffix="г"
              variant="outlined"
              :error="checkSolubilityError(reagentK2SO4)"
              :error-messages="getSolubilityErrorMessage(reagentK2SO4)"
              @update:model-value="onInputReagentAmount"
            />
          </v-col>
        </v-row>

        <v-alert
          type="success"
          icon="mdi-receipt-text"
          class="mt-4 mb-10"
          variant="tonal"
        >
          <template #prepend>
            <Icon
              name="mdi-receipt-text"
              size="24"
            />
          </template>
          Рецепт:
          <br><br>
          {{ reagentK2SO4.amount ? format(reagentK2SO4.amount) : '-' }} г сульфата калия (K<sub>2</sub>SO<sub>4</sub>)
          на {{ reagentH2O.amount }} мл.
          <br><br>
          1 мл данного удобрения повышает уровень калия на
          {{ unitConcs['K'] ? format(unitConcs['K']) : '-' }} мг/л
          в аквариуме объемом {{ reagentH2O.amount }} л
        </v-alert>

        <p>
          Для лучшего растворения калия рекомендую вскипятить воду и размешать в ней порошок.
          Мелкий осадок можно отфильтровать, используя ватный диск и воронку.
        </p>

        <p>
          Поздравляю! В вашей коллекции есть еще один рецепт.
        </p>

        <p class="mb-15">
          Здесь вы можете найти рецепты самодельного
          <NuxtLink :to="localePath('/articles/simplest-nitrate/')">
            нитрата
          </NuxtLink>
          и
          <NuxtLink :to="localePath('/articles/simplest-phosphate/')">
            фосфата
          </NuxtLink>.
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
          :to="localePath('/articles/simplest-phosphate/')"
        >
          <v-icon>mdi-chevron-left</v-icon> Предыдущая <span class="hidden-xs-only">статья</span>
        </v-btn>
        <v-btn
          color="primary"
          :to="localePath('/articles/no-tests-part-1/')"
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
const doseExamples: (number | string)[] = [0.1, 0.25, 0.5, OTHER_DOSE];
const toggleDose = ref<number>(0.25);
const unitConcs = ref<Partial<Record<IonType, number>>>({});

const recipeModel = reactive(new FertilizerRecipe(
  {
    name: '',
    description: '',
    tankVolume: 100,
    reagents: [
      reagents.find((reagent) => reagent.key === H2O),
      reagents.find((reagent) => reagent.key === 'K2SO4'),
    ],
  },
));

const reagentH2O = recipeModel.reagents[0];
const reagentK2SO4 = recipeModel.reagents[1];
reagentH2O.amount = 500;
reagentK2SO4.amount = 500;

unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagentK2SO4);

// TODO: move to the composables
const checkSolubilityError = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility
    ? `${t('validation.solubilityLimit')} - ${reagent.solubility} ${t('units.g/l')} ${t('common.for')} 25°С!`
    : '';
};

watch(() => reagentK2SO4.amount, () => {
  unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagentK2SO4);
});

watch(toggleDose, (value) => {
  if (typeof toggleDose.value === 'string') {
    return;
  }
  reagentK2SO4.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagentK2SO4, 'K'));
}, { immediate: true });

function onInputTankVolume() {
  reagentK2SO4.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['K'], reagentK2SO4, 'K'));
}

function onInputWaterVolume() {
  reagentK2SO4.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['K'], reagentK2SO4, 'K'));
}

function onInputReagentAmount() {
  reagentK2SO4.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['K'], reagentK2SO4, 'K'));
}

function onInputKUnitConc(value: number) {
  reagentK2SO4.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagentK2SO4, 'K'));
}

defineOptions({
  name: 'SimplestPotassiumPage',
});

useSeoMeta({
  title: t('meta.articles.potassium.title'),
  description: t('meta.articles.potassium.description'),
  keywords: t('meta.articles.potassium.keywords'),
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
