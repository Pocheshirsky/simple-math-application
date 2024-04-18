<template lang="pug">
div.bg-surface-variant.style
  point-input( @computeParameters="computeParameters" )
            
</template>

<script>
import PointInput from './PointInput.vue';

export default {
  components: {
    PointInput: PointInput
  },

  data() {
    return {
      
    }
  },

  computed: {
    
  },

  methods: {
    computeParameters(pointsArray) {
      this.$emit('computeParameters', pointsArray)
    }
  },
};
</script>

<style>
.style {
  width: 500px;
  height: 1080px;
}
</style>
