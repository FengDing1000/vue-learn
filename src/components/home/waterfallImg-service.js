let waterfallImgService = {
    getImgList: function(that, pageIndex) {
        let url = "/static/data/imagesList" + pageIndex + ".json";
        let params = {
            page: pageIndex
        };
        return that.$http.get(url, params).then(function(res) {
            return res.body;
        })
    },
    initLazyLoad: function(that, className, opts) {
        var $this = this;
        // v-for 循环执行之后执行
        that.$nextTick(function() {
            let opts1 = {
                itemClass: ".waterfall-item", // 瀑布流item的样式。
                spacingWidth: 5, // item之间的水平距离/2。
                spacingHeight: 10, // item之间的垂直距离。
                minColCount: 1, // 最小的列数
                resizeable: true, // 是否支持浏览器缩放重新排布
                itemAlign: "center", // 容器内部元素的对齐方式 left center right
                effectStyle: "bounceIn", // 设置是否要动画效果添加图片的动画方式。
                addBlankItemClass: ".add-fallwater-item", //添加补全底部的容器的样式。
                isCompletionBlank: true, //是否补全底部不对称空白。
                prestrainHeight: 50, //滚动提前加载的距离。
                newClass: ".new-items", //不是默认加载的通过滚动调用加载的。
                loadingShow: true, //数据加载的时候的下拉动画是否显示。
                loadClass: "fallwater-loading",
                loadCss: {
                    "position": "fixed",
                    "width": "100%",
                    "height": 50,
                    "lineHeight": "50px",
                    "left": 0,
                    "bottom": 0,
                    "textAlign": "center",
                    "backgroundColor": "#818181",
                    "opacity": "0.6"
                },
                loadingHtml: "<img style=\"width:50px;height:50px;vertical-align:middle\" src=\"/static/images/gifs/gif_1.gif\">",
                ajaxCallback: function(success, end) {
                        // that.currentPage++;
                        that.currentPage = Math.ceil(Math.random() * 2);
                        if (that.imgLists.length <= that.imgTotal) {
                            $this.getImgList(that, that.currentPage).then(function(json) {
                                json.data.map(function(item, index, arr) {
                                    item.newClass = "new-items";
                                })
                                that.imgLists = that.imgLists.concat(json.data);
                                that.$nextTick(function() {
                                    $(that.$refs[className]).lazyload(that.lazyloadOpts);
                                    success();
                                    end();
                                })
                            })
                        } else {
                            success(true);
                            end();
                        }
                    } // ajax回调， 两个参数 是两个函数 第一个函数支持一个参数 true表示没有了 false还是 第二个是加载框消失。
            };
            $(that.$refs.waterfallContainer).waterfall(opts1);
            $(that.$refs[className]).lazyload(that.lazyloadOpts);
        })
    }
}
export default waterfallImgService;