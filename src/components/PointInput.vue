<template lang="pug">
div
    div.width {{ "Количество точек" }}
        v-text-field(v-model="pointNumberString")
    div(v-if="pointNumber")
        div(v-for="index in pointNumber")
            //- div {{ index }}
            point-input-unit.mb-4(:number="index" @childrenPoint="childrenPoint")
            //- point-input-unit.mb-4
            //- point-input-unit.mb-4
            //- point-input-unit.mb-4
    div {{ this.pointsArray }}
    v-btn.bg-surface( @click="computeParameters" ) Посчитать
</template>

<script>
import PointInputUnit from './PointInputUnit'

export default {
    components: {
        PointInputUnit: PointInputUnit
    },

    data() {
        return {
            pointNumberString: 0,
            pointsArray: []
        }
    },

    computed: {
        pointNumber() {
            return parseInt(this.pointNumberString)
        },
    },

    methods: {
        childrenPoint(point) {
            this.pointsArray.push(point)
        },
        
        computeParameters() {
            this.$emit('computeParameters', this.pointsArray)
        }
    }
}
</script>

<style>
.width {
    width: 350px
}
</style>