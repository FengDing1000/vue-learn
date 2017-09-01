<template>
<div id="canvasContainer">
    <canvas ref="canvas4" width="1858" height="300"></canvas>
</div>
</template>

<script>
import Iframe from "./js/iframe4";
export default {
    name: 'iframe',
    created: function() {

    },
    mounted: function() {
        Iframe.canvas(this,this.$refs.canvas4);
    },
    computed: {},
    watch: {},
    data: function() {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
#canvasContainer canvas {
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>