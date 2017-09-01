<template>
<div id="search-content" v-if="searchContainer">
    <div class="heightHidden">
        <!-- 条件搜索 -->
        <div class="search-container">
            <div class="search-input">
                <input class="inputTxt" placeholder="输入小说关键字.." type="text">
                <button class="btn absolute searchBtn" type="button"><i class="fa fa-chevron-circle-right"></i> 找到你梦想</button>
                <span class="absolute searchIcon"><i class="fa fa-search"></i></span>
            </div>
        </div>
        <div v-if="iframeIndex == 0" class="baniframe blankImg"></div>
        <iframe1 v-if="iframeIndex == 1" class="baniframe"></iframe1>
        <iframe2 v-if="iframeIndex == 2" class="baniframe"></iframe2>
        <iframe3 v-if="iframeIndex == 3" class="baniframe"></iframe3>
        <iframe4 v-if="iframeIndex == 4" class="baniframe"></iframe4>
        <iframe5 v-if="iframeIndex == 5" class="baniframe"></iframe5>
        <!-- <iframe class="baniframe" sandbox="allow-scripts allow-same-origin" :src="myIframe.src"></iframe> -->
        <div type="button" class="changeBtn" ref="toolIframeTip" data-toggle="toolIframeTip" data-placement="left" title="如果您的电脑配置较低，请关闭背景特效" @click.stop="changeIframe">{{myIframe.text}}</div>
    </div>
</div>
</template>

<script>
import Iframe1 from './iframes/Iframe1';
import Iframe2 from './iframes/Iframe2';
import Iframe3 from './iframes/Iframe3';
import Iframe4 from './iframes/Iframe4';
import Iframe5 from './iframes/Iframe5';
import Vue from 'vue';
export default {
    name: 'search',
    created: function() {},
    mounted: function() {
        $(this.$refs.toolIframeTip).tooltip();
    },
    data: function() {
        return {
            searchContainer: true,
            myIframeShow: false,
            showToolTipFlag: false,
            iframeIndex: 0,
            myIframe: {
                src: "/static/iframes/iframe5.html",
                text: "关闭背景特效"
            }
        }
    },
    computed: {
        searchContainerStateChange() {
            return this.$store.state.searchContainer;
        },
        iframeChange() {
            return this.$store.state.iframeChange;
        }
    },
    watch: {
        searchContainerStateChange: function(state) {
            this.searchContainer = state;
        },
        iframeChange: function() {
            this.renderIframe();
        }
    },
    methods: {
        changeIframe: function() {
            window.cancelAnimationFrame(window.headerCanvasFrame);            
            if (this.myIframeShow) {
                this.renderIframe();
            } else {
                this.iframeIndex= 0;
                // this.myIframe.src = "/static/iframes/iframe0.html";
                this.myIframe.text = "开启背景特效";
            }
            this.myIframeShow = !this.myIframeShow;
        },
        renderIframe: function() {
            var index = Math.ceil(Math.random() * 5);
            // debugger;
            this.iframeIndex = index;
            // this.myIframe.src = "/static/iframes/iframe" + index + ".html";
            this.myIframe.text = "关闭背景特效";
        }
    },
    components: {
        Iframe1,
        Iframe2,
        Iframe3,
        Iframe4,
        Iframe5
    }
}
</script>

<style scoped>
#search-content a,
#search-content button {
    outline: none;
}

#search-content a {
    cursor: pointer;
}

#search-content {
    position: fixed;
    top: 50px;
    width: 100%;
    height: 350px;
    padding-top: 0;
    z-index: 1;
}

#search-content .heightHidden {
    position: relative;
    height: 300px;
}

#search-content .absolute {
    position: absolute;
}

#search-content .search-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 120px calc(50% - 314px);
    background-color: rgba(16, 18, 22, 1.00);
}

#search-content .search-container .search-input {
    position: relative;
    width: 100%;
    max-width: 728px;
    z-index: 2;
}

#search-content .search-container .inputTxt {
    width: 100%;
    height: 60px;
    opacity: 1;
    background-color: #eceff1;
    border-radius: 5px;
    border: 0px;
    padding-left: 50px;
    color: #000;
    outline: none;
}

#search-content .search-container .searchBtn {
    top: 0;
    right: 0;
    height: 60px;
    width: 173px;
    background-color: #ec4d1c;
    border: 0px;
    color: #fff;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    transition: all .7s ease 0s;
    font-size: 15px;
    background: -webkit-linear-gradient(top, #f4511e 0, #d84315 100%);
    background: linear-gradient(to bottom, #f4511e 0, #d84315 100%);
}

#search-content .search-container .searchBtn:hover {
    color: #fff;
    background-color: #ed3800;
    background: -webkit-linear-gradient(top, #f03900 0, #bb2c00 100%);
    background: linear-gradient(to bottom, #f03900 0, #bb2c00 100%);
}

#search-content .search-container .searchIcon {
    transition: all 1.5s ease 0s;
    left: 20px;
    top: 18px;
    color: #b0bec5;
    font-size: 18px;
}

#search-content .baniframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-width: 0px;
    z-index: 1;
    background-color: #000;
}

#search-content .blankImg {
    background-image: url(/static/images/bgImg/bg_1.png);
    background-position: center 0%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
/* #search-content .baniframe canvas{
    user-select: none;
} */
#search-content .changeBtn {
    user-select: none;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: rgba(255, 255, 255, 0.13);
    padding: 3px;
    font-size: 12px;
    color: #656565;
    border-radius: 5px;
    cursor: pointer;
    z-index: 2;
}
</style>