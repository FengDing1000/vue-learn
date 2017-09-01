<template>
<div id="BookStory">
  <my-nav></my-nav>
  <my-search></my-search>
  <sub-nav></sub-nav>
  <router-view class="mainContent"></router-view>
</div>
</template>

<script>
import myNav from './components/nav/Nav';
import mySearch from './components/search/Search';
import subNav from './components/subNav/SubNav';
export default {
  name: 'app',
  data() {
    return {
      
    }
  },
  computed:{},
  watch:{},
  methods: {},
  components: {
    myNav,
    mySearch,
    subNav
  }
}
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}

body {
  overflow-x: hidden;
  overflow-y: auto;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#BookStory .mainContent {
  position: relative;
  width: 100%;
  background-color: #fff;
  z-index: 2;
}

#BookStory .mainContent.router-home {
  top: 300px;
}

#BookStory .mainContent.router-others {
  top: 50px;
}
</style>
