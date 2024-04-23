<template lang="pug">
div
  div.addPointContainer {{ "Добавить точку" }}
    div.addBtn
      v-btn.bg-surface( @click="addPoint" ) {{ "+" }}
        
  div( v-if="points")
    div( v-for="(item, index) in points" :key="item.id")
      point-input-unit( :index="index" )
    
  div {{ this.store.points }}
  v-btn(@click="dddd")
</template>

<script>
import PointInputUnit from "./PointInputUnit";
import { useLinearApproximationStore } from "@/scripts/store/linearApproximation.module";
import { LinearApprox } from "@/scripts/linearApprox";

export default {
  components: {
    PointInputUnit: PointInputUnit,
  },

  mounted() {
    console.log(this)
  },

  computed: {
    store: () => useLinearApproximationStore(),

    points() {
      return this.store.points;
    }
  },

  methods: {
    addPoint() {
      this.store.addPoint( { value: [0, 0] } );
    },
    dddd() {
      LinearApprox.computeLinearApprox(this.points)
    }
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
