<template lang="pug">
div( ref="canvasContainer" )
  canvas( ref="threeCanvas" )
  
</template>

<script>
import * as THREE from 'three';

export default {
  
  mounted() {
    this.initCanvas();
    // this.bindEventListeners();
  },

  methods: {
    initCanvas() {
      // Инициализация сцены
      const leftPanelWidth = document.getElementById("leftPanel").offsetWidth
      const width = window.innerWidth - leftPanelWidth
      const height = this.$refs['canvasContainer'].offsetHeight

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, width / height, 0.001, 1000 );

      const renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.threeCanvas
      });
      renderer.setSize( width, height );

      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
      }

      animate();
    },
  }
}

</script>

<style>
</style>
