<!--
  Samomes

  Copyright (C) 2022 Mikhail Lapshin

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
  <v-container class="mb-12">
    <v-row>
      <page-title>
        Рецепты
      </page-title>
      <guide>
        На этой странице можно добавить рецепты самодельных удобрений.
        <br>
        <br>
        Можно составить свой рецепт, а так же можно воспользоваться готовыми рецептами других аквариумистов.
        <br>
        <br>
        Рецепты - это ваши собственные удобрения, которые можно использовать при составлении
        <router-link to="/schedules">
          расписания
        </router-link>
        внесения удобрений.
      </guide>
      <v-col
        v-if="recipes.length === 0"
        cols="12"
        md="8"
        offset-md="2"
      >
        <p
          class="mb-8"
          :class="{'text-h6': $vuetify.breakpoint['xs'], 'text-h5': $vuetify.breakpoint['smAndUp']}"
        >
          У вас нет ни одного рецепта
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
      >
        <v-expansion-panels
          multiple
        >
          <draggable
            v-model="recipes"
            v-bind="dragOptions"
            @start="drag=true"
            @end="drag=false"
            handle=".handle"
            style="width: 100%;"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <v-expansion-panel
                v-for="(recipe, index) in recipes"
                :key="recipe.name"
              >
                <v-expansion-panel-header class="pa-3 py-sm-4 px-sm-6">
                  <div
                    class="d-flex justify-space-between align-center"
                    style="width: 100%;"
                  >
                    <span
                      class="no-break font-weight-regular d-flex flex-column flex-sm-row align-start"
                      :class="{'subtitle-1': $vuetify.breakpoint['xs'], 'title': $vuetify.breakpoint['smAndUp']}"
                    >
                      <span style="line-height: 1.25rem;">
                        {{ recipe.name }}
                      </span>
                    </span>
                    <span class="mr-3">
                      <v-tooltip
                        bottom
                        max-width="400"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon
                            class="handle ml-2"
                            v-on="on"
                          >mdi mdi-drag</v-icon>
                        </template>
                        {{ $t('recipes.panels.header.pull') }}
                      </v-tooltip>
                    </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Recipe :recipe="recipe" />
                  <div class="d-flex justify-end mt-4">
                    <v-btn
                      text
                      @click="openShareDialog(index)"
                    >
                      Поделиться
                    </v-btn>
                    <v-btn
                      text
                      :to="`/recipes/${index}`"
                      class="mr-n4"
                    >
                      Открыть
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </draggable>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialogShare"
      width="500"
    >
      <v-card>
        <v-card-title>
          Поделиться ссылкой
        </v-card-title>
        <v-card-text v-if="curRecipeIndex !== null">
          <v-text-field
            :value="encodedUrl"
            label="Ваша ссылка для отправки"
            hint="Скопируйте ссылку"
            id="encodedUrl"
          >
            <template v-slot:append>
              <v-tooltip
                bottom
                max-width="400"
              >
                <template v-slot:activator="{ on }">
                  <a @click="copyUrl()">
                    <v-icon v-on="on">fas fa-clipboard</v-icon>
                  </a>
                </template>
                Скопировать
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialogShare = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <add-button :action="addRecipe">
      {{ $t('recipes.addButton') }}
    </add-button>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import draggable from 'vuedraggable';
import Recipe from '@/components/recipes/Recipe.vue';

export default {
  name: 'Recipes',
  components: {
    draggable,
    Recipe,
  },
  data() {
    return {
      drag: false,
      isShared: false,
      curRecipeIndex: null,
      dialogShare: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    recipes: {
      get() {
        return this.$store.state.recipes;
      },
      set(value) {
        this.RECIPE_MOVE(value);
      },
    },
    encodedUrl() {
      let jsonString = JSON.stringify([this.recipes[this.curRecipeIndex]]);
      jsonString = jsonString.replace(/%/g, '%25');
      const encoded = encodeURIComponent(jsonString);
      return `${window.location.origin + window.location.pathname}/share?share=${encoded}`;
    },
  },
  watch: {
    dialogShare() {
      if (!this.dialogShare) {
        this.curRecipeIndex = null;
      }
    },
  },
  methods: {
    ...mapMutations([
      'RECIPE_MOVE',
      'SNACKBAR_SHOW',
    ]),
    addRecipe() {
      this.$router.push('/recipes/create');
    },
    openShareDialog(index) {
      this.curRecipeIndex = index;
      this.dialogShare = true;
    },
    copyUrl() {
      const encodedUrl = document.getElementById('encodedUrl');
      encodedUrl.select();
      encodedUrl.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.SNACKBAR_SHOW('Ссылка скопирована');
    },
  },
};
</script>

<style lang="sass">
.flip-list-move
  transition: transform 0.5s
.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
