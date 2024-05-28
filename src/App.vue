<template lang="pug">
div.main
  left-panel( id="leftPanel" )
  three-scene( id="threeScene" )
  top-panel( id="topPanel" )

</template>

<script>
import LeftPanel from "./components/LeftPanel.vue"
import ThreeScene from "./components/ThreeScene.vue"
import TopPanel from "./components/TopPanel.vue"

export default {
  components: {
    LeftPanel: LeftPanel,
    ThreeScene: ThreeScene,
    TopPanel: TopPanel
  },
}

</script>

<style>
.main {
  display: flex;
}
</style>
