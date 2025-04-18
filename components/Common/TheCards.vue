<template>
  <v-col
    cols="12"
    sm="8"
    offset-sm="2"
  >
    <v-expansion-panels multiple>
      <draggable
        v-model="model"
        tag="transition-group"
        :component-data="{ name:'fade' }"
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
                    {{ t('tanks.panels.header.pull') }}
                  </v-tooltip>
                </div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <slot :item="element"/>
              <div class="d-flex justify-space-between mt-4">
                <slot
                  name="actions"
                  :index="index"
                />
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
  typeof Tank | InstanceType<typeof FertilizerRecipe | typeof Fertilizer | typeof RemineralRecipe>
)[]>();
</script>

<style scoped lang="sass">

</style>
