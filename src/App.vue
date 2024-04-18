<template lang="pug">
div
  left-panel( @computeParameters="computeParameters" )

</template>

<script>
import LeftPanel from "./components/LeftPanel.vue"
// import PointInputUnit from './components/PointInputUnit.vue'

export default {
  components: {
    LeftPanel: LeftPanel,
    // PointInputUnit: PointInputUnit
  },

  methods: {
    computeParameters(pointsArray) {
      console.log("points", pointsArray)
    }
  }
}

</script>

<style>
</style>
