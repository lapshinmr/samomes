<template>
  <v-table>
    <thead>
      <tr>
        <th>
          Реагент
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
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
