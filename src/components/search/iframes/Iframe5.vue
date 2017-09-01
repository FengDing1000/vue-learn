<template>
<div id="canvasContainer" ref="container">

</div>
</template>

<script>
import Iframe from "./js/iframe5";
const TweenMax = require('./script/TweenMax');
import {
    Scene,
    ShaderMaterial,
    PerspectiveCamera,
    BoxGeometry,
    Mesh,
    WebGLRenderer
} from 'three';
export default {
    name: 'iframe',
    created: function() {

    },
    mounted: function() {
        Iframe.canvas(Scene,
            ShaderMaterial,
            PerspectiveCamera,
            BoxGeometry,
            Mesh,
            WebGLRenderer,TweenMax.TweenMax,this, this.$refs.container);
    },
    computed: {},
    watch: {},
    data: function() {
        return {
        }
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