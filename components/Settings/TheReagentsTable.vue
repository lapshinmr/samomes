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
  <v-table height="300px">
    <thead>
      <tr>
        <th>
          Реагент
        </th>
        <th />
      </tr>
    </thead>
    <tbody v-if="reagentsStore.isReagents">
      <tr
        v-for="(reagent, index) in reagents"
        :key="reagent.name"
      >
        <td>
          {{ reagent.name || reagent.key }}
        </td>
        <td>
          <Icon
            name="mdi:delete"
            size="24"
            class="ml-2 cursor-pointer text-grey-darken-1"
            @click="reagentsStore.removeReagent(index)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td>
          Вы еще не добавили собственные реагенты
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TheReagentsTable',
});

const reagentsStore = useReagentsStore();
const { reagents } = storeToRefs(useReagentsStore());
</script>

<style scoped lang="sass">

</style>
