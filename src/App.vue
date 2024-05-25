<template lang="pug">
div.main
  left-panel( id="leftPanel" )
  three-scene( id="threeScene" )
  div.lineEquation.bg-surface-variant( v-if="equation != null" )
    span.pl-2.pt-1 Уравнение прямой: 
    span.ml-2.mt-1.mr-2 {{ stringEquation }}

</template>

<script>
import LeftPanel from "./components/LeftPanel.vue"
import ThreeScene from "./components/ThreeScene.vue"
import { useLinearApproximationStore } from "./scripts/store/linearApproximation.module";

export default {
  components: {
    LeftPanel: LeftPanel,
    ThreeScene: ThreeScene
  },

  computed: {
    store: () => useLinearApproximationStore(),

    equation() {
      return this.store.equation
    },

    stringEquation() {
      if (this.equation != null) return `y = ${this.equation.a > 0 ? "" : "- "} ${Math.abs(parseFloat(this.equation.a).toFixed(3))} * x ${this.equation.b > 0 ? "+ " : "- "} ${Math.abs(parseFloat(this.equation.b).toFixed(3))}`
      else return ''
    }
  },

  methods: {}
}

</script>

<style>
.main {
  display: flex;
}

.lineEquation {
  width: auto;
  height: 30px;
  display: flex;
  position: absolute;
  top: 16px;
  left: 55%;
}


</style>
