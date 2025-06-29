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
          :src="require('_old_code/assets/images/simplest-phosphate.webp')"
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
          <nuxt-link to="/articles/simplest-nitrate/">
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
          text
          icon="mdi-receipt-text"
          class="mb-10"
        >
          7.01 грамма монофосфата калия (KH<sub>2</sub>PO<sub>4</sub>) на 1000 мл
        </v-alert>

        <p>
          Этот рецепт был разработан так, чтобы 1 мл раствора увеличивает уровень фосфата на 0.05 мг/л в аквариуме
          объёмом 100 литров.
        </p>

        <p class="mb-10">
          А теперь, аналогично описанию в статье про
          <nuxt-link to="/articles/simplest-nitrate/">
            самодельный нитрат,
          </nuxt-link> вы можете составить свой рецепт с помощью ниже представленной формы:
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
              v-model="fertilizerDose.PO4"
              label="Дозировка"
              suffix="мг/л"
              outlined
              :precision-show="3"
              :precision-value="5"
              :disabled="toggleDose !== OTHER_DOSE"
            />
            <number-field
              v-model="reagentMass"
              label="Масса монофосфата калия"
              suffix="г"
              outlined
              :precision-show="2"
              :precision-value="2"
              :error="(reagentMass / fertilizerVolume) * 1000 > FORMULAS.KH2PO4.solubilityLimit"
              :error-messages="
                (reagentMass / fertilizerVolume) * 1000 > FORMULAS.KH2PO4.solubilityLimit
                  ? `Достигнута максимальная растворимость - ${FORMULAS.KH2PO4.solubilityLimit} г/л при 20°С!`
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
          {{ reagentMass ? reagentMass.toFixed(2) : '-' }} г монофосфата калия (KH<sub>2</sub>PO<sub>4</sub>)
          на {{ fertilizerVolume }} мл.<br><br>
          1 мл данного удобрения повышает уровень фосфата на
          {{ fertilizerDose.PO4 ? fertilizerDose.PO4.toFixed(2) : '-' }} мг/л и калия на
          {{ fertilizerDose.K ? fertilizerDose.K.toFixed(2) : '-' }} мг/л в аквариуме объемом
          {{ tankVolume }} л
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
        sm="8"
        offset-sm="2"
        class="d-flex justify-space-between mb-15"
      >
        <v-btn
          color="primary"
          to="/articles/simplest-nitrate/"
        >
          <v-icon>mdi-chevron-left</v-icon> Предыдущая <span class="hidden-xs-only">статья</span>
        </v-btn>
        <v-btn
          color="primary"
          to="/articles/potassium/"
        >
          Следующая <span class="hidden-xs-only">статья</span> <v-icon>mdi-chevron-right</v-icon>
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
      title: 'Самый простой рецепт самодельного удобрения с фосфатом',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'В этой статье вы узнаете как сделать рецепт удобрения с фосфатом и калием (самомес фосфата). '
            + 'И что на самом деле это совсем не сложно.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'фосфат, удобрение, самомес, монораствор, рецепт',
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
        PO4: null,
        K: null,
      },
      toggleDose: 0.05,
      doseExamples: [0.025, 0.05, 0.1, OTHER_DOSE],
    };
  },
  watch: {
    toggleDose: {
      immediate: true,
      handler(value) {
        if (value === OTHER_DOSE) {
          return;
        }
        this.fertilizerDose.PO4 = value;
      },
    },
    reagentMass() {
      this.countDose();
    },
    'fertilizerDose.PO4': {
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
      const { ions } = FORMULAS.KH2PO4;
      Object.entries(ions).forEach(([ion, data]) => {
        if (data.isNeeded) {
          this.fertilizerDose[this.convertIonName(ion)] = (
            (this.reagentMass / this.fertilizerVolume / this.tankVolume)
            * (this.countPercent('KH2PO4')[ion] * this.convertIonRatio(ion) * 1000)
          );
        }
      });
    },
    countReagentMass() {
      this.reagentMass = (this.fertilizerDose.PO4 * this.tankVolume * this.fertilizerVolume)
        / 1000 / this.countPercent('KH2PO4').P / this.convertIonRatio('P');
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
