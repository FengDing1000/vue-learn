<template>
<div id="canvasContainer">
    <canvas ref="canvas3" width="1858" height="300"></canvas>
</div>
</template>

<script>
import Iframe from "./js/iframe3";
export default {
    name: 'iframe',
    created: function() {

    },
    mounted: function() {
        Iframe.canvas(this,this.$refs.canvas3);
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
#canvasContainer {
    width: 100%;
    height: 100%;
    background-image: -webkit-radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    background-image: radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    cursor: move;
}
</style>