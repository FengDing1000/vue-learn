<template>
<div id="homePage" class="router-home">
  <!-- 瀑布流容器 -->
  <div class="mainContainer clearfix plf0">
    <div class="waterfall-container clearfix" ref="waterfallContainer">
      <div class="waterfall-item" v-bind:style="{width:item.width+'px',height:item.height+'px'}" v-bind:class="item.newClass?item.newClass:''" v-for="(item,index) in imgLists" :key="index">
        <img ref="lazy-load" v-bind:data-src="item.image" />
        <div class="infoMask">
          <div class="infoContainer">这是内容部分</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import '../../assets/scripts/jquery.waterfall';
import initHome from '../init/initHome';
import waterfallImgService from './waterfallImg-service';
export default {
  name: 'home',
  created: function() {
    initHome(this);
  },
  mounted: function() {
    waterfallImgService.getImgList(this, this.currentPage).then(function(json) {
      this.imgLists = json.data;
      this.imgTotal = json.total;
      waterfallImgService.initLazyLoad(this, this.className, this.lazyLoadOpts);
    })
  },
  watch: {},
  data() {
    return {
      className: "lazy-load",
      lazyLoadOpts: {
        data_attribute: "src"
      },
      lazyloadOpts: {
        // effect: "fadeIn",
        data_attribute: "src"
      },
      imgTotal: 0,
      currentPage: 1,
      imgLists: [],
    }
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

#homePage .plf0 {
  padding-left: 0;
  padding-right: 0;
}

#homePage .mainContainer {
  width: 80%;
  margin: 0 auto;
}

#homePage .waterfall-container {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
  overflow: hidden;
  text-align: center;
  /* background-color: #f00; */
}

#homePage .contentHide {
  display: none;
}

#homePage .waterfall-container .waterfall-item {
  float: left;
  padding: 10px;
  border: 1px solid #ccc;
  background: #f7f7f7;
  box-shadow: 0 0 8px #ccc;
}

#homePage .waterfall-container .waterfall-item:hover {
  box-shadow: 0 0 4px 4px #3361D0;
}

#homePage .waterfall-container .waterfall-item img {
  width: 100%;
  height: 80%;
}

#homePage .waterfall-container .waterfall-item div.infoMask {
  position: relative;
  width: 100%;
  height: 20%;
  background-color: #000;
  opacity: 0.8;
}

#homePage .waterfall-container .waterfall-item div.infoContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #ccc;
}
</style>
