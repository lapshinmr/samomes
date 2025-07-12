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
  <v-row>
    <v-col
      cols="12"
      sm="10"
      md="8"
      offset-sm="1"
      offset-md="2"
    >
      <h1 class="text-h4 text-md-h3 mt-md-10">
        The Simples Phosphate PO<sub>4</sub> Recipe
      </h1>
      <h2 class="font-weight-regular mb-6">
        DIY fertilizer with phosphate for planted aquariums
      </h2>
      <div class="subtitle-2">
        Mikhail Lapshin
      </div>
      <div class="subtitle-2 mb-10">
        March 11, 2024 (updated July 10, 2025)
      </div>

      <v-alert
        type="success"
        prominent
        :icon="false"
        class="mb-6"
        variant="tonal"
      >
        For those who want to create more complex recipes, there is a main
        <nuxt-link :to="localePath('/recipes/')">
          page
        </nuxt-link>
        with recipes.
      </v-alert>

      <p>
        In this article, we'll continue exploring the simplest ways to prepare DIY fertilizers and now
        talk about phosphate — an element that aquatic plant enthusiasts pay attention to secondarily.
      </p>

      <p>
        Let me make a small clarification about what I mean by "second important element".
        Here I mean that phosphate often becomes the second element you'll pay attention to when buying
        fertilizers, selecting dosages, or conducting water analysis. Regarding the impact on plant growth, you can't
        say that there's a most important or unimportant element: the absence of even one necessary element can
        negatively affect plant growth. Usually the first element that gets attention is nitrate,
        and the next one is phosphate.
      </p>

      <p>
        Moving to the recipe, its preparation is as simple as in the case of nitrate.
        If you've never been involved in
        preparing DIY fertilizers and aren't familiar with the process of making
        <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
          nitrate fertilizer
        </nuxt-link>, I recommend
        starting with that one, since this article will have fewer explanations.
      </p>

      <p>
        Usually phosphate is added to the tank ten times less than nitrate, if we're talking about
        neutral substrate. So, if you add 7 ppm of
        nitrate per week, then phosphate should be given in the amount of 0.7 ppm, that is, in a ratio
        of 1 to 10 to nitrate. I don't advise relying on tests; it's better to observe the condition of
        the plants. After all, your eyes are the most reliable tool for assessing the plants' needs.
      </p>

      <p>
        For preparing phosphate-containing fertilizer, monopotassium phosphate
        (KH<sub>2</sub>PO<sub>4</sub>) is most often used, since it
        is the most common and available reagent. In addition, it contains less potassium compared to
        other phosphorus-containing reagents. In most cases, I would recommend avoiding adding
        additional potassium if you're not sure of its necessity for your aquarium.
      </p>

      <p class="mb-10">
        The already classic recipe looks as follows:
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
        7.01 grams of monopotassium phosphate (KH<sub>2</sub>PO<sub>4</sub>) per 1000 ml
      </v-alert>

      <p>
        This recipe was developed so that 1 ml of solution increases the phosphate level by 0.05 ppm in a
        100-liter aquarium.
      </p>

      <p class="mb-10">
        And now, similar to the description in the article about
        <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
          DIY nitrate,
        </nuxt-link> you can create your own recipe using the form presented below:
      </p>

      <Calculator
        reagent-name="KH2PO4"
        ion="PO4"
        ion-secondary="K"
        :dose-init="0.05"
        :dose-examples="[0.025, 0.05, 0.1]"
        :volume="500"
      />

      <p>
        That's how simply you created your second recipe. All that remains is to prepare it.
      </p>

      <p class="mb-15">
        Keep going and you'll succeed 👍
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
        <v-icon>mdi-chevron-left</v-icon> Previous <span class="hidden-xs-only">article</span>
      </v-btn>
      <v-btn
        color="primary"
        :to="localePath('/articles/potassium/')"
      >
        Next <span class="hidden-xs-only">article</span> <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import Calculator from '~/components/Articles/Calculator.vue';

const localePath = useLocalePath();
</script>

<style scoped lang="sass">

</style>
