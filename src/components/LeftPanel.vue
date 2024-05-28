<template lang="pug">
div.bg-surface-variant.style 
  div.approxHeaderStyle.ml-2.mt-2 Линейная аппроксимация
  point-input.mb-4
  calibration-of-approximation
</template>

<script>
import PointInput from './PointInput.vue';
import CalibrationOfApproximation from './CalibrationOfApproximation.vue'

export default {
  components: {
    PointInput: PointInput,
    CalibrationOfApproximation: CalibrationOfApproximation
  },

  computed: {},

  methods: {},
};
</script>

<style>
.style {
  width: 500px;
  height: 1080px;
}

.approxHeaderStyle {
  font-size: 28px !important;
}
</style>
