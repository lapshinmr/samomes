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
        You Don't Need Aquarium Tests. Part 1
      </h1>
      <h2 class="font-weight-regular mb-6">
        General thoughts and aquarium examples
      </h2>
      <div class="subtitle-2">
        Mikhail Lapshin
      </div>
      <div class="subtitle-2 mb-10">
        May 21, 2025
      </div>

      <div class="d-flex flex-column align-center text-center text-gray font-italic my-10">
        <v-divider
          class="mb-10"
          style="width: 40%;"
        />
        <div class="mb-2">
          In memory of our friend Sergey Efremov.
        </div>
        <div>
          Your knowledge and experience continue to live in our aquariums.
        </div>
        <v-divider
          class="mt-10"
          style="width: 60%;"
        />
      </div>

      <p>
        Don't rush to conclusions. 🙂 I understand that with just the title I might have set the reader's
        expectations in a certain way, but my goal is quite different.
      </p>
      <p>
        In this article, I want to share my experience maintaining aquariums both with and without tests —
        based on my own practice and the experience of fellow aquarists. I'll try to explain in which situations
        tests are truly useful, and when their use might be excessive or even harmful.
      </p>
      <p>
        You can discuss this endlessly in groups, chats, and forums, but in aquaristics everything is quite pragmatic.
        It's enough to see an aquarium to decide whether it's worth adopting its owner's experience.
        The phrase "everything grows" has different meanings for everyone. When you see an aquarium, you
        immediately determine whether it meets your aesthetic and practical expectations.
      </p>

      <h2 class="title font-weight-regular text-h4 my-10">
        Aquarium Examples
      </h2>

      <p>
        Let me provide examples of aquariums whose owners currently don't use tests, and show what changes
        occurred after they stopped using them.
      </p>

      <v-divider class="my-10" />

      <div>
        With tests
      </div>
      <NuxtImg
        src="/images/no-tests/1.jpeg"
        class="full-width-image mb-2"
        quality="50"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        loading="lazy"
        format="webp"
      />
      <div>
        Without tests
      </div>
      <NuxtImg
        src="/images/no-tests/2.jpeg"
        class="full-width-image mb-2"
        quality="50"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        loading="lazy"
        format="webp"
      />

      <p>
        Sergey. Nizhny Novgorod. 150 liters. 2 years of experience in planted aquaristics with CO2.
      </p>

      <v-alert
        type="success"
        rounded="shaped"
        :icon="false"
        class="mb-6"
        variant="tonal"
      >
        <p>
          This is my tank before using tests and acquiring necessary knowledge. After this, algae
          problems began, and I started buying tests — a whole 12 of them, plus potassium separately.
          I was changing parameters almost daily and adding fertilizers based on these results. I added them
          incompetently: I could actively add phosphates for two days, guided by tests, and then not add them at all for
          three days (because according to tests there was too much). I could describe this entire ridiculous experience
          with tests for a long time.
        </p>
        <p>
          Now I haven't used any tests for at least a year.
        </p>
      </v-alert>

      <v-divider class="my-10" />

      <div class="d-flex flex-column flex-md-row justify-md-space-between w-100 mb-2">
        <div
          class="d-flex flex-column"
          :style="mdAndUp ? 'width: 35%;' : 'width: 100%;'"
        >
          <div>
            With tests
          </div>
          <NuxtImg
            src="/images/no-tests/3.jpeg"
            class="full-width-image mb-2 mb-md-0"
            quality="50"
            sizes="100vw sm:100vw md:35vw lg:35vw xl:35vw xxl:35vw"
            loading="lazy"
            style="height: 100%;"
            format="webp"
          />
        </div>
        <div
          class="d-flex flex-column"
          :style="mdAndUp ? 'width: 63%;' : 'width: 100%;'"
        >
          <div>
            Without tests
          </div>
          <NuxtImg
            src="/images/no-tests/4.jpeg"
            class="full-width-image mb-2 mb-md-0"
            quality="50"
            sizes="100vw sm:100vw md:63vw lg:63vw xl:63vw xxl:63vw"
            loading="lazy"
            format="webp"
          />
        </div>
      </div>

      <p>
        Sergey. Domodedovo. 96 L. 2 years.
      </p>

      <v-alert
        type="success"
        rounded="shaped"
        :icon="false"
        class="mb-6"
        variant="tonal"
      >
        <p>
          Looking at the "before" and "after" photos, I smile remembering how the test showed me zero phosphate — and
          this while adding fertilizers strictly according to instructions! It's not hard to guess what I did next. Yes,
          I started increasing phosphate content (since it was supposedly absent). I added it until the test reacted,
          and when it did react — it immediately showed dark blue liquid.
        </p>
        <p>
          I didn't believe it: how is it possible to go from zero to off-the-charts values? I did the test again — it
          showed a value of 1. Strange? Not at all! As I later understood, the same test conducted several times in a
          row can show completely different results. Meanwhile, I was concentrating exclusively on these numbers, not on
          the actual condition of the plants.
        </p>
        <p>
          Result: tests constantly confused me. I'm immensely glad that I was convinced to try managing without them.
          Now, even when algae outbreaks occur, I don't resort to tests. They don't provide truly useful information.
        </p>
      </v-alert>

      <p>
        Sergey has his own
        <a
          target="_blank"
          href="https://www.youtube.com/@SergeyZb"
        >YouTube channel</a>, where you can learn more about his aquarium life in detail.
      </p>

      <v-divider class="my-10" />

      <div class="d-flex flex-column flex-md-row justify-md-space-between w-100 mb-2">
        <div
          class="d-flex flex-column"
          :style="mdAndUp ? 'width: 49%;' : 'width: 100%;'"
        >
          <div>
            With tests
          </div>
          <NuxtImg
            src="/images/no-tests/5.jpeg"
            class="full-width-image mb-2 mb-md-0"
            quality="50"
            sizes="100vw sm:100vw md:49vw lg:49vw xl:49vw xxl:49vw"
            loading="lazy"
            format="webp"
          />
        </div>
        <div
          class="d-flex flex-column"
          :style="mdAndUp ? 'width: 49%;' : 'width: 100%;'"
        >
          <div>
            Without tests
          </div>
          <NuxtImg
            src="/images/no-tests/6.jpeg"
            class="full-width-image mb-2 mb-md-0"
            quality="50"
            sizes="100vw sm:100vw md:49vw lg:49vw xl:49vw xxl:49vw"
            loading="lazy"
            style="height: 100%;"
            format="webp"
          />
        </div>
      </div>

      <p>
        Denis. St. Petersburg. 60 L. 1 year experience
      </p>

      <v-divider class="my-10" />

      <div class="d-flex flex-column mb-2">
        <div>
          With tests
        </div>
        <NuxtImg
          src="/images/no-tests/7.jpeg"
          class="full-width-image mb-2"
          quality="50"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
          format="webp"
        />
      </div>
      <div class="d-flex flex-column mb-2">
        <div>
          Without tests
        </div>
        <NuxtImg
          src="/images/no-tests/8.jpeg"
          class="full-width-image mb-2"
          quality="50"
          sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
          loading="lazy"
          format="webp"
        />
      </div>

      <p>
        Alexander. Gorki Leninsky village. 96 L. 7 years experience.
      </p>

      <v-alert
        type="success"
        rounded="shaped"
        :icon="false"
        class="mb-6"
        variant="tonal"
      >
        I had half a drawer full of tests — JBL and Nilpa. I had everything: for nitrates, phosphates, potassium,
        ammonia and more. According to tests, tap water showed nitrates at 25-30 mg/L, so I only added
        phosphates, assuming there were already enough nitrates from the tap. As a result, nothing really grew.
      </v-alert>

      <v-divider class="my-10" />

      <p>
        Here are a few more excellent aquarium examples, though without "before and after" comparison. Nevertheless,
        they perfectly demonstrate that you can create and maintain a beautiful and healthy aquarium without using
        tests.
      </p>

      <v-divider class="my-10" />

      <NuxtImg
        src="/images/no-tests/9.jpeg"
        class="full-width-image mb-2"
        quality="50"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        loading="lazy"
        format="webp"
      />
      <NuxtImg
        src="/images/no-tests/10.jpeg"
        class="full-width-image mb-2"
        quality="50"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        loading="lazy"
      />

      <p>
        Tatyana, St. Petersburg. 100 L. 1 year experience.
      </p>

      <v-alert
        type="success"
        rounded="shaped"
        :icon="false"
        class="mb-6"
        variant="tonal"
      >
        <p>
          I immediately understood that I didn't want to bother with tests and delve deeply into water chemistry. The
          planted tank was needed primarily for beauty, as a design element in the bedroom — to bring pleasure while not
          requiring much maintenance time.
        </p>
        <p>
          I chose a slow start, without sudden changes. I increased parameters gradually, since my philosophy in
          aquarium keeping is stability. Initially I only did Gh and Kh tests to understand the composition of tap
          water. Our water is soft, so I remineralize it to 8 Gh, using jewelry scales with each water change. I also
          sometimes use a TDS meter.
        </p>
        <p>
          In almost two years of the tank's existence, I've never had algae problems. I try to observe the plants
          and assess how they react to increased fertilizers, light, or CO₂. I add fertilizers according to manufacturer
          recommendations and using the "Samomes" calculator.
        </p>
      </v-alert>

      <v-divider class="my-10" />

      <NuxtImg
        src="/images/no-tests/11.jpeg"
        class="full-width-image mb-2"
        quality="50"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        loading="lazy"
        format="webp"
      />

      <p>
        Sergey. Nizhny Novgorod. 45 L. 3 years experience
      </p>

      <v-divider class="my-10" />

      <NuxtImg
        src="/images/no-tests/12.jpeg"
        class="full-width-image mb-2"
        quality="50"
        sizes="100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        loading="lazy"
        format="webp"
      />

      <p>
        Artem. Moscow. 30 L. 2 years experience
      </p>

      <p>
        Artem has his own
        <a
          target="_blank"
          href="https://www.youtube.com/@volkovartem86"
        >YouTube channel</a>,
        where you can ask him questions about his aquarium directly.
      </p>

      <v-divider class="my-10" />

      <p>
        All these people are ordinary aquarium hobbyists, not professionals. And you can quite likely encounter their
        aquariums on social networks.
      </p>
      <p>
        What's especially interesting is that the presented tanks were created on neutral substrates, completely
        without root nutrition! Why do I emphasize this? Because with root nutrition, growing plants is even easier. And
        in the shown examples, there are plants of completely different difficulty levels.
      </p>

      <p>
        You might object: "Here there's RGB lighting, time has passed, the person became more experienced, the
        composition improved, etc." But I'll answer this: "Exactly! Without tests, the aquarist focused not on dancing
        around water parameters, but on aquarium design and other truly important settings. They started thinking with
        completely different patterns."
      </p>
      <p>
        Interesting? Then let's continue.
      </p>

      <h2 class="title font-weight-regular text-h4 my-10">
        Initial Data
      </h2>

      <p>
        Let's immediately determine who this article is intended for:
      </p>

      <ul class="ml-4">
        <li class="mb-2">
          You're an aquarist with limited experience, but already possess basic knowledge and have made certain attempts
          in this hobby
        </li>
        <li class="mb-2">
          Your tank uses CO₂ (carbon dioxide)
        </li>
        <li class="mb-2">
          We're not talking about keeping rare shrimp species that require special conditions or extremely low nitrate
          levels
        </li>
        <li class="mb-2">
          You might be facing algae problems
        </li>
        <li class="mb-2">
          You've been using tests for a long time, but the results leave much to be desired
        </li>
        <li class="mb-2">
          You might feel stuck in certain aquarium keeping frameworks and are looking for an alternative
          approach, because something's going wrong, or you're simply tired of regularly testing water
        </li>
      </ul>

      <p>
        If at least part of these points reflects your situation, then this article might be useful to you.
      </p>

      <h2 class="title font-weight-regular text-h4 my-10">
        Important Digression
      </h2>

      <p>
        I want to immediately make an important note: if you successfully maintain an aquarium using tests, I have no
        right to dissuade you. If you've figured out most aspects and/or everything is going well — don't change what
        works.
      </p>

      <p>
        Moreover, I'm writing this text without any preaching, but only as a description of an alternative way of
        keeping planted tanks. My goal is to show that you can manage without tests and still have a fantastically
        beautiful aquarium.
      </p>

      <p>
        I don't deny that in someone's practice, certain tests might be successfully applied, coexisting with a
        beautiful tank. But this requires good awareness and patience so that tests don't dictate their will to you.
        And this is exactly what often happens.
      </p>

      <p>
        I myself was one of those who, at any doubtful moment, would grab tests, instead of observing the
        aquarium and more closely monitoring plant behavior — directly connecting my actions with their response.
        Sometimes it got ridiculous: when everything was fine, but tests showed some discrepancy, I would start "just in
        case" changing conditions, since this didn't match generally accepted recommendations. And there are many
        aquarists like me.
      </p>

      <p>
        So at a certain point, I decided to remove all tests and completely rely on what I could actually
        control: basic aquarium equipment, water quality, plant selection, fertilizer dosages,
        observing plants and livestock, and to some extent — intuition. In my case, if tests are lying in
        the drawer, they will definitely be used.
      </p>

      <h2 class="title font-weight-regular text-h4 my-10">
        About Tests in General
      </h2>

      <p>
        There would be nothing wrong with tests if they didn't give reason to interfere unnecessarily and prevent the
        tank from developing under the conditions you created. It's one thing to measure nitrates to confirm your
        hunches, to exclude an obvious miscalculation. And quite another to follow test instructions and make changes
        where, due to inexperience, you can do more harm than good.
      </p>

      <p>
        With tests, you're trying to find some "golden ratio," hoping this will ensure all plants thrive and
        the aquarium looks beautiful. You rely on tests to show you the right path.
      </p>

      <p>
        Imagine: you measured some parameter, and you didn't like the result. This is where endless experiments with
        fertilizers begin, agonizing waiting, and headaches from the aquarium. But at that moment it would be better if
        you just took a cup of tea, sat calmly nearby, and added fertilizers according to manufacturer recommendations.
      </p>

      <p>
        It's not for nothing that experienced aquarists claim: "The farther the aquarist is from the tank, the
        better for the tank."
      </p>

      <p>
        Let's ask ourselves another question. What values are actually correct for your specific tank?
        Who will tell you this? Tests? No, they won't. Stop for a moment and think about this.
      </p>

      <p>
        Moreover, tests take money and time — that's a fact. Even weekly testing is wasteful, considering
        modern people's dynamic lifestyle! Initially, the process of "playing laboratory technician" might be engaging,
        but soon it will turn into routine. At the same time, a complete set of even the cheapest tests is no longer
        such a cheap purchase. For this money, you could buy half, if not a whole package of soil or a
        pack of good fertilizers. And that would be a much better investment.
      </p>

      <p>
        I myself remember Friday evenings when I would take out the special box with tests and importantly conduct
        measurements in two or three tanks. It seemed to me that this was exactly how I controlled parameters and
        made the aquarium better. I spent an hour, sometimes more, on measurements and data analysis. My head was
        constantly loaded only with these numbers. But for some reason, no improvements in the tank were observed.
        My tanks were constantly in adaptation mode to changing parameters. I was sure I was about to find ideal
        conditions. But in two and a half years, I never found them.
      </p>

      <p>
        In addition to all the above: tests also need to be regularly checked with reference solutions! They
        need to be either prepared or bought, and additional time spent on test calibration, just to
        ensure it's working. And this procedure should be done regularly, since there's no guarantee that
        in a week the test won't become defective.
      </p>

      <p>
        This article turned out quite voluminous, so it was decided to split it into two parts. In the
        <nuxt-link :to="localePath('/articles/no-tests-part-2/')">
          next part
        </nuxt-link> I
        analyze each test in detail separately. See you on the next page!
      </p>

      <p class="mt-6">
        Want to discuss the article? Go to our
        <a
          href="https://t.me/samomes_calculator"
          target="_blank"
        >
          Telegram channel.
        </a>
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
        :to="localePath('/articles/potassium/')"
      >
        <v-icon>mdi-chevron-left</v-icon> Previous <span class="hidden-xs-only">article</span>
      </v-btn>
      <v-btn
        color="primary"
        :to="localePath('/articles/no-tests-part-2/')"
      >
        Continue <span class="hidden-xs-only">article</span> <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { mdAndUp } = useDisplay();
</script>

<style scoped lang="sass">

</style>
