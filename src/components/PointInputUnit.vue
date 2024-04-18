<template lang="pug">
div.d-flex.width
    div.mt-6.mr-3.ml-2 {{ "Point " + number }}
    v-text-field( v-model="optic_density" label="Optic density" flat solo )
    v-text-field( v-model="concentration" label="Concentracion" flat solo )
    v-btn.bg-surface.mt-4.ml-4( @click="childrenPoint" ) Сохранить
</template>

<script>
export default {
    data() {
        return {
            optic_density: 0,
            concentration: 0
        }
    },

    props: {
        number: Number
    },

    methods: {
        childrenPoint() {
            this.$emit('childrenPoint', [parseInt(this.optic_density), parseInt(this.concentration)])
        }
    }

}
</script>

<style scoped>
.width {
    width: 500px;
}
</style>