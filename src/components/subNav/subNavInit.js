let throttle = function(fn, delay, mustRunDelay) {
    let timer = null;
    let t_start;
    return function() {
        let context = this;
        let args = arguments;
        let t_curr = +new Date();
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
};
let subNavInit = function(that) {
    let scroll = function() {
        let top = document.body.scrollTop;
        if (that.$route.path.indexOf("home") != -1) { //home
            if (top >= 300) {
                that.$store.dispatch('subNavBarFixedState');
            } else {
                that.$store.dispatch('subNavBarRelativeState');
            }
        }
    }
    $(window).on("scroll ", scroll)
}
export default subNavInit;