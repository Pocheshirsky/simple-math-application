<template lang="pug">
div
    div.width {{ "Количество точек" }}
        v-text-field(v-model="pointNumberString")
    div(v-if="pointNumber")
        div(v-for="index in pointNumber")
            //- div {{ index }}
            point-input-unit.mb-4(:number="index")
            //- point-input-unit.mb-4
            //- point-input-unit.mb-4
            //- point-input-unit.mb-4
</template>

<script>
import PointInputUnit from './PointInputUnit'

export default {
    components: {
        PointInputUnit: PointInputUnit
    },

    data() {
        return {
            pointNumberString: 0
        }
    },

    computed: {
        pointNumber() {
            return parseInt(this.pointNumberString)
        }
    }
}
</script>

<style>
.width {
    width: 350px
}
</style>