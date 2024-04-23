<template lang="pug">
div( ref='canvasContainer' )
  canvas( id='threeCanvas' )
  
</template>

<script>
import { SceneMediator } from '@/scripts/sceneMediator';
import { useLinearApproximationStore } from "@/scripts/store/linearApproximation.module";

export default {


  computed: {
    linApproxStore: () => useLinearApproximationStore(),

    linApproxPoints() {
      return this.linApproxStore.points;
    },
  },
  mounted() {
   

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
