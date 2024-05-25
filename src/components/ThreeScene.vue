<template lang="pug">
div( ref='canvasContainer' )
  canvas( id='threeCanvas' )
  
</template>

<script>
import { SceneMediator } from '@/scripts/sceneMediator';
import { SceneObjects } from '@/scripts/sceneObjects';
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
    this.linApproxPoints[0].mesh = SceneObjects.createPoint({ position: [0, 0], color: 0x993333 })
  },


}

</script>

<style>
</style>
