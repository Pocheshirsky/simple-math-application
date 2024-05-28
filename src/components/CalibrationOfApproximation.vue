<template lang="pug">
div.ml-2
  div(v-if="equation && canDraw")
    div.headerStyle Калибровочный график

    div.calibration
      div
        v-text-field.inputs( v-model="c" flat variant="outlined" label="c" hide-details @input="setCValue" @keypress="numberFilter" density="compact" bg-color="#424242" )
        v-divider.mt-1(class="border-opacity-100")
        span.ml-3 {{ a }} 
      div.calibration.mt-4 
        div.ml-2 {{ "* (" }}
        div.inputs.ml-1
          v-text-field( v-model="y" flat variant="outlined" label="y" hide-details @input="setYValue" @keypress="numberFilter" density="compact" bg-color="#424242" )
        div.ml-1 {{ "&#8212" }}
        span.ml-1 {{ b }}
        div {{ " ) = " }}
        span.ml-1 {{ result }}
  div(v-else-if="equation") Уравнение прямой не имеет решений - калибровка невозможна
</template>

<script>
import { useLinearApproximationStore } from '@/scripts/store/linearApproximation.module';

export default {

  data() {
    return {
      y: 0,
      c: 0,
    }
  }, 

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

    a() {
      return parseFloat(this.equation.a).toFixed(3)
    },

    b() {
      return parseFloat(this.equation.b).toFixed(3)
    },

    result() {
      return parseFloat(( this.c / this.a ) * ( this.y - this.b)).toFixed(3)
    }
  },

  methods: {
    numberFilter: function(evt) {
      evt = (evt) ? evt : window.event;
      let expect = evt.target.value.toString() + evt.key.toString();
      
      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
      } 
      else {
        return true;
      }
    },

    setCValue() {
      // console.log(this.c)
    },

    setYValue() {
      // console.log(this.y)
    }
  }
}
</script>

<style>
.inputs {
  width: auto;
}

.calibration {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.headerStyle {
  font-size: 22px !important;
  margin-bottom:16px ;
}
</style>