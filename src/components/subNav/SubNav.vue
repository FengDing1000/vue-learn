<template>
<div id="menu_wrap" class="container-fluid plf0" :class="{'subNavFixed':subNavFixed}" v-on:mouseleave="menu_wrap_Mouseleave($event)">
    <div class="container subNavItems plf0">
        <a v-bind:class="['subNavItem', {'subNavPanel_bg':currentIndex === index&&item.class_sub_item, 'subNavItem_bottom':item.class_sub_item, 'navxs': item.hide }]" v-on:mouseover="subNavItem_mouseover($event,item,index)" v-on:mouseout="subNavItem_mouseout($event,index)"
            v-for="(item,index) in subNavBarList" :key="item.id" v-bind:href="item.url" v-bind:target="item.target">
            <span class="sort">
                <i v-if="item.leftIcon.show" v-bind:class="item.leftIcon.icon"></i>
                &nbsp;
                <b v-if="item.nameStrong">{{item.name}}</b>
                <span v-else>{{item.name}}</span>
                <i v-if="item.rightIcon.show" v-bind:class="item.rightIcon.icon"></i>
            </span>
        </a>
    </div>
    <div class="container-fluid" v-show="containerShow">
        <div class="subNavPanels">
            <ul v-show="index1==currentIndex" class="subNavPanel list-inline container m0" v-for="(item1,index1) in subNavBarPanelList" :key="item1.id">
                <li v-for="(item2,index2) in item1.list" :key="item2.id">
                    <a class="panelItem border-cool-effect draw" v-on:mouseover="subNavPanel_a_mouseover(index2)" v-on:mouseout="subNavPanel_a_mouseout(index2)" ref="subNavPanel_a" v-bind:href="item2.url">
                        <i v-bind:class="[item2.icon,{'ls':currentHoverIndex != index2}]"></i>{{item2.name}}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import subNavInit from './subNavInit';
import subNavSevrice from './subNav-service';
export default {
    name: 'subNav',
    mounted() {
        subNavInit(this);
        subNavSevrice.getSubNavBarData(this).then(function(res) {
            this.subNavBarList = res.body.data;
        }.bind(this));
        subNavSevrice.getSubNavBarPanelData(this).then(function(res) {
            this.subNavBarPanelList = res.body.data;
        }.bind(this));
    },
    created() {

    },
    data() {
        return {
            subNavFixed: false,
            subNavBarList: [],
            subNavBarPanelList: [],
            timer: null,
            currentIndex: null,
            currentHoverIndex: null,
            containerShow: false
        }
    },
    computed: {
        chageState() {
            return this.$store.state.subNavBarFixed;
        }
    },
    watch: {
        chageState(state) {
            this.subNavFixed = state;
        }
    },
    methods: {
        subNavItem_mouseover(e, item, index) {
            if (item.class_sub_item) {
                this.timer = setTimeout(function() {
                    this.containerShow = true;
                    this.currentIndex = index;
                }.bind(this), 300)
            } else {
                this.currentIndex = null;
                this.containerShow = false;
            }
        },
        subNavItem_mouseout(e) {
            clearTimeout(this.timer);
        },
        menu_wrap_Mouseleave(index) {
            this.containerShow = false;
            this.currentIndex = null;
        },
        subNavPanel_a_mouseover(index) {
            this.currentHoverIndex = index;
        },
        subNavPanel_a_mouseout(index) {
            this.currentHoverIndex = null;
        }
    }
}
</script>

<style scoped>
#menu_wrap {
    position: relative;
    top: 300px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #FFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
    text-align: center;
    font-size: 15px;
    color: #C8C8C8;
    z-index: 5;
}

#menu_wrap.subNavFixed {
    position: fixed;
    top: 50px;
}

#menu_wrap .plf0 {
    padding-left: 0px;
    padding-right: 0px;
}

#menu_wrap a {
    text-decoration: none;
    color: #69696d;
}

#menu_wrap a:hover {
    color: #1769ff;
}

#menu_wrap .subNavItems a.subNavItem:after {
    content: "|";
    color: #69696d;
}

#menu_wrap .subNavItems a.subNavItem:last-of-type:after {
    content: "";
}

#menu_wrap .subNavItems a.subNavPanel_bg {
    padding-bottom: 13px;
    border-bottom: 2px solid #007AFB;
}

#menu_wrap .sort {
    position: relative;
    max-width: 33%;
    display: inline-block;
    padding-right: 10px;
    padding-left: 10px;
    text-align: left;
    cursor: pointer;
}

#menu_wrap .subNavPanels {
    position: absolute;
    top: 50px;
    left: 0px;
    background-color: #fff;
    height: auto;
    width: 100%;
    text-align: left;
    border-top: 1px solid #E8E8E8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
}

#menu_wrap .subNavPanels ul {
    padding-top: 20px;
    padding-bottom: 10px;
}

#menu_wrap .subNavPanels li {
    width: 280px;
}

#menu_wrap .subNavPanels .list-inline>li {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
}

#menu_wrap .subNavPanels a {
    position: relative;
    display: block;
    padding-left: 40px;
    margin-left: 10px;
    padding-right: 20px;
    margin-right: 10px;
    line-height: 40px;
    border: 1px solid #EDEDED;
    box-sizing: border-box;
    transition: all 0.6s ease-in;
}

#menu_wrap .subNavPanels a:before,
#menu_wrap .subNavPanels a:after {
    position: absolute;
    display: block;
    content: "";
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 1px solid transparent;
}


/* 
    hover效果实现原理：先执行after的边框颜色动画 然后执行宽度动画 延时时间为宽度动画的执行时间再执行高度 同理执行before
    leave效果实现原理：先执行before的高度动画 延时时间为高度动画的执行时间再执行宽度动画 最后执行边框颜色动画 同理执行after
*/

#menu_wrap .subNavPanels a:before {
    bottom: 0;
    right: 0;
    transition: height 0.2s ease-in, width 0.2s ease-in 0.2s, border-color 0s ease-in 0.4s;
}

#menu_wrap .subNavPanels a:after {
    top: 0;
    left: 0;
    transition: height 0.2s ease-out 0.4s, width 0.2s ease-in 0.6s, border-color 0s ease-out 0.8s;
}

#menu_wrap .subNavPanels a:hover:before,
#menu_wrap .subNavPanels a:hover:after {
    width: 100%;
    height: 100%;
}

#menu_wrap .subNavPanels a:hover:before {
    border-bottom-color: #1769ff;
    border-left-color: #1769ff;
    transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.4s, height 0.2s ease-in 0.6s;
}

#menu_wrap .subNavPanels a:hover:after {
    border-top-color: #1769ff;
    border-right-color: #1769ff;
    transition: width 0.2s ease-out, height 0.2s ease-out 0.2s;
}

#menu_wrap .subNavPanels a:hover:after {
    width: 100%;
    height: 100%;
}

#menu_wrap .subNavPanels a:hover {
    border: 1px solid #1769ff;
}

#menu_wrap .subNavPanels a i {
    padding-right: 10px;
    font-size: 18px;
}

#menu_wrap .subNavPanels a .ls {
    color: #1769ff;
}

@media (max-width:992px) {
    #menu_wrap .subNavItems a.navxs {
        display: none;
    }
    #menu_wrap .subNavItems a.subNavItem:nth-of-type(4):after {
        content: "";
    }
}
</style>