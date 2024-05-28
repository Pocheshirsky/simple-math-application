<template lang="pug">
div(v-for="i in groups")
  span Группа
</template>

<script>
import { useLinearApproximationStore } from "@/scripts/store/linearApproximation.module";

export default {
  computed: {
    store: () => useLinearApproximationStore(),

    groups() {
      return this.store.groups
    },
  },
};
</script>
