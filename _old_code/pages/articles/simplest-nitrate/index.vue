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
  <v-container class="post">
    <v-row>
      <v-col
        sm="10"
        offset-sm="1"
      >
        <v-img
          :src="require('_old_code/assets/images/simplest-nitrate.webp')"
          alt="Easiest nitrate recipe"
        />
      </v-col>
    </v-row>
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
          to="/articles/"
        >
          <v-icon>mdi-chevron-left</v-icon> Все статьи
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
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
          prominent
          text
          :icon="false"
          class="mb-6"
        >
          Для тех, кто хочет создать более сложный рецепт, есть основная
          <nuxt-link to="/recipes/">
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
              shaped
              text
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
              shaped
              text
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
          text
          class="mb-10"
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
          text
          icon="mdi-receipt-text"
          class="mb-10"
        >
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
            <number-field
              v-model="tankVolume"
              @input="inputTankVolume"
              label="Объем аквариума"
              suffix="л"
              outlined
            />
            <number-field
              v-model="fertilizerVolume"
              @input="inputFertilizerVolume"
              label="Объем удобрения"
              suffix="мл"
              outlined
            />
            <v-radio-group
              v-model="toggleDose"
              row
              class="mt-0"
            >
              <v-radio
                v-for="dose in doseExamples"
                :key="dose"
                :label="`${dose} ${dose !== OTHER_DOSE ? 'мг/л' : ''}`"
                :value="dose"
              />
            </v-radio-group>
            <number-field
              v-model="fertilizerDose.NO3"
              label="Дозировка"
              suffix="мг/л"
              outlined
              :precision-show="3"
              :precision-value="5"
              :disabled="toggleDose !== OTHER_DOSE"
            />
            <number-field
              v-model="reagentMass"
              label="Масса нитрата калия"
              suffix="г"
              outlined
              :precision-show="2"
              :precision-value="2"
              :error="(reagentMass / fertilizerVolume) * 1000 > FORMULAS.KNO3.solubilityLimit"
              :error-messages="
                (reagentMass / fertilizerVolume) * 1000 > FORMULAS.KNO3.solubilityLimit
                  ? `Достигнута максимальная растворимость - ${FORMULAS.KNO3.solubilityLimit} г/л при 20°С!`
                  : ''
              "
            />
          </v-col>
        </v-row>

        <v-alert
          type="success"
          icon="mdi-receipt-text"
          class="mb-10"
        >
          Рецепт:
          <br><br>
          {{ reagentMass ? reagentMass.toFixed(2) : '-' }} г
          нитрата калия (KNO<sub>3</sub>) на {{ fertilizerVolume }} мл.
          <br><br>
          1 мл данного удобрения повышает уровень нитрата на
          {{ fertilizerDose.NO3 ? fertilizerDose.NO3.toFixed(2) : '-' }} мг/л и калия на
          {{ fertilizerDose.K ? fertilizerDose.K.toFixed(2) : '-' }} мг/л в аквариуме объемом
          {{ tankVolume }} л
        </v-alert>

        <v-row class="mb-6">
          <v-col cols="10">
            <v-alert
              type="info"
              :icon="false"
              shaped
              text
              class="mb-0"
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
              shaped
              text
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
              shaped
              text
              class="mb-0"
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
              shaped
              text
            >
              Да, побочным элементом в данном рецепте будет калий,
              потому что он содержится в реагенте - нитрате калия, и поэтому уровень калия
              будет увеличиваться при добавлении данного удобрения.
            </v-alert>
            <v-alert
              type="success"
              :icon="false"
              shaped
              text
            >
              Исходя из условий вашего аквариума, это может быть как плюсом, так и минусом.
            </v-alert>
            <v-alert
              type="success"
              :icon="false"
              shaped
              text
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
          <nuxt-link to="/articles/simplest-phosphate/">
            здесь.
          </nuxt-link>
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
        class="d-flex justify-end mb-15"
      >
        <v-btn
          color="primary"
          to="/articles/simplest-phosphate/"
        >
          Следующая <span class="hidden-xs-only">статья</span><v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FORMULAS from '@/helpers/constants/formulas';
import { convertIonRatio, countPercent, convertIonName } from '@/helpers/funcs/funcs';

const OTHER_DOSE = 'другая';

export default {
  name: 'SimplestNitratePage',
  head() {
    return {
      title: 'Самый простой рецепт самодельного удобрения с нитратом',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'В этой статье вы узнаете как сделать рецепт удобрения с нитратом и калием (самомес нитрата). '
            + 'И что на самом деле это совсем не сложно.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'нитрат, удобрение, самомес, монораствор, рецепт',
        },
      ],
    };
  },
  data() {
    return {
      FORMULAS,
      OTHER_DOSE,
      tankVolume: 100,
      fertilizerVolume: 1000,
      reagentMass: null,
      fertilizerDose: {
        NO3: null,
        K: null,
      },
      toggleDose: 0.5,
      doseExamples: [0.25, 0.5, 1.00, OTHER_DOSE],
    };
  },
  watch: {
    toggleDose: {
      immediate: true,
      handler(value) {
        if (value === OTHER_DOSE) {
          return;
        }
        this.fertilizerDose.NO3 = value;
      },
    },
    reagentMass() {
      this.countDose();
    },
    'fertilizerDose.NO3': {
      immediate: true,
      handler() {
        this.countReagentMass();
      },
    },
  },
  methods: {
    countPercent,
    convertIonRatio,
    convertIonName,
    countDose() {
      const { ions } = FORMULAS.KNO3;
      Object.entries(ions).forEach(([ion, data]) => {
        if (data.isNeeded) {
          this.fertilizerDose[this.convertIonName(ion)] = (
            (this.reagentMass / this.fertilizerVolume / this.tankVolume)
            * (this.countPercent('KNO3')[ion] * this.convertIonRatio(ion) * 1000)
          );
        }
      });
    },
    countReagentMass() {
      this.reagentMass = (this.fertilizerDose.NO3 * this.tankVolume * this.fertilizerVolume)
        / 1000 / this.countPercent('KNO3').N / this.convertIonRatio('N');
    },
    inputTankVolume(value) {
      if (+value) {
        this.countReagentMass();
      }
    },
    inputFertilizerVolume(value) {
      if (+value) {
        this.countReagentMass();
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.post
  .post__title
    font-family: "Lexend", sans-serif !important
</style>
