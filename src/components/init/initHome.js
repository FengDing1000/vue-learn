let initHome = function(that) {
    that.$store.dispatch('changeSearchContainerStateShow');
    that.$store.dispatch('subNavBarRelativeState');
    that.$store.dispatch('iframeChange');
}
export default initHome;