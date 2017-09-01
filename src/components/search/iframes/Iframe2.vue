<template>
<div id="canvasContainer">
    <canvas ref="canvas2" height="450" width="450"></canvas>
</div>
</template>

<script>
import Iframe from "./js/iframe2";
export default {
    name: 'iframe',
    created: function() {

    },
    mounted: function() {
        Iframe.canvas(this,this.$refs.canvas2);
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
    position: absolute;
    top: calc( 50% - 250px);
    left: calc( 50% - 250px);
    box-shadow: 0 0 2px #111;
    border-radius: 250px;
    background-color: #000;
}

#canvasContainer p {
    font: 20px Helvetica;
    color: #eee;
    position: absolute;
    width: 500px;
    text-align: center;
    top: calc( 50% - 300px);
    left: calc( 50% - 250px);
}
</style>