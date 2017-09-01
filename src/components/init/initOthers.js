let initOthers = function(that) {
    that.$store.dispatch('changeSearchContainerStateHide');
    that.$store.dispatch('subNavBarFixedState');
}
export default initOthers;