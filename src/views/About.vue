<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <p class="mb-8" :class="{'headline': $vuetify.breakpoint['xs'], 'display-2': $vuetify.breakpoint['smAndUp']}">
          О проекте
        </p>
        <p>
          Цель проекта снизить рутинную работу по составлению рецептов, подсчета
          концентраций в удобрении и составления расписания по внесению удобрений
          в аквариум.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
