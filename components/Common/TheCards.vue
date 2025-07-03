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
  <v-col
    cols="12"
    sm="10"
    md="8"
    offset-sm="1"
    offset-md="2"
  >
    <v-expansion-panels multiple>
      <draggable
        v-model="model"
        item-key="name"
        :component-data="{ name: 'fade', class: 'w-100' }"
        v-bind="DRAG_OPTIONS"
        handle=".handle"
      >
        <template #item="{ element, index }">
          <v-expansion-panel>
            <v-expansion-panel-title class="pa-3 py-sm-4 px-sm-6">
              <div
                class="d-flex align-center"
                style="width: 100%;"
              >
                <div class="no-break font-weight-regular mr-auto text-subtitle-1 text-md-h6">
                  {{ element.name }}
                </div>
                <div>
                  <v-tooltip
                    location="bottom"
                    max-width="400"
                  >
                    <template #activator="{ props }">
                      <v-icon
                        class="handle"
                        v-bind="props"
                      >
                        mdi mdi-drag
                      </v-icon>
                    </template>
                    {{ t('common.pull') }}
                  </v-tooltip>
                </div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="mx-n3 mx-sm-0">
                <slot :item="element"/>
                <div class="d-flex justify-space-between mt-4">
                  <slot
                    name="actions"
                    :index="index"
                  />
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </template>
      </draggable>
    </v-expansion-panels>
  </v-col>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';

const { t } = useI18n();

const model = defineModel<(
  InstanceType<typeof Tank | typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>
)[]>();
</script>

<style scoped lang="sass">

</style>
