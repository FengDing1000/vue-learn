/**
 * jquery waterfall
 * @author FengDing
 * @update 2017-8-21
 * @version 1.0
 * @parameters
 * itemClass: ".waterfall-item", // 瀑布流item的样式。
    spacingWidth: 5, // item之间的水平距离/2。
    spacingHeight: 5, // item之间的垂直距离。
    minColCount: 2, // 最小的列数
    resizeable: false, // 是否支持浏览器缩放重新排布
    itemAlign: "center", // 容器内部元素的对齐方式 left center right
    effectStyle: "fadeIn", // 设置是否要动画效果添加图片的动画方式。
    addBlankItemClass: ".add-fallwater-item", //添加补全底部的容器的样式。
    isCompletionBlank: true, //是否补全底部不对称空白。
    prestrainHeight: 50, //滚动提前加载的距离。
    newClass: ".new-items", //不是默认加载的通过滚动调用加载的。
    loadingShow: true, //数据加载的时候的下拉动画是否显示。
    loadClass: "fallwater-loading", //加载遮罩层默认class。
    loadCss: {
        "position": "fixed",
        "width": "100%",
        "height": 50,
        "lineHeight": "50px",
        "left": 0,
        "bottom": 0,
        "textAlign": "center",
        "backgroundColor": "#818181",
        "opacity": "0.6",
        "zIndex": 10000,
        "verticalAlign": "middle"
    }, //加载遮罩层默认样式
    loadingInnerHtml: "<div>loading</div>", //加载默认html 支持函数。
    noMoreDataCss: {
        "position": "absolute",
        "width": "100%",
        "height": 50,
        "lineHeight": "50px",
        "left": 0,
        "bottom": 0,
        "textAlign": "center",
        "backgroundColor": "#fff",
        "color": "#333",
        "fontSize": "20px",
        "verticalAlign": "middle"
    }, //无更多数据容器默认样式。
    noMoreDataClass: "no-more-data", //没有更多数据默认class。
    noMoreDataInnerHtml: "<div>noMoreData</div>", //没有更多数据默认html 支持函数。
    ajaxCallback: null // ajax回调， 两个参数 是两个函数 第一个函数支持一个参数 true表示没有了 false还是 第二个是加载框消失。
 */
