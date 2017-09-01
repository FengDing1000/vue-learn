<template>
<div id="person" class="router-others">

</div>
</template>

<script>
import initOthers from '../init/initOthers';
export default {
    name: 'person',
    created: function() {
        initOthers(this);
    },
    mounted: function() {

    },
    data: function() {
        return {}
    },
    methods: {},
    components: {}
}
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
#person{
    height:1000px;
    background-image: url(/static/images/imgs/pc/img_pc3.jpg);
}
</style>