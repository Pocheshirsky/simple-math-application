<template lang="pug">
div.d-flex.width
  div.mt-5.mr-3.ml-2 {{ "Point " + index }}
  v-text-field( v-model="optic_density" label="Optic density" flat solo hide-details single-line @input="setValue" @keypress="numberFilter")
  v-text-field( v-model="concentration" label="Concentracion" flat solo hide-details single-line @input="setValue" @keypress="numberFilter")
  v-btn.bg-surface.mt-2.ml-4.mr-4( @click="deleteMyself" ) -
</template>

<script>
import { useLinearApproximationStore } from "@/scripts/store/linearApproximation.module";

export default {
  data() {
    return {
      optic_density: 0,
      concentration: 0,
    };
  },

  mounted() {
    // Создать сущность точки на сцене и привязать ее к данным в store
  },

  computed: {
    store: () => useLinearApproximationStore()
  },

  props: {
    index: Number,
  },

  methods: {
    deleteMyself() {
      this.store.deletePointByIndex(this.index)
    },

    setValue() {
      let value = [parseFloat(this.optic_density), parseFloat(this.concentration)]
      this.store.setPointByIndex(this.index, value)
    },

    numberFilter: function(evt) {
      evt = (evt) ? evt : window.event;
      let expect = evt.target.value.toString() + evt.key.toString();
      
      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
      } 
      else {
        return true;
      }
    }

  },

  beforeUnmount() {
    // Удалить точку на сцене
  }
};
</script>

<style scoped>
.width {
  width: 500px;
}
</style>
