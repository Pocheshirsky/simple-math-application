<template lang="pug">
div.lineEquation.bg-surface-variant( v-if="canDraw" )
  span.pl-2.pt-1 Уравнение прямой: 
  span.ml-2.mt-1.mr-2 {{ stringEquation }}
div.lineEquation.bg-surface-variant(v-else)
  span.pl-2.pt-1.mr-2 Уравнение прямой: решений нет.
</template>

<script>
import { useLinearApproximationStore } from '@/scripts/store/linearApproximation.module';

export default {
  computed: {
    store: () => useLinearApproximationStore(),

    equation() {
      return this.store.equation
    },

    canDraw() {
      if (this.equation) {
        if (Number.isFinite(this.equation.a) && Number.isFinite(this.equation.b)) {
          return true
        } 
        else return false
      } 
      return false
    },

    stringEquation() {
      if (this.equation != null) return `y = ${this.equation.a > 0 ? "" : "- "} ${Math.abs(parseFloat(this.equation.a).toFixed(3))} * x ${this.equation.b > 0 ? "+ " : "- "} ${Math.abs(parseFloat(this.equation.b).toFixed(6))}`
      else return ''
    }
  },

  methods: {}
}
</script>

<style>
.lineEquation {
  width: auto;
  height: 30px;
  display: flex;
  position: absolute;
  top: 16px;
  left: 55%;
}
</style>