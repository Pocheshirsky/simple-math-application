<template lang="pug">
div( ref='canvasContainer' )
  canvas( id='threeCanvas' )
  
</template>

<script>
import { SceneMediator } from '@/scripts/sceneMediator';
import { useLinearApproximationStore } from "@/scripts/store/linearApproximation.module";

export default {
  
  watch: {
    linApproxPoints() {
      console.log(this.linApproxPoints)
    }
  },

  computed: {
    linApproxStore: () => useLinearApproximationStore(),

    linApproxPoints() {
      return this.linApproxStore.points;
    },
  },

  mounted() {
    this.linApproxStore.$subscribe((mutation, state) => {
      mutation
      console.log(state.points[0].value[0])

      SceneMediator.SceneObjects.createPoint({
        position: [state.points[0].value[0], state.points[0].value[1]],
        color: 0x993333
      })
    })

    SceneMediator.SceneCreator.initScene(this.$refs['canvasContainer'])
    SceneMediator.SceneObjects.createPoint({
      position: [0, 0],
      color: 0x993333
    })
    SceneMediator.SceneObjects.createPoint({
      position: [0.001, 0.001],
      color: 0x339933
    })
    SceneMediator.SceneObjects.createPoint({
      position: [0.002, 0.002],
      color: 0x333399
    })
  },


}

</script>

<style>
</style>
