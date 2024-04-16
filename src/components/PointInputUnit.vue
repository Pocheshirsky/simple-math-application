<template lang="pug">
div.d-flex.width
    div.mt-6.mr-3.ml-2 {{ "Point " + number }}
    v-text-field( v-model="optic_density" label="Optic density" flat solo )
    v-text-field( v-model="concentration" label="Concentracion" flat solo )
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

    mounted() {
        console.log(this.number)
    }
}
</script>

<style scoped>
.width {
    width: 350px;
}
</style>