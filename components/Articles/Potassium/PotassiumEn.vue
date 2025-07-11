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
        Potassium Recipe
      </h1>
      <h2 class="font-weight-regular mb-6">
        DIY fertilizer with potassium for planted tanks
      </h2>
      <div class="subtitle-2">
        Mikhail Lapshin
      </div>
      <div class="subtitle-2 mb-10">
        March 19, 2024 (updated July 10, 2025)
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
        This article completes the series of three simplest DIY fertilizer recipes for planted tanks,
        focusing on potassium. To familiarize yourself with the recipes for
        <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
          nitrate
        </nuxt-link>
        and
        <nuxt-link :to="localePath('/articles/simplest-phosphate/')">
          phosphate
        </nuxt-link>,
        refer to the previous articles.
      </p>

      <p>
        Potassium belongs to macroelements, such as nitrate, phosphate, calcium and magnesium, due to its high
        concentrations in aquarium water compared to other elements. Usually the potassium concentration in aquarium
        water ranges from 5 to 30 ppm, and recommended dosages are from 2 to 20 ppm (for more details about dosages
        see another
        <nuxt-link :to="localePath('/articles/simplest-nitrate/')">
          article
        </nuxt-link>; don't confuse dosage with concentration).
      </p>

      <p>
        We'll be talking about an tank with additional <b>carbon dioxide (CO2)</b> supply, since they have different
        plant growth dynamics from aquariums without gas supply and, accordingly, different nutritional requirements.
      </p>

      <p>
        Potassium is a touchy subject in aquaristics. Some consider it an extremely important element and start adding
        it immediately after aquarium startup, while others see it as potentially harmful and strive to
        minimize its presence in fertilizers. Among such contradictory opinions, it's difficult to determine how
        to correctly use potassium. In this article, I'll try to clarify the logic of its application and, if you decide
        to use it in your tank, offer a recipe for its preparation.
      </p>

      <p class="mb-10">
        First, when you encounter reports from other aquarists about positive experience using
        potassium in their planted aquariums, it's extremely important (and yes, this is really IMPORTANT!) to find out
        about the type of <b>substrate</b> and <b>water composition</b> used. Without this information, any advice can
        be not only useless, but also potentially dangerous. I, the author of this resource, have repeatedly encountered
        similar problems, including leaf curling, growth point stunting, lower leaf melting, hole appearance, etc.
        Potassium overdose can be just as dangerous as excess micronutrients, and some plant species can be lost
        irreversibly.
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
            Why is the substrate question so important?
          </v-alert>
        </v-col>
      </v-row>

      <p>
        Substrates can be enriched and neutral. In turn, enriched
        substrates are divided into soils and neutral substrates with nutritious underlayers. I won't dwell in detail on
        nutritious underlayers as an intermediate option between soils and purely neutral substrates.
      </p>

      <p>
        Speaking of soils, it's worth noting that additional potassium supply often leads to noticeable improvement in
        plant growth, allowing the use of high doses – sometimes even more than 20 ppm per week – without risk of
        problems. This is because soil effectively absorbs potassium, replacing ammonium with potassium in its
        structure. As a result, plants actively absorb ammonium – the preferred nitrogen source – through roots, which
        promotes their impressive growth. This is why soil-based aquariums often look like magical
        underwater gardens. Hence the opinion that potassium causes such plant growth and that they consume
        it in large quantities, although actually potassium acts more as a supporting element.
      </p>

      <p>
        There may be more complex biological processes, similar to the sodium-potassium pump, but I'm not
        going to delve into these aspects since they're not of significant interest to the ordinary
        aquarist. Most aquarium enthusiasts simply want to understand what they should do, without needing
        to delve into the complexities of biological mechanisms. Moreover, root nutrition can compensate for
        deficiencies in leafs nutrition absorption. Plants can compensate for nutrient deficiencies
        blocked by excess potassium in water by absorbing them through roots from nutritious substrate.
        This is one reason why soil-based aquariums are more tolerant of aquarist mistakes.
      </p>

      <p>
        I personally observed how my aquarist friend introduced up to 70 ppm of potassium per week into a soil
        aquarium, and this led to overdose problems only after several weeks. At the same time, the overdose
        consequences were less serious than they could have been when adding 20 ppm of potassium per week to an
        aquarium with neutral substrate. Thus we
        approach discussing the use of potassium in aquariums with neutral (inert) substrate.
      </p>

      <p>
        Neutral substrate usually means quartz. If these materials have good quality and don't
        affect the water's chemical composition, they can be an excellent choice.
      </p>

      <p class="mb-10">
        Regarding neutral substrate, I would give this advice:
      </p>

      <v-alert
        type="warning"
        class="mb-10"
        variant="tonal"
      >
        Don't add potassium additionally if you're not sure of its necessity or if it's not your
        last option!
      </v-alert>

      <p>
        The risk of problems significantly exceeds the potential benefit. Based on personal experience, I can say
        that when adding potassium in doses from 2 ppm to 20 ppm per week on neutral substrate, starting from doses
        above 7 ppm with 30% water changes, I encountered serious problems. At a dosage of 20 ppm, irreversible
        necrosis processes began, resulting in the death of some plant species.
      </p>

      <p>
        How can we explain that some aquarists successfully add potassium to the tanks with neutral substrate without
        encountering problems, and even observe improved plant growth? The answer lies in the second key factor
        of the aquarium — in <b>water composition</b>. In the case of soil, this type of substrate can compensate and
        correct water deficiencies, which can't be said about tanks on neutral substrate, where the aquarist has to
        control more water parameters within narrower limits.
      </p>

      <p>
        Tank water can be either from the tap, which is the most common option, or
        prepared using a reverse osmosis system with subsequent remineralization. In the first case, water composition
        significantly depends on the region of residence. In the second — the aquarist independently forms water
        parameters, based on the remineralizer used. In both cases, water composition can vary greatly, including
        sodium content — potassium's antagonist, which affects plants' perception of potassium.
        Usually we don't have accurate information
        about sodium concentration in water and can only make assumptions.
      </p>

      <v-divider class="my-10" />

      <p>
        So, as a general rule for aquariums on neutral substrate, I recommend not adding potassium
        additionally, except when you're
        absolutely confident in your aquarium settings: lighting, CO2, filtration and water composition in terms of
        carbonate and general hardness, as well as correct macro- and microelement supply. In other words, if
        you've already tried everything possible and only trying to add potassium remains. But even in such case,
        introduce it gradually and in small doses (no more than 5 ppm per week step), with two-week intervals,
        to accurately observe plant reaction. Or if you have an aquarist friend in your city who successfully
        uses potassium in similar conditions.
      </p>

      <p>
        Most often on neutral substrate, the goal is to reduce potassium content in fertilizers.
        Dosages of 2-3 ppm per week with 30% weekly water changes are usually sufficient to maintain potassium
        concentration in the 5-10 ppm range, which is considered the safest range.
      </p>

      <p>
        In conclusion, if you use soil, you can add potassium up to a total of 15 ppm per week —
        potassium overdose under such conditions is unlikely. If you have neutral substrate, initially don't add
        potassium, do this only with the above-mentioned prerequisites.
      </p>

      <p>
        If you've read this far and still want to add potassium, let me offer you a recipe for DIY
        potassium-containing fertilizer. In the form below you can substitute your aquarium volume and choose the most
        suitable dosage.
      </p>

      <p class="mb-10">
        For preparing potassium fertilizer, potassium sulfate (K<sub>2</sub>SO<sub>4</sub>) is most often used. And
        we'll use it too.
      </p>

      <Calculator
        reagent-name="K2SO4"
        ion="K"
        :dose-init="0.25"
        :dose-examples="[0.1, 0.25, 0.5]"
        :volume="500"
      />

      <p>
        For better potassium dissolution, I recommend boiling water and stirring the powder in it.
        Fine sediment can be filtered using a cotton pad and funnel.
      </p>

      <p>
        Congratulations! You have another recipe in your collection.
      </p>

      <p class="mb-15">
        Here you can find recipes for DIY
        <NuxtLink :to="localePath('/articles/simplest-nitrate/')">
          nitrate
        </NuxtLink>
        and
        <NuxtLink :to="localePath('/articles/simplest-phosphate/')">
          phosphate
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
        <v-icon>mdi-chevron-left</v-icon> Previous <span class="hidden-xs-only">article</span>
      </v-btn>
      <v-btn
        color="primary"
        :to="localePath('/articles/no-tests-part-1/')"
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
