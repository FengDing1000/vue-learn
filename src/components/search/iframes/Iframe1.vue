<template>
<div id="canvasContainer">   
    <canvas class="canv" ref="canv" width="1858" height="300"></canvas>
    <canvas class="canvas" ref="canvas1" height="400" width="400"></canvas>
</div>
</template>

<script>
import Iframe from "./js/iframe1";
export default {
    name: 'iframe',
    created: function() {

    },
    mounted: function() {
        Iframe.canvas1(this,this.$refs.canv);   
        Iframe.canvas2(this.$refs.canvas1);             
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
#canvasContainer .canvas {
    position: absolute;
    z-index: -2;
    -webkit-filter: hue-rotate(100deg) brightness(1);
    filter: hue-rotate(100deg) brightness(1);
    mix-blend-mode: difference;
}

#canvasContainer .canv {
    position: absolute;
    z-index: -2;
    mix-blend-mode: lighter;
}

#canvasContainer canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>