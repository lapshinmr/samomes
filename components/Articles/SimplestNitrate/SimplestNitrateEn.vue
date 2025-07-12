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
        The simplest Nitrate NO<sub>3</sub> Recipe
      </h1>
      <h2 class="font-weight-regular mb-6">
        DIY fertilizer with nitrate for planted aquariums
      </h2>
      <div class="subtitle-2">
        Mikhail Lapshin
      </div>
      <div class="subtitle-2 mb-10">
        April 8, 2023 (updated July 10, 2025)
      </div>

      <v-alert
        type="success"
        :icon="false"
        variant="tonal"
        class="mb-6"
      >
        For those who want to create more complex recipes, there is a main
        <nuxt-link :to="localePath('/recipes/')">
          page
        </nuxt-link>
        with recipes.
      </v-alert>

      <p>
        This article is dedicated to the simplest liquid fertilizer recipe containing nitrate.
        Nitrate is one of the key elements that planted aquarium enthusiasts pay attention to,
        since plants use it in large quantities compared to other elements.
      </p>

      <p class="mb-10">
        I will try to explain the basic principles of creating DIY nitrate fertilizer so that
        any aquarist, even without special knowledge in chemistry, can make it independently.
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
            Me: I had a C in chemistry at school. It scares me.
            Please explain the very basics to me!
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
            With pleasure! I'll explain everything in detail now.
          </v-alert>
        </v-col>
      </v-row>

      <p>
        My goal is not only to provide a nitrate fertilizer recipe for aquariums, but also to share
        the understanding that a recipe is not an unchangeable rule that must be strictly followed.
        It's just a starting point! If you change the nitrate concentration in this recipe,
        it won't spoil it, but rather help you select the dosage for your own aquarium.
      </p>

      <p class="mb-10">
        For those who are just beginning to explore this topic, and for those who don't have deep
        knowledge in chemistry, I'll try to explain what concentration is using simple terms.
      </p>

      <v-alert
        type="info"
        class="mb-10"
        prominent
        variant="tonal"
      >
        Concentration is an indicator that reflects how much fertilizer is contained in your
        solution and how saturated or diluted it is.
      </v-alert>

      <p>
        Concentration affects the portion of fertilizer that you will add to your tank.
        This portion is called dosage or dose. When talking about dosages, it's usually
        several <b>ml</b> per day or several dozen ml per week.
      </p>

      <p>
        If your tank is small but the fertilizer is highly concentrated, you'll need to add it in very small
        doses, using an insulin syringe or pipette, especially if you add fertilizer on daily based approach.
        Having prepared a liter of such fertilizer and using only 1 ml per day, you'll face the problem of it
        spoiling before it's completely used, since the fertilizer is likely prepared
        without adding strong preservatives. As a result, after 2-3 months, mold or white fungus may appear
        in the container.
      </p>

      <p>
        In the opposite situation, if the tank is large and the fertilizer is diluted (has low concentration),
        you'll need to add large amounts of fertilizer and frequently prepare new portions. A liter of fertilizer
        will be finished in several weeks, and you'll have to prepare a new batch again, which can be annoying.
      </p>

      <p>
        To supplement the definition of concentration, it's worth mentioning that it's measured in grams per liter (g/L)
        for fertilizer and in milligrams per liter (mg/L or ppm) for aquarium water. For example,
        by dissolving 100 grams of sugar in one liter of water, you'll get a solution with a sugar
        concentration of 100 g/L. Thus, fertilizer can also be called an solution, since you
        dissolved the reagent in water.
      </p>

      <p class="mb-10">
        Let's get to business.
        The recipe that became classic is presented as follows:
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
        82.88 grams of potassium nitrate (KNO<sub>3</sub>), dissolved in 1000 ml of water
      </v-alert>

      <p>
        It's unknown what the original logic behind creating this fertilizer was, but apparently
        the recipe was developed so that 1 ml of solution would increase the nitrate level by 0.5 ppm in a
        100-liter aquarium. This is quite a convenient dosing method. However, if your aquarium volume
        differs, for example, it's 72 liters, you'll need a dosage of 0.72 ml to achieve
        a nitrate level increase of 0.5 ppm. Working with such non-standard numbers and adding such
        fractional volumes can be inconvenient.
      </p>

      <p>
        Note that if you decide to change the original recipe by dissolving only half
        the specified amount (41.44 g), the effect of the fertilizer will remain the same as when using
        the original concentration. The only difference is that 1 ml of solution will increase the nitrate
        level in the aquarium by 0.25 ppm instead of 0.5 ppm. This allows you to adapt
        the fertilizer concentration to your specific aquarium needs and simplifies using the solution
        before it spoils.
      </p>

      <p class="mb-10">
        To adjust the recipe to your needs, simply use the form below. You just need to
        enter the tank volume, desired fertilizer volume, and appropriate dosage. That's it!
      </p>

      <Calculator
        reagent-name="KNO3"
        ion="NO3"
        ion-secondary="K"
        :dose-init="0.5"
        :dose-examples="[0.25, 0.5, 1.00]"
        :volume="500"
      />

      <v-row class="mb-6">
        <v-col cols="10">
          <v-alert
            type="info"
            :icon="false"
            rounded="shaped"
            class="mb-0"
            variant="tonal"
          >
            Me: "I'm not entirely clear on how to use the form to create my own fertilizer recipe. How
            do I know how much nitrate needs to be added to the tank daily or weekly?"
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
            Good, let me show you with an example how to work with the form.
          </v-alert>
        </v-col>
      </v-row>

      <p>
        Let's assume you have a 60-liter tank, which is quite a common size. Enter
        this volume in the first field labeled "Tank Volume". It's important to note that the presence of carbon
        dioxide (CO<sub>2</sub>) in the aquarium is critically important. Aquariums with CO<sub>2</sub> and without it
        are two completely different worlds when it comes to plants. I won't consider adding fertilizers to aquariums
        without CO<sub>2</sub>, as in most cases I consider this impractical.
      </p>

      <p>
        As a starting point for nitrate dosage, you can take 1 ppm per day or 7 ppm per week, which is usually
        recommended by fertilizer manufacturers. Such dosage allows you to avoid both overdosing (provided
        regular water changes of at least 30%) and significant fertilizer deficiency, especially if there are
        inhabitants in the aquarium that you feed.
      </p>

      <p>
        As mentioned earlier, homemade fertilizer without preservatives usually lasts about three months, especially
        if stored in the refrigerator. If you select a dosage of 0.5 ppm in the form, you'll need to add 2
        ml of fertilizer daily to ensure a total daily addition of 1 ppm nitrate. Thus, over three months (90
        days) you'll need 180 ml of fertilizer. I recommend making a small reserve since components are usually
        inexpensive, and you won't regret throwing away excess spoiled fertilizer. Let's say you decided to use 250 ml
        of fertilizer. Enter this value in the second field. You don't need to enter anything else - the calculator will
        automatically calculate the required amount of reagent, which in your case will be 12.3 g.
      </p>

      <p>
        Your individual recipe will be displayed in the green rectangle. You can take a screenshot, copy the text
        to a notepad on your computer, or write it on masking tape and stick it on the fertilizer container.
      </p>

      <p>
        You can experiment with concentrations and volumes to find a recipe that will be most convenient
        for you. However, there's a limitation: the maximum solubility of potassium nitrate is 316 grams per liter.
        This problem may occur for aquarists with very large aquariums. For example, if you choose an aquarium volume
        of 400 liters and select a concentration of 0.5 ppm, a red warning about reaching maximum
        solubility will appear in the last field. This means that not all the reagent will be able to dissolve, and
        part of it may settle at the bottom. In such a situation, it's recommended to choose a lower dosage, for
        example, 0.25 ppm, or manually enter another, smaller value in the third field.
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
            Me: "Wait-wait-wait! Potassium?! We were making fertilizer with only nitrate!"
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
            Yes, the secondary element in this recipe will be potassium,
            because it's contained in the reagent - potassium nitrate, and therefore the potassium level
            will increase when adding this fertilizer.
          </v-alert>
          <v-alert
            type="success"
            :icon="false"
            rounded="shaped"
            variant="tonal"
            class="mb-2"
          >
            Based on your aquarium conditions, this can be either a plus or a minus.
          </v-alert>
          <v-alert
            type="success"
            :icon="false"
            rounded="shaped"
            variant="tonal"
          >
            But this goes beyond the scope of this article. You can read about potassium
            <nuxt-link :to="localePath('/articles/potassium/')">here.</nuxt-link>
          </v-alert>
        </v-col>
      </v-row>

      <p>
        Congratulations! It's hard to believe at first, but you've created your own recipe
        that works exactly like the famous recipe, only it's also convenient specifically for you!
      </p>

      <p>
        Good work 👍 All that's left is to prepare this recipe.
      </p>

      <p>
        You can find the recipe for DIY phosphorus-containing fertilizer
        <nuxt-link :to="localePath('/articles/simplest-phosphate/')">
          here.
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
        Next <span class="hidden-xs-only">article</span><v-icon>mdi-chevron-right</v-icon>
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
