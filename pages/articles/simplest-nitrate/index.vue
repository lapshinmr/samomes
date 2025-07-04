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
          src="/images/makrandra.jpeg"
          class="full-width-image"
          quality="50"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          alt="Easiest nitrate recipe"
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
          Простейший рецепт нитрата NO<sub>3</sub>
        </h1>
        <h2 class="title font-weight-regular mb-6">
          самодельное удобрение с нитратом для растительного аквариума
        </h2>
        <div class="subtitle-2">
          Михаил Лапшин
        </div>
        <div class="subtitle-2 mb-10">
          8 апреля 2023 (обновлено 11 марта 2024)
        </div>

        <v-alert
          type="success"
          :icon="false"
          variant="tonal"
          class="mb-6"
        >
          Для тех, кто хочет создать более сложный рецепт, есть основная
          <nuxt-link :to="localePath('/recipes/')">
            страница
          </nuxt-link>
          с рецептами.
        </v-alert>

        <p>
          Данная статья посвящена самому простому рецепту жидкого удобрения, содержащего нитрат.
          Нитрат - один из ключевых элементов, на которые обращает внимание аквариумист-травник,
          поскольку растения используют его в больших количествах по сравнению с другими элементами.
        </p>

        <p class="mb-10">
          Я постараюсь объяснить базовые принципы создания домашнего удобрения с нитратом, чтобы
          любой аквариумист, даже без специальных знаний в области химии, мог сделать его самостоятельно.
        </p>

        <v-row class="mb-6">
          <v-col cols="10">
            <v-alert
              type="info"
              :icon="false"
              rounded="shaped"
              variant="tonal"
              class="mb-0"
            >
              Я: У меня в школе была тройка по химии. Она меня пугает.
              Объясни мне самые-самые основы, пожалуйста!
            </v-alert>
          </v-col>
          <v-col
            cols="10"
            offset="2"
          >
            <v-alert
              type="success"
              :icon="false"
              rounded="shaped"
              variant="tonal"
            >
              С удовольствием! Сейчас подробно объясню.
            </v-alert>
          </v-col>
        </v-row>

        <p>
          Моя цель - не только предоставить рецепт нитратного удобрения для аквариума, но и поделиться
          пониманием того, что рецепт не является неизменным правилом, которому нужно строго следовать.
          Это всего лишь отправная точка! Если вы измените концентрацию нитрата в данном рецепте,
          это не испортит его, а, наоборот, поможет подобрать дозировку для вашего собственного аквариума.
        </p>

        <p class="mb-10">
          Для тех, кто только начинает знакомиться с темой, и для тех, кто не имеет глубоких познаний в химии,
          я постараюсь объяснить, что такое концентрация, применяя простые формулировки.
        </p>

        <v-alert
          type="info"
          class="mb-10"
          prominent
          variant="tonal"
        >
          Концентрация - это показатель, который отражает, сколько удобрения содержится в вашем
          растворе и насколько он насыщенный или разбавленный.
        </v-alert>

        <p>
          Концентрация влияет на порцию удобрения, которую вы будете заливать в аквариум.
          Эта порция называется дозировкой или дозой. Когда говорят о дозировках, то
          обычно это несколько <b>мл</b> в день или несколько десятков мл в неделю.
        </p>

        <p>
          Если ваш аквариум мал, но удобрение сильно концентрировано, вам потребуется вносить его очень малыми
          дозами, используя инсулиновый шприц или пипетку, особенно если планируется ежедневное внесение.
          Приготовив литр такого удобрения и используя всего 1 мл в день, вы столкнетесь с проблемой его порчи
          до того, как оно будет полностью использовано, поскольку, скорее всего, удобрение приготовлено
          без добавления сильных консервантов. В результате через 2-3 месяца в банке может появиться
          плесень или белый грибок.
        </p>

        <p>
          В противоположной ситуации, если аквариум велик, а удобрение разбавлено (имеет низкую концентрацию),
          потребуется вносить большое количество удобрения и часто готовить новую порцию. Литр удобрения
          закончится за несколько недель, и вам снова придется готовить новую партию, что может быть утомительным.
        </p>

        <p>
          Дополняя определение концентрации, стоит упомянуть, что она измеряется в граммах на литр (г/л) для
          удобрения и в миллиграммах на литр (мг/л) для аквариума. Например, растворив 100 грамм сахара в
          одном литре воды, вы получите раствор с концентрацией сахара 100 г/л. Таким образом, удобрение
          также можно назвать водным раствором, поскольку вы растворили реагент в воде.
        </p>

        <p class="mb-10">
          Переходим к делу.
          <a href="https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html ">Рецепт</a>
          удобрения, ставший классическим и взятый с сайта Aqua Botanic, представлен так:
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
          82.88 грамма нитрата калия (KNO<sub>3</sub>, известного как калиевая селитра), растворённого в 1000 мл воды
        </v-alert>

        <p>
          Неизвестно, какова была первоначальная логика создания этого удобрения, но, по всей видимости,
          рецепт был разработан так, чтобы 1 мл раствора увеличивал уровень нитрата на 0.5 мг/л в аквариуме
          объёмом 100 литров. Это довольно удобный способ дозирования. Однако, если объём вашего аквариума
          отличается, например, составляет 72 литра, вам потребуется дозировка в 0.72 мл, чтобы добиться
          повышения уровня нитрата на 0.5 мг/л. Работать с такими нестандартными цифрами и вводить такие
          дробные объёмы может быть неудобно.
        </p>

        <p>
          Обратите внимание, что если вы решите изменить исходный рецепт, растворив лишь половину
          указанного количества (41.44 г), эффект от удобрения останется таким же, как и при использовании
          оригинальной концентрации. Разница лишь в том, что 1 мл раствора будет увеличивать уровень
          нитрата в аквариуме уже на 0.25 мг/л, а не на 0.5 мг/л. Это даёт возможность адаптировать
          концентрацию удобрения под конкретные нужды вашего аквариума и упрощает использование раствора
          до того, как он испортится.
        </p>

        <p class="mb-10">
          Чтобы скорректировать рецепт под свои нужды, достаточно использовать форму ниже. Вам нужно
          лишь ввести объём аквариума, желаемый объём удобрения и подходящую дозировку. Вот и всё!
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
              :model-value="unitConcs['NO3']"
              label="Дозировка"
              suffix="мг/л"
              variant="outlined"
              :disabled="typeof toggleDose === 'number'"
              @update:model-value="onInputNO3UnitConc"
            />
            <NumberField
              v-model="reagentKNO3.amount"
              label="Масса нитрата калия"
              suffix="г"
              variant="outlined"
              :error="checkSolubilityError(reagentKNO3)"
              :error-messages="getSolubilityErrorMessage(reagentKNO3)"
              @update:model-value="onInputReagentAmount"
            />
          </v-col>
        </v-row>

        <v-alert
          type="success"
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
          {{ reagentKNO3.amount ? format(reagentKNO3.amount) : '-' }} г
          нитрата калия (KNO<sub>3</sub>) на {{ reagentH2O.amount }} мл.
          <br><br>
          1 мл данного удобрения повышает уровень нитрата на
          {{ unitConcs['NO3'] ? format(unitConcs['NO3']) : '-' }} мг/л и калия на
          {{ unitConcs['K'] ? format(unitConcs['K']) : '-' }} мг/л в аквариуме объемом
          {{ recipeModel.tankVolume }} л
        </v-alert>

        <v-row class="mb-6">
          <v-col cols="10">
            <v-alert
              type="info"
              :icon="false"
              rounded="shaped"
              class="mb-0"
              variant="tonal"
            >
              Я: “Мне не совсем ясно, как использовать форму для составления собственного рецепта удобрения. Как
              мне узнать, сколько нитрата необходимо добавлять в аквариум ежедневно или еженедельно?”
            </v-alert>
          </v-col>
          <v-col
            cols="10"
            offset="2"
          >
            <v-alert
              type="success"
              :icon="false"
              rounded="shaped"
              variant="tonal"
            >
              Хорошо, позвольте мне показать на примере, как работать с формой.
            </v-alert>
          </v-col>
        </v-row>

        <p>
          Предположим, у вас есть аквариум объемом 60 литров, что является довольно распространенным размером. Введите
          этот объем в первое поле, обозначенное как "Объем аквариума". Важно отметить, что наличие углекислого газа
          (CO<sub>2</sub>) в аквариуме критически важно. Аквариумы с CO<sub>2</sub> и без него — это два совершенно
          разных мира, когда речь заходит о растениях. Я не буду рассматривать внесение удобрений в аквариумы
          без CO<sub>2</sub>, так как в большинстве случаев это считаю нецелесообразным.
        </p>

        <p>
          В качестве отправной точки по дозировке нитрата можно взять 1 мг/л в день или 7 мг/л в неделю, что обычно
          рекомендуется производителями удобрений. Такая дозировка позволяет избежать как передозировки при условии
          регулярных подмен воды не менее 30%, так и существенной нехватки удобрений, особенно если в аквариуме
          присутствуют обитатели, которых вы кормите.
        </p>

        <p>
          Как упоминалось ранее, самодельное удобрение без консервантов обычно хранится около трех месяцев, особенно
          если его хранить в холодильнике. Если в форме выбрана дозировка 0.5 мг/л, вам нужно будет ежедневно вносить 2
          мл удобрения, чтобы обеспечить суммарное ежедневное внесение 1 мг/л нитрата. Таким образом, за три месяца (90
          дней) потребуется 180 мл удобрения. Рекомендую сделать небольшой запас, так как компоненты обычно недороги, и
          излишки испортившегося удобрения не жалко выбросить. Предположим, вы решили использовать 250 мл удобрения.
          Введите это значение во второе поле. Больше вам ничего вводить не нужно — калькулятор автоматически рассчитает
          необходимое количество калиевой селитры, которое в вашем случае составит 12.23 г.
        </p>

        <p>
          Ваш индивидуальный рецепт отобразится в зеленом прямоугольнике. Вы можете сделать скриншот, скопировать текст
          в блокнот на компьютере или записать его на малярный скотч и приклеить на банку с удобрением.
        </p>

        <p>
          Вы можете экспериментировать с концентрациями и объемами, чтобы найти рецепт, который будет наиболее удобным
          для вас. Однако есть ограничение: максимальная растворимость калиевой селитры составляет 242 грамма на литр.
          Эта проблема может возникнуть у аквариумистов с очень большими аквариумами. Например, если вы выберете объем
          аквариума 400 литров и выберете концентрацию в 0.5 мг/л, то в последнем поле появится красное предупреждение о
          достижении максимальной растворимости. Это говорит о том, что не вся калиевая селитра сможет раствориться, и
          часть её может осесть на дно. В такой ситуации рекомендуется выбрать более низкую дозировку, например, 0.25
          мг/л, или ввести в третьем поле другое, более мелкое значение вручную.
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
              Я: “Стоп-стоп-стоп! Калий?! Мы же готовили удобрение только с нитратом!”
            </v-alert>
          </v-col>
          <v-col
            cols="10"
            offset="2"
          >
            <v-alert
              type="success"
              :icon="false"
              rounded="shaped"
              variant="tonal"
              class="mb-2"
            >
              Да, побочным элементом в данном рецепте будет калий,
              потому что он содержится в реагенте - нитрате калия, и поэтому уровень калия
              будет увеличиваться при добавлении данного удобрения.
            </v-alert>
            <v-alert
              type="success"
              :icon="false"
              rounded="shaped"
              variant="tonal"
              class="mb-2"
            >
              Исходя из условий вашего аквариума, это может быть как плюсом, так и минусом.
            </v-alert>
            <v-alert
              type="success"
              :icon="false"
              rounded="shaped"
              variant="tonal"
            >
              Но это выходит за рамки данной статьи. По поводу калия мы поговорим позже.
            </v-alert>
          </v-col>
        </v-row>

        <p>
          Поздравляю! В это не сразу можно поверить, но вы создали свой собственный рецепт,
          который работает точно так же, как и знаменитый рецепт, только он еще и удобен лично для вас!
        </p>

        <p>
          Хорошая работа 👍 Осталось только приготовить этот рецепт.
        </p>

        <p>
          Рецепт самодельного фосфоросодержащего удобрения вы можете найти
          <nuxt-link :to="localePath('/articles/simplest-phosphate/')">
            здесь.
          </nuxt-link>
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
        class="d-flex justify-end my-15"
      >
        <v-btn
          color="primary"
          :to="localePath('/articles/simplest-phosphate/')"
        >
          Следующая <span class="hidden-xs-only">статья</span><v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// TODO: refactor first three articles regarding to the similar code
