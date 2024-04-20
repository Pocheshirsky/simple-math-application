<template lang="pug">
div.main
  left-panel( id="leftPanel" )
  three-scene( id="threeScene" )
  
  

</template>

<script>
import LeftPanel from "./components/LeftPanel.vue"
import ThreeScene from "./components/ThreeScene.vue"

export default {
  components: {
    LeftPanel: LeftPanel,
    ThreeScene: ThreeScene
  },

  methods: {}
}

</script>

<style>
.main {
  display: flex;
}
</style>
