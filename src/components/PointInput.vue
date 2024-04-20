<template lang="pug">
div
  div.addPointContainer {{ "Добавить точку" }}
    div.addBtn
      v-btn.bg-surface(@click="addPoint") {{ "+" }}
        
  div(v-if="pointNumber")
    div(v-for="index in pointNumber")
      point-input-unit(:index="index - 1" @childrenPoint="childrenPoint")
            
  div {{ this.store.pointsArray }}
    v-btn.bg-surface( @click="computeParameters" ) Посчитать
</template>

<script>
import PointInputUnit from "./PointInputUnit";
import { useLinearApproximationStore } from "@/scripts/store/linearApproximation.module";

export default {
  components: {
    PointInputUnit: PointInputUnit,
  },

  computed: {
    store: () => useLinearApproximationStore(),

    pointNumber() {
      return this.store.pointsArray.length;
    },
  },

  methods: {
    childrenPoint(point) {
      this.pointsArray.push(point);
    },

    computeParameters() {
      this.$emit("computeParameters", this.pointsArray);
    },

    addPoint() {
      this.store.addPoint([0, 0]);
    },
  },
};
</script>

<style>

.addPointContainer {
  width: 500px;
  padding: 8px;
  display: flex;
}

.addBtn {
  margin-right: 8px;
  margin-left: auto
}

</style>