const { t } = useI18n();
const localePath = useLocalePath();
const { getReagents } = useReagents();
const INITIAL_REAGENT_AMOUNT = 0;
const reagents = getReagents(INITIAL_REAGENT_AMOUNT);

const OTHER_DOSE = 'другая';
const doseExamples: (number | string)[] = [0.25, 0.5, 1.00, OTHER_DOSE];
const toggleDose = ref<number>(0.5);
const unitConcs = ref<Partial<Record<IonType, number>>>({});

const recipeModel = reactive(new FertilizerRecipe(
  {
    name: '',
    description: '',
    tankVolume: 100,
    reagents: [
      reagents.find((reagent) => reagent.key === H2O),
      reagents.find((reagent) => reagent.key === 'KNO3'),
    ],
  },
));

const reagentH2O = recipeModel.reagents[0];
const reagentKNO3 = recipeModel.reagents[1];
reagentH2O.amount = 500;
reagentKNO3.amount = 500;

unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagentKNO3);

// TODO: move to the composables
const checkSolubilityError = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility;
};

const getSolubilityErrorMessage = (reagent: ReagentType) => {
  return recipeModel.isLiquid && (reagent.amount / recipeModel.totalVolume) * 1000 > reagent.solubility
    ? `${t('validation.solubilityLimit')} - ${reagent.solubility} ${t('units.g/l')} ${t('common.for')} 25°С!`
    : '';
};

watch(() => reagentKNO3.amount, () => {
  unitConcs.value = recipeModel.countReagentUnitConcsByAmount(reagentKNO3);
});

watch(toggleDose, (value) => {
  if (typeof toggleDose.value === 'string') {
    return;
  }
  reagentKNO3.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagentKNO3, 'NO3'));
}, { immediate: true });

function onInputTankVolume() {
  reagentKNO3.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['NO3'], reagentKNO3, 'NO3'));
}

function onInputWaterVolume() {
  reagentKNO3.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['NO3'], reagentKNO3, 'NO3'));
}

function onInputReagentAmount() {
  reagentKNO3.amount = format(recipeModel.countReagentAmountByUnitConc(unitConcs.value['NO3'], reagentKNO3, 'NO3'));
}

function onInputNO3UnitConc(value: number) {
  reagentKNO3.amount = format(recipeModel.countReagentAmountByUnitConc(value, reagentKNO3, 'NO3'));
}

defineOptions({
  name: 'SimplestNitratePage',
});

useSeoMeta({
  title: t('meta.articles.nitrate.title'),
  description: t('meta.articles.nitrate.description'),
  keywords: t('meta.articles.nitrate.keywords'),
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