(function($) {
    var $$window = $(window),
        pluginName = 'waterfall',
        defaults = {
            itemClass: ".waterfall-item", // 瀑布流item的样式。
            spacingWidth: 5, // item之间的水平距离/2。
            spacingHeight: 5, // item之间的垂直距离。
            minColCount: 2, // 最小的列数
            resizeable: true, // 是否支持浏览器缩放重新排布
            itemAlign: "center", // 容器内部元素的对齐方式 left center right
            effectStyle: "zoomIn", // 设置是否要动画效果添加图片的动画方式。
            addBlankItemClass: ".add-fallwater-item", //添加补全底部的容器的样式。
            isCompletionBlank: true, //是否补全底部不对称空白。
            prestrainHeight: 50, //滚动提前加载的距离。
            newClass: ".new-items", //不是默认加载的通过滚动调用加载的。
            loadingShow: true, //数据加载的时候的下拉动画是否显示。
            loadClass: "fallwater-loading", //加载遮罩层默认class。
            loadCss: {
                "position": "fixed",
                "width": "100%",
                "height": 50,
                "lineHeight": "50px",
                "left": 0,
                "bottom": 0,
                "textAlign": "center",
                "backgroundColor": "#818181",
                "opacity": "0.6",
                "zIndex": 10000,
                "verticalAlign": "middle"
            }, //加载遮罩层默认样式
            loadingInnerHtml: "<div>loading</div>", //加载默认html 支持函数。
            noMoreDataCss: {
                "position": "absolute",
                "width": "100%",
                "height": 50,
                "lineHeight": "50px",
                "left": 0,
                "bottom": 0,
                "textAlign": "center",
                "backgroundColor": "#fff",
                "color": "#333",
                "fontSize": "20px",
                "verticalAlign": "middle",
            }, //无更多数据容器默认样式。
            noMoreDataClass: "no-more-data", //没有更多数据默认class。
            noMoreDataInnerHtml: "<div>noMoreData</div>", //没有更多数据默认html 支持函数。
            ajaxCallback: null // ajax回调， 两个参数 是两个函数 第一个函数支持一个参数 true表示没有了 false还是 第二个是加载框消失。
        };

    function Waterfall(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.ajaxLoading = false; // ajax加载loading
        this.colHeightArray = []; // 最后一组的高度。
        this.lastIndex = 0;
        this.isHasMore = true;
        this.defaultLoad = true;
        this.$item = null;
        this._init(); //初始化
    }

    Waterfall.prototype = {
        constructor: Waterfall,
        _init: function() {
            var $this = this;
            // 所有的dom树都加载完执行
            // $$window.on("load", function() {
            $this._positionAll();
            $this._doScroll();
            $this.defaultLoad = false;
            // });
            if (this.options.resizeable) {
                $$window.on("resize", $this.throttle(function() {
                    $this._positionAll();
                    if (!$this.isHasMore) {
                        $this.isEndDecorate();
                    }
                }, 60, 300))
            }
        },
        throttle: function(fn, delay, mustRunDelay) {
            var timer = null;
            var t_start;
            var mustRunDelay = mustRunDelay || 300;
            var delay = delay || 60;
            return function() {
                var context = this;
                var args = arguments;
                var t_curr = +new Date();
                clearTimeout(timer);
                if (!t_start) {
                    t_start = t_curr;
                }
                if (t_curr - t_start >= mustRunDelay) {
                    fn.apply(context, args);
                    t_start = t_curr;
                } else {
                    timer = setTimeout(function() {
                        fn.apply(context, args);
                    }, delay);
                }
            };
        },
        addLoading: function() {
            var loadingInnerHtml;
            if (typeof this.options.loadingInnerHtml == "function") {
                loadingInnerHtml = this.options.loadingInnerHtml();
            } else if (typeof this.options.loadingInnerHtml == "string") {
                loadingInnerHtml = this.options.loadingInnerHtml
            } else {
                loadingInnerHtml = this.options.loadingInnerHtml;
            }
            if (this.options.loadingShow && $("body").find("." + this.options.loadClass).length == 0) {
                $("<div/>").addClass(this.options.loadClass)
                    .css(this.options.loadCss).append($(loadingInnerHtml)).appendTo($("body"));
            }

        },
        removeLoading: function() {
            if ($("body").find("." + this.options.loadClass).length > 0) {
                $("body").find("." + this.options.loadClass).remove();
            }
        },
        _getColumnCount: function() {
            var parentWidth = this.$element.width(),
                itemWidth = this.$item.eq(0).outerWidth(),
                iCol = Math.floor(parentWidth / (itemWidth + this.options.spacingWidth * 2)),
                realWidth = 0,
                leftOffset = 0;

            iCol = iCol > this.options.minColCount ? iCol : this.options.minColCount;
            realWidth = iCol * itemWidth;
            if (parentWidth > realWidth) {
                leftOffset = Math.floor((parentWidth - realWidth - 2 * iCol * this.options.spacingWidth) / 2);
            }
            this.itemWidth = itemWidth;
            this.cols = iCol;
            this.leftOffset = this.options.itemAlign == "center" ? leftOffset : 0;
        },
        _positionAll: function(newItems) {
            var $this = this;
            if (this.$element.find(this.options.addBlankItemClass).length > 0) {
                this.$element.find(this.options.addBlankItemClass).remove();
            }
            if (newItems) {
                this.$item = newItems;

            } else {
                this.$item = this.$element.find(this.options.itemClass);
                this.minHeight = 0;
                this.minIndex = 0;
                this.colHeightArray = [];
            }
            this._getColumnCount();
            this.$item.each(function(index) {
                $(this).css("position", "absolute");
                if (!newItems) {
                    $this.lastIndex = index;
                } else {
                    $this.lastIndex += 1;
                }
                if ($this.options.itemAlign == "center") {
                    $this.dealAlignCenterItem(this, index);
                } else if ($this.options.itemAlign == "left") {
                    $this.dealAlignLeftItem(this, index)
                } else {
                    $this.dealAlignRightItem(this, index)
                }
                if ($this.options.effectStyle != "none") {
                    $this.dealEffect(this);
                }
                if ($(this).hasClass($this.options.newClass.substring(1))) {
                    $(this).removeClass($this.options.newClass.substring(1));
                }
            });
            this.$element.css("height", Math.max.apply(null, $this.colHeightArray));
        },
        dealEffect: function(ele) {
            if (this.options.effectStyle && this.options.effectStyle != "") {
                switch (this.options.effectStyle) {
                    case "fadeIn":
                        $(ele).addClass("animated fadeIn")
                        break;
                    case "zoomIn":
                        $(ele).addClass("animated zoomIn")
                        break;
                    case "bounceIn":
                        $(ele).addClass("animated bounceIn")
                        break;
                    default:
                        $(ele).addClass("animated zoomIn");
                        break;
                }
            }
        },
        dealAlignCenterItem: function(ele, index) {
            if (this.lastIndex < this.cols) {
                $(ele).css("top", this.minHeight);
                if (index == 0) {
                    $(ele).css("left", this.leftOffset + this.options.spacingWidth);
                } else {
                    $(ele).css("left", this.leftOffset + index * this.itemWidth + (2 * (index + 1) - 1) * this.options.spacingWidth);
                }
                this.colHeightArray.push($(ele).outerHeight());
            } else {
                this.minHeight = Math.min.apply(null, this.colHeightArray);
                this.minIndex = $.inArray(this.minHeight, this.colHeightArray);
                $(ele).css("top", this.minHeight + this.options.spacingHeight);
                if (this.minIndex == 0) {
                    $(ele).css("left", this.leftOffset + this.options.spacingWidth);
                } else {
                    $(ele).css("left", this.leftOffset + this.minIndex * this.itemWidth + (2 * (this.minIndex + 1) - 1) * this.options.spacingWidth);
                }
                this.colHeightArray[this.minIndex] += $(ele).outerHeight() + this.options.spacingHeight;
            }
        },
        dealAlignLeftItem: function(ele, index) {
            if (this.lastIndex < this.cols) {
                $(ele).css("top", this.minHeight);
                if (index == 0) {
                    $(ele).css("left", this.leftOffset);
                } else {
                    $(ele).css("left", this.leftOffset + index * this.itemWidth + 2 * index * this.options.spacingWidth);
                }
                this.colHeightArray.push($(ele).outerHeight());
            } else {
                this.minHeight = Math.min.apply(null, this.colHeightArray);
                this.minIndex = $.inArray(this.minHeight, this.colHeightArray);
                $(ele).css("top", this.minHeight + this.options.spacingHeight);
                if (this.minIndex == 0) {
                    $(ele).css("left", this.leftOffset);
                } else {
                    $(ele).css("left", this.leftOffset + this.minIndex * this.itemWidth + 2 * this.minIndex * this.options.spacingWidth);
                }
                this.colHeightArray[this.minIndex] += $(ele).outerHeight() + this.options.spacingHeight;
            }
        },
        dealAlignRightItem: function(ele, index) {
            if (this.lastIndex < this.cols) {
                $(ele).css("top", this.minHeight);
                if (index == 0) {
                    $(ele).css("right", this.leftOffset);
                } else {
                    $(ele).css("right", this.leftOffset + index * this.itemWidth + 2 * index * this.options.spacingWidth);
                }
                this.colHeightArray.push($(ele).outerHeight());
            } else {
                this.minHeight = Math.min.apply(null, this.colHeightArray);
                this.minIndex = $.inArray(this.minHeight, this.colHeightArray);
                $(ele).css("top", this.minHeight + this.options.spacingHeight);
                if (this.minIndex == 0) {
                    $(ele).css("right", this.leftOffset);
                } else {
                    $(ele).css("right", this.leftOffset + this.minIndex * this.itemWidth + 2 * this.minIndex * this.options.spacingWidth);
                }
                this.colHeightArray[this.minIndex] += $(ele).outerHeight() + this.options.spacingHeight;
            }
        },
        isEndDecorate: function() {
            if (this.options.isCompletionBlank) {
                var falls = document.createElement('div');
                falls.className = this.options.addBlankItemClass.substring(1);
                this.maxHeight = Math.max.apply(null, this.colHeightArray);
                for (var i = 0; i < this.cols; i++) {
                    if (this.maxHeight != this.colHeightArray[i]) {
                        var fallsClone = falls.cloneNode();
                        $(fallsClone).width(this.itemWidth);
                        $(fallsClone).height(this.maxHeight - this.colHeightArray[i] - this.options.spacingHeight);
                        $(fallsClone).css({ "position": "absolute", background: "#67CEFF" });
                        $(fallsClone).css("top", this.colHeightArray[i] + this.options.spacingHeight);
                        if (this.options.itemAlign == "center") {
                            if (i == 0) {
                                $(fallsClone).css("left", this.leftOffset + this.options.spacingWidth);
                            } else {
                                $(fallsClone).css("left", this.leftOffset + i * this.itemWidth + (2 * (i + 1) - 1) * this.options.spacingWidth);
                            }
                        } else if (this.options.itemAlign == "left") {
                            if (i == 0) {
                                $(fallsClone).css("left", this.leftOffset + this.options.spacingWidth);
                            } else {
                                $(fallsClone).css("left", this.leftOffset + i * this.itemWidth + (2 * (i + 1) - 1) * this.options.spacingWidth);
                            }
                        } else {
                            if (i == 0) {
                                $(fallsClone).css("right", this.leftOffset + this.options.spacingWidth);
                            } else {
                                $(fallsClone).css("right", this.leftOffset + i * this.itemWidth + (2 * (i + 1) - 1) * this.options.spacingWidth);
                            }
                        }
                        this.$element.append($(fallsClone).append($("<img>").css({
                            width: "100%",
                            height: "100%"
                        }).attr("src", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4061915345,3678613168&fm=26&gp=0.jpg")));
                        this.dealEffect(fallsClone);
                    }
                }
            }
        },
        creatNoMoreData: function() {
            var noMoreDataInnerHtml;
            if (typeof this.options.noMoreDataInnerHtml == "function") {
                noMoreDataInnerHtml = this.options.noMoreDataInnerHtml();
            } else if (typeof this.options.noMoreDataInnerHtml == "string") {
                noMoreDataInnerHtml = this.options.noMoreDataInnerHtml
            } else {
                noMoreDataInnerHtml = this.options.noMoreDataInnerHtml;
            }
            if (this.$element.find("." + this.options.noMoreDataClass).length == 0) {
                $("<div/>").addClass(this.options.noMoreDataClass)
                    .css(this.options.noMoreDataCss).append($(noMoreDataInnerHtml)).appendTo(this.$element);
            }
        },
        _doScroll: function() {
            var $this = this;
            var scrollTop = 0;
            var maxHeight = 0;
            var newItems;
            $$window.on("scroll", $this.throttle(function() {
                if (!$this.defaultLoad) {
                    minHeight = Math.min.apply(null, $this.colHeightArray) + $this.$element.offset().top;
                    $this.options.prestrainHeight > 0 ? $this.options.prestrainHeight : 10;
                    // 获取浏览器拉到最低端时浏览器整体的高度
                    scrollTop = $$window.scrollTop() + $$window.height() + $this.options.prestrainHeight;
                }
                if (!$this.ajaxLoading && $this.isHasMore && scrollTop > minHeight) {
                    if ($this.options.loadingShow) {
                        $this.addLoading();
                    }
                    $this.ajaxLoading = true;
                    $this.options.ajaxCallback && $this.options.ajaxCallback(
                        function(isHasMore) {
                            newItems = $this.$element.find($this.options.newClass);
                            if (!isHasMore) {
                                if (newItems.length > 0) {
                                    $this._positionAll(newItems);
                                }
                            } else {
                                $this.isHasMore = false;
                                $this.isEndDecorate();
                                $this.creatNoMoreData();
                            }
                        },
                        function() {
                            if ($this.options.loadingShow) {
                                $this.removeLoading();
                            }
                            $this.ajaxLoading = false;
                        }
                    );
                }
            }, 60, 300))
        }
    }

    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Waterfall(this, options));
            }
        });
        return this;
    }
})(jQuery);